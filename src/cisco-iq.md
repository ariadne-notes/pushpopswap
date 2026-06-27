# Cisco IQ

**Launched:** Nov 4th, 2025

**General Availability:** April 29, 2026

A web dashboard meant to help with the Cisco CX experience, harnessing a combination of Agentic AI, and customer provided Telemetry.

The Basic Tier works with just the cloud dashboard [iq.cisco.com](http://iq.cisco.com)


Standard and Signature use the same dashboard, enhanced with Telemetry from Cisco IQ Link, the On-Prem data collector.

Cisco IQ can make a variety of data-driven network recommendations.

From the [News Release].

[News Release]: https://blogs.cisco.com/news/cisco-iq-is-generally-available-heres-what-that-actually-means

> Over 40 percent of outages start as misconfigurations nobody caught in time.
>
> Sophisticated actors do not need a novel exploit.

>
> They are going after aged infrastructure organizations knew about and did not prioritize.

>
> Our Talos team confirmed it: 40% of top-targeted vulnerabilities last year impacted end-of-life devices.

>
> 32% are over a decade old.
>
> **Liz Centoni** - *Executive Vice President, Chief Customer Experience Officer, Cisco*

## Terms

**CX** --- Customer Experience.

Cisco's name for their customer support organization.

**EOL** --- End of Life

A process that guides the final business operations associated with the Cisco Product life cycle.


The end-of-life process consists of a series of technical and business milestones and activities that, once completed, make a Product obsolete.


Once obsolete, the Product is not sold, improved, maintained, or supported.

**LDoS** --- Last Day of Support

The last date to receive support as entitled by active service contracts for covered Cisco hardware and software. After this date, support is no longer available.

## Support tiers

These are tied to service contract levels.

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
  - LDoS

**Standard**

- Requires Cisco IQ Link Deployment
- Insights into previous tier
- New Insights
  - Security Hardening Insights
  - Configuration Insights
  - CX Case Insights

**Signature**

- Config Recommendations
- Security Hardening Recommendations

## Features

Feature availability is tied to the support level: Basic, Standard, or Signature

### Assets application

- Overview
  - Device Discovery
- Criticality Insights
- Inventory
  - Hardware (HBOM)
  - Software (SBOM)
  - Crypto   (CBOM)
- Asset Tags
- Service Contracts
- End-of-Life

### Assessments overview

- Findings by Asset
- Security Advisories
- Security Hardening
- Configuration
- Field Notices

### Support application

- Overview
  - Cases
  - RMAs

### AI assistant

- Security Hardening compared to CISA hardening guidelines
- Configuration evaluation against best practices
- Troubleshooting
- CX Case Handling
  - Escalate an open case
  - Raise Severity
  - Request a new engineer
  - Re-queue the case

## Deployment models

**SaaS**

Hosted in the cloud, part of the support contract.

Comes with an optional collector called [Cisco IQ Link](/cisco-iq-link.md)

- Deployed VM
- One Telemetry source is SNMP
- Includes a RADKit deployment
- Uses the cloud LLM for inference
  - Does not train the AI
    - Cisco's [AI Transparency Technical Note](https://trustportal.cisco.com/c/r/ctp/trust-portal.html#/19950757990294277)
    - Cisco's [Offer Disclosure](https://trustportal.cisco.com/c/r/ctp/trust-portal.html#/19997275235396702)

**On-Prem Tethered**

- Connected to the cloud for software updates
- Cisco IQ Virtual Appliance
  - Unreleased, Expected FY27
  - On device LLM

**Air Gapped**

Same as above, but no automatic updates, and no external connections.

## Cisco Live AI integration examples

**Peer Benchmarking**

How does my network compare to similar networks in my business vertical?

**Device Migration**

- Box A to B

**Network OS Migration**

- IOS-XE to IOS-XR

**Network Architecture Migration**

- IPv4 to IPv6
- Classical Networking to Controller Based
- MPLS to SRv6


## References

[Cisco Live - Cisco IQ Your AI Superpower - Youtube](https://www.youtube.com/watch?v=YwFxjA7KcXw&t=40s)

[Cisco IO - Offer Disclosure](https://trustportal.cisco.com/c/r/ctp/trust-portal.html#/19997275235396702)

[Cisco Newsroom - Cisco launches Cisco IQ, ... ](https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2025/m11/cisco-launches-cisco-iq-the-unified-ai-powered-experience-that-connects-the-entire-customer-journey.html)

[Cisco IQ Documentation - Cisco](https://www.cisco.com/c/en/us/support/cx/cisco-iq.html)

[Cisco IQ Frequently Asked Questions](https://www.cisco.com/c/en/us/support/docs/cx/cisco-iq/faq/cx225779-cisco-iq-frequently-asked-questions.pdf)

[Cisco Newsroom - Cisco IQ General Availability](https://blogs.cisco.com/news/cisco-iq-is-generally-available-heres-what-that-actually-means)

[Products - End-of-Life Policy - Cisco](https://www.cisco.com/c/en/us/products/eos-eol-policy.html)
