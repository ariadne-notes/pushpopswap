# IPv6 Network Address Planning

Common subnets found in v6 BGP global table.

| Prefix    | Usage                                             |
|-----------|---------------------------------------------------|
| /24 – /29 | Large ISP/provider aggregates                     |
| /32       | Standard ISP/LIR allocation                       |
| /36 – /44 | Sub-allocations, multi-site orgs                  |
| /48       | End-site (dominant)                               |
| /64       | One subnet                                        |
| /127      | Used on p2p links to prevent attacks              |

Found in the *APNIC BGP in 2025* pdf.

> If a /24 is the minimum accepted route prefix size in IPv4, what is the comparable size in IPv6?
>

> There appears to be no common consensus position here. The default action many for network operators appears to have no minimum size filter at all. In theory, that would imply that a /128 route object would be accepted across the entire IPv6 DFZ. A more pragmatic observation is that a /32 would be assuredly accepted by all networks, and it appears that many network operators believe that a /48 is also generally accepted. Given that a /48 is the most common prefix size in today’s IPv6 network, this view appears to be widespread. We also see prefixes smaller in size than a /48 in the routing table with /49, /52, /56 and /64 prefixes present in the IPv6 BGP routing table. 0.7% all advertised prefixes are more specific than a /48.

## Site Planning

Since each site gets its own `/48`, there are 65k networks to work with.

## References

[BGP in 2025 | APNIC Blog](https://blog.apnic.net/2026/01/08/bgp-in-2025/)
