# Link

- AKA, The Collector.

Necessary for the Standard and Signature tier.

Telemetry examples:
- SNMP
- Software Versions
- Crypto being used for VPNs

Can also use Data Connectors to talk to other Managers, like On-Prem SD-WAN Manager, or On-Prem Catalyst Center.

## VM requirements

This set of requirements is for 10K devices:

- 16 vCPU
- 28GB RAM
- 600 GB
  - Thick Provision
  - Disk write speed must be greater than 70 megabytes per second

## IPv4 and DNS requirements

- a v4 address
- DNS A Record (for the VM)
- DNS PTR Record (for the IP the VM is using)

## External network connectivity requirements

These must work and be reachable in DNS.

**US Market**

- us-west-2.iq.cisco.com
- ng.acs.agent.us.csco.cloud

**EMEA Market**

- eu-central-1.iq.cisco.com
- ng.acs.agent.emea.csco.cloud

**APJC Market**

- ap-southeast-2.iq.cisco.com
- ng.acs.agent.apjc.csco.cloud

## Port requirements

| Port | Protocol | Purpose                     |
|------|----------|-----------------------------|
| 22   | TCP      | Admin CLI and Cisco Support |
| 443  | TCP      | Cisco IQ Link UI and API    |
| 53   | UDP/TCP  | DNS                         |
| 123  | UDP      | NTP                         |
| 161  | UDP      | SNMP                        |

## Supported hypervisors

- VMware ESXi
- Microsoft Hyper-V Server
- Red Hat KVM

## Internal network requirements

The internal network needs at least v4 `/20`, 4096 IPv4 addresses.

OK candidates are:

- `10.255.240.0/20`
- `192.168.240.0/20`
- `172.31.240.0/20`

**This cannot overlap** with anything Cisco IQ Link needs to reach on the managed network.

## Data connectors

- Intersight
- Meraki Dashboard
- On-Prem SD-WAN Manager
- On-Prem Catalyst Center

## References

[Cisco IQ Link Getting Started Guide v1.1.0 - Cisco](https://www.cisco.com/c/en/us/support/docs/cx/iq-link/cx225764-cisco-iq-link-getting-started-guide.html#toc-hId-97928839)
