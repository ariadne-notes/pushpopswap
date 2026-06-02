# SD-Access and Wireless Integration

Control plane traffic is CAPWAP inside of VXLAN-GPO. Dataplane traffic can just ride VXLAN-GPO

## Fabric Design

FEW
: Fabric Enabled wireless

The client mac is the EID.

### SD Access Wireless

- CAPWAP the control plane traffic
- VXLAN-GPO the data plane, tunnel it to an edge node.
- APs act as VTEPS.

### Fabric APs

- Go into the AP subnet, in the overlay.
  - Go in the INFRA_VN
- Use CAPWAP for control-plane only.
- Converts wireless data into VXLAN-GPO, encoding the VNI, and SGT.
- Join the WLC in Local mode
- 20ms of latency, max

## Nonfabric Design

- AKA OTT (Over The Top)
- Rides VXLAN, not VXLAN aware.
- Good for existing networks, where the wireless is already working and disruption would be costly.

### CUWN Wireless OTT

- **CUWN:** Cisco Unified Wireless Network

Everything is CAPWAP inside of VXLAN-GPO. Central switching.

### FlexConnect OTT

- CAPWAP Tunnel the control traffic.
- Dump the traffic at the local switch.

### Mixed Mode OTT

- Some APs tunnel all their traffic back with CAPWAP.

## WLC

- Subnet for the WLC goes into the underlay network, via an IGP.


# References

[SD-Access Wireless Design and Deployment Guide - Cisco DNA center 2.1.1](https://www.cisco.com/c/dam/en/us/td/docs/cloud-systems-management/network-automation-and-management/dna-center/deploy-guide/cisco-dna-center-sd-access-wl-dg.pdf)

[Cisco SD-Access Best Practices](https://www.ciscolive.com/c/dam/r/ciscolive/apjc/docs/2025/pdf/BRKENS-2502.pdf)