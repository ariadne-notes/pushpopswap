# OSPF Type 1 LSA - Router

This LSA describes the networks attached to a router.

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
R1# show ip ospf database router 

            OSPF Router with ID (10.0.0.1) (Process ID 1)

                Router Link States (Area 0)

  LS age: 325
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 10.0.0.1
  Advertising Router: 10.0.0.1
  LS Seq Number: 80000012
  Checksum: 0xDC6
  Length: 48
  Number of Links: 2

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.0.0.1
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 1

    Link connected to: a Transit Network
     (Link ID) Designated Router address: 10.1.2.1
     (Link Data) Router Interface address: 10.1.2.1
      Number of MTID metrics: 0
       TOS 0 Metrics: 1


  LS age: 134
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 10.0.0.2
  Advertising Router: 10.0.0.2
  LS Seq Number: 80000014
  Checksum: 0x26A4
  Length: 48
  Area Border Router
  AS Boundary Router
  Number of Links: 2

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.0.0.2
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 1

    Link connected to: a Transit Network
     (Link ID) Designated Router address: 10.1.2.1
     (Link Data) Router Interface address: 10.1.2.2
      Number of MTID metrics: 0
       TOS 0 Metrics: 1


```
