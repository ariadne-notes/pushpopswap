# IPSec with IKEv1

```
crypto isakmp policy 10
 encryption aes
 hash sha256
 authentication pre-share
 group 14
!
crypto isakmp key cisco123 address 10.0.45.5
crypto isakmp key cisco123 address 10.0.12.1
!
crypto ipsec transform-set IP_TS_TUNNEL_DEFAULT esp-aes 256 esp-sha256-hmac
!
crypto ipsec profile IPP_TUNNEL_DEFAULT
 set transform-set IP_TS_TUNNEL_DEFAULT
!
interface Tunnel10
  ip address 100.0.2.1 255.255.255.252
  tunnel source GigabitEthernet0/0/0
  tunnel mode ipsec ipv4
  tunnel destination 192.0.2.2
  tunnel protection ipsec IPP_TUNNEL_DEFAULT
```