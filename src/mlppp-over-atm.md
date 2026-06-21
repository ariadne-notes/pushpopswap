# MLPPP Over ATM

One of the more involved things I've built to find a bug.

<pre>
        ┌──────────────────────────────────────────────────────────────────────────────────────┐                                         
        │                                      MLPPP                                           │                                         
        ▼                                                                                      ▼ ┌─────────────────────────              
                                                                                                 │ VRF ISP                               
                                                               ┌───────────────────────────────┐ │ VAI 2.1 192.168.0.1                   
                                                               │          PPPoE                │ │                                       
                                                               ▼                               ▼ │     ┌──────────┐                      
                                                                                                 │     │  RADIUS  │                      
        ┌──────────────────────────────────────────────────────┐           ┌───────────────────┐ │     └───┬──────┘                      
        │                        PPPoA                         │           │       L2TP        │ │         │                             
        ▼                                                      ▼           ▼                   ▼ │         │                             
             POTS    ┌───┐    T3                        T3                                       ▼         │                             
                     │   │                                     ┌───────────┐     Ethernet      ┌───────────┴─┐ Lo20                      
┌───────┐ATM0     ATM│ D │ATM     ATM┌───────────┐ATM       ATM│           │                   │             │ VRF ISP                   
│  CPE  │Dialer1  1/3│ S │0/1   0/0/0│Lightspeed │0/0/1     6/0│    7200   │G0/1         G1/0/0│    10k      │ 20.1.1.1/32               
│  800  ├────────────┤ L ├───────────┤   1010    ├─────────────┤     LAC   ├───────────────────┤     LNS     │                           
│       │ ▲          │ A │           │           │             │           │.1               .2│ (unit under │ Lo0                       
└──┬────┘ │          │ M │           └───────────┘             │           │    10.0.0.0/24    │    test)    │ 1.1.1.1/32                
   │      │          │   │                                     └───────────┘                   └──────┬──────┘                ◄────┐     
   │      │          └───┘                                                                          .1│g4/0/0                      │     
   │      │                                                                                           │                            │     
   │      │                                                                             186.1.1.0/30  │  Ethernet                  │     
   │      │                                                                                           │                            │     
┌──┴────┐ │                                                                                         .2│g0/1                        │     
│ IXIA  │ │                                                                                    ┌──────┴──────┐                     │     
└───────┘ │                                                                                    │             │                     │     
          │                                                                                    │   7200-P    │ Lo0                 │ MPLS
          │                                                                                    │             │ 2.2.2.2/32          │     
          │Dialer1                                                                             │             │                     │     
          │192.168.0.2/24 Gateway 192.168.0.1 on LNS over PPP                                  └──────┬──────┘                     │     
          └─────────────                                                                            .1│g0/2                        │     
                                                                                                      │                            │     
                                                                                        186.1.2.0/30  │  Ethernet                  │     
                                                                                                      │                            │     
                                                                                                    .2│g7/0/0                      │     
                                                                                               ┌──────┴──────┐                 ◄───┘     
                                                  Ethernet     ┌─────────┐      Ethernet       │             │                           
                                      ┌──────┐                 │ 3925    │g0/0           g7/1/0│  10k        │ Lo0                       
                                      │ IXIA ├─────────────────┤  Pagent ├─────────────────────┤    BGP      │ 3.3.3.3/32                
                                      └──────┘               .1│         │.2           VRF ISP │      Peer   │                           
                                                               └─────────┘                   .1│             │ Lo20                      
                                                22.1.1.0/24                   21.1.1.0/30      └─────────────┘ VRF ISP                   
                                                                                                               20.1.1.2/32

</pre>

## CPE

```console
!
hostname CPE-800
!
multilink bundle-name authenticated
!
controller VDSL 0
!
interface Loopback1
 ip address 192.168.0.2 255.255.255.0
!
interface ATM0
 no ip address
 atm ilmi-keepalive 10
 pvc 2/160 
  encapsulation aal5mux ppp dialer
  dialer pool-member 1
 !
!
interface Ethernet0
 description link to IXIA
 no ip address
 shutdown
 no fair-queue
!
interface Dialer1
 ip unnumbered Loopback1
 ip virtual-reassembly in
 encapsulation ppp
 load-interval 30
 dialer pool 1
 ppp authentication pap callin
 ppp pap sent-username cisco@cisco.com password 0 cisco
 ppp ipcp address accept
!
ip route 0.0.0.0 0.0.0.0 192.168.0.1
!
```


