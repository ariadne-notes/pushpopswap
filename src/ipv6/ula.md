# Unique Local Addressing

Sort of but not quite equivalent to [RFC 1918].

- Any site can generate a ULA and start using it
- Not meant to go over the global v6 Internet

[RFC 1918]: https://www.rfc-editor.org/info/rfc1918/

## Terms

**ULA** --- Unique Local Address

- Globally unique via randomness
- Take the form, `fdxx:xxxx:xxxx::/48`
- Five bytes or 40 bits of entropy

## Site prefixes

\\( 2^{40} = 1{,}099{,}511{,}627{,}776 \\)

Approximately 1 trillion unique site prefixes.

## Site prefix generation

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
