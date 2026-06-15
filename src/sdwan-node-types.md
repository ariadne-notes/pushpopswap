# SD-WAN Node Types

## Manager

- What a human interacts with, the GUI
- AKA vManage
- AKA, the NMS

## Validator

- Initial Authentication and provisioning, (Cisco calls this orchestration) 
- Responsible for NAT traversal
- AKA vBond

Should be give a FQDN, so WAN edges have no problems finding it on connection to a DIA.

FQDNs also mean we aren't putting a static IP into a config.

Initial authentication is done with PKI, and RSA encryption.

Can not be placed behind NAT, unless the NAT device does a 1:1 static translation.

This device does the load balancing if multiple controllers are being used.

The Validator has a permanent dTLS tunnel to all the controllers.

## Controller

- AKA vSmart
- Holds the current state of the network, (routes and data policy) maintains active connections to the edges and programs them.
  - dTLS connections
    - OMP and NETCONF
- Keeps all the routes between sites, that are managed via the OMP protocol (like BGP, but proprietary)
- Logical tunnel topologies (such as hub and spoke, regional, and partial mesh)
- Service Chaining
- Traffic Engineering
- Segmentation per VPN

## WAN Edge

- AKA vEdge, AKA Viptela (legacy gear)
- Dataplane, and Onsite
  - DIA, or MPLS.
- Has OMP, BGP, OSPF, EIGRP, ACLs, ARP, HA, and QoS
- Connects via dTLS to the controllers
- Connects via dTLS to other edges