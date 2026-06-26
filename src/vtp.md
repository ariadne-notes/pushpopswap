# VTP

> [!CAUTION]
>
> VTP Melts Networks.
>
> See [VTP Bomb].

[VTP Bomb]: ./vtp/bomb.md

**VTP** --- Vlan Trunk Protocol

- Cisco proprietary
- Runs on trunk ports
- Comes in three versions
  - Defaults to v1

## Design guidance

`transparent` or `off`.

See [BRKENS-2031].

[BRKENS-2031]: ./pdfs/ciscolive/BRKENS-2031.pdf

## Modes

**Server**

- Create, Modify, Delete
- Default
- Other Servers can modify based on Revision

**Client**

- Gets VLANs from a server

**Transparent**

- Don't program the control plane of this device with any recieved VTP packets
- Forward any received VTP packets recieved to other trunk links
- A version 2 thing

**Off**

- Don't program the control plane
- Do not forward VTP

## Version 3

- Saves VLANS to `vlan.dat`
- Primary and secondary servers
  - Default is secondary
- Private VLANs
- Extended VLANs
  - 1006 to 4094
- Propigating MST info

## References

[VLANs VTP - Cisco](https://www.cisco.com/c/en/us/tech/lan-switching/virtual-lans-vlan-trunking-protocol-vlans-vtp/index.html)

[Understand VTP - Cisco](https://www.cisco.com/c/en/us/support/docs/lan-switching/vtp/10558-21.html)

[Configure VTP - Cisco](https://www.cisco.com/c/en/us/support/docs/lan-switching/vtp/98154-conf-vlan.html)

[Configure VTP - VLAN Configuration Guide - IOS XE 17.18.x - Cisco](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-18/configuration_guide/vlan/b_1718_vlan_9300_cg/configuring_vtp.html)

[Cisco Live - Enterprise Campus Design - Marcin Hamróz, and Jarosław Gawron - BRKENS-2031](./pdfs/ciscolive/BRKENS-2031.pdf)
