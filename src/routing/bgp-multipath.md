# BGP Multipath

BGP on its own does not perform ECMP[^ECMP].

[^ECMP]: Equal Cost Multi Path.

To make BGP behave more like an IGP, and especially at scale with multiple ECMP links, this feature is needed.

**Topology**

R1 is connected to the ISP via two eBGP links.

For any given route, eBGP on its own will install **one** best path.

```
          ┌───── eBGP ───────┐           
          ▼                  ▼           
             192.168.0.0/31              
┌────────┐.0                .1┌────────┐ 
│   R1   ├────────────────────┤  ISP   │ 
│AS 64496├────────────────────┤AS 64511│ 
└────────┘.2                .3└────────┘ 
             192.168.0.2/31              
          ▲                  ▲           
          └───── eBGP ───────┘           
```


## Config

### IOS-XE, no VRF

Courtesy of the [config guide].

[config guide]: https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-eibgp-multipath-for-nonvrf-interfaces.html

```text
router bgp 64496
  neighbor 192.168.0.1 remote-as 64511
  neighbor 192.168.0.3 remote-as 64511
  address-family ipv4 unicast
    maximum-paths eibgp 2
  !
  ! Not required for this diagram, but you know the command now
  !
  address-family ipv6 unicast
    maximum-paths eibgp 2
```

## References

[Cisco Live - A Deep Dive into Basic and Design Best Practices for BGP and L3VPN](/pdfs/ciscolive/BRKMPL-2103.pdf)

[Cisco - eiBGP Multipath for Non-VRF Interfaces (IPv4/IPv6) - IP Routing Configuration Guide, IOS-XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-eibgp-multipath-for-nonvrf-interfaces.html)

