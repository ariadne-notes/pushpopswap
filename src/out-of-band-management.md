# Out of Band Management

Management Interfaces Should Never Be Accessible Via The Open Internet.

## Terms

**NMI** --- Network Management Interface

- Dedicated Interface used exclusively for Administrative Access

**In-Band**

- The network for normal and routine traffic

**OOB** --- Out-Of-Band

- Ports not used during normal routine network operation

**OOB Network***

- Dedicated Routers
- Dedicated Switches
- Logically and Physically separated

**NMI Network**

- A OOB network that aggregates NMIs

**Jump Server**

- A special node approved to access in-band equipment

**Zero Trust**

- Assuming the network is already compromised

**Remote Hands**

- An on-site person, who can physically touch the equipment to plug and unplug cables

**VRF** --- Virtual Route Forwarding

- A different routing table, not the global table

**Segmentation**

- Splitting the network into an in-band, and OOB network via VRFs

## In-Band access examples

- Internet
- Company Network

## Out-of-Band examples

- NMI network accessible via VPN only to Network Admins
- NMI Accessible via Jump Server
- NMI Accessible via Remote Hands

## References

[Solutions - Out of band best practices - Cisco](https://www.cisco.com/c/en/us/solutions/collateral/service-provider/out-of-band-best-practices-wp.html)

[BOD 23-02: Mitigating the Risk from Internet-Exposed Management Interfaces | CISA](https://www.cisa.gov/news-events/directives/binding-operational-directive-23-02)

[SC-37: Out-Of-Band Channels - CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r4/sc/sc-37/>)

[Commission Delegated Regulation (EU) 2024/1774 – Article 13 (Network Security Management)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1774)
