# STP

This document is built on labwork and *Interconnections*, See [1]

## Terms


* **Bridge:** A device that participates in the spanning tree algorithm.

* **Root Bridge:** The bridge that wins the STP election.

* **Bridge ID:** Three fields, next to each other. `Bridge Priority, Extension ID (the VLAN), MAC Address`

* **BPDU:** Bridge Protocol Data Unit. The frame used in 802.1D STP.

* **STP:** Spanning tree protocol. Frequently cited at 802.1D.

* **802.1D:** An IEEE standard. The oldest Ethernet STP.

* **Root ID:** - The bridge that has won and is winning the elections.

* **Designated ports:** AKA DP. Sends BPDUs downstream.

* **Root Port:** AKA, RP. AKA, Upstream. Receives BPDUs, from upstream switch. Each bridge can have only one RP. RP is picked by `port-selection-algo`

* **TCN:** Topology change notification. Sent by the bridge that sees a STP change, upstream via it's RP. This is it's own message.

* **TCA Bit:** Topology Change Acknowledge, sent by the upstream bridge, to let the TC reporting bridge know it relay'd the TCN upstream. This is inside a config BPDU.

* **TC Bit:** Topology Change. The root bridge sets the TC to tell other bridges to set their mac address tables to `max age`. This is inside a config BPDU.


## How STP makes a loop free topology.


STP elects root and designated ports, aka RP, and DPs. It also moves STP ports into Blocking.

- A bridge can only have one RP.
- All ports on the root are DPs.
- Ports on the root bridge never enter blocking.
- Blocked ports must keep receiving BPDUs to stay blocked (the election must continue, forever)
- if two would-be DPs send and receive BPDUs.
  - There is a loop.
  - The port that has the inferior BPDU will block.
  
1. All bridges turn on send BPDUs on all STP ports, themselves as root.
1. STP ports (bridges) compare BPDUs.
1. Bridge with lowest Bridge ID is root, (Lowest priority, if priority is default, lowest mac, usually the oldest switch)
1. All ports on root bridge are DP, and BPDU cost field is set to zero.
1. Root sends BPDUs.
1. DPs send configuration BDPUs.
1. RPs receive configuration BPDUs.
1. Root bridge sends BPDU, cost is 0, with port identifiers set.
1. A non-root bridge can only have one RP.
1. Non-root bridge gets BPDUs. It uses the port selection Algo to pick one RP.
1. Non-root bridge starts STP elections on all other ports, by sending BPDUs. It takes the cost inside the received BPDU, and adds it's port cost.
1. If a DP gets a BDPU, STP blocks the port if the received BPDU is better.



## Port Selection Algo


- All choices are made based on the received BPDU.
- Modifications are made on the upstream switch.

1. Lowest cost to root.
1. Lowest system priority of advertising switch.
1. Lowest MAC of advertising switch.
1. Port Identifier Byte of advertising switch (port priority + port number)

## Timers

* **Hello Time** is usually 2 seconds between BPDUs.

* **Forward Delay** is typically 15 seconds. It's between off -> listening -> learning.

## Device Priority.

4 bits, goes in geometric sequence starting from 0 to 61440.

```
switch(config)# spanning-tree vlan 60 priority ?
% Bridge Priority must be in increments of 4096.
% Allowed values are: 
  0     4096  8192  12288 16384 20480 24576 28672
  32768 36864 40960 45056 49152 53248 57344 61440
```



## Root bridges election in Spanning Tree.

Two bridges send each other BPDUs, they compare bridge IDs to see who will keep sending BPDUs

The bridge with the lower ID (priority + mac address) wins. The non-root-bridge copies this bridge ID into it's BPDU, and sends that downstream.

The default for priority is `32768` or `0x80` on the wire. Because the 802.1D committee exists, the priority is this, plus the vlan ID.

**Always** configure a root bridge, or the *oldest device* with probably the *lowest mac address* wins the root bridge election.


## Path Cost

The root bridge BPDU gets stuff tack'd onto it. The root bridge advertises itself as `0` cost.

Cost is the value of the link, towards the root bridge.

```
 ┌───────┐                                                                   
 │  SW1  │                                                                   
 └───┬───┘                                                                   
     │                                                                       
     │                                                                       
     │  Cost in BPDU from SW1 is 0                                           
     │                                                                       
Eth0 │ ◄──── Interface is Assigned a cost of 100 by SW2 based on link Speed
 ┌───┴───┐                                                                   
 │  SW2  │                                                                   
 └───┬───┘                                                                   
Eth1 │                                                                       
     │                                                                       
     │   Cost in BPDU on-the-wire is now 100, SW2 Eth0 Cost                  
     │                                                                       
Eth0 │                                                                       
 ┌───┴───┐                                                                   
 │  SW2  │                                                                   
 └───────┘                                                                   
```


## Portfast

For end Hosts

* Does not protect against BPDUs

## Loop Prevention

Best practice is to set the root to `0` and the secondary to `4096`.



### STP Loop Guard

A unidirectional failure on a `root` or `alternate` port will cause spanning tree to loop, as other switches will unblock ports, and the unidirectional failure will still forward frames. To prevent this, turn on `stp loop guard` so ... if a port doesn't get a BPDU, it enters `STP loop-inconsistent` disabling the port.

This is done per interface, and is pretty tedious.

```
switch(config)# interface Ethernet 1/1
switch(config-if)# spanning-tree guard loop
```

More details [here](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10596-84.html).

## Port Types

* **Designated ports:** send BPDUs downstream.

* **Root Ports** are the best port towards the root bridge, either the lowest total cost or the lowest advertised priority or lowest advertised port ID (interface number).

## Root Path Cost

**Root Path Cost** - What the interfaces costs + the advertised cost to the root. The root sends a cost of 0.

### STP Path Calculations

`spanning-tree pathcost method long`

| Speed      | Short-Mode Cost | Long-Mode Cost |
|------------|-----------------|----------------|
| 10 Mbps    | 100             | 2000000        |
| 100 Mbps   | 19              | 200000         |
| 1 Gbps     | 4               | 20000          |
| 10 Gbps    | 2               | 2000           |
| 20 Gbps    | 1               | 1000           |
| 40 Gbps    | 1               | 500            |
| 100 Gbps   | 1               | 200            |
| 1 Tbps     | 1               | 20             |
| 10 Tbps    | 1               | 2              |

## 802.1D - Spanning Tree

The 802.1D committee wanted *two* learning states[^stp], one with and one without learning station addresses. This is why it's more complicated.

[^stp]: *Interconnections* - Radia Perlman, page 67.

```
┌─────────────┐                                                     
│     off     │                                                     
└──────┬──────┘                                                     
       │                                                            
       │  Turn on interface                                         
       ▼                                                            
┌─────────────┐                                                     
│  Listening  │ Receive + Send BPDUs                                
└──────┬──────┘                                                     
       │                                                            
       │  forward delay (default 15s)                               
       ▼                                                            
┌─────────────┐                                                     
│  Learning   │ Receive + Send BPDUs + Program CAM                  
└──────┬──────┘                                                     
       │                                                            
       │  forward delay (default 15s)                               
       ▼                                                            
┌─────────────┐                                                     
│  Forwarding │ Receive + Send BPDUs + Program CAM + Forward Frames 
└─────────────┘                                                     
```

#### BPDU Frame Format

**Wireshark**
```
Spanning Tree Protocol
    Protocol Identifier: Spanning Tree Protocol (0x0000)
    Protocol Version Identifier: Spanning Tree (0)
    BPDU Type: Configuration (0x00)
    BPDU flags: 0x00
        0... .... = Topology Change Acknowledgment: No
        .... ...0 = Topology Change: No
    Root Identifier: 0 / 1 / 52:54:00:c4:f3:e7
        Root Bridge Priority: 0
        Root Bridge System ID Extension: 1
        Root Bridge System ID: 52:54:00:c4:f3:e7 (52:54:00:c4:f3:e7)
    Root Path Cost: 0
    Bridge Identifier: 0 / 1 / 52:54:00:c4:f3:e7
        Bridge Priority: 0
        Bridge System ID Extension: 1
        Bridge System ID: 52:54:00:c4:f3:e7 (52:54:00:c4:f3:e7)
    Port identifier: 0x8001 < ------------------------- first byte is "port priority", the next byte is "Port Number".
    Message Age: 0
    Max Age: 20
    Hello Time: 2
    Forward Delay: 15
```

- Cost
This is a STP BPDU.
- Two flags
  - TC
  - TC-Ack

Two bridges
  - Root bridge
  - Bridge that sent the BDPU
  
- Max Age
- Forward Hello Time
- Forward Delay
- Port Identifier



