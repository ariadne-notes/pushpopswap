# SD-Wan Example Changing Site ID

This is 17.18.02 on a 8000v

Control plane is 20.18.4

```
*Sep 21 20:56:32.533: %DMI-5-CONFIG_I: R0/0: dmiauthd: Configured from NETCONF/RESTCONF by vmanage-admin, transaction-id 943
*Sep 21 20:56:32.613: %OMPD-3-PEER_STATE_INIT: R0/0: ompd: vSmart peer 100.0.0.101 state changed to Init
*Sep 21 20:56:32.614: %OMPD-6-NUMBER_OF_VSMARTS: R0/0: ompd: Number of vSmarts connected : 0
*Sep 21 20:56:32.744: %OMPD-3-STATE_DOWN: R0/0: ompd: Operational state changed to DOWN
*Sep 21 20:56:32.882: %SYS-5-CONFIG_P: Configured programmatically by process IOSD chasfs task from console as sdwan on console
*Sep 21 20:56:32.995: %SYS-5-CONFIG_P: Configured programmatically by process IOSP-Server VTY Process from console as vmanage-admin on vty4294966926
*Sep 21 20:56:32.839: %OMPD-5-STATE_UP: R0/0: ompd: Operational state changed to UP
*Sep 21 20:56:32.862: %VDAEMON-6-SITE_ID_CHANGED: R0/0: vdaemon: Site id changed from 2 to 1 via config
*Sep 21 20:56:32.862: %VDAEMON-5-CONTROL_CONN_STATE_CHANGE: R0/0: vdaemon: Control connection to vBond :: (TLOC: 172.16.0.201/12346/biz-internet via biz-internet) is DOWN
*Sep 21 20:56:32.875: %VDAEMON-3-NO_ACTIVE_VSMART: R0/0: vdaemon: Device does not have an active connection to SD-WAN Controller
*Sep 21 20:56:33.622: %SYS-5-CONFIG_P: Configured programmatically by process IOSD chasfs task from console as sdwan on console
*Sep 21 20:56:33.869: %VDAEMON-5-CONTROL_CONN_STATE_CHANGE: R0/0: vdaemon: Control connection to vSmart 100.0.0.101 (TLOC: 172.16.0.101/12346/default via biz-internet) is UP
*Sep 21 20:56:33.870: %OMPD-3-PEER_STATE_INIT: R0/0: ompd: vSmart peer 100.0.0.101 state changed to Init
*Sep 21 20:56:35.590: %DMI-5-AUTH_PASSED: R0/0: dmiauthd: User 'vmanage-admin' authenticated successfully from 100.0.0.1:49720  for netconf over ssh. External groups:
*Sep 21 20:56:35.877: %OMPD-6-PEER_STATE_HANDSHAKE: R0/0: ompd: vSmart peer 100.0.0.101 state changed to Handshake
*Sep 21 20:56:35.887: %OMPD-5-PEER_STATE_UP: R0/0: ompd: vSmart peer 100.0.0.101 state changed to Up
*Sep 21 20:56:35.887: %OMPD-6-NUMBER_OF_VSMARTS: R0/0: ompd: Number of vSmarts connected : 1
```