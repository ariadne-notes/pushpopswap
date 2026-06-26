# Network Types

[OSPF Representation of routers and networks](https://www.rfc-editor.org/rfc/rfc2328#page-13)

| CLI                                   |      Network Types         | LSA Type 1 or 2  |   Use-case                                                            |
| ------------------------------------- | ---------------------------| -----------------| ----------------------------------------------------------------------|
| `ip ospf network broadcast`           | Broadcast                  | 2 - DR Election  | Ethernet, Token Ring, FDDI                                            |
| `ip ospf network non-broadcast`       | NBMA                       | 2 - DR Election  | X.25, frame-relay, ATM. Requires a full-mesh.                         |
| `ip ospf network point-to-point`      | Point-To-Point             | 1 - No DR        | Serial links, Unnumbered, TDM, HDLC, PPP (Full Adjacency)             |
| `ip ospf network point-to-multipoint` | Hub and Spoke on Ethernet  | 1 - No DR        | Hub and Spoke Topologies, like DMVPN or Frame Relay                   |

```plain
Moy                         Standards Track                    [Page 13]

RFC 2328                     OSPF Version 2                   April 1998

                                                  **FROM**

                                           *      |RT1|RT2|
                +---+Ia    +---+           *   ------------
                |RT1|------|RT2|           T   RT1|   | X |
                +---+    Ib+---+           O   RT2| X |   |
                                           *    Ia|   | X |
                                           *    Ib| X |   |

                     Physical point-to-point networks


                                                  **FROM**
                      +---+                *
                      |RT7|                *      |RT7| N3|
                      +---+                T   ------------
                        |                  O   RT7|   |   |
            +----------------------+       *    N3| X |   |
                       N3                  *

                              Stub networks

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

## References

[RFC 2328 - OSPF](https://datatracker.ietf.org/doc/html/rfc2328)
