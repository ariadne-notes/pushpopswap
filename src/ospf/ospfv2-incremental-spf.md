# OSPFv2 Incremental SPF

Very new.

Cisco IOS XE 17.18.1

> Normally, OSPF uses Dijkstra’s SPF algorithm to compute the shortest path tree (SPT). During the computation of the SPT, the shortest path to each node is discovered. The topology tree populates the routing table with routes to IP networks.
>
> When changes to a Type-1 or Type-2 link-state advertisement (LSA) occur in an area, the entire SPT is recomputed. In many cases, the entire SPT need not be recomputed because most of the tree remains unchanged.
>
> Incremental SPF allows the system to recompute only the affected part of the tree. Recomputing only a portion of the tree, rather than the entire tree, results in faster OSPF convergence and saves CPU resources. If the change to a Type-1 or Type-2 LSA occurs in the calculating device itself, the system performs a full SPT.

Source IOS-XE 17 [OSPF Incremental SPF Support].

[OSPF Incremental SPF Support]: https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/ospf/ospf-configuration-guide/ospf-incremental-spf-support.html

## Config

```console,editable
router ospf 1
  ispf
```

## References

[Cisco - Incremental SPF - Review OSPF Frequently Asked Questions](https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/9237-9.html#toc-hId--753549396)

[Cisco - Incremental SPF - OSPF Configuration Guide - IOS XE 17](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/ospf/ospf-configuration-guide/ospf-incremental-spf-support.html)