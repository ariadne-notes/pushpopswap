# ICMP Type 3 Codes

> If, in the destination host, the IP module cannot deliver the
>
> datagram  because the indicated protocol module or process port is
>
> not active, the destination host may send a destination
>
> unreachable message to the source host.

```text
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────────────┬───────────────┬───────────────────────────────┐
│     Type      │     Code      │          Checksum             │
├───────────────┴───────────────┴───────────────────────────────┤
│                             unused                            │
├───────────────────────────────────────────────────────────────┤
│      Internet Header + 64 bits of Original Data Datagram      │
└───────────────────────────────────────────────────────────────┘
```

| Code | Name                                       | Sent By              | Meaning                                  |
|------|--------------------------------------------|----------------------|------------------------------------------|
| 0    | Net Unreachable                            | Router               | No route to destination network          |
| 1    | Host Unreachable                           | Router               | Route exists but host not responding     |
| 2    | Protocol Unreachable                       | Destination host     | IP protocol not supported                |
| 3    | Port Unreachable                           | Destination host     | UDP port not listening                   |
| 4    | Fragmentation Needed                       | Router               | Packet too big, DF bit set               |
| 9    | Net Administratively Prohibited            | Router               | ACL/policy blocks network                |
| 10   | Host Administratively Prohibited           | Router               | ACL/policy blocks host                   |
| 13   | Communication Administratively Prohibited  | Router or firewall   | Administrative filtering blocks traffic  |

## References

