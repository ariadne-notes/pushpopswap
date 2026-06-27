# Loop Guard

A unidirectional failure on a `root` or `alternate` port will cause spanning tree to loop.

Loopguard enforces a simple rule.

*If a port was receiving BPBUs and suddenly it stops, don't change the STP.*

- This is one of the unidirectional preventatives
- This is only for switch-to-switch ports

... if a port doesn't get a BPDU, it enters `STP loop-inconsistent` disabling the port.

## Terms

**Unidirectional Link**

A failure where one side of a fiber pair is broken.

A unidirectional failure will always result in one side not getting information.

- SW1 sends BPDUs
- SW2 never gets BPDUs

## Topology

- SW1 is a root bridge
- SW2 is experiencing a UL failure
- SW2 will transition Port 1 to a RP

```plain
                                                      No BPDU Received
┌────────────────────┐                            ┌────────────────────┐
│     ┌─────────────┐│                            │ ┌────────────┐     │
│     │ Port ┌────┐ ││ BPDU ────►XXXX             │ │┌────┐ Port │     │
│     │  1   │ TX ├─││────────────── Fiber Cut! ──│─│┤ RX │  1   │     │
│ SW1 │      └────┘ ││                            │ │└────┘      │ SW2 │
│     │  RP  ┌────┐ ││                            │ │┌────┐  DP  │     │
│     │      │ RX ├─││────────────────────────────│─│┤ TX │      │     │
│     │      └────┘ ││                ◄───── BPDU │ │└────┘      │     │
│     └─────────────┘│                            │ └────────────┘     │
└────────────────────┘                            └────────────────────┘
```

## Config

### Default

```console
spanning-tree loopguard default
```

### Per port

```console, editable
interface 1
  spanning-tree guard loop
```

## References

[Understand STP Loop Guard and UDLD Features - Cisco](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10596-84.html)
