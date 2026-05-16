# Proxy Arp Lab
There are lots of requirements to get this to work.

- Router needs to see the host `on-link`. 
- Host is configured for a much larger subnet then what is actually present.
- The ARP target the host is requesting is in the routing table.
- The ARP target cannot be out the same interface the ARP was heard on.

# Lab Topology

<pre>
                                                    192.168.23.0/24             
┌──────┐                   ┌──────┐         ┌──────┐               ┌──────┐     
│ Host ├───────────────────┤  R1  ├─────────┤  R2  ├───────────────┤  R3  │     
└──────┘                   └──────┘         └──────┘.2           .3└──────┘     
192.168.0.10/16      192.168.0.1/24                                             
</pre>

# Evidences

This happens if the host is `off-link` for the router. The router will see the arp, but also filter it.
```
*May  4 20:39:31.619: IP ARP req filtered src 192.168.100.100 5254.00b7.f21b, dst 192.168.23.2 0000.0000.0000 wrong cable, interface GigabitEthernet1 tableid 0
*May  4 20:39:32.675: IP ARP req filtered src 192.168.100.100 5254.00b7.f21b, dst 192.168.23.2 0000.0000.0000 wrong cable, interface GigabitEthernet1 tableid 0
```

# Verification

```
R1# show ip traffic | i proxy
        0 proxy name requests, 0 where-is requests, 0 other
  Sent: 0 address requests, 0 address replies (0 proxy)
        0 proxy name replies, 0 where-is replies
  Sent: 1 requests, 8 replies (2 proxy), 0 reverse
```

# Captures
[ARP-proxy-arp.pcap](./captures/switching/ARP-proxy-arp.pcap)

# References
[Cisco - Proxy ARP](https://www.cisco.com/c/en/us/support/docs/ip/dynamic-address-allocation-resolution/13718-5.html)

[Cisco - Proxy ARP Problem](https://community.cisco.com/t5/switching/proxy-arp-problem/td-p/1462662)