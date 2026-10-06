# Understanding how DIA NAT Works

SD-WAN has the facility to route packets via the Direct Internet Access (DIA) Internet link.

How can we verify it works and find missing packets?

## Configuration

```text
ip nat route vrf 1 0.0.0.0 0.0.0.0 global
ip nat inside source list nat-dia-vpn-hop-access-list interface GigabitEthernet1 overload
interface GigabitEthernet1
 ip address 172.16.1.2 255.255.255.0
 ip nat outside

```


## via the SD-WAN policy engine

Ask the policy engine directly "what do you do with this packet?"

```text
Edge01# show sdwan policy service-path vpn 1 interface GigabitEthernet3 source-ip 192.168.12.100 dest-ip 8.8.8.8 protocol 1 all
Next Hop: Remote
  Remote IP: 172.16.1.254, Interface GigabitEthernet1 Index: 7
```

## via the FIB and RIB

1. Check the RIB for nat-route

   ```text
   Edge02# show ip route vrf 1 nat-route 
   
   Routing Table: 1
   Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
          D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area 
          N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
          E1 - OSPF external type 1, E2 - OSPF external type 2, m - OMP
          n - NAT, Ni - NAT inside, No - NAT outside, Nd - NAT DIA
          i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
          ia - IS-IS inter area, * - candidate default, U - per-user static route
          H - NHRP, G - NHRP registered, g - NHRP registration summary
          o - ODR, P - periodic downloaded static route, l - LISP
          a - application route
          + - replicated route, % - next hop override, p - overrides from PfR
          & - replicated local route overrides by connected
   
   Gateway of last resort is 0.0.0.0 to network 0.0.0.0
   
   n*Nd  0.0.0.0/0 [6/0], 11:15:34, Null0
   ```
   
   `n*Nd` means a NAT route (`n`), the candidate default (`*`), via NAT DIA (`Nd`).

1. Check for the SDWAN and NAT flags in CEF.

   ```text
   Edge02# show ip cef vrf 1 8.8.8.8 internal | i NAT
   0.0.0.0/0, epoch 0, flags [defrt, SDWAN, NAT], RIB[n], refcnt 6, per-destination sharing
   ```
   
   This means the NAT feature will move the packet between VRFs.


1. Do the lookup for the destination in CEF, in the VPN 0 table (the default table)

   ```text
   Edge02# show ip cef 8.8.8.8 detail
   0.0.0.0/0, epoch 2, flags [default route], per-destination sharing
     recursive via 172.16.1.254
       attached to GigabitEthernet1
     recursive via 172.16.2.254
       attached to GigabitEthernet2
   ```

## via NAT

```text
Edge02# show ip nat translations | i Outside|8.8.8.8
Pro  Inside global         Inside local          Outside local         Outside global
icmp 172.16.1.2:2          192.168.12.3:2        8.8.8.8:2             8.8.8.8:2
```

## via Packet Trace

