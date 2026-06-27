# Cisco ISE

Required for


- pxGrid
- SGTs
- Microsegmentation

Provides 802.1x, Mac Authentication Bypass (MAB), or Web Authentication (WebAuth).


ISE is *tightly* integrated via API calls to CatC.

- Talks to Catalyst center via pxGrid.
- Can talk to AWS or Microsoft AD.

Implements Zero Trust.

Can be deployed as a VM.

## Terms

**ISE** --- Identity Services Engine

A modern AAA server.

**Zero Trust**

- Least Privilege

**SGT** -- Security Group Tags

Context that can be shared with other devices to determine what a user is allowed access to.

- 16 bits
- Scalable Group tags
- AKA Security Group Tags
- Can be packaged with packets via VXLAN-GPO
  - Policy for the packets
- Does not rely on IP or MAC
- Meant to be 1 per device, to uniquely identify a flow

## References

[Cisco - Cisco Identity Services Engine Documents Landing Page](https://www.cisco.com/c/en/us/support/security/identity-services-engine/series.html#~tab-documents)

[Cisco Live - Katherine McNamara - ISE Deployment Improvement Tips and Tricks - BRKSEC-2347](/pdfs/ciscolive/BRKSEC-2347.pdf)
