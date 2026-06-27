# Multicast L3 Addressing

## Bits

- **IPv4** L3 multicast address always start with `1110` or `224.0.0.0/4`

- **IPv6** L3 multicast address always start with `1111 1111` or `ff00::/8`

## L3 Ranges

### IPv4

IPv4 combines scope and purpose in its address ranges.

| Block          | Name / Type                     | Notes                                                  |
| ---------------| ------------------------------- | -------------------------------------------------------|
| `224.0.0.0/4`  | IPv4 Multicast                  | Entire IPv4 multicast space (Class D)                  |
| `224.0.0.0/24` | Local Control                   | Not routed (TTL=1). Used by OSPF, EIGRP, mDNS, etc.    |
| `224.0.1.0/24` | Internetwork Control Block      | Routable (e.g. NTP, some vendor protocols)             |
| `232.0.0.0/8`  | Source-Specific Multicast (SSM) | (S,G) only. No RP. Defined in RFC 4607                 |
| `233.0.0.0/8`  | GLOP Addressing                 | Derived from 16-bit ASN  **deprecated**                |
| `239.0.0.0/8`  | Administratively Scoped         | Private multicast (like RFC1918).  |

[IANA Assignments](https://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml)

### IPv6

IPv6 separates scope cleanly by last nibble in the first hextet.

| Block         | Address Scope       | Description                                                                 |
| --------------| --------------------| --------------------------------------------------------------------------- |
| ff00::/8      | Supernet            | All IPv6 multicast addresses                                                |
| ff01::/16     | Interface-Local     | Stays within a single interface (rarely used in practice)                   |
| ff02::/16     | Link-Local          | Local link only (no routing). Most control protocols live here              |
| ff03::/16     | Realm-Local         | Defined by an admin “realm” (rare / niche usage)                            |
| ff04::/16     | Admin-Local         | Administrative domain (like a small org boundary)                           |
| ff05::/16     | Site-Local          | Site scope (similar intent to IPv4 org-local, but loosely defined)          |
| ff08::/16     | Organization-Local  | Organization-wide scope (closest to 239.0.0.0/8 in spirit)                  |
| ff0e::/16     | Global              | Globally routable multicast                                                 |

## L3 addresses Combines IPv4 and IPv6

### L3

**IL** --- Interface-Local

- Node only
- Not transmitted
  - Never on the wire

**LL** --- Link-Local

- TTL of 1
- Transmitted
  - On the wire

**SL** --- Site-Local

- Routeable
- Not Global Internet

### L2 and L3

- IPv4 is always `01:00:5e`
- IPv6 is always `33:33:00`

| Protocol / Group        | IPv4        | IPv4 L2 MAC       | IPv6 LL   | IPv6 L2 MAC       |
| ----------------------- | ------------| ----------------- | ----------| ----------------- |
| All Nodes               | 224.0.0.1   | 01:00:5e:00:00:01 | ff02::1   | 33:33:00:00:00:01 |
| All Routers             | 224.0.0.2   | 01:00:5e:00:00:02 | ff02::2   | 33:33:00:00:00:02 |
| OSPF All Routers        | 224.0.0.5   | 01:00:5e:00:00:05 | ff02::5   | 33:33:00:00:00:05 |
| OSPF DR/BDR             | 224.0.0.6   | 01:00:5e:00:00:06 | ff02::6   | 33:33:00:00:00:06 |
| RIPv2 / RIPng           | 224.0.0.9   | 01:00:5e:00:00:09 | ff02::9   | 33:33:00:00:00:09 |
| EIGRP                   | 224.0.0.10  | 01:00:5e:00:00:0a | ff02::a   | 33:33:00:00:00:0a |
| MLD                     | -           | -                 | ff02::16  | 33:33:00:00:00:16 |
| VRRP                    | 224.0.0.18  | 01:00:5e:00:00:12 | ff02::12  | 33:33:00:00:00:12 |
| PIM / BSR               | 224.0.0.13  | 01:00:5e:00:00:0d | ff02::d   | 33:33:00:00:00:0d |
| IGMPv3                  | 224.0.0.22  | 01:00:5e:00:00:16 | -         | -                 |
| Cisco Auto-RP Announce  | 224.0.1.39  | 01:00:5e:00:01:27 | -         | -                 |
| Cisco Auto-RP Discovery | 224.0.1.40  | 01:00:5e:00:01:28 | -         | -                 |
| NTP                     | 224.0.1.1   | 01:00:5e:00:01:01 | ff02::101 | 33:33:00:00:01:01 |
| mDNS                    | 224.0.0.251 | 01:00:5e:00:00:fb | ff02::fb  | 33:33:00:00:00:fb |

