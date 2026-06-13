# Multicast

## Terms

**Multicast**

- A one-to-many service using UDP packets destined to group IP address
- Hosts subscribe to the group, routers and switches replicate for the group

**IGMP** --- Internet Group Management Protocol

- Receivers send IGMP to LHR to request multicast streams
- Switches see IGMP (for snooping), and the LHR uses this to build the MDT

**PIM** --- Protocol Independent Multicast

- Multicast capable routers communicate to each over via PIM

**IIF** --- Incoming Interface

- AKA, the RPL interface
- Part of the MDT

**OIL** --- Outgoing Interface List

 - Part of the MDT

**MDT** --- Multicast Distribution Tree

- The full set of links participating in multicast, via PIM, IGMP, including IILs, and OILs

**RP** --- Rendezvous Point

- A router designated as the root of a shared tree

**(*, G)** 

- Pronounced as "Star comma Gee"
-  AKA, a shared tree
- Require a RP
- Called Star comma Gee, because typing "show ip mroute" ... this is what shows up

**(S, G)** 

- Pronounced as "Ess comma Gee"
- AKA a source tree. These do not require a RP

**Source Tree** 

- AKA, SPT, or shortest path tree. SPT is best tree.

**RPT** --- Rendezvous Point Tree

- *,G that points towards the RP.

**ASM** --- Any Source Multicast

- The host only knows the group it wants to receive (239.10.10.10)

**SSM** --- Source Specific Multicast

- The host already knows the source, and group address (10.0.0.1, 232.10.10.10)

**Upstream**

- Towards the source

**Downstream** 

- Towards group members

**FHR** --- First hop router

 - This router receives a multicast stream

**LHR** --- Last Hop Router

- Receives IGMP messages from receivers, which are translated into PIM join messages

**MRIB** --- Multicast Routing Information Base

- Shows RPTs, SPTs, RPFIs, OILs, and IILs

**MFIB** --- Multicast Forwarding Information Base

- AKA MFIB
- Used the program the ASICS

**RIB** --- Routing Information Base

**DF** --- Designated Forwarder 

- Used in PIDIR-PIM

## RPF - Reverse Path Forwarding

PIM is protocol independent, in the sense, that if a stream turns on, it must have a source, so it takes the form `(0.0.0.1, 239.1.1.1)`, a `(S,G)`.

If we do `show ip route 10.0.0.1`, we'll see the interface the router intends to send any traffic towards that source address. This is the *upstream* interface.

As multicast traffic flows from 10.0.0.1, it should flow into the upstream interface, and out of any downstream interfaces the *OIL*.

Tracing the traffic back to the source this way is called *reverse path forwarding* and the interface along this path is the RPF.

The PIM neighbor on the RPF is called the *RPF neighbor*.

Any multi-cast traffic from any given source, not received on the RPF is discarded. This prevents loops.

## Shared Trees

(*,G) entries in the mroute table require fewer resources, since multiple sources can use the same tree.

(*,G) entries in the mroute table represent a security risk, because any source can send to this shared tree.

## Theory (in V4)

Multicast is always TO a group, a destination, or a set of destinations.

Multicast comes from an older time. Unlike Unicast addresses, you can tell via bits if a v4 address is multicast.

A multicast address always start with `1110`

| Address Scopes      | Description                                                                          |
| ------------------- | --------------                                                                       |
| `224.0.0.0/4`       | Multicast Supernet                                                                   |
| `224.0.0.0/24`      | Local Control (TTL=1)                                                                |
| `224.0.1.0/24`      | Internetwork Control (an example is NTP, Cisco RP-Announce, Cisco RP-Discovery)      |
| `232.0.0.0/8`       | Source-Specific Multicast (SSM). Via an extension PIM can build (S,G) MDTs.          |
| `233.0.0.0/8`       | GLOP! Companies with a 16-bit ASN can have globally static multicast. 233.X.Y.0/24   |
| `239.0.0.0/8`       | Organization-Local Scope. Exactly like RFC1918, but for multicast.                   |

## Common L3 Addresses

### Same Broadcast Domain

| Protocol           | Multicast Address |
| -------------------| ------------------|
| all-hosts          | 224.0.0.1         |
| all-routers        | 224.0.0.2         |
| OSPF-hello         | 224.0.0.5         |
| OSPF-DR            | 224.0.0.6         |
| RIPv2              | 224.0.0.9         |
| EIGRP              | 224.0.0.10        |
| PIM                | 224.0.0.13        |
| mDNS               | 224.0.0.251       |

### Can Be Forwarded

