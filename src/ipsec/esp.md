# Encapsulating Security Payload

IP Protocol 50

Usually used with GRE, or mGRE.

## Terms

**ESP** --- Encapsulating Security Payload

- IPSec process responsible for providing encryption

**ESP SPI** --- Security Parameters Index

- 32-bit field
- Identifies the SA on both sides

**ESP Sequence**

- 32-bit field
- Goes up by 1 for each transmitted packet.

It's not recommended to share a SA for multiple senders for this reason.

## Transport mode

![IPSec Transport Mode](../images/diagrams/ipsec-transport.drawio.svg)

![IPSec ESP Packet](../images/diagrams/ipsec-esp-transport-packet.svg)

## Tunnel mode

![IPSec Tunnel Mode](../images/diagrams/ipsec-tunnel.drawio.svg)

![IPSec ESP Packet](../images/diagrams/ipsec-esp-tunnel-packet.svg)

## References

[RFC 4303: IP Encapsulating Security Payload (ESP) | RFC Editor](https://www.rfc-editor.org/info/rfc4303/)

[RFC 7296: Internet Key Exchange Protocol Version 2 (IKEv2) | RFC Editor](https://www.rfc-editor.org/info/rfc7296/)

[IPsec - Wikipedia](https://en.wikipedia.org/wiki/IPsec#Encapsulating_Security_Payload)
