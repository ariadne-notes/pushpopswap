# LLM Instructions

```console, editable

Do what's on the diagram. These CML instructions are default settings.

# Default config
- enable on top
- conf t underneath
- set the hostname to what's on the diagram
- set line console 0 to transport output none
- enable ipv4 routing
- enable ipv6 routing
- no banner exec
- no banner incomming
- no banner login
- end on the bottom
- copy run start very last

# Physical Interfaces
- No shut the interfaces

# v4 - L2 addressing
- v4 subnets are usually /24s
- router-to-router subnets: in v4 take the form 10.X.Y.Z/24. X is the lower router number. Y is the higher router number. Z is the router itself
  * Example: R1 to R5 would be 10.1.5.1/24
  * Example: R5 to R1 would be 10.1.5.5/24
- Loopback0: Each router gets a /32 v4 loopback in the format 10.0.0.Z
  * Example: R1 would be 10.0.0.1/32
  * Example: R5 would be 10.0.0.5/32

# v6 - L2 addressing
- v6 subnets are usually /64s
- router-to-router subnets in v6 take the form 2001:db8:X:Y::Z/64. X is the lower router number. Y is the higher router number. Z is the router itself
- R1-R5 2001:db8:0:15::0/64. 
  * Example: R1 to R5 would be 2001:db8:1:5:1/64
  * Example: R5 to R1 would be 2001:db8:1:5:5/64
- Loopback0: Each router gets a v6 loopback like fd::Z/128
  * Example: R1 would be fd::1/128
  * Example: R5 would be fd::5/128

# Routing
- Unless specified, Area 0
- OSPFv2 process id 200
- OSPFv3 process id 300
- Manually specify the router-id for both, as loopback 0
- Do not use OSPF network statements.
  - Unless specified, advertise all subnets into OSPFv2, via the interface commands
  - Unless specified, advertise all subnets into OSPFv3, via the interface commands
- Passive interface on interfaces towards hosts, this goes under the router statements
```
