# RPR - Resilient Packet Ring

802.17

- **Steering** - Nodes are told the affected node is down and don't include it.
- **Wrapping** - The node closest to the break route the traffic on the other direction of the ring.

Side A Always connects to Side B.

Example of a working connection.

```console
Node2# show controller srp 4/0
SRP4/0 - Side A (Outer RX, Inner TX)
SECTION
  LOF = 0          LOS    = 0                            BIP(B1) = 3
LINE
  AIS = 0          RDI    = 0          FEBE = 36599      BIP(B2) = 46
PATH
  AIS = 0          RDI    = 0          FEBE = 4440       BIP(B3) = 26
  LOP = 0          NEWPTR = 0          PSE  = 0          NSE     = 0

Active Defects: None
Active Alarms:  None
Alarm reporting enabled for: SLOS SLOF PLOP

Framing           : SONET
Rx SONET/SDH bytes: (K1/K2) = 0/0        S1S0 = 0  C2 = 0x16
Tx SONET/SDH bytes: (K1/K2) = 0/0        S1S0 = 0  C2 = 0x16  J0 = 0x1
Clock source      : Internal
Framer loopback   : None
Path trace buffer : Stable
  Remote hostname : Node1
  Remote interface: SRP4/0
  Remote IP addr  : <removed>
  Remote side id  : B
BER thresholds:           SF = 10e-3  SD = 10e-6
IPS BER thresholds(B3):   SF = 10e-3  SD = 10e-6
TCA thresholds:           B1 = 10e-6  B2 = 10e-6  B3 = 10e-6

SRP4/0 - Side B (Inner RX, Outer TX)
SECTION
LOF = 0          LOS    = 0                            BIP(B1) = 65535
LINE
AIS = 0          RDI    = 0          FEBE = 65535      BIP(B2) = 65535
PATH
AIS = 0          RDI    = 0          FEBE = 65535      BIP(B3) = 65535
LOP = 0          NEWPTR = 3          PSE  = 0          NSE     = 0
Active Defects: None
Active Alarms:  None
Alarm reporting enabled for: SLOS SLOF PLOP
Framing           : SONET
Rx SONET/SDH bytes: (K1/K2) = 0/0        S1S0 = 0  C2 = 0x16
Tx SONET/SDH bytes: (K1/K2) = 0/0        S1S0 = 0  C2 = 0x16  J0 = 0x1
Clock source      : Internal
Framer loopback   : None
Path trace buffer : Stable
Remote hostname : Node3
Remote interface: SRP4/0
Remote IP addr  : <removed>
Remote side id  : A
BER thresholds:           SF = 10e-3  SD = 10e-6
IPS BER thresholds(B3):   SF = 10e-3  SD = 10e-6
TCA thresholds:           B1 = 10e-6  B2 = 10e-6  B3 = 10e-6
```
