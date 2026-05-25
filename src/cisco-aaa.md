# Cisco AAA

`aaa new-model`

## Local Database

Is usually the fallback.

## Basic Config

```console
!
! The Radius Server
!
radius server RADIUS-UCS-1
 address ipv4 10.0.0.1 auth-port 1812 acct-port 1813
 key StrongPassword123
!
! default means, "Apply to VTY lines, but not console"
!
aaa authentication login default group radius local
!
! This is the localfallback method
!
username admin privilege 15 secret 9 $9$BXZm9X.AvojmtP$LlbzicXZ..f7Y/J59M4cgmTMCdh89fVZj6AyaOYleCg
```

## Config for the AAA Server

AAA servers are sensitive to what IP is making the request. To make it easier, pick a loopback.

`ip radius source-interface`, or `ip tacacs source-interface`

## Debugs


```console
debug aaa authentication
debug radius authentication
debug tacacs authentication
debug aaa protocol local
```
