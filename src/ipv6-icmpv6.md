# ICMPv6

Required for IPv6 to work correctly.

## Header

```text
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
┌───────────────┬───────────────┬───────────────────────────────┐
│     Type      │     Code      │          Checksum             │
├───────────────┴───────────────┴───────────────────────────────┤
│                                                               │
│                         Message Body                          │
│                                                               │
```

## Error Messages

| Type | Purpose                 |
|------|-------------------------|
| 1    | Destination Unreachable |
| 2    | Packet Too Big          |
| 3    | Time Exceeded           |
| 4    | Parameter Problem       |

## Informational Messages

| Type | Purpose      |
|------|--------------|
| 128  | Echo Request |
| 129  | Echo Reply   |

## References

[RFC 4443 - Internet Control Message Protocol (ICMPv6) for IPv6](https://datatracker.ietf.org/doc/html/rfc4443)

[ICMPv6 - Wikipedia](https://en.wikipedia.org/wiki/ICMPv6)
