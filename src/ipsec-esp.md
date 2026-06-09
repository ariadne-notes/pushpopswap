# IPSec Encapsulating Security Payload

IP Protocol 50

## Terms

**ESP** --- Encapsulating Security Payload

The IPSec process responsible for providing encryption.

**ESP SPI** --- Security Parameters Index

32-bit field, used by the receiver to identify the SA.

**ESP Sequence**

32-bit field.

This goes up by 1 for each transmitted packet.

It's not recommended to share a SA for multiple senders for this reason.

## Transport Mode

Encrypt the payload.

![IPSec Transport Mode](./images/diagrams/ipsec-transport.drawio.svg)

![IPSec ESP Packet](./images/diagrams/ipsec-esp-transport-packet.svg)

## Tunnel Mode

Encrypt entire packet. Put into new packet.

- AKA IPSec Direct Encapsulation
- Does not support Dynamic Routing Protocols
- Does not support IP Multicast

![IPSec Tunnel Mode](./images/diagrams/ipsec-tunnel.drawio.svg)

![IPSec ESP Packet](./images/diagrams/ipsec-esp-tunnel-packet.svg)

## References

[RFC 4303: IP Encapsulating Security Payload (ESP) | RFC Editor](https://www.rfc-editor.org/info/rfc4303/)

[RFC 7296: Internet Key Exchange Protocol Version 2 (IKEv2) | RFC Editor](https://www.rfc-editor.org/info/rfc7296/)

[IPsec - Wikipedia](https://en.wikipedia.org/wiki/IPsec#Encapsulating_Security_Payload)