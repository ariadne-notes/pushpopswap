# Cloud

## Terms

**CSP** --- Cloud Service Provider

**Site to Cloud**

- Deploy vEdge at CSP
- Connect vEdge to VPC
- Connect VPC to IaaS

**Cloud Gateway**

- One vEDGE per VPC

**TGW** --- Transit Gateway

A CSP construct to connect multiple VPCs

- Azure is called vHUB
- Amazon is called TGW

### SaaS

Used to pick network connections, or maybe even the overlay to use a different site.

![SaaS](../images/cisco/cisco-sdwan-cloud-onramp-saas.avif)

Image courtesy of

[Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/cloudonramp/ios-xe-17/cloud-onramp-book-xe/cor-saas-17-2-1r.html).

## Cisco SD-WAN cloud OnRamp

- Figures out the best path and measures jitter

[Portal Page]

[Portal Page]: https://www.cisco.com/site/us/en/solutions/networking/sdwan/cloud-onramp/index.html

### Cloud OnRamp for IAAS

- Transit VPC with two vEdges
- Transit VPC connects to other VPCs
- Cloud VPCs learned via BGP
  - Redistributed into OMP

Used to interconnect devices within the Cloud.

![IaaS](../images/cisco/cisco-sdwan-cloud-onramp-iaas.avif)

Image courtesy of

[Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/cloudonramp/ios-xe-17/cloud-onramp-book-xe/m-cloud-onramp-iaas-wan.html).

### SDWAN multicloud

- TGW native
- Automation for instantiaton

![Multicloud](../images/cisco/white-paper-c11-742817_0.avif)

## References

[Cisco Live - SDWAN Cloud OnRamp for Multicloud BRKENT-2060](./pdfs/ciscolive/BRKENT-2060.pdf)

[Cisco - Whitepaper - SDWAN Cloud OnRamp for IaaS](https://www.cisco.com/c/en/us/solutions/collateral/enterprise-networks/sd-wan/white-paper-c11-742817.html)

[Cisco - SD-WAN Cloud Hub with Google Cloud At-a-Glance](https://www.cisco.com/c/en/us/solutions/collateral/enterprise-networks/sd-wan/at-a-glance-c45-2362352.html)
