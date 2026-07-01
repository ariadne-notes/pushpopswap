# Kubectl

This is very version sensitive

## Get the binary

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s v1.34.4)/bin/linux/amd64/kubectl"
```

## Install the binary

```
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

```console,editable
kubectl version
```

```console,editable
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
kubectl get deployments -A
kubectl get pods -A
kubectl get services
kubectl get services -A
kubectl get EndpointSlice -A
kubectl get configmaps -A
kubectl get componentstatuses -A
```

## References

[Install and Set Up kubectl on Linux | Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)