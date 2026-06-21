# EIGRP Stub Routing

- Normally a hub-and-spoke technology.

- Deployed at the spoke sites.
- Simplifies EIGRP config.
- Prevents a stub site from being used as transit.
- Useful to limit the scope of a EIGRP query domain
  - Stub router replies to queries with `inaccessible`
    - Connected
    - Redistributed Static
    - External
    - Internal

## References

[IP Routing Configuration Guide, Cisco IOS XE 17.x - EIGRP Stub Routing Cisco IOS XE 17 - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ire-eigrp-stub-rtg.html)
