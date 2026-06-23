# SD-WAN ZTP

Requirements

- Edge needs DHCP
- Edge gets added to the [PNP portal]
- Manager synced to the [PNP portal]

[PNP Portal]: https://software.cisco.com/software/csws/ws/platform/login?route=module/pnp

> There is an air-gapped version of ZTP available on request.

1. Plug in Ethernet with DHCP.

1. Gets an IP, requests the A record for `ztp.viptela.com` (could also be `ztp.localdomain`)

1. (matches device by serial number based on what was put into the PNP portal earlier)

1. Once the authentication of the vEdge is done, vEdge gets the IP address of vManage and vSmart given by vBond.


1. The vEdge gets authenticated by vManage and gets the System IP address.

1. vManage pushes the predefined configuration to vEdge and vSmart pushes the policy to vEdge.

1. vEdge gets successfully on boarded to the SD-WAN overlay and is ready to exchange omp messages.

1.  Now vEdge establishes IPsec tunnels for the data plane traffic with other vEdges within the overlay.

## References

[RFC 8572 - Secure Zero Touch Provisioning (SZTP)](https://datatracker.ietf.org/doc/html/rfc8572)

[Onboard New vEdge Device by SD-WAN ZTP Process - Cisco](https://www.cisco.com/c/en/us/support/docs/routers/vedge-router/220445-onboard-new-vedge-device-by-sd-wan-ztp-p.html)

[Solutions - Cisco SD-WAN Onboarding Guide - Cisco](https://www.cisco.com/c/en/us/solutions/collateral/enterprise-networks/sd-wan/guide-c07-742221.html)

[Cisco Catalyst SD-WAN Getting Started Guide - Cisco Catalyst SD-WAN Overlay Network Bring-Up Process Cisco SD-WAN - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/cisco-sd-wan-overlay-network-bringup.html#Cisco_Concept.dita_818c0252-a9e5-4884-bf9a-ea70710eeb59)