This is what the BPDU looks like on-the-wire

```
┌───────────────────────────────┬───────────────┬───────────────┐
│                               │               │               │
│          Protocol ID          │    Version    │   BPDU Type   │
│                               │               │               │
│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8│
└───────────────────────────────┴───────────────┴───────────────┘
             2 bytes                  1 byte         1 byte

┌───────────────┬───────────────────────────────────────────────►
│               │
│     Flag      │                    Root ID
│               │
│1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
└───────────────┴───────────────────────────────────────────────►
    1 byte                            8 bytes

◄───────────────────────────────────────────────────────────────►

                           Root ID

 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
◄───────────────────────────────────────────────────────────────►
                          8 bytes

◄───────────────┬───────────────────────────────────────────────►
                │
    Root ID     │              Root Path Cost
                │
 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
◄───────────────┴───────────────────────────────────────────────►
    8 bytes                       4 bytes

◄───────────────┬───────────────────────────────────────────────►
 Root Path Cost │
                │                Bridge ID
                │
 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
◄───────────────┴───────────────────────────────────────────────►
  4 bytes                         8 bytes

◄───────────────────────────────────────────────────────────────►

                           Bridge ID

 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
◄───────────────────────────────────────────────────────────────►
                          8 bytes

◄───────────────┬───────────────────────────────┬───────────────►
                │                               │ Message age
   Bridge ID    │           Port ID             │  (in 1/256s of a second)
                │                               │
 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8
◄───────────────┴───────────────────────────────┴───────────────►
    8 bytes                2 Bytes                   2 Bytes

◄───────────────┬───────────────────────────────┬───────────────►
                │           Max Age             │ Hello Time
   Message Age  │        (in 1/256ths)          │  (in 1/256ths of a second)
                │                               │
 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8
◄───────────────┴───────────────────────────────┴───────────────►
    2 Bytes                 2 Bytes                   2 Bytes

◄───────────────┬───────────────────────────────┬───────────────┐
                │  Forward Delay                │   Version 1   │
   Hello Time   │    (in 1/256ths of a second)  │    Length     │
                │                               │               │
 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8│1 2 3 4 5 6 7 8│
◄───────────────┴───────────────────────────────┴───────────────┘
    2 Bytes                 2 Bytes                   1 Byte

┌───────────────────────────────┐
│                               │
│      Version 3 Length         │
│                               │
│1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8│
└───────────────────────────────┘
           2 Bytes
```

## Port elections


`Bridge Priority, Vlan, Bridge MAC, Port Priority, Port Number`

## Default settings

Who is the root?

Both bridges temporarily send BPDUs with themselves both set as root.

```
┌────────┐                                                                                       ┌────────┐
│        │                                                                                       │        │
│      1 │── 32768 / 1 / 52:54:00:4b:99:08 / 8001 ─────── 32768 / 1 / 52:54:00:e8:3a:ff / 8001 ──│ 1      │
│ SW1  2 │── 32768 / 1 / 52:54:00:4b:99:08 / 8002 ─────── 32768 / 1 / 52:54:00:e8:3a:ff / 8002 ──│ 2  SW2 │
│      3 │── 32768 / 1 / 52:54:00:4b:99:08 / 8003 ─────── 32768 / 1 / 52:54:00:e8:3a:ff / 8003 ──│ 3      │
│        │                                                                                       │        │
└────────┘                                                                                       └────────┘
```

SW1 wins with `4b`. SW1 has the lower MAC address.

`32768 / 1 / 52:54:00:4b:99:08 / 8001` < `32768 / 1 / 52:54:00:e8:3a:ff`

## Setting Bridge priority to zero

Who is the root?

Both bridges temporarily send BPDUs with themselves both set as root.

```
┌────────┐                                                                                       ┌────────┐
│        │                                                                                       │        │
│      1 │── 32768 / 1 / 52:54:00:4b:99:08 / 8001 ----------- 0 / 1 / 52:54:00:e8:3a:ff / 8001 ──│ 1      │
│ SW1  2 │── 32768 / 1 / 52:54:00:4b:99:08 / 8002 ----------- 0 / 1 / 52:54:00:e8:3a:ff / 8002 ──│ 2  SW2 │
│      3 │── 32768 / 1 / 52:54:00:4b:99:08 / 8003 ----------- 0 / 1 / 52:54:00:e8:3a:ff / 8003 ──│ 3      │
│        │                                                                                       │        │
└────────┘                                                                                       └────────┘
```

