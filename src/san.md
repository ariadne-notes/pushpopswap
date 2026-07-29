# SAN

A network to share block devices.

A block device must be formated with a file-system to become usable to an OS.

# Block Device Theory

Block devices provide writable, direct access, block storage.

"Give me the data in block 3"

"Block 3 contains these 4096 bytes"

```text
┌───────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┐
│   0   │   1   │   2   │   3   │   4   │   5   │   6   │   7   │
├───────┼───────┼───────┼───────┼───────┼───────┼───────┼───────┤
│   8   │   9   │  10   │  11   │  12   │  13   │  14   │  15   │
└───────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┘
```

How many blocks does a 1 TB drive with 4 KiB blocks have?

\\(\frac{1 TB}{4 KiB} = 244\ 140\ 625\ \\), or about 244 million addressable blocks.

## SAN Theory

A SAN provides virtual block devices other computers can use as if the block device was local.

A client would like to mount a block device over the network.

The SAN exports a 8 TB LUN, with an IQN target of:

`iqn.2026-07.com.pushpopswap:storage.disk1.reflection`

With nice software the SAN doesn't need all the space on the 16TB SAS disk to do this.

```text
            SAN                                                Client           
┌───────────────────────────┐                   ┌──────────────────────────────┐
│┌────────────┐       ┌─────┤   iSCSI over IP   ├─────┐       ┌───────────────┐│
││ IQN Target ├───────┤ NIC ├───────────────────┤ NIC ├───────┤ IQN Initiator ││
│└─┬──────────┘ iSCSI └─────┤                   ├─────┘ iSCSI └──────────────┬┘│
│  │ SCSI                   │                   │                       SCSI │ │
│┌─┴──────┐                 │                   │                    ┌───────┴┐│
││ Kernel │                 │                   │                    │ Kernel ││
│└─┬──────┘                 │                   │                    └───────┬┘│
│  │ SCSI                   │                   │                       SCSI │ │
│┌─┴───┐                    │                   │  ┌─────────────────────────┴┐│
││ HBA │                    │                   │  │ Virtual SCSI Disk - 8 TB ││
│└─┬───┘                    │                   │  └──────────────────────────┘│
│  │    ┌────────────────┐  │                   └──────────────────────────────┘
│  └────┤SAS Disk   16 TB│  │                                                   
│ SAS   └────────────────┘  │                                                   
└───────────────────────────┘                                                   
```

## Terms

**SAN** --- Storage Area Network

**Block**

The smallest unit of logical direct access storage. The kernel can make a request for a block, and will get a group of bytes, usually 512 bytes or 4096 bytes.

**Sector**

The smallest unit of physical direct access storage. The kernel can make a request for a sector, and will get a group of bytes, usually 512 bytes or 4096 bytes.

**Block Storage**

- Provides [random access], to lots and lots of data
  - Hard Disk Drives, or [HDDs]
  - Solid State Drives, or [SSDs]
  
**SCSI** --- Small Computer Systems Interface

- Spoken by the [HBA], to talk to a block device
- A block device access protocol, contrast with [SATA].

**iSCSI** --- Internet SCSI

- Lets computers talk SCSI to each other over a network

**LUN** --- Logical Unit Number

- Points to a disk in a SCSI setup

**IQN** --- iSCI Qualified Name

> To generate names of this type, the person or organization generating
> the name must own a registered domain name.

- Globally unique identifier for an iSCSI device
- `iqn.<year-month>.<reversed-domain>:<locally-chosen-name>`
  - `iqn.2026-07.com.pushpopswap:storage.disk1.reflection`

**Target**

- Storage server, or a specific IQN on the storage server

**HBA** --- Host Bus Adapter

- Connects to the [mainboard]
- Creates a network for SCSI devices

[HBA]: https://en.wikipedia.org/wiki/Host_adapter
[SATA]: https://en.wikipedia.org/wiki/SATA
[mainboard]: https://en.wikipedia.org/wiki/Motherboard
[random access]: https://en.wikipedia.org/wiki/Random_access
[HDDs]: https://en.wikipedia.org/wiki/Hard_disk_drive
[SSDs]: https://en.wikipedia.org/wiki/Solid-state_drive

## References

[Storage area network - Wikipedia](https://en.wikipedia.org/wiki/Storage_area_network)

[RFC 7143: Internet Small Computer System Interface (iSCSI) Protocol (Consolidated) | RFC Editor](https://www.rfc-editor.org/info/rfc7143)

[Numbat - scientific calculator](https://numbat.dev/)

[NTFS overview | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview)
