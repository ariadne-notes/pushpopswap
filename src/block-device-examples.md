# Block Device Examples

## Windows 10

NTFS refers to logical blocks as **clusters**.

On this NTFS volume, each cluster is 4 KiB.

```console
PS C:\Windows\system32> fsutil fsinfo ntfsinfo C:
NTFS Volume Serial Number :        0x2abe26bebe268285
NTFS Version      :                3.1
LFS Version       :                2.0
Total Sectors     :                1,759,307,063  (838.9 GB)
Total Clusters    :                  219,913,382  (838.9 GB)
Free Clusters     :                   75,517,627  (288.1 GB)
Total Reserved Clusters :                  9,087  ( 35.5 MB)
Reserved For Storage Reserve :                 0  (  0.0 KB)
Bytes Per Sector  :                512
Bytes Per Physical Sector :        4096
Bytes Per Cluster :                4096
Bytes Per FileRecord Segment    :  1024
Clusters Per FileRecord Segment :  0
Mft Valid Data Length :            2.11 GB
Mft Start Lcn  :                   0x00000000000c0000
Mft2 Start Lcn :                   0x0000000000000002
Mft Zone Start :                   0x00000000089d4080
Mft Zone End   :                   0x00000000089e08a0
MFT Zone Size  :                   200.13 MB
Max Device Trim Extent Count :     256
Max Device Trim Byte Count :       0xffffffff
Max Volume Trim Extent Count :     62
Max Volume Trim Byte Count :       0x40000000
Resource Manager Identifier :      1D7A365A-EDCE-11EF-AD26-38FC98203B3A
```

## Debian Trixie

Linux has lots of potential filesystems and filesystems can have different block sizes.

Finding the disk.

```
root@tesseract:/home/ariadne# lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0   1.1M  1 loop /snap/avahi/814
loop1    7:1    0   1.1M  1 loop /snap/avahi/587
loop2    7:2    0  55.5M  1 loop /snap/core18/2979
loop3    7:3    0  55.5M  1 loop /snap/core18/2999
loop4    7:4    0  66.8M  1 loop /snap/core24/1587
loop5    7:5    0  66.8M  1 loop /snap/core24/1643
loop6    7:6    0 174.4M  1 loop /snap/postman/360
loop7    7:7    0 174.5M  1 loop /snap/postman/362
loop9    7:9    0  50.1M  1 loop /snap/snapd/27406
loop10   7:10   0  50.1M  1 loop /snap/snapd/27591
sda      8:0    0    32G  0 disk 
├─sda1   8:1    0    31G  0 part /
├─sda2   8:2    0     1K  0 part 
└─sda5   8:5    0   975M  0 part [SWAP]
```

Querying the disk directly for its logical sector size.

```
root@tesseract:/home/ariadne# blockdev --getss /dev/sda
512
```

Querying the filesystem.

This ext4 filesystem uses 4096-byte filesystem blocks.

```
root@tesseract:/home/ariadne# tune2fs -l /dev/sda1
tune2fs 1.47.0 (5-Feb-2023)
Filesystem volume name:   <none>
Last mounted on:          /
Filesystem UUID:          5a82dda3-b341-4602-9523-cd51db6981ee
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize metadata_csum
Filesystem flags:         signed_directory_hash 
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              2035824
Block count:              8138240
Reserved block count:     406912
Overhead clusters:        172853
Free blocks:              1083226
Free inodes:              1378863
First block:              0
Block size:               4096
Fragment size:            4096
Group descriptor size:    64
Reserved GDT blocks:      1024
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8176
Inode blocks per group:   511
Flex block group size:    16
Filesystem created:       Tue Jul 18 19:42:50 2023
Last mount time:          Fri Jul 24 14:14:51 2026
Last write time:          Tue Jul 28 17:00:06 2026
Mount count:              116
Maximum mount count:      -1
Last checked:             Tue Jul 18 19:42:50 2023
Check interval:           0 (<none>)
Lifetime writes:          744 GB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:               256
Required extra isize:     32
Desired extra isize:      32
Journal inode:            8
Default directory hash:   half_md4
Directory Hash Seed:      65bf92d6-f469-47de-a71d-e4f821da4415
Journal backup:           inode blocks
Checksum type:            crc32c
Checksum:                 0xff19412a
```

## References

[NTFS overview | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview)

[tune2fs(8) - Linux manual page](https://www.man7.org/linux/man-pages/man8/tune2fs.8.html)
