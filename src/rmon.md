# RMON

**RMON** --- Remote Network Monitoring

- Extends the SNMP protocol
- Intended for network segments
  - Intended for network traffic

RMON monitors are called **probes**.

RMON can monitor service quality. 

We can define ahead of time **thresholds** for the equipment to alert at.

This is useful for SLAs.

![rmon](/images/g041661.gif)

Image courtesy of [Juniper Networks].

[Juniper Networks]: https://www.juniper.net/documentation/us/en/software/junos/network-mgmt/topics/topic-map/monitoring-network-service-quality-by-using-rmon.html

## RMON1 MIB

- Focused on OSI layers 1 & 2

| Group          | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Statistics     | Real-time LAN statistics e.g. utilization, collisions, CRC errors          |
| History        | History of selected statistics                                              |
| Alarm          | Definitions for RMON SNMP traps to be sent when statistics exceed thresholds |
| Hosts          | Host specific LAN statistics e.g. bytes sent/received, frames sent/received |
| Hosts Top N    | Record of N most active connections over a given time period                |
| Matrix         | The sent-received traffic matrix between systems                            |
| Filter         | Defines packet data patterns of interest e.g. MAC address or TCP port      |
| Capture        | Collect and forward packets matching the Filter                             |
| Event          | Send alerts (SNMP traps) for the Alarm group                               |
| Token Ring     | Extensions specific to Token Ring                                           |

## RMON2 MIB

- Focused on OSI Layers 3-7

| Group                    | Description                                                                      |
|--------------------------|----------------------------------------------------------------------------------|
| Protocol Directory       | List of protocols the probe can monitor                                          |
| Protocol Distribution    | Traffic statistics for each protocol                                             |
| Address Map              | Maps network-layer (IP) to MAC-layer addresses                                   |
| Network-Layer Host       | Layer 3 traffic statistics, per each host                                        |
| Network-Layer Matrix     | Layer 3 traffic statistics, per source/destination pairs of hosts                |
| Application-Layer Host   | Traffic statistics by application protocol, per host                             |
| Application-Layer Matrix | Traffic statistics by application protocol, per source/destination pairs of hosts |
| User History             | Periodic samples of user-specified variables                                     |
| Probe Configuration      | Remote configure of probes                                                       |
| RMON Conformance         | Requirements for RMON2 MIB conformance                                           |

## References

[RMON - Wikipedia](<https://en.wikipedia.org/wiki/RMON>)

[Monitor Network Service Quality by using RMON | Junos OS | Juniper Networks](https://www.juniper.net/documentation/us/en/software/junos/network-mgmt/topics/topic-map/monitoring-network-service-quality-by-using-rmon.html)

[RFC 2819: Remote Network Monitoring Management Information Base | RFC Editor](https://www.rfc-editor.org/info/rfc2819/)

[RFC 4502: Remote Network Monitoring Management Information Base Version 2 | RFC Editor](https://www.rfc-editor.org/info/rfc4502/)


