# IPv6

* 128 bits, more space.
* Globally Unique, less need for NAT.
* Fixed header length, v4 has variable length headers
* Optional, Option headers
* SLAAC. Stateless host addressing, with the router advertising the subnet prefix.
* Flow Labeling (for QoS)
* IPSec is required
* Routers cannot fragment packets
* Hosts can perform MTU path discovery
* Hosts can have multiple addresses and even multiple subnets
* Mobile IPv6 lets mobile nodes remain reachable
* No broadcast traffic

An IPv6 address is 128 bits.

## Header


RFCs really like groups of 32

<pre>
Deering & Hinden            Standards Track                     [Page 3]

RFC 2460                   IPv6 Specification              December 1998

3.  IPv6 Header Format

┌───────┬───────────────┬───────────────────────────────────────┐
│Version│ Traffic Class │           Flow Label                  │
├───────┴───────────────┴───────┬───────────────┬───────────────┤
│         Payload Length        │  Next Header  │   Hop Limit   │
├───────────────────────────────┴───────────────┴───────────────┤
│                                                               │
│                                                               │
│                                                               │
│                         Source Address                        │
│                                                               │
│                                                               │
│                                                               │
├───────────────────────────────────────────────────────────────┼
│                                                               │
│                                                               │
│                                                               │
│                      Destination Address                      │
│                                                               │
│                                                               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
</pre>

## Bits

Addresses are 128 bits.

A standard IPv6 address takes this form.

FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF

The groups are called *hextets*, as they are made with hex characters.

(I used F because IPv6 is hexadecimal)

- Each `0xFFFF` is 16 bits.
- Each `0xFF` is 8 bites, or a byte.
- Each `0xF` is 4 bits, or a  nibble.

## References

[RFC 2460 - Internet Protocol, Version 6 (IPv6)](https://www.rfc-editor.org/rfc/rfc2460)