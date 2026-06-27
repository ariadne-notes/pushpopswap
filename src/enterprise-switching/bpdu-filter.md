# BPDU Filter

Maybe you don't want a port to send BPDUs. This effectively turns off spanning-tree.

> [!WARNING]
> This feature melts networks. It disables spanning tree.

> [!CAUTION]
> This is not deterministic. It works differently per port, vs globally.

From the IOS-XE [config guide]

> The BPDU filtering feature can be globally enabled on the switch or can be enabled per interface, but the feature operates with some differences.
>
> Enabling BPDU filtering on PortFast enabled interfaces at the global level keeps those interfaces that are in a PortFast operational state from sending or receiving BPDUs.

>

> The interfaces still send a few BPDUs at link-up before the switch begins to filter outbound BPDUs. You should globally enable BPDU filtering on a switch so that hosts that are connected to these interfaces do not receive BPDUs. If a BPDU is received on a PortFast enabled interface, the interface loses its PortFast operational status, and BPDU filtering is disabled.
>
> Enabling BPDU filtering on an interface without also enabling the PortFast feature keeps the interface from sending or receiving BPDUs.

[config guide]: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/lyr2/b_26x_lyr2_9300_cg/configuring_optional_spanning_tree_features.html

## Globally

If a port, is running portfast, this feature will transmit a few BPDUs when the port first turns on.

```console
spanning-tree portfast bpdufilter default
```

## Per interface

This port will never send BPDUs.

```console
interface 1
  spanning-tree bpdufilter enable
```

## References

[Layer 2 Configuration Guide, Cisco IOS XE 26.x.x (Catalyst 9300 Switches) - Configuring Optional Spanning-Tree Features Cisco IOS XE 26 - Cisco](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/lyr2/b_26x_lyr2_9300_cg/configuring_optional_spanning_tree_features.html)
