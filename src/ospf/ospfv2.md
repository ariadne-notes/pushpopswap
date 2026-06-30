# OSPFv2

OSPFv2 is protocol 89.

## Terms

**LS** --- Link State

**LSA** --- Link State Advertisement

**LSDB** --- Link-State Database

**RID** --- Router ID

- Unique 32-bit number to identify the router in a graph
- Doesn't have to be an on-the-box IP, but is usually a loopback
- Should be easy to identify from a Router-ID subnet

**Process ID**

- Where the databases lives
- Not transmitted
- Allows multiple OSPFv2 processes

**DR** --- Designated Router

- Network vertex for a broadcast or NBMA network
- Used to reduce the number of FULL adjacencies

**Advertising Router**

- Router that created the LSA
- Value in this field is the RID



**The Update Rule**

- Routers can only modify LSAs they originate
- Its RID is inside the "Advertising Router" field

**LS Sequence**

- The first sequence number in any LSA is `0x80000001`
- Higher sequence numbers are newer LSAs

**LS Checksum**

- Used to ensure the LSA was transmitted without corruption
- Everything is checked **except** LS Age

**LS Age**

- LSAs time out in an hour
- Refreshed every 30 minutes
- LSA Age increments traveling through routers

**IFF** --- If and only if

## Packet types

| Type | Name                  | Short Name | Purpose                                              |
|------|-----------------------|------------|------------------------------------------------------|
| 1    | Hello                 | Hello      | OSPFv2 puts the neighbor ID into it's hello messages |
| 2    | Database Description  | DBD/DDP    | A LSA that contains LSA headers, "I have these LSAs" |
| 3    | LS Request            | LSR        | Requesting a specific LSA                            |
| 4    | LS Update             | LSU        | Send a specific LSA                                  |
| 5    | LS Acknowledgment     | LSAck      | Acknowledging a specific LSA                         |

## Hello packets

These things must match for an adjacency to form

- Hello time
- Dead time
- Subnet
- Subnet mask
- Interface MTU
- Area
- Area flags (NSSA, Stub)
- Is DR/BDR enabled
- Authentication

These must not match

- Router ID

Check with `debug ip ospf event`

## Identical databases

Each router can perform its own SPT via [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

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

## Adjacency state machine

| State | Description |
| ----------- |-------------|
| Down        | OSPFv2 is running, no hello packets received yet. |
| Attempt     | NBMA mode, the router has sent OSPFv2 packets. |
| Init        | The router sees hello packets. |
| 2-Way       | The router sees it's own router-id in the hello packet. |
| ExStart     | Routers vote on who exchanges LSDB first. |
| Loading     | Router DB has been exchanged, router is requesting specific LSAs. |
| Full        | LSDBs for this area are identical on both sides. |

## Routing hierarchy

OSPFv2 has four levels of routing hierarchy.

| Preference   | Route   | Purpose                                                |
|--------------|---------|--------------------------------------------------------|
| 1            | O       | Intra-area (same area)                                 |
| 2            | O IA    | Inter-area (same OSPFv2 domain)                        |
| 3            | E1      | External type 1 (seed metric + IGP metric)             |
| 4            | E2      | External type 2 (just seed metric)                     |

The `bit E` is what makes E1 and E2 routes. The bit being set is an E2 route, which is considered less preferred.

## Default route

OSPFv2 has two ways of originating a default route.

`default-information originate` if a default route is present.

`default-information originate always` do it anyway.

## Cost

Should be set manually on each node.

The defaults make 100Mbps and above all the same cost.

```console,editable
auto-cost reference-bandwidth 40,000
```

## Area summary

These will show up as an `O IA` route in OSPFv2, and a route-to-null on the ABR.

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

### Using range

The area command is now a route-filter.

#### Range v4

```console,editable
router ospf 1
 router-id 2.2.2.2
 area 1 range 10.0.0.0 255.255.224.0 not-advertise
```

#### Range v6

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

## OSPF graceful restart

[RFC 3623]: https://datatracker.ietf.org/doc/html/rfc3623

- Restart OSPF without dropping adjacencies
- Keeps the OSPF table in memory while OSPF rebuilds.

### Area types

I made a [chart].

[chart]: /ospf/ospfv2-network-and-lsa-chart.md

## References

[RFC 2328 - OSPF Version 2](https://datatracker.ietf.org/doc/html/rfc2328)

J. T. Moy, OSPF: Anatomy of an Internet Routing Protocol. Reading, MA: Addison-Wesley, 1998.
