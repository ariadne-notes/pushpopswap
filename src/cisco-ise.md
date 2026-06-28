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

## SGT

**SGT** -- Security Group Tags

Context that can be shared with other devices to determine what a user is allowed access to.

- 16 bits
- AKA, Scalable Group tags
- AKA, Security Group Tags
- Can be packaged with packets via VXLAN-GPO
  - Policy for the packets
- Does not rely on IP or MAC

| What can be grouped    | Example SGT assignment                      |
|------------------------|:--------------------------------------------|
| user role              | `Employee`, `Contractor`, `Guest`           |
| device type            | `IoT_Sensor`, `IP_Camera`, `Printer`        |
| device posture         | `Compliant`, `Non-Compliant`                |
| server/subnet (static) | `PCI_DB`, `HR_Server`                       |
| trust level            | `Trusted_Corp`, `Untrusted_BYOD`            |
| combination            | Employee + Compliant device = `Corp_Managed`|

## References

[Cisco - Cisco Identity Services Engine Documents Landing Page](https://www.cisco.com/c/en/us/support/security/identity-services-engine/series.html#~tab-documents)

[Cisco Live - NG Segmentation, A Deep dive into Group Based Policy, SXPv5 and PxGrid Direct](/pdfs/ciscolive/BRKSEC-2154.pdf)

[Cisco Live - Katherine McNamara - ISE Deployment Improvement Tips and Tricks - BRKSEC-2347](/pdfs/ciscolive/BRKSEC-2347.pdf)
