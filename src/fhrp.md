# FHRP

## HSRP


## GLBP


### Terms

* **GLBP** - Gateway Load Balancing Protocol.
* **AVG** - Active Virtual Gateway. The AVG response to ARP requests, with the same IP, but different MAC addresses to load balance for GLBP.
* **AVF** - Active Virtual Forwarder. A router in a GLBP group that is forwarding packets. All AVFs have their own mac, and are responsible for forwarding traffic destined towards that MAC.

- Cisco proprietary
- 224.0.0.102
- UDP 3222
- AVG is highest priority

- Max of 4 active AVFs
- Two states: Active, Listen
- MD5 is supported

## References

[Cisco - Configuring GLBP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-glbp-0.pdf)