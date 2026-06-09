# OSPF LSA Types

## LSA Type to Route Type

| Number | Route  | RFC Name         | Purpose                      | Description                                          |
|--------| -------| ---------------- | ---------------------------- | ---------------------------------------------------- |
| 1      | O      | Router-LSA       | interfaces on a router       | Flooded, Single Area, never crosses area boundary    |
| 2      | O      | Network-LSA      | routers on a network         | Flooded, Single area, only sent by the DR            |
| 3      | O IA   | Summary-LSA      | networks in other areas      | ABRs send these, to describe, routes to networks     |
| 4      | E1, E2 | Summary-LSA      | next-hop to a ASBR           | ABRs send these, to provide reachability for ASBRs   |
| 5      | E1, E2 | AS-external-LSA  | routes to E1 or E2 networks  | ASBRs send these, to describe, routes to an AS       |
| 7      | N1, N2 | NSSA Summaries   | routes to N1 or N2 networks  | NSSA ASBRs send these, to describe, routes to an AS  |

## Format

The Router ID is what is used to build the SPT. It's very important it's both

- Correct
- Easy to identify the router

```plain
  +-------------------------+ Three fields to differentiate LSAs
  |         LS Age          |     - LS Type
  +-------------------------+     - Link State ID
  |  Options      LS Type   |     - Advertising Router
  +-------------------------+
  |     Link State ID       |  < -- Unique number from the Advertising Router for Each LSA
  +-------------------------+
  |   Advertising Router    |  < -- Router ID
  +-------------------------+
  |    LS Sequence Number   |  < -- How old the LSA is. LSAs with higher numbers are updates to older LSAs
  +-------------------------+
  |      LS Checksum        |
  +-------------------------+
  |        Length           |
  +-------------------------+
```
