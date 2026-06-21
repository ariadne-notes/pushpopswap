# IPv6

Fundamentals changed with v6:

- 128 bits
- Global Scoped address tend to be Globally Unique
  - Less need for NAT
- Fixed header length
- Optional, Option headers
- SLAAC
  - Stateless host addressing
  - Router advertising the subnet prefix
- Flow Labeling (for QoS)
- Routers cannot fragment packets
- Hosts perform MTU path discovery
- Hosts can have multiple addresses in multiple subnets
- Mobile IPv6 lets mobile nodes remain reachable
- No broadcast traffic
- No ARP

## Header format

RFCs really like groups of 32.

IPv6 addresses are 4 groups of 32.

[RFC 2460 Section 3](https://www.rfc-editor.org/info/rfc2460/#section-3)

```text
                     1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────┬───────────────┬───────────────────────────────────────┐
│Version│ Traffic Class │           Flow Label                  │
├───────┴───────────────┴───────┬───────────────┬───────────────┤
│         Payload Length        │  Next Header  │   Hop Limit   │
├───────────────────────────────┴───────────────┴───────────────┤
│                                                               │
│                         Source Address                        │
│                                                               │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│                        Destination Address                    │
│                                                               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Bits

IPv6 address takes this form:

`FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF`

The groups are called **hextets**, as they are made with hex digits.

- `FFFF`
  - 16 bits
- `FF`
  - 8 bits
  - One byte
- `F`
  - 4 bits
  - A nibble

## Alternative representation of a IPv6 address

RFC 4291 allows this:

`0:0:0:0:0:0:10.0.0.1`

`::10.0.0.1`

These are only API addresses to represent to a IPv6 App, that this is an IPv4 host.

They don't go anywhere.

## IPv6 global address block

All globally routeable IPv6 addresses fit into this block.

`2000::/3`

## IPv6 special address blocks

**WKP** --- Well Known Prefix

The idea was, you could look at a v6 address with `64` in the front and understand it had been translated. These aren't popular anymore

### Blocks

| Address Block        | Name                 | RFC    | Notes                                                                      |
|----------------------|----------------------|--------|----------------------------------------------------------------------------|
| `::/128`             | Unspecified          | [4291] | Used on hosts when the IP isn't known, means "bind to all addresses        |
| `::1/128`            | Loopback             | [4291] | So hosts can talk to themselves                                            |
| `::ffff:0:0/96`      | IPv4 Mapped IPv6     | [4291] | Transition mechanism. Tells the app "I'm actually a v4 host"               |
| `64:ff9b::/96`       | WKP Translation      | [6052] | NAT64 IPv4/IPv6 translation                                                |
| `64:ff9b:1::/48`     | Local Translation    | [8215] | Local-use IPv4/IPv6 translation                                            |
| `100::/64`           | RTBH                 | [6666] | Discard prefix                                                             |
| `2000::/3`           | Global Scope         | [4291] | The v6 Internet                                                            |

| `2001::/32`          | Teredo               | [4380] | Tunneling                                                                  |
| `2001:db8::/32`      | Documentation        | [3849] | Intended for labs, books, documents                                        |
| `2002::/16`          | 6to4                 | [3056] | Translation                                                                |
| `3fff::/20`          | Documentation        | [9637] | Intended for labs, books, documents. Bigger                                |
| `5f00::/16`          | Segment Routing      | [9602] | AKA, SRv6                                                                  |
| `fc00::/7`           | ULA                  | [4193] | Reserved. Do not use                                                       |
| `fd00::/8`           | ULA                  | [4193] | Supposed to be random subnet:                                              |
| `fe80::/10`          | Link Local           | [4291] | L2 Only, not routeable                                                     |
| `ff00::/8`           | Multicast            | [4291] | No broadcasts in v6                                                        |

[3056]: https://www.rfc-editor.org/rfc/rfc3056
[3849]: https://www.rfc-editor.org/rfc/rfc3849
[4193]: https://www.rfc-editor.org/rfc/rfc4193
[4291]: https://www.rfc-editor.org/rfc/rfc4291
[4380]: https://www.rfc-editor.org/rfc/rfc4380
[6052]: https://www.rfc-editor.org/rfc/rfc6052
[8215]: https://www.rfc-editor.org/rfc/rfc8215
[6666]: https://www.rfc-editor.org/rfc/rfc6666
[9637]: https://www.rfc-editor.org/rfc/rfc9637
[9602]: https://www.rfc-editor.org/rfc/rfc9602

## References

[RFC 2460 - Internet Protocol, Version 6 (IPv6)](https://www.rfc-editor.org/rfc/rfc2460)

[IPv6 address - Wikipedia](https://en.wikipedia.org/wiki/IPv6_address)
