# SSO

<pre>
┌──────────────────────┐
│┌────────────────────┐│
││ RP-2 (Standby)     ││
│└────────────────────┘│
│    ▲                 │
│    │ State           │
│┌───┴────────────────┐│
││ RP-1 (Active)      ││
│└─┬──────────────────┘│
│  │ BGP            ▲  │
│  ▼            BGP │  │
│┌──────────────────┴─┐│
││ Linecard-1         ││
│└────────────────────┘│
│                      │
└──────────────────────┘
</pre>

The owner of the control plane is the **RP**, the Route Processor. The Active RP sends and receives the hello packets.

The physical router-to-router connections terminate on the linecard. The linecard needs a FIB to pass traffic.

With multiple RPs, if one RP has a catastrophic failure, the other RP can take over (SSO + NSR) without dropping traffic.

To get zero packet loss during a RP failure, without notifying the peer or dropping any packets, these three technologies are required (SSO + NSR + NSF).

## Terms

* **RIB:** Routing Information Base. This is where the RP stores its routes.
* **FIB:** Forwarding Information Base. This is the information necessary to program the linecard to pass traffic.
* **SSO:** Stateful Switchover. The RPs sync with each other and share state, (hopefully) enough state to prevent traffic disruption.
* **Checkpointing:** All necessary information to perform the task is already on the standby RP.
* **Non-Stop Routing:** AKA NSR. The Control plane relationships and RIB are both checkpointed.
* **Non-Stop Forwarding:** AKA NSF. The FIB is checkpointed.
* **Graceful Restart:** SSO/NSF/NSR are all vendor features that do no share state with the neighbor. GR is an IETF capability both devices must have turned on.
* **EoR:** End-of-RIB. This means the neighbor has shared the its entire routing table.

## Graceful Restart

* **Restart Timer:** If I drop the BGP session, Please wait this long before you stop forwarding me my traffic. (Default is 2 minutes)
* **Stale Timer:** Once I send an open message, that means I'm working, so please give me this long before flushing my routes. (Default is 6 minutes)

## Graceful Restart Mechanics

This is a BGP Example.

<pre>
     ┌───────────────────┐                 ┌────────────────┐
     │ GR-Capable Router │                 │  GR-Aware Peer │
     └───────────────────┘                 └────────┬───────┘
              │                                     │
              │◄─── OPEN with GR Capability ───────►│
 Router       │                                     │
 Restart  ───►│                                     │
              │                                     │
   * Send     │                                     │ * Acknowledge restart
     Restart  ├─── OPEN with Restart Bit Set ──────►│ * Mark routes stale
     Notif.   │                                     │ * Start Restart Timer
              │                                     │ * GR-Aware Peer in "helper mode"
              │◄── OPEN with Capability ───────────►│
              │                                     │
* Session     │                                     │
  Established │──────── BGP Hello ─────────────────►│ * Stop Restart Timer
              │                                     │ * Start Stale-Path Timer
              │                                     │
              │◄──── Send Initial Updates + EoR ────┤
              │                                     │
    * Best    │                                     │
      Path    │                                     │ * Stop Stale-Path Timer
      Select  │──────── Send Updates + EoR ───────► │ * Delete stale prefixes
      on EoR  │                                     │ * Refresh with new ones
              │                                     │
              │           *** CONVERGED ***         │
</pre>


## References

[Cisco - Introduction to HA Technologies: SSO/NSF with GR and/or NSR](https://archive.nanog.org/meetings/nanog42/presentations/Weissner_SSO.pdf)

[Graceful Restart Mechanism for BGP](https://datatracker.ietf.org/doc/html/rfc4724)

[Cisco - BGP Graceful Restart Per Neighbor IOS-XE 17.x](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-grace-restart-neighbor.html)