# Ceph

Sage Weil's 2007 PhD [thesis topic] at University of California, Santa Cruz.

[thesis topic]: /pdfs/weil-thesis.pdf

The service Ceph provides is **RADOS,** Reliable Autonomic Distributed Object Store.

RADOS provides four services: LIBRADOS, RADOSGW, RBD, and CEPHFS.

![RADOS](/images/ceph/rados-overview-ceph.png)

Image courtesy of [Sage Weil and Lisa]

[Sage Weil and Lisa]: /pdfs/weil_lisa12_slides.pdf

## OSD

**OSD** --- Object Storage Daemon

![ceph-osd](/images/ceph/ceph-osd.png)

- Manages the disks and data
- 1 per HDD or SSD
- Responsible for serving data
- Cooperatively peers, replicates, rebalances data
- 1-1000+ per cluster

## MON

**Mon** --- Monitor 

![ceph-mon](/images/ceph/ceph-mon.png)

- Central authority for authentication, data placement, policy
- Coordination point for all other cluster components
- 3-7 per cluster

## MGR

**Mgr** --- Manager

![ceph-mgr](/images/ceph/ceph-mgr.png)

- Host for pluggable management functions
- Metrics
  - throughput, disk usage, etc.
- 1 active, 1+ standby per cluster

## MDS

![ceph-mds](/images/ceph/ceph-mds.png)

- Manage file system namespace
- Store file system metadata in RADOS objects
  - File and directory metadata (names, inodes)
- Coordinate file access between clients
- Manage client cache consistency, locks, leases
- Not in dataplane
- 1s - 10s active, plus standbys

## RADOS cluster

![ceph-cluster](/images/ceph/rados-cluster.png)

## References

[Ceph: Reliable, Scalable, and High-Performance Distributed Storage - Sage Weil](/pdfs/weil-thesis.pdf)

[Ceph: Managing a distributed storage system at scale - Sage Weil & Lisa - Inktank](/pdfs/weil_lisa12_slides.pdf)

[CephFS: Architecture Introduction & New Features - Greg Farnum](/pdfs/10-Greg-CephFS.pdf)

[Ceph Tech Talk - Intro to Ceph - 2019-JUN-27 - Sage Weil - YouTube](https://www.youtube.com/watch?v=PmLPbrf-x9g)

[Ceph Tech Talk - Intro to Ceph - 2019-JUN-27 - Sage Weil - Slides](/pdfs/intro-to-ceph-sage-weil-2019.06.27.pdf)

