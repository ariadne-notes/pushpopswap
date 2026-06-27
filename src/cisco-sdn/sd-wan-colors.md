# SD-WAN Colors

Public colors are behind [NAT].

[NAT]: /nat.md

| Public (NAT)    | Private        |
|-----------------|----------------|
| public-internet | mpls           |
| biz-internet    | metro-ethernet |
| lte             | private1       |
| 3g              | private2       |
| blue            | private3       |
| bronze          | private4       |
| custom1         | private5       |
| custom2         | private6       |
| custom3         |                |
| default         |                |
| gold            |                |
| green           |                |
| red             |                |
| silver          |                |

## Terms

**Color** is a Cisco shorthand for the type of connection the SD-WAN is attached to.

**Private IP**

- AKA Native IP
- AKA [RFC 1918] address

[RFC 1918]: /ipv4/ipv4-addressing.md

**Public IP**

- AK, NAT address

## Communication between colors

If two TLOCs try to make a tunnel, they will fall back to both using Public IPs, if either has a Public IP.

```plain
         Public   Private   
           Color    Color   
        ┌────────┬─────────┐
 Public │ Public │ Public  │
  Color │   IPs  │   IPs   │
        ├────────┼─────────┤
Private │ Public │ Private │
  Color │   IPs  │   IPs   │
        └────────┴─────────┘
```

## References

[NetworkAcademy  - TLOCs and NAT](https://www.networkacademy.io/ccie-enterprise/sdwan/tlocs-and-nat)

[Cisco - SDWAN Configuration Guide - IOS-XE 17.x - TLOCs](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/17-x/systems-interfaces/systems-interfaces-guide-17-x/tloc.html#color)
