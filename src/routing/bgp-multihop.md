# BGP Multihop

- eBGP defaults to a TTL of 1

Useful to peer eBGP neighbors to loopbacks instead of Link IPs.

**Topology**

```
     ┌─────────── eBGP ────────────┐      
     ▼                             ▼      
    Lo0                           Lo0     
10.0.0.96/32                  10.0.0.11/32
 ┌────────┐                    ┌────────┐ 
 │   R1   ├────────────────────┤  ISP   │ 
 │AS 64496│.0                .1│AS 64511│ 
 └────────┘   192.168.0.0/31   └────────┘ 
```

## Config

```
!
! R1 needs some kind of route to know how to reach the loopback.
!
ip route 10.0.0.11 255.255.255.255 192.168.0.1
!
router bgp 64496
  neighbor 10.0.0.11 remote-as 64511
  neighbor 10.0.0.11 ebgp-multihop 2
```

## References

[Cisco - Connecting to a Service Provider Using External BGP - IP Routing Configuration Guide, Cisco IOS XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-external-sp-0.html)
