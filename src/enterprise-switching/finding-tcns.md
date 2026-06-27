# Finding TCNs

```console
switch# show spanning-tree vlan 20 detail | s Spanning
 VLAN0020 is executing the rstp compatible Spanning Tree protocol
  Bridge Identifier has priority 32768, sysid 20, address aabb.cc00.0100
  Configured hello time 2, max age 20, forward delay 15, transmit hold-count 6
  Current root has priority 8212, address aabb.cc00.0200
  Root port is 7 (Ethernet1/2), cost of root path is 200
  Topology change flag not set, detected flag not set
  Number of topology changes 8 last change occurred 01:07:20 ago   < ----
          from Ethernet1/2                                         < ----
  Times:  hold 1, topology change 35, notification 2
          hello 2, max age 20, forward delay 15 
  Timers: hello 0, topology change 0, notification 0, aging 300
```

## On the device

```console
switch# show spanning-tree vlan 20 detail | i VLAN|transitions 
 VLAN0020 is executing the rstp compatible Spanning Tree protocol
 Port 2 (Ethernet0/1) of VLAN0020 is designated forwarding 
   Number of transitions to forwarding state: 2
 Port 4 (Ethernet0/3) of VLAN0020 is alternate blocking 
   Number of transitions to forwarding state: 1
 Port 7 (Ethernet1/2) of VLAN0020 is root forwarding 
   Number of transitions to forwarding state: 2
 Port 8 (Ethernet1/3) of VLAN0020 is alternate blocking 
   Number of transitions to forwarding state: 0
 Port 12 (Ethernet2/3) of VLAN0020 is designated forwarding 
   Number of transitions to forwarding state: 2
```

## In the logs

```console
switch# show logging | i %LINK
*Jul  8 04:22:24.660: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:22:24.702: %LINK-3-UPDOWN: Interface Ethernet0/1, changed state to up
*Jul  8 04:22:24.715: %LINK-3-UPDOWN: Interface Ethernet0/2, changed state to up
*Jul  8 04:22:24.740: %LINK-3-UPDOWN: Interface Ethernet0/3, changed state to up
*Jul  8 04:22:24.769: %LINK-3-UPDOWN: Interface Ethernet1/0, changed state to up
*Jul  8 04:22:24.794: %LINK-3-UPDOWN: Interface Ethernet1/1, changed state to up
*Jul  8 04:22:24.819: %LINK-3-UPDOWN: Interface Ethernet1/2, changed state to up
*Jul  8 04:22:24.858: %LINK-3-UPDOWN: Interface Ethernet1/3, changed state to up
*Jul  8 04:22:24.888: %LINK-3-UPDOWN: Interface Ethernet2/0, changed state to up
*Jul  8 04:22:24.903: %LINK-3-UPDOWN: Interface Ethernet2/1, changed state to up
*Jul  8 04:22:24.927: %LINK-3-UPDOWN: Interface Ethernet2/2, changed state to up
*Jul  8 04:22:24.942: %LINK-3-UPDOWN: Interface Ethernet2/3, changed state to up
*Jul  8 04:22:24.965: %LINK-3-UPDOWN: Interface Ethernet3/0, changed state to up
*Jul  8 04:22:24.989: %LINK-3-UPDOWN: Interface Ethernet3/1, changed state to up
*Jul  8 04:22:25.013: %LINK-3-UPDOWN: Interface Ethernet3/2, changed state to up
*Jul  8 04:22:25.033: %LINK-3-UPDOWN: Interface Ethernet3/3, changed state to up
*Jul  8 04:22:26.685: %LINK-5-CHANGED: Interface Vlan1, changed state to administratively down
*Jul  8 04:24:58.575: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:25:06.138: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:26:59.260: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:27:11.982: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:28:43.205: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:31:09.988: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 04:33:53.881: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 04:34:02.140: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:00:52.111: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:00:59.749: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:03:48.728: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:03:54.050: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:07:04.113: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:07:06.713: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:07:31.603: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 05:07:36.280: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
*Jul  8 05:11:32.247: %LINK-3-UPDOWN: Interface Vlan10, changed state to up
*Jul  8 06:35:29.308: %LINK-5-CHANGED: Interface Ethernet0/0, changed state to administratively down
*Jul  8 06:35:43.756: %LINK-3-UPDOWN: Interface Ethernet0/0, changed state to up
```
