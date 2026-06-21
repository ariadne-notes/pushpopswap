# PIM Sparse

Based on [RFC4601](https://www.rfc-editor.org/rfc/rfc4601) - Protocol Independent Multicast Sparse Mode (PIM-SM)

- Explicit joins everywhere. No flooding.
- LHR, sends a PIM-Join towards the RP, building a (*,G).
- Phased
  - 1. [The RPT tree](https://www.rfc-editor.org/rfc/rfc4601#section-3.1)
    - Receivers sending their (*,G) messages towards the RP.
    - FHR encapsulates the multicast traffic directly towards the RP.
    - PIM-Register
    - RP de-encapsulates the traffic, sending it down the RPT.
  - 2. [Register Stop](https://www.rfc-editor.org/rfc/rfc4601#section-3.2)
    - The RP sends a (S,G) towards the source.
    - When multicast packets start showing up, without encapsulation, the RP sends a Register-Stop.
  - 3. [SPT tree](https://www.rfc-editor.org/rfc/rfc4601#section-3.3)
    - LHR requests a (S,G) entry towards it's upstream, until it's joined to the (S,G) tree.
    - When the LHR starts getting two copies of the traffic, it sends a (S,G,rpt) prune message, towards the RP. (A prune specific to the RPT)
- If two LHRs exist, and duplicate traffic is detected a PIM elections happens.
  - These Asserts are every 3 minutes.
  - RPTbit, 0 is preferred and means "has (S,G) tree"
    - Metric Preference (Administrative Distance)
      - Metric
        - IP address of subnet interface.
- Specify the tunnel, for the pim-register messages on Cisco via `ip pim register-source loopback 0`
- The tunnel interface encapsulates the entire multicast packet, which adds 28 bytes of overhead. Packets close to the MTU will be silently dropped on IOS-XE.


a DR is elected by highest priority, or highest IP in the subnet.

  - DR sends the PIM join upstream.

The RP always gets the stream, even if it has no receivers to forward it to.

## Captures

[PIM-SM-register-register-stop-prune.pcap](./captures/multicast/PIM-SM-register-register-stop-prune.pcap)
