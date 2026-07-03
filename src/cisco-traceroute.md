# Cisco Traceroute

I wrote this trying to understand why my lab equipment had missing ICMP packets.

The answer is [ICMP Rate Limiting], but it also covers [UDP behavior] and how the [ports are allocated].

[ICMP Rate Limiting]: #icmp-type-3-rate-limiting
[UDP behavior]: #cisco-traceroute-uses-udp
[ports are allocated]: #it-increments-the-src-and-dst-udp-ports

## Missing ICMP replies

### Topology

I first tried IOSv then recreated it with C8000v boxes. The behavior did not change.

- IOS-XE
- C8000v
- 17.13.01a
- Default Settings

**Topology**

```text
10.0.0.1/32     10.0.0.2/32     10.0.0.3/32      10.0.0.4/32       10.0.0.5/32 
   │               │               │                │                 │        
   │ 10.1.12.0/24  │ 10.3.23.0/24  │  10.1.34.0/24  │  10.3.45.0/24   │        
   ▼       │       ▼       │       ▼        │       ▼        │        ▼        
┌────┐.1   ▼  .2┌────┐.2   ▼  .3┌────┐.3    ▼  .4┌────┐.4    ▼   .5┌────┐      
│    ├──────────┤    ├──────────┤    ├───────────┤    ├────────────┤    │      
│ R1 │          │ R2 │          │ R3 │           │ R4 │            │ R5 │      
│    ├──────────┤    ├──────────┤    ├───────────┤    ├────────────┤    │      
└────┘.1   ▲  .2└────┘.2   ▲  .3└────┘.3    ▲  .4└────┘.4    ▲   .5└────┘      
           │               │                │                │                 
     10.2.12.0/24    10.4.23.0/24     10.2.34.0/24     10.4.45.0/24            
```

- Single area OSPFv2
- 13 subnets
- Ping works
- Always traceroute `*` on the last hop

### The Drops

```text
R1# traceroute 10.0.0.5 source 10.0.0.1 probe 5

  1 10.2.12.2 2 msec
    10.1.12.2 1 msec
    10.2.12.2 2 msec
    10.1.12.2 2 msec
    10.2.12.2 1 msec
  2 10.4.23.3 4 msec 3 msec 2 msec 2 msec 3 msec
  3 10.2.34.4 4 msec 4 msec 4 msec 4 msec 4 msec
  4 10.4.45.5 5 msec 5 msec *  5 msec * 
```

Captures are taken between R1 and R2. The output above is from a `probe 5` run; the captures use the default 3 probes per hop.

- [cisco-traceroute-link-1-dns-missing.pcap]
- [cisco-traceroute-link-2-dns-missing.pcap]

## Cisco traceroute uses UDP

- `udp.srcport` looks like it starts at a randomized ephemeral port and increments for each probe
- `udp.dstport` starts at `33434` and increments for each probe
- `udp.dstport` as a filter will find both the UDP probe and the ICMP reply

This means that each probe pair (the probe and its reply) has a **unique** and **sequential** port number.

## It increments the src and dst UDP ports

Each probe set has 1 added to its TTL.

```text
!
! Set 1
!
Probe 1 - udp.dstport == 33434 && udp.srcport == 49305 && ip.ttl == 1
Probe 2 - udp.dstport == 33435 && udp.srcport == 49306 && ip.ttl == 1
Probe 3 - udp.dstport == 33436 && udp.srcport == 49307 && ip.ttl == 1
!
! Set 2
!
Probe 1 - udp.dstport == 33437 && udp.srcport == 49308 && ip.ttl == 2
Probe 2 - udp.dstport == 33438 && udp.srcport == 49309 && ip.ttl == 2
Probe 3 - udp.dstport == 33439 && udp.srcport == 49310 && ip.ttl == 2
!
! Set 3
!
Probe 1 - udp.dstport == 33440 && udp.srcport == 49311 && ip.ttl == 3
Probe 2 - udp.dstport == 33441 && udp.srcport == 49312 && ip.ttl == 3
Probe 3 - udp.dstport == 33442 && udp.srcport == 49313 && ip.ttl == 3
!
! Set 4
!
Probe 1 - udp.dstport == 33443 && udp.srcport == 49314 && ip.ttl == 4
Probe 2 - udp.dstport == 33444 && udp.srcport == 49315 && ip.ttl == 4
Probe 3 - udp.dstport == 33445 && udp.srcport == 49316 && ip.ttl == 4
```

