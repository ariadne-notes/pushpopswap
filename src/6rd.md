# 6RD

* **6to4:** The base standard, requires a specific prefix.
* **6RD:** The current standard, allows any global prefix.
* **RG:** Router Gateway. The CPE the ISP provides to connect to their network.
* **BNG:** Border Network Gateway. This is the Customer aggregation node, which can aggregate thousands of connections.
* **NMS:** Network monitoring system. Needed for network health
* **AAA:** Authentication, Authorization, Accounting. This is how the ISP controls who can access the network, and controls QoS Deployments.
* **BR:** AKA, Border Relay. This node terminates the 6RD tunnels.

## What does 6RD Solve?

"We can't deploy v6, because our BNG does *<put-feature-here>* and we need that!

This way, the customer gets dual stack without the ISP needing to upgrade a legacy deployment.

<pre>
     Customer's Home   ┌───────── 6RD Tunnel ────────────┐
          v4/v6        │                                 │
┌──────────────────────┼─┐   Legacy Access Network       │
│┌──────────┐          │ │           v4 only             │
││Customer  │          ▼ │┌────────────────────────────┐ ▼
││ Equipment├──┐  ┌────┐ ││┌────────────┐  ┌──────────┐│ ┌────────┐
│└──────────┘  └──┤ISP ├─┼┼┤ Legacy ISP ├──┤Legacy ISP├┼─┤ 6RD    │
│┌──────────┐  ┌──┤ RG │ │││  Switches  │  │ BNG      ││ │  BR    │
││Customer  ├──┘  └────┘ ││└─┬──────────┘  └──────────┘│ └─────┬──┘
││ Equipment│            ││  │  ┌───────┐              │ ┌─────┴──┐
│└──────────┘            ││  ├──┤v4 NMS │              │ │ Core   │
└────────────────────────┘│  │  └───────┘              │ │        │
                          │  │  ┌───────┐              │ └─────┬──┘
                          │  ├──┤v4 AAA │              │ ┌─────┴──┐
                          │  │  └───────┘              │ │Internet│
                          │  │  ┌───────┐              │ │        │
                          │  └──┤v4 DHCP│              │ └────────┘
                          │     └───────┘              │
                          └────────────────────────────┘
</pre>

## The four things Required to setup

* **IPv4 Common Prefix:** - The high order bits every CE has in common for their v4 deployments.

If every customer was given an IP on the 10.0.0.0/24 network, the bits they would have in common is `/24`.

* **6RD Prefix:** The v6 bits for the 6rd domain.
* **6RD PrefixLen:** The length of the prefix for the 6rd domain.
* **6RD BR v4 Address:** The Access Network v4 address for the BR.

(there is a neat way to derive the 6rd prefix, refer to Cisco's IOS-XE manual, that's closest to how it's done.)

## Sample Config (from Cisco's PDF)

```
!
! This BR is reachable via the loopback.
!
interface Loopback0
ip address 10.1.1.1 255.255.255.0
!
interface Tunnel0
 tunnel source Loopback0
 tunnel mode ipv6ip 6rd
 tunnel 6rd ipv4 prefix-len 8
 tunnel 6rd prefix 2011:1001:100:/40
 ipv6 address 2011:1001:101:101::/128 anycast
!
ipv6 route 2011:1001:100::/40 Tunnel0
ipv6 route 2011:1001:101:101::/64 Null0
!
! Simple and Easy to setup!
!
#show tunnel 6rd
Interface Tunnel0:
 Tunnel Source: 10.1.1.1
 6RD: Operational, V6 Prefix: 2011:1001:100:/40
 V4 Prefix, Length: 8, Value: 10.0.0.0
 V4 Suffix, Length: 0, Value: 0.0.0.0
 General Prefix: 2011:1001:1
```



## References

[RFC 3056: Connection of IPv6 Domains via IPv4 Clouds | RFC Editor](https://www.rfc-editor.org/info/rfc3056/)

[RFC 5969: IPv6 Rapid Deployment on IPv4 Infrastructures (6rd) -- Protocol Specification | RFC Editor](https://www.rfc-editor.org/info/rfc5969/)

[APNIC Conference | 6RD Enabling IPv6 Customers on an IPv4-only Network](https://conference.apnic.net/31/pdf/APRICOT-6rd-final.pdf)

[Interface and Hardware Component Configuration Guide, Cisco IOS XE Fuji 16.9.x - IPv6 Rapid Deployment Cisco ASR 1000 Series Aggregation Services Routers - Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/interface/configuration/xe-16-9/ir-xe-16-9-book/ip6-6rd-tunls-xe.html)