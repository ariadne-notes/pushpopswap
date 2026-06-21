# NTP

## Modes

**Client-Server**

- AKA, `server`

Time is one way, the clients get time from servers.

**Symmetric Active/Passive**

- AKA, `peer`

Devices have a low-stratum primary reference, but if that primary reference goes down, they can use each other as backups.

**Broadcast or multicast**

- AKA, `broadcast`

- Same subnet
- Not as accurate

## Config

### Provide NTP

```console,editable
!
! 7 is pretty low
!
! good practice is to bind this to a stable interface, like a loopback
!
!
ntp master 7
ntp source Loopback0
```

### Get NTP from another server

```console,editable
!
! NTP should never rely on a single server.
!
! Even my home network relies on seven external NTP servers.
!
!
ntp server pool.ntp.org
```

### A public config

> [!WARNING]
> Does your organization use time in a way that human lives depend on it being correct?


> **You shouldn't "just get it off the Internet"**
>
> The NTP Pool is generally very high quality, but it is a service run by volunteers in their spare time.
>
> Please talk to your equipment and service vendors about getting local and reliable service setup for you.
>
> See also our [terms of service.](https://www.ntppool.org/tos.html)
>
> We recommend time servers from Meinberg, but you can also find time servers from End Run, Spectracom and many others.

From [Using pool.ntp.org].

[Using pool.ntp.org]: https://www.ntppool.org/en/use.html

From this [list].

[list]: https://gist.github.com/mutin-sa/eea1c396b1e610a2da1e5550d94b0453

```console,editable
ntp server pool.ntp.org
ntp server time.nist.gov
ntp server time.cloudflare.com
ntp source <loopback-goes-here>
ntp peer <other-router-goes-here>
!
! NTP Master 7 ... if Internet connectivity is lost, and external NTP fails, this box can still serve NTP.
!
ntp master 7
```


## References

[Cisco - Best Practices for NTP](https://www.cisco.com/c/en/us/support/docs/availability/high-availability/19643-ntpm.html)

[Cisco - NTP Configuration Guide - IOS XE 17](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/time-sync/ntp-configuration-guide/m-network-time-protocol.html)

[Clock | Network as Code](https://netascode.cisco.com/docs/data_models/iosxe/device/clock/#sample-configuration)
