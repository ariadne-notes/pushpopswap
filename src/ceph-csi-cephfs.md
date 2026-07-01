# Ceph-CSI CephFS

**CephFS** --- Ceph Filesystem

- Directories
- Files
- Metadata
- Shared access

**[Ceph-CSI]** --- Container Storage Interface

[Ceph-CSI]: https://github.com/ceph/ceph-csi

Necessary to get CephFS working on K8S.

---

CephFS subvolumes live inside the existing `cephfs` filesystem under

`/volumes/csi/<subvol>/<uuid>/`

## Prerequisites

These commands are performed on a Ceph node.

### Create a client

```bash
ceph auth get-or-create client.k8s-cephfs mgr 'allow rw' mon 'allow r' mds 'allow rw' osd 'allow rw tag cephfs *=*'
```

### Create the CSI subvolume group

```bash
ceph fs subvolumegroup create cephfs csi
```

### Get a Ceph key for Kubernetes

```bash
ceph auth print-key client.k8s-cephfs; echo
```

## Install

On a machine with kubectl + the cluster kubeconfig

### Install Helm

```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Add the chart repo

```bash
helm repo add ceph-csi https://ceph.github.io/csi-charts
helm repo update ceph-csi
```

### Create the namespace

```bash
kubectl create namespace ceph-csi-cephfs
```

### Populate the config files

- `ceph-csi-cephfs/values.yaml`
- `ceph-csi-cephfs/secret.values.yaml` add to `.gitignore`

```bash
echo 'ceph-csi-cephfs/secret.values.yaml' >> .gitignore
```

```yaml,editable
#
# ceph-csi-cephfs/values.yaml
#
# ... If you see this
# libceph: mon0 (1)192.168.42.14:3300 socket closed (con state V1_BANNER)
# ceph: No mds server is up or the cluster is laggy
#
# Fix with this ...
nodeplugin:
  kernelmountoptions: "ms_mode=prefer-crc"

# How the driver reaches the Ceph cluster (msgr v2, port 3300).
csiConfig:
  - clusterID: "06184e1d-d46d-43fb-80ef-8b485942ca80"
    monitors:
      - "192.168.42.14:3300"
      - "192.168.42.15:3300"
      - "192.168.42.17:3300"

# Have the chart create the StorageClass (ReadWriteMany shared FS).
storageClass:
  create: true
  name: csi-cephfs-sc
  clusterID: "06184e1d-d46d-43fb-80ef-8b485942ca80"
  fsName: cephfs          # the existing CephFS filesystem name
  pool: ""                # empty => use the filesystem's default data pool
  provisionerSecret: csi-cephfs-secret
  controllerExpandSecret: csi-cephfs-secret
  nodeStageSecret: csi-cephfs-secret
  reclaimPolicy: Delete
  allowVolumeExpansion: true
```

```yaml,editable
#
# ceph-csi-cephfs/secret.values.yaml
#
# userID must NOT include the "client." prefix.
secret:
  create: true
  name: csi-cephfs-secret
  userID: k8s-cephfs
  userKey: <output of `ceph auth print-key client.k8s-cephfs`>
```

### (Optional) Dry-run render

```bash
helm template ceph-csi-cephfs ceph-csi/ceph-csi-cephfs --version 3.17.0 \
  -n ceph-csi-cephfs -f ceph-csi-cephfs/values.yaml -f ceph-csi-cephfs/secret.values.yaml
```

### Install the chart

```bash
helm install ceph-csi-cephfs ceph-csi/ceph-csi-cephfs --version 3.17.0 \
  --namespace ceph-csi-cephfs \
  -f ceph-csi-cephfs/values.yaml \
  -f ceph-csi-cephfs/secret.values.yaml
```

## Verify

### Human Verification

```bash
kubectl -n ceph-csi-cephfs get pods        # nodeplugin (DaemonSet) + provisioner Running
kubectl get sc csi-cephfs-sc
```

### LLM Verification

This part is pure vibe-coded LLM.

End-to-end **ReadWriteMany** test — two pods on different nodes share one volume:

```bash
cat <<'EOF' | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata: { name: cephfs-rwx-test, namespace: default }
spec:
  accessModes: ["ReadWriteMany"]
  storageClassName: csi-cephfs-sc
  resources: { requests: { storage: 1Gi } }
---
apiVersion: v1
kind: Pod
metadata: { name: cephfs-writer, namespace: default }
spec:
  restartPolicy: Never
  containers:
  - name: c
    image: busybox:1.36
    command: ["sh","-c","echo hello-from-writer > /data/shared.txt; sleep 120"]
    volumeMounts: [{ name: v, mountPath: /data }]
  volumes:
  - { name: v, persistentVolumeClaim: { claimName: cephfs-rwx-test } }
---
apiVersion: v1
kind: Pod
metadata: { name: cephfs-reader, namespace: default }
spec:
  restartPolicy: Never
  containers:
  - name: c
    image: busybox:1.36
    command: ["sh","-c","for i in $(seq 1 30); do [ -f /data/shared.txt ] && cat /data/shared.txt && exit 0; sleep 2; done; exit 1"]
    volumeMounts: [{ name: v, mountPath: /data }]
  volumes:
  - { name: v, persistentVolumeClaim: { claimName: cephfs-rwx-test } }
EOF

kubectl -n default get pvc cephfs-rwx-test     # -> Bound (RWX)
kubectl -n default logs cephfs-reader          # -> hello-from-writer

# cleanup
kubectl -n default delete pod cephfs-writer cephfs-reader
kubectl -n default delete pvc cephfs-rwx-test
```

## Make it the default StorageClass

So PVCs never need `storageClassName`:

```bash
# demote whatever is currently default (e.g. csi-rbd-sc or local-path)
kubectl patch storageclass csi-rbd-sc \
  -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
# promote cephfs
kubectl patch storageclass csi-cephfs-sc \
  -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## Remove local-storage from K3S

Do this on all the control nodes.

```bash
root@k3s-control-tiny-2:/etc/rancher/k3s# cat config.yaml 
disable:
    - local-storage
```


## Uninstall

```bash
helm uninstall ceph-csi-cephfs --namespace ceph-csi-cephfs
kubectl delete namespace ceph-csi-cephfs
# (the 'csi' subvolume group and any subvolumes remain in Ceph until removed)
```

## References

[README - ceph-csi/charts/ceph-csi-cephfs GitHub](https://github.com/ceph/ceph-csi/blob/devel/charts/ceph-csi-cephfs/README.md)
