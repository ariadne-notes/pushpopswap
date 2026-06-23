# YANG

YANG is a Data Modeling Language

Data Modeled
- Config
- State
- RPCs (to make changes)
- Notifications (to get events)

## Terms

**YANG** --- Yet Another Next Generation

**Structured**

- Data that is formated for automation to use
- Data that follows a schema

**Schema**

- Rules around how data is allowed to be structured

# Why

Device CLI output provides **unstructured** data

```text
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/9, changed state to down
```

YANG provides **structured** data which follows a **schema**

```
<config xmlns="http://tail-f.com/ns/config/1.0">
  <router xmlns="http://com/example/routermodel">
    <name>switch</name>
    <address>192.168.0.10</address>
    <operational-status>down</operational-status>
    <interface>
      <type>GigabitEthernet</type>
      <enabled>true</enabled>
      <interface-id>0/9</interface-id>
    </interface>
  </router>
</config>
```

## Features

- Tree structured
- Defined structured
- Modular
- Encoding Variety
  - XML, JSON
- Meant for automated tooling

## Node Types

**Container**
- Groups nodes

**Leaf**

- A data

**Leaf-List**

- Multiple units of one data

**List**

## Models

**[Cisco]**

[Cisco]: https://github.com/YangModels/yang/tree/main/vendor/cisco

- AKA, Vendor Model
- AKA, Native Model
- AKA, IOS-XE Model
- Best Supported

**[OpenConfig]**

[OpenConfig]: https://www.openconfig.net/projects/models/

- Well Supported

**[IETF]**

[IETF]: https://github.com/YangModels/yang/tree/main/standard/ietf

- Not widely implemented
- A standards body
- Other works include
  - [YANG]
  - NETCONF
  - RESTCONF
  
**[IEEE]**

- Very New

[IEEE]: https://github.com/YangModels/yang/tree/main/standard/ieee

[YANG]: https://datatracker.ietf.org/doc/html/rfc7950

**ONF**

https://opennetworking.org/

**[IANA]**

[IANA]: https://github.com/YangModels/yang/tree/main/standard/iana

## OpenConfig

To configure an IP address, use this schema:

| Module                      | Purpose                     |
| ----------------------------|-----------------------------|
| openconfig-if-ethernet.yang | duplex, speed, flow control |
| openconfig-interfaces.yang  | if-name, if-type, shutdown  |
| openconfig-if-ip.yang       | v4-addr, v6-addr            |

## References

[Native, IETF, OpenConfig... Why so many YANG models? - Hank Preston - Cisco Blog](https://blogs.cisco.com/developer/which-yang-model-to-use)

[Cisco Live - ... Understand ... YANG with NETCONF and RESTCONF ... - Bryan Byrne & Hank Preston - BRKDEV-1368](./pdfs/ciscolive/BRKDEV-1368.pdf)

[Cisco Live - Exploring YANG Data Modeling - Aayushi Mahajan - DEVNET-1882](./pdfs/ciscolive/DEVNET-1882.pdf)

[OpenConfig YANG models - GitHub](https://github.com/openconfig/public/tree/master/release/models)

[RFC 6020 - YANG - A Data Modeling Language for the Network Configuration Protocol (NETCONF)](https://datatracker.ietf.org/doc/rfc6020/)
