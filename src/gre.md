# GRE

GRE -- **Generic Routing Encapsulation**

- does not provide encryption
- just a transport service

To carry IPv4 just set the protocol type to `0x800`

The outer header (the delivery header) if it's IPv4 uses the protocol `47`

## Structure

GRE tries to be very basic, so it has three parts:

```
┌───────────────────────────────┐ 
│                               │ 
│       Delivery Header         │ 
│                               │ 
├───────────────────────────────┤ 
│                               │ 
│       GRE Header              │ 
│                               │ 
├───────────────────────────────┤ 
│                               │ 
│       Payload packet          │ 
│                               │ 
└───────────────────────────────┘ 
```

***GRE Header***

This is a RFC 2784 GRE header.

```text
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |C|       Reserved0       | Ver |         Protocol Type         |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |      Checksum (optional)      |       Reserved1 (Optional)    |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## References

[RFC 2784: Generic Routing Encapsulation (GRE) | RFC Editor](https://www.rfc-editor.org/info/rfc2784/)
