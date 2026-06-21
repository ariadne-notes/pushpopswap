# Cisco ECMP

BGP defaults to 1 path.

OSPF defaults to 4 paths.

EIGRP defaults to 4 paths.

## ECMP algorithms

Your equipment might support different options.

**Universal**

- Default
- Selects based on (src-ip, dst-ip)

**Original**

- Legacy
- Exists on Cisco equipment

**Tunnel**

- Meant for tunnel endpoints
- Help with with low src-ip and dst-ip diversity

**Include Ports**

- Selects based on longer tuple
  - (src-ip, dst-ip, src-port, dst-port)

```console
ip cef load-sharing algorithm
```

## References

[IP Switching: Cisco Express Forwarding - Configuring a Load-Balancing Scheme for Cisco Express Forwarding Traffic Support - Cisco](https://www.cisco.com/c/en/us/td/docs/ios/ipswitch/configuration/guide/convert/ips_cef/cef_load_balancng.html)


[IP Switching Cisco Express Forwarding Configuration Guide - Configuring a Load-Balancing Scheme Cisco ASR 1000 Series Aggregation Services Routers - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch_cef/configuration/xe-16/isw-cef-xe-16-book/isw-cef-load-balancing.html#GUID-303F07B8-A52B-4BD3-A1F8-54DF24493D8E)

