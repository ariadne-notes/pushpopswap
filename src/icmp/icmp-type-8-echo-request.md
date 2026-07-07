# ICMP Type 8 Echo Request

**ICMP** --- Internet Control Message Protocol

The message preceding an [ICMP Type 0 Echo Reply].

> Every host MUST implement an ICMP Echo server function that receives Echo
> Requests and sends corresponding Echo Replies.

Source [RFC 1122].

[RFC 1122]: https://www.rfc-editor.org/info/rfc1122/

[ICMP Type 0 Echo Reply]: icmp-type-0-echo-reply.md

## Header

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────┬───────────────┬───────────────────────────────┐
│   Type = 8    │   Code = 0    │          Checksum             │
├───────────────┴───────────────┼───────────────────────────────┤
│          Identifier           │        Sequence Number        │
├───────────────────────────────┴───────────────────────────────┤
│                             Data                              │
└───────────────────────────────────────────────────────────────┘
```

## Fields

| Field           | Purpose                                                    |
|-----------------|------------------------------------------------------------|
| Identifier      | Matches requests and replies to a ping process or session  |
| Sequence Number | Matches each reply to a request and helps detect loss       |
| Data            | Payload that the receiver returns unchanged in the reply    |

Ping sends Echo Requests to test IP reachability and measure round-trip time.
A missing reply does not prove the destination is down; ICMP may be filtered or
rate-limited.

## References

[RFC 792: Internet Control Message Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc792/)

[RFC 1122: Requirements for Internet Hosts | RFC Editor](https://www.rfc-editor.org/info/rfc1122/)

[IANA: Internet Control Message Protocol (ICMP) Parameters](https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml)
