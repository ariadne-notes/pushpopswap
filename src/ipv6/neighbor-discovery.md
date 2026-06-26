# Neighbor Discovery

RA messages are sent with ICMPv6. These can carry options, so they've been extended to carry RDNSS information.

The router can say "Here is the DNS info".

## Terms

**ND** --- Neighbor Discoery

**RA** --- Router Advertisement

In v6, routers can just advertise the prefix of the attached subnet and options like RDNSS.

**RDNSS** --- Recursive DNS Server

**DAD** --- Duplicate Address Detection

## Functions

- SLAAC
- DAD
- Prefix Discoery
- Parameter Discovery
- Address Resolution
- Router Discovery
- Next-Hop Determination
- Neighbor Unreachability Detection
- Redirects

## RDNS server option

RFC [8106]: IPv6 Router Advertisement Options for DNS Configuration

[8106]: https://www.rfc-editor.org/info/rfc8106/#section-5.1

```plain
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────────────┬───────────────┬───────────────────────────────┐
│     Type      │     Length    │           Reserved            │
├───────────────┴───────────────┴───────────────────────────────┤
│                           Lifetime                            │
├───────────────────────────────────────────────────────────────┤
│                      Addresses of IPv6                        │
│                    Recursive DNS Servers                      │
└───────────────────────────────────────────────────────────────┘
```

## References

[RFC 4861: Neighbor Discovery for IP version 6 (IPv6) | RFC Editor](https://www.rfc-editor.org/info/rfc4861/)

[RFC 8106: IPv6 Router Advertisement Options for DNS Configuration | RFC Editor](https://www.rfc-editor.org/info/rfc8106/)
