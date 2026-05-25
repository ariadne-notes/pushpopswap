# DAI

## Minimum config


```console
ip dhcp snooping vlan 10
ip arp inspection vlan 10
ip arp inspection validate src-mac dst-mac ip 
!
! Ports
!
interface GigabitEthernet0/1
 description towards DHCP server
 ip arp inspection trust
 ip dhcp snooping trust
```

## Validation


```console
access-1# show ip dhcp snooping binding 
MacAddress          IpAddress        Lease(sec)  Type           VLAN  Interface
------------------  ---------------  ----------  -------------  ----  --------------------
52:54:00:0D:65:73   10.10.10.102     80574       dhcp-snooping   10    GigabitEthernet0/0
Total number of bindings: 1

access-1# show ip arp inspection 

Source Mac Validation      : Enabled
Destination Mac Validation : Enabled
IP Address Validation      : Enabled

 Vlan     Configuration    Operation   ACL Match          Static ACL
 ----     -------------    ---------   ---------          ----------
   10     Enabled          Active                         

 Vlan     ACL Logging      DHCP Logging      Probe Logging
 ----     -----------      ------------      -------------
   10     Deny             Deny              Off          

 Vlan      Forwarded        Dropped     DHCP Drops      ACL Drops
 ----      ---------        -------     ----------      ---------
   10            134              0              0              0

 Vlan   DHCP Permits    ACL Permits  Probe Permits   Source MAC Failures
 ----   ------------    -----------  -------------   -------------------
   10             48              0              0                     0

 Vlan   Dest MAC Failures   IP Validation Failures   Invalid Protocol Data
 ----   -----------------   ----------------------   ---------------------
          
 Vlan   Dest MAC Failures   IP Validation Failures   Invalid Protocol Data
 ----   -----------------   ----------------------   ---------------------
   10                   0                        0                       0

```

## Reference

[Cisco - Dynamic ARP Inspection](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/dynamic-arp-inspection.pdf)

[Practical Networking - Gratuitous ARP](https://www.practicalnetworking.net/series/arp/gratuitous-arp/)
