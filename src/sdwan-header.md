# SDWAN Headers

Site local traffic is given a MPLS label to identify the VPN.

Then the site data in encapsulated in IPsec for privacy.

Then the IPsec is encapsulated in UDP so it can be load balanced nicely.

Encryption is AES-256-GCM.

IP Encapsulation of MPLS is via [RFC 4023].

UDP encapsulation of IPSec is via [RFC 3948].

[RFC 3948] style IPsec encapsulation of UDP.

[RFC 4023]: https://www.rfc-editor.org/info/rfc4023/

[RFC 3948]: https://www.rfc-editor.org/info/rfc3948/

## UDP

This service doesn't provide strong authentication.

```text
┌──────────────────────────────┐
│       Outer IP Header        │
├──────────────────────────────┤
│          UDP Header          │
├───────────────┬──────────────┤
│  ESP Header   │   Sequence   │
│     SPI       │    Number    │
├────────────┬──┴──┬───┬───────┤
│ MPLS Label │ EXP │ S │ TTL   │
├────────────┴─────┴───┴───────┤
│       Inner IP Header        │
├──────────────────────────────┤
│       Inner TCP Header       │
├──────────────────────────────┤
│         Payload Data         │
├─────────────────┬────────────┤
│ Add to ESP      │  ESP Next  │
│ Trailer Padding │   Header   │
│ (always 0)      │            │
└─────────────────┴────────────┘
```


## ESP/UDP encapsulation

This is a version of ESP that's been extended to provide authentication.

```text
┌──────────────────────────────┐
│        Outer IP Header       │
├──────────────────────────────┤
│          UDP Header          │
├───────────────┬──────────────┤
│   ESP Header  │   Sequence   │
│      SPI      │    Number    │
├─────────────┬─┴───┬───┬──────┤
│  MPLS Label │ EXP │ S │ TTL  │
├─────────────┴─────┴───┴──────┤
│       Inner IP Header        │
├──────────────────────────────┤
│       Inner TCP Header       │
├──────────────────────────────┤
│         Payload Data         │
├─────────────────┬────────────┤
│ Add to ESP      │  ESP Next  │
│ Trailer Padding │   Header   │
│ (always 0)      │            │
├─────────────────┴────────────┤
│        ICV Checksum          │
└──────────────────────────────┘
```

## References

[Cisco - SD-WAN Security Configuration Guide, IOS XE 17.x - Security Overview](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/security/ios-xe-17/security-book-xe/security-overview.html)
