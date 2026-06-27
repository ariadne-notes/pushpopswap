# BGP Route Reflectors

**RR** --- Route Reflector

**Cluster**

A route reflector and its clients.

**Cluster List**

The sequence of `Cluster_IDs` through which the route has passed. If a router sees its own Router_ID a loop has occurred.

**Originator_ID**

- The router that introduced the route into the AS.
- Used to prevent loops between clients.

## Route reflection rules


A RR will not change any attributes of a route.

1. If a route is learned from a non-client iBGP peer, reflect to clients
1. If a route is learned from a client, reflect to everyone
1. If a route is learned from a eBGP peer, reflect to everyone

## Notes

- Route reflectors can be clients of each other. This causes extra overhead.
- If multiple route reflectors server the same cluster they should have the same `Cluster_ID`.

## BGP route reflectors loop prevention

- If a BGP router that receives a route from an iBGP neighbor in the incoming update detects the presence of its own Router-ID in the Originator-ID attribute it will reject the update.
- If a BGP router that receives a route from an iBGP neighbor is configured to operate as a route reflector and in the incoming update detects the presence of its own `Cluster-ID` in the
  `Cluster-list` attribute it will reject the update.

Only the route reflector is aware of the reflecting. The clients are dumb

If you configure route reflectors as a cluster you must manually configure the `cluster_ID`
