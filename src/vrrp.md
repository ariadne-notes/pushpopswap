# VRRP

VRRP is currently in version 3, it's a standards based way to perform FHRP.

Active Router
: The router performing as the default gateway

Backup Router
: The routers waiting to transition to become default gateways.

## Example

```console
R5# show vrrp brief
Interface          Grp Pri Time  Own Pre State   Master addr     Group addr
Gi0/0              56  100 3609       Y  Backup  192.168.56.6    192.168.56.56  
```

## Config

```console
interface GigabitEthernet0/0
 ip address 192.168.56.5 255.255.255.0
 ipv6 address 2001:DB8:0:56::5/64
 vrrp 56 ip 192.168.56.56
```

## References

[Network Services Configuration Guide, Cisco IOS XE 17.x - Configuring VRRP Cisco IOS XE 17 - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-vrrp-0.html)

[RFC 9568: Virtual Router Redundancy Protocol (VRRP) Version 3 for IPv4 and IPv6 | RFC Editor](https://www.rfc-editor.org/info/rfc9568/)
