# Stateless NAT64

Uses one v4 address for each v6 address.

## Prefix Embedding

From RFC [6052]

[6052]: https://www.rfc-editor.org/info/rfc6052/#section-2.2

```text
    ┌──────────────────────────────────────────────────────────────────┐
 PL │0-----------------32--40--48--56--64--72--80--88--96--104-112-120-│
    ├──────────────────┬───────────────┬───┬───────────────────────────┤
/32 │      prefix      │         v4(32)│ u │                 suffix    │
    ├──────────────────┴───┬───────────┼───┼───┬───────────────────────┤
/40 │      prefix          │     v4(24)│ u │(8)│             suffix    │
    ├──────────────────────┴───┬───────┼───┼───┴───┬───────────────────┤
/48 │      prefix              │ v4(16)│ u │ v4(16)│         suffix    │
    ├──────────────────────────┴───┬───┼───┼───────┴───┬───────────────┤
/56 │      prefix                  │(8)│ u │ v4(24)    │     suffix    │
    ├──────────────────────────────┴───┼───┼───────────┴───┬───────────┤
/64 │      prefix                      │ u │ v4(32)        │ suffix    │
    ├──────────────────────────────────┴───┴───────────┬───┴───────────┤
/96 │      prefix                                      │    v4(32)     │
    └──────────────────────────────────────────────────┴───────────────┘
```

## Supported Prefixes

- /32
- /40
- /48
- /56
- /64
- /96

## References

[RFC 6052: IPv6 Addressing of IPv4/IPv6 Translators | RFC Editor](https://www.rfc-editor.org/info/rfc6052/)

[RFC 7915: IP/ICMP Translation Algorithm | RFC Editor](https://www.rfc-editor.org/info/rfc7915/)

[Cisco - IP Addressing Configuration Guide, IOS-XE 17.x - Stateless Network Address Translation 64](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_iadnat-stateless-nat64.html)
