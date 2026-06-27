# YANG

YANG is a Data Modeling Language

Data Modeled
- Config
- State
- RPCs (to make changes)
- Notifications (to get events)

YANG was intended for NETCONF.

> 1.  Functional Overview
>
>   YANG is a language used to model data for the NETCONF protocol.  A
>   YANG module defines a hierarchy of data that can be used for NETCONF-
>   based operations, including configuration, state data, Remote
>   Procedure Calls (RPCs), and notifications.  This allows a complete
>   description of all data sent between a NETCONF client and server.

Source [RFC 6020 Section 4.1].

[RFC 6020 Section 4.1]: https://www.rfc-editor.org/info/rfc6020/#section-4.1

## Terms

**YANG** --- Yet Another Next Generation

**Structured**

- Data that is formated for automation to use
- Data that follows a schema

**Schema**

- Rules around how data is allowed to be structured

## Why

Device CLI output provides **unstructured** data

```text
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/9, changed state to down
```

YANG provides **structured** data which follows a **schema**

```xml
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

Different organizations make different models.

At present multiple models are needed to get all features.

This is a BGP example.

![ietf-98-openconfig-models](/images/ietf/ietf-98-openconfig-models.png)

Courtesy of IETF 98, Rob Shakir & Anees Shaikh

**[Cisco]**

[Cisco]: https://github.com/YangModels/yang/tree/main/vendor/cisco

- AKA, Vendor Model
- AKA, Native Model
- AKA, IOS-XE Model
- Best Supported

**[OpenConfig]**

[OpenConfig]: https://www.openconfig.net/projects/models/

- Industry supported
- Primary focus: operational usability
- Secondary focus: ease to implement

**[IETF]**

[IETF]: https://github.com/YangModels/yang/tree/main/standard/ietf

- Not widely implemented
- A standards body
- Other works include
  - [YANG](/yang.md)
  - [NETCONF](/netconf.md)
  - [RESTCONF](/restconf.md)
  
**[IEEE]**

- Very New

[IEEE]: https://github.com/YangModels/yang/tree/main/standard/ieee

[YANG]: https://datatracker.ietf.org/doc/html/rfc7950

**[ONF]**

[ONF]: https://opennetworking.org/

- Associated with the Linux Foundation

**[IANA]**

[IANA]: https://github.com/YangModels/yang/tree/main/standard/iana


## References

[Cisco Blog - Native, IETF, OpenConfig... Why so many YANG models? - Hank Preston](https://blogs.cisco.com/developer/which-yang-model-to-use)

[Cisco Live - ... Understand ... YANG with NETCONF and RESTCONF ... - Bryan Byrne & Hank Preston - BRKDEV-1368](/pdfs/ciscolive/BRKDEV-1368.pdf)

[Cisco Live - Exploring YANG Data Modeling - Aayushi Mahajan - DEVNET-1882](/pdfs/ciscolive/DEVNET-1882.pdf)

[GitHub - OpenConfig YANG models](https://github.com/openconfig/public/tree/master/release/models)

[IETF 98 - Observations on Modeling Configuration and State in YANG](/pdfs/ietf/slides-98-rtgwg-openconfig-modeling-and-observations-00.pdf)

[RFC 6020 - YANG - A Data Modeling Language for the Network Configuration Protocol (NETCONF)](https://datatracker.ietf.org/doc/rfc6020/)