## DSLAM

```console
!
version 12.2
!
hostname DSLAM
!
slot 1 ATUC-1-DMT8
slot 2 ATUC-1-DMT8
slot 3 ATUC-1-4DMT-I
slot 4 STUC-8-TCPAM
slot 5 ATUC-1-DMT8
slot 6 ITUC-1-8IDSL
slot 7 NI-2-DS3-T1E1
!
dsl-profile default
!
dsl-profile ariadne
 sdsl bitrate 1040
!
network-clock-select 1 ATM0/1
redundancy
ip subnet-zero
no ip domain-lookup
!
no atm oam intercept end-to-end
atm address 47.0091.8100.0000.0004.4ee4.9001.0004.4ee4.9001.00
atm router pnni
 no aesa embedded-number left-justified
 node 1 level 56 lowest
  redistribute atm-static
!
interface Ethernet0/0
 ip address 14.1.128.178 255.255.255.0
!
interface ATM0/1
 description to LS-1010 - ATM 0/0/0
 no ip address
 no atm ilmi-keepalive
!
interface ATM1/3
 description 
 no ip address
 no atm ilmi-keepalive
 atm pvc 2 160  interface  ATM0/1 2 160 
!
```

## LS1010

```console
!
version 12.1
!
hostname LS1010
!
interface ATM0/0/0
 description to 6015 DSLAM - ATM 0/1
 no ip address
 no atm ilmi-keepalive
!
interface ATM0/0/1
 no ip address
 no atm ilmi-keepalive
 atm pvc 2 160  interface  ATM0/0/0 2 160 
!
end
```

## LAC

```console
!
!
hostname LAC
!
ip cef
!     
!
multilink bundle-name authenticated
vpdn enable
!
vpdn-group 1
 request-dialin
  protocol l2tp
  domain cisco.com
 initiate-to ip 10.0.0.2
 local name LAC
 no l2tp tunnel authentication
 l2tp tunnel receive-window 100
 l2tp tunnel retransmit retries 10
 l2tp tunnel retransmit timeout min 3
 ip tos reflect
!
!
bba-group pppoe global
!
!
interface GigabitEthernet0/1
 description To LNS
 ip address 10.0.0.1 255.255.255.0
 duplex auto
 speed 1000
 media-type sfp
 negotiation auto
 pppoe enable group global
!
interface ATM5/0
 no ip address
 shutdown
 no atm ilmi-keepalive
 no atm enable-ilmi-trap
!
interface ATM6/0
 description To LS1010
 no ip address
 no atm ilmi-keepalive
 no atm enable-ilmi-trap
 pvc 2/160 
  encapsulation aal5mux ppp Virtual-Template1
 !
!
interface Virtual-Template1
 no ip address
 ppp authentication pap
!         
```

## LNS

```console
!
hostname LNS
!
boot system bootflash:c10k3-p11-mz.122-33.SB14
!
!
card 1/0 1gigethernet-1
card 2/0 1gigethernet-1
card 3/0 1gigethernet-1
card 4/0 1gigethernet-1
qos match statistics per-match
ip subnet-zero
ip VRF ISP
 rd 100:100
 route-target export 100:100
 route-target import 100:100
!
no ip domain lookup
!
multilink bundle-name authenticated
vpdn enable
!
vpdn-group VPDN-Plus
 accept-dialin
  protocol l2tp
  virtual-template 101
 terminate-from hostname LAC
 source-ip 10.0.0.1
 local name LNS
 lcp renegotiation always
 l2tp tunnel hello 2
 no l2tp tunnel authentication
 l2tp tunnel receive-window 100
 l2tp tunnel retransmit retries 10
 l2tp tunnel retransmit timeout min 3
 ip tos reflect
!
username cisco@cisco.com password 0 cisco
!
redundancy
 mode sso
!
!
interface Loopback0
 ip address 1.1.1.1 255.255.255.255
 ip ospf network point-to-point
 ip ospf 1 area 0
!
interface Loopback20
 ip vrf forwarding ISP
 ip address 20.1.1.1 255.255.255.255
!
interface FastEthernet0/0/0
 ip address dhcp
 media-type rj45
 speed auto
 duplex auto
!
interface GigabitEthernet1/0/0
 description To LAC
 ip address 10.0.0.2 255.255.255.0
 negotiation auto
!
interface GigabitEthernet4/0/0
 description to 7200-P
 ip address 186.1.1.1 255.255.255.252
 ip ospf 1 area 0
 no negotiation auto
 mpls ip
 cdp enable
!
interface Virtual-Template101 
 ip vrf forwarding ISP
 ip address 192.168.0.1 255.255.255.0
 no ip proxy-arp
 no logging event link-status
 peer default ip address dhcp
 keepalive 30
 ppp authentication pap
!
router ospf 1
 router-id 10.0.22.22
 log-adjacency-changes
!
router bgp 100
 bgp log-neighbor-changes
 neighbor 3.3.3.3 remote-as 100
 neighbor 3.3.3.3 update-source Loopback0
 !
 address-family ipv4
  no synchronization
  neighbor 3.3.3.3 activate
  no auto-summary
 exit-address-family
 !
 address-family vpnv4
  neighbor 3.3.3.3 activate
  neighbor 3.3.3.3 send-community extended
 exit-address-family
 !
 address-family ipv4 VRF ISP
  no synchronization
  redistribute connected
 exit-address-family
!
ip classless
!
! <routes removed, put some back in!>
!
```


