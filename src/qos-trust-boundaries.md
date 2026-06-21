# QoS Trust Boundaries

- CoS is 3 bits, or 7 values
- DSCP is 6 bits, or 64 values

## Config

**Trust if its a phone**

```console,editable
!
! if a phone detected with CDP
!    then trust dscp
!
mls qos trust device cisco-phone
mls qos trust dscp
```

**Absolute Trust**

```console
mls qos trust dscp
```

## DSCP transparency

Is **off** by default.

This means the CoS bits take priority and re-write the DSCP portion of the L3 header.

To turn this feature on, (to let DSCP move transparently through the switches) use `no mls qos rewrite ip dscp`


## IOS-XE C9300 trust and queuing behavior

An example for one platform to demonstrate how complex QoS trust can become.

[IOS-XE C9300 Trust and Queuing Behavior]: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/qos/b_26x_qos_9300_cg/configuring_qos.html#trust_behavior_for_wired_ports

| Incoming Packet | Outgoing Packet | Trust Behavior                 | Queuing Behavior                            |
|-----------------|-----------------|--------------------------------|---------------------------------------------|
| Layer 3         | Layer 3         | Preserve DSCP/Precedence       | Based on DSCP                               |
| Layer 2         | Layer 2         | Not applicable                 | Based on CoS                                |
| Tagged          | Tagged          | Preserve DSCP and CoS          | Based on DSCP (trust DSCP takes precedence) |
| Layer 3         | Tagged          | Preserve DSCP, CoS is set to 0 | Based on DSCP                               |


## Maps

**[Default CoS-to-DSCP Map]**

[Default CoS-to-DSCP Map]: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/qos/b_26x_qos_9300_cg/configuring_qos.html#default_cos-to-dscp_map

| CoS Value | DSCP Value |
|-----------|------------|
|         0 |          0 |
|         1 |          8 |
|         2 |         16 |
|         3 |         24 |
|         4 |         32 |
|         5 |         40 |
|         6 |         48 |
|         7 |         56 |

**[Default DSCP-to-CoS Map]**

[Default DSCP-to-CoS Map]: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/qos/b_26x_qos_9300_cg/configuring_qos.html#default_dscp-to-cos_map

| DSCP Value | CoS Value |
|------------|----------:|
| 0–7        |         0 |
| 8–15       |         1 |
| 16–23      |         2 |
| 24–31      |         3 |
| 32–39      |         4 |
| 40–47      |         5 |
| 48–55      |         6 |
| 56–63      |         7 |

# References

[Cisco - QoS Configuration Guide, Cisco IOS-XE - 26.x.x - C9300](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/qos/b_26x_qos_9300_cg/configuring_qos.html)
