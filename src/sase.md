# SASE

**SASE** --- Secure Access Service Edge

SASE is a network and security architecture coined by Gartner in 2019 research by Neil MacDonald, Lawrence Orans, and Joe Skorupa. It moves the enforcement point away from a few centralized datacenters and toward cloud-delivered points of presence that are closer to users, branches, workloads, and SaaS applications.

In practical terms, SASE combines WAN capabilities, usually [SD-WAN], with cloud-delivered security capabilities, usually grouped as SSE.

[SD-WAN]: /cisco-sdn/sd-wan.md

## The network must become application aware

Traditional enterprise networks were built around large sites that hosted most of the compute. Branches and remote users commonly backhauled traffic to headquarters or a datacenter so centralized firewalls and proxies could inspect it.

That model gets expensive and slow when applications live in SaaS, IaaS, public [cloud], and private datacenters at the same time. A better network can identify applications and steer traffic based on policy, performance, and security requirements.

For example, a branch using Microsoft 365 should not automatically hairpin through a corporate datacenter. If policy allows, that traffic should use the best local path to Microsoft's edge while still receiving the required security controls. SD-WAN helps with the path selection side of that problem.

[cloud]: /cloud.md

Some network drivers are:

**Applications everywhere:** IaaS, SaaS, private cloud, and legacy datacenter applications are all normal.

**Low latency:** SaaS applications feel better when users reach nearby service edges instead of distant central sites.

**Hybrid connectivity:** Broadband, DIA, MPLS, LTE, and 5G can all be part of the WAN underlay.

## Security must be continuous

Authentication, authorization, and accounting are not enough by themselves. Modern access decisions need identity, device posture, application context, location, behavior, and risk signals.

The trust model needs to move toward [zero trust]: grant only the access required, monitor the session, and adjust trust as context changes.

[zero trust]: ./zero-trust.md

Relevant traffic should be inspected according to policy. High-risk files and web content can be analyzed in a sandbox, but TLS inspection, privacy rules, performance, and application compatibility all require explicit design choices.

Some security drivers are:

**Zero-day and n-day exploits:** Attackers can weaponize new and recently patched vulnerabilities quickly.

**Insider threats:** The attacker may already have valid credentials or internal network access.

**Sophisticated malware:** Malware can steal data, encrypt systems, move laterally, and disrupt business operations.

**Shadow IT:** Users can adopt SaaS applications faster than central IT can discover and govern them.

## Terms

**SSE** --- Security Service Edge

Gartner introduced SSE as a narrower market category for the security services inside SASE. SSE generally covers secure access to the web, SaaS applications, and private applications, but it does not include the WAN edge and path selection functions that SD-WAN provides.

Common SSE capabilities include:

- SWG
- ZTNA
- CASB
- FWaaS

**POP** --- Point of presence

A location where a provider has network and compute infrastructure. In SASE, POPs are where traffic can be terminated, inspected, routed, proxied, or handed off to another network.

**DC** --- Datacenter

A place where compute lives. In the classical sense this was a physical building owned or leased by the enterprise. Today it can also mean a cloud provider region or private cloud environment.

**CASB** --- Cloud Access Security Broker

- Sits between users and SaaS applications
- Discovers shadow IT
- Provides SaaS governance
- Supports UEBA
- Supports DLP

**EPP** --- Endpoint Protection Platform

**SWG** --- Secure Web Gateway

- TLS inspection, where policy allows
- URL filtering by category
- Malware scanning
- Phishing detection
- Command-and-control detection
- DLP enforcement

**ZTNA** --- Zero Trust Network Access

ZTNA provides identity-aware, policy-based access to private applications without placing users broadly on the internal network.

## Capabilities

**CARTA** --- Continuous Adaptive Risk and Trust Assessment

- Assigns a trust score to a user or session, then raises or lowers that score based on activity and context

**Firewalling**

- Blocks or allows connections based on policy

**Path resiliency and redundancy**

- Uses multiple connection paths
- Uses multiple ISPs or transport types

**Routing and path selection**

- Chooses between WAN paths
- Chooses between ISPs
- Steers traffic by application, SLA, and policy

**QoS**

- Classifies traffic
- Marks traffic
- Queues traffic
- Polices or shapes traffic

**VPN**

