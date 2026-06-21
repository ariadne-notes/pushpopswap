# STP

## Terms

**STP** --- Spanning Tree Protocol

- Frequently cited as `802.1D`

**Bridge**


- A device that participates in the spanning tree algorithm

**Root Bridge**


- The bridge that wins the STP election

**Bridge ID**


- Three fields, next to each other
- `Bridge Priority, Extension ID (the VLAN), MAC Address`

**BPDU** --- Bridge Protocol Data Unit

- The frame used in 802.1D STP

**802.1D**

- An IEEE standard. The oldest Ethernet STP

**Root ID**

- The bridge that has won and is winning the elections

**Designated ports**

- Sends BPDUs downstream
- AKA DP

**Root Port**

- Receives BPDUs, from upstream switch.
- Each bridge can have only one RP. RP is picked by `port-selection-algo`
- AKA, RP
- AKA, Upstream

**TCN** --- Topology change notification

- This is its own message
- Sent by the bridge that sees a STP change, upstream via it's RP
- One of the only upstream messages

**TCA Bit** --- Topology Change Acknowledge

- Sent by the upstream bridge
- Lets the downstream reporting bridge know the TCN was relayed upstream
- Inside a config BPDU

**TC Bit** --- Topology Change

- The root bridge sets the TC Bit
- Downstream bridges shorten their MAC aging timer to Forward Delay (default 15 seconds)

## How STP makes a loop free topology

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
1. Bridge with lowest Bridge ID is root, (Lowest priority, if priority is default, Lowest mac, usually the oldest switch)
1. All ports on root bridge are DP, and BPDU cost field is set to zero.
1. Root sends BPDUs.
1. DPs send configuration BDPUs.
1. RPs receive configuration BPDUs.
1. Root bridge sends BPDU, cost is 0, with port identifiers set.
1. A non-root bridge can only have one RP.
1. Non-root bridge gets BPDUs. It uses the port selection Algo to pick one RP.
1. Non-root bridge starts STP elections on all other ports, by sending BPDUs. It takes the cost inside the received BPDU, and adds it's port cost.
1. If a DP gets a BDPU, STP blocks the port if the received BPDU is better.

## Port selection algo

- All choices are made based on the received BPDU.
- Modifications are made on the upstream switch.

1. Lowest cost to root.
1. Lowest system priority of advertising switch.
1. Lowest MAC of advertising switch.
1. Port Identifier Byte of advertising switch (port priority + port number)

## Timers

- **Hello Time** is usually 2 seconds between BPDUs.

- **Forward Delay** is typically 15 seconds. It's between off -> listening -> learning.

## Device priority

4 bits, goes in geometric sequence starting from 0 to 61440.

```console
switch(config)# spanning-tree vlan 60 priority ?
% Bridge Priority must be in increments of 4096.
% Allowed values are: 
  0     4096  8192  12288 16384 20480 24576 28672
  32768 36864 40960 45056 49152 53248 57344 61440
```

## Root bridges election in spanning tree

Best practice is to set the root to `0` and the secondary to `4096`.

Two bridges send each other BPDUs, they compare bridge IDs to see who will keep sending BPDUs

The bridge with the lower ID (priority + mac address) wins. The non-root-bridge copies this bridge ID into it's BPDU, and sends that downstream.

The default for priority is `32768` or `0x80` on the wire. Because the 802.1D committee exists, the priority is this, plus the vlan ID.

**Always** configure a root bridge, or the *oldest device* with probably the *lowest mac address* wins the root bridge election.

## Path cost

The root bridge BPDU gets stuff tack'd onto it. The root bridge advertises itself as `0` cost.

Cost is the value of the link, towards the root bridge.

```plain
 ┌───────┐                                                                   
 │  SW1  │                                                                   
 └───┬───┘                                                                   
     │                                                                       
     │  Cost in BPDU from SW1 is 0                                           
     │                                                                       
Eth0 │ ◄──── Interface is Assigned a cost of 100 by SW2 based on link Speed
 ┌───┴───┐                                                                   
 │  SW2  │                                                                   
 └───┬───┘                                                                   
Eth1 │                                                                       
     │   Cost in BPDU on-the-wire is now 100, SW2 Eth0 Cost                  
Eth0 │                                                                       
 ┌───┴───┐                                                                   
 │  SW2  │                                                                   
 └───────┘                                                                   
```

