# Route Redistribution EIGRP

## Seed Metric

| Administrative Distance | Metric   |
|-------------------------|----------|
| 170                     | Infinity |

## Set Seed Metric

`default-metric bandwidth delay reliability load mtu`

## Route Feedback Solutions

**The Problem**

A route comes from RIP and moves through the routing domain like this:

```plain
RIP -> EIGRP -> OSPF -> EIGRP
120 -> 170   -> 110  -> 170
```

**The Solution**

Set EIGRP external to be a lower AD than OSPF.

```console,editable
router eigrp EIGRP_100
 !
 address-family ipv4 unicast autonomous-system 100
  !
  topology base
   distance eigrp 90 100
  exit-af-topology
 exit-address-family
```

## References

[Configure Mutual Redistribution Between EIGRP and BGP - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/113506-failover-eigrp-bgp-00.html)

B. Edgeworth and R. Lacoste, CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide, 2nd ed. Indianapolis, IN: Cisco Press, 2023.
