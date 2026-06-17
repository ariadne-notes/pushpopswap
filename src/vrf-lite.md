# VRF Lite

This technology is popular in networks with overlapping IP ranges.

The popular example is ISPs, which carry customer traffic.

VRF Lite doesn't communicate how it's VRFs work to the other router, so both of these boxes are configured by hand.

**Topology**

```
      R1                             R2      
┌────────────┐                 ┌────────────┐
│ ┌───────┐  │                 │  ┌───────┐ │
│ │vrf  ┌─┴──┤.1             .2├──┴─┐vrf  │ │
│ │ red │G0/0├─────────────────┤G0/0│ red │ │
│ │     └─┬──┤   10.0.0.0/24   ├──┬─┘     │ │
│ ├───────┤  │                 │  ├───────┤ │
│ │vrf  ┌─┴──┤.1             .2├──┴─┐vrf  │ │
│ │ blue│G0/1├─────────────────┤G0/1│ blue│ │
│ │     └─┬──┤   10.0.0.0/24   ├──┬─┘     │ │
│ └───────┘  │                 │  └───────┘ │
└────────────┘                 └────────────┘
```

## Config

```text,editable
!
! R1 gets .1 for both interfaces
!
! R2 gets .2 for both interfaces
!
vrf definition red
 address-family ipv4
 exit-address-family
!
vrf definition blue
 address-family ipv4
 exit-address-family
!
interface GigabitEthernet0/0
 vrf forwarding red
 ip address 10.0.0.1 255.255.255.0
!
interface GigabitEthernet0/1
 vrf forwarding blue
 ip address 10.0.0.1 255.255.255.0
```

## Validation

### Routes
```text
R1# show ip route

Routing Table: red
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP

[output omitted]

Gateway of last resort is not set
```

No routes in the global table.

---

```text
R1# show ip route vrf red

Routing Table: red
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP

[output omitted]

Gateway of last resort is not set

      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        10.0.0.0/24 is directly connected, GigabitEthernet0/0
L        10.0.0.1/32 is directly connected, GigabitEthernet0/0
```

1 connected route in vrf red

---

```console
R1# show ip route vrf blue

Routing Table: blue
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP

[output omitted]

Gateway of last resort is not set

      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C        10.0.0.0/24 is directly connected, GigabitEthernet0/1
L        10.0.0.1/32 is directly connected, GigabitEthernet0/1
```

1 connected route in vrf blue

### Ping

```console
R1# ping 10.0.0.2
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 10.0.0.2, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)
```

Ping in the global table fails.

---
```console
R1# ping vrf red 10.0.0.2
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 10.0.0.2, timeout is 2 seconds:
.!!!!
Success rate is 80 percent (4/5), round-trip min/avg/max = 3/3/4 ms
```

Ping in vrf red works.

---

```console
R1# ping vrf blue 10.0.0.2
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 10.0.0.2, timeout is 2 seconds:
.!!!!
Success rate is 80 percent (4/5), round-trip min/avg/max = 3/3/4 ms
```

Ping in vrf blue works.


## References

