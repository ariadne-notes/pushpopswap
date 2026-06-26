# DTP

**DTP** --- Dynamic Trunking Protocol.

DTP is a Cisco proprietary point-to-point protocol, for full-duplex switchlinks.

An older feature intended to automate parts of network setup, you could set one switch to `dynamic desireable` and it will form trunks automatically.

The best practice is to disable this feature on trunks links with `switchport nonegotiate`

DTP is normally every 30 seconds.

## Modes

**switchport mode dynamic auto**

- Send DTP
- Usually *Default*
- Become a trunk if the neighbor is a trunk
- Become a trunk if the neighbor is set to `desireable`

**switchport mode access**

- Probably doesn't[^what] send DTP frames
- If it does, it asks the neighbor to become an access port

**switchport mode trunk**

- Send DTP
- Asks the neighbor to become a trunk port

**switchport mode dynamic desirable**

- Become a trunk only if the neighbor can be convinced to become a trunk
- Works with `trunk`, `desirable` or `auto`

**switchport nonegotiate**

- Disable DTP
- Only works with `access` or `trunk`

## Commands

```console
show dtp
debug dtp packets
```

## Verification

Performed on a C3560CX, running 15.2(7r)E.

No DTP with `switchport mode access`

```console
switch# show dtp interface tenGigabitEthernet 1/0/7 | i Enabled
  Enabled:                                  no
```

[^what]: The IOS-XE guide says "negotiates" but in lab, I don't see DTP frames on these ports. I checked on IOSv, IOL, and a C3560CX running 15.2(7r)E.<br> Consensus online is this turns off DTP.

## References

[Dynamic Trunking Protocol - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_Trunking_Protocol)

[VLAN Configuration Guide, Cisco IOS XE 17.15.x (Catalyst 9500 Switches) - Configuring VLAN Trunks Cisco Catalyst 9500 Series Switches - Cisco](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-15/configuration_guide/vlan/b_1715_vlan_9500_cg/configuring_vlan_trunks.html)

[Solved: Switchport Mode Access question - Cisco Community](https://community.cisco.com/t5/switching/switchport-mode-access-question/td-p/2301352)