## Port types

**Designated ports**


- Send BPDUs downstream

**Root Ports**


- The selected port towards the root bridge
  - Lowest total cost

    - OR Lowest advertised priority
      - OR Lowest advertised port ID (interface number)

## Root path cost

**Root Path Cost**

What the interfaces costs + the advertised cost to the root. The root sends a cost of 0.

### STP path calculations

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

## 802.1D - spanning tree

The 802.1D committee wanted *two* learning states[^stp], one with and one without learning station addresses. This is why it's more complicated.

[^stp]: *Interconnections* - Radia Perlman, page 67.

```plain
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

## BPDU frame format

### Wireshark

This is what the BPDU looks like on-the-wire.

```console
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
    Port identifier: 0x8001 < --------- first byte is Port Priority
    Message Age: 0                        second byte is Port Number
    Max Age: 20
    Hello Time: 2
    Forward Delay: 15
```

### STP header

Times in in 256th of a second.

```text
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────────────────────────────┬───────────────┬───────────────┐
│          Protocol ID          │    Version    │   BPDU Type   │
└───────────────────────────────┴───────────────┴───────────────┘
┌───────────────┬────────────────────────────────────────────────
│     Flag      │                    Root ID                     
└───────────────┴────────────────────────────────────────────────
─────────────────────────────────────────────────────────────────
                             Root ID                             
─────────────────────────────────────────────────────────────────
────────────────┬────────────────────────────────────────────────
   Root ID      │              Root Path Cost                    
────────────────┴────────────────────────────────────────────────
────────────────┬────────────────────────────────────────────────
  Root Path Cost│                Bridge ID                       
────────────────┴────────────────────────────────────────────────
                                                                 
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
─────────────────────────────────────────────────────────────────
                          Bridge ID                              
─────────────────────────────────────────────────────────────────
────────────────┬───────────────────────────────┬────────────────
   Bridge ID    │          Port ID              │ Message age    
────────────────┴───────────────────────────────┴────────────────
────────────────┬───────────────────────────────┬────────────────
  Message Age   │          Max Age              │ Hello Time     
────────────────┴───────────────────────────────┴────────────────
────────────────┬───────────────────────────────┬───────────────┐
    Hello Time  │        Forward Delay          │ V1 Length     │
────────────────┴───────────────────────────────┴───────────────┘
┌───────────────────────────────┐                                
│           V3 Length           │                                
└───────────────────────────────┘                                
```

## Port elections

`Bridge Priority, Vlan, Bridge MAC, Port Priority, Port Number`

## Default settings

Who is the root?

Both bridges temporarily send BPDUs with themselves both set as root.

```text
┌─────┐                                                                     ┌─────┐
│    1├─ 32768 1 52:54:00:4b:99:08 8001 ─── 32768 1 52:54:00:e8:3a:ff 8001 ─┤1    │
│SW1 2├─ 32768 1 52:54:00:4b:99:08 8002 ─── 32768 1 52:54:00:e8:3a:ff 8002 ─┤2 SW2│
│    3├─ 32768 1 52:54:00:4b:99:08 8003 ─── 32768 1 52:54:00:e8:3a:ff 8003 ─┤3    │
└─────┘                                                                     └─────┘
```

SW1 wins with `4b`. SW1 has the lower MAC address.

`32768 / 1 / 52:54:00:4b:99:08 / 8001` < `32768 / 1 / 52:54:00:e8:3a:ff`

## Setting bridge priority to zero

Who is the root?

Both bridges temporarily send BPDUs with themselves both set as root.

```plain
┌─────┐                                                                   ┌─────┐
│    1├─ 32768 1 52:54:00:4b:99:08 8001 ───── 0 1 52:54:00:e8:3a:ff 8001 ─┤1    │
│SW1 2├─ 32768 1 52:54:00:4b:99:08 8002 ───── 0 1 52:54:00:e8:3a:ff 8002 ─┤2 SW2│
│    3├─ 32768 1 52:54:00:4b:99:08 8003 ────- 0 1 52:54:00:e8:3a:ff 8003 ─┤3    │
└─────┘                                                                   └─────┘
```                                               

SW2 wins with `0`. SW2 has the lower bridge priority.

`32768 / 1 / 52:54:00:4b:99:08 / 8001` > `0 / 1 / 52:54:00:e8:3a:ff`

```console,editable
!
! SW2
!
spanning-tree vlan 1 priority 0
```

## Port blocking, port default

Which ports block?

```text
┌────────┐                                                           ┌──────────┐
│    DP 1├── 32768 1 52:54:00:4b:99:08 8001 ─────────────────────────┤1 RP      │
│SW1 DP 2├── 32768 1 52:54:00:4b:99:08 8002 ─────────────────────────┤2 BLK  SW2│
│    DP 3├── 32768 1 52:54:00:4b:99:08 8003 ─────────────────────────┤3 BLK     │
└────────┘                                                           └──────────┘
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 1, it has the lowest port number.
- SW2 sets the other two ports to BLK.

