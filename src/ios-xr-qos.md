# XR QoS Commands

## Display all service-policies configured in a direction

```
show running interface * service-policy input
show running interface * service-policy output
```

## Display QoS Statistics
```
show policy-map interface <int> input
show policy-map interface <int> output
```

## Display details of a service-policy programmed in hardware

```
show qos interface <int> input
show qos interface <int> output
```

## Display the interfaces a policy-map is attached to

```
show policy-map targets [pmap-name <name>] [location <loc>]
```

## Shape outgoing to 100Mbps and police incoming to 100Mbps

```console,editable
interface GigabitEthernet0/0/0/0.100 l2transport
 service-policy input incoming-limit-to-100Mb
 service-policy output outgoing-limit-to-100Mb
!
policy-map incoming-limit-to-100Mb
 class class-default
  police rate 100 mbps
   exceed-action drop
  !
!
end-policy-map
!
policy-map outgoing-limit-to-100Mb
 class class-default
  shape average 100 mbps
 !
end-policy-map
```

## Verification
```
show policy-map interface g0/0/0/0.100 input
show policy-map interface g0/0/0/0.100 output
```

## References

[Modular QoS Configuration Guide for Cisco ASR 9000 Series Routers, IOS XR Release 7.9.x - Configuring Hierarchical Modular QoS Cisco ASR 9000 Series Aggregation Services Routers - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/asr9000/software/asr9k-r7-9/qos/b-qos-cg-asr9k-79x/config-hierarchical-mod-qos.html)
