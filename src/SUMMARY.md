# Push, Pop, Swap

[Ariadne's Network Notes](ariadnes-network-notes.md)
[License](license.md)

----

# Basics

- [How To](how-to.md)
  - [Study](./how-to/study.md)
  - [Take Notes](./how-to/take-notes.md)
  - [Make a Blog Like This](./how-to/make-a-blog-like-this.md)
  - [Use Git](./git.md)
    - [Merge](./how-to/use-git/merge.md)
    - [Branch](./how-to/use-git/branch.md)
    - [Switch](./how-to/use-git/switch.md)
    - [Push](./how-to/use-git/push.md)
    - [Log](./how-to/use-git/log.md)
    - [Rebase](./how-to/use-git/rebase.md)
    - [Reset](./how-to/use-git/reset.md)
    - [RM](./how-to/use-git/rm.md)
    - [Commit](./how-to/use-git/commit.md)
    - [Restore](./how-to/use-git/restore.md)
    - [Ignore](./how-to/use-git/ignore.md)
  

# Routed Protocols

- [IPv4](ipv4.md)
  - [IPv4 Addressing](./ipv4/addressing.md)
  - [IPv4 Packet Header](./ipv4/packet-header.md)
  - [IPv4 Address Planning](./ipv4/address-planning.md)
  - [Classful Networking](./ipv4/classful-networking.md)
  - [Subnetting](./ipv4/subnetting.md)
    - [with Fingers](./ipv4/subnetting/with-fingers.md)
    - [with the Box Method](./ipv4/subnetting/with-the-box-method.md)
    - [with Binary](./ipv4/subnetting/with-binary.md)
   

- [IPv6](ipv6.md)
  - [IPv6 Subnetting](ipv6-subnetting.md)
  - [IPv6 Hextext Boundaries](ipv6-hextet-boundaries.md)
  - [IPv6 Network Address Planning](ipv6-network-address-planning.md)
  - [IPv6 Multicast Addresses](ipv6-multicast-addresses.md)
  - [IPv6 Link Local Addressing](ipv6-link-local-addressing.md)
  - [IPv6 Unique Link Local Addressing](ipv6-ula.md)
  - [IPv6 ICMPv6](ipv6-icmpv6.md)
  - [IPv6 Neighbor Discovery](ipv6-nd.md)
    - [IPv6 ND Router Solicitation](ipv6-nd-ra.md)

- [IPv4 to IPV6 Migration Strategies](ipv4-to-ipv6-migration-strategies.md)
  - [ISATAP](isatap.md)
  - [6RD](6rd.md)
  - [Stateful NAT64](stateful-nat64.md)
  - [Stateless NAT64](stateless-nat64.md)

# Ethernet

- [Ethernet CSMA/CD](ethernet-csma-cd.md)
- [10G Ethernet](10-gig-ethernet.md)
- [802.1Q](802.1q.md)
- [VLAN Access Control Lists](vlan-access-control-lists.md)

# Quality of Service

- [QoS](qos.md)
  - [QoS Trust Boundaries](qos-trust-boundaries.md)
  - [802.1P](802.1p.md)
  - [Congestion](congestion.md)
  - [Cisco IOS QoS Commands](cisco-ios-qos-commands.md)

# Enterprise Switching

- [Spanning Trees](spanning-trees.md)
  - [STP](stp.md)
    - [Finding TCNs](finding-tcns.md)
  - [RSTP](rstp.md)
  - [MST](mst.md)

- [Defend Spanning Tree](defend-spanning-tree.md)
  - [DTP](dtp.md)
  - [Portfast](portfast.md)
  - [BPDU Guard](bpdu-guard.md)
  - [BPDU Filter](bpdu-filter.md)
  - [Root Guard](root-guard.md)
  - [Loop Guard](loop-guard.md)
  - [UplinkFast](uplinkfast.md)
  - [Port Security](port-security.md)
  - [UDLD](udld.md)

- [ARP](arp.md)
  - [ARP Attacks](arp-attacks.md)
  - [DAI](dai.md)
  - [Proxy ARP](proxy-arp.md)

- [VTP](vtp.md)
  - [VTP Bomb](vtp-bomb.md)

# SP Ethernet

- [Metro Ethernet](metro-ethernet.md)
- [Private Vlans](private-vlans.md)

# SP Switching

- [MPLS](mpls.md)
  - [L3VPN](mpls-l3vpn.md)
  - [MPLS DiffServ](mpls-diffserv.md)
  - [IRB On the ASR9K](irb-on-the-asr9k.md)

- [PBB](pbb.md)

# Switch Features

- [SPAN, RSPAN, ERSPAN](span-rspan-erspan.md)

# Multicast

- [Multicast](multicast.md)
  - [PIM Dense](pim-dense.md)
  - [PIM Sparse](pim-sparse.md)
  - [BIDIR-PIM](bidir-pim.md)
  - [Auto-RP](auto-rp.md)
  - [MSDP](msdp.md)
  - [Multicast L2 Addressing](multicast-l2-addressing.md)

# Routing

- [Static Routing](static-routing.md)

- [OSPFv2](./ospfv2/ospfv2.md)
  - [DR Election](./ospfv2/dr-election.md)
    - [LSAs](./ospfv2/dr-lsas.md)
  - [LSA Type](./ospfv2/lsa-types.md)
    - [1 LSA - Router](./ospfv2/type-1-lsa-router.md)
    - [2 LSA - Network](./ospfv2/type-2-lsa-network.md)
    - [3 LSA - Summary](./ospfv2/type-3-lsa-summary.md)
    - [4 LSA - ASBR Summary](./ospfv2/type-4-lsa-asbr-summary.md)
    - [5 LSA - External](./ospfv2/type-5-external.md)
  - [Network and LSA Chart](./ospfv2/network-and-lsa-chart.md)
  - [LSA Default Routes](./ospfv2/lsa-default-route.md)
  - [Network Types](./ospfv2/network-types.md)
    - [Point-to-Multipoint](./ospfv2/p2mp.md)
  - [LFA](./ospfv2/lfa.md)
  - [Sham Links](./ospfv2/sham-links.md)
  - [Incremental SPF](./ospfv2/incremental-spf.md)

- [OSPFv3](./ospfv3.md)

- [EIGRP](eigrp.md)
  - [EIGRP Stub Routing](eigrp-stub-routing.md)
  
- [IS-IS](is-is.md)
  - [IS-IS Network Design](is-is-network-design.md)

- [BGP](bgp/bgp.md)
  - [Neighbor FSM](bgp/neighbor-fsm.md)
  - [Confederations](bgp/confederations.md)
  - [Route Reflectors](bgp/route-reflectors.md)
  - [Multipath](bgp/multipath.md)
  - [Multihop](bgp/multihop.md)
  - [Tuning](bgp/tuning.md)
  - [Load Balancing](bgp/load-balancing.md)
  - [Allowas-In](bgp/allowas-in.md)
  - [AS-Override](bgp/as-override.md)

# Routing Strategies

- [VRF Lite](vrf-lite.md)

- [Route Redistribution](route-redistribution.md)
  - [Route Redistribution BGP](route-redistribution-bgp.md)
  - [Route Redistribution EIGRP](route-redistribution-eigrp.md)
  - [Route Redistribution OSPF](route-redistribution-ospf.md)
  - [Route Redistribution with Tags](route-redistribution-with-tags.md)
  
- [Policy Based Routing](policy-based-routing.md)

# Security

- [Cisco TrustSec](cisco-trustsec.md)
  - [Zero Trust](zero-trust.md)
  - [Cisco ISE](cisco-ise.md)
  - [Cisco PxGrid](cisco-pxgrid.md)

- [Encryption Fundamentals](encryption-fundamentals.md)

- [Secure VPNs](secure-vpns.md)
  - [IKE](ike.md)
  - [GRE](gre.md)
  - [IPSec](ipsec.md)
    - [IPSec Authentication Header](ipsec-ah.md)
    - [IPSec Encapsulating Security Payload](ipsec-esp.md)
  - [DMVPN](dmvpn.md)
    - [NHRP](nhrp.md)
  - [GETVPN](getvpn.md)
  
# DDoS Prevention

- [uRPF](urpf.md)

# Best Practices

- [Network Management](network-management.md)
- [Out Of Band Management](out-of-band-management.md)
- [Point to Point Links](point-to-point-links.md)

# High Availability

- [SSO](sso.md)
- [Stackwise Virtual](stackwise-virtual.md)

# Enterprise Campus

- [Enterprise Campus Architecture](enterprise-campus-architecture.md)
- [Enterprise Campus Modular Design](enterprise-campus-modular-design.md)
- [Cisco AAA](cisco-aaa.md)
- [TACACS+](tacacs-plus.md)
- [Clouds](clouds.md)
  - [Virtual Private Clouds](vpcs.md)
  - [Cloud Interconnects](cloud-interconnects.md)

# Network Services

- [FHRP](fhrp.md)
  - [VRRP](vrrp.md)
  - [GLBP](glbp.md)
  - [HSRP](hsrp.md)
- [ACLs](acls.md)
- [CoPP with ACLs and Object Groups](copp-with-acls-and-object-groups.md)
- [NAT](nat.md)
- [DNS](dns.md)
- [SSH](ssh.md)
- [NTP](ntp.md)
- [Power Over Ethernet](power-over-ethernet.md)
- [Cisco ECMP](cisco-ecmp.md)
- [Flexible NetFlow](flexible-netflow.md)
- [AAA with FreeRadius and Univention UCS](aaa-freeradius-and-univention-ucs.md)
- [SNMP](snmp.md)
  - [SNMP Versions](snmp-versions.md)
  - [SNMP is Dead](snmp-is-dead.md)

# Software Defined Networking

- [SD-WAN](sd-wan.md)
  - [OMP](sd-wan/omp.md)
  - [Node Types](sd-wan/node-types.md)
  - [Multicast](sd-wan/multicast.md)
  - [Bootstrap](sd-wan/bootstrap.md)
  - [Cloud](sd-wan/cloud.md)
  - [Colors](sd-wan/colors.md)
  - [ZTP](sd-wan/ztp.md)
  - [QOS](sd-wan/qos.md)
  - [Headers](sd-wan/header.md)
  - [HA](sd-wan/ha.md)

- [SD-Access](sd-access.md)
  - [Cisco Catalyst Center](cisco-catalyst-center.md)
  - [SD-Access LISP](sd-access-lisp.md)
  - [SD-Access VXLAN](sd-access-vxlan.md)
  - [SD-Access VXLAN-GPO Header](sd-access-vxlan-gpo-header.md)
  - [SD-Access and Wireless Integration](sd-access-and-wireless-integration.md)

# Timing

- [PTP](ptp.md)
- [SyncE](synce.md)

# Wireless

- [Wireless](wireless.md)

# Automation

- [Openconfig Automation](openconfig-automation.md)
  - [gRPC](grpc.md)
    - [gNMI](gnmi.md)
    - [gNOI](gnoi.md)
    - [gNSI](gnsi.md)
    - [gRIBI](gribi.md)
    - [gNxI](gnxi.md)
- [IETF Automation](ietf-automation.md)
  - [YANG](yang.md)
  - [RESTCONF](restconf.md)
  - [NETCONF](netconf.md)
  - [RFC 3535, 20 Years Later](rfc-3535-20-years-later.md)
- [MDT](mdt.md)
- [Cisco IQ](cisco-iq.md)
  - [Cisco IQ Link](cisco-iq-link.md)
- [Ansible Basics](ansible-basics.md)

# Layer 1

- [G.709](g709.md)
- [RPR - Resilient Packet Ring](rpr.md)
- [SRP - Spatial Reuse protocol](srp.md)
- [MLPPP over ATM](mlppp-over-atm.md)
- [WAN Considerations](wan-considerations.md)
- [G8032](g8032.md)
- [Back to Back Frame Relay](back-to-back-frame-relay.md)
- [TDM](tdm.md)
  - [T1](t1.md)
  - [SONET](sonet.md)
    - [SONET C2 Byte](sonet-c2-byte.md)
  - [Circuit Emulation](cem.md)
- [UDP](udp.md)

# Lab Work

- [CML](cml.md)
  - [Alpine on CML](alpine-on-cml.md)
  - [IPERF 2](iperf2.md)
  - [Working with an LLM](working-with-an-llm.md)
    - [CML Breakout](cml-breakout.md)
    - [CML MCP](cml-mcp.md)
    - [LLM Instructions](llm-instructions.md)
    - [PyATS](pyats.md)

# Etc (Stuff I Haven't Sorted)

- [Study Tables](study-tables.md)
- [OS Architecture](os-architecture.md)
- [Wiki.js, Duplicati, Traefik, Portainer](wikijs-duplicati-traefik-portainer.md)
- [Windows 10 Physical to Virtual](windows-10-physical-to-virtual.md)
- [BFD](bfd.md)
- [LISP](lisp.md)
  - [LISP Encapsulation](lisp-encapsulation.md)
- [Multihoming](multihoming.md)
- [Certbot](certbot.md)
- [Wake on LAN](wake-on-lan.md)
- [Grep](grep.md)
- [Unknown Command or Computer Name](unknown-command-or-computer-name.md)
- [Cisco C9000 Packet Drops](c9000-packet-drops.md)
- [SecureCRT](securecrt.md)
- [Add Cephfs to Debian](add-cephfs-to-debian.md)
- [Cisco Architecture](cisco-architecture.md)
  - [Cisco Silicon One](cisco-silicon-one.md)
- [Internet Routing Registry](internet-routing-registry.md)
- [In Buiding Wireless](./in-building-wireless.md)
- [Boot with TFTP](boot-with-tftp.md)
- [Telnet With No User Accounts](telnet-with-no-user-accounts.md)
- [Sitemaps](./sitemaps.md)
- [Socket Statistics](socket-statistics.md)

# Certification Stuff

- [Cisco Certifications](cisco-certifications.md)

# Tools

- [IPv4 To Hex](ipv4-to-hex.md)
- [EIGRP Classic Metric](eigrp-classic-metric.md)
- [EIGRP Wide Metric](eigrp-wide-metric.md)

# The End

- [Other Resources](other-resources.md)
- [Style Guide](style-guide.md)
- [CCIE Blogs](ccie-blogs.md)

---

[A Woman Calls TAC](joke-a-woman-calls-TAC.md)
[A Red Team Housecall](joke-red-team-housecall.md)
