# Route Redistribution

* **One-way:** Useful for WAN edges, to learn a few subnets and add them into the core. The WAN network or brance site gets a default route.
* **Two-way:** Used nearer the core, the router redistributes both ways. This can cause feedback loops without techniques like route filters.

Routes should **always** be given a metric when redistributed.


## OSPF

* **Always** use the `subnets` keyword, or it defaults to classful behavior.
`default metric <cost>`

## EIGRP

`default-metric <bandwidth> <delay> <reliability> <load> <mtu>`