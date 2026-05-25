# gNMI

A Google Invention

Part of the *OpenConfig* framework. [Google, Microsoft, ATT, and BT]

A gRPC based protocol to do the following:

- Get Config
- Set Config
- Ask for specific telemetry
- Get specific telemetry

> **replaces** SNMP

## Setting an IPv4 Address


This is done with NETCONF and a YANG model.

```console
/interfaces/interface[name=g0/0/0/0]/subinterfaces/subinterface[index=0]/ipv4/addresses/address[ip=10.0.0.1]/config/
  - ip: 10.0.0.1
  - prefix-length: 24
```

## References

[GitHub - openconfig/gnmi: gRPC Network Management Interface · GitHub](https://github.com/openconfig/gnmi)

[OpenConfig - gRPC Network Management Interface (gNMI) specification](https://openconfig.net/docs/gnmi/gnmi-specification/)