| Protocol           | Multicast Address | Notes                                              |
| -------------------|-------------------|----------------------------------------------------|
| ntp                | 224.0.1.1         |                                                    |
| cisco-rp-announce  | 224.0.1.39        | Candidate RPs announce every 60s. Highest IP wins. |
| cisco-rp-discovery | 224.0.1.40        | Mapping agent floods RP-to-group mappings.         |


### PIM 

PIM forms adjacencies in only one direction

The multicast source is the root of the tree. Packets flow downstream from the source. Control plane traffic like PIM joins flow upstream to the RP, or to the reciever.


| Protocol           | Multicast Address |
| -------------------| ------------------|
| all-hosts          | 224.0.0.1         |
| all-routers        | 224.0.0.2         |
| OSPF-hello         | 224.0.0.5         |
| OSPF-DR            | 224.0.0.6         |
| RIPv2              | 224.0.0.9         |
| EIGRP              | 224.0.0.10        |
| PIM                | 224.0.0.13        |
| mDNS               | 224.0.0.251       |

[IANA Assignments](https://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml)

## PIM

| PIM Mode             | Full Name             | How it works                                                                                                           |
| ---------------------|-----------------------|------------------------------------------------------                                                                  |
| PIM-DM               | Dense Mode            | No RP. Floods everywhere, routers send prune messages to un-join. Assumes everyone wants the traffic.                  |
| PIM-SM               | Sparse Mode           | Complex. Requires a RP, RP Discovery, and phases. Uses register messages, and both tree types.                         |
| PIM Sparse-Dense     | Sparse-Dense Mode     | Runs sparse for groups with a known RP, dense for groups without. Legacy transitional mode.                            |
| Bidir-PIM            | Bidirectional         | Shared tree only, traffic flows both toward and away from RP. No SPT switchover. Good for many-to-many applications.   |
| PIM-SSM              | Source Specific       | No RP. Receiver specifies both source and group (S,G).                                                                 |


## PIM Message Types

| Type | Message Type               | Destination                       | Purpose                                                                                            |
|------|----------------------------|-----------------------------------|----------------------------------------------------------------------------------------------------|
| 0    | Hello                      | 224.0.0.13 (all PIM routers)      | Establish adjacency, negotiate parameters.                                                         |
| 1    | Register                   | RP address (unicast)              | First-hop router notifies RP of new source, encapsulates multicast data until SPT is built.        |
| 2    | Register stop              | First-hop router (unicast)        | RP tells first-hop router to stop sending Register messages.                                       |
| 3    | Join/prune                 | 224.0.0.13 (all PIM routers)      | Join or prune a multicast tree, either (*,G) toward RP or (S,G) toward source.                     |
| 4    | Bootstrap                  | 224.0.0.13 (all PIM routers)      | BSR floods RP-set information throughout the domain so all routers know candidate RPs.             |
| 5    | Assert                     | 224.0.0.13 (all PIM routers)      | Elect a single forwarder on a multi-access segment when duplicate traffic is detected.             |
| 8    | Candidate RP advertisement | Bootstrap router (BSR) (unicast)  | Candidate RPs advertise themselves to the BSR.                                                     |
| 9    | State refresh              | 224.0.0.13 (all PIM routers)      | PIM-DM only. Prevents prune state from timing out and triggering a re-flood.                       |
| 10   | DF election                | 224.0.0.13 (all PIM routers)      | Bidir-PIM only. Elects a Designated Forwarder per link to forward traffic toward the RP.           |


## Shared-Tree (*,G)

- Shared trees are essential for multiple senders to the same group
- A single tree is built for each group, regardless of source
  - 3 sources, 1 tree
- Selects a router as the root of the tree
- If a receiver is on the same subnet as the sending host, it will need to revert to PIM Dense for that segment

- This isn't always better. Shared trees will typically take suboptimal paths through a network
- Source trees are better distributed, hence they are more robust
- RP Selection is a hassle

## Source Based Multicast (S,G)

- PIM dense uses a separate tree for each multicast source and destination group.
- Groups do not share trees.
  - 3 Sources 3 trees.

## Commands

```console,editable
show mrib route
show ip mroute
!
! PIM
!
show pim rpf hash
show pim range-list
show pim topology
!
! What interface should I receive this host traffic from?
!
show ip rpf 10.0.0.0
show ip mfib
!
! See if multicast even works
!
show ip pim stats
!
! PIM traffic
!
show ip pim interface detail
!
! DF election
!
show ip pim interface df
```

```console
FLAGS
 A - Accepting. This interface is accepting data
 F - Forwarding. Where to send multicast traffic
```

## Nexus 7K

`show forwarding multicast route group <>`

## Lab Stuff

BPF - Capture all PIM, but not PIM hello messages.

`ip proto 103 and not ether[34] == 0x20`

## References

[IP Multicast - Cisco](https://www.cisco.com/c/en/us/tech/ip/ip-multicast/index.html)