# SD-WAN Multicast

> [!NOTE]
> Data streams are forwarded to the receivers through replication.

## Terms

**Replicator**

The FHR forwards the multicast stream to the replicator.

## Multicast

- [PIM-SM] is supported
- the RP is one of the control nodes
- No Support for
  - BIDIR-PIM
  - MSDP
  
[PIM-SM]: https://www.cisco.com/c/en/us/td/docs/routers/sdwan/26x-later/routing/routing-configuration-guide/multicast-overlay/multicast-overlay-routing-for-sd-wan.html

## Flow

This is based on [BRKENT-3115], slides 107-110.

[BRKENT-3115]: ./pdfs/ciscolive/BRKENT-3115.pdf

```mermaid
sequenceDiagram
    box rgba(33,150,243,0.10) Source / FHR Site
        participant Source as Source
        participant Edge1 as Edge 1<br/>FHR
    end
    box rgba(120,144,156,0.10) RP Site
        participant RP as RP
        participant Edge3 as Edge 3
    end
    box rgba(38,198,218,0.10) SD-WAN Fabric
        participant RepA as Edge 4<br/>Replicator A
        participant Ctrl as SD-WAN<br/>Controller
        participant RepB as Edge 5<br/>Replicator B
    end
    box rgba(67,160,71,0.10) Site A
        participant Edge2 as Edge 2<br/>LHR
        participant RecvA as Receiver A
    end
    box rgba(255,167,38,0.10) Site B
        participant Edge6 as Edge 6<br/>LHR
        participant RecvB as Receiver B
    end

    Note over   RP,RecvA: Phase 1 — Receiver-A (*,G) Towards RP
    RecvA  -->> Edge2: 1. IGMP Join (*,G)
    Edge2  -->> Ctrl:  2. OMP Update<br/>Type 6 Join (*,G)
    Ctrl   -->> RepA:  3. OMP Update<br/>Type 6 Join (*,G)
    RepA   -->> Edge3: 4. OMP Update<br/>Type 6 Join (*,G)
    Edge3  -->> RP:    5. PIM Join (*,G)

    Note over   Source,Ctrl: Phase 2 — Source Registration & (S,G)
    Source -->> Edge1: 6. Multicast Traffic
    Edge1  -->> Edge3: 7. PIM Register (unicast)
    Edge3  -->> RP:    8. PIM Register
    RP     -->> Edge3: 9. PIM Join (S,G)
    Edge3  -->> Ctrl:  10. OMP Update Type 7 Join (S,G)
    Ctrl   -->> RepA:  11. OMP Update Type 7 Join (S,G)
    RepA   -->> Edge1: 12. OMP Update Type 7 Join (S,G)

    Note over   Source,RecvB: Phase 3 — Source-Active fan-out + Receiver-B onto SPT
    Edge1 -->>  Ctrl:  13a. OMP Update Type 5 (S-A)
    Note over   Ctrl:  13b. Controller floods Type 5 (S-A) to ALL WAN edges
    Ctrl  -->>  Edge2: 13b. Type 5 (S-A)
    Ctrl  -->>  Edge3: 13b. Type 5 (S-A)
    Ctrl  -->>  RepA:  13b. Type 5 (S-A)
    Ctrl  -->>  RepB:  13b. Type 5 (S-A)
    Ctrl  -->>  Edge6: 13b. Type 5 (S-A)
    RecvB ->>   Edge6: 14. IGMP Join (*,G)
    Edge6 -->>  Ctrl:  15. OMP Update Type 7 Join (S,G)
    Ctrl  -->>  RepB:  16. OMP Update Type 7 Join (S,G)
    RepB  -->>  Edge1: 17. OMP Update Type 7 Join (S,G)

    Note over   Source,RecvB: Phase 4 — Dataplane
    Edge1  ->>  RepA:  Multicast (S,G) stream
    RepA   ->>  Edge2: Replicated to LHR
    Edge2  ->>  RecvA: Multicast (S,G) stream
    Edge1  ->>  RepB:  Multicast (S,G) stream
    RepB   ->>  Edge6: Replicated to LHR
    Edge6  ->>  RecvB: Multicast (S,G) stream
```

## References

[Cisco Live - Empowering your Network with SDWAN OMP - Waqas Daar - BKRENT-3115](./pdfs/ciscolive/BRKENT-3115.pdf)

[Routing Configuration Guide for vEdge Routers, SD-WAN Release 20 - Multicast - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/routing/vEdge-20-x/routing-book/m-multicast-routing.html)

