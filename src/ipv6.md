An IPv6 address is 128 bits.

# References
[RFC 2460 - Internet Protocol, Version 6 (IPv6)](https://www.rfc-editor.org/rfc/rfc2460)

# Bits
Addresses are 128 bits.

A standard IPv6 address takes this form.

FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF

The groups are called *hextets*, as they are made with hex characters.

(I used F because IPv6 is hexadecimal)

- Each `0xFFFF` is 16 bits.
- Each `0xFF` is 8 bites, or a byte.
- Each `0xF` is 4 bits, or a  nibble.


## Hextext boundaries

As groups of 32

```
/32   FFFF:FFFF::
/64   FFFF:FFFF:FFFF:FFFF::
/96   FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::
/128  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF
```

As groups of 16.

```
/16   FFFF::                                 
/32   FFFF:FFFF::                            
/48   FFFF:FFFF:FFFF::                       
/64   FFFF:FFFF:FFFF:FFFF::                  
/80   FFFF:FFFF:FFFF:FFFF:FFFF::             
/96   FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::        
/112  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::   
/128  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF
```

In groups of 8
```
/8    FF::
/16   FFFF::
/24   FFFF:FF::
/32   FFFF:FFFF::
/40   FFFF:FFFF:FF::
/48   FFFF:FFFF:FFFF::
/56   FFFF:FFFF:FFFF:FF::
/64   FFFF:FFFF:FFFF:FFFF::
/72   FFFF:FFFF:FFFF:FFFF:FF::
/80   FFFF:FFFF:FFFF:FFFF:FFFF::
/88   FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/96   FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::
/104  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/112  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::
/120  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/128  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF
```

In groups of 4.
```
/4    F::
/8    FF::
/12   FFF::
/16   FFFF::
/20   FFFF:F::
/24   FFFF:FF::
/28   FFFF:FFF::
/32   FFFF:FFFF::
/36   FFFF:FFFF:F::
/40   FFFF:FFFF:FF::
/44   FFFF:FFFF:FFF::
/48   FFFF:FFFF:FFFF::
/52   FFFF:FFFF:FFFF:F::
/56   FFFF:FFFF:FFFF:FF::
/60   FFFF:FFFF:FFFF:FFF::
/64   FFFF:FFFF:FFFF:FFFF::
/68   FFFF:FFFF:FFFF:FFFF:F::
/72   FFFF:FFFF:FFFF:FFFF:FF::
/76   FFFF:FFFF:FFFF:FFFF:FFF::
/80   FFFF:FFFF:FFFF:FFFF:FFFF::
/84   FFFF:FFFF:FFFF:FFFF:FFFF:F::
/88   FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/92   FFFF:FFFF:FFFF:FFFF:FFFF:FFF::
/96   FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::
/100  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:F::
/104  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/108  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFF::
/112  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF::
/116  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:F::
/120  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FF::
/124  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFF::
/128  FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF
```

# Header

RFCs really like groups of 32

```
Deering & Hinden            Standards Track                     [Page 3]

RFC 2460                   IPv6 Specification              December 1998

3.  IPv6 Header Format

   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |Version| Traffic Class |           Flow Label                  |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |         Payload Length        |  Next Header  |   Hop Limit   |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   +                                                               +
   |                                                               |
   +                         Source Address                        +
   |                                                               |
   +                                                               +
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   +                                                               +
   |                                                               |
   +                      Destination Address                      +
   |                                                               |
   +                                                               +
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```