```text
Edge02# debug platform condition ipv4 8.8.8.8/32 both

Edge02# debug platform packet-trace packet 16
 Please remember to turn on 'debug platform condition start' for packet-trace to work

Edge02# debug platform condition start

Edge02# ping vrf 1 8.8.8.8
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 8.8.8.8, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 15/21/35 ms

Edge02# debug platform condition stop

Edge02# show platform packet-trace statistics 
Packets Summary
  Matched  10
  Traced   10
Packets Received
  Ingress  5
  Inject   5
    Count       Code  Cause
    5           2     QFP destination lookup
Packets Processed
  Forward  5
  Punt     5
    Count       Code  Cause
    5           11    For-us data
  Drop     0
  Consume  0

          PKT_DIR_IN 
             Dropped       Consumed       Forwarded
INFRA            0             0             0
TCP              0             0             0
UDP              0             0             0
IP               0             5             5
IPV6             0             0             0
ARP              0             0             0

         PKT_DIR_OUT 
             Dropped       Consumed       Forwarded
INFRA            0             0             0
TCP              0             0             0
UDP              0             0             0
IP               0             0             0
IPV6             0             0             0
ARP              0             0             0


Edge02# show platform packet-trace summary
!
! INJ means Inject, as in the router created this packet.
!
Pkt   Input                     Output                    State  Reason
0     INJ.2                     Gi1                       FWD    
1     Gi1                       internal0/0/rp:0          PUNT   11  (For-us data)
2     INJ.2                     Gi1                       FWD    
3     Gi1                       internal0/0/rp:0          PUNT   11  (For-us data)
4     INJ.2                     Gi1                       FWD    
5     Gi1                       internal0/0/rp:0          PUNT   11  (For-us data)
6     INJ.2                     Gi1                       FWD    
7     Gi1                       internal0/0/rp:0          PUNT   11  (For-us data)
8     INJ.2                     Gi1                       FWD    
9     Gi1                       internal0/0/rp:0          PUNT   11  (For-us data)

!
! Echo Request Packet
!
Edge02# show platform packet-trace packet 0
Packet: 0           CBUG ID: 0
Summary
  Input     : INJ.2  
  Output    : GigabitEthernet1
  State     : FWD 
  Timestamp
    Start   : 27086935621878 ns (10/05/2026 21:36:21.14221 UTC)
    Stop    : 27086942403459 ns (10/05/2026 21:36:21.21003 UTC)
Path Trace
  Feature: IPV4(Input)
    Input       : internal0/0/rp:0
    Output      : <unknown>
    Source      : 192.168.12.3
    Destination : 8.8.8.8
    Protocol    : 1 (ICMP)
  Feature: SDWAN Internal Intf
    VRF ID      : 1 
    Encap Type  : unknown
    IP DSCP     : 0
    IP Version  : 4
    IP Protocol : 1
    Dst Port    : 0
    Is Marked High Priority         : NO
    Is SDWAN Control Tunnel Traffic : NO
    Set HIGH_QUEUE                  : NO (NOT marked high priority, NOT SDWAN control tunnel traffic)
    Skip SDWAN Policy               : FALSE
  Feature: NAT
    VRFID          : 1
    table-id       : 1
    Protocol       : ICMP
    Direction      : IN to OUT
    From           : DIA INTERFACE 
    Action         : Translate Source
    Steps          : SESS-CREATE 
    Match id       : 1 
    Old Address    : 192.168.12.3
    New Address    : 172.16.1.2
    Orig src port  : 1
    New src port   : 1
    Orig dest port : 1
    New dest port  : 1
    trace_point    : 0x0
    proc_flags     : 0x1
    Lookup flags   : 0x5
    Event flags    : 0x5
    Map-id result  : 0
    Rule Id        : 0
    in-uidb        : 16777217
    out-uidb       : 0
  Feature: QOS
    Direction        : Egress
    Action           : FWD
    Pak Priority     : FALSE
    Priority         : FALSE
    Queue ID         : 113 (0x71)
    PAL Queue ID     : 0 (0x0)
    Queue Limit      : 1043
    WRED enabled     : FALSE
    Inst Queue len   : 0
    Avg Queue len    : n/a

!
! Echo reply packet
!
Edge02# show platform packet-trace packet 1
Packet: 1           CBUG ID: 1
Summary
  Input     : GigabitEthernet1
  Output    : internal0/0/rp:0
  State     : PUNT 11  (For-us data)
  Timestamp
    Start   : 27086957044507 ns (10/05/2026 21:36:21.35644 UTC)
    Stop    : 27086966500335 ns (10/05/2026 21:36:21.45100 UTC)
Path Trace
  Feature: IPV4(Input)
    Input       : GigabitEthernet1
    Output      : <unknown>
    Source      : 8.8.8.8
    Destination : 172.16.1.2
    Protocol    : 1 (ICMP)
  Feature: SDWAN Implicit ACL
    Action : ALLOW
    Reason : SDWAN_NAT_DIA
  Feature: NAT
    VRFID          : 0
    table-id       : 0
    Protocol       : ICMP
    Direction      : OUT to IN
```

## Commands

**RIB and FIB**

```text,editable
show vrf brief
show sdwan policy service-path vpn 1 interface GigabitEthernet3 source-ip 192.168.12.100 dest-ip 8.8.8.8 protocol 1 all
show ip route vrf 1 | s 0.0.0.0
show ip cef vrf 1 8.8.8.8 internal | i NAT
show ip cef 8.8.8.8 detail
```

**Packet Trace**

```text,editable
debug platform condition ipv4 8.8.8.8/32 both
debug platform packet-trace packet 16
debug platform condition start
!
! perform the test
!
ping vrf 1 8.8.8.8
!
! stop
!
debug platform condition stop
show platform packet-trace statistics 
show platform packet-trace summary
show platform packet-trace packet 0
show platform packet-trace packet 1
clear platform condition all
```

## References

[Cisco Live - Configure, Verify, and Troubleshoot DIA in SD-WAN - Adrian Jimenez & Connor Szurgot - TACENT-2014](/pdfs/ciscolive/TACENT-2014.pdf)
