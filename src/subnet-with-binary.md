# Subnetting with Binary

- A byte is eight bits `0000 0000`.
- A nibble is four bits `0000`.
- A bit is `on` or `off`.

Powers of 2: `1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048`

These are the groups.

Start with a `/24`, eight bits, or values from 0 to 256.

`0000 0000`

## 100 Hosts


A subnet needs 100 hosts, to represent that in binary, we'd need at least 7 bits, or 128.

A `/24` would be too large, (256 IPs), remove a bit, and we get a `/25`.

`10.0.0.0/25.`

## Borrowing One Bit

`0000 0000`

`1000 0000`

## 20 Hosts


We already spent the first portion of the address space, from 0 to 127.

`0b0000 0000` is 0.

`0b1000 0000` is 128.

How many bits to represent 20 hosts? at least 5, or 32.

So we start with 128, and use at least five bits.

`0b1000 1000`
