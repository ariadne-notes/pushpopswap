# OSPF Type 4 LSA - ASBR Summary

This LSA describes how to reach an ASBR, via an ABR.

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
R1# show ip ospf database asbr-summary 

            OSPF Router with ID (10.0.0.1) (Process ID 1)

                Summary ASB Link States (Area 0)

  LS age: 429
  Options: (No TOS-capability, DC, Upward)
  LS Type: Summary Links(AS Boundary Router)
  Link State ID: 10.0.0.33 (AS Boundary Router address)
  Advertising Router: 10.0.0.2
  LS Seq Number: 80000008
  Checksum: 0x4DAE
  Length: 28
  Network Mask: /0
        MTID: 0         Metric: 2 
```