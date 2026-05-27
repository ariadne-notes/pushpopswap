# NHRP

NHRP
: NBMA Next-Hop Resolution Protocol

NBMA
: Non-broadcast Multi-access Network. Network connections you could make, if only you knew how to address the packet.

NBMA Address
: AKA transport address. For DMVPN, this is the public address out on the Internet.

NHS
: Next Hop Server. This is the service that NHRP provides. The NHS is usually the hub router.

NHC
: Next Hop Client. These can dynamically register with the NHS.

Protocol Address
: AKA overlay address. This is what the client asks for. For a point-to-multipoint cloud, this is usually a subnet.

## Config

### Hub

```console
interface Tunnel1
 ip address 192.168.100.1 255.255.255.0
 no ip redirects
 ip nhrp network-id 111
 !
 ! This is the NBMA address.
 !
 tunnel source 10.0.110.1
 tunnel mode gre multipoint
```

### Spoke

```console
interface Tunnel1
 ip address 192.168.100.2 255.255.255.0
 no ip redirects
 !
 ! Logical address, then NBMA address
 !
 ip nhrp map 192.168.100.1 10.0.110.1
 ip nhrp map multicast 10.0.110.1
 ip nhrp network-id 111
 ip nhrp nhs 192.168.100.1
 tunnel source 10.0.120.2
 tunnel mode gre multipoint
```


## Verification


This hub knows about two sites, that have dynamically registered their NBMA addresses.

```console
hub# show ip nhrp brief

****************************************************************************
    NOTE: Link-Local, No-socket and Incomplete entries are not displayed
****************************************************************************
Legend: Type --> S - Static, D - Dynamic
        Flags --> u - unique, r - registered, e - temporary, c - claimed
        a - authoritative, t - route
============================================================================

Intf     NextHop Address                                    NBMA Address
         Target Network                              T/Flag
-------- ------------------------------------------- ------ ----------------
Tu1      192.168.100.2                                      10.0.120.2
         192.168.100.2/32                            D/r

Tu1      192.168.100.3                                      10.0.130.3
         192.168.100.3/32                            D/r
```

## References

[NBMA Next Hop Resolution Protocol](https://www.rfc-editor.org/rfc/rfc2332)
