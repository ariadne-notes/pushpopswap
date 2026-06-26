# IPv6 Multicast Addresses

## Terms

**NVO** --- Network Virtualization Overlay

- Stuff like VXLAN

**BUM** -- Broadcast, Unknown Unicast, Multicast

- Traffic that is one-to-many

## Interface local scope

- Never goes onto the wire
- Popular for neighbor discovery

| Addresses    | Description               | Reference |
|--------------|---------------------------|-----------|
| FF01::1      | All Nodes                 | [4291]    |
| FF01::2      | All Routers               | [4291]    |
| FF01::FB     | mDNSv6                    | [6762]    |

## Link local scope

- Never routed

| Addresses | Description               | Reference |
|-----------|---------------------------|-----------|
| FF02::1   | All Nodes                 | [4291]    |
| FF02::2   | All Routers               | [4291]    |
| FF02::3   | Unassigned                |           |
| FF02::4   | DVMRP Routers             | [1075]    |
| FF02::5   | OSPF                      | [2328]    |
| FF02::6   | OSPF DR                   | [2328]    |
| FF02::9   | RIP                       | [2080]    |
| FF02::A   | EIGRP                     | [7868]    |
| FF02::B   | Mobile-Agents             |           |
| FF02::C   | SSDP                      |           |
| FF02::D   | PIM                       |           |
| FF02::E   | RSVP-ENCAPSULATION        |           |
| FF02::F   | UPnP                      |           |
| FF02::12  | VRRP                      | [9568]    |
| FF02::14  | NVO BUM Traffic           | [9624]    |
| FF02::16  | All MLDv2 routers         | [9777]    |
| FF02::1A  | all-RPL-nodes             | [6550]    |
| FF02::6A  | MRD - All-Snoopers        | [4286]    |
| FF02::6B  | PTP-pdelay                |           |
| FF02::6C  | Saratoga                  |           |
| FF02::FB  | mDNSv6                    | [6762]    |

[4291]: https://datatracker.ietf.org/doc/html/rfc4291
[1075]: https://datatracker.ietf.org/doc/html/rfc1075
[2328]: https://datatracker.ietf.org/doc/html/rfc2328
[2080]: https://datatracker.ietf.org/doc/html/rfc2080
[7868]: https://datatracker.ietf.org/doc/html/rfc7868
[9568]: https://datatracker.ietf.org/doc/html/rfc9568
[9624]: https://datatracker.ietf.org/doc/html/rfc9624
[9777]: https://datatracker.ietf.org/doc/html/rfc9777
[6550]: https://datatracker.ietf.org/doc/html/rfc6550
[4286]: https://datatracker.ietf.org/doc/html/rfc4286
[6762]: https://datatracker.ietf.org/doc/html/rfc6762

## References

[IPv6 Multicast Address Space - IANA](https://www.iana.org/assignments/ipv6-multicast-addresses/ipv6-multicast-addresses.xhtml)
