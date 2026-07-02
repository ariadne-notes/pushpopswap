# BFD on IOS-XE

## OSPFv2 IPv4

Performed on the 8000v running `17.13.01a` in CML.

```console, editable
!
! R4
!
interface GigabitEthernet3
 ip address 10.3.45.4 255.255.255.0
 ip ospf bfd strict-mode
 ip ospf 200 area 0
 bfd interval 500 min_rx 550 multiplier 3
!
interface GigabitEthernet4
 ip address 10.4.45.4 255.255.255.0
 ip ospf bfd
 ip ospf 200 area 0
 bfd interval 500 min_rx 550 multiplier 3
end
!
router ospf 200
 router-id 10.0.0.4
 bfd all-interfaces
```

### Commands

```
show bfd summary
show bfd neighbors
show bfd neighbors history 
```

### Verification


```
R4# show bfd summary 

                    Session          Up          Down

Total                     2           2             0

R4# show bfd neighbors 

IPv4 Sessions
NeighAddr                              LD/RD         RH/RS     State     Int
10.3.45.5                            4097/4097       Up        Up        Gi3
10.4.45.5                            4098/4098       Up        Up        Gi4

R4# show bfd neighbors history 

IPv4 Sessions
NeighAddr                              LD/RD         RH/RS     State     Int
10.3.45.5                            4097/4097       Up        Up        Gi3
History information:
[Jul  2 19:53:26.755] Event: notify client(CEF) IP:10.3.45.5, ld:4097, handle:1, event:UP, 
[Jul  2 19:53:26.755] Event: notify client(OSPF) IP:10.3.45.5, ld:4097, handle:1, event:UP, 
[Jul  2 19:53:26.755] Event: notify client(CEF) IP:10.3.45.5, ld:4097, handle:1, event:UP, 
[Jul  2 19:53:26.755] Event: V1 FSM ld:4097 handle:1 event:RX UP state:INIT
[Jul  2 19:53:26.748] Event: V1 FSM ld:4097 handle:1 event:RX DOWN state:DOWN
[Jul  2 19:53:26.700] 
 bfd_session_created, proc:OSPF, idb:GigabitEthernet3 handle:1 act 
```

## Captures

[BFD-with-ospf-echo-and-async.pcap](/captures/routing/BFD-with-ospf-echo-and-async.pcap)

## References

[Cisco - BFD - IP Routing Configuration Guide, Cisco IOS XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irb-bi-fwd-det-0.html#GUID-5ECFA603-956E-40C3-8D03-AC91EF80208D)
