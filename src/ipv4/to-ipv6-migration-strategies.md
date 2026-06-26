# to IPV6 Migration Strategies

**Dual-stack**

- AKA, Native Mode
- AKA, Ships in the Night
- Both at the same time
- Twice the administrative overhead

**Tunneling**

- Encapsulate the IPv6 packets
- Into IPv4
- Send

**Translation**

- Make the IPv6 packets back into IPv4 packets.

**ISATAP** --- Intra-Site Automatic Tunneling Addressing

**Hybrid Model**

- Uses ISATAP

**Service Blocks**

- Combing tunnels with dual-stack.

## Native mode

Both stacks are running on clients. The clients request A and AAAA records near simultaneously.

Whichever DNS records return first decides if the next set of flows are v4 or v6.

This strategy is called "Happy Eyeballs" after the RFC. Do not punish users by "preferring" one protocol or another.

Do whatever is fastest.

## Tunneling

- Reduces MTU by 20 bytes.
- The preferred tunnel is GRE.

## Automatic tunnels

**6to4**


- Uses `2002::/16`

**6RD**

- The ISP uses its own addressing.

**ISATAP** --- Intra-site Automatic Tunnel Addressing Protocol


- Uses these 32 bits to denotes ISATAP `0000:5EFE`

## Translation

- Much like NAT

## DNS64 and NAT64

**DNS64**


- DNS creates synthetic AAAA records, so a v4 client can connect to a v6 service.

**NAT64**


- A router translates IPv6 traffic to IPv4 traffic.

## References

[Happy Eyeballs Version 2: Better Connectivity Using Concurrency](https://www.rfc-editor.org/rfc/rfc8305)

[Connection of IPv6 Domains via IPv4 Clouds](https://www.rfc-editor.org/rfc/rfc3056)

[Framework for IPv4/IPv6 Translation](https://www.rfc-editor.org/rfc/rfc6144)
