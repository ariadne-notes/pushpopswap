This is the more common way to prevent ULD Failures, enabling ULD.

* **ULD:** Unidirectional Link Detection.

This feature has two modes:

* **Normal:** Detect a fiber port that's miss-cabled. Maybe port 1 and port 2 (four fibers total) got mixed up.

* **Aggressive:** Detect one way traffic on both fiber, and twisted pair.

From Cisco:
- On fiber-optic or twisted-pair links, one of the ports cannot send or receive traffic.
- On fiber-optic or twisted-pair links, one of the ports is down while the other is up.
- One of the fiber strands in the cable is disconnected.

# Requirements
- Both devices need this feature turned on.
- Both sides need the same mode (normal or aggressive)

# Global

```
udld enable
```

# Per Interface
```
interface 1
  udld enable
```

# Verification
```
sw1# show udld neighbors 
Port     Device Name   Device ID     Port ID    Neighbor State
----     -----------   ---------     -------    --------------
Gi0/0    91YBLF6S1KI     1            Gi0/0      Bidirectional
```

# Capture
![UDLD.pcap](./captures/UDLD-enabled.pcap)

# Reference
[Layer 2 Configuration Guide, Cisco IOS XE 17.16.x (Catalyst 9500 Switches)](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-16/configuration_guide/lyr2/b_1716_lyr2_9500_cg/configuring_unidirectional_link_detection.html)