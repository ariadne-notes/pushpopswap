# Static Routing

Static routes cannot respond to things like bandwidth, delay, load, or reliability.

These routes are a choice where there is no alternative path.

## Config

### Normal Route

```console,editable
ip route 0.0.0.0 0.0.0.0 192.168.0.1
```

### Floating Static

Maybe the network already has a default route from an IGP like OSPFv2.

Since the OSPFv2 route is already present this won't be installed.


We call that **floating**.

```console,editable
!
! 225 is a higher administrative distance than EIGRP, OSPF, ISIS, iBGP, and eBGP.
!
ip route 0.0.0.0 0.0.0.0 192.168.0.1 225
```

## References

[Static Routing - IP Routing Configuration Guide, IOS-XE 17.x - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ip6-route-static-xe.html)
