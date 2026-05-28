# OSPF

OSPF is protocol 89.

## Terms


- **IFF** -- If and only if
- **LSA** --Link State Advertisement
- **LSDB** --Link-state Database
- **OSPF Process ID** -- Just where the databases live. Not transmitted. Allows multiple OSPF processes.
- **DR** Designated Router -- The network vertex for a broadcast or NBMA network. Used to simplify the number of FULL adjacencies.
- **Advertising Router** -- The router that created the LSA. The value in this field is the RID.
- **RID** -- Router ID. A unique 32-bit number to identify the router in a graph. Doesn't have to be an IP-the-box, but is usually a loopback.
- **The Update Rule** -- A router can only modify an LSA, iff it's RID is inside the "Advertising Router" field.
- **LS Sequence** -- Higher sequence numbers are newer LSAs. The first sequence number in any LSA is 8000000.
- **LS Checksum** -- Used to ensure the LSA was transmitted without corruption. Everything is checked **except** LS Age.
- **LS Age** -- LSAs time out in an hour, and are refreshed every 30 minutes. LSA Age increments when they go through routers.

## Packet Types


| Type | Name | Purpose |
|------|------|---------|
| 1 | **Hello**                             | OSPF puts the neighbor ID into it's hello messages. |
| 2 | **Database Description (DBD/DDP)**    | Used to sync a new neighbor rapidly. Large update packet, to transfer the LSDB in bulk. Contains lots of LSAs. |
| 3 | **Link-State Request (LSR)**          | The router wants a specific LSA.   |
| 4 | **Link-State Update (LSU)**           | The neighbor sends a specific LSA. |
| 5 | **Link-State Acknowledgment (LSAck)** | To confirm a device got the intended LSAs, it transmits the exact same LSAs back to the receiver. |

These can be thought of as the five steps.

1. We say hello, using each others names, to confirm we can both hear one another.
2. We share state (like the weather).
3. I ask how something went.
4. You tell me how it went.
5. To make sure I really got it, I'll repeat it word-for-word.

## Hello Packets

These things must match for an adjacency to form

- Subnet
- Subnet mask
- Interface MTU
- Area
- Area flags (NSSA, Stub)
- Is DR/BDR enabled
- Authentication
- Hello time
- Dead time

These must not match

- Router ID

Check with `debug ip ospf event`

### Broadcast Network Multicast Packet To Acknowledge Multiple Neighbors

```console
Ethernet II, Src: aa:bb:cc:00:4b:00 (aa:bb:cc:00:4b:00), Dst: IPv4mcast_05 (01:00:5e:00:00:05)
Internet Protocol Version 4, Src: 10.0.0.6, Dst: 224.0.0.5
Open Shortest Path First
  OSPF Header
  OSPF Hello Packet
      Network Mask: 255.255.255.0
      Hello Interval [sec]: 10
      Options: 0x12, (L) LLS Data block, (E) External Routing
      Router Priority: 1
      Router Dead Interval [sec]: 40
      Designated Router: 10.0.0.2
      Backup Designated Router: 10.0.0.1
      Active Neighbor: 1.1.1.1
      Active Neighbor: 2.2.2.2
      Active Neighbor: 3.3.3.3
      Active Neighbor: 4.4.4.4
      Active Neighbor: 5.5.5.5
```

## OSPF Adjacency State Machine


| State | Description |
| ----------- |-------------|
| Down        | OSPF is running, no hello packets received yet. |
| Attempt     | NBMA mode, the router has sent OSPF packets. |
| Init        | The router sees hello packets. |
| 2-Way       | The router sees it's own router-id in the hello packet. |
| ExStart     | Routers vote on who exchanges LSDB first. |
| Loading     | Router DB has been exchanged, router is requesting specific LSAs. |
| Full        | LSDBs for this area are identical on both sides. |

## DR And BDR


OSPF uses explicit acknowledgments (re-sending the LSAs), so as neighbors and adjacencies grow, the amount of OSPF traffic on a network increases.

A network with six ospf routers forming a full-mesh requires 30 adjacencies.

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

## Network LSAs

These are sent by the DR to describe the routers on this segment.

See [OSPF LSAs](./ospf-lsas.md) to see what the actual contents of the LSA.

## Identical Databases


Each router can perform it's own SPT via [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

LSAs are flooded throughout an area, all routers in the same area should have the same LSAs and same database.