SW2 wins with `0`. SW2 has the lower bridge priority.

`32768 / 1 / 52:54:00:4b:99:08 / 8001` > `0 / 1 / 52:54:00:e8:3a:ff`

```
!
! SW2
!
spanning-tree vlan 1 priority 0
```


## Port Blocking, Port Default

Which ports block?

```
┌───────────┐                                                                                       ┌───────────────┐
│           │                                                                                       │               │
│      DP 1 │── 32768 / 1 / 52:54:00:4b:99:08 / 8001 ───────────────────────────────────────────────│ 1 RP          │
│  SW1 DP 2 │── 32768 / 1 / 52:54:00:4b:99:08 / 8002 ───────────────────────────────────────────────│ 2 BLK  SW2    │
│      DP 3 │── 32768 / 1 / 52:54:00:4b:99:08 / 8003 ───────────────────────────────────────────────│ 3 BLK         │
│           │                                                                                       │               │
└───────────┘                                                                                       └───────────────┘
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 1, it has the lowest port number.
- SW2 sets the other two ports to BLK.

## Port Blocking, Port Priority

Which ports block?

```
┌───────────┐                                                                                       ┌───────────────┐
│           │                                                                                       │               │
│      DP 1 │── 32768 / 1 / 52:54:00:4b:99:08 / 8001 ───────────────────────────────────────────────│ 1 BLK         │
│  SW1 DP 2 │── 32768 / 1 / 52:54:00:4b:99:08 / 8002 ───────────────────────────────────────────────│ 2 BLK  SW2    │
│      DP 3 │── 32768 / 1 / 52:54:00:4b:99:08 / 0003 ───────────────────────────────────────────────│ 3 RP          │
│           │                                                                                       │               │
└───────────┘                                                                                       └───────────────┘
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 3, it has the lowest priority. `00`
- SW2 sets the other two ports to BLK.

```
!
! SW1
!
interface 3
 spanning-tree vlan 1 port-priority 0
```


## Port Blocking, Cost?

Which ports block?

```
┌───────────┐                                                                                       ┌───────────────┐ 
│           │                                                                                       │               │ 
│      DP 1 │── 32768 / 1 / 52:54:00:4b:99:08 / 8001 ──────────────────────────────────────Cost─4───│ 1 BLK         │ 
│  SW1 DP 2 │── 32768 / 1 / 52:54:00:4b:99:08 / 8002 ──────────────────────────────────────Cost─1───│ 2 RP   SW2    │ 
│      DP 3 │── 32768 / 1 / 52:54:00:4b:99:08 / 8003 ──────────────────────────────────────Cost─4───│ 3 BLK         │ 
│           │                                                                                       │               │ 
└───────────┘                                                                                       └───────────────┘ 
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 2, The local switch marked the received cost on that port as `1`
- SW2 sets the other two ports to BLK.

```
!
! SW2
!
interface 2
 spanning-tree vlan 1 cost 1
```


## Topology Change Notifications (TCNs)

- A TCN is a kind of BPDU message.
- There is no root ID or bridge ID.
- The TCN is sent out the RP.

```
Spanning Tree Protocol
    Protocol Identifier: Spanning Tree Protocol (0x0000)
    Protocol Version Identifier: Spanning Tree (0)
    BPDU Type: Topology Change Notification (0x80)
```

1. Bridge sees change in STP topology, sends TCN to upstream bridge.
1. Upstream sees TCN, sends a regular BDPU back with TCN-Ack set.
1. Upstream bridge sends TCN upstream, this continues until TCN reaches the root.
1. Root Bridge sees the TCN, marks BPDUs with TC bit set.
1. All bridges see TC, and set their max-age to 15 seconds.
1. Root bridge stops sending TCs.


The default for Cisco is keeping a mac-address in CAM for 300 seconds (5 minutes)

Receiving a TCN sets this `max age` to the `forward delay` usually 15 seconds. This means any server that is not actively sending, will have it's traffic flooded onto that VLAN.

```
switch# show mac address-table aging-time 
Global Aging Time:  300
```

##### Finding TCNs

```
switch# show spanning-tree vlan 20 detail | s Spanning
 VLAN0020 is executing the rstp compatible Spanning Tree protocol
  Bridge Identifier has priority 32768, sysid 20, address aabb.cc00.0100
  Configured hello time 2, max age 20, forward delay 15, transmit hold-count 6
  Current root has priority 8212, address aabb.cc00.0200
  Root port is 7 (Ethernet1/2), cost of root path is 200
  Topology change flag not set, detected flag not set
  Number of topology changes 8 last change occurred 01:07:20 ago   < ----
          from Ethernet1/2                                         < ----
  Times:  hold 1, topology change 35, notification 2
          hello 2, max age 20, forward delay 15 
  Timers: hello 0, topology change 0, notification 0, aging 300
