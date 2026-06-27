# RSTP

**Discarding**

- On
- Blocking data traffic
- Might be receiving BPDUs
  - STP states: Disabled, Blocking and Listening

**Learning**

- On
- Building the CAM table
- Only forwarding BPDUs

**Forwarding**

- On
- Forwarding BPDUs and Data traffic

**Root port**

- AKA RP
- A switch has one RP

**Designated port**

- AKA DP
- Each link can have only one DP

**Backup port**

- Typically connected to a hub
- Used on shared segments
- Provides link redundancy

**Edge ports**

- Edge of the STP topology, meant for hosts
- Edge ports have portfast turned on

**Non-Edge ports**

- Have received a BPDUs
  - Could be attached to switches

**Point-to-point ports**

- Connect to other RSTP switches with full duplex

**Propose bit**

- Added in 802.1w
- Switches compare BPDUs

  - Switch with Superior BPDU
    - Sets the `Propose` and `DP` bits

**Agree Bit**

- Sent in response to a Propose Bit
  - "Yeah, I agree"
  - Transition immediately to forwarding

## Packet headers

```text
Spanning Tree Protocol
    Protocol Identifier: Spanning Tree Protocol (0x0000)
    Protocol Version Identifier: Rapid Spanning Tree (2)
    BPDU Type: Rapid/Multiple Spanning Tree (0x02)
    BPDU flags: 0x0e, Port Role: Designated, Proposal
        0... .... = Topology Change Acknowledgment: No
        .0.. .... = Agreement: No
        ..0. .... = Forwarding: No
        ...0 .... = Learning: No
        .... 11.. = Port Role: Designated (3)
        .... ..1. = Proposal: Yes
        .... ...0 = Topology Change: No
    Root Identifier: 0 / 1 / 52:54:00:eb:eb:96
    Root Path Cost: 4
    Bridge Identifier: 32768 / 1 / 52:54:00:a9:d4:07
    Port identifier: 0x8001
    Message Age: 1
    Max Age: 20
    Hello Time: 2
    Forward Delay: 15
    Version 1 Length: 0
```

## Proposal

Like 802.1D, we have BPDUs. To speed things up some logic has been added.

Is this port full-duplex? If so, it's point-to-point, and if so, there is a RP and DP.

No BPDUs being received? Wait for the forward delay, transition port to forwarding.

## Fastest scenario, the Would-Be DP is already transmitting

```bob
┌─────────┐                      ┌─────────┐
│         │   Full Duplex Link   │         │
│   SW1   ├──────────────────────┤   SW2   │
│         │                      │         │
└────┬────┘                      └────┬────┘
     │                                │     
     │                                │     
     │DP, Propose, ──────────────────►│     
     │                                │     
     │                                │     
     │◄───────── Agree, Forward, Learn│     
     │                                │     
     │                                │     
     │Forward, Learn ────────────────►│     
     │                                │     
```

## Captures

[RSTP-initial-bringup-fastest.pcap](/captures/switching/RSTP-initial-bringup-fastest.pcap)

## References

[Cisco - Spanning Tree Protocol](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html)
