# VPCs

A VPC is a tenant scoped cloud network construct.

VMs inside a VPC can usually communicate with the outside world via NAT, but need some kind of public IP to be reachable from the Global Internet.

Google's VPC is implemented with [Andromeda].

[Andromeda]: ./pdfs/nsdi18-dalton.pdf

## Terms

**VM** --- Virtual Machine

- Essentially a computer

**VPC** --- Virtual Private Cloud

- Connects VMs
- Subnets
- IP Addresses
- Route Tables
- Network Connections
- Peering
- Traffic Mirroring
- Internet Gateway
- VPC Peering
- NAT Gateway

## References

[Apache - Configuring a Virtual Private Cloud](https://docs.cloudstack.apache.org/en/latest/adminguide/networking/virtual_private_cloud_config.html)

[Amazon - What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html?utm_source=chatgpt.com)

[Microsoft - What is Azure Virtual Network?](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)

[Google - VPC networks | Virtual Private Cloud](https://docs.cloud.google.com/vpc/docs/vpc)
