# BGP Multipath

BGP on its own will not install multiple paths like OSPF or EIGRP to reach a destination.

To make BGP behave more like an IGP, and especially at scale with multiple ECMP links, this feature is needed.

**Topology**

R1 is connected to the ISP via two eBGP links.

eBGP on it's own will install *one* best path.

```
         ┌─ eBGP ─┐         
         ▼        ▼         
┌────────┐        ┌────────┐
│   R1   ├────────┤  ISP   │
│AS 64496├────────┤AS 64511│
└────────┘        └────────┘
```


```text
R1(config-router)# maximum-paths ibgp  maximum-number
```


## References

[Cisco Live - A Deep Dive into Basic and Design Best Practices for BGP and L3VPN](./pdfs/ciscolive/BRKMPL-2103.pdf)

[BGP Multipath and Load Balancing Techniques](https://www.cisco.com/c/en/us/td/docs/iosxr/cisco8000/bgp/b-bgp-config-cisco8000/m-bgp-multipath-and-load-balancing-techniques.pdf)

[IP Routing: BGP Configuration Guide - iBGP Multipath Load Sharing Cisco ASR 1000 Series Aggregation Services Routers - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_bgp/configuration/xe-16/irg-xe-16-book/ibgp-multipath-load-sharing.html)
