* Packet-in-packet technology
* Mostly historical
* Used within one site, **not** an Internet Tech.
* "v6 islands within a v4 ocean"
* Treats the v4 network as NBMA.
* ISATAP devices must be dual stacked.
* Adds 20-bytes of overhead.
* Works as long as v4 routing works.
* Stateless.

# Theory 

Use v4 connectivity to emulate a NBMA network. Wrap the v6 packet inside v4.


# One possible design, the routers perform ISATAP
<pre>
         ┌─ v6 only ─┐         ┌────────────  v4 only ───────────────┐         ┌─ v6 only ─┐         
         ▼           ▼         ▼                                     ▼         ▼           ▼         
┌────────┐           ┌─────────┐            ┌─────────┐              ┌─────────┐           ┌────────┐
│client-1│           │    R1   │            │   R2    │              │    R3   │           │client-2│
│   v6   ├───────────┤  v4/v6  ├────────────┤    v4   ├──────────────│  v4/v6  ├───────────┤   v6   │
└────────┘           └─────────┘            └─────────┘              └─────────┘           └────────┘
                             ISATAP                              ISATAP                              
                              Interface                           Interface                          
                           ┌───────────┬───────────┐                                                 
                           │ v6-packet │ v4-header │ ───────►                                        
                           └───────────┴───────────┘                                                 
</pre>

# Another possible design, the clients perform ISATAP
<pre>                                                                                                  
           ┌──────────────────────────────────  v4 only  ───────────────────────────────────┐          
           ▼                                                                                ▼          
  ┌────────┐           ┌─────────┐            ┌─────────┐              ┌─────────┐          ┌────────┐ 
  │client-1│           │   R1    │            │   R2    │              │   R3    │          │client-2│ 
  │ v4/v6  ├───────────┤    v4   ├────────────┤    v4   ├──────────────┤    v4   │──────────┤  v4/v6 │ 
  └────────┘           └─────────┘            └─────────┘              └─────────┘          └────────┘ 
        ISATAP                                                                        ISATAP           
         Interface                                                                     Interface       
        ┌───────────┬───────────┐                                                                      
        │ v6-packet │ v4-header │ ────────►                                                  
        └───────────┴───────────┘                                                                      
</pre>                                                                                                 

# ISATAP Interface in v6

All ISATAP interfaces look like this. The giveaway is `0000:5EFE` in the host portion.

If a router sees a v6 destination that looks like this, it's an ISATAP packet.

<pre>
                    64 bits                              32 bits                   32 bits          
┌───────────────────────────────────────────────┬───────────────────────────┬──────────────────────┐
│  Global Unicast Prefix                        │        0000:5EFE          │  IPv4 of ISATAP Link │
└───────────────────────────────────────────────┴───────────────────────────┴──────────────────────┘
</pre>

# Terms
* **PRL:** Potential Router List. Routers that could perform ISATAP.
* **ISATAP Interface:** The dual-stack interface, with the above v6 IP on it.
* **ISATAP v4 Address:** The NBMA address. How to reach this device via ISATAP
* **ISATAP v6 Address:** The end-to-end v6 address, it **must** embed the v4 address.

# References
[ISATAP - Wikipedia](<https://en.wikipedia.org/wiki/ISATAP>)

[RFC 5214: Intra-Site Automatic Tunnel Addressing Protocol (ISATAP)](https://www.rfc-editor.org/rfc/rfc5214)

[ISATAP.org - Wayback Machine](https://web.archive.org/web/20200730191027/http://www.isatap.org/)

[IP Routing Configuration Guide - ISATAP Tunnel Support for IPv6 Support - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_ip6-isatap-xe.html)