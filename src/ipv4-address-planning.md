# IPv4 Address Planning

1. Define the requirements
2. Plan the ipv4 range
3. Document the plan

## Example standards

* Statically assign network infrastructure
* User devices are DHCP.
* `.1` is the default gateway
* Third Octet: The vlan ID. `10.0.150.0/24` is vlan 150.
* Forth Octet: Address Assignment type. 1 to 99 are static IPs, 100-200 are DHCP.

## Best Practices

* Address internal hosts with RFC1918 addresses.

### Recommended Networks

| Purpose                | Size  |
| ---------------------- | ----- |
| User Devices           | `/24` |
| Phones                 | `/24` |
| Access Control         | `/24` |
| Video Conferencing     | `/24` |
| Point to Point Subnet  | `/31` |
| Loopback Subnet        | `/32` |
| Wireless APs           |   -   |

## References

[IPv4 Interactive Map - bgp.tools](https://map.bgp.tools/)