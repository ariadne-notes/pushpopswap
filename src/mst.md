Cisco switches provide three kinds of spanning tree modes.

```
switch(config)# spanning-tree mode ?
  mst         Multiple spanning tree mode
  pvst        Per-Vlan spanning tree mode
  rapid-pvst  Per-Vlan rapid spanning tree mode
```

The Industry has three kinds of interop. 

```
| IEEE            | Cisco         | Notes                                      |
|-----------------|---------------|--------------------------------------------|
| STP (802.1D)    | PVST+         | Cisco's version is per vlan                |
| RSTP (802.1w)   | Rapid PVST+   | Cisco's version is per vlan                |
| MST (802.1s)    | MST           | Same standard; Cisco implements it on-gear |
```

Industry liked what Cisco was doing with "per vlan" so MST merges that feature into 802.1s.

# Terms

* **MST:** Multiple Spanning Trees.
* **MSTI:** MST Instance, a group of vlans on a common MST.
* **MST Region:** A group of switches with the same high-level config.
* **IST:** Internal Spanning Tree, this is instance 0, the first instance.
* **MST Region Boundary:** Any port that connects to a 802.1D or 802.1W device.
* **CST:** Common Spanning Tree, what is built by STP, and RSTP.
* **CIST:** Common and Internal Spanning Tree.



# Packet
From wireshark

```
Frame 1: Packet, 119 bytes on wire (952 bits), 119 bytes captured (952 bits)
IEEE 802.3 Ethernet 
Logical-Link Control
Spanning Tree Protocol
    Protocol Identifier: Spanning Tree Protocol (0x0000)
    Protocol Version Identifier: Multiple Spanning Tree (3)
    BPDU Type: Rapid/Multiple Spanning Tree (0x02)
    BPDU flags: 0x7c, Agreement, Forwarding, Learning, Port Role: Designated
        0... .... = Topology Change Acknowledgment: No
        .1.. .... = Agreement: Yes
        ..1. .... = Forwarding: Yes
        ...1 .... = Learning: Yes
        .... 11.. = Port Role: Designated (3)
        .... ..0. = Proposal: No
        .... ...0 = Topology Change: No
    Root Identifier: 0 / 0 / 52:54:00:01:22:eb
    Root Path Cost: 0
    Bridge Identifier: 0 / 0 / 52:54:00:01:22:eb
    Port identifier: 0x8001
    Message Age: 0
    Max Age: 20
    Hello Time: 2
    Forward Delay: 15
    Version 1 Length: 0
    Version 3 Length: 64
    MST Extension
        MST Config ID format selector: 0
        MST Config name: 
        MST Config revision: 0
        MST Config digest: ac36177f50283cd4b83821d8ab26de62
        CIST Internal Root Path Cost: 0
        CIST Bridge Identifier: 0 / 0 / 52:54:00:01:22:eb
        CIST Remaining hops: 20
```

# Basic Config
```
spanning-tree mode mst
spanning-tree mst 0 priority 0
```


# More involved config
```
spanning-tree mode mst
spanning-tree mst 0 root secondary
spanning-tree mst 1 root primary
spanning-tree mst configuration
  name MST_CONFIG_NAME_CORE
  revision 2
  instance 1 vlan 10,30
  instance 2 vlan 20,40
```

```
switch# show spanning-tree mst configuration 
Name      [MST_CONFIG_NAME_CORE]
Revision  2     Instances configured 3

Instance  Vlans mapped
--------  ---------------------------------------------------------------------
0         1-9,11-19,21-29,31-39,41-4094
1         10,30
2         20,40
-------------------------------------------------------------------------------
```

# Misconfigs

### Mapping Vlans to an instance where ports are blocked.
- Never Manually prune VLANs from a trunk.
  - If you must prune, prune all the vlans in an instance.

# Captures
[MST-bpdu.pcap](./captures/switching/MST-bpdu.pcap)

# References
[Cisco - Understand the Multiple Spanning Tree Protocol (802.1s)](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24248-147.html#toc-hId--1408391100)

[Layer 23 - MSTP Protocol Explained: Multiple Spanning Tree in Depth](https://www.layer23-switch.com/blog/mstp-protocol.html)