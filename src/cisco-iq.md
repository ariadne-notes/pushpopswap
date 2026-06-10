# Cisco IQ

Launched: Nov 4th, 2025

General Availability: April 29, 2026

A web dashboard meant to help with the CX experience, harnessing a combination of Agentic AI, and customer provided Telemetry.

Works with just the cloud dashboard [iq.cisco.com], optionally expanded via Cisco IQ Link, the on-prem data collector.

Cisco IQ can make a variety of data-driven network recommendations.

From the News Release:

> Over 40 percent of outages start as misconfigurations nobody caught in time.
>
> Sophisticated actors do not need a novel exploit. 
>
> They are going after aged infrastructure organizations knew about and did not prioritize. 
>
> Our Talos team confirmed it: 40% of top-targeted vulnerabilities last year impacted end-of-life devices. 
>
> 32% are over a decade old.

## Terms

**CX** --- Customer Experience.

Cisco's name for their customer support organization.

**EOL** --- End of Life

This product cannot be covered by a support contract, and there are no software updates. Usually these also have unpatched security vulnerabilities.

**LDOS** --- Last day of Support

This product has already stopped getting software updates, but Cisco still supports it via best effort and TAC cases.

**RTP** --- Research Triangle Park

Cisco's RTP NC. USA Campus.

## Support Tiers

**Basic**

- CX Case Management
- Self-Service Troubleshooting
- Asset Inventory
- Reports
  - EOL
  - Support
  - Security Advisories
  - Field Notices
- Dashboard
  - LDOS

**Standard**

Insights are provided by Cisco's LLM in RTP.

- Insights from previous tier
- New Insights
  - Security Hardening Insights
  - Configuration Insights
  - CX Case Insights

**Signature**

Recommendations are provided by Cisco's LLM in RTP.

- Config Recommendations
- Security Hardening Recommendations

## Features

### Intelligent Asset Management

- Assets
  - Hardware (BOM)
  - Software (SBOM)
  - Crypto (CBOM)
- Contracts
- Devices discovered
  - LDOS
    - How many of my devices have critical vulnerabilities?
    - Give a summary using sentences of less than 7 words.

### Adaptive Infrastructure 

- Field Notices
- Security Advisories
- Security Hardening
- Vulnerabilities

### Other Services 

- LLM Troubleshooting
- Automated RMAs
- Management of TAC cases
- Config Validation
- Migration Support 

## Migrations

**Device Migration**

- Box A to B

**Network OS Migration

- IOS-XE to IOS-XR

**Network Architecture Migration**

- IPv4 to IPv6
- Classical Networking to Controller Based
- MPLS to SRv6

## Deployment Models

**SaaS**

Hosted in the cloud, part of the support contract.

Comes with an optional collector called **Cisco IQ-Link**

- Cisco IQ Link, the telemetry collector
  - Deployed VM
  - Uses the cloud LLM (in RTP) for inference
    - Does not train the AI
    - Data is not kept

**On-Prem Tethered**

- Connected to the cloud for software updates
- Cisco IQ Virtual Appliance
  - Unreleased, Expected FY27
  - On device LLM

**Air Gapped**

Same as above, but no automatic updates, and no external connections.

## References

[Cisco Live - Cisco IQ Your AI Superpower - Youtube](https://www.youtube.com/watch?v=YwFxjA7KcXw&t=40s)

[Cisco Newsroom - Cisco launches Cisco IQ, ... ](https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m11/cisco-launches-cisco-iq-the-unified-ai-powered-experience-that-connects-the-entire-customer-journey.html)

[Cisco IQ Documentation - Cisco](https://www.cisco.com/c/en/us/support/cx/cisco-iq.html)

[Cisco IQ Frequently Asked Questions](https://www.cisco.com/c/en/us/support/docs/cx/cisco-iq/faq/cx225779-cisco-iq-frequently-asked-questions.pdf)

[Cisco Newsroom - Cisco IQ General Availability](https://blogs.cisco.com/news/cisco-iq-is-generally-available-heres-what-that-actually-means)
