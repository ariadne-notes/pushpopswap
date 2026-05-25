# MSDP

```plain
MSDP [Multicast Source Discovery Protocol] - Connecting PIM Sparse-Mode Domains

RFC 4611               MSDP Deployment Scenarios             # August 2006

1. Introduction

MSDP [RFC3618] is used primarily in two deployment scenarios:

o  Between PIM Domains

MSDP can be used between Protocol Independent Multicast Sparse
Mode (PIM-SM) [RFC4601] domains to convey information about active
sources available in other domains.  MSDP peering used in such
cases is generally one-to-one peering, and utilizes the
deterministic peer-RPF (Reverse Path Forwarding) rules described
in the MSDP specification (i.e., it does not use mesh-groups).
Peerings can be aggregated on a single MSDP peer.  Such a peer can
typically have from one to hundreds of peerings, which is similar
in scale to BGP peerings.

o  Within a PIM Domain

MSDP is often used between Anycast Rendezvous Points (Anycast-RPs)

[RFC3446] within a PIM domain to synchronize information about the
active sources being served by each Anycast-RP peer (by virtue of
IGP reachability).  MSDP peering used in this scenario is
typically based on MSDP mesh groups, where anywhere from two to
tens of peers can comprise a given mesh group, although more than
ten is not typical.  One or more of these mesh-group peers may
also have additional one-to-one peerings with MSDP peers outside
that PIM domain for discovery of external sources.  MSDP for
anycast-RP without external MSDP peering is a valid deployment
option and common.
```

## Startup


1. Multicast source starts up.
2. FHR router sends a register message to the closest RP.
3. RP registers this as a SA (Source Active).

4. Sends Source Active Messages to other RPs

(*,G) means there is an interested receiver.

## MSDP Configuration Example

```console
!
! RP1
!
int lo0
description "Only used for Anycast RP"
ip address 10.0.0.1 255.255.255.255

int lo1
ip add 10.1.1.1 255.255.255.255

ip msdp peer 10.1.1.2 connect-source loopback 1
ip msdp originator-id loopback 1
ip pim rp-address 10.0.0.1
```

```console
!
! RP2
!
int lo 0
  description "Only used for Anycast RP"
  ip address 10.0.0.1 255.255.255.255

int lo1
  ip address 10.1.1.2 255.255.255.255

ip msdp peer 10.1.1.1 connect-source lo1
ip msdp originator-id loopback 1
ip pim rp-address 10.0.0.1
```
