# EIGRP

## Terms

**[DUAL]** --- Diffusing update algorithm

[DUAL]: https://en.wikipedia.org/wiki/Diffusing_update_algorithm

- Invented by J.J. Garcia-Luna-Aceves
- Feasibility conditions

**Successor route**

- AKA, Successful Route
- The current best path
- Smallest metric

**Successor**

- First next-hop router for the successor route

**Feasible distance (FD)**

- Lowest metric to reach a subnet
- Sum of the RD + local cost

**Reported distance (RD)**

- Metric inside a route update from another router
- The sending router included its FD, which becomes our RD

**Feasibility condition**

- Easy backup routes
- Not all possible backup routes
- Mathematical

- If backup
  -  RD is be less than the current FD

**Feasible successor**

- Route
  - Satisfies the feasibility condition
  - Maintained as a backup route

**Split Horizon**

- Never advertise a network, out the same interface it was learned on

**Poison Reverse**

- If you must advertise a network out the same interface it was received on, advertise the delay as infinity

**Count to Infinity**

- If EIGRP reaches 100 hops, the route is discarded

**RTP** --- Reliable Transport Protocol

- Used for EIGRP packets

**Topology Table**

- Metric information for all known routes

## Packet types

EIGRP uses a mixture of unicast and multicast while its working.

Multicast is `224.0.0.10`

| Packet              | Reliable | Purpose                      | Multicast                               | Unicast                    |
|---------------------|----------|------------------------------|-----------------------------------------|----------------------------|
| Hello/Ack           | No       | Neighbor Adjacency           | Every 5s, 60s on WAN ≤ 1.544 Mbps       | —                          |
| Update              | Yes      | Routing info                 | Inform neighbors of link/metric changes | New Neighbors              |
| Query/Reply         | Yes      | Query for feasible successor | Ask neighbors                           | Reply to query             |
| SIA-Query/SIA-Reply | Yes      | Stuck in Active Outstanding  | —                                       | Reply to SIA-query         |

## Metrics

- See [EIGRP Classic Metric].
- See [EIGRP Wide Metric].

[EIGRP Classic Metric]: /eigrp-classic-metric.md
[EIGRP Wide Metric]: /eigrp-wide-metric.md

## Feasible successor algorithm

**Topology**

```plain
┌────────┐            1000             ┌────────┐    10.0.0.0/24
│   R1   ├─────────────────────────────┤   R2   ├──────────────────
└─────┬──┘                             └─┬──────┘      2000
      │            ┌────────┐            │
      └────────────┤   R3   ├────────────┘
         50        └────────┘      50
```

R2 sends an update

- 10.0.0.0/24 - RD is 2000

R3 Sends an update

- 10.0.0.0/24 - RD is 2050

R1 calculates total path metric

- R2 is 2000 + 1000 = 3000
- R3 is 2050 +   50 = 2100  < - Successor route

**Results**

- R1 installs the successor route as R1-R2
- R1 picks R1-R3 as the feasible successor because the RD (2050) is less than the FD

**Results in the CLI**

```console
R1# show ip eigrp topology 10.0.0.0/24
EIGRP-IPv4 Topology Entry for AS(1)/ID(1.1.1.1) for 10.0.0.0/24
  State is Passive, Query origin flag is 1, 1 Successor(s), FD is 2100
P 10.0.0.0/24, 1 successors, FD is 2100                <--- Feasible Distance
        via 10.0.13.3 (2100/2050), GigabitEthernet0/3  <--- Successor Route
        via 10.0.12.2 (3000/2000), GigabitEthernet0/2  <--- Feasible Successor
                       |     |
                       |     +-- Reported Distance
                       +-------- Path Metric

                                                             (RD 2000 < FD 2100)
```

## Unequal cost multi path

EIGRP can load balance over the successor and feasible successor routes with a variance command.

## Timers

- Hello packets are every 5 seconds, on 60 seconds on T1 links
  - The deadtime is 3x the hello timer

## Initial bringup

- Send Hello packets, to 224.0.0.10
  - Doesn't' require multicast to be on
  - Unicast Init from neighbor, set Seq, Set Ack to 0
    - Neighbor Sends back Ack as prior sequence number
    - Update Messages

## Stuck in active

- The router is too busy to answer the query (generally due to high CPU utilization)
- The router has memory problems and cannot allocate the memory to process the query or build the reply packet
- The circuit between the two routers is not good; there are not enough packets that get through to keep the neighbor relationship up, but some queries or replies are lost between the routers
- unidirectional links (a link on which traffic can only flow in one direction because of a failure)

## Update message

- AS number
- Prefixes
- End-of-table Flag

## Prefixes

- Type (internal, etc)
- Reliability
- Load
- MTU
- Hop Count
- Delay
- Bandwidth
- Flags
  - Source Withdrawn
  - Candidate Default
  - Route is Active
  - Route is Replicated
- Next-hop
- Prefix Length

## Auto summary

Off by default on versions later than IOS 15.

The summarization done by this command is *classful.* This should **never** be turned on.

To enable:

`auto-summary`

## Manual summaries

In EIGRP these go under the interface, on the interface you want the summary to be sent out of.

```console,editable
ethernet 1
  ip summary-address eigrp 100 192.168.0.0/16
```

## Named mode

Name mode supports IPv6 inside a VRF.

### Minimum config

```console,editable
router eigrp EIGRP_100
 !
 address-family ipv4 unicast autonomous-system 100
  !
  network 0.0.0.0
  eigrp router-id 1.1.1.1
 exit-address-family
```

