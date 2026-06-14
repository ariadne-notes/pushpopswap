# IPv6

There are a lot of fundamentals changed with v6.

- 128 bits, more space.
- Globally Unique, less need for NAT.
- Fixed header length, v4 has variable length headers
- Optional, Option headers
- SLAAC. Stateless host addressing, with the router advertising the subnet prefix.
- Flow Labeling (for QoS)
- Routers cannot fragment packets
- Hosts can perform MTU path discovery
- Hosts can have multiple addresses and even multiple subnets
- Mobile IPv6 lets mobile nodes remain reachable
- No broadcast traffic

## Header Format

RFCs really like groups of 32.

[RFC 2460 Section 3](https://www.rfc-editor.org/info/rfc2460/#section-3)

```plain
                     1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────┬───────────────┬───────────────────────────────────────┐
│Version│ Traffic Class │           Flow Label                  │
├───────┴───────────────┴───────┬───────────────┬───────────────┤
│         Payload Length        │  Next Header  │   Hop Limit   │
├───────────────────────────────┴───────────────┴───────────────┤
│                                                               │
│                                                               │
│                                                               │
│                         Source Address                        │
│                                                               │
│                                                               │
│                                                               │
├───────────────────────────────────────────────────────────────┼
│                                                               │
│                                                               │
│                                                               │
│                      Destination Address                      │
│                                                               │
│                                                               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Bits

Addresses are 128 bits.

A standard IPv6 address takes this form.

FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF

The groups are called *hextets*, as they are made with hex characters.

(I used F because IPv6 is hexadecimal)

- Each `0xFFFF` is 16 bits.
- Each `0xFF` is 8 bites, or a byte.
- Each `0xF` is 4 bits, or a  nibble.

## Alternative Representation of a IPv6 Address.

RFC 4291 allows this:

`0:0:0:0:0:0:10.0.0.1`

`::10.0.0.1`

These are only API addresses to represent to a IPv6 app, that this is an IPv4 host.

They don't go anywhere.

## IPv6 Address Block

All globally routeable IPv6 addresses fit into this block.

`2000::/3`

## IPv6 Special Address Blocks

| Name                 | Address Block        | RFC  | Notes                                                                      |
|----------------------|----------------------|------|----------------------------------------------------------------------------|
| Unspecified          | `::/128`             | 4291 | Used on hosts when the IP isn't known, means "bind to all addresses        |
| Loopback             | `::1/128`            | 4291 | So hosts can talk to themselves                                            |
| IPv4 Mapped IPv6     | `::ffff:0:0/96`      | 4291 | Transition mechanism. Tells the app "I'm actually a v4 host"               |
|                      | `64:ff9b::/96`       | 6052 | NAT64 IPv4/IPv6 translation                                                |
|                      | `64:ff9b:1::/48`     | 8215 | Local-use IPv4/IPv6 translation                                            |
|                      | `100::/64`           | 6666 | Discard prefix                                                             |
|                      | `2001::/32`          | 4380 | Teredo tunneling                                                           |
| Documentation        | `2001:db8::/32`      | 3849 | Intended for labs, books, documents                                        |
|                      | `2002::/16`          | 3056 | 6to4 addressing scheme                                                     |
| Documentation        | `3fff::/20`          | 9637 | Intended for labs, books, documents. Bigger                                |
| Segment Routing      | `5f00::/16`          | 9602 | AKA, SRv6                                                                  |
| ULA (Unique Local)   | `fc00::/7`           | 4193 | Unique local address. Reserved, do not use                                 |
| ULA (Unique Local)   | `fd00::/8`           | 4193 | Supposed to be random subnet: fdxx:xxxx:xxxx::/48                          |
| Link Local           | `fe80::/10`          | 4291 | L2 Only, not routeable.                                                    |
| Multicast            | `ff00::/8`           | 4291 | No broadcasts in v6                                                        |


## IPv6 Documentation Prefixes

| Prefix             | RFC             | Notes                                                                        |
|--------------------|-----------------|------------------------------------------------------------------------------|
| `2001:db8::/32`    | RFC 3849        | Original doc prefix.                                                         |
| `3fff::/20`        | RFC 9637        | Expanded doc space for larger/multi-AS examples.                             |

## References

[RFC 2460 - Internet Protocol, Version 6 (IPv6)](https://www.rfc-editor.org/rfc/rfc2460)
