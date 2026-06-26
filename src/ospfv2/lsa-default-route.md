# LSA Default Routes

R2 is advertising a default route to these routers.

Each router is inside a different area type.

```plain
                    Regular              ┌────┐
              ┌──────────────────────────┤ R3 │ Type 5
              │                          └────┘
              │     Stub                 ┌────┐
              │ ┌────────────────────────┤ R4 │ Type 3
      Area 0  │ │                        └────┘
┌────┐       ┌┴─┴─┐ NSSA                 ┌────┐
│ R1 ├───────┤ R2 ├──────────────────────┤ R5 │ Type 7
└────┘       └┬─┬─┘                      └────┘
              │ │   Totally Stubby       ┌────┐
              │ └────────────────────────┤ R6 │ Type 3
              │                          └────┘
              │     NSSA Totally Stubby  ┌────┐
              └──────────────────────────┤ R7 │ Type 3
                                         └────┘
```

## Type 3 default

```console
R2# show ip ospf database summary 0.0.0.0 self-originate 

            OSPF Router with ID (2.2.2.2) (Process ID 1)

                Summary Net Link States (Area 24)

  LS age: 951
  Options: (No TOS-capability, DC, Upward)
  LS Type: Summary Links(Network)
  Link State ID: 0.0.0.0 (summary Network Number)
  Advertising Router: 2.2.2.2
  LS Seq Number: 80000002
  Checksum: 0x73C1
  Length: 28
  Network Mask: /0
        MTID: 0         Metric: 1 


                Summary Net Link States (Area 26)

  LS age: 951
  Options: (No TOS-capability, DC, Upward)
  LS Type: Summary Links(Network)
  Link State ID: 0.0.0.0 (summary Network Number)
  Advertising Router: 2.2.2.2
  LS Seq Number: 80000002
  Checksum: 0x73C1
  Length: 28
  Network Mask: /0
        MTID: 0         Metric: 1 


                Summary Net Link States (Area 27)

  LS age: 953
  Options: (No TOS-capability, DC, Upward)
  LS Type: Summary Links(Network)
  Link State ID: 0.0.0.0 (summary Network Number)
  Advertising Router: 2.2.2.2
  LS Seq Number: 80000002
  Checksum: 0xFA32
  Length: 28
  Network Mask: /0
        MTID: 0         Metric: 1
```

## Type 5 default

```console
R2# show ip ospf database external 0.0.0.0 self-originate 

            OSPF Router with ID (2.2.2.2) (Process ID 1)

                Type-5 AS External Link States

  LS age: 59
  Options: (No TOS-capability, DC, Upward)
  LS Type: AS External Link
  Link State ID: 0.0.0.0 (External Network Number )
  Advertising Router: 2.2.2.2
  LS Seq Number: 80000001
  Checksum: 0xFEAB
  Length: 36
  Network Mask: /0
        Metric Type: 2 (Larger than any link state path)
        MTID: 0 
        Metric: 1 
        Forward Address: 0.0.0.0
        External Route Tag: 1
```

## Type 7 default

```console
R2# show ip ospf database nssa-external 0.0.0.0 self-originate

            OSPF Router with ID (2.2.2.2) (Process ID 1)

                Type-7 AS External Link States (Area 25)

  LS age: 312
  Options: (No TOS-capability, No Type 7/5 translation, DC, Upward)
  LS Type: AS External Link
  Link State ID: 0.0.0.0 (External Network Number )
  Advertising Router: 2.2.2.2
  LS Seq Number: 80000001
  Checksum: 0xD0D8
  Length: 36
  Network Mask: /0
        Metric Type: 2 (Larger than any link state path)
        MTID: 0 
        Metric: 1 
        Forward Address: 0.0.0.0
        External Route Tag: 0
```
