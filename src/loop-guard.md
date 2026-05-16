- This is one of the unidirectional preventatives.
- This is only for switch-to-switch ports.

# Terms
* **Unidirectional Link.** A failure where one side of a fiber pair is broken.

A unidirectional failure will always result in one side not getting information.
- SW1 sends BPDUs
- SW2 never gets BPDUs.

# Topology

- SW1 is a root bridge.
- SW2 is experiencing a UL failure.
- SW2 will transition Port 1 to a RP.

<pre>
┌────────────────────┐                            ┌─────────────────────┐
│     ┌─────────────┐│                            │ ┌────────────┐      │
│     │ Port ┌────┐ ││ BPDU ────►                 │ │┌────┐ Port │      │
│     │  1   │ TX ├─││─────────────── Fiber Cut ──│─│┤ RX │  1   │      │
│ SW1 │      └────┘ ││                            │ │└────┘      │ SW2  │
│     │  RP  ┌────┐ ││                            │ │┌────┐  DP  │      │
│     │      │ RX ├─││────────────────────────────│─│┤ TX │      │      │
│     │      └────┘ ││                ◄───── BPDU │ │└────┘      │      │
│     └─────────────┘│                            │ └────────────┘      │
└────────────────────┘                            └─────────────────────┘
</pre>

# Loopguard
If a port was receiving BPBUs and suddenly it stops, don't change the STP,

**Default**
```
spanning-tree loopguard default
```

**Per port**
```
interface 1
  spanning-tree guard loop
```