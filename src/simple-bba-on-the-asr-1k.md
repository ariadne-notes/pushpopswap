# Simple BBA on the ASR 1k

**BBA** --- Broadband Aggregation

Pulled from very old notes :)

## BBA

```console,editable
!
! ASR1k
!
bba-group pppoe PPPOE_USERS
  virtual template 1
!
interface Virtual-Template1
 ip address 10.10.10.1 255.255.255.0
 peer default ip address dhcp
 ppp authentication pap 
```

## Client

```console,editable
2800 Side

Current configuration : 76 bytes
!
interface Dialer1
 ip address dhcp
 encapsulation ppp
 dialer pool 1
!
interface FastEthernet0/0
 no ip address
 duplex auto
 speed aut
 pppoe enable
 pppoe-client dial-pool-number 1
end
```
