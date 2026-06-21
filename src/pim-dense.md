# PIM Dense

Based on RFC 3973 Protocol Independent Multicast Dense Mode (PIM-DM)

- Push Model
  - Good for when every subnet probably wants this traffic
- No PIM DR
  - All FHR forward multicast traffic
    - Multicast traffic is flooded out every interface that isn't the RPF.
- Eventually builds a SPT after prunes
- IGMP joins turn into graft messages
- Prunes last 3 minutes
  - Flood and Prune
  - Routers with no Receivers or duplicate S,G traffic prune.
  - `224.0.0.13` to find neighbors
  - Receivers prune back
  - Router attached to LAN listens for multicast control plane.
     - Receives source traffic
       - Insert (*,G) and (S,G) into mrib
       - Incoming traffic is attached to IIL
       - OIL is all other interfaces
       - Flood to OIL
       - PIM dense always uses SPT.
- Prune occurs
  - Traffic flows stop, but (S,G) remains in table
  - Multicast fails RPF
  - No downstream neighbor or reciever
  - Downstream sent prune
  - LAN Prune override exception
- After pruning

  - Flood again, prune back, flood again, prune back
