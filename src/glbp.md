# GLBP

This is a Cisco proprietary FHRP. The v4 and v6 exist for IOS, but v6 is missing for IOS-XE.

## Terms

**GLBP** --- Gateway Load Balancing Protocol

- Cisco Proprietary
- Supports 4 active forwarding instances

**AVG** --- Active Virtual Gateway

- The AVG is responsible for answering incoming ARP for the VIP
- Can reply with a different MAC addresses to load balance
- Highest priority router is the AVG

**AVF** --- Active Virtual Forwarder

- Two states {Active, Listen}
- All AVFs have their own mac and forwarding traffic destined towards that MAC
- 4 max

### Details

- Multicast
  - 224.0.0.102
- UDP 3222
- MD5 is supported
- Default timers: 3s / 10s

## Example

```console
R1# show glbp brief
Interface   Grp  Fwd Pri State    Address         Active router   Standby router
Gi0/0       12   -   100 Active   192.168.12.12   local           192.168.12.2
Gi0/0       12   1   -   Active   0007.b400.0c01  local           -
Gi0/0       12   2   -   Listen   0007.b400.0c02  192.168.12.2    -
```

## Config

```console,editable
interface GigabitEthernet0/0
 ip address 192.168.12.1 255.255.255.0
 !
 glbp 12 ip 192.168.12.12
 glbp 12 priority 100
 glbp 12 preempt
 !
 glbp 12 weighting 100
 glbp 12 load-balancing round-robin
```

## References

[Cisco - Configuring GLBP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-glbp-0.pdf)

[Solved: Re: ASR-1002X IPv6 GLBP - Cisco Community](https://community.cisco.com/t5/ipv6/asr-1002x-ipv6-glbp/m-p/3723462#M3286)
