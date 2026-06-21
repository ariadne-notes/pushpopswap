# OSPF

OSPF is protocol 89.

## Terms

**IFF** --- If and only if

**LSA** --- Link State Advertisement

**LSDB** --- Link-State Database

**OSPF Process ID**

Just where the databases lives. Not transmitted. Allows multiple OSPF processes.

**DR** --- Designated Router

The network vertex for a broadcast or NBMA network. Used to simplify the number of FULL adjacencies.

**Advertising Router**

The router that created the LSA. The value in this field is the RID.

**RID** --- Router ID

A unique 32-bit number to identify the router in a graph. Doesn't have to be an IP-the-box, but is usually a loopback.

**The Update Rule**

A router can only modify an LSA, iff it's RID is inside the "Advertising Router" field.

**LS Sequence**

Higher sequence numbers are newer LSAs. The first sequence number in any LSA is `0x80000001`

**LS Checksum**

Used to ensure the LSA was transmitted without corruption. Everything is checked **except** LS Age.

**LS Age**

LSAs time out in an hour, and are refreshed every 30 minutes. LSA Age increments when they go through routers.

## Packet Types

| Type | Name                                  | Purpose                                                         |
|------|---------------------------------------|---------                                                        |
| 1    | **Hello**                             | OSPF puts the neighbor ID into it's hello messages.             |
| 2    | **Database Description (DBD/DDP)**    | A LSA that contains LSA headers, "I have these LSAs"            |
| 3    | **Link-State Request (LSR)**          | Requesting a specific LSA.                                      |
| 4    | **Link-State Update (LSU)**           | Sending a specific LSA.                                         |
| 5    | **Link-State Acknowledgment (LSAck)** | Acknowledging a specific LSA.                                   |

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

## Adjacency State Machine

| State | Description |
| ----------- |-------------|
| Down        | OSPF is running, no hello packets received yet. |
| Attempt     | NBMA mode, the router has sent OSPF packets. |
| Init        | The router sees hello packets. |
| 2-Way       | The router sees it's own router-id in the hello packet. |
| ExStart     | Routers vote on who exchanges LSDB first. |
| Loading     | Router DB has been exchanged, router is requesting specific LSAs. |
| Full        | LSDBs for this area are identical on both sides. |

## Routing Hierarchy

OSPF has four levels of routing hierarchy.

| Preference   | Route   | Purpose                                                |
|--------------|---------|--------------------------------------------------------|
| 1            | O       | Intra-area (same area)                                 |
| 2            | O IA    | Inter-area (same OSPF domain)                          |
| 3            | E1      | External type 1 (seed metric + IGP metric)             |
| 4            | E2      | External type 2 (just seed metric)                     |

The `bit E` is what makes E1 and E2 routes. The bit being set is an E2 route, which is considered less preferred.

## Default Route

OSPF has two ways of originating a default route.

`default-information originate` if a default route is present.

`default-information originate always` do it anyway.

## Cost

Should be set manually on each node.

The defaults make 100Mbps and above all the same cost.

```console,editable
auto-cost reference-bandwidth 40,000
```

## Area Summary

These will show up as an `O IA` route in OSPF, and a route-to-null on the ABR.

- Requires a route present in the RIB

### v4


```console,editable
router ospf 1
 router-id 2.2.2.2
 area 1 range 10.0.0.0 255.255.224.0
```

### v6

```console,editable
router ospfv3 1
 !
 address-family ipv6 unicast
  area 1 range 2001:DB8::/56
```

## Route-Filtering

You can use the same command to tell the router to ... exclude these routes from the backbone, via the `not-advertise` keyword.

### Using Range

The area command is now a route-filter.

#### v4

```console,editable
router ospf 1
 router-id 2.2.2.2
 area 1 range 10.0.0.0 255.255.224.0 not-advertise
```

#### v6

```console,editable
router ospfv3 1
 !
 address-family ipv6 unicast
  area 1 range 2001:DB8::/56 not-advertise
 exit-address-family
```

### Using Filter-Lists

These are a bit harder to use, `in` and `out` are **inbound** and **outbound** to the area.

For this topology

```text
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

```text,editable
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 10 deny 1.1.1.1/32
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 20 deny 2.2.2.2/32
ip prefix-list PREFIX_LIST_LOOPBACK_v4 seq 30 deny 3.3.3.3/32
!
router ospf 1
 area 0 filter-list prefix PREFIX_LIST_LOOPBACK_v4 in
 area 1 filter-list prefix PREFIX_LIST_LOOPBACK_v4 in
```

v6


```console,editable
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

- **NSSA:** From the RFC, this is a stub area with an ASBR. The LSAs within the area are LSA-7, and they get converted to LSA-5 by the ABR.
- **Totally Stubby NSSA:**, same as above, used to connect an external network, a default is injected as a LSA-3.

## References

[RFC 2328 - OSPF](https://datatracker.ietf.org/doc/html/rfc2328)
