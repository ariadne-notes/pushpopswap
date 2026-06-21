# SDWAN

## Terms

**DIA** --- Direct Internet Access

- Commodity Internet

**MPLS** --- Multi-protocol Label Switching

- A private network provided by an ISP.
- Expensive and fast.

**[BFD]** --- Bidirectional Forwarding Detection

[BFD]: bfd.md

## SD-WAN policy

Policies are further classified as

- **Local Policy:** Programed on the edges. ACLs, QoS, routing, and AAA.
- **Centralized Policy:** Route policy, before being sent to the edges, (Topology, VPN Membership, Application Aware Routing)

## Application aware routing

**AAR** --- Application Aware Routing

**FEC** --- Forward Error Correction

- Every four packets, send a parity packet

**Packet Duplication**


- Send twice as much data via two tunnels
- The receiving vEdge router can reconstruct it

**TCP Optimization and Session Persistence**

- High-latency links: satellite
- Open one TCP session
  - Proxy
  - Reuse
  - Never drop

**DRE** --- Data Redundancy Elimination

- Modern compression
- WAN links

**vQoE** --- Viptela Quality of Experience

- AAR, or CoR
- Edge sends HTTP probes to measure jitter and/or loss
- 0 to 10, 10 being best

## VPNs

VPNs go from 0 to 65530.

Some VPNS are already used.

**VPN 0**

The Underlay, transport VPN. All the dTLS connections live here.

**VPN 512**

OOB Management. This VPN isn't carried across the dTLS connections.

## SDWAN analytics

- Application Experience
  - Application Use

- Site Health
  - Tunnel Health

- Bandwidth Forecasting
  - Capacity Planning
  
- Talos Integration
  - Threat Mitigation

## Default permissions groups

**Basic**

Can view the system.

**Operator**

Can view the system.

**Netadmin**

Can perform all operations

## Commands

```text,editable
!
! Control Setup
!
show sdwan control local-properties
show sdwan control connections
show sdwan control connection-history
!
! OMP
!
show sdwan omp peers
show sdwan omp routes
show sdwan omp tlocs
show sdwan omp services
show sdwan omp summary
show sdwan omp multicast-routes
!
! Validator
!
show orchestrator connections
```

## References

[Cisco Live - Empowering your Network with SDWAN OMP - Waqas Daar - BKRENT-3115](./pdfs/ciscolive/BRKENT-3115.pdf)

[Cisco Live - SD-WAN Start Here - Lars Granberg - BRKENT-2108](./pdfs/ciscolive/BRKENT-2108.pdf)

[Network Academy - SDWAN Deep-Dive](https://www.networkacademy.io/ccie-enterprise/sdwan)

[Cisco Community - Cisco SDWAN Webinar](https://community.cisco.com/t5/networking-knowledge-base/cisco-sd-wan-webinar-series/ta-p/5114270)

[Cisco - Design Zone for Branch/WAN - SDWAN Design Guide](<https://www.cisco.com/c/en/us/td/docs/solutions/CVD/SDWAN/cisco-sdwan-design-guide.html>)

[Cisco - SDWAN User Documentation](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/config/ios-xe-sdwan17.html)

[Cisco - SDWAN High Availability Configuration Guide, IOS-XE 17](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/ha-scaling/ios-xe-17/high-availability-book-xe/m-high-availability-and-scaling.html)

[Cisco - Youtube - SD-WAN: Multicloud Overview and Demonstration](https://www.youtube.com/watch?v=7tLJPFHhIeo)
