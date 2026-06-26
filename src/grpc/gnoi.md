# gNOI

**gNOI** --- gRPC Network Operations Interface

Intended for operational use and ran as a client to connect to gNMI equipment.

## Functions

**SYSTEM**
- Ping
- Traceroute
- Time
- SetPackage
- SwitchControlProcessor
- Reboot
- RebootStatus
- CancelReboot
- KillProcess

**FILE**
- Get
- TransferToRemote
- Put
- Stat
- Remove

**FACTORYRESET**
- Start

**HEALTHZ**
- Get
- List
- Acknowledge
- Artifact
- Check

**OS**
- Install
- Activate
- Verify

**LINKQUALIFICATION**
- Create
- Get
- Capabilities
- Delete
- List

## Clients

[gNOIc](https://gnoic.kmrd.dev/)

[gNxI](https://gnxi.srlinux.dev/)

## References

[NANOG 93 - gRPC Services under one roof - Reda Laichi - Nokia](../pdfs/nanog/20250202_Laichi_Grpc_Services_Under_v1.pdf)
