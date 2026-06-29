# Reclaim Space from Ceph for LVM

Intended when Ceph uses an entire disk for an OSD.

Useful for homelab [SFF PCs] running Proxmox.

[SFF PCs]: https://en.wikipedia.org/wiki/Small_form_factor_PC

## Show the current setup of the block device

```
lsblk
ceph osd tree
```

## Migrate data from a Ceph OSD

```
ceph osd out osd.1
```

## Check if an OSD can be removed, then destroyed

```
while ! ceph osd safe-to-destroy osd.1 ; do sleep 10 ; done
```

## Stop the local service -- this also marks the OSD as down

```
systemctl stop ceph-osd@1.service
```

## Destroy the OSD -- keeps the ID reserved so it can be reused later

```
ceph osd destroy 1 --yes-i-really-mean-it
```

## Remove the Ceph volume

```
lvremove pve/ceph
```

## Create a Proxmox Data LVM-thin volume, size to 200G

```
lvcreate --size 200G --thin --name data pve
```

## Create a Ceph volume, using the remaining space

```
lvcreate --extents 100%FREE --name ceph pve
```

## Get a Ceph Key

```
ceph auth get client.bootstrap-osd > /var/lib/ceph/bootstrap-osd/ceph.keyring
```

## Put Ceph onto the LV

```
ceph-volume lvm create --osd-id 1 --data pve/ceph
```