```

##### On the device

```
switch# show spanning-tree vlan 20 detail | i VLAN|transitions 
 VLAN0020 is executing the rstp compatible Spanning Tree protocol
 Port 2 (Ethernet0/1) of VLAN0020 is designated forwarding 
   Number of transitions to forwarding state: 2
 Port 4 (Ethernet0/3) of VLAN0020 is alternate blocking 
   Number of transitions to forwarding state: 1
 Port 7 (Ethernet1/2) of VLAN0020 is root forwarding 
   Number of transitions to forwarding state: 2
 Port 8 (Ethernet1/3) of VLAN0020 is alternate blocking 
   Number of transitions to forwarding state: 0
 Port 12 (Ethernet2/3) of VLAN0020 is designated forwarding 
   Number of transitions to forwarding state: 2
```

##### In the logs

```
switch# show logging | i %LINK
*Jul  8 04:22:24.660: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:22:24.702: %LINK-3-UPDOWN: Interface Ethernet0/1, changed state to up
*Jul  8 04:22:24.715: %LINK-3-UPDOWN: Interface Ethernet0/2, changed state to up
*Jul  8 04:22:24.740: %LINK-3-UPDOWN: Interface Ethernet0/3, changed state to up
*Jul  8 04:22:24.769: %LINK-3-UPDOWN: Interface Ethernet1/0, changed state to up
*Jul  8 04:22:24.794: %LINK-3-UPDOWN: Interface Ethernet1/1, changed state to up
*Jul  8 04:22:24.819: %LINK-3-UPDOWN: Interface Ethernet1/2, changed state to up
*Jul  8 04:22:24.858: %LINK-3-UPDOWN: Interface Ethernet1/3, changed state to up
*Jul  8 04:22:24.888: %LINK-3-UPDOWN: Interface Ethernet2/0, changed state to up
*Jul  8 04:22:24.903: %LINK-3-UPDOWN: Interface Ethernet2/1, changed state to up
*Jul  8 04:22:24.927: %LINK-3-UPDOWN: Interface Ethernet2/2, changed state to up
*Jul  8 04:22:24.942: %LINK-3-UPDOWN: Interface Ethernet2/3, changed state to up
*Jul  8 04:22:24.965: %LINK-3-UPDOWN: Interface Ethernet3/0, changed state to up
*Jul  8 04:22:24.989: %LINK-3-UPDOWN: Interface Ethernet3/1, changed state to up
*Jul  8 04:22:25.013: %LINK-3-UPDOWN: Interface Ethernet3/2, changed state to up
*Jul  8 04:22:25.033: %LINK-3-UPDOWN: Interface Ethernet3/3, changed state to up
*Jul  8 04:22:26.685: %LINK-5-CHANGED: Interface Vlan1, changed state to administratively down
*Jul  8 04:24:58.575: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:25:06.138: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:26:59.260: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:27:11.982: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:28:43.205: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:31:09.988: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:33:53.881: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:34:02.140: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:00:52.111: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:00:59.749: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:03:48.728: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:03:54.050: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:07:04.113: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:07:06.713: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:07:31.603: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:07:36.280: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:11:32.247: %LINK-3-UPDOWN: Interface Vlan10, changed state to up
*Jul  8 06:35:29.308: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 06:35:43.756: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
```

## Captures

[STP-stable-state.pcap](./captures/switching/STP-stable-state.pcap)

[STP-TCN-topology-change-notification.pcap](./captures/switching/STP-TCN-topology-change-notification.pcap)


## References

1. R. Perlman, *Interconnections: Bridges, Routers, Switches, and Internetworking Protocols*, 2nd ed. Boston, MA: Addison-Wesley, 1999.

[Layer 2 Configuration Guide, Cisco IOS-XE 17.16.X](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9200/software/release/17-16/configuration_guide/lyr2/b_1716_lyr2_9200_cg/configuring_spanning_tree_protocol.html)