### Using the old config, then having the box convert it for you

```console,editable
router eigrp 1
  eigrp upgrade-cli EIGRP_1
```

### RIB scaling

The Cisco RIB can only hold values that are unsigned 4 bytes. The EIGRP named metrics are 64-bit.

This is done automatically (and why the topology values don't match "show ip route". In the event you need to modify it, here it is.

```console,editable
router eigrp EIGRP_100
  address-family ipv4 unicast autonomous-system 100
    topology base
      metric rib-scale 100
```

## EIGRP Scaling

- Route Summarization
- Multiple EIGRP autonomous systems

## Variance

### Shorter delays

In this example, the delay scale is 1x, 2x, 3x, 4x, 5x, 6x, 7x.

The lowest RIB FD is 433.

With a variance of two, only two interfaces get added to the RIB.

```console
R1# show ip protocols | i eigrp|variance
Routing Protocol is "eigrp 100"
      Maximum metric variance 2

R1# show run | i int|delay
interface GigabitEthernet0/1
 delay 1
interface GigabitEthernet0/2
 delay 2
interface GigabitEthernet0/3
 delay 3
interface GigabitEthernet0/4
 delay 4
interface GigabitEthernet0/5
 delay 5
interface GigabitEthernet0/6
 delay 6
interface GigabitEthernet0/7
 delay 7

R1# show ip route

[output omitted]
!
! sorted to look pretty and be in order
!
D        2.2.2.2 [90/433] via 10.12.1.2, 00:02:35, GigabitEthernet0/1
                 [90/729] via 10.12.2.2, 00:02:35, GigabitEthernet0/2

```


### Longer delays

In this example, the delay scale is: 1x, 1.1x, 1.2x, 1.3x, 1.4x, 1.5x, 1.6x

The lowest FD is 3398.

With a variance of two, all seven interfaces get programmed.

```console
R1# show ip protocols | i eigrp|variance
Routing Protocol is "eigrp 100"
      Maximum metric variance 2
!
! I configured delay, this is the correct way to alter metrics.
!
R1# show run | i int|delay
interface GigabitEthernet0/1
 delay 11
interface GigabitEthernet0/2
 delay 12
interface GigabitEthernet0/3
 delay 13
interface GigabitEthernet0/4
 delay 14
interface GigabitEthernet0/5
 delay 15
interface GigabitEthernet0/6
 delay 16
interface GigabitEthernet0/7
 delay 17

R1# show ip route

[output omitted]

!
! sorted to look pretty and be in order
!
D        2.2.2.2 [90/3398] via 10.12.1.2, 00:00:04, GigabitEthernet0/1
                 [90/3694] via 10.12.2.2, 00:00:04, GigabitEthernet0/2
                 [90/3991] via 10.12.3.2, 00:00:04, GigabitEthernet0/3
                 [90/4288] via 10.12.4.2, 00:00:04, GigabitEthernet0/4
                 [90/4584] via 10.12.5.2, 00:00:04, GigabitEthernet0/5
                 [90/4881] via 10.12.6.2, 00:00:04, GigabitEthernet0/6
                 [90/5177] via 10.12.7.2, 00:00:04, GigabitEthernet0/7
```

## Network parser

- The CLI parser is converting the IP into binary, then comparing it to the wild mask.
- The CLI parser will only save the matched bits of the IP.
- The CLI parser will not save the zeroth network, anything starting with 0.
- The CLI parser will only save the matched bits of an IP if if finds bits that are "on"
- Using the "all" mask of 255.255.255.255 creates this statement 'network 0.0.0.0' and matches everything.
- Using the "unique-ip" mask of 0.0.0.0 means "match this single address"
- The wildcard mask only accepts contiguous numbers "Discontiguous mask is not supported."

192.0.2.5 127.255.255.255 - becomes 128.0.0.0, the rest of the bits get dropped.

## References

[RFC 7868: Cisco's Enhanced Interior Gateway Routing Protocol (EIGRP) | RFC Editor](https://www.rfc-editor.org/info/rfc7868/)

[Cisco - Understand and Use the Enhanced Interior Gateway Routing Protocol](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/16406-eigrp-toc.html)

[Cisco - Configure EIGRP Named Mode](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/200156-Configure-EIGRP-Named-Mode.html)

[Cisco - Configuring EIGRP Wide Metrics](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-18/configuration_guide/rtng/b_1718_rtng_9500_cg/configuring_eigrp_wide_metrics.pdf)

[Cisco - How Does Unequal Cost Path Load Balancing (Variance) Work in IGRP and EIGRP](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13677-19.html)

[Cisco - Troubleshooting EIGRP Variance](https://community.cisco.com/t5/networking-knowledge-base/troubleshooting-eigrp-variance-command/ta-p/3129662)

[Cisco Live - EIGRP, The Usual Suspects - Steven Moore - BRKENT-2050](/pdfs/ciscolive/BRKENT-2050.pdf)

[Cisco Live - EIGRP, Introduction and Overview - Steven Moore - BRKENT-1187](/pdfs/ciscolive/BRKENT-1187.pdf)

[Wikipedia - Diffusing update algorithm](https://en.wikipedia.org/wiki/Diffusing_update_algorithm)

[Blame The Network - Stuck in Active](https://blamethe.network/posts/stuck-in-the-eigrp-queue/)

## Removed

~~BRKENT-2799 is "EIGRP, Introduction and Overview" 2023~~
- BRKENT-1187 is "EIGRP, Introduction and Overview" 2024
