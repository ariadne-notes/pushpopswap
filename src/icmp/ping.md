# Ping

**ICMP** --- Internet Control Message Protocol

Ping tests IPv4 reachability and measures round-trip time using ICMP Echo
messages.

## Operation

```text
┌──────┐    10.0.0.0/24    ┌──────┐
│  R1  ├───────────────────┤  R2  │
└──────┘.1               .2└──────┘
```

[ICMP Type 8 Echo Request]: icmp-type-8-echo-request.md
[ICMP Type 0 Echo Reply]: icmp-type-0-echo-reply.md

## Verification

Sending the ping.

```
R1# ping 10.0.0.2
Sending 5, 100-byte ICMP Echos to 10.0.0.2, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms
```

Counters on R1.

```
R1# show ip traffic | s ICMP      
ICMP statistics:
  Rcvd: 0 format errors, 0 checksum errors, 0 redirects, 0 unreachable
        0 echo, 5 echo reply, 0 mask requests, 0 mask replies, 0 quench
        0 parameter, 0 timestamp, 0 timestamp replies, 0 info request, 0 other
        0 irdp solicitations, 0 irdp advertisements
        0 time exceeded, 0 info replies
  Sent: 0 redirects, 0 unreachable, 5 echo, 0 echo reply
        0 mask requests, 0 mask replies, 0 quench, 0 timestamp, 0 timestamp replies
        0 info reply, 0 time exceeded, 0 parameter problem
        0 irdp solicitations, 0 irdp advertisements
```

Counters on R2.

```
R2# show ip traffic | s ICMP statistics
ICMP statistics:
  Rcvd: 0 format errors, 0 checksum errors, 0 redirects, 0 unreachable
        5 echo, 0 echo reply, 0 mask requests, 0 mask replies, 0 quench
        0 parameter, 0 timestamp, 0 timestamp replies, 0 info request, 0 other
        0 irdp solicitations, 0 irdp advertisements
        0 time exceeded, 0 info replies
  Sent: 0 redirects, 0 unreachable, 0 echo, 5 echo reply
        0 mask requests, 0 mask replies, 0 quench, 0 timestamp, 0 timestamp replies
        0 info reply, 0 time exceeded, 0 parameter problem
        0 irdp solicitations, 0 irdp advertisements
```

## As Hex

These can be pasted into an online [packet decoder].

[packet decoder]: https://hpd.gasmi.net/

**Echo request**

```text
52 54 00 40 e2 17 52 54 00 ff e7 79 08 00 45 00
00 64 00 00 00 00 ff 01 a7 96 0a 00 00 01 0a 00
00 02 08 00 95 aa 00 00 00 00 00 00 00 00 00 03
e8 9c ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd                                          
```

**Echo Reply**

```text
52 54 00 ff e7 79 52 54 00 40 e2 17 08 00 45 00
00 64 00 00 00 00 ff 01 a7 96 0a 00 00 02 0a 00
00 01 00 00 9d aa 00 00 00 00 00 00 00 00 00 03
e8 9c ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd ab cd ab cd ab cd ab cd ab cd ab cd ab cd
ab cd                                          
```

## Packet Capture

[ping-r1-to-r2.pcap](/captures/ping-r1-to-r2.pcap)

## References

[RFC 792: Internet Control Message Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc792/)

[RFC 1122: Requirements for Internet Hosts | RFC Editor](https://www.rfc-editor.org/info/rfc1122/)
