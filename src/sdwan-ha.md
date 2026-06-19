# SDWAN HA

SDWAN is a horizontally scaling solution. Just add more nodes.

## Managers

Managers can be deployed in these numbers:

1, 3, 6.

Each set of managers is a cluster. A cluster provides HA.

For redundancy, use multiple clusters.

## Disaster Recovery

[Detailed requirements to implement disaster recovery](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/ha-scaling/ios-xe-17/high-availability-book-xe/m-disaster-recovery.html).

It's recommended to keep another cluster available as a backup.

The Managers can sync over the datacenter interconnect.

![sdwan-disaster-recovery](./images/cisco/cisco-sdwan-disaster-recovery.avif)

Image courtesy of 
[Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/ha-scaling/ios-xe-17/high-availability-book-xe/m-disaster-recovery.html).

## References

[Cisco Catalyst SD-WAN High Availability Configuration Guide, Cisco IOS XE Catalyst SD-WAN Release 17.x - Disaster Recovery Cisco SD-WAN - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/ha-scaling/ios-xe-17/high-availability-book-xe/m-disaster-recovery.html)