## Pathing

The UDP traffic has unique `udp.srcport` and `udp.dstport` per probe.

The returning ICMP traffic (Type 11 from the hops, Type 3 from the destination) is much more constrained.

> [!IMPORTANT]
> Each router decides **per flow** how to route both kinds of packets: `udp` & `icmp`
>
> Packets may not return via the path they arrived.

## Cisco Traceroute Uses DNS

It works differently depending on DNS.

### DNS is on, but broken

![Timing in Lab](/images/cisco-traceroute-no-dns.jpg)

The first four packets are 8 seconds apart. The router requests `PTR` records for each IP.

It waits for those PTR queries.

12 probes takes about 50 seconds. I get the `*` in the results.

- [cisco-traceroute-link-1-dns-missing.pcap]
- [cisco-traceroute-link-2-dns-missing.pcap]
- [cisco-traceroute-merged-dns-missing.pcap]

### Towards 8.8.8.8 with DNS enabled and working

> [!NOTE]
> Exact same router.

The behavior changes when I connect the router to my lab network, and it gets a DHCP address and can reach the open Internet.

![Timing towards Google](/images/cisco-traceroute-graph-of-outbound-udp.jpg)

22 probes complete in a little over 10 seconds.

### Disabling DNS lookups

The delay is reverse DNS: the captures show PTR queries for each newly seen hop address timing out between probes.

I added `no ip domain lookup`, it's much faster but I still get the `*` in the results.

![Timing with DNS disabled](/images/cisco-traceroute-dns-disabled.jpg)

- [cisco-traceroute-link-1-dns-disabled.pcap]
- [cisco-traceroute-link-2-dns-disabled.pcap]
- [cisco-traceroute-merged-dns-disabled.pcap]

## ICMP Type 3 Rate Limiting

IOS-XE defaults to 1 ICMP type 3 reply every 500 ms.

These replies are what traceroute needs to show a time result.

```text
R1# show run all | i icmp rate-limit
ip icmp rate-limit unreachable 500
```

### Show dropped replies

Looking at the captures, [cisco-traceroute-merged-dns-missing.pcap] and [cisco-traceroute-merged-dns-disabled.pcap] we do see the UDP probes arrive very close together.

[cisco-traceroute-link-1-dns-missing.pcap]: /captures/traceroute/cisco-traceroute-link-1-dns-missing.pcap
[cisco-traceroute-link-2-dns-missing.pcap]: /captures/traceroute/cisco-traceroute-link-2-dns-missing.pcap
[cisco-traceroute-link-1-dns-disabled.pcap]: /captures/traceroute/cisco-traceroute-link-1-dns-disabled.pcap
[cisco-traceroute-link-2-dns-disabled.pcap]: /captures/traceroute/cisco-traceroute-link-2-dns-disabled.pcap
[cisco-traceroute-merged-dns-missing.pcap]: /captures/traceroute/cisco-traceroute-merged-dns-missing.pcap
[cisco-traceroute-merged-dns-disabled.pcap]: /captures/traceroute/cisco-traceroute-merged-dns-disabled.pcap

If two probes come in too close together, the router will not reply.

> [!NOTE]
> These drops will not show up with `debug icmp`

```text
R5# show ip icmp rate-limit 

                           DF bit unreachables       All other unreachables   
Interval (millisecond)     500                       500                      

Interface                  # DF bit unreachables     # All other unreachables 
---------                  ---------------------     ------------------------ 
GigabitEthernet3           0                         0                        
GigabitEthernet4           0                         1                        
Loopback0                  0                         0   
```

## References

[Use the Traceroute Command on Operating Systems - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/ip-routed-protocols/22826-traceroute.html)
