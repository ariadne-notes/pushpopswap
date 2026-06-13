# ACLs

- Stop on first match.
- end-of-list, no matches, deny.

An ACL to just count traffic should always end with


`permit ip any any`

## Block a specific host

Necessary because the default action at the end is "deny any"

```console,editable
access-list 1 deny host 10.0.0.1
access-list 1 permit any
```

## Allow a host range


This allows packets from 192.168.10.0/24 to travel to 192.168.200.0/24

```console,editable
access-list 101 permit ip 192.168.10.0 0.0.0.255 192.168.200.0 0.0.0.255
```

## Deny access except from specific hosts

Usually required for features like CoPP


```console,editable
access-list 10 permit 10.0.0.1
access-list 10 permit 10.0.0.2
access-list 10 permit 10.0.0.3
```

## References

[Cisco - ACL Examples](https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html)
