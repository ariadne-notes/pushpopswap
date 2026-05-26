# IPv4 to IPV6 Migration Strategies

- **Dual-stack:** AKA, Native Mode. Both at the same time. Twice the administrative overhead
- **Tunneling:** Send the IPv6 packets to tunnel to cross a IPv4 core.
- **Translation:** Make the IPv6 packets back into IPv4 packets.
- **Hybrid Model:** Uses ISATAP
- **ISATAP:** Intra-Site Automatic Tunneling Addressing
- **Service Blocks:** Combing tunnels with dual-stack.

## Native Mode

- DNS determines which stack gets used, by returning AAAA records first most of the time. Since the host gets an AAAA record it will connect with IPv6. This strategy is called "Happy Eyeballs" after the RFC

## Tunneling

- Reduces MTU by 20 bytes.
- The preferred tunnel is GRE.

## Automatic Tunnels

- **6to4:** Uses `2002::/16`
- **6RD:** The ISP uses it's own addressing.
- **ISATAP:** Uses these 32 bits to denotes ISATAP `0000:5EFE`

## Translation

- Much like NAT

## DNS64 And NAT64

- **DNS64:** DNS creates synthetic AAAA records, so a v4 client can connect to a v6 service.
- **NAT64:** A router translates IPv6 traffic to IPv4 traffic.


## References

[Happy Eyeballs Version 2: Better Connectivity Using Concurrency](https://www.rfc-editor.org/rfc/rfc8305)

[Connection of IPv6 Domains via IPv4 Clouds](https://www.rfc-editor.org/rfc/rfc3056)

[Framework for IPv4/IPv6 Translation](https://www.rfc-editor.org/rfc/rfc6144)
