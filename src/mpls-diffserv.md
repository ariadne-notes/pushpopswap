# MPLS DiffServ

- Network is a single DiffServ Domain

- ip2mpls   Copy DSCP to EXP
- mpls2mpls Copy EXP Upward and Downward
- mpls2ip   Copy EXP into the DSCP

- Uniform changes the markings.

## Short-Pipe

- Customer network is a different DiffServ Domain
- ip2mpls # Maybe copy
- Copy top EXP into lower labels.
- Use the exposed DSCP when there is no label.
- When mpls2ip is done, act on the ip information not the prior EXP bits.

## Pipe Mode (Multiple DiffServ Domains, default, no change to CE marking)

- ip2mpls # Maybe copy DSCP to EXP.
- SP MPLS exp may be remarked in transit
- IPv4 is not remarked at egress
- Customer marking is unchanged.
- mpls2ip operation is based on what the prior MPLS EXP tag was.
- Must shut off PHP

## References

[RFC 3270: Multi-Protocol Label Switching (MPLS) Support of Differentiated Services | RFC Editor](https://www.rfc-editor.org/info/rfc3270/)
