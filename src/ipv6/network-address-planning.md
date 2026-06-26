# Network Address Planning

## Terms

**PIN** --- Place In Network

- Use v6 nibbles to tell you what the subnet does

## Per the RFC

RFC [3587] contains the current recommendations for v6 site design.

[3587]: https://www.rfc-editor.org/info/rfc3587/

"Get a /48 from your RIR."

```plain
│ 3 │     45 bits         │  16 bits  │       64 bits              │
├───┼─────────────────────┼───────────┼────────────────────────────┤
│001│global routing prefix│ subnet ID │       interface ID         │
└───┴─────────────────────┴───────────┴────────────────────────────┘
```

## Cisco's Guidance

## PIN

Use the hex nibbles to encode things.

| Value | Purpose         |
|-------|-----------------|
| 0     | Reserved        |
| 2     | Infrastructure  |
| 4     | Desktop (wired) |
| 6     | Wireless (corp) |
| 8     | Guest Wi-Fi     |
| A     | Lab             |
| C     | Building DC     |
| E     | DMZ             |
| F     | Reserved        |
| Odd   | Future Use      |

```text
Desktop subnet 200   2001:0db8:729c:4200::/52
Desktop subnet 300   2001:0db8:729c:4300::/52
Lab     subnet 004   2001:0db8:729c:A004::/52
Lab     subnet 006   2001:0db8:729c:A006::/52
```

## BGP

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

## Site planning

Since each site gets its own `/48`, there are 65k networks to work with.

## References

[BGP in 2025 | APNIC Blog](https://blog.apnic.net/2026/01/08/bgp-in-2025/)

[RFC 3587: IPv6 Global Unicast Address Format | RFC Editor](https://www.rfc-editor.org/info/rfc3587/)

[How to Request IPv6 Address Space from ARIN](https://oneuptime.com/blog/post/2026-03-20-request-ipv6-address-space-arin/view)
