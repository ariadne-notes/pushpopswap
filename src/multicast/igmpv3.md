# IGMPv3

**IGMP** --- Internet Group Membership Protocol

Hosts show interest in IPv4 multicast groups with IGMPv3.

Multiple group records can fit into a single report.

```
 0                   1                   2                   3    
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1  
┌───────────────┬───────────────┬───────────────────────────────┐ 
│  Type = 0x22  │    Reserved   │           Checksum            │ 
├───────────────┴───────────────┼───────────────────────────────┤ 
│             Flags             │  Number of Group Records (M)  │ 
├───────────────────────────────┴───────────────────────────────┤ 
│                                                               │ 
│                                                               │ 
│                        Group Record [1]                       │ 
│                                                               │ 
│                                                               │ 
├──────────────────────────────────────────────────────────────-│ 
│                                                               │ 
│                                                               │ 
│                        Group Record [2]                       │ 
│                                                               │ 
│                                                               │ 
└───────────────────────────────────────────────────────────────┘ 
```

[RFC 9776]: https://www.rfc-editor.org/info/rfc9776/#name-igmpv3-membership-report-me

## References

[RFC 9776: Internet Group Management Protocol, Version 3 | RFC Editor](https://www.rfc-editor.org/info/rfc9776/)
