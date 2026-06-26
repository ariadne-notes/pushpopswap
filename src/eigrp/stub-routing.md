# Stub Routing

Normally a hub-and-spoke technology

- Deployed at the spoke sites
- Simplifies EIGRP config
- Prevents a stub site from being used as transit
- Stubs do not advertise routes they learn from other neighbors
- Useful to limit the scope of a EIGRP query domain
  - Stub router **replies to queries** with `inaccessible`
    - Connected
    - Redistributed Static
    - External
    - Internal


More details on page 174 of [BRKENT-1187]

[BRKENT-1187]: ../pdfs/ciscolive/BRKENT-1187.pdf

## Commands

### Stub

Advertise
- Connected
- Static
- Summary

### Stub Static Connected

Advertise
- Connected
- Static

Do not advertise
- Summary

### Stub Summary

Advertise
- Summary

Do not advertise
- Connected
- Static

### Stub Receive-Only

[Do Not Advertise](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ire-eigrp-stub-rtg.html#GUID-E1CE1532-C9D2-4950-B607-0E8FBF09A9A9)
- Connected
- Static
- Summary

## Two routers per site

Taken from [BRKENT-1187], pg 183.

Uses IWAN simplification so the stub routers can advertise routes to each other.

I haven't tested this.

### Topology

```plain
                                        
       ┌─────┐           ┌─────┐        
       │ Hub │           │ Hub │        
       │  A  │           │  B  │        
       └──┬──┘           └──┬──┘        
0.0.0.0/0 │                 │ 0.0.0.0/0 
          │                 │           
        │ │                 │ │         
        │ │                 │ │         
        ▼ │                 │ ▼         
       ┌──┴──┐           ┌──┴──┐        
       │Stub │           │Stub │        
       │  C  ├───────────┤  D  │        
       └─────┘           └──┬──┘        
                            │           
                        ────┴────       
                       10.1.1.0/24      
```

### Config

```console,editable
!
! C and D must share the same stub-site ID.
!
router eigrp ROCKS
  address-family ipv4 unicast autonomous-system 1
    af-interface Tunnel100
      hello-interval 20
      hold-time 60
      stub-site wan-interface
    exit-af-interface
!
    topology base
    exit-af-topology
    network 10.0.0.0
    eigrp router-id 10.1.1.1
    eigrp stub-site 1:1
  exit-address-family
```

## References

[Cisco Live - EIGRP Introduction and Overview - Steven Moore - BRKENT-1187](../pdfs/ciscolive/BRKENT-1187.pdf)

[Cisco - EIGRP IWAN Simplification - IP Routing Configuration Guide, Cisco IOS XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ire-iwan-simpl.html)

[IP Routing Configuration Guide, Cisco IOS XE 17.x - EIGRP Stub Routing Cisco IOS XE 17 - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ire-eigrp-stub-rtg.html)
