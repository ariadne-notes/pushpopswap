# Subnetting

Not really used by individual sites, but if you get a block from a RIR, this is how to subnet it.

In the US [ARIN] handles requests for v6 space.

[ARIN]: https://www.arin.net/resources/guide/ipv6/first_request/

Could be useful to work with [NPTv6]

[NPTv6]: https://www.rfc-editor.org/info/rfc6296/

## Blessed subnets

The easy v6 networks to subnet fall on hex digit boundaries of /4.

For these, [see this chart](./hextet-boundaries.md).

### /40

You're given `3fff::/20`, make some `/40` networks.

A `/40` is two hextets, and two hex digits worth of bits.

- `3fff:0:0000::/40`
- `3fff:0:0100::/40`
- `3fff:0:0200::/40`
- `3fff:0:0300::/40`
- `3fff:0:0400::/40`
- `3fff:0:0500::/40`

which becomes

- `3fff:0::/40`
- `3fff:0:100::/40`
- `3fff:0:200::/40`
- `3fff:0:300::/40`
- `3fff:0:400::/40`
- `3fff:0:500::/40`

### /44

You're given `3fff::/20`, make some `/44` networks.

A `/44` is two hextets, and three hex digits worth of bits.

- `3fff:0:0000::/44`
- `3fff:0:0010::/44`
- `3fff:0:0020::/44`
- `3fff:0:0030::/44`
- `3fff:0:0040::/44`
- `3fff:0:0050::/44`

which becomes

- `3fff:0::/44`
- `3fff:0:10::/44`
- `3fff:0:20::/44`
- `3fff:0:30::/44`
- `3fff:0:40::/44`
- `3fff:0:50::/44`

### /48

You're given `3fff::/20`, make some `/48` networks.

A `/48` is three hextets, worth of bits.

- `3fff:0:0::/48`
- `3fff:0:1::/48`
- `3fff:0:2::/48`
- `3fff:0:3::/48`
- `3fff:0:4::/48`

## Cursed subnets

What if instead, we try and subnet, inside a hex digit?

First, we'd have to know what every hex digit is in binary.

| Hex | Binary |
|-----|------- |
| 0   | `0000` |
| 1   | `0001` |
| 2   | `0010` |
| 3   | `0011` |
| 4   | `0100` |
| 5   | `0101` |
| 6   | `0110` |
| 7   | `0111` |
| 8   | `1000` |
| 9   | `1001` |
| A   | `1010` |
| B   | `1011` |
| C   | `1100` |
| D   | `1101` |
| E   | `1110` |
| F   | `1111` |

Then we'd want to figure out where the boundaries are for bits borrowed:

| Bits Borrowed | Boundaries                                     |
|---------------|------------------------------------------------|
| 1 bit         | 0, 8                                           |
| 2 bits        | 0, 4, 8, C                                     |
| 3 bits        | 0, 2, 4, 6, 8, A, C, E                         |

### /49

You're given `3fff::/20`, make some `/49` networks.

A `/49` is three hextets, plus one binary bit.

- `3fff:0:0:0::/49`
- `3fff:0:0:8000::/49`
- `3fff:0:1:0::/49`
- `3fff:0:1:8000::/49`
- `3fff:0:2:0000::/49`

### /50

You're given `3fff::/20`, make some `/50` networks.

A `/50` is three hextets, plus two binary bits.

- `3fff:0:0:0::/50`
- `3fff:0:0:4000::/50`
- `3fff:0:0:8000::/50`
- `3fff:0:0:C000::/50`
- `3fff:0:1:0000::/50`

### /51

You're given `3fff::/20`, make some `/51` networks.

A `/51` is three hextets, plus three binary bits.

- `3fff:0:0:0::/51`
- `3fff:0:0:2000::/51`
- `3fff:0:0:4000::/51`
- `3fff:0:0:6000::/51`
- `3fff:0:0:8000::/51`

## References

[IPv6 address - Wikipedia](https://en.wikipedia.org/wiki/IPv6_address)
