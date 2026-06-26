# Add Cephfs to Debian

Ceph is a distributed filesystem. Here I'm adding client filesystem access to a Docker host so I can abstract away the local storage.

This will allow me to later start and stop compute loads on other nodes.

## Requirements

- `ceph-common`, the APT package
  - version should match the cluster
- `/etc/ceph/ceph.conf`, how to access the cluster
- `/etc/ceph/ceph.keyring`, credentials for the cluster
- `/mnt/docker-on-ceph`, the mount point
- `/etc/fstab`, includes the the mount point

This assumes Ceph is working.

My Ceph version is 19 -- that's Squid.

I use `sudo su -` before all of this.

### Add the repo

```text,editable
wget -q -O- 'https://download.ceph.com/keys/release.asc' | apt-key add -
echo deb https://download.ceph.com/debian-squid/ $(lsb_release -sc) main \
    | tee /etc/apt/sources.list.d/ceph.list
```

### Update and install

```text,editable
apt update && apt install ceph-common
```

### Request permissions

On the cluster, using Ceph, request permissions for the *would-be* mount point.

```text,editable
ceph fs authorize cephfs client.grove /docker rw
```

### Get the key

```text,editable
ceph auth get-or-create client.grove
```

Mine looks like this.

```text,editable
[client.grove]
        key = uDEyQEqHajxXWCRU44HEhHMkvVzB2mDHoe3qfV==
        caps mds = "allow rw fsname=cephfs path=/docker"
        caps mon = "allow r fsname=cephfs"
        caps osd = "allow rw tag cephfs data=cephfs"
```

### Copy key to the client

It goes here.

`/etc/ceph/ceph.keyring`

### Modify fstab

This is inside of `/etc/fstab`

This is `TAB` spaced, with six columns.

Remember to change the `name=` to something else.

```text,editable
:/docker        /mnt/docker-on-ceph     ceph   name=orchard,_netdev,noatime 0       0
```

### Make the mount point

```text,editable
mkdir /mnt/docker-on-ceph
```

### Copy the ceph.conf file from the cluster

I do this by hand with


```console,editable
cat /etc/pve/ceph.conf
```

### Mount

```console,editable
mount /mnt/docker-on-ceph
```

## References

[File System Guide | Red Hat Ceph Storage](https://docs.redhat.com/en/documentation/red_hat_ceph_storage/8/html-single/file_system_guide/creating-client-users-for-a-ceph-file-system_fs)
