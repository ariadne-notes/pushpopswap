# Subnet with fingers

I just memorize these sequences, ungainly, but works.

Decimal masks - `128, 192, 224, 240, 248, 252, 254, 255`

Wildcard masks - `127, 63, 31, 15, 7, 3, 1, 0`

Subnet Sizes (going up) - 256, 512, 1024, 2048.

Subnet Sizes (going down) - 128, 64, 32, 16, 8, 4, 2, 1.

# Subnet Examples

A `/24` is 256 IPs. Most gear complains if you use `.0` or `.256`, so we say 254 usable hosts.

A `/30` is the 1990s way of addressing a point-to-point link, which wastes two IPs.

A `/31` is *exactly* two IPs. This is the best subnet for point-to-point links.

A `/32` is a single address. We call these host routes. `8.8.8.8/32` is Google's DNS.

# References
[Using 31-Bit Prefixes on IPv4 Point-to-Point Links](https://www.rfc-editor.org/rfc/rfc3021)
