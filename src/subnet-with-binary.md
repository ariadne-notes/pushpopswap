# Subnetting with Binary

- A bit is `on` or `off`
- A nibble is four bits `0000`
- A byte is eight bits `0000 0000`

Powers of 2: `1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048`

## Examples

Start with a `/24`, eight free **h** bits, or values from 0 to 256.

`0000 0000`

### 100 hosts

A subnet needs 100 hosts, to represent that in binary, we'd need at least 7 bits, or 128.

A `/24` would be too large, 256 IPs, remove a bit, and we get a `/25`.

`10.0.0.0/25.`

### 20 more hosts

We already spent the first portion of the address space, from 0 to 127.

`0000 0000` is 0.

`1000 0000` is 128.

How many bits to represent 20 hosts? at least 5, or \\( 2^5 = 32-2 = 30 \\)

So we start with 128, and use at least five bits.

`1000 1000`

## References

[Cisco - Binary Game](<https://learningcontent.cisco.com/games/binary/index.html>)

