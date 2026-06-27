# IPv4 Subnets

All IPv4 addresses are 32-bits, or four groups of eight.

We call each group of eight an **octet**.

An IPv4 Address in binary looks like this.

`0000 0000 . 0000 0000 . 0000 0000 . 0000 0000`

Some portion of those 32-bits are network bits **N**, and another portion are host bits **H**.

A `/24` is 24 n-bits and 8 h-bits.

`nnnn nnnn . nnnn nnnn . nnnn nnnn . hhhh hhhh`

Since [classful networking is dead], unless we are told the subnet mask, we cannot guess what the subnet size is from an IP

[classful networking is dead]: /ipv4-classful-networking.md

## Terms

**N-bit** --- Network Bit

- Identifies the network portion of a v4 address

**H-bit** --- Host Bit

- Identifies the host portion of a v4 address

## Via octet

We can subnet anywhere from `/0` to `/32`. Even [`/31`] is valid.

When a portion of the 32-bit space is used to make a subnet mask, we call these bits **borrowed**.

[`/31`]: /point-to-point-links.md

| Borrowed Bits | Binary   | Decimal | Masks               |

| --------------|----------| --------| --------------------|
| 0             | 00000000 | 0       | /0, /8, /16, /24    |
| 1             | 10000000 | 128     | /1, /9, /17, /25    |
| 2             | 11000000 | 192     | /2, /10, /18, /26   |
| 3             | 11100000 | 224     | /3, /11, /19, /27   |
| 4             | 11110000 | 240     | /4, /12, /20, /28   |
| 5             | 11111000 | 248     | /5, /13, /21, /29   |
| 6             | 11111100 | 252     | /6, /14, /22, /30   |
| 7             | 11111110 | 254     | /7, /15, /23, /31   |
| 8             | 11111111 | 255     | /8, /16, /24, /32   |

## As powers of 2

Used to find subnets or the number of IPs.

For hosts use: \\( 2^x - 2 \\)

The default route, i.e. the whole Internet is `/0`.

| \\( 2^x \\) | Decimal   | Subnet         |
|-------------|-----------| ---------------|
| 0           | `/32`     | 1              |
| 1           | `/31`     | 2              |
| 2           | `/30`     | 4              |
| 3           | `/29`     | 8              |
| 4           | `/28`     | 16             |
| 5           | `/27`     | 32             |
| 6           | `/26`     | 64             |
| 7           | `/25`     | 128            |
| 8           | `/24`     | 256            |
| 9           | `/23`     | 512            |
| 10          | `/22`     | 1,024          |
| 11          | `/21`     | 2,048          |
| 12          | `/20`     | 4,096          |
| 13          | `/19`     | 8,192          |
| 14          | `/18`     | 16,384         |
| 15          | `/17`     | 32,768         |
| 16          | `/16`     | 65,536         |
| 17          | `/15`     | 131,072        |
| 18          | `/14`     | 262,144        |
| 19          | `/13`     | 524,288        |
| 20          | `/12`     | 1,048,576      |
| 21          | `/11`     | 2,097,152      |
| 22          | `/10`     | 4,194,304      |
| 23          | `/9`      | 8,388,608      |
| 24          | `/8`      | 16,777,216     |
| 25          | `/7`      | 33,554,432     |
| 26          | `/6`      | 67,108,864     |
| 27          | `/5`      | 134,217,728    |
| 28          | `/4`      | 268,435,456    |
| 29          | `/3`      | 536,870,912    |
| 30          | `/2`      | 1,073,741,824  |
| 31          | `/1`      | 2,147,483,648  |
| 32          | `/0`      | 4,294,967,296  |

## Config

A terrible and ancient way to load balance showing how subnet masks work.

```console,editable
!
! Use two /1s, impress your friends
!
! Useful to override your default network, I see wireguard uses this occasionally.
!
ip route 0.0.0.0   128.0.0.0 10.0.0.1
ip route 128.0.0.0 128.0.0.0 10.0.0.2
```