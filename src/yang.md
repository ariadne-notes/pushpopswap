# YANG

YANG is a data modeling language to describe and operate network equipment using NETCONF

It can be thought of as schema to configuring the perfect vendor neutral router.

To configure an IP address, use this schema:

| Module                      | Purpose                     |
| ----------------------------|-----------------------------|
| openconfig-if-ethernet.yang | duplex, speed, flow control |
| openconfig-interfaces.yang  | if-name, if-type, shutdown  |
| openconfig-if-ip.yang       | v4-addr, v6-addr            |

## References

[OpenConfig YANG models](<https://github.com/openconfig/public/tree/master/release/models>)

[RFC 6020 - YANG - A Data Modeling Language for the Network Configuration Protocol (NETCONF)](https://datatracker.ietf.org/doc/rfc6020/)