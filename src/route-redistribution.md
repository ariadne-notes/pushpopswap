# Route Redistribution

## Terms

**[Administrative Distance]**

How trusted a route is, if two routes have the same subnet and mask.

[Administrative Distance]: ./study-tables.md#cisco-administrative-distance

**One-way Redistribution**

Useful for WAN edges, to learn a few subnets and add them into the core. The WAN network or branch site gets a default route.

**Two-way Redistribution**

Used nearer the core, the router redistributes both ways. This can cause feedback loops without techniques like route filters.

**Seed Metric**

The values given to the receiving routing protocol.


**Route Loop**

Traffic bounces back-and-forth between two routers until the TTL reaches 0.

**Route Feedback**

A redistributed route in a protocol with a better AD, is fed back into a protocol with a lower AD.

Route feedback can be fixed by modifying Administrative Distance with `distance` commands.

## Rules

**Non-Transitive**

If a router is running three routing protocols, for full-reachability, each routing protocol needs the other two protocols redistributed into each other.

**Routes Must Be In the RIB**

The router doing the redistribution needs to have the route *installed*.

**Seed Metrics Matter**

Fast links should get better seed metrics that slower links.

Always provide a meaningful seed metric.

## Troubleshooting

`debug ip routing`

Show changes to the routing table.

## Seed metric preference

If multiple seed metrics are applied, this is the order of preference.

1. Route Map applied `redistribute`
2. `redistribute`
3. `default-metric`

## References

B. Edgeworth and R. Lacoste, CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide, 2nd ed. Indianapolis, IN: Cisco Press, 2023.
