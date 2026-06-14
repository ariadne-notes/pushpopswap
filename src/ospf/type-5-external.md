# Type 5 LSA - External

This LSA describes external networks.

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
R1#show ip ospf database external 10.55.56.0

            OSPF Router with ID (10.0.0.1) (Process ID 1)

                Type-5 AS External Link States

  LS age: 353
  Options: (No TOS-capability, DC, Upward)
  LS Type: AS External Link
  Link State ID: 10.55.56.0 (External Network Number )
  Advertising Router: 10.0.0.2
  LS Seq Number: 80000008
  Checksum: 0x86FB
  Length: 36
  Network Mask: /24
        Metric Type: 2 (Larger than any link state path)
        MTID: 0 
        Metric: 100 
        Forward Address: 10.0.0.55
        External Route Tag: 0
```