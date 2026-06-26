# BGP

BGP defaults allow only eBGP learned routes to be redistributed.

To change this use `bgp redistribute-internal`.

> [!CAUTION]
> Redistribution of iBGP routes into an IGP can cause routing loops.
>
> The IGPs should have route filters set.

## Seed metric

| Administrative Distance | Metric     |
|-------------------------|------------|
| 20                      | IGP to MED |

## Redistribute transport networks

This is the safe way to redistribute connected networks. Useful for transit or peering links.

```console,editable
router bgp 65100
 address-family ipv4
  redistribute connected route-map RM_BGP_LOOPBACK
!
route-map RM_BGP_LOOPBACK permit 10
 match interface Loopback0
```

## Redistribute all OSPF routes

```conosle,editable
router bgp 100
 redistribute ospf 1 match internal external 1 external 2 
```

## References

[Understand the Redistribution of OSPF Routes into BGP - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/5242-bgp-ospf-redis.html)

B. Edgeworth and R. Lacoste, CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide, 2nd ed. Indianapolis, IN: Cisco Press, 2023.
