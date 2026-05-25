# SRP

SRP - Spatial Reuse protocol. This is used for fiber rings, its where the destination nodes pulls the info from the ring so it doesn't loop endlessly.

Spatial Reuse Protocol (SRP) is a media-independent MAC layer protocol that operates over two counter rotating
  fiber-optic rings. The dual rings provide survivability of data in case of a failed node or a break in

  connecting cables by rerouting the data path over the alternate ring. SRP provides a more efficient use of

  bandwidth by having packets traverse only the part of the ring necessary to get to the destination node. Once
  the packet has reached the destination node, it is removed from the ring, allowing other parts of the ring
  to reuse the bandwidth. Data packets travel on one ring, while associated control packets travel in the opposite
  direction on the alternate ring, ensuring that the data takes the shortest path to its destination.

RPR - Resilient Packet Ring - 802.17

* **Steering:**  Nodes are told the affected node is down and don't include it.
* **Wrapping:**  The node closest to the break route the traffic on the other direction of the ring.

Side A Always connects to Side B.

## Example of a working connection.


```
router # show controller srp 4/0
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
  Remote IP addr  : X.X.X.X
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
Remote IP addr  : X.X.X.X
Remote side id  : A
BER thresholds:           SF = 10e-3  SD = 10e-6
IPS BER thresholds(B3):   SF = 10e-3  SD = 10e-6
TCA thresholds:           B1 = 10e-6  B2 = 10e-6  B3 = 10e-6
```

## References

[Spatial Reuse Protocol - Wikipedia](https://en.wikipedia.org/wiki/Spatial_Reuse_Protocol)