# Telnet with no user accounts

**[Deprecated]**

A tech from an earlier time.

- No encryption
- No user accounts
- Requires two passwords
  - Line password
  - Enable password

Applying `aaa new-model` will immediately remove the `login` lines, breaking login.

Tested on IOSv, Version 15.9(3)M8. 

[Deprecated]: https://www.merriam-webster.com/dictionary/deprecate

## Config

This is the minimum to get this feature working.

```console,editable
!
! Defaults to off, just a reminder it needs to be off.
!
no aaa new-model
!
! Put a password here, or enable will not work
!
! Can also use enable secret
!
enable password Cisco123
!
! I didn't want to configure an IP.
!
! The device needs an IP for Telnet to work.
!
interface GigabitEthernet0/0
 ip address dhcp hostname r2-aaa
!
! Each set of vty lines require three things:
!
! 1. login
! 2. password
! 3. transport method
!
line vty 0 4
 password Cisco123
 login
 transport input telnet
line vty 5 15
 password Cisco123
 login
 transport input telnet
```

## References

[Cisco - Prepare to connect to a device with Telnet - 8300 Series Secure Routers Software Configuration Guide - IOS-XE ](https://www.cisco.com/c/en/us/td/docs/routers/secure-routers/sec-8300-series/software-config-guide/secure-8300-series-scg/isr9000swcfg-xe-16-12-book_chapter_011.html)
