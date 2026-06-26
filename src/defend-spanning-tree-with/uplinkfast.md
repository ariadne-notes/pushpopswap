# with UplinkFast

An older feature, doesn't work with rapid-pvst, or MST.

- Bypasses listening and learning states.
- Blasts fake traffic out the UplinkFast Port to program the upstream CAM tables.
- Only recommended on the access layer.

## Config

```console
spanning-tree uplinkfast 
```

## Validation

Port costs are raised by 3000.

```console
access# show spanning-tree 

VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    24577
             Address     5254.00bf.ea62
             Cost        3004
             Port        1 (GigabitEthernet0/0)
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    49153  (priority 49152 sys-id-ext 1)
             Address     5254.007a.bd39
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  15  sec
  Uplinkfast enabled

Interface           Role Sts Cost      Prio.Nbr Type
------------------- ---- --- --------- -------- --------------------------------
Gi0/0               Root FWD 3004      128.1    P2p 
Gi0/1               Altn BLK 3004      128.2    P2p 

!
! After shutting down the port in CML
!
*Jun  4 02:41:34.557: %SPANTREE_FAST-7-PORT_FWD_UPLINK: VLAN0001 GigabitEthernet0/1 moved to Forwarding (UplinkFast).
```

## References

[Layer 2 Configuration Guide, Cisco IOS XE 17.13.x (Catalyst 9300 Switches) - Configuring Optional Spanning-Tree Features Cisco Catalyst 9300 Series Switches - Cisco](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/lyr2/b_1713_lyr2_9300_cg/configuring_optional_spanning_tree_features.html)
