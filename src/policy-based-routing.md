# Policy Based Routing

The more advanced of a `match` operation, the harder this becomes to get correct.

Verify with [Flexible Netflow](./flexible-netflow.md).

## Config


A host is doing a speedtest, with iperf. I want to match that traffic, and route it a *longer* way.

```console,editable
ip access-list extended AL_IPERF_TO_IPERF
  10 permit udp host 10.0.100.100 eq 2000 host 10.0.200.200
!
route-map RM_IPERF_TO_IPERF permit 10 
  match ip address AL_IPERF_TO_IPERF
  set ip next-hop 10.2.3.3
!
interface GigabitEthernet1
  ip policy route-map RM_IPERF_TO_IPERF
```

## Verify

- Destination Routing says Take Gig3
- PBR says take Gig2

```console
R2# show ip route 10.0.200.200
Routing entry for 10.0.200.0/24
  Known via "ospf 1", distance 110, metric 2, type intra area
  Last update from 10.2.4.4 on GigabitEthernet3, 01:03:09 ago
  Routing Descriptor Blocks:
  * 10.2.4.4, from 4.4.4.4, 01:03:09 ago, via GigabitEthernet3
      Route metric is 2, traffic share count is 1

R2# show flow monitor FLOW_MONITOR_IPV4 cache sort highest counter bytes long top 10 format table
Processed 2 flows
Aggregated to 2 flows
Showing the top 2 flows

IPV4 SRC ADDR    IPV4 DST ADDR    TRNS SRC PORT  TRNS DST PORT  INTF INPUT            IP PROT  intf output                     bytes long             pkts long    time first     time last
===============  ===============  =============  =============  ====================  =======  ====================  ====================  ====================  ============  ============
10.0.100.100     10.0.200.200              2000          42970  Gi1                        17  Gi2                                 172704                   168  01:39:42.020  01:40:15.368
10.1.2.1         224.0.0.5                    0              0  Gi1                        89  Null                                   100                     1  01:40:06.846  01:40:06.846
```

## References

[Cisco - Policy Based Routing - IOS-XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iri-pbr.html)

[Cisco - Best Practices for Route Maps](https://www.cisco.com/c/en/us/support/docs/ios-nx-os-software/ios-xe-17/223145-best-practices-for-route-map.html)

[Cisco - Configure Policy-based Routing with Next-Hop Commands](https://www.cisco.com/c/en/us/support/docs/ip/ip-routed-protocols/47121-pbr-cmds-ce.html)
