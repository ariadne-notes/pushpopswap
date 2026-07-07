# ICMP Type 0 Echo Reply

**ICMP** --- Internet Control Message Protocol

The response to an [ICMP Type 8 Echo Request]. 

> The data received in the echo message **must** be returned in the echo reply
> message.

Source [RFC 792].

Responses will have

- Same identifier
- Same sequence number
- Same data 


[RFC 792]: https://www.rfc-editor.org/info/rfc792/
[ICMP Type 8 Echo Request]: icmp-type-8-echo-request.md

## Header

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────┬───────────────┬───────────────────────────────┐
│   Type = 0    │   Code = 0    │          Checksum             │
├───────────────┴───────────────┼───────────────────────────────┤
│          Identifier           │        Sequence Number        │
├───────────────────────────────┴───────────────────────────────┤
│                             Data                              │
└───────────────────────────────────────────────────────────────┘
```

## References

[RFC 792: Internet Control Message Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc792/)

[RFC 1122: Requirements for Internet Hosts | RFC Editor](https://www.rfc-editor.org/info/rfc1122/)

[IANA: Internet Control Message Protocol (ICMP) Parameters](https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml)
