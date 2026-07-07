# ICMP Type 11 Time Exceeded

**ICMP** --- Internet Control Message Protocol

An ICMP Type 11 Time Exceeded message reports that a packet's TTL expired in
transit or that IPv4 fragment reassembly timed out.

> If the gateway processing a datagram finds the time to live field is zero
> it must discard the datagram. The gateway **may** also notify the source host
> via the time exceeded message.

Source [RFC 792].

[RFC 792]: https://www.rfc-editor.org/info/rfc792/

## Header

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────┬───────────────┬───────────────────────────────┐
│     Type      │     Code      │          Checksum             │
├───────────────┴───────────────┴───────────────────────────────┤
│                             unused                            │
├───────────────────────────────────────────────────────────────┤
│  Internet Header + at least 64 bits of Original Datagram Data │
└───────────────────────────────────────────────────────────────┘
```

## Codes

| Code | Name                              | Sent By          | Meaning                                             |
|------|-----------------------------------|------------------|-----------------------------------------------------|
| 0    | Time to Live Exceeded in Transit  | Router           | TTL reached zero while the packet was being routed  |
| 1    | Fragment Reassembly Time Exceeded | Destination host | All fragments did not arrive before the timer ended |

## Traceroute

Traceroute sends probes with increasing TTL values.

### Example

A sent Time-to-live exceeded message.

**Received**

```text
Ethernet II, Src: 52:54:00:81:12:6f (52:54:00:81:12:6f), Dst: 52:54:00:d8:d7:63 (52:54:00:d8:d7:63)
Internet Protocol Version 4, Src: 10.1.12.2 (10.1.12.2), Dst: 10.0.0.1 (10.0.0.1)
Internet Control Message Protocol
    Type: Time-to-live exceeded (11)
    Code: 0 (Time to live exceeded in transit)
    Internet Protocol Version 4, Src: 10.0.0.1 (10.0.0.1), Dst: 10.0.0.5 (10.0.0.5)
    User Datagram Protocol, Src Port: 49435 (49435), Dst Port: mtrace (33435)
```

## References

[RFC 792: Internet Control Message Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc792/)

[RFC 1122: Requirements for Internet Hosts | RFC Editor](https://www.rfc-editor.org/info/rfc1122/)

[IANA: Internet Control Message Protocol (ICMP) Parameters](https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml)
