# HSRP

Cisco Proprietary

- UDP port 1985 (v6 2029)
- Version 1,  RFC 2281
- Version 2, adds IPv6, no RFC

## Version 1

- No millisecond timers
- Groups from 0 to 255
- hello messages have virtual mac
- 224.0.0.2
- default timers: 3s / 10s

## Version 2

- Millisecond timers
- Groups from 0 to 4095
- Hello messages have src-mac
- 224.0.0.102
- ff02::66
- address range: 0000.0C9F.F000 to 0000.0C9F.FFFF

## Example

```console
R3# show standby brief
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State   Active          Standby         Virtual IP
Gi0/0       34   100   Standby 192.168.34.4    local           192.168.34.34
```

## Config

```console
interface GigabitEthernet0/0
 ip address 192.168.34.3 255.255.255.0
 standby 34 ip 192.168.34.34
 ipv6 address 2001:DB8:0:34::3/64
```

## References

[Hot Standby Router Protocol - Wikipedia](https://en.wikipedia.org/wiki/Hot_Standby_Router_Protocol)

