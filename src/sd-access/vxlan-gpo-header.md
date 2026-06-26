# VXLAN-GPO Header

```text
Outer Ethernet Header
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────────────────────────────────────┐
│             Outer Destination MAC Address                     │
├───────────────────────────────┬───────────────────────────────┤
│ Outer Destination MAC Address │ Outer Source MAC Address      │
├───────────────────────────────┴───────────────────────────────┤
│                Outer Source MAC Address                       │
├───────────────────────────────┬───────────────────────────────┤
│OptnlEthtype = C-Tag 802.1Q    │ Outer.VLAN Tag Information    │
├───────────────────────────────┼───────────────────────────────┘
│ Ethertype = 0x0800            │                                
└───────────────────────────────┘ 

 Outer IPv4 Header
  0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────┬───────┬───────────────┬───────────────────────────────┐
│Version│  IHL  │Type of Service│         Total Length          │
├───────┴───────┴───────────────┼─────┬─────────────────────────┤
│         Identification        │Flags│    Fragment Offset      │
├───────────────┬───────────────┼─────┴─────────────────────────┤
│  Time to Live │Protocl=17(UDP)│   Header Checksum             │
├───────────────┴───────────────┴───────────────────────────────┤
│                   Outer Source IPv4 Address                   │
├───────────────────────────────────────────────────────────────┤
│                 Outer Destination IPv4 Address                │
└───────────────────────────────────────────────────────────────┘

Outer UDP Header
  0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────┬───────────────────────────────┐
│           Source Port         │    Dest Port = VXLAN Port     │
├───────────────────────────────┼───────────────────────────────┤
│           UDP Length          │        UDP Checksum           │
└───────────────────────────────┴───────────────────────────────┘

VXLAN-GPO Header
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬───────────────────────────────┐
│G│R│R│R│I│R│R│R│R│D│R│R│A│R│R│R│        Group Policy ID        │
├─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴───────────────┬───────────────┤
│          VXLAN Network Identifier (VNI)       │   Reserved    │
└───────────────────────────────────────────────┴───────────────┘

Inner Ethernet Header
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────────────────────────────────────┐
│                Inner Destination MAC Address                  │
├───────────────────────────────┬───────────────────────────────┤
│ Inner Destination MAC Address │  Inner Source MAC Address     │
├───────────────────────────────┴───────────────────────────────┤
│                   Inner Source MAC Address                    │
├───────────────────────────────┬───────────────────────────────┤
│  OptnlEthtype = C-Tag 802.1Q  │  Inner.VLAN Tag Information   │
└───────────────────────────────┴───────────────────────────────┘

Payload
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────┬───────────────────────────────┐
│ Ethertype of Original Payload │                               │
├───────────────────────────────┘                               │
│                                   Original Ethernet Payload   │
│                                                               │
│(Note that the original Ethernet Frame's FCS is not included)  │
└───────────────────────────────────────────────────────────────┘

Frame Check Sequence
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────────────────────────────────────┐
│    New FCS (Frame Check Sequence) for Outer Ethernet Frame    │
└───────────────────────────────────────────────────────────────┘
```

## References

[IETF - VXLAN Group Policy Option - draft-smith-vxlan-group-policy-05](https://datatracker.ietf.org/doc/html/draft-smith-vxlan-group-policy)

[Cisco Community - SD-Access Segmentation Design Guide](https://community.cisco.com/t5/networking-knowledge-base/sd-access-segmentation-design-guide/ta-p/4935734)

[Cisco Live - Deployment of Micro-Segmentation in Cisco NX-OS VXLAN EVPN Fabrics with VXLAN GRoup Policy Option - Max Ardica](../pdfs/ciscolive/BRKDCN-2633.pdf)
