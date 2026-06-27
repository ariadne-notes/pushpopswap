# BIDIR-PIM

- Superset of PIM-SM
- No (S,G) entries
- Traffic can flow up and down the same tree.
- Still needs RPs
  - RP must be dedicated to BIDIR-PIM.
- Each bidirectional link has a DF election.
  - Ingress packets on any PIM interface can be forwarded downstream onto DF links.
    - No DF links, no forwarding.
  - Ingress packets to a DF can be forwarded upstream via the RPF towards the RPA.
  
## References

[RFC 5015: Bidirectional Protocol Independent Multicast (BIDIR-PIM) | RFC Editor](https://www.rfc-editor.org/info/rfc5015/)
