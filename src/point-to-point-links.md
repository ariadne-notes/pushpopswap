# Point to Point Links

## Terms

**P2P** --- Point-to-Point

A link where the only devices on the network are directly attached to each other.

**Ping Pong Attack**

A device off-link sends a ping to an address between two routers.

This happens with v4 and v6.

Neither router knows about or has the address, so they forward it back and forth.

## Point-to-Point v4

Number with 'IP Unnumbered' or use a `/31`.

## Point-to-Point v6

Use a `/127`.

## Config

- Layer 3 structures should go on ports, not SVIs.
- Use ECMP, not link aggregation.

### Layer 3

Config that lives on the port can sense and respond to a link failure in 8 msec.

For an SVI to go down, there must be only one port using it,ex and it must sense the interface down, this takes 150+ msec.

## References

[RFC 3021 - Using 31-Bit Prefixes on IPv4 Point-to-Point Links](https://datatracker.ietf.org/doc/html/rfc3021)

[RFC 6164 - Using 127-Bit IPv6 Prefixes on Inter-Router Links](https://datatracker.ietf.org/doc/html/rfc6164)

[NANOG - 2015 - IPv6 Security Myths and Legends](/pdfs/nanog/04-notr-chicago-ipv6-sec.pdf)

[Enterprise Campus Design - Multilayer Architectures and Design Principles - Cisco Live 2023](https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2023/pdf/BRKENS-2031.pdf)
