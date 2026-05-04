ISIS Uses a simplified topology compared to OSPF.

There are only three kinds of routers.

* **L2** Backbone routers, which can carry summaries.

* **L1L2:** ABRs, AKA Area Border Routers. 

* **L1:** These are the Area routers. They do not flood their link state databases into L2.


# Example

```
                                             ┌──────┐            
                                             │ L1   │            
                                             └───┬──┘            
                                                 │               
┌──────┐     ┌──────┐        ┌──────┐        ┌───┴──┐     ┌─────┐
│  L1  ├─────┤ L1L2 ├────────┤  L2  ├────────┤ L1L2 ├─────┤ L1  │
└───┬──┘     └───┬──┘        └──────┘        └───┬──┘     └─────┘
    │            └──────┐                  ┌─────┘               
┌───┴──┐             ┌──┴───┐          ┌───┴──┐                  
│  L1  │             │  L2  │──────────┤  L2  │                  
└──────┘             └──────┘          └──────┘                  
```