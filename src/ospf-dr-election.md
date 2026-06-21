# OSPF DR Election

## DR And BDR

OSPF uses explicit acknowledgments (re-sending the LSAs), so as neighbors and adjacencies grow, the amount of OSPF traffic on a network increases.

A network with six ospf routers forming a full-mesh requires 15 adjacencies.

To mitigate the scaling problem, on broadcast segments OSPF elects a DR, and BDR, to maintain the LSDB.

The RFC calls this a "network vertex". We can also use the term DR.

- All routers listen for hello on 224.0.0.5
- DR floods LSAs to the routers with 224.0.0.5
- DROTHER talks to the DR/BDR on 224.0.0.6

In the diagram (from the RFC), everything connects to N2, so problem solved.

```plain
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

See [OSPF LSAs](./ospf-lsas.md) to see what the actual contents of the LSAs are.


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
R1# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2          50   FULL/BDR        00:00:31    10.0.0.2        Ethernet0/0
3.3.3.3           1   FULL/DROTHER    00:00:37    10.0.0.3        Ethernet0/0
4.4.4.4           1   FULL/DROTHER    00:00:34    10.0.0.4        Ethernet0/0
5.5.5.5           1   FULL/DROTHER    00:00:32    10.0.0.5        Ethernet0/0
6.6.6.6           1   FULL/DROTHER    00:00:31    10.0.0.6        Ethernet0/0
```