- Provides encryption and authentication for selected flows

**Threat prevention and detection**

- Inspects traffic and content for known and suspected threats

**Geo restrictions**

- Uses IP reputation and geolocation as policy inputs

**Cloud app discovery**

- Identifies which SaaS applications are in use

**UEBA** --- User and Entity Behavior Analytics

- Flags unusual behavior, such as impossible travel or abnormal download volume

**DNS protection**

- Blocks or redirects lookups for malicious or unwanted destinations

**Sensitive data discovery**

- Detects data such as social security numbers, payment card numbers, credentials, or regulated records

**Remote browser isolation**

- Loads risky web pages in an isolated environment and streams the rendered session to the client

**DLP** --- Data Loss Prevention

DLP detects sensitive data and applies an enforcement action.

Examples include:

- File uploads
- Clipboard operations
- Web form submissions
- USB transfers
- Chat messages

**SDP** --- Software Defined Perimeter

- Uses agent or client context
- Checks device posture
- Makes per-session access decisions
- Opens access only to the required application

**WAF** --- Web Application Firewall

**WAAP** --- Web Application and API Protection

WAAP protects public-facing applications and APIs.

Common protections include:

- SQL injection detection
- XSS detection
- Malicious upload detection
- API abuse detection

## Adjacent features

Vendors often include or integrate adjacent features that are not always core SASE services:

- Bandwidth optimization and deduplication
- Caching and CDN integration
- Cost reporting
- Network encryption and decryption services
- Obscuration and privacy services
- SaaS acceleration
- Traffic shaping
- Wi-Fi protection

## Difficulties

**Hardware vendors** may struggle to convert appliance-centric products into cloud-delivered services.

**Firewall vendors** may struggle to provide inline proxies at global scale with acceptable latency.

**POPs** are required because inspection and policy enforcement should be close to the users, devices, workloads, and applications that need them.

**Agents** are common in leading SASE offerings because they provide device posture, identity, and application context that the network alone cannot see.

**Operations** can become difficult when networking teams own SD-WAN and security teams own SSE. SASE design usually needs both teams to share policy, telemetry, incident response, and vendor management.


## References

[The Future of Network Security is in the Cloud](/pdfs/gartner/2019-08-30_the_future_of_network_security_is_in_the_cloud.pdf)

[Gartner: Security Service Edge Reviews and Ratings](https://www.gartner.com/reviews/market/security-service-edge/)

[Gartner: Magic Quadrant for Single-Vendor SASE](https://www.gartner.com/en/documents/5556895)

[Secure access service edge - Wikipedia](https://en.wikipedia.org/wiki/Secure_access_service_edge)

[SSE Components Explained: SWG, ZTNA, and CASB | Zscaler](https://www.zscaler.com/blogs/product-insights/sse-components-explained-swg-ztna-casb-and-how-they-work-together)

[SASE: What is Secure Access Service Edge? | Zscaler](https://www.zscaler.com/resources/security-terms-glossary/what-is-sase)

[Cisco Live - Jaki Hasan and Fay-Ann Lee - Cisco Secure Access: Overview and End-to-end Flow Review - BRKSEC-1708](/pdfs/ciscolive/BRKSEC-1708.pdf)

[Cisco Live - Jonny Noble - The Latest in Cisco Secure Access (SSE) Innovation - BRKSEC-2285](/pdfs/ciscolive/BRKSEC-2285.pdf)

[Cisco Live - Fay-Ann Lee - Cisco SASE: Unifying Networking, Identity, and Security - BRKSEC-2286](/pdfs/ciscolive/BRKSEC-2286.pdf)

[Cisco Live - Bhavik Shah and Sandeep Yadav - From Fish to Shark: 8 Stepping Stones in Cisco Secure Access (Secure Service Edge) Journey - BRKSEC-2482](/pdfs/ciscolive/BRKSEC-2482.pdf)

[Cisco Live - John Rauser - Cisco Secure Access - BRKSEC-2885](/pdfs/ciscolive/BRKSEC-2885.pdf)

[Cisco Live - Vinny Parla - Deep Dive into Cisco's Use of QUIC, MASQUE and OS Native Capabilities to Deliver Frictionless Zero Trust Access - BRKSEC-3027](/pdfs/ciscolive/BRKSEC-3027.pdf)
