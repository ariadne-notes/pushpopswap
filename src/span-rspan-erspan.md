# SPAN, RSPAN, ERSPAN

## Local

```console,editable
monitor session 1 source interface GigabitEthernet1/0/1 both
monitor session 1 destination interface GigabitEthernet1/0/2
```
## RSPAN

- VLAN Encapsulated
- Does not support layer 2 protocols
  - No CDP, BPDUs, LLDP, etc
- If the source is a trunk port, you can use the `filter` keyword to select specific vlans

**Source switch**

```console,editable
vlan 3000
 remote-span
monitor session 1 source interface GigabitEthernet1/0/1 both
monitor session 1 destination remote vlan 3000
```

**Destination switch**

```console,editable
vlan 3000
 remote-span
monitor session 1 source remote vlan 3000
monitor session 1 destination interface GigabitEthernet1/0/2
```

## ERSPAN


GRE Encapsulated.

These will encapsulate BPDUs and other Layer 2 protocols.

These need `ip routing` turned on.

These do not support QoS.


**Source switch**

```console,editable
monitor session 1 type erspan-source
 !
 ! Could also put a vlan here
 !
 source interface Gi2
 destination
  erspan-id 100
  ip address 10.0.12.2
  origin ip address 10.0.12.1
 no shutdown
```

**Destination switch**

```console,editable
monitor session 1 type erspan-destination
 destination interface Gi2
 source
  erspan-id 100
  !
  ! An outside address on this box, not a loopback.
  ! this is the de-encapsulation interface.
  !
  ip address 10.0.12.2
 no shutdown
```

## References

[Cisco - Configuring SPAN and RSPAN](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-12/configuration_guide/nmgmt/b_1712_nmgmt_9300_cg/configuring_span_and_rspan.html)

[Cisco - Configuring ERSPAN](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-12/configuration_guide/nmgmt/b_1712_nmgmt_9300_cg/configuring_erspan.html)

[Cisco - ERSPAN Restrictions (IOS XR)](https://www.cisco.com/c/en/us/td/docs/iosxr/cisco8000/traffic-mirroring/b-traffic-mirroring-configuration-guide-cisco8k/erspan-overview/restrictions-for-erspan.html)
