# C2 Byte

C2 Defines the SONET payload

An old note, probably from a standard document.

    The SONET standard defines the C2 byte as the path signal label. The purpose of this byte
    is to communicate the payload type that the SONET Framing OverHead (FOH) encapsulates.
    The C2 byte functions similar to Ethertype and Logical Link Control (LLC)/Subnetwork
    Access Protocol (SNAP) header fields on an Ethernet network. The C2 byte allows a single
    interface to transport multiple payload types simultaneously.

This table lists common values for the C2 byte:

| Hex Value  | SONET Payload Contents                                          |
| ---------- | --------------------------------------------------------------- |
| 00         | Unequipped.                                                     |
| 01         | Equipped - non-specific payload.                                |
| 02         | Virtual Tributaries (VTs) inside (default).                     |
| 03         | VTs in locked mode (no longer supported).                       |
| 04         | Asynchronous DS3 mapping.                                       |
| 12         | Asynchronous DS-4NA mapping.                                    |
| 13         | Asynchronous Transfer Mode (ATM) cell mapping.                  |
| 14         | Distributed Queue Dual Bus (DQDB) cell mapping.                 |
| 15         | Asynchronous Fiber Distributed Data Interface (FDDI) mapping.   |
| 16         | IP inside Point-to-Point Protocol (PPP) with scrambling.        |
| CF         | IP inside PPP without scrambling.                               |
| E1- FC     | Payload Defect Indicator (PDI).                                 |
| FE         | Test signal mapping (see ITU Rec. G.707).                       |
| FF         | Alarm Indication Signal (AIS).                                  |

## Example

```console
Framing: SONET
SPE Scrambling: Enabled
C2 State: Stable   C2_rx = 0xCF (207)   C2_tx = 0x16 (22) / Scrambling Derived
S1S0(tx): 0x0  S1S0(rx): 0x2 / Framing Derived
```
