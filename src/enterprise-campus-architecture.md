# Enterprise Campus Architecture

The C9000-L series, does not support Catalyst Center, and has lower stackwise Speeds.

## Two Tier Collapsed Core

![cisco-campus-two-tier-collapsed-core-cisco](./images/cisco-campus/cisco-campus-two-tier-collapsed-core-cisco.jpg)

- The core and distribution switches are the same
- The center is running StackWise Virtual


## Three Tier

![cisco-campus-three-tier-with-network-services-layer](./images/cisco-campus/cisco-campus-three-tier-with-network-services-layer.jpg)

## Layer 2 Access with traditional multilayer

- Layer 2 is a single wiring closest, or access uplink pair.
- FHRP is used, but limits bandwidth to one uplink, vs both.

## The Campus Network

- Campus networks are always oversubscribed.
- Over-subscription rates between 4-20 are common.
- Networks with over-subscription that results in queuing should implement QoS for voice traffic.

## Access Layer

- 9200 (160Gbps stack-wise ring)
- 9300 (480Gbps stack-wise ring)
- 9400 (modular chassis)

**Considerations**


- mGig, so access speeds can scale
- UPOE+, 90W with perpetual power (survives reboots)

## Distribution Layer

- 9400 (modular chassis)
- 9500
- 9600 (modular chassis)

**Considerations**

- Service heavy (FHRPs, Routing, SVIs)
- Typical L2 boundary
- Used to interconnect all the access layer switches in a building
- Used to interconnect Access layer switches, once they can't form a full-mesh
- Also contains the failure domain of the access layer.
- Simplified Distribution, using stackwise virtual to remove FHRP.

## Core Layer

- 9500
- 9600 (modular chassis)

**Considerations**

- No services
- Layer 3 only
- Always on
- Ideally, a minimum of 100G to conserve ports.

![cisco-campus-lan-core](./images/cisco-campus/cisco-campus-lan-core.jpg)



**Traditional Design**

![cisco-campus-looped-access](./images/cisco-campus/cisco-campus-looped-access.jpg)

- Needs STP to block ports

**Traditional Design - Loop Free**

![cisco-campus-loop-free-access](./images/cisco-campus/cisco-campus-loop-free-access.jpg)

## Other Designs

**SD-Access**
- Cisco Catalyst Center
- Cisco Identity Services Engine


![cisco-campus-sd-access-design](./images/cisco-campus/cisco-campus-sd-access-design.jpg)

**Open Standards Based Overlay**
- MP-BGP
- VXLAN


![cisco-campus-bgp-evpn-vxlan](./images/cisco-campus/cisco-campus-bgp-evpn-vxlan.jpg)

## Campus LAN Best Practices - Security

- DHCP Snooping, to prevent users from hooking up a DHCP server from home on accident.

- Dynamic ARP inspection, to prevent a ARP attack, where the attack sends ARP replies with the IPs in the subnet.

- BDPU Guard, to prevent home switches.

- 802.1x, port authentication

- Cisco Umbrella, Cisco's DNS offering.

## Campus LAN Best Practices - High Availability

* **SSO:** Stateful Switch Over, used to sync RPs in modular switches.

* **NSF:** Non-Stop Forwarding allows graceful restarting of a L3 protocol. Allows the data-plane to continue while the new RP

* **MLS:** Multi-layer Switch.

* **StackWise:** Older tech, to combine switches together. Up to 8 switches can be stacked. They operate as one switch.

* **StackWise Virtual:** Two MLS devices, are combined to become one logical device.

* **StackWise Virtual Link:** The control/data path between the two switches. Should be two links minimum.

* **GIR:** Graceful Insertion or Removal. Influencing paths by changing route-metrics or adjusting FHRP priorities.



## Etherchannel

- Use a dynamic protocol, to check on link health



## References

[Design Zone - Campus LAN and Wireless LAN Solution Design Guide - Cisco](https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-campus-lan-wlan-design-guide.html)