# DMVPN

- GRE
- Only hub-to-spoke

<pre>
       ┌─────────┐
       │  Hub-1  │
       └┬──────┬─┘
     ┌──┘      └─────┐
┌────┴────┐   ┌──────┴──┐
│ spoke-1 │   │ spoke-2 │
└─────────┘   └─────────┘
</pre>

## Phase 2


- mGRE
- Spoke-to-spoke
- Supports Hierarchical Tree Topology, multiple hubs

<pre>
                           ┌─────────┐
                           │  hub-2  │
                           └─┬─────┬─┘
              ┌──────────────┘     └────────────────┐
       ┌──────┴──┐     ┌───────────────────┐     ┌──┴──────┐
       │  hub-1  │     │     Phase 2       │     │  hub-3  │
       └┬──────┬─┘     │                   │     └─┬──────┬┘
     ┌──┘      └─────┐ ▼                   ▼  ┌────┘      └──┐
┌────┴────┐   ┌──────┴──┐               ┌─────┴───┐    ┌─────┴───┐
│ spoke-1 │   │ spoke-2 │               │ spoke-3 │    │ spoke-4 │
└─────────┘   └─────────┘               └─────────┘    └─────────┘
</pre>

## Phase 3


- NHRP Path Summarization
- NHRP Shortcuts
- NHRP Redirects
- Hierarchical Tree Topology, multiple hubs, with redirects and shortcuts.

<pre>
                           ┌─────────┐
                           │  hub-2  │
                           └─┬─────┬─┘
              ┌──────────────┘     └────────────────┐
       ┌──────┴──┐                               ┌──┴──────┐
       │  hub-1  │                               │  hub-3  │
       └┬──────┬─┘                               └─┬──────┬┘
     ┌──┘      └─────┐                        ┌────┘      └──┐
┌────┴────┐   ┌──────┴──┐    Phase 3    ┌─────┴───┐    ┌─────┴───┐
│ spoke-1 │   │ spoke-2 │ ◄───────────► │ spoke-3 │    │ spoke-4 │
└─────────┘   └─────────┘               └─────────┘    └─────────┘
</pre>

## Config


### Hub

<pre>
interface Tunnel1
 ip address 192.168.100.1 255.255.255.0
 ip nhrp network-id 111
 ip nhrp redirect
 !
 ! This is the NBMA address.
 !
 tunnel source 10.0.110.1
 tunnel mode gre multipoint
</pre>

### Spoke

<pre>
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
</pre>


## References

[Dynamic Multipoint Virtual Private Network](https://en.wikipedia.org/wiki/Dynamic_Multipoint_Virtual_Private_Network)

[DMVPN - Concepts & Configuration](https://learningnetwork.cisco.com/s/article/dmvpn-concepts-amp-configuration)

B. Edgeworth and R. Lacoste, *CCNP Enterprise Advanced Routing ENARSI 300-410 Official Cert Guide*, 2nd ed. Indianapolis, IN: Cisco Press, 2023.