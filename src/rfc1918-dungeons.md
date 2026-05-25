# RFC1918 Dungeons

When the Internet was first envisioned, the designers thought everyone would get a publicly routable address.

My entire house shares 1 v4 Public IP address, which I'm thankful for.

Most mobile phones today use v6 by default.

These are called "Dungeon" Addresses because they can't be pinged on the Internet. They are not globally routeable.

It was (and stil is!) a very contentious design decision.

These are also the most famous IPv4 networks.



```
RFC 1918        Address Allocation for Private Internets   February 1996

3. Private Address Space

   The Internet Assigned Numbers Authority (IANA) has reserved the
   following three blocks of the IP address space for private internets:

     10.0.0.0        -   10.255.255.255  (10/8 prefix)
     172.16.0.0      -   172.31.255.255  (172.16/12 prefix)
     192.168.0.0     -   192.168.255.255 (192.168/16 prefix)

```

## References

[RFC 1918 - Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918)