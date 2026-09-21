# Cisco ACI

## Terms

**ACI** --- Application Centric Infrastructure

**ESG** --- Endpoint Security Groups

**POD**

A set of leaf and spine nodes controlled with an APIC cluster

**Multi-POD**

- Multiple PODs connected via VXLAN
- Multiple PODs managed via the same APIC cluster

**Spine Back-to-Back**

The recommended topology for connecting a 2 pods, that are each 2 spines, is a full-mesh.

**Sharding**

- A way ACI achieves quorum
- Uses multiple active DBs
- 3 to 7 copies

**L3Out**

The ACI fabric runs a routing protocol like OSPF or BGP to inject it's NLRI info into a shared routing fabric

**L3Out Transit Routing**

The ACI fabric can be used as transit, between L3Out Endpoints.


## References

[Cisco Live - Introduction to ACI - Chris Merkel - BRKDCN-1601](/pdfs/ciscolive/BRKDCN-1601.pdf)

[Cisco Live - Cisco ACI Multi-Prod Design and Deployment - John Weston - BRKDCN-2949](/pdfs/ciscolive/BRKDCN-2949.pdf)

[Cisco Application Centric Infrastructure - ACI Fabric L3Out White Paper - Cisco](https://www.cisco.com/c/en/us/solutions/collateral/data-center-virtualization/application-centric-infrastructure/guide-c07-743150.html)

[Cisco Application Centric Infrastructure (ACI) - Cisco Application Centric Infrastructure (ACI)](https://ebooks.cisco.com/story/cisco-application-centric-infrastructure-aci/)
