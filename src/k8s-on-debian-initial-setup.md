# Kubernetes on Debian - Initial Setup

An older provisioning method, using [MetalLB].

I add my nodes to DNS so everything resolves nicely.

- k8s-tiny-1-control
- k8s-tiny-2-control
- k8s-tiny-3-control
- k8s-tiny-4-worker
- k8s-tiny-5-worker
- k8s-tiny-6-worker
- k8s-tiny-7-worker
- k8s-agatha-worker

[MetalLB]: https://metallb.io/

## Turn off swap

```console,editable
sudo swapoff -a

sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

## Edit sysctl variables

```console,editable
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-k8s.conf
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
```

## Modprobe for containerd

```console,editable
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF
```


```console,editable
sudo modprobe overlay
sudo modprobe br_netfilter
sudo sysctl --system
```

## Install containerd

### Update APT

```console,editable
sudo apt-get update
```

```console,editable
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### Add Docker's GPG Keys

```console,editable
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### Add Repo

```console,editable
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Add Containerd. Mark as do-not-upgrade

```console,editable
sudo apt update
sudo apt install containerd.io -y
```

```console,editable
sudo apt-mark hold containerd.io
```

### Modify containerd so it uses cgroups with systemd

```console,editable
containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
```

```console,editable
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
```

## Enable and restart containerd

```console,editable
sudo systemctl restart containerd

sudo systemctl enable containerd
```

### Enable Kubernetes repo

```console,editable
sudo apt install gnupg gnupg2 curl software-properties-common -y
```

This is version'd and pinned to 1.30

```console,editable
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

```console,editable
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### Install Kubelet, Kubectl, and Kubeadm ... Mark as do-not-upgrade

```console,editable
sudo apt update

sudo apt install kubelet kubeadm kubectl -y
```

```console,editable
sudo apt-mark hold kubelet kubeadm kubectl
```


### Add Control Plane Node

**On a control node**

Put the active PKI certificates into a `Secret` that can be accessed with a certificate key. All control nodes need matching PKI certs (?).

```console,editable
sudo kubeadm init phase upload-certs --upload-certs
```
Copy the very long key

Get a new token
```console,editable
sudo kubeadm token create --print-join-command
```

**Build the Command to add the new control node**

Use the following on the new node

```console,editable
sudo kubeadm join k8s-master:6443 --token <the-token>\
  --discovery-token-ca-cert-hash sha256:<the-sha256>\
  --certificate-key <the-key>\
  --control-plane
```

### Add worker Node

```console,editable
sudo kubeadm join k8s-master:6443 --token <the-token> \
  --discovery-token-ca-cert-hash sha256:<the-sha256>
```

### Flannel Setup

```console,editable
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```


### Turn on Metal-LB

##### Deploy Manifests

```console,editable
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.10/config/manifests/metallb-native.yaml
```

##### Config

```console,editable
cat <<EOF > ~/my-metallb.yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: vlan-42-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.42.64-192.168.42.95
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: vlan-42-l2-advertisement
  namespace: metallb-system
spec:
  ipAddressPools:
  - vlan-42-pool
EOF
```

wait a few moments after deploying the manifests above

```console,editable
ariadne@k8s-control-tiny-1:~$ kubectl apply -f ~/my-metallb.yaml
ipaddresspool.metallb.io/vlan-42-pool created
l2advertisement.metallb.io/vlan-42-l2-advertisement created
```

Both of these need to be created for it to work. It can be two files... `kubectl` didn't tell me the syntax was wrong for one of the stanzas.

## References

[Install Docker Engine on Ubuntu | Docker Docs](https://docs.docker.com/engine/install/ubuntu/)
