# OMP

- **OMP routes:** AKA, vRoutes, AKA Site prefixes. `10.0.0.0/24`.

- **TLOC:** A tunnel endpoint. A tunnel endpoint is a 3-tuple (System IP, Color, Encapsulation)

- **Full Mesh:** Each TLOC will attempt a full-mesh connection with every other TLOC.

n*(n-1)/2


- Service routes: Firewalls, IPS, and VPN labels.

## TLOC Route Attributes

- Private Address
- Public Address (the NAT translated address)
- Carrier (public or private)
- Color
- Encapsulation of tunnel (GRE or IPSec)
- Preference (to choose between TLOCs)
- Site ID (which site owns the TLOC)
- Tag
- Weight (higher is better)

## OMP Route Attributes

OMP routes require OMP peering.

All OMP routes have TLOC associated.

```console
show sdwan omp peers
```

These require a TLOC.

- TLOC
  -System IP of the speaker who Originates the route
  - Color
  - Encapsulation of Tunnel
- System IP
- Origin
  - BGP
  - OSPF
  - Static
  - Connected
- Originator
- Preference (Higher is more preferred)
- Tag
- VRF 

### OMP Preference

1. Can it resolve?
1. Route Preference (Intra region > core region. Prefer TR-sourced or ECMP.)
1. TLOC Preference.
1. Origin Type (Connected > Static > eBGP > EIGRP Internal > OSPF Intra > OSPF Inter > OSPF External > EIGRP External> iBGP)
1. Origin Metric (lowest)
1. Route Source (prefer route from vEdge, over vSmart)
1. Lowest System IP
1. Highest Private TLOC IP from the same site-id.

## Example Network

- Prefer the biz-internet connections.

![sd-wan-route-types](./images/diagrams/sd-wan-route-types.drawio.svg)

### TLOC

| TLOC (System IP) | Color        | Encap | Site ID | Preference | Originator |
|------------------|--------------|-------|---------|------------|------------|
| 10.0.0.1         | mpls         | GRE   | 100     | 0          | 10.0.0.1   |
| 10.0.0.1         | biz-internet | IPsec | 100     | 100        | 10.0.0.1   |
| 10.0.0.2         | mpls         | GRE   | 100     | 0          | 10.0.0.2   |
| 10.0.0.2         | biz-internet | IPsec | 100     | 100        | 10.0.0.2   |
| 10.0.0.10        | mpls         | GRE   | 200     | 0          | 10.0.0.10  |
| 10.0.0.10        | biz-internet | IPsec | 200     | 100        | 10.0.0.10  |
| 10.0.0.11        | mpls         | GRE   | 200     | 0          | 10.0.0.11  |
| 10.0.0.11        | biz-internet | IPsec | 200     | 100        | 10.0.0.11  |

### OMP Routes

| VPN | Prefix         | Originator | TLOC (System IP, Color, Encap)   | Origin    | Metric | Site ID |
|-----|----------------|------------|----------------------------------|-----------|--------|---------|
| 1   | 172.16.0.0/16  | 10.0.0.1   | 10.0.0.1,  mpls, GRE             | connected | 0      | 100     |
| 1   | 172.16.0.0/16  | 10.0.0.1   | 10.0.0.1,  biz-internet, IPsec   | connected | 0      | 100     |
| 1   | 172.16.0.0/16  | 10.0.0.2   | 10.0.0.2,  mpls, GRE             | connected | 0      | 100     |
| 1   | 172.16.0.0/16  | 10.0.0.2   | 10.0.0.2,  biz-internet, IPsec   | connected | 0      | 100     |
| 1   | 172.17.0.0/16  | 10.0.0.10  | 10.0.0.10, mpls, GRE             | connected | 0      | 200     |
| 1   | 172.17.0.0/16  | 10.0.0.10  | 10.0.0.10, biz-internet, IPsec   | connected | 0      | 200     |
| 1   | 172.17.0.0/16  | 10.0.0.11  | 10.0.0.11, mpls, GRE             | connected | 0      | 200     |
| 1   | 172.17.0.0/16  | 10.0.0.11  | 10.0.0.11, biz-internet, IPsec   | connected | 0      | 200     |

## References

[LAB 1 - Hub-and-Spoke - Restricting spoke-to-spoke tunnels | NetworkAcademy.IO](https://www.networkacademy.io/ccie-enterprise/sdwan/lab1-restricting-spoke-to-spoke-tunnels)

[OMP route advertisements | Overlay Management Protocol | Routing Configuration Guide, Cisco IOS XE Catalyst SD-WAN Release 17.x - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/routing/ios-xe-17/routing-configuration-guide-17-x/OMP-routing-protocol-ref/omp-route-advertisements.html)

[Advanced SD-WAN Troubleshooting - Cisco Live](https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2023/pdf/BRKTRS-3793.pdf)

