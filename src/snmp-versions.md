# SNMP Versions

## SNMPv1

- Cleartext
- Uses a community string for a basic password

**Changing the equipment**

- Set Request

**Getting Outputs**

- Get Request
- GetNext

**Receiving Outputs**

- Get Response
- Trap

## SNMPv2

- Cleartext
- Uses a community string for a basic password

**New Message types**

- Get Bulk (get lots of things)
- Inform Request (acknowledge this bad thing happening)


## SNMPv3

This is the recommended version to make changes via SNMP.

| Security Level | Authentication | Encryption | Credentials Required           |
|----------------|---------------|------------|---------------------------------|
| NoAuthNoPriv   | None          | None       | Username only                   |
| AuthNoPriv     | Yes           | None       | Username + Auth password        |
| AuthPriv       | Yes           | Yes        | Username + Auth + Priv password |
