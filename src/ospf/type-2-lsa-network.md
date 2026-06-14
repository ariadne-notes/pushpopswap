# Type 2 LSA - Network

This LSA describes a network vertex, a DR for a Broadcast Segment.

Topology

```plain
                                                 ASBR                                    
                                                  OSPF                                   
                     A23  Regular               ┌────┐     ┌─────┐  EIGRP AS 33  ┌─────┐ 
               ┌────────────────────────────────┤ R3 ├─────┤ R33 ├───────────────┤ R34 │ 
               │                                └────┘     └─────┘ 10.33.34.0/24 └─────┘ 
               │     A24  Stub                  ┌────┐     ┌─────┐                       
               │ ┌──────────────────────────────┤ R4 ├─────┤ R44 │                       
               │ │                              └────┘     └─────┘                       
┌────┐ Area 0 ┌┴─┴─┐ A25  NSSA                  ┌────┐     ┌─────┐  EIGRP AS 55  ┌─────┐ 
│ R1 ├────────┤ R2 ├────────────────────────────┤ R5 ├─────┤ R55 ├───────────────┤ R56 │ 
└────┘        │ ABR│                            └────┘     └─────┘ 10.55.56.0/24 └─────┘ 
              └┬─┬─┘ A26  Totally Stubby        ┌────┐     ┌─────┐                       
               │ └──────────────────────────────┤ R6 ├─────┤ R66 │                       
               │                                └────┘     └─────┘                       
               │     A27  NSSA Totally Stubby   ┌────┐     ┌─────┐  EIGRP AS 77  ┌─────┐ 
               └────────────────────────────────┤ R7 ├─────┤ R77 ├───────────────┤ R78 │ 
                                                └────┘     └─────┘ 10.77.78.0/24 └─────┘ 
```

### Example

```console
R1# show ip ospf database network 

            OSPF Router with ID (10.0.0.1) (Process ID 1)

                Net Link States (Area 0)

  LS age: 508
  Options: (No TOS-capability, DC)
  LS Type: Network Links
  Link State ID: 10.1.2.1 (address of Designated Router)
  Advertising Router: 10.0.0.1
  LS Seq Number: 80000008
  Checksum: 0x5DA5
  Length: 32
  Network Mask: /24
        Attached Router: 10.0.0.1
        Attached Router: 10.0.0.2
```