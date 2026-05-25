# Out of Band Management

**Management interfaces should never be accessible via the Open Internet.**

## Terms

- **NMI:** Network Management Interface. Dedicated Interface used exclusively for Administrative Access.
- **In-Band:** The network for normal and routine traffic.
- **OOB:** Out-of-Band. A secondary network, not the routine path.
- **NMI Network:** A OOB network that aggregates NMIs.
- **Jump Server:** A special node approved to access in-band equipment.
- **Zero Trust:** Assuming the network is alredy compromised.
- **Remote Hands:** An on-site person, who can physicallly touch the equipment to plug and unplug cables.
- **VRF:** Virtual Route Forwarding. A different routing table, not the global table.
- **Segmentation:** Splitting the network into an in-band, and OOB network via VRFs.

## In-Band Access Examples

- Internet
- Company Network

## Out-of-Band Examples

- NMI network accessible via VPN only to Network Admins.
- NMI Accessible via Jump Server.
- NMI Accessible via Remote Hands.



## References

[BOD 23-02: Mitigating the Risk from Internet-Exposed Management Interfaces | CISA](https://www.cisa.gov/news-events/directives/binding-operational-directive-23-02)

[SC-37: Out-Of-Band Channels - CSF Tools](<https://csf.tools/reference/nist-sp-800-53/r4/sc/sc-37/>)

[Commission Delegated Regulation (EU) 2024/1774 – Article 13 (Network Security Management)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1774)
