# OSPFv2 Point-to-Multipoint

p2mp
: point-to-multipoint

Intended for **Hub-and-Spoke** topologies.

There is no DR election for this network type.

## What is Hub and Spoke

This network type assumes that spoke sites cannot reach each other directly, but are in the same L3 subnet.

This network type also assumes hair-pins are OK (traffic must go in and out of the same interface on one node)

Since each router is in the same L3 subnet, but not directly L2 reachable, each router will advertise it's connected IP as a `/32`.

The use-case for this network type is DMVPN, and frame-relay, older network types with hub sites.

## Multicast

If multicast works, use`point-to-multipoint`.

If multicast does not work, use `point-to-point non-broadcast` and manually define the neighbors under OSPF.

## An Example Problem

A network is set up on Ethernet.

... Maybe it looks like this.

```plain
       10.12.34.0/24      
                          
┌──────┐          ┌──────┐
│  R1  ├─┐      ┌─┤  R2  │
└──────┘ │      │ └──────┘
        ┌┴──────┴┐        
        │ Switch │        
        └┬──────┬┘        
┌──────┐ │      │ ┌──────┐
│  R3  ├─┘      └─┤  R4  │
└──────┘          └──────┘
```

This will not work.

**IPs are**

- 10.12.34.1
- 10.12.34.2
- 10.12.34.3
- 10.12.34.4

**RIDs are**

- 1.1.1.1
- 2.2.2.2
- 3.3.3.3
- 4.4.4.4

**OSPF Network Types**, attempted.

- point-to-multipoint
- point-to-multipoint non-broadcast

### R1 - Doesn't Form a Full Mesh

`4.4.4.4` is broken.

Technically it flaps, going up and down.

```console
R1# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
4.4.4.4           0   EXSTART/  -     00:01:59    10.12.34.4      Ethernet0/0
2.2.2.2           0   FULL/  -        00:01:59    10.12.34.2      Ethernet0/0
3.3.3.3           0   FULL/  -        00:01:45    10.12.34.3      Ethernet0/0
```

### R1 OSPF Debugs Show Adjacency Problems

- R1-R4 Hello messages seem to work fine
- DBD messages from R1 never get to R4.

```console
debug ip ospf adjacency
debug ip ospf hello
```

```console
R1# show debug
Packet Infra debugs:

Ip Address                                               Port
------------------------------------------------------|----------

OSPF:
  OSPF hello debugging is on
  OSPF adjacency debugging is on

R1#
*Jun  2 23:40:18.278: OSPF-1 HELLO Et0/0: Rcv hello from 4.4.4.4 area 0 10.12.34.4
*Jun  2 23:40:18.278: OSPF-1 ADJ   Et0/0: 2 Way Communication to 4.4.4.4, state 2WAY
*Jun  2 23:40:18.278: OSPF-1 ADJ   Et0/0: Nbr 4.4.4.4: Prepare dbase exchange
*Jun  2 23:40:18.278: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:18.397: OSPF-1 HELLO Et0/0: Rcv hello from 3.3.3.3 area 0 10.12.34.3
*Jun  2 23:40:22.784: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:22.784: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [1]
*Jun  2 23:40:25.728: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.4 area 0 from 10.12.34.1
*Jun  2 23:40:25.728: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.2 area 0 from 10.12.34.1
*Jun  2 23:40:25.728: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.3 area 0 from 10.12.34.1
*Jun  2 23:40:27.481: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:27.481: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [2]
*Jun  2 23:40:28.018: OSPF-1 HELLO Et0/0: Rcv hello from 2.2.2.2 area 0 10.12.34.2
*Jun  2 23:40:32.481: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:32.481: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [3]
*Jun  2 23:40:37.083: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:37.083: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [4]
*Jun  2 23:40:41.603: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:41.603: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [5]
*Jun  2 23:40:45.534: OSPF-1 HELLO Et0/0: Rcv hello from 3.3.3.3 area 0 10.12.34.3
*Jun  2 23:40:46.486: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:46.486: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [6]
*Jun  2 23:40:47.070: OSPF-1 HELLO Et0/0: Rcv hello from 4.4.4.4 area 0 10.12.34.4
*Jun  2 23:40:51.106: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:51.106: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [7]
*Jun  2 23:40:53.805: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.4 area 0 from 10.12.34.1
*Jun  2 23:40:53.805: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.2 area 0 from 10.12.34.1
*Jun  2 23:40:53.805: OSPF-1 HELLO Et0/0: Send hello to 10.12.34.3 area 0 from 10.12.34.1
*Jun  2 23:40:55.769: OSPF-1 ADJ   Et0/0: Send DBD to 4.4.4.4 seq 0xB07 opt 0x52 flag 0x7 len 32
*Jun  2 23:40:55.769: OSPF-1 ADJ   Et0/0: Retransmitting DBD to 4.4.4.4 [8]
*Jun  2 23:40:55.909: OSPF-1 HELLO Et0/0: Rcv hello from 2.2.2.2 area 0 10.12.34.2
```

