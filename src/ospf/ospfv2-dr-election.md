# OSPFv2 DR Election

OSPF is a full-mesh technology, every node wants to have a relationship with every other node in a subnet.

This means that as new nodes are added, the number of required adjacencies grows quadratically.

As the number of nodes on a segment increases, the number of links increases following this equation.

\\(\frac{n(n-1)}{2}\\)

This means with subnets with lots of OSPF neighbors, there is a scaling problem.

To solve the scaling problem, routers in broadcast topologies only form adjacencies with two devices, the DR and BDR.

This reduces the required adjacencies to \\(2n-3\\)

| Routers | Full-Mesh | With DR/BDR |
|--------:|----------:|------------:|
|       2 |         1 |           1 |
|       3 |         3 |           3 |
|       4 |         6 |           5 |
|       5 |        10 |           7 |
|       6 |        15 |           9 |
|       7 |        21 |          11 |
|       8 |        28 |          13 |
|       9 |        36 |          15 |
|      10 |        45 |          17 |
|      20 |       190 |          37 |
|      30 |       435 |          57 |
|      40 |       780 |          77 |
|      50 |      1225 |          97 |
|     100 |      4950 |         197 |

## How this works

OSPF normally goes "I am a router and these are my links and subnets" ... a type 1 LSA.

Instead, a type 2 LSA goes "these are my neighbors, I speak for them"

## Network Vertex, from RFC 2328

To mitigate the scaling problem, on broadcast segments OSPFv2 elects a DR, and BDR, to maintain the LSDB.

The RFC calls this a "network vertex". We can also use the term DR.

- All routers listen for hello on 224.0.0.5
- DR floods LSAs to the routers with 224.0.0.5
- DROTHER talks to the DR/BDR on 224.0.0.6

In the diagram (from the RFC), everything connects to N2, so problem solved.

```plain
Moy                         Standards Track                    [Page 13]
RFC 2328                     OSPF Version 2                   April 1998

                                                 **FROM**
             +---+      +---+
             |RT3|      |RT4|              |RT3|RT4|RT5|RT6|N2 |
             +---+      +---+        *  ------------------------
               |    N2    |          *  RT3|   |   |   |   | X |
         +----------------------+    T  RT4|   |   |   |   | X |
               |          |          O  RT5|   |   |   |   | X |
             +---+      +---+        *  RT6|   |   |   |   | X |
             |RT5|      |RT6|        *   N2| X | X | X | X |   |
             +---+      +---+

                         Broadcast or NBMA networks
```

## Example from lab outputs

**Topology**

```
                          
┌──────┐ ┌──────┐ ┌──────┐
│  R1  │ │  R2  │ │  R3  │
│ (DR) │ │ (BDR)│ │      │
└───┬──┘ └──┬───┘ └──┬───┘
    └─────┐ │  ┌─────┘    
         ┌┴─┴──┴┐         
         │ ───► │         
         │ ◄─── │         
         └┬─┬──┬┘         
    ┌─────┘ │  └─────┐    
┌───┴──┐ ┌──┴───┐ ┌──┴───┐
│  R4  │ │  R5  │ │  R6  │
└──────┘ └──────┘ └──────┘
                          
```

### DR

Forms full adjacencies.

```console
R1# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2          50   FULL/BDR        00:00:31    10.0.0.2        Ethernet0/0
3.3.3.3           1   FULL/DROTHER    00:00:37    10.0.0.3        Ethernet0/0
4.4.4.4           1   FULL/DROTHER    00:00:34    10.0.0.4        Ethernet0/0
5.5.5.5           1   FULL/DROTHER    00:00:32    10.0.0.5        Ethernet0/0
6.6.6.6           1   FULL/DROTHER    00:00:31    10.0.0.6        Ethernet0/0
```

- First router online on the segment is the DR.

### Drother

- Only forms full adjacencies with the DR, and BDR.
- When it sends LSAs, sends them to the DR/BDR via 224.0.0.6.

```console
R6# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
1.1.1.1         100   FULL/DR         00:00:35    10.0.0.1        Ethernet0/0
2.2.2.2          50   FULL/BDR        00:00:34    10.0.0.2        Ethernet0/0
3.3.3.3           1   2WAY/DROTHER    00:00:37    10.0.0.3        Ethernet0/0
4.4.4.4           1   2WAY/DROTHER    00:00:33    10.0.0.4        Ethernet0/0
5.5.5.5           1   2WAY/DROTHER    00:00:37    10.0.0.5        Ethernet0/0
```

## References

[RFC 2328: OSPF Version 2 | RFC Editor](https://www.rfc-editor.org/info/rfc2328/#section-2)
