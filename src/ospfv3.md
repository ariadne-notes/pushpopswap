# OSPFv3

Uses IPv6 Next Header 89.

OSPFv3 supports IPv4, as an additional address family.

## Multicast Addresses

- ff02::5
- ff02::6

## Packet types

| Type | Name                  | Short Name | Purpose                                              |
|------|-----------------------|------------|------------------------------------------------------|
| 1    | Hello                 | Hello      | OSPFv2 puts the neighbor ID into it's hello messages |
| 2    | Database Description  | DBD/DDP    | A LSA that contains LSA headers, "I have these LSAs" |
| 3    | LS Request            | LSR        | Requesting a specific LSA                            |
| 4    | LS Update             | LSU        | Send a specific LSA                                  |
| 5    | LS Acknowledgment     | LSAck      | Acknowledging a specific LSA                         |

## LSA types

| Type   | Route  | RFC Name              | Purpose                      | Description                                              |
|--------|--------|-----------------------|------------------------------|----------------------------------------------------------|
| 0x2001 | O      | Router-LSA            | interfaces/links on a router | Flooded single area; never crosses area boundary         |
| 0x2002 | O      | Network-LSA           | routers on a segment         | Flooded single area; DR-only; omitted if no DR elected   |
| 0x2003 | O IA   | Summary-LSA           | networks in other areas      | ABRs send these to describe routes to networks           |
| 0x2004 | E1, E2 | Summary-LSA           | next-hop to an ASBR          | ABRs send these to provide reachability for ASBRs        |
| 0x4005 | E1, E2 | AS-External-LSA       | routes to E1 or E2 networks  | ASBRs send these to describe routes to an AS             |
| 0x2006 |        |                       |                              |                                                          |
| 0x2007 | N1, N2 | NSSA-LSA              | routes to N1 or N2 networks  | NSSA ASBRs send these; converted to Type 5 at ABR        |
| 0x0008 | —      | Link-LSA              | link-local address + prefix  | Each link creates a link LSA                             |
| 0x2009 | O      | Intra-Area-Prefix-LSA | IPv6 prefixes within an area | Ties prefixes to 0x2001 or 0x2002 LSAs                   |

## Interop

OSPFv3 supports v4 and v6.

Exactly one mode has working interop.

| R1 Configuration        | R2 Configuration        | Adjacency? |
|-------------------------|-------------------------|------------|
| router ospfv3 / IPv6 AF | ipv6 router ospf        | Yes        |
| router ospfv3 / IPv6 AF | router ospf             | No         |
| router ospfv3 / IPv4 AF | router ospf             | No         |
| router ospfv3 / IPv6 AF | router ospfv3 / IPv4 AF | No         |
| router ospfv3 / IPv4 AF | ipv6 router ospf        | No         |
| ipv6 router ospf        | router ospf             | No         |

Courtesy of [BRKIPV-2418].

[BRKIPV-2418]: /pdfs/ciscolive/BRKIPV-2418.pdf

## Config

### Legacy

```console,editable
interface Gi1
  ip address 10.0.0.1 255.255.255.0
  ipv6 address fe80::1 link-local
  ipv6 ospf 1 area 0
!
ipv6 router ospf 1
```

### Address family

```console,editable
interface Gi1
  ip address 10.0.0.2 255.255.255.0
  ipv6 address fe80::2 link-local
  ospfv3 1 ipv6 area 0
!
router ospfv3 1
!
! Address family part
!
address-family ipv6 unicast
```

#### Authentication Trailer

```console,editable
key chain keys
  key 1
    key-string CiscoLive
      cryptographic-algorithm hmac-sha-512
!
interface Gi1
  ospfv3 1 ipv6 authentication key-chain keys
```

## Virtual Links

OSPFv3 IPv4 AFI does not support virtual links.

## References

[Cisco Live - Deploying IPv6 Routing Protocols - Peter Palúch](/pdfs/ciscolive/BRKIPV-2418.pdf)

[RFC 5340: OSPF for IPv6 | RFC Editor](https://www.rfc-editor.org/info/rfc5340/)