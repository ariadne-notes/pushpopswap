# L3VPN

Customer Exchanges routes with the provider via a routing protocol

VPN just means isolation. No encryption or confidentiality

PE-CE links are their own island

VRF = VPN Routing Forwarding Instance

You can use loopbacks to route between VRFs

L3VPNs rely on Extended Comunnities.

-  Basically just arbitrary TLVs attached to BGP prefixes

VPNV4 = PE to PE Label Information
ipv4 unicast vrf = BGP within vrfs for PE to CE connectivity

## Example


```console
router bgp 100
 neighbor 3.3.3.3 remote-as 100  ! note the neighbor is the same AS, this is the PE
!
address-family vpnv4
 neighbor 3.3.3.3 activate ! this is a global neighbor, part of our network
 neighbor 3.3.3.3 send-community extended
!
address-family ipv4 unicast vrf red
 neighbor 4.4.4.4 remote-as 400 ! Customer neighbor, in their own VRF instance 
 neighbor 4.4.4.4 activate ! this is if you speak BGP to them. It could be any VRF aware IGP. You need to redistribute from the IGP into BGP
```

## Route distinguishers


- ALL CE routes from ALL VRFs are placed into the same VPNv4 table. What makes them unique to vrfs are the RDs.
  - Transparent to the customer, and only lives on the PE router
  - `100:100:192.168.10/24`

## Route targets

- This is the BGP extended community
- `route-target export` adds the community to the outbound update
- `route-target import` defines what routes to bring into the VRF

One RD per customer site.


`show ip bgp vpnv4 all sum` VPNv4
`show ip bgp sum`  IPv4

LDP label gets from PE to PE
VPN label identifies VRF to remote PE
