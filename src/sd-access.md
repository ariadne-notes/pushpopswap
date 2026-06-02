# SD-Access

A physical network can host a variety of logical networks.

Requires gear to support the overlay, Catalyst Center, and *sometimes* ISE.

## Types

### Layer 2 Overlay

Transport client traffic to a gateway outside the fabric.

This is not the standard design.

### Layer 3 Overlay

Stretched subnets, with Anycast gateways.

## Terms

### Underlay

Physical gear, configured with IPs either by hand or automatically.

The Layer 3 network VXLAN-GPO travels thru.

No VRFs, no features. Just lots of `/31` links.

Typically deployed with IS-IS since it's v4 and v6 agnostic. 

This part can be automated.

### Campus Fabric

Cisco's SD-Access Solution.

### ISE

**Identity Services Engine**, Cisco's AAA server.

Strongly Recommended. 

Provides 802.1x, Mac Authentication Bypass (MAB), or Web Authentication (WebAuth). 

ISE is *tightly* integrated via API calls to CatC.

- Talks to Catalyst center via pxGrid.
- Can talk to AWS or Microsoft AD.
- Required for Microsegmentation (via SGTs)

### SGT

- Scalable Group tags
- AKA Security Group Tags
- End-to-End group policy of the packets themselves.
- Does not rely on IP or MAC.

### VXLAN-GPO

Cisco extended the VXLAN header to include SGTs (Now called Scalable Group Tags)

### VNI

- This is the tag field in VXLAN-GPO
- Virtual Network
- AKA the Overlay, Network Segment

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

## References

[Cisco Software-Defined Access Solution Design Guide](https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html)

[SD-Access Deployment Using Cisco Catalyst Center - Cisco](https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center/cisco-validated-solution-profiles/validated-profile-sda-deployment.html#CiscoSDAccesssolution)

[Cisco SD-Access Best Practices - Cisco Live 2025](https://www.ciscolive.com/c/dam/r/ciscolive/apjc/docs/2025/pdf/BRKENS-2502.pdf)

[SD-Access Wireless Design and Deployment Guide - Cisco DNA center 2.1.1](https://www.cisco.com/c/dam/en/us/td/docs/cloud-systems-management/network-automation-and-management/dna-center/deploy-guide/cisco-dna-center-sd-access-wl-dg.pdf)

[Cisco SD-Access Fabric Resources - Cisco Community](https://community.cisco.com/t5/networking-knowledge-base/cisco-sd-access-fabric-resources/ta-p/4196271)


