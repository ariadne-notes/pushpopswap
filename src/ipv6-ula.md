# IPv6 Unique Link Local

## Terms

**ULA** --- Unique Local Address

These addresses are meant to be globally unique.

ULAs take the form, `fdxx:xxxx:xxxx::/48`

## Bits

\\( 5 \times 8 = 40 \\)

5 bytes and 8 bits to a byte, or 40 bits of entropy.

## Site Prefix

\\( 2^{40} = 1{,}099{,}511{,}627{,}776 \\)

There are about 1 trillion unique site prefixes.

## Site Prefix Generation

Each site should generate a unique ULA using a [RNG].

[RNG]: https://www.rfc-editor.org/info/rfc4086/

[Random.org - Five Random Bytes](https://www.random.org/cgi-bin/randbyte?nbytes=5&format=h)

`fdxx:xxxx:xxxx::/48`

### Examples

Don't copy my examples ... ☹️

- `fd1a:b22c:c764::/48`
- `fd39:42fb:f7a7::/48`
- `fdb1:bf6c:f270::/48`

## References

[RFC 4193: Unique Local IPv6 Unicast Addresses | RFC Editor](https://www.rfc-editor.org/info/rfc4193/)