## Port blocking, port priority

Which ports block?

```plain
┌────────┐                                                          ┌──────────┐
│    DP 1├── 32768 1 52:54:00:4b:99:08 8001 ────────────────────────┤1 BLK     │
│SW1 DP 2├── 32768 1 52:54:00:4b:99:08 8002 ────────────────────────┤2 BLK  SW2│
│    DP 3├── 32768 1 52:54:00:4b:99:08 0003 ────────────────────────┤3 RP      │
└────────┘                                                          └──────────┘
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 3, it has the lowest priority. `00`
- SW2 sets the other two ports to BLK.

```console, editable
!
! SW1
!
interface 3
 spanning-tree vlan 1 port-priority 0
```

## Port blocking, cost

Which ports block?

```text
┌────────┐                                                          ┌─────────┐
│    DP 1├── 32768 1 52:54:00:4b:99:08 8001 ────────────── Cost 4 ──┤1 BLK    │
│SW1 DP 2├── 32768 1 52:54:00:4b:99:08 8002 ────────────── Cost 1 ──┤2 RP  SW2│
│    DP 3├── 32768 1 52:54:00:4b:99:08 8003 ────────────── Cost 4 ──┤3 BLK    │
└────────┘                                                          └─────────┘
```

- All ports on root bridge are DP.
- SW2 gets three BPDUs, the best BPDU is on port 2, The local switch marked the received cost on that port as `1`
- SW2 sets the other two ports to BLK.

```console, editable
!
! SW2
!
interface 2
 spanning-tree vlan 1 cost 1
```

## Topology change notifications (TCNs)

- A TCN is a kind of BPDU message
- There is no root ID or bridge ID
- The TCN is sent out the RP

```console
Spanning Tree Protocol
    Protocol Identifier: Spanning Tree Protocol (0x0000)
    Protocol Version Identifier: Spanning Tree (0)
    BPDU Type: Topology Change Notification (0x80)
```

1. Bridge sees change in STP topology, sends TCN to upstream bridge.
1. Upstream sees TCN, sends a regular BDPU back with TCA bit set.
1. Upstream bridge sends TCN upstream, this continues until TCN reaches the root.
1. Root Bridge sees the TCN, marks BPDUs with TC bit set.
1. All bridges see TC, and shorten their MAC aging timer to Forward Delay (default 15 seconds).
1. Root bridge stops sending TCs.

The `max-age` default for Cisco is 300 seconds (5 minutes).

Receiving a TCN shortens the aging timer to `forward delay` usually 15 seconds. This means any server that is not actively sending, will have it's traffic flooded onto that VLAN.

```console
switch# show mac address-table aging-time 
Global Aging Time:  300
```

## Captures

[STP-stable-state.pcap](./captures/switching/STP-stable-state.pcap)

[STP-TCN-topology-change-notification.pcap](./captures/switching/STP-TCN-topology-change-notification.pcap)

## References

R. Perlman, *Interconnections: Bridges, Routers, Switches, and Internetworking Protocols*, 2nd ed. Boston, MA: Addison-Wesley, 1999.

[Understand and Tune Spanning Tree Protocol Timers - Cisco](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/19120-122.html)

[Layer 2 Configuration Guide, Cisco IOS-XE 17.16.X](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9200/software/release/17-16/configuration_guide/lyr2/b_1716_lyr2_9200_cg/configuring_spanning_tree_protocol.html)
