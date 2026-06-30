# Push, Pop, Swap

[Ariadne's Network Notes](ariadnes-network-notes.md)
[License](license.md)

----

# Studying

- [How to Study](how-to-study.md)
- [How to Take Notes](how-to-take-notes.md)
- [How to Make a Blog Like This](how-to-make-a-blog-like-this.md)
- [How to Use this Site](how-to-use-this-site.md)
- [Git](git/git.md)
  - [Git Merge](git/git-merge.md)
  - [Git Branch](git/git-branch.md)
  - [Git Switch](git/git-switch.md)
  - [Git Push](git/git-push.md)
  - [Git Log](git/git-log.md)
  - [Git Rebase](git/git-rebase.md)
  - [Git Reset](git/git-reset.md)
  - [Git Remote](git/git-remote.md)
  - [Git RM](git/git-rm.md)
  - [Git Commit](git/git-commit.md)
  - [Git Restore](git/git-restore.md)
  - [Git Ignore](git/git-ignore.md)

# Routed Protocols

- [IPv4](ipv4/ipv4.md)
  - [IPv4 Addressing](ipv4/ipv4-addressing.md)
  - [IPv4 Packet Header](ipv4/ipv4-packet-header.md)
  - [IPv4 Address Planning](ipv4/ipv4-address-planning.md)
  - [IPv4 Subnets](ipv4/ipv4-subnets.md)
    - [Subnetting with Fingers](subnet-with-fingers.md)
    - [Subnetting with the Box Method](subnet-with-the-box-method.md)
    - [Subnetting with Binary](subnet-with-binary.md)
    - [IPv4 Classful Networking](ipv4/ipv4-classful-networking.md)


- [IPv6](ipv6/ipv6.md)
  - [IPv6 Subnetting](ipv6/ipv6-subnetting.md)
  - [IPv6 Hextet Boundaries](ipv6/ipv6-hextet-boundaries.md)
  - [IPv6 Network Address Planning](ipv6/ipv6-network-address-planning.md)
  - [IPv6 Link Local Addressing](ipv6/ipv6-link-local-addressing.md)
  - [IPv6 Unique Local Addressing](ipv6/ipv6-ula.md)
  - [IPv6 ICMPv6](ipv6/ipv6-icmpv6.md)
  - [IPv6 Neighbor Discovery](ipv6/ipv6-nd.md)
    - [IPv6 ND Router Advertisements](ipv6/ipv6-nd-ra.md)


- [IPv4 to IPV6 Migration Strategies](ipv4/ipv4-to-ipv6-migration-strategies.md)
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
  - [IOS-XR QoS Commands](ios-xr-qos.md)

# Enterprise Switching

- [Spanning Trees](enterprise-switching/spanning-trees.md)
  - [STP](enterprise-switching/stp.md)
    - [Finding TCNs](enterprise-switching/finding-tcns.md)
  - [RSTP](enterprise-switching/rstp.md)
  - [MST](enterprise-switching/mst.md)

- [Defend Spanning Tree](enterprise-switching/defend-spanning-tree.md)
  - [DTP](enterprise-switching/dtp.md)
  - [Portfast](enterprise-switching/portfast.md)
  - [BPDU Guard](enterprise-switching/bpdu-guard.md)
  - [BPDU Filter](enterprise-switching/bpdu-filter.md)
  - [Root Guard](enterprise-switching/root-guard.md)
  - [Loop Guard](enterprise-switching/loop-guard.md)
  - [UplinkFast](enterprise-switching/uplinkfast.md)
  - [Port Security](enterprise-switching/port-security.md)
  - [UDLD](enterprise-switching/udld.md)

- [ARP](enterprise-switching/arp.md)
  - [ARP Attacks](enterprise-switching/arp-attacks.md)
  - [DAI](enterprise-switching/dai.md)
  - [Proxy ARP](enterprise-switching/proxy-arp.md)

- [VTP](enterprise-switching/vtp.md)
  - [VTP Bomb](enterprise-switching/vtp-bomb.md)

# SP Ethernet

- [Metro Ethernet](metro-ethernet.md)
- [Private Vlans](private-vlans.md)

# SP Switching

- [MPLS](mpls.md)
  - [L3VPN](mpls-l3vpn.md)
  - [MPLS DiffServ](mpls-diffserv.md)
  - [IRB On the ASR9K](irb-on-the-asr9k.md)

- [Simple BBA on the ASR 1k](simple-bba-on-the-asr-1k.md)
- [PBB](pbb.md)

# Switch Features

- [SPAN, RSPAN, ERSPAN](span-rspan-erspan.md)

# Multicast

- [Multicast](multicast/multicast.md)
  - [PIM Dense](multicast/pim-dense.md)
  - [PIM Sparse](multicast/pim-sparse.md)
  - [BIDIR-PIM](multicast/bidir-pim.md)
  - [Auto-RP](multicast/auto-rp.md)
  - [MSDP](multicast/msdp.md)
  - [IPv6 Multicast Addresses](multicast/ipv6-multicast-addresses.md)
  - [IPv4 Multicast L2 Addressing](multicast/ipv4-multicast-l2-addressing.md)
  - [Multicast L3 Addressing](multicast/multicast-l3-addressing.md)

# Routing

- [Static Routing](static-routing.md)

- [OSPFv2](./ospf/ospfv2.md)
  - [DR Election](./ospf/ospfv2-dr-election.md)
    - [DR LSAs](./ospf/ospfv2-dr-lsas.md)
  - [LSA Types](./ospf/ospfv2-lsa-types.md)
    - [Type 1 LSA - Router](./ospf/ospfv2-type-1-lsa-router.md)
    - [Type 2 LSA - Network](./ospf/ospfv2-type-2-lsa-network.md)
    - [Type 3 LSA - Summary](./ospf/ospfv2-type-3-lsa-summary.md)
    - [Type 4 LSA - ASBR Summary](./ospf/ospfv2-type-4-lsa-asbr-summary.md)
    - [Type 5 LSA - External](./ospf/ospfv2-type-5-external.md)
  - [Network and LSA Chart](./ospf/ospfv2-network-and-lsa-chart.md)
  - [LSA Default Routes](./ospf/ospfv2-lsa-default-route.md)
  - [Network Types](./ospf/ospfv2-network-types.md)
    - [Point-to-Multipoint](./ospf/ospfv2-p2mp.md)
  - [LFA](./ospf/ospfv2-lfa.md)
  - [Sham Links](./ospf/ospfv2-sham-links.md)
  - [Incremental SPF](./ospf/ospfv2-incremental-spf.md)

- [OSPFv3](./ospf/ospfv3.md)

- [EIGRP](./eigrp/eigrp.md)
  - [EIGRP Stub Routing](./eigrp/eigrp-stub-routing.md)
  
- [IS-IS](is-is.md)
  - [IS-IS Network Design](is-is-network-design.md)

- [BGP](./bgp/bgp.md)
  - [Neighbor FSM](./bgp/bgp-neighbor-fsm.md)
  - [Confederations](./bgp/bgp-confederations.md)
  - [Route Reflectors](./bgp/bgp-route-reflectors.md)
  - [Multipath](./bgp/bgp-multipath.md)
  - [Multihop](./bgp/bgp-multihop.md)
  - [Tuning](./bgp/bgp-tuning.md)
  - [Load Balancing](./bgp/bgp-load-balancing.md)
  - [Allowas-In](./bgp/bgp-allowas-in.md)
  - [AS-Override](./bgp/bgp-as-override.md)

# Routing Strategies

- [VRF Lite](vrf-lite.md)

- [Route Redistribution](route-redistribution.md)
  - [Route Redistribution BGP](route-redistribution-bgp.md)
  - [Route Redistribution EIGRP](route-redistribution-eigrp.md)
  - [Route Redistribution OSPF](ospf/route-redistribution-ospf.md)
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
  - [VTI](vti.md)
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
- [StackWise Virtual](stackwise-virtual.md)

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
- [RMON](rmon.md)

# Software Defined Networking

- [SD-WAN](./cisco-sdn/sd-wan.md)
  - [OMP](./cisco-sdn/sd-wan-omp.md)
  - [Node Types](./cisco-sdn/sd-wan-node-types.md)
  - [Multicast](./cisco-sdn/sd-wan-multicast.md)
  - [Bootstrap](./cisco-sdn/sd-wan-bootstrap.md)
  - [Cloud](./cisco-sdn/sd-wan-cloud.md)
  - [Colors](./cisco-sdn/sd-wan-colors.md)
  - [ZTP](./cisco-sdn/sd-wan-ztp.md)
  - [QOS](./cisco-sdn/sd-wan-qos.md)
  - [Header](./cisco-sdn/sd-wan-header.md)
  - [HA](./cisco-sdn/sd-wan-ha.md)

- [SD-Access](./cisco-sdn/sd-access.md)
  - [Cisco Catalyst Center](./cisco-sdn/cisco-catalyst-center.md)
  - [LISP](./cisco-sdn/sd-access-lisp.md)
  - [VXLAN](./cisco-sdn/sd-access-vxlan.md)
  - [VXLAN-GPO Header](./cisco-sdn/sd-access-vxlan-gpo-header.md)
  - [Wireless Integration](./cisco-sdn/sd-access-and-wireless-integration.md)

# Timing

- [PTP](ptp.md)
- [SyncE](synce.md)

# Wireless

- [Wireless](wireless.md)
- [OFDM](ofdm.md)

# Automation

- [Openconfig Automation](automation/openconfig-automation.md)
  - [gRPC](automation/grpc.md)
    - [gNMI](automation/gnmi.md)
    - [gNOI](automation/gnoi.md)
    - [gNSI](automation/gnsi.md)
    - [gRIBI](automation/gribi.md)
    - [gNxI](automation/gnxi.md)
- [IETF Automation](automation/ietf-automation.md)
  - [YANG](automation/yang.md)
  - [RESTCONF](automation/restconf.md)
  - [NETCONF](automation/netconf.md)
  - [RFC 3535, 20 Years Later](automation/rfc-3535-20-years-later.md)
- [MDT](automation/mdt.md)
- [Cisco IQ](automation/cisco-iq.md)
  - [Cisco IQ Link](automation/cisco-iq-link.md)
- [Ansible Basics](automation/ansible-basics.md)

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
    - [CML MCP](automation/cml-mcp.md)
    - [LLM Instructions](llm-instructions.md)
    - [PyATS](automation/pyats.md)
    
# Ceph

- [Ceph](ceph.md)
- [Add Cephfs to Debian](add-cephfs-to-debian.md)
- [Reclaim Space from Ceph for LVM](reclaim-space-from-ceph-for-lvm.md)

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
- [Cisco Architecture](cisco-architecture.md)
  - [Cisco Silicon One](cisco-silicon-one.md)
- [Internet Routing Registry](internet-routing-registry.md)
- [In Buiding Wireless](./in-building-wireless.md)
- [Boot with TFTP](boot-with-tftp.md)
- [Telnet With No User Accounts](telnet-with-no-user-accounts.md)
- [Sitemaps](./sitemaps.md)
- [Socket Statistics](socket-statistics.md)
- [K8s on Debian - Initial Setup](k8s-on-debian-initial-setup.md)


# Certification Stuff

- [Cisco Certifications](cisco-certifications.md)

# Tools

- [IPv4 To Hex](ipv4/ipv4-to-hex.md)
- [EIGRP Classic Metric](eigrp-classic-metric.md)
- [EIGRP Wide Metric](eigrp-wide-metric.md)

# The End

- [Other Resources](other-resources.md)
- [Style Guide](style-guide.md)
- [CCIE Blogs](ccie-blogs.md)

---

[A Woman Calls TAC](joke-a-woman-calls-TAC.md)
[A Red Team Housecall](joke-red-team-housecall.md)
