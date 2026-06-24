# Boot with TFTP

This is meant for IOS or IOS-XE.

This was done in Packet Tracer, but the theory is the same.

If the IP is reachable, and the TFTP server has the image, it should work.

```console,editable
rommon 8 >
rommon 8 > IP_ADDRESS=192.168.12.2
rommon 9 > IP_SUBNET_MASK=255.255.255.252
rommon 10 > DEFAULT_GATEWAY=192.168.12.1
rommon 11 > TFTP_SERVER=10.0.0.1
rommon 12 > TFTP_FILE=c2900-universalk9-mz.SPA.155-3.M4a.bin
rommon 13 > set
PS1=rommon ! >
DEFAULT_GATEWAY=192.168.12.1
IP_ADDRESS=192.168.12.2
IP_SUBNET_MASK=255.255.255.252
TFTP_FILE=c2900-universalk9-mz.SPA.155-3.M4a.bin
TFTP_SERVER=10.0.0.1
rommon 14 > tftpdnld

[output omitted]

program flash location 0x61fc0000
program flash location 0x61fd0000
program flash location 0x61fe0000
program flash location 0x61ff0000
program flash location 0x62000000

rommon 23 > boot
System Bootstrap, Version 15.1(4)M4, RELEASE SOFTWARE (fc1)
Technical Support: http://www.cisco.com/techsupport
Copyright (c) 2010 by cisco Systems, Inc.
Total memory size = 512 MB - On-board = 512 MB, DIMM0 = 0 MB
CISCO2911/K9 platform with 524288 Kbytes of main memory
Main memory is configured to 72/-1(On-board/DIMM0) bit mode with ECC disabled

Readonly ROMMON initialized

program load complete, entry point: 0x80803000, size: 0x1b340
```

## References

[Cisco - Recover from Corrupt or Missing File Image or in ROMMON - System Management Configuration Guide, Cisco IOS XE Amsterdam 17.3.x - Catalyst 9400 Switches](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9400/software/release/17-3/configuration_guide/sys_mgmt/b_173_sys_mgmt_9400_cg/recover_from_corrupt_or_missing_file_image_or_in_rommon_mode.html)
