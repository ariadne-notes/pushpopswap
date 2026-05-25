# Study Tables

## Log Message Severity Levels

| **Keyword**     | **Severity** | **Description**                     | **Mnemonic**                     |
|-----------------|--------------|-------------------------------------|----------------------------------|
| Emergency       | 0            | System unusable                     | Even                             |
| Alert           | 1            | Immediate action required           | A                                |
| Critical        | 2            | Critical Event (Highest of 3)       | Computer                         |
| Error           | 3            | Error Event (Middle of 3)           | Expert                           |
| Warning         | 4            | Warning Event (Lowest of 3)         | Will                             |
| Notification    | 5            | Normal, More Important              | Not                              |
| Informational   | 6            | Normal, Less Important              | Ignore                           |
| Debug           | 7            | Requested by User Debug             | Debugs                           |

Mnemonic courtesy of [Romelchand](https://learningnetwork.cisco.com/s/article/syslog-severity-amp-level)

## IP Protocol Numbers

When IP encapsulates another protoctol it labels the `protoctol` field with a number to define the next layer.


| IP Protocol Number | Description |
| ------------------ | ----------- |
| 1                  | ICMP        |
| 2                  | IGMP        |
| 6                  | TCP         |
| 17                 | UDP         |
| 46                 | RSVP        |
| 47                 | GRE         |
| 51                 | ESP (IPSec) |
| 51                 | AH (IPSec)  |
| 69                 | TFTP        |
| 88                 | EIGRP       |
| 89                 | OSPF        |
| 103                | PIM         |
| 112                | VRRP        |
| 115                | L2TP        |
| 161                | SNMP        |
| 162                | TRAPS       |

[Protocol Numbers - IANA](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml)

## Cisco Administrative Distance

| Protocol                        | Administrative Distance |
| ----------------                | ----------------------- |
| Connected                       | 0                       |

| Static                          | 1                       |
| EIGRP Summary                   | 5                       |

| eBGP                            | 20                      |

| EIGRP Internal                  | 90                      |

| OSPF                            | 110                     |

| IS-IS                           | 115                     |

| RIP                             | 120                     |

| ODR                             | 160                     |

| EIGRP External                  | 170                     |

| iBGP                            | 200                     |

| Unknown/Infinite[^infinite]     | 255                     |


## References


[Troubleshooting TechNotes - What is Administrative Distance? - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html#topic2)

[^infinite]:Can use to do route-filtering.