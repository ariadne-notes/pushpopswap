# with Tags

- Tag EIGRP as 100
- TAG OSPF as 1
- Route maps should take the form DENY -> PERMIT.
- Routes are tagged when they are advertised.

Route tags appear on-the-wire and can be read by other routers.

`ospf.lsa.asext.extrttag == 100`

In this example, EIGRP becomes a Type-5 OSPF update, with a route-tag of 100. If we look for these tags can exclude them in redistribution updates.

```console,editable
route-map RM_OSPF_INTO_EIGRP deny 10
 description previously tagged EIGRP traffic
 match tag 100
!
route-map RM_OSPF_INTO_EIGRP permit 20
 match source-protocol ospf 1 
 set tag 1
!
route-map RM_EIGRP_INTO_OSPF deny 10
 description previously tagged OSPF traffic
 match tag 1
!
route-map RM_EIGRP_INTO_OSPF permit 20
 match source-protocol eigrp 100
 set tag 100
!
router eigrp 100
 redistribute ospf 1 metric 1000000 100 255 1 1500 route-map RM_OSPF_INTO_EIGRP
!
router ospf 1
 redistribute eigrp 100 subnets route-map RM_EIGRP_INTO_OSPF
```

## References

[Configure Routing Protocol Redistribution - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/8606-redist.html)
