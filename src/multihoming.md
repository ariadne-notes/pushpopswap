# Terms
* **Multihomed:** - A network with more than one transit provider.
* **Multi-Attached:** - More than one L3 connection to the same ISP.
* **PI Addresses:** - IP addresses not owned by the ISP.
* **PA Addresses:** - Provider Aggregatable. You might have permission to use a /24, but it comes from a much larger /18.
* **Asymmetric Flow:** - Egress traffic and Ingress traffic are via different ISPs.

# BGP Multihoming
**Best Scenario:** Announce PI prefixes to both provider via BGP.

To have BGP multi-homing, a v4 site with PI addressing needs at least a /24 prefix for v4 and a /48 for v6.

## BGP Filtering
* Filter outbound prefixes to match networks you have. Do not re-advertise the full table, back out.


# References
I. van Beijnum, *BGP: Building Reliable Networks with the Border Gateway Protocol*. Sebastopol, CA: O'Reilly Media, 2002, ISBN: 978-0-596-00254-1.

[RFC 4116 - IPv4 Multihoming Practices and Limitations](https://datatracker.ietf.org/doc/html/rfc4116)

[RFC 7454: BGP Operations and Security | RFC Editor](<https://www.rfc-editor.org/info/rfc7454/#autoid-1>)

[Network Startup Resource Center - Multihoming: Outbound Traffic Engineering](https://nsrc.org/workshops/2024/nsrc-bknix-riso/networking/peering-ixp/en/presentations/Multihoming-OutboundTE.pdf)