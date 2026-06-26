# OSPF

## Seed metrics

| Administrative Distance | Source Protocol | Metric   | Route Type |
|-------------------------|-----------------|----------|------------|
| 110                     | BGP             | 1        | E2         |
| 110                     | Anything Else   | 20       | E2         |

## Redistribution

The subnets keyword is required, or OSPF will work in a classful way.

```console
redistribute source-protocol [subnets] [metric metric] [metric-type {1 | 2}] [tag 0-4294967295] [route-map route-map-name]
```

## Distance

Modify the AD for different kinds of LSAs.

```console
distance ospf {external | inter-area | intra-area} ad
```

Modify the AD for specific routes.

```console
distance ad source-ip source-ip-wildcard [acl-number | acl-name]
```

## References

[Redistribute OSPF Among Different OSPF Processes - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/4170-ospfprocesses.html)

B. Edgeworth and R. Lacoste, CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide, 2nd ed. Indianapolis, IN: Cisco Press, 2023.