### R1 - Routing Table is Weird

R1 thinks the way to get to R4 is via R2.

Notice the other OSPF routers are fine.

```console
R1# show ip route

[output omitted]

      10.0.0.0/8 is variably subnetted, 5 subnets, 2 masks
C        10.12.34.0/24 is directly connected, Ethernet0/0
L        10.12.34.1/32 is directly connected, Ethernet0/0
O        10.12.34.2/32 [110/10] via 10.12.34.2, 00:35:13, Ethernet0/0
O        10.12.34.3/32 [110/10] via 10.12.34.3, 00:35:12, Ethernet0/0
O        10.12.34.4/32 [110/20] via 10.12.34.2, 00:34:19, Ethernet0/0
```

### R1 ARP is Correct.

L2 programming for a spoke site doesn't matter for Hub-and-Spoke designs.

```console
R1# show ip arp
Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  10.12.34.1              -   aabb.cc00.3d00  ARPA   Ethernet0/0
Internet  10.12.34.2            128   aabb.cc00.4d00  ARPA   Ethernet0/0
Internet  10.12.34.3            128   aabb.cc00.4e00  ARPA   Ethernet0/0
Internet  10.12.34.4            128   aabb.cc00.3e00  ARPA   Ethernet0/0
```

### R1 - CEF Is Wrong

This is how we know something is very wrong, a paradigm has been broken.

CEF is using the next-hop of R2.

```console
R1# show ip cef 10.12.34.4 detail 
10.12.34.4/32, epoch 0
  Adj source: IP adj out of Ethernet0/0, addr 10.12.34.4 7162A5807E90
    Dependent covered prefix type adjfib, cover 10.12.34.0/24
  nexthop 10.12.34.2 Ethernet0/0
```

### Checking Router LSAs

#### Self-Originated Router-LSA on R4

Point-to-Multipoint describes the network as a series of `/32` links. What does that mean?

It means when a router goes `FULL` the first thing it does is advertise its own connected IP directly into OSPF as a stub Network.

```console
R4# show ip ospf database router self-originate 

            OSPF Router with ID (4.4.4.4) (Process ID 1)

                Router Link States (Area 0)

  LS age: 792
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 4.4.4.4
  Advertising Router: 4.4.4.4
  LS Seq Number: 80000016
  Checksum: 0x9FC5
  Length: 48
  Number of Links: 2

    Link connected to: another Router (point-to-point)
     (Link ID) Neighboring Router ID: 2.2.2.2
     (Link Data) Router Interface address: 10.12.34.4
      Number of MTID metrics: 0
       TOS 0 Metrics: 10

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.12.34.4
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 0
```

#### R4 only has adjacency with R2.

```console
R4# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
N/A               0   DOWN/  -           -        10.12.34.3      Ethernet0/0
1.1.1.1           0   INIT/  -        00:01:59    10.12.34.1      Ethernet0/0
2.2.2.2           0   FULL/  -        00:01:53    10.12.34.2      Ethernet0/0
```

#### R2 has an adjacency with R1

```console
R2# show ip ospf neighbor 

Neighbor ID     Pri   State           Dead Time   Address         Interface
1.1.1.1           0   FULL/  -        00:01:38    10.12.34.1      Ethernet0/0
3.3.3.3           0   EXSTART/  -     00:01:51    10.12.34.3      Ethernet0/0
4.4.4.4           0   FULL/  -        00:01:49    10.12.34.4      Ethernet0/0
```

#### Checking LSAs for the area.

Notes are embedded in the output.

```console
R1# show ip ospf database router 

            OSPF Router with ID (1.1.1.1) (Process ID 1)

                Router Link States (Area 0)

  LS age: 1159
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 1.1.1.1
  Advertising Router: 1.1.1.1
  LS Seq Number: 80000010
  Checksum: 0xCB60
  Length: 60
  Number of Links: 3
!
! R1 is adjacent to R2
!
    Link connected to: another Router (point-to-point)
     (Link ID) Neighboring Router ID: 2.2.2.2
     (Link Data) Router Interface address: 10.12.34.1
      Number of MTID metrics: 0
       TOS 0 Metrics: 10

[output omitted]

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.12.34.1
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 0


  LS age: 1155
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 2.2.2.2
  Advertising Router: 2.2.2.2
  LS Seq Number: 8000001A
  Checksum: 0xE531
  Length: 60
  Number of Links: 3

    Link connected to: another Router (point-to-point)
     (Link ID) Neighboring Router ID: 1.1.1.1
     (Link Data) Router Interface address: 10.12.34.2
      Number of MTID metrics: 0
       TOS 0 Metrics: 10
!
! R2 is adjacency to R4
!
    Link connected to: another Router (point-to-point)
     (Link ID) Neighboring Router ID: 4.4.4.4
     (Link Data) Router Interface address: 10.12.34.2
      Number of MTID metrics: 0
       TOS 0 Metrics: 10

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.12.34.2
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 0

[output omitted]
!
! R4 advertises it's IP as a /32, via p2mp
!
  LS age: 1141
  Options: (No TOS-capability, DC)
  LS Type: Router Links
  Link State ID: 4.4.4.4
  Advertising Router: 4.4.4.4
  LS Seq Number: 80000016
  Checksum: 0x9FC5
  Length: 48
  Number of Links: 2

    Link connected to: another Router (point-to-point)
     (Link ID) Neighboring Router ID: 2.2.2.2
     (Link Data) Router Interface address: 10.12.34.4
      Number of MTID metrics: 0
       TOS 0 Metrics: 10

    Link connected to: a Stub Network
     (Link ID) Network/subnet number: 10.12.34.4 
     (Link Data) Network Mask: 255.255.255.255
      Number of MTID metrics: 0
       TOS 0 Metrics: 0
```

