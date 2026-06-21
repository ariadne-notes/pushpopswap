# SD-Access

A physical network can host a variety of logical networks.

Requires gear to support the overlay, Catalyst Center, and *sometimes* ISE.

## Terms

**BUM** --- Broadcast, Unknown Unicast, Multicast

Traffic types that aren't great at being point-to-point.

## Types

### Layer 2 Overlay

- Anycast gateway enabled
  - Flooding is disabled
  
- No anycast gateway
  - Flooding cannot be disabled
  - Used if the gateway is outside the fabric
  
Flooding uses a multicast p2mp tunnel.

### Layer 3 Overlay

Stretched subnets, with Anycast gateways.

## Terms

### Underlay

Physical gear, configured with IPs either by hand or automatically.

The Layer 3 network VXLAN-GPO travels thru.

No VRFs, no features. Just lots of `/31` links.

Typically deployed with IS-IS since it's v4 and v6 agnostic.


This part can be automated.


### VXLAN-GPO

Cisco extended the VXLAN header to include SGTs (Now called Scalable Group Tags)

### VN

**VN** -- Virtual Network

- VRF
- Anycast Gateway
- LISP Instance ID
- This is the tag field in VXLAN-GPO

Communication between VNs must go to a fusion router or a firewall.

## SD Access Nodes

### Control Plane

- LISP MS/MR databases Endpoint-to-location, or EID-to-RLOC
- Each node contains the full database
- Key Lookup
  - IPv4
  - IPv6
  - MAC Address

### Fabric Edge

- AKA FE.
- Identifies and Auths wired endpoints.
- Wireless OTT, registers v4/v6 endpoint ID.
- Is the Layer 3 anycast gateway.
- Provides VN for wireless clients
- Onboards APs into the fabric, forms VXLAN tunnels with APs
- Provides the guest functionality for wireless guest.
- Is a LISP xTR, with an anycast gateway, with overlay host protocols, (like DHCP).

### Fabric Border


- Connects other L3 networks to SDA fabric.

#### Fabric Border Nodes Types

- **Border:** Known Destinations: datacenter, private cloud.
- **Default Border:** Unknown traffic, Internet
- **Anywhere Border:** Both.

The border nodes do context changes, going from one VRF to another.

### Fabric Intermediate

Only does IP transport

- Routing
- Multicast


## Fabric Edge Onboarding

- (Method 1) Open Auth or MAB, user connects to a port -> host pool.
- (Method 2) 802.1x authenticates the device -> host pool.
- Host pool has a SGT, SVI and VRF instance.
- SVI is the anycast gateway (same IP address and MAC for that SVI & VRF) on all edge nodes.
- Host address is now an EID (MAC, /32 IPv4, /128 IPv6), that can be registered with the control plane node.
- Control plane signaling is LISP, dataplane is managed via VXLAN-GPO.

## Fusion Device

Lets devices talk between VNs.

## Policy Management

SGACLs, via ISE.

## Site Size

| Size         | Endpoints | WLCs | APs    | IP Pools | VNs | BNs | CPs | ENs  | Notes                                     |
|--------------|-----------|------|--------|----------|-----|-----|-----|------|-------------------------------------------|
| [Fabric IAB] | 1,000     | —    | 50     | —        | —   | 1   | 1   | 1    |                                           |
| [Small]      | 10,000    | 2    | 500    | 100      | 32  | 2   | 2   | 100  | External WLC needed                       |
| [Medium]     | 50,000    | 2    | 2,500  | 300      | 64  | 2   | 2-6 | 500  | FEW requires 2 CP nodes                   |
| [Large]      | 100,000   | 2    | 10,000 | 500      | 64  | 4   | 2-6 | 1200 | 3-tier network. FEW requires 2 CP nodes   |

[Fabric IAB]: https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html#FIAB_Site_Reference
[Small]: https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html#Small_Site_Reference
[Medium]: https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html#Medium_Site_Reference
[Large]: https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html#Large_Site_Reference

## References


[Cisco Live - SD-Access Solution Fundamentals - Jerome Dolphin - BRKENS-2810](./pdfs/ciscolive/BRKENS-2810.pdf)

[Cisco Live - SD-Access Best Practices - Ashley Burton - BRKENS-2502](./pdfs/ciscolive/BRKENS-2502.pdf)

[Cisco Software-Defined Access Solution Design Guide](https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html)

[SD-Access Deployment Using Cisco Catalyst Center - Cisco](https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center/cisco-validated-solution-profiles/validated-profile-sda-deployment.html#CiscoSDAccesssolution)

[Cisco - SD-Access Wireless Design and Deployment Guide - Cisco DNA center 2.1.1](https://www.cisco.com/c/dam/en/us/td/docs/cloud-systems-management/network-automation-and-management/dna-center/deploy-guide/cisco-dna-center-sd-access-wl-dg.pdf)

[Cisco SD-Access Fabric Resources - Cisco Community](https://community.cisco.com/t5/networking-knowledge-base/cisco-sd-access-fabric-resources/ta-p/4196271)
