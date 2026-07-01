# Cisco administrative distance

Used to pick between two routes with the same prefixes.

Think of it like protocol preference.

**Prefix** 

- The network and masking bits for a route

## Same subnet length

```
10.0.0.0/24 via 192.168.0.1 - OSPF
10.0.0.0/24 via 192.168.0.2 - EIGRP
```

EIGRP wins because \\( 90 < 110 \\).

## Most specific prefix

Which route is selected for the destination `10.0.0.1`?

```
10.0.0.0/25 via 192.168.0.1 - OSPF
10.0.0.0/24 via 192.168.0.2 - EIGRP
```

OSPF wins because `/25` is a more specific path.

## Table

| Protocol                        | Administrative Distance |
| --------------------------------| ----------------------- |
| Connected                       | 0                       |
| Static                          | 1                       |
| EIGRP Summary                   | 5                       |
| eBGP                            | 20                      |
| EIGRP Internal                  | 90                      |
| OSPF                            | 110                     |
| IS-IS                           | 115                     |
| RIP                             | 120                     |
| ODR                             | 160                     |
| EIGRP External                  | 170                     |
| iBGP                            | 200                     |
| Unknown/Infinite                | 255                     |

## References

[Describe Administrative Distance - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html)

[Troubleshooting TechNotes - What is Administrative Distance? - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html#topic2)
