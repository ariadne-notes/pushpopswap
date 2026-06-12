# iperf2

I like this test design for a few reasons.

- Doesn't overtax CML.
- 5 pps, we can start to get a feel for data flows.
- We can test how fast route recoveries or switchovers are.

## Unicast

### Server

```console
iperf --server --port 2000 --interval 5
```

### Client

```console
iperf --port 2000 --client 10.0.100.100 --reverse --time 3600 --interval 5 --udp --bandwidth 5pps  --len 1000
```

## Multicast

### Source

```console
iperf --server --udp --bind 239.10.10.10 --interval 5
```

### Receiver

```console
iperf --client 239.10.10.10 --udp --time 3600 --interval 5 --bandwidth 5pps --ttl 15 --len 1000
```
