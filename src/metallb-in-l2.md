# MetalLB in L2

Kubernetes architecture requires a `LoadBalancer`.

MetalLB can be deployed as a `LoadBalancer` in L2 mode, which is good for bare metal homelab style environments.

## Example Deployment

```
deployment/controller   1 replica
daemonset/speaker       7 pods   
```

## Theory

**Controller**

- Watches for `LoadBalancer` request
- Picks a free IP out of the pool
- Assigns it to the Service as its EXTERNAL-IP

**Speaker**

- bound to `hostNetwork`
- Runs stateless hash
- First on the list advertise the MetalLB IPs

## L2 Operation

**Is the service running?**

```console,editable
kubectl get l2advertisements -n metallb-system
```

**What services are consuming an IP?**

```console,editable
kubectl get svc -A --field-selector spec.type=LoadBalancer
```

## How the L2 leader election works

- Stateless

1. Creates a list of all speakers could announce the IP.
2. Sorts the list with a specific hash.
3. First speaker on the list announces the IP (responds to ARP).

## References

[metallb.io/](<https://metallb.io/>)