## 7200-P

```console
!
hostname 7200-P
!
ip cef
!
multilink bundle-name authenticated
!
!
interface Loopback0
 ip address 2.2.2.2 255.255.255.255
 ip ospf 1 area 0
!
interface GigabitEthernet0/1
 description To LNS
 ip address 186.1.1.2 255.255.255.252
 ip ospf 1 area 0
 duplex auto
 speed 1000
 media-type gbic
 no negotiation auto
 mpls ip
!
interface GigabitEthernet0/2
 description to Other_10k
 ip address 186.1.2.1 255.255.255.252
 ip ospf 1 area 0
 duplex auto
 speed 1000
 media-type rj45
 no negotiation auto
 mpls ip
!
interface GigabitEthernet0/3
 ip address dhcp
 duplex auto
 speed auto
 media-type rj45
 no negotiation auto
!
router ospf 1
!
mpls ldp router-id Loopback0
!
!
!
mgcp profile default
!
!
!
gatekeeper
 shutdown
!
```

## Other 10k

```console
Other_10k# show run
!
hostname Other_10k
!
!
card 1/0 4chstm1-1
card 7/0 1gigethernet-hh-1
card 7/1 1gigethernet-hh-1
ip subnet-zero
ip VRF ISP
 rd 100:100
 route-target export 100:100
 route-target import 100:100
!
!
interface Loopback0
 ip address 3.3.3.3 255.255.255.255
 ip ospf network point-to-point
 ip ospf 1 area 0
!
interface Loopback20
 ip vrf forwarding ISP
 ip address 20.1.1.2 255.255.255.255
!
interface FastEthernet0/0/0
 ip address dhcp
 shutdown
 speed 100
 full-duplex
!
interface GigabitEthernet7/0/0
 ip address 186.1.2.2 255.255.255.252
 ip ospf 1 area 0
 no negotiation auto
 mpls ip
 cdp enable
!
interface GigabitEthernet7/1/0
 ip vrf forwarding ISP
 ip address 21.1.1.1 255.255.255.252
 negotiation auto
!
router ospf 1
 log-adjacency-changes
!
router bgp 100
 bgp log-neighbor-changes
 neighbor 1.1.1.1 remote-as 100
 neighbor 1.1.1.1 update-source Loopback0
 !
 address-family ipv4
  no synchronization
  neighbor 1.1.1.1 activate
  no auto-summary
 exit-address-family
 !
 address-family vpnv4
  neighbor 1.1.1.1 activate
  neighbor 1.1.1.1 send-community extended
 exit-address-family
 !
 address-family ipv4 VRF ISP
  no synchronization
  redistribute connected
 exit-address-family
!
ip classless
!
!
cdp run
!
!
mpls ldp router-id Loopback0
!
control-plane
!
```

## 3900 - Pagent box

```console
pagent #show run
!
ip cef
!
interface Loopback0
 ip address 3.3.3.3 255.255.255.255
!
interface GigabitEthernet0/0
 ip address 21.1.1.2 255.255.255.252
 load-interval 30
 media-type sfp
!
interface GigabitEthernet0/1
 ip address 22.1.1.1 255.255.255.0
 load-interval 30
 duplex auto
 speed auto
!
router bgp 65000
 bgp log-neighbor-changes
 network 3.3.3.3 mask 255.255.255.255
 network 22.1.1.0 mask 255.255.255.0
 neighbor 21.1.1.1 remote-as 100
!
```
