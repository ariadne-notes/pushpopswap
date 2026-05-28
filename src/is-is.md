# ISIS

## Terms

**IS-IS**
- Intermediate System To Intermediate System
- An ISO standard open protocol.
- Link State and Shortest Path
- Good for large flat networks

**IS**
: Intermediate System
  - A router

**NSAP**
: Network Service Access Point
  - An instance of the IS-IS protocol. 

**NET**
: Network Entity Title
  - A router
  - Also refers to the address NSAP

**ES**
- End Station
- A PC, or a server.



**Station Routing**
- AKA, intra-area
- Routing within a L1 area.

**Area Routing**
-  AKA, inter-area
-  Routing within a L2 area.
  
**Backbone**
- The L2 area.


```console
router isis 
 net 00.0000.0000.0005.00
 interface g0/0/0/0
   address-family ipv4
```

Default route injected via route-map.

ISIS Uses a simplified topology compared to OSPF.

There are only three kinds of routers.

- **L2** Backbone routers, which can carry summaries.

- **L1L2:** ABRs, AKA Area Border Routers.

- **L1:** These are the Area routers. They do not flood their link state databases into L2.

## Example

<pre>
                                             ┌──────┐
                                             │ L1   │
                                             └───┬──┘
                                                 │
┌──────┐     ┌──────┐        ┌──────┐        ┌───┴──┐     ┌─────┐
│  L1  ├─────┤ L1L2 ├────────┤  L2  ├────────┤ L1L2 ├─────┤ L1  │
└───┬──┘     └───┬──┘        └──────┘        └───┬──┘     └─────┘
    │            └──────┐                  ┌─────┘
┌───┴──┐             ┌──┴───┐          ┌───┴──┐
│  L1  │             │  L2  │──────────┤  L2  │
└──────┘             └──────┘          └──────┘
</pre>


## Topology

**Single Topology**
- All Routed Protocols must be configured on all enabled interfaces.
- e.g. v4 and v6 on all interfaces.

**Multi-Topology**
- Some interfaces can be v4, others can be v6, others can be both.

### Addressing Scheme

```mermaid
packet-beta
0-7: "AFI"
8-23: "Area ID"
24-71: "System ID"
72-79: "SEL"
```

**AFI**
- Authority and Format Identifier - 1 byte
- `49` means local authority, and hexadecimal (binary is encoded).

**Area ID**
- Variable, and ... *includes* the AFI.

**System ID**
- 6 bytes, can fit a MAC address or a v4 address.
- Must be unique in an area for L1.
- Must be unique in a domain for L2.

**SEL**
- Selector - 1 byte.
- This is always `00` to mean router.


**Example**

`net 49.0001.0000.0A00.0001.00`

So long as the NSAP is unique, its OK because we aren't routing CLNS.

Priority is used for the CLNS election.
Circuit ID, who won the election

Level 2 can be Inter or Intra area
Level 1 is Intra area only.
Level 2 is the backbone.

Level 1 (NSSA)
  - Intraarea
  - Default route out (sets the attached bit)
  - Redistribution is allowed.

L1/L2 is the ABR in OSPF

ISIS does not ride IP, it rides CLNS.
To do Multipoint NBMA you need to include CLNS resolution.

L1 areas must match


## IS-IS Metric Styles

**Narrow**
- 63 per link
- 1 023 per path

**Wide**
- 16 772 215 per link
- 4 294 967 295 per path

Cisco's implementation of the wide metric uses the bits ISO set aside for delay, expense and error.

### Configuration

Enable wide metrics:

```console
metric-style wide
```

### Transition Commands

Used when migrating from narrow to wide without a hard cutover:

| Command                           | Behavior                                                 |
|-----------------------------------|----------------------------------------------------------|
| `metric-style transition`         | Advertises **both** narrow and wide TLVs simultaneously  |
| `metric-style narrow transition`  | Transitioning — still **advertising narrow** (old)       |
| `metric-style wide transition`    | Transitioning — now **advertising wide** (new)           |

# References

[RFC 1195: Use of OSI IS-IS for routing in TCP/IP and dual environments | RFC Editor](https://www.rfc-editor.org/info/rfc1195/)

[ISO/IEC 10589:2002 - Information technology — Telecommunications and information exchange between systems](https://www.iso.org/standard/30932.html)

[ISO/IEC 8348:2002 - Information technology — Open Systems Interconnection — Network service definition](https://www.iso.org/standard/35872.html)
