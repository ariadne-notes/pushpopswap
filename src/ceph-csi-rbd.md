# Ceph-CSI RBD

***RBD*** --- RADOS Block Device

- Virtual harddrive
- Meant for single pod dedicated writing, i.e. a database

**[Ceph-CSI]** --- Container Storage Interface

[Ceph-CSI]: https://github.com/ceph/ceph-csi

Necessary to get RBDs working on K8S.

## Prerequisites

These are performed on a Ceph node.

### Create the RBD pool

Also enable the `rbd` application on it

```bash
ceph osd pool create kubernetes 128
ceph osd pool application enable kubernetes rbd
rbd pool init kubernetes
```

### Create a client scoped to the pool

```bash
ceph auth get-or-create client.kubernetes \
  mon 'profile rbd' \
  osd 'profile rbd pool=kubernetes' \
  mgr 'profile rbd pool=kubernetes'
```

### Get a Ceph key for Kubernetes

```bash
ceph auth print-key client.kubernetes; echo
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
kubectl create namespace ceph-csi-rbd
```

### Populate the config files

- `ceph-csi-rbd/values.yaml`
- `ceph-csi-rbd/secret.values.yaml` add to `.gitignore`

```bash
echo 'ceph-csi-rbd/secret.values.yaml' >> .gitignore
```

```yaml,editable
#
# ceph-csi-rbd/values.yaml
#
# Tell the driver how to reach the Ceph cluster (msgr v2, port 3300).
csiConfig:
  - clusterID: "06184e1d-d46d-43fb-80ef-8b485942ca80"
    monitors:
      - "192.168.42.14:3300"
      - "192.168.42.15:3300"
      - "192.168.42.17:3300"

# Have the chart create the StorageClass.
storageClass:
  create: true
  name: csi-rbd-sc
  clusterID: "06184e1d-d46d-43fb-80ef-8b485942ca80"
  pool: kubernetes
  imageFeatures: "layering"   # safe default for kernel rbd (krbd)
  provisionerSecret: csi-rbd-secret
  controllerExpandSecret: csi-rbd-secret
  nodeStageSecret: csi-rbd-secret
  reclaimPolicy: Delete
  allowVolumeExpansion: true
  mountOptions: []
```

```yaml,editable
#
# ceph-csi-rbd/secret.values.yaml
#
# userID must NOT include the "client." prefix.
secret:
  create: true
  name: csi-rbd-secret
  userID: kubernetes
  userKey: <output of `ceph auth print-key client.kubernetes`>
```

### (Optional) Dry-run render

```bash
helm template ceph-csi-rbd ceph-csi/ceph-csi-rbd --version 3.17.0 \
  -n ceph-csi-rbd -f ceph-csi-rbd/values.yaml -f ceph-csi-rbd/secret.values.yaml
```

### Install the chart

```bash
helm install ceph-csi-rbd ceph-csi/ceph-csi-rbd --version 3.17.0 \
  --namespace ceph-csi-rbd \
  -f ceph-csi-rbd/values.yaml \
  -f ceph-csi-rbd/secret.values.yaml
```

## Verify

### Human Verification

```bash
# All nodeplugin (DaemonSet) + provisioner pods should be Running.
kubectl -n ceph-csi-rbd get pods

# StorageClass + Secret exist.
kubectl get sc csi-rbd-sc
kubectl -n ceph-csi-rbd get secret csi-rbd-secret
```

### LLM Verification

This part is pure vibe-coded LLM.

End-to-end test (provisions a real RBD image, mounts it, writes/reads, cleans up):

```bash
cat <<'EOF' | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata: { name: rbd-test-pvc, namespace: default }
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: csi-rbd-sc
  resources: { requests: { storage: 1Gi } }
---
apiVersion: v1
kind: Pod
metadata: { name: rbd-test, namespace: default }
spec:
  restartPolicy: Never
  containers:
  - name: c
    image: busybox:1.36
    command: ["sh","-c","echo ceph-ok > /data/test && cat /data/test && sleep 3"]
    volumeMounts: [{ name: v, mountPath: /data }]
  volumes:
  - name: v
    persistentVolumeClaim: { claimName: rbd-test-pvc }
EOF

kubectl -n default get pvc rbd-test-pvc          # -> Bound
kubectl -n default logs rbd-test                 # -> ceph-ok

# cleanup
kubectl -n default delete pod rbd-test
kubectl -n default delete pvc rbd-test-pvc
```

Using it: `csi-rbd-sc` is **not** the cluster default (`local-path` still is),
so request it explicitly with `storageClassName: csi-rbd-sc` in a PVC.
(See [Ceph-CSI CephFS](/ceph-csi-cephfs.md) for making a Ceph SC the cluster default.)

## Using

```bash
ceph df
rbd du -p kubernetes
```


## Uninstall

```bash
helm uninstall ceph-csi-rbd --namespace ceph-csi-rbd
kubectl delete namespace ceph-csi-rbd
```

## References

[GitHub - ceph/ceph-csi: CSI driver for Ceph · GitHub](https://github.com/ceph/ceph-csi)

