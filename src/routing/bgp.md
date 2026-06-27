# BGP

- Either side can start the connection
- Port 179
- BGP is sensitive to IP fragmentation

## ASN

16-bit ASN - 65,535
32-bit ASN - 4,294,967,295

### Private numbers

- 64,512 – 65,534
- 4,200,000,000 – 4,294,967,294

## BGP path attributes

[RFC 4271 - BGP-4](https://www.rfc-editor.org/rfc/rfc4271#section-5)

**Mandatory**

All prefixes must contain:

**Well-known**

All BGP implementations must recognize these:

**Discretionary**

These attributes can be absent.

| Attribute Name         | Attribute Type / Status  |Type Code|
| -----------------------| ------------------------ |--------:|
| [ORIGIN]               | Well-known mandatory     |        1|
| [AS_PATH]              | Well-known mandatory     |        2|
| [NEXT_HOP]             | Well-known mandatory     |        3|
| [LOCAL_PREF]           | Well-known discretionary |        5|
| [ATOMIC_AGGREGATE]     | Well-known discretionary |        6|
| [AGGREGATOR]           | Optional transitive      |        7|
| [COMMUNITIES]          | Optional transitive      |        8|
| [EXTENDED_COMMUNITIES] | Optional transitive      |       16|
| [MULTI_EXIT_DISC]      | Optional non-transitive  |        4|
| [ORIGINATOR_ID]        | Optional non-transitive  |        9|
| [CLUSTER_LIST]         | Optional non-transitive  |       10|
| [MP_REACH_NLRI]        | Optional non-transitive  |       14|
| [MP_UNREACH_NLRI]      | Optional non-transitive  |       15|
| DPA                    | Deprecated               |       11|
| ADVERTISER             | Deprecated               |       12|
| RCID_PATH / CLUSTER_ID | Deprecated               |       13|

[AS_PATH]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.2
[ORIGIN]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.1
[NEXT_HOP]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.3
[LOCAL_PREF]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.5
[MULTI_EXIT_DISC]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.4
[ATOMIC_AGGREGATE]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.6
[AGGREGATOR]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.7
[Communities]: https://www.rfc-editor.org/info/rfc1997/
[EXTENDED_COMMUNITIES]: https://www.rfc-editor.org/info/rfc4360/
[ORIGINATOR_ID]: https://www.rfc-editor.org/info/rfc4456/#section-8
[CLUSTER_LIST]: https://www.rfc-editor.org/info/rfc4456/#section-8
[MP_REACH_NLRI]: https://datatracker.ietf.org/doc/html/rfc4760#section-3
[MP_UNREACH_NLRI]: https://datatracker.ietf.org/doc/html/rfc4760#section-3


## Session types

- iBGP Administrative distance of 200
- eBGP Administrative distance of 20

### eBGP

- TTL is set to 1.
- Next-hop is set to what the BGP source connection IP is.
- Check if the current AS_PATH has our AS.
- Prepend AS into AS_PATH

## BGP packet types

| Type | Name | Functional Overview |
|------|--------------|--------------------------------------------------|
| 1    | OPEN         | initial bringup                                  |
| 2    | UPDATE       | Routes and route updates                         |
| 3    | NOTIFICATION | Indicates an error condition to a BGP neighbor   |
| 4    | KEEPALIVE    | Makes sure everything is OK                      |

## Theory

- BGP works on the premise that if a router sees its own AS path, it must be a loop.
- The default timer is 60 seconds with 180 seconds for hold time. This means worst-case is 3 minutes to fail-over.
- BGP `aggregate-address` only works if there is a subnet inside the aggregate range in BGP.

## Working with BGP

 - Only consider traffic in one direction at a time
 - Accepting a route will affect outgoing traffic
 - Advertising a route will affect incoming traffic
 - Filter out everything except the routes needed
 - BGP DOES NOT LOAD BALANCE

On Cisco IOS `bgp soft-reconfig-backup` tells the router "if you must, save a entire table" otherwise rely on [RFC2918](https://www.rfc-editor.org/rfc/rfc2918), which are *dynamic updates.*

Soft reconfig is ancient, pre-RFC.

## Soft reconfig via route refresh (trusting the other device)

`clear ip bgp <neighbor_ip> soft in`[^clear-soft]

[^clear-soft]: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_bgp/configuration/xe-16/irg-xe-16-book/bgp-4-soft-configuration.html

## BGP best path selection

```text
- Higher Weigth                                       
- Higher Local Preference                            
- Locally Originated                                 (Network or Aggregate Command)
- Shortest AS-PATH
- Lowest Origin Type                                 (IGP > EGP > Incomplete)
- Lowest MED                                         (Neighbor ASes must be the same)
- eBGP > Confederated eBGP > iBGP
- Lowest IGP metric to next hop
- Is Multipath enabled?
  - Oldest External
  - Lower Router ID
  - Shorter cluster length
  - Prefer path from lowest neighbor address
```

[Cisco - Select BGP Best Path Algorithm](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html)

### WEIGHT

- Cisco specific & this router only
- Routes learned are 0
- Locally generated routes are 32768

### LOCAL_PREF

- Controls traffic Outgoing traffic.
- Only shared between iBGP peers, used to determine the exit. Higher is better.

### AS path

These read left to right like a book. This prefix was most recently from AS `7018`.

```plain
7018 701 15 i
            ^ this means IGP, and AS 15 has an IGP route for it like OSPF or EIGRP
```

### Next hop

1. eBGP, routers in different AS, destination outside AS.  The Next hop will be the advertising router.
1. iBGP, routers in same AS,      destination inside AS.   The Next hop will be the advertising router.
1. iBGP, routers in same AS,      destination outside AS.  The Next hop is the external peer who advertised the address.

... When the third option happens ...

- Advertise into the IGP the external links to the BGP peers.
- Tell the AS border router to change the next hop to its own IP address. (next-hop-self)

### Origin

IGP > EGP > Incomplete

- IGP means it came from an IGP. This is the highest preference.
- Incomplete means its likely a redistributed route

### MULTI_EXIT_DISC

- Controls incoming traffic.
- Lower is better

### ATOMIC_AGGREGATE

BGP can aggregate smaller prefixes into larger ones even if a smaller prefix comes from a different AS.

A router in AS 105 gets these prefixes from its peers.

```console
192.168.0.0/24 (123 204)
192.168.1.0/24 (123 205)
```

If the administrator chooses, they can aggregate this, but lose path information.

```console
192.168.0.0/23 (105) ATOMIC_AGGREGATE. 
```

Downstream peers can not remove this tag

### AGGREGATOR

AS and Router ID of the BGP router that did the atomic aggregation.

### COMMUNITY

Usually used to tag routes from a specific customer.

| Tag          | Purpose
| -------------|----------------------------------|
| INTERNET     | Default community.               |
| NO_EXPORT    | Do not share with other ASes     |
| NO_ADVERTISE | Do not share with other routers  |
| LOCAL_AS     | ????                             |

### ORIGINATOR_ID

For route reflectors
The origaning router puts its `Router_ID` here. If it sees this, it knows a loop as occured.

#### BGP by default will summarize

Use `no auto-summary`.

Using redistribute under BGP will make the resulting route show up with an orign code of `incomplete`.

#### Sending A default route

`neighbor A.B.C.D default-originate`


To get iBGP routers to update the next-hop to be themselves when advertising to other iBGP routers use

`neighbor A.B.C.D next-hop-self`


This makes it so other iBGP routers don't need reachability information for the physical link to the next AS.

#### BGP neighbor states

**Idle**

**Connect**

**Open Sent**

**Open Confirm**

**Active**

**Established**



#### Fixing Next-Hop issues

Just because the route shows up in `show ip bgp` doesn't mean it will install. BGP needs to be able to reach the next-hop.

1. Add the transit routes the IGP.
2. Use next-hop self in BGP.
3. Use a route-map to set the next hops.

## References

[RFC 4271: A Border Gateway Protocol 4 (BGP-4) | RFC Editor](https://www.rfc-editor.org/info/rfc4271/)

[The Network Times: Border Gateway Protocol – Finite State Machine (BGP-FSM)](https://nwktimes.blogspot.com/2017/07/border-gateway-protocol-finite-state.html)

[BGP Troubleshooting Diagram](https://coggle.it/diagram/WeBUMWgXiQABUtQG/t/bgp)

V. Jain and B. Edgeworth, *Troubleshooting BGP: A Practical Guide to Understanding and Troubleshooting BGP*, 1st ed. Indianapolis, IN: Cisco Press, 2016, ISBN 978-1-58714-464-6.

B. Edgeworth, R. Garza Rios, J. Gooley, and D. Hucaby, *CCNP and CCIE Enterprise Core ENCOR 350-401 Official Cert Guide*, 2nd ed. Indianapolis, IN: Cisco Press, 2023.

I. van Beijnum, *Internet Routing with BGP*, Kindle ed., Nov. 12, 2022, 269 pp.
