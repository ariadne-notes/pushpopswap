# Type 3 LSA - Summary

These describe networks, reachable via an ABR.

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

## Example

```console
R1# show ip ospf database summary 

            OSPF Router with ID (10.0.0.1) (Process ID 1)

                Summary Net Link States (Area 0)

  LS age: 1901
  Options: (No TOS-capability, DC, Upward)
  LS Type: Summary Links(Network)
  Link State ID: 10.0.0.3 (summary Network Number)
  Advertising Router: 10.0.0.2
  LS Seq Number: 80000009
  Checksum: 0x8693
  Length: 28
  Network Mask: /32
        MTID: 0         Metric: 2 
```