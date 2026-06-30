# MSDP

- Link multicast domains via RPs
- Provide Redundant RPs via Anycast RP

A source turns on, and when the first RP finds out about it, it notifies other RPs.

## Details

- RPs register to each other, in different multicast domains
- RP sends a SA (source active) message
- Still needs PIM running for the `S,G`
- TCP port 639
- Has keepalives

## Startup

1. Multicast source starts up.
2. FHR router sends a register message to the closest RP.
3. RP registers this as a SA (Source Active).

4. Sends Source Active Messages to other RPs

(*,G) means there is an interested receiver.

## Config

```console,editable
!
! RP1
!
int lo0
description "Only used for Anycast RP"
ip address 10.0.0.1 255.255.255.255
!
int lo1
ip add 10.1.1.1 255.255.255.255
!
ip msdp peer 10.1.1.2 connect-source loopback 1
ip msdp originator-id loopback 1
ip pim rp-address 10.0.0.1
```

```console,editable
!
! RP2
!
int lo 0
  description "Only used for Anycast RP"
  ip address 10.0.0.1 255.255.255.255
!
int lo1
  ip address 10.1.1.2 255.255.255.255
!
ip msdp peer 10.1.1.1 connect-source lo1
ip msdp originator-id loopback 1
ip pim rp-address 10.0.0.1
```

## Commands

```console,editable
show ip msdp peer
show ip msdp sa-cache
```

## References

[RFC 4611 - Multicast Source Discovery Protocol (MSDP) Deployment Scenarios](https://datatracker.ietf.org/doc/html/rfc4611)

[Anycast RP - Cisco Whitepaper](https://www.cisco.com/c/en/us/td/docs/ios/solutions_docs/ip_multicast/White_papers/anycast.html)
