# gNMI

**gNMI** --- gRPC Network Management Interface

Intended to obsolete SNMP.

- get
- set
- subscribe
- collect

## Setting an IPv4 address

This is done in gNMI via gRPC and a YANG model.

```console
/interfaces/interface[name=g0/0/0/0]/subinterfaces/subinterface[index=0]/ipv4/addresses/address[ip=10.0.0.1]/config/
  - ip: 10.0.0.1
  - prefix-length: 24
```

## References

[Cisco - Programmability Configuration Guide, IOS XE 17.13.x - gNMI Protocol](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/prog/configuration/1713/b_1713_programmability_cg/m_1713_prog_gnmi.html)

[Cisco Live - gRPC, gNMI, gNOI... Oh My! - Jeremy Cohoe - BKDEV-2017](../pdfs/ciscolive/BRKDEV-2017.pdf)

[GitHub - openconfig/gnmi](https://github.com/openconfig/gnmi)

[OpenConfig - gNMI specification](https://openconfig.net/docs/gnmi/gnmi-specification/)

[Openconfig - gNMIc](https://gnmic.openconfig.net/)
