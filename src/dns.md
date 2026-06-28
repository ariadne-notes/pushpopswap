# DNS

DNS uses TCP and UDP.

UDP is usually tried first.

**TC** --- **T**run**C**ation 

- Message was truncated due to length greater than permitted

[RFC 2181] says "try again with TCP"

[RFC 2181]: https://www.rfc-editor.org/info/rfc2181/#section-9

## DNS resource records

| RR    | Description                                                           |
| ----- | --------------------------------------------------------------------- |
| A     | v4 IP Address                                                         |
| AAAA  | v6 IP Address                                                         |
| CNAME | Alias or nickname. Secondary Name                                     |
| MX    | Email server                                                          |
| NS    | DNS Server                                                            |
| PTR   | Reverse Mapping of an IP. Used to find the host that "owns" the IP    |
| SOA   | Start of Authority. Which DNS server is authoritative for the zone.   |

## DHCP & DNS placement

Always in groups of at least two, this is a HA service.

Each module should have its own set of DHCP and DNS nodes.

| Location                      | DHCP | DNS                       |
| ----------------------------- | ---- | ------------------------- |
| Enterprise / Campus / DC      | Yes  | Internal DNS              |
| Enterprise / Remote / Branch  | Yes  | Internal DNS              |
| Enterprise / Remote / DC      | —    | Internal and External DNS |
| Enterprise / Edge / DMZ       | —    | External DNS              |
| Enterprise / Edge / WAN       | —    | —                         |
| Enterprise / Edge / VPN       | —    | —                         |
| SP / Edge                     | —    | External DNS              |

## References

[DNS and UDP truncation | APNIC Blog](https://blog.apnic.net/2024/02/27/dns-and-udp-truncation/)

[RFC 1035: STD 13: Domain names - implementation and specification](<https://www.rfc-editor.org/info/rfc1035/>)

[RFC 2181: Clarifications to the DNS Specification | RFC Editor](https://www.rfc-editor.org/info/rfc2181/)
