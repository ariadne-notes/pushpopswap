# NTP

## Server Only - Based on Internal Clock

`ntp master <stramum>`

## Client/Server - Based On Other NTP Clocks And Stratum

`ntp server <address|hostname>`

## Config

I found a list of time servers [here.](https://gist.github.com/mutin-sa/eea1c396b1e610a2da1e5550d94b0453)

```console
ntp server pool.ntp.org
ntp server time.nist.gov
ntp server time.cloudflare.com
ntp source <loopback-should-go-here>
!
! NTP Master 7 ... if internet connectivity is lost, and external NTP fails, this box can still serve NTP.
!
ntp master 7
```

A caution: [Using pool.ntp.org](https://www.ntppool.org/en/use.html)

> **Consider if the NTP Pool is appropriate for your use.** If business, organization or human life depends on having correct time or can be harmed by it being wrong, you shouldn't "just get it off the Internet". The NTP Pool is generally very high quality, but it is a service run by volunteers in their spare time. Please talk to your equipment and service vendors about getting local and reliable service setup for you. See also our [terms of service.](https://www.ntppool.org/tos.html) We recommend time servers from Meinberg, but you can also find time servers from End Run, Spectracom and many others.
