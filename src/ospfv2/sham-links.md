# Sham Links

## The problem

A customer with L3VPN service via OSPFv2-BGP-VPNv4 decides to connect two sites together via OSPFv2 backdoor, a direct connection they manage themselves.

When they turn on their private OSPFv2 peering, all the traffic between these two sites now prefers the new link, vs the L3VPN cloud.

## The solution

Sham links are needed because the routes provided by an L3VPN are `O IA`. When the OSPFv2 backdoor link comes up it will be preferred for two reasons:

- OSPFv2 has a lower AD than BGP
- `O` routes are preferred over `O IA`

A sham link makes two PE routers at different sites in the same customer VRF form an intra-area connection.

From [OSPF Sham-Link Support for MPLS VPN - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/15-sy/iro-15-sy-book/iro-sham-link.html#GUID-B0CBC9E8-D423-4AEF-BAB4-15FED3EA486C).

> Before you create a sham-link between PE routers in an MPLS VPN, you must:
>
> * Configure a new interface with a /32 address on the remote PE so that OSPF packets can be sent over the VPN backbone to the remote end of the sham-link. The /32 address must meet the following criteria:
>   * Belong to a VRF
>   * Not be advertised by OSPF
>   * Be advertised by BGP
>   * You can use the /32 address for other sham-links

## References

[What is OSPF Sham Links? how to configure OSPF Sham Links? - Cisco Community](https://community.cisco.com/t5/networking-blogs/what-is-ospf-sham-links-how-to-configure-ospf-sham-links/ba-p/4448216)
