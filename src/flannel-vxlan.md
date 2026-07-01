# Flannel VXLAN

I want to understand what I'm implementing. I started with this. I did not implement it.

I went with `host-gw` for backend.

Flannel v0.28.5:

- backend: Linux VXLAN
- interface: flannel.1
- VNI: 1
- port: UDP/8472
- directRouting: disabled

## Control Plane

```mermaid
sequenceDiagram
    participant K8sAPI as Kubernetes API
    participant fA as Node A<br>flanneld
    participant kA as Node A<br>Linux kernel
    participant fB as Node B<br>flanneld

    Note over K8sAPI,fB: Initialization followed by continuous node/lease event handling

    fA->>K8sAPI: Read local Node PodCIDR
    K8sAPI-->>fA: 10.244.1.0/24

    fA->>kA: Create flannel.1 (VXLAN VNI 1, dstport 8472)
    fA->>K8sAPI: Patch Node A annotations with backend type,<br>VTEP MAC, VNI, and public IP
    fA->>kA: Assign 10.244.1.0/32 to flannel.1 and set link up
    fA->>fA: Write /run/flannel/subnet.env
    fA->>K8sAPI: Consume Node/lease events continuously

    fB->>K8sAPI: Perform the same initialization for 10.244.2.0/24
    fB->>K8sAPI: Patch Node B annotations with its VTEP information

    K8sAPI-->>fA: Node B lease event: PodCIDR,<br>VTEP MAC, VNI, and public IP

    Note over fA,kA: Install entries in this order so adding the route<br>cannot trigger unresolved neighbor discovery
    fA->>kA: 1) Neighbor: 10.244.2.0 -> Node B VTEP MAC (PERMANENT)
    fA->>kA: 2) FDB: Node B VTEP MAC -> Node B public IP<br>(self, PERMANENT)
    fA->>kA: 3) Route: 10.244.2.0/24 via 10.244.2.0<br>dev flannel.1, on-link
```

## Data Plane

`cni0` and the pod `veth` interfaces are created by the CNI bridge plugin, not by
Flannel. 

This example also assumes IP forwarding and the required firewall
policy are already in place.

```mermaid
sequenceDiagram
    participant PodA as Pod A<br>10.244.1.5
    participant cni0A as Node A<br>cni0 
    participant kA as Node A<br>Linux IP stack
    participant flanA as Node A<br>flannel.1 - VTEP
    participant ethA as Node A<br>eth0 - 192.168.1.11
    participant ethB as Node B<br>eth0 - 192.168.1.12
    participant flanB as Node B<br>flannel.1 - VTEP
    participant kB as Node B<br>Linux IP stack
    participant cni0B as Node B<br>cni0
    participant PodB as Pod B<br>10.244.2.7

    Note over PodA,PodB: Data plane — single packet, Pod A to Pod B

    PodA->>cni0A: Send packet for 10.244.2.7 to its default gateway
    cni0A->>kA: Deliver packet to the host IP stack
    kA->>flanA: Route lookup selects 10.244.2.0/24<br>via next-hop 10.244.2.0

    flanA->>flanA: 1) Neighbor lookup: 10.244.2.0 -> Node B VTEP MAC
    flanA->>flanA: 2) FDB lookup: Node B VTEP MAC -> dst 192.168.1.12 (static)
    flanA->>ethA: 3) VXLAN encapsulate (UDP/8472, VNI 1)

    ethA->>ethB: VXLAN/UDP over underlay L3

    ethB->>flanB: 4) Decapsulate and present the inner Ethernet frame
    flanB->>kB: Frame is addressed to Node B's VTEP MAC
    kB->>kB: 5) Route inner packet using<br>10.244.2.0/24 dev cni0
    kB->>cni0B: 6) Resolve 10.244.2.7 to the pod MAC<br>and emit the Ethernet frame
    cni0B->>PodB: Bridge FDB selects the pod veth and delivers the frame
```

## References

[Flannel v0.28.5 release](https://github.com/flannel-io/flannel/releases/tag/v0.28.5)

[Flannel v0.28.5 VXLAN backend - vxlan.go](https://github.com/flannel-io/flannel/blob/v0.28.5/pkg/backend/vxlan/vxlan.go)

[Flannel v0.28.5 VXLAN network event handling - vxlan_network.go](https://github.com/flannel-io/flannel/blob/v0.28.5/pkg/backend/vxlan/vxlan_network.go)

[Flannel v0.28.5 VXLAN device implementation - device.go](https://github.com/flannel-io/flannel/blob/v0.28.5/pkg/backend/vxlan/device.go)

[Flannel v0.28.5 Kubernetes subnet manager - kube.go](https://github.com/flannel-io/flannel/blob/v0.28.5/pkg/subnet/kube/kube.go)
