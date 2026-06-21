# DMVPN

DMVPN has a lot of benefits:

- One GRE interface
- (optional) One IPSec Profile for all spoke routers
  - IPsec transport
  - Automatic and Dynamic IPSec initiation
- Remote spokes can by dynamically addressed
- Remote spokes can be behind NAT
  - Hub can be behind static NAT
- Supports Dynamic spoke-to-spoke with phases 2 and 3
- QoS
- Dynamic Routing
- OKish Multicast
  - IOS-XE Supports PIM-SM

## Terms

**DMVPN** --- Dynamic Multipoint VPN

**Underlay**

- Sometimes dynamically addressed
- AKA NBMBA
- AKA The ISP Network

**Overlay**

- Usually one /24
- Used on the mGRE tunnel interfaces

## Caveats

> [!WARNING]
>

> OSPF `point-to-multipoint` needs the following config

```text,editable
distribute-list prefix-list PL_BLOCK_OSPF_32 out   
  ip prefix-list PL_BLOCK_OSPF_32 deny <tunnel-subnet> <mask> ge 32 
  ip prefix-list PL_BLOCK_OSPF_32 permit any le 32
```

[This is why.](./ospfv2-p2mp.md)

[This is a Cisco documented failing](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-multicast/b-ip-multicast/m_sec-conn-dmvpn-dmvpn-0.html#restrictions_dmvpn)

## Phase 1

- GRE
- Only hub-to-spoke

```
       ┌─────────┐
       │  hub 1  │
       └┬──────┬─┘
     ┌──┘      └──┐
┌────┴────┐   ┌───┴─────┐
│ spoke 1 │   │ spoke 2 │
└─────────┘   └─────────┘
```

## Phase 2


- mGRE
- Spoke-to-spoke
- Supports Hierarchical Tree Topology, multiple hubs

```
                           ┌─────────┐
                           │  hub 2  │
                           └─┬─────┬─┘
              ┌──────────────┘     └────────────────┐
       ┌──────┴──┐     ┌───────────────────┐     ┌──┴──────┐
       │  hub 1  │     │     Phase 2       │     │  hub 3  │
       └┬──────┬─┘     │                   │     └─┬──────┬┘
     ┌──┘      └─────┐ ▼                   ▼  ┌────┘      └──┐
┌────┴────┐   ┌──────┴──┐               ┌─────┴───┐    ┌─────┴───┐
│ spoke 1 │   │ spoke 2 │               │ spoke 3 │    │ spoke 4 │
└─────────┘   └─────────┘               └─────────┘    └─────────┘
```

## Phase 3


- NHRP Path Summarization
- NHRP Shortcuts
- NHRP Redirects
- Hierarchical Tree Topology, multiple hubs, with redirects and shortcuts.

```
                           ┌─────────┐
                           │  hub 2  │
                           └─┬─────┬─┘
              ┌──────────────┘     └────────────────┐
       ┌──────┴──┐                               ┌──┴──────┐
       │  hub 1  │                               │  hub 3  │
       └┬──────┬─┘                               └─┬──────┬┘
     ┌──┘      └─────┐                        ┌────┘      └──┐
┌────┴────┐   ┌──────┴──┐    Phase 3    ┌─────┴───┐    ┌─────┴───┐
│ spoke 1 │   │ spoke 2 │ ◄───────────► │ spoke 3 │    │ spoke 4 │
└─────────┘   └─────────┘               └─────────┘    └─────────┘
```

## Config


### Hub

```text,editable
interface Tunnel1
 ip address 192.168.100.1 255.255.255.0
 ip nhrp network-id 111
 ip nhrp redirect
 !
 ! This is the NBMA address.
 !
 tunnel source 10.0.110.1
 tunnel mode gre multipoint
```

### Spoke

```text,editable
interface Tunnel1
 ip address 192.168.100.2 255.255.255.0
 no ip redirects
 !
 ! Logical address, then NBMA address
 !
 ip nhrp shortcut
 ip nhrp map 192.168.100.1 10.0.110.1
 ip nhrp map multicast 10.0.110.1
 ip nhrp network-id 111
 ip nhrp nhs 192.168.100.1
 tunnel source 10.0.120.2
 tunnel mode gre multipoint
```

## References

[Cisco Live - BRKSEC-4054 - Advanced Concepts of DMVPN - Mike Sullenberger DSE](./pdfs/ciscolive/BRKSEC-4054.pdf)

[Cisco - Technote - Configure BGP over DMVPN Phase 3](https://www.cisco.com/c/en/us/support/docs/security/dynamic-multipoint-vpn-dmvpn/222585-configure-bgp-over-dmvpn-phase-3.html)

[Cisco - Datasheet - Dynamic Multipoint VPN: Simple and Secure Branch-to-Branch Communications](https://www.cisco.com/c/en/us/products/collateral/security/dynamic-multipoint-vpn-dmvpn/data_sheet_c78-468520.html)

[Cisco - Concepts & Configuration - DMVPN](https://learningnetwork.cisco.com/s/article/dmvpn-concepts-amp-configuration)

[Cisco - Security and VPN Configuration Guide, Dynamic Multipoint VPN - IOS-XE 17](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-conn-dmvpn-dmvpn-0.html#examples_dmvpn)

[Cisco - IP Multicast Configuration Guide, Dynamic Multipoint VPN - IOS-XE 17](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-multicast/b-ip-multicast/m_sec-conn-dmvpn-dmvpn-0.html)

[Wikipedia - Dynamic Multipoint Virtual Private Network](https://en.wikipedia.org/wiki/Dynamic_Multipoint_Virtual_Private_Network)

[Send The Payload - Just A Bunch of DMVPN Configuration Examples](https://sendthepayload.com/just-a-bunch-of-dmvpn-configuration-examples/)

[Yasser Auda - CCIEv5 DMVPN Lab Workbook](https://learningnetwork.cisco.com/s/article/cciev5-dmvpn-labs-workbook)

[This Bridge is the Root - DMVPN Deep Dive – NHRP, mGRE, Routing Scenarios and IPsec](https://thisbridgeistheroot.com/blog/dmvpn-deep-dive-nhrp-mgre-routing-scenarios)

B. Edgeworth and R. Lacoste, *CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide*, 2nd ed. Indianapolis, IN: Cisco Press, 2023.
