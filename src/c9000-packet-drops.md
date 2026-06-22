# C9000 Packet Drops

## Terms

**PHY** --- Physical

- Converts external signals on the wire into signals inside the transceiver.

**FE** --- Forwarding Engine

**IFC** --- Ingress Forwarding Controller

**EFC** --- Egress Forwarding Controller

## Forwarding Types

1. Single FE, pg34
2. Intra-FE, pg36
3. Intra-FE different stack members, pg43
4. Recirculation within FE (VXLAN, SDA, EVN)
5. IOSd control plane forwarding, pg 70
6. Mgmt Port, pg. 83
7. App Hosting, pg. 84

## Forwarding Drops

### EPDA - Enhanced packet drop analyzer

S1 ASIC platforms.

EPDA instructions are inside [BRKARC-3090].

[BRKARC-3090]: ./pdfs/ciscolive/BRKARC-3090.pdf

```console,editable
!
! identify traffic by delta
!   run this a few times
!
!
show platform hardware fed active fwd-asic traps npu-traps asic all
!
! Pick the NPU trap you are interested in
!
debug platform software fed active drop-capture set-trap npu-traps l3 l3-null-adj
!
! Start it
!
debug platform software fed active drop-capture start
!
! Stop it
!
debug platform software fed active drop-capture stop
!
! Display Packets
!
show platform software fed active drop packet-capture brief
!
! Clear the trap when done
!
debug platform software fed active drop-capture clear-trap npu-traps l3 l3-null-adj
```

### ASIC drop counters (NPU/TM/IFG)

```console,editable
!
! See all drops, but doesn't really provide context
!
show platform hardware fed active fwd-asic drops asic
show platform hardware fed active fwd-asic drops ifg
show platform hardware fed active fwd-asic drops npu
show platform hardware fed active fwd-asic drops tm
```

### ASIC ALL Counters

```console,editable
!
! A last resort, just raw data
!
show platform hardware fed active fwd-asic counters 0 counters_all
```

## References

[Cisco Live - C9000 - Packet Journey - Ivan Shirshin & Nathan Pan - BRKARC-3090](./pdfs/ciscolive/BRKARC-3090.pdf)

[Cisco Live - C9000 - Troubleshooting - Michel Peters - BRKTRS-3090](./pdfs/ciscolive/BRKTRS-3090.pdf)
