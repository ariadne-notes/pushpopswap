# BGP Tuning

1. Enabling TCP Path MTU discovery for every neighbor, to allow the TCP selecting optimum MSS size.
   Notice that this requires that no firewall blocks the ICMP unreachable messages used during the

   discovery process.

2. Tuning the router's ingress queue size to allow for successful absorption of large amount of
   TCP ACK messages. When a router starts replicating BGP UPDATES to its peers, every peer responds
   with TCP ACK message to normally every second segment sent (TCP Delayed ACK). The more peers router
   has, the higher will be the pressure on the ingress queue.


## References

[Verify Path MTU Discovery on Cisco IOS XR and BGP - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/transmission-control-protocol-tcp/217305-path-mtu-discovery-on-cisco-ios-xr-and.html)