```console
R1# show ip ospf database database-summary  | s Area 0
Area 0 database summary
  LSA Type      Count    Delete   Maxage
  Router        5        0        0       
  Network       5        0        0       
  Summary Net   8        0        0       
  Summary ASBR  2        0        0       
  Type-7 Ext    0        0        0       
    Prefixes redistributed in Type-7  0
  Opaque Link   0        0        0       
  Opaque Area   0        0        0       
  Subtotal      20       0        0
```

```console
R2# show ip ospf database database-summary | s Area 0
Area 0 database summary
  LSA Type      Count    Delete   Maxage
  Router        5        0        0       
  Network       5        0        0       
  Summary Net   8        0        0       
  Summary ASBR  2        0        0       
  Type-7 Ext    0        0        0       
    Prefixes redistributed in Type-7  0
  Opaque Link   0        0        0       
  Opaque Area   0        0        0       
  Subtotal      20       0        0
```

Can also check with [checksums](https://en.wikipedia.org/wiki/Fletcher%27s_checksum)

`show ip ospf | i Checksum`

## LSAs


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

## OSPF Hierarchy


OSPF has four levels of routing hierarchy

| Route   | Purpose |
|---------|--------------------------------------------------------|
| O       | Intra-area (same area)                                 |
| O IA    | Inter-area (same OSPF domain)                          |
| E1      | External type 1 (to an attached but non-OSPF domain)   |
| E2      | External type 2 (to the Internet)                      |

The `bit E` is what makes E1 and E2 routes. The bit being set is an E2 route, which is considered less preferred.

| Route  | Number | RFC Name         | Purpose                      | Description                                          |
| -----  | ------ | ---------------- | ---------------------------- | ---------------------------------------------------- |
| O      | 1      | Router-LSA       | interfaces on a router       | Flooded, Single Area, never crosses area boundary.   |
| O      | 2      | Network-LSA      | routers on a network         | Flooded, Single area, only sent by the DR.           |
| O IA   | 3      | Summary-LSA      | networks in other areas      | ABRs send these, to describe, routes to networks     |
| E1, E2 | 4      | Summary-LSA      | next-hop to a ASBR           | ABRs send these, to provide reachability for ASBRs.  |
| E1, E2 | 5      | AS-external-LSA  | routes to E1 or E2 networks  | ASBRs send these, to describe, routes to an AS.      |
| N1, N2 | 7      | NSSA Summaries   | routes to N1 or N2 networks  | NSSA ASBRs send these, to describe, routes to an AS. |

### Type 5 LSAs

```plain
        0                   1                   2                   3
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |            LS age             |     Options   |      5        |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                        Link State ID                          |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                     Advertising Router                        |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                     LS sequence number                        |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |         LS checksum           |             length            |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                         Network Mask                          |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |E|     0       |                  metric                       |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                      Forwarding address                       |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                      External Route Tag                       |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |E|    TOS      |                TOS  metric                    |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                      Forwarding address                       |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Default Route

OSPF has two ways of originating a default route.

`default-information originate` if a default route is present.

`default-information originate always` do it anyway.

## Cost


Default OSPF is all links above 100Mbps are the same cost.

```console
auto-cost reference-bandwidth 40,000
```

## Network Types

[OSPF Representation of routers and networks](https://www.rfc-editor.org/rfc/rfc2328#page-13)

| CLI                                   |      Network Types         | LSA Type 1 or 2	|   Use-case                                                            |
| ------------------------------------- | -----------------------    | -----------------| --------------------------------------------------------------------- |
| `ip ospf network broadcast`           | Broadcast		             | 2 - DR Election	|   Ethernet, Token Ring, FDDI                                          |
| `ip ospf network non-broadcast`       | NBMA[^NBMA]			     | 2 - DR Election 	|   X.25, frame-relay, ATM. Requires a full-mesh.                       |
| `ip ospf network point-to-point`      | point-to-point		     | 1 - No DR	    |   Serial links, Unnumbered, TDM, HDLC, PPP (Full Adjacency)           |
| `ip ospf network point-to-multipoint` | Hub and spoke on Ethernet	 | 1 - No DR		|   Hub and Spoke Topologies[^unicast], like DMVPN or Frame Relay       |

[^NBMA]: RFC compliant (??) implementation. For actual nbma networks use `ip ospf network point-to-multipoint`.
[^unicast]: The DR (which should be the HUB or bad things happen) needs to have static neighbor statements.

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

## Area Summary


These will show up as a IA route in OSPF, and a route-to-null on the ABR.

- requires a route present in the RIB.

v4 example.

```console
router ospf 1
 router-id 2.2.2.2
 area 1 range 10.0.0.0 255.255.224.0
```

v6 example.

```console
router ospfv3 1
 !
 address-family ipv6 unicast
  area 1 range 2001:DB8::/56
 exit-address-family
```

## Route-Filtering

You can use the same command to tell the router to ... exclude these routes from the backbone, via the `not-advertise` keyword.

### Using Range

The area command is now a route-filter.

v4 example.

```console
router ospf 1
 router-id 2.2.2.2
 area 1 range 10.0.0.0 255.255.224.0 not-advertise
```

v6 example.

```console
router ospfv3 1
 !
 address-family ipv6 unicast
  area 1 range 2001:DB8::/56 not-advertise
 exit-address-family
```

### Using Filter-Lists

These are a bit harder to use, `in` and `out` are **inbound** and **outbound** to the area.

For this topology

```console
             Area 0                               Area 1            
                                                               
                                 |           10.0.10.0/24           
                                 |         2001:db8:0:10/64         
                                 |                            +----+
                              +----+       +------------------+ R3 |
+----+                        |    +-------+                  +----+
| R1 +------------------------+ R2 |                        
+----+                        |    +------+     
             10.0.0.0/24      +----+      |                   +----+
           2001:db8:0:0/64       |        +-------------------+ R4 |
                                 |           10.0.20.0/24     +----+
                                 |         2001:db8:0:20/64         
```

v4

```console
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 10 deny 1.1.1.1/32
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 20 deny 2.2.2.2/32
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 30 deny 3.3.3.3/32
!
router ospf 1
 area 0 filter-list prefix PREFIX_LIST_LOOPBACK_v4 in
 area 1 filter-list prefix PREFIX_LIST_LOOPBACK_v4 in
```

v6


```console
!
ipv6 prefix-list PREFIX_LIST_v6 seq 10 deny FD::1/128
ipv6 prefix-list PREFIX_LIST_v6 seq 20 deny FD::3/128
ipv6 prefix-list PREFIX_LIST_v6 seq 30 deny FD::4/128
!
router ospfv3 1
 !
 address-family ipv6 unicast
  area 0 filter-list prefix PREFIX_LIST_v6 in
  area 1 filter-list prefix PREFIX_LIST_v6 in
```

### Area Types

#### No External Network Connections

- **Stub:** From the RFC, these don't have LSA-5 in them, so no external routes. A stub gets a default injected.
- **Totally Stubby:** A Cisco area, This blocks LSA-3, LSA-4, and LSA-5. The only injected LSA is a LSA-3 from the ABR for the default.

#### External Network connections

- **NSSA:** From the RFC, this is a stub area with an ASBR. The LSAs within the area are LSA-7, and they get converted to LSA-5 by the ASBR.
- **Totally Stubby NSSA:**, same as above, used to connect an external network, a default is injected as a LSA-3.

### Sham Link

#### The Problem

A customer with L3VPN service via OSPF-BGP-VPNv4 decides to connect two sites together via OSPF backdoor, a direct connection they manage themselves.

When they turn on their private OSPF peering, all the traffic between these two sites now prefers the new link, vs the L3VPN cloud.

#### The Solution: Sham Links

Sham links are needed because the routes provided by an L3VPN are `O IA`. When the OSPF backdoor link comes up it will be preferred for two reasons:

- OSPF has a lower AD than BGP.
- `O` routes are prefered over `O IA`

A sham link makes two PE routers at different sites in the same customer VRF form an intra-area connection.


From [OSPF Sham-Link Support for MPLS VPN - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/15-sy/iro-15-sy-book/iro-sham-link.html#GUID-B0CBC9E8-D423-4AEF-BAB4-15FED3EA486C).

> Before you create a sham-link between PE routers in an MPLS VPN, you must:
>
> * Configure a new interface with a /32 address on the remote PE so that OSPF packets can be sent over the VPN backbone to the remote end of the sham-link. The /32 address must meet the following criteria:
>   * Belong to a VRF
>   * Not be advertised by OSPF
>   * Be advertised by BGP
>   * You can use the /32 address for other sham-links

## References

[RFC 2328 - OSPF](https://datatracker.ietf.org/doc/html/rfc2328)
