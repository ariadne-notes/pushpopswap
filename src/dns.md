# DNS

DNS uses TCP and UDP.

- UDP, for user queries
- TCP
  - Zone transfers (how DNS replicates it's records to other DNS boxes)
  - Requests exceed 512 bytes
  - DNSSEC/EDNS

## DNS resource records

| RR    | Description                                                           |
| ----- | --------------------------------------------------------------------- |
| A     | v4 IP Address                                                         |
| AAAA  | v6 IP Address                                                         |
| CNAME | Alias or nickname. Secondary Name                                     |
| MX    | Email server                                                          |
| NS    | DNS Server                                                            |
| PTR   | Reverse Mapping of an IP. Used to find the host that "owns" the IP    |
| SOA   | Start of Authority. Which DNS server is authorative for the zone.     |

## DHCP & DNS placement

Always in groups of at least two, this is a HA service.

Each module should have it's own set of DHCP and DNS nodes.

| Location                      | DHCP | DNS                       |
| ----------------------------- | ---- | ------------------------- |
| Enterprise / Campus / DC      | Yes  | Internal DNS              |
| Enterprise / Remote / Branch  | Yes  | Internal DNS              |
| Enterprise / Remote / DC      | —    | Internal and External DNS |
| Enterprise / Edge / DMZ       | —    | External DNS              |
| Enterprise / Edge / WAN       | —    | —                         |
| Enterprise / Edge / VPN       | —    | —                         |
| SP / Edge                     | —    | External DNS              |
