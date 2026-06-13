# Private VLANs

Default port type on a Catalyst ME3400 is UNI (User Network Interface)

UNI ports can only send traffic to NNI ports in the same vlan. The default UNI mode is isolated.

`show vlan uni-vlan type`

`show port-type`

You can set the uni-vlan type with this command:

```console,editable
vlan 100
  uni-vlan community
```

This example uses a ME3400.

## Config Example

```console,editable
vlan 100
private-vlan primary
private-vlan association 1000,2000,3000
!
vlan 1000
private-vlan isolated
!
vlan 2000
private-vlan community
!
vlan 3000
private-vlan community
!
!
interface FastEthernet0/2
!
! Tell it its a private-vlan host
! Tell it which private VLANs its in
!
 switchport private-vlan host-association 100 1000
 switchport mode private-vlan host
 duplex full
end
!
interface GigabitEthernet0/1
 port-type nni
 switchport private-vlan mapping 100 1000,2000,3000
 switchport mode private-vlan promiscuous
 speed nonegotiate
end

vlan 100
 private-vlan association add ... this doesn't work at all!!
```

## Verification

```console
switch #show vlan private-vlan 

Primary Secondary Type              Ports
------- --------- ----------------- ------------------------------------------
100     1000      isolated          Fa0/1, Fa0/2, Gi0/1
100     2000      community         Fa0/3, Fa0/4, Gi0/1
100     3000      community         Gi0/1

SW1#show vlan private-vlan type 

Vlan Type
---- -----------------
100  primary          
1000 isolated         
2000 community        
3000 community  
```