#### The Capture

[OSPFv2-p2mp-failing](./captures/routing/OSPFv2-p2mp-failing.pcap)

R1 sends a unicast DBD packet to R4, but uses the wrong mac address.

```plain
          10.12.34.0/24         
                                
    .3d00             .4d00     
   ┌──────┐          ┌──────┐   
.1 │  R1  ├─┐      ┌─┤  R2  │ .2
   └──────┘ │      │ └──────┘   
           ┌┴──────┴┐           
           │ Switch │           
           └┬──────┬┘           
   ┌──────┐ │      │ ┌──────┐   
.3 │  R3  ├─┘      └─┤  R4  │ .4
   └──────┘          └──────┘   
    .4e00             .3e00     
```

**The Packets in Text**

```plain
!
! Send a DBD Packet
!
Frame 1: Packet, 78 bytes on wire (624 bits), 78 bytes captured (624 bits)
Ethernet II, Src: aa:bb:cc:00:3d:00 (aa:bb:cc:00:3d:00), Dst: aa:bb:cc:00:4d:00 (aa:bb:cc:00:4d:00)
Internet Protocol Version 4, Src: 10.12.34.1, Dst: 10.12.34.4
Open Shortest Path First
    OSPF Header
    OSPF DB Description
    OSPF LLS Data Block
!
! Get an ICMP TTL exceeded
!
Frame 2: Packet, 70 bytes on wire (560 bits), 70 bytes captured (560 bits)
Ethernet II, Src: aa:bb:cc:00:4d:00 (aa:bb:cc:00:4d:00), Dst: aa:bb:cc:00:3d:00 (aa:bb:cc:00:3d:00)
Internet Protocol Version 4, Src: 10.12.34.2, Dst: 10.12.34.1
Internet Control Message Protocol
    Type: Time-to-live exceeded (11)
    Code: 0 (Time to live exceeded in transit)
    Checksum: 0xf0db [correct]
    [Checksum Status: Good]
    Unused: 00000000
    Internet Protocol Version 4, Src: 10.12.34.1, Dst: 10.12.34.4
    Open Shortest Path First
        OSPF Header
            Version: 2
            Message Type: DB Description (2)
            Packet Length: 32
            Source OSPF Router: 1.1.1.1
```

## The OSPFv2 Shortest Path Topology.

OSPF using `point-to-multipoint` assumes the topology looks like this.

```plain
         ┌──────┐              
         │  R2  │              
         └──┬───┘              
            │                  
            │                  
          .-~~~-.              
  .- ~ ~-(       )_ _          
 /                    ~ -.     
|                          ',  
 \                         .'  
   ~- ._ ,. ,.,.,., ,.. -~     
     │     '       '    │      
     │                  │      
     │                  │      
┌────┴─┐              ┌─┴────┐ 
│  R1  │              │  R4  │ 
└──────┘              └──────┘ 
```

### Workarounds

You can just make the routers not advertise their /32 networks using prefix suppression. This may not work in all IOS, IOS-XE versions.

```console
interface Ethernet0/0
 ip address 10.12.34.1 255.255.255.0
 ip ospf network point-to-multipoint non-broadcast
 ip ospf prefix-suppression
 ip ospf 1 area 0
end
```

## References

[Point-to-multipoint communication - Wikipedia](https://en.wikipedia.org/wiki/Point-to-multipoint_communication)

[Solved: OSPF Point-to-multipoint network type - Cisco Community](https://community.cisco.com/t5/routing-and-sd-wan/ospf-point-to-multipoint-network-type/td-p/3687411)

[RFC 2328: OSPF Version 2 | RFC Editor](https://www.rfc-editor.org/info/rfc2328/)

[IP Routing: OSPF Configuration Guide, Cisco IOS Release 15E - OSPF Mechanism to Exclude Connected IP Prefixes from LSA Advertisements Cisco IOS 15.2E - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/15-e/iro-15-e-book/iro-ex-lsa.html#GUID-779A0D0C-6CDE-4A1C-9B20-B863FB863F80)

