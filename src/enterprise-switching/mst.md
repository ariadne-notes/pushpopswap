# MST

Cisco switches provide three kinds of spanning tree modes.

```console
switch(config)# spanning-tree mode ?
  mst         Multiple spanning tree mode
  pvst        Per-Vlan spanning tree mode
  rapid-pvst  Per-Vlan rapid spanning tree mode
```

The Industry has three kinds of interop.

| IEEE            | Cisco         | Notes                                          |
| ----------------|---------------|------------------------------------------------|
| STP (802.1D)    | PVST+         | Cisco's version is per vlan                    |
| RSTP (802.1w)   | Rapid PVST+   | Cisco's version is per vlan                    |
| MST (802.1s)    | MST           | Same standard; Cisco implements it on-gear     |

Industry liked what Cisco was doing with "per vlan" so MST merges that feature into 802.1s.

## Terms


**CST** --- Common Spanning Tree

- For interoperability we fall back to 802.1D, with one STP

**CST Root**

- The one root bridge for the entire CST

**MST** --- Multiple Spanning Trees

**MSTI** --- MST Instance

- A group of vlans on a common MSTI

**MST Region**

- A group of switches with the same high-level config

**MST Region Boundary**

- Where a MST region sends and receives BPDUs with a different switching instance (could be STP, RSTP, MST but a different region)

**MST Region Root**

- MST can propagate multiple MSTIs. Each MSTI can have its own root

**IST** --- Internal Spanning Tree

- Instance 0, the first instance

**IST Root**

- The IST root is the CST root

**CIST** --- Common and Internal Spanning Tree

- MST can derive what STP would do, for interop
- If a switch in a MST region is connected to a much older switch, it will present it with a CST

**MST Region Boundary**

- Any port that connects to a 802.1D or 802.1W device

**PVST Simulation**

- If a MST switch is root for the whole switch topology
  - Map the IST (instance 0) onto the CST, by sending BPDUs for all the VLANS it sees on the neighbor

**PVST Simulation Check**

- If a MST device receives a superior BPDU
  - Shut down the port


## Packet

From wireshark

```console
Spanning Tree Protocol                                                                                  
    Protocol Identifier: Spanning Tree Protocol (0x0000)                                                
    Protocol Version Identifier: Multiple Spanning Tree (3)                                             
    BPDU Type: Rapid/Multiple Spanning Tree (0x02)                         ───────┐                     
    BPDU flags: 0x7c, Agreement, Forwarding, Learning, Port Role: Designated      │                     
    Root Identifier: 0 / 0 / 52:54:00:5f:ff:79                                    │ Inter-op Data       
    Root Path Cost: 20000                                                         │   The CST MST       
    Bridge Identifier: 4096 / 0 / 52:54:00:82:c0:7f                               │     presents outside
    Port identifier: 0x800e                                                       │       its region    
    Message Age: 1                                                                │                     
    Max Age: 20                                                                   │                     
    Hello Time: 2                                                                 │                     
    Forward Delay: 15                                                      ───────┘                     
    Version 1 Length: 0                                                                                 
    Version 3 Length: 80                                                                                
    MST Extension                                                                                       
        MST Config ID format selector: 0                       ───────┐                                 
        MST Config name: green                                        │   What MST                      
        MST Config revision: 3                                        │    shows                        
        MST Config digest: 059b580e0d7ab80bcf83df54c634d006           │      other                      
        CIST Internal Root Path Cost: 20000                           │        devices                  
        CIST Bridge Identifier: 32768 / 0 / 52:54:00:04:67:92         │          in                     
        CIST Remaining hops: 19                                       │           its                   
        MSTID 1, Regional Root Identifier 0 / 52:54:00:82:c0:7f       │            Region               
                                                               ───────┘                                 
```

MST keeps track of a few things:

- **Root Identifier**, the interop bridge for the whole topology

- **Bridge Identifier,** the interop field that makes a MST region appear as one bridge outside of it

- **CIST Bridge,** the bridge that originated the BPDU. Not visible outside of MST

- **Regional Root,** the bridge that is the root for `green`. Not visible outside of MST



## Basic config

```console
spanning-tree mode mst
```


## More involved config

```console
default spanning-tree mst configuration
spanning-tree mst configuration
 name blue
 revision 3
 instance 1 vlan 10, 20, 30, 40
```

### Config validation

```console
S21# show spanning-tree mst configuration 
Name      [red]
Revision  3     Instances configured 2

Instance  Vlans mapped
--------  ---------------------------------------------------------------------
0         1-19,21-39,41-4094
1         20,40
-------------------------------------------------------------------------------
```

## Outputs

- A switch `ff79` in a different MST region is the root for the CST.
- Our regional root `c07f` is one hop away.

```console
S32# show spanning-tree mst 

##### MST0    vlans mapped:   1-9,11-19,21-29,31-39,41-4094
Bridge        address 5254.0004.6792  priority      32768 (32768 sysid 0)
Root          address 5254.005f.ff79  priority      0     (0 sysid 0)
              port    Gi3/2           path cost     20000    
Regional Root address 5254.0082.c07f  priority      4096  (4096 sysid 0)
                                      internal cost 20000     rem hops 19
Operational   hello time 2 , forward delay 15, max age 20, txholdcount 6 
Configured    hello time 2 , forward delay 15, max age 20, max hops    20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi3/1            Desg FWD 20000     128.14   P2p 
Gi3/2            Root FWD 20000     128.15   P2p 

##### MST1    vlans mapped:   10,20,30,40
Bridge        address 5254.0004.6792  priority      32769 (32768 sysid 1)
Root          address 5254.0082.c07f  priority      1     (0 sysid 1)
              port    Gi3/2           cost          20000     rem hops 19

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi3/1            Desg FWD 20000     128.14   P2p 
Gi3/2            Root FWD 20000     128.15   P2p 
```

## Captures

[MST-region-frame.pcap](/captures/switching/MST-region-frame.pcap)

## References

[Cisco - Understand the Multiple Spanning Tree Protocol (802.1s)](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24248-147.html#toc-hId--1408391100)

[Layer 23 - MSTP Protocol Explained: Multiple Spanning Tree in Depth](https://www.layer23-switch.com/blog/mstp-protocol.html)
