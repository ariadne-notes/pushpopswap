# Config
```
interface GigabitEthernet0/0
 switchport access vlan 10
 switchport mode access
 switchport port-security maximum 2
 switchport port-security aging time 10
 switchport port-security
 negotiation auto
 spanning-tree portfast edge
```

# Validation

This is the primary table for this feature. This table is used to populate the mac address table.
```
switch# show port-security address
               Secure Mac Address Table
-----------------------------------------------------------------------------
Vlan    Mac Address       Type                          Ports   Remaining Age
                                                                   (mins)    
----    -----------       ----                          -----   -------------
  10    5254.000d.6573    SecureDynamic                 Gi0/0       10
-----------------------------------------------------------------------------
```


Scraping the mac-address table for things programmed in by the port security feature.
```
switch# show mac address-table secure 
          Mac Address Table
-------------------------------------------

Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  10    5254.000d.6573    STATIC      Gi0/0
```

Asking port security how many ports are currently controlled by the feature.

```
switch #show port-security 
Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action
                (Count)       (Count)          (Count)
---------------------------------------------------------------------------
      Gi0/0              2            1                  0         Shutdown
---------------------------------------------------------------------------
Total Addresses in System (excluding one mac per port)     : 0
Max Addresses limit in System (excluding one mac per port) : 4096
```


# References
[Cisco - Port Security - IOS-XE 17.14 on the C9300](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-14/configuration_guide/sec/b_1714_sec_9300_cg/port_security.pdf)

----

v1.1 - Last edit 5-May-2025

This work is dedicated to the Public Domain via [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
