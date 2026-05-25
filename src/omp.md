# OMP

* **OMP routes:** AKA, vRoutes, AKA Site prefixes. `10.0.0.0/24`.

* **TLOC:** A tunnel endpoint. A tunnel endpoint is a 3-tuple (System IP, Color, Encapsulation)

* **Full Mesh:** Each TLOC will attempt a full-mesh connection with every other TLOC.

n*(n-1)/2


* Service routes: Firewalls, IPS, and VPN labels.

**TLOC Routes**

Works like a BGP route, with a next-hop atttribute.
* System IP of the OMP speaker who owns the route
* Color (mpls, metro-ethernet)
* Encapsulation (IPsec or GRE)

## References

[LAB 1 - Hub-and-Spoke - Restricting spoke-to-spoke tunnels | NetworkAcademy.IO](https://www.networkacademy.io/ccie-enterprise/sdwan/lab1-restricting-spoke-to-spoke-tunnels)