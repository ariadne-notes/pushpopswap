# WAN Considerations

**DIA** --- Direct Internet Access

- An ordinary connection to the Internet

## Leased lines

- Point-to-point
- Logically "a wire" between two sites
- ISP makes the wire look continuous
- Usually

  - Based on T-Carrier, or OCx technology
  - Takes months to provision
  - Older tech
  - Very private (only the ISP can see the data)
- Sometimes requires construction to provision
- Always more expensive, but reliable and dedicated bandwidth
- Gets more expensive with a SLA

## T-Carrier

- Leased line
- Invented in the 1950s, used to link telephone central offices and transport telephone calls
- Completely private
- Dedicated Bandwidth
- Expensive
- Old cell-towers still sometimes require handoff via a T-Carrier
- Very few of these still exist

| Level | Signal | Line Rate     | DS0 Voice Channels | Composition         |
|-------|--------|---------------|--------------------|---------------------|
| T1    | DS1    | 1.544 Mbps    | 24                 | 24x DS0             |
| T2    | DS2    | 6.312 Mbps    | 96                 | 4x T1               |
| T3    | DS3    | 44.736 Mbps   | 672                | 7x T2 (28x T1)      |
| T4    | DS4    | 274.176 Mbps  | 4,032              | 6x T3 (168x T1)     |

## SONET

- Leased Lines
- Uses a ring to provide built-in redundancy
- 50ms failover time
- Higher uptime than other technologies
- **Expensive.** Extremely expensive dedicated links

| OC Level | Speed       |
|----------|-------------|
| OC-1     | 51.85 Mbps  |
| OC-3     | 155.52 Mbps |
| OC-12    | 622.08 Mbps |
| OC-24    | 1.244 Gbps  |
| OC-48    | 2.488 Gbps  |
| OC-192   | 9.952 Gbps  |
| OC-255   | 13.21 Gbps  |

## MPLS

- Less expensive than a leased line
- Much faster
- Gets expensive when a SLA is required

## MPLS layer 3 VPN

- Can be multi-site
- Relatively cheap
- Requires peering with the provider who carries the routes between sites

## MPLS layer 2 VPNs

- Always more expensive.
- Required if your App needs direct adjacency
- Required if you want to do your own routing (peer with just your own nodes)

**VPWS** --- Virtual private wire service

- Point-to-point

**VPLS** --- Virtual Private LAN Service

- Full-Mesh

## Metro Ethernet

- Can be *very* fast, 10Gbps and above
- Can also offer high SLA
- Usually easy to ask for more bandwidth

## Fiber technologies


### DWDM

- Usually owned by the ISP as the multiplexers are very, very expensive
- A single fiber can support multiple channels
- A single channel can support 10 to 400G
- Tight channel spacing. (Less than 1nm)
- 80+ channels
- Used to link continents with [submarine cables](https://cablegraph.com)
- Can multiplex wavelengths of light in channels
- Unknown theoretical speed

### CWDM

- Channels are widely spaced
  - 20 nm
- Significantly cheaper that DWDM
- 18 channels is common

### Dark fiber

- The DIY Solution
- A business asks an ISP "do you have any fiber I can just .. use?"
- The ISP goes "yeah, but ... it's your problem."
- Dark fiber is service-less
- Dark fiber is literally a glass pipe
- Dark fiber doesn't have a SLA
- Dark fiber means bringing your own optics, your own transceivers, your own signal regenerators. Anything an ISP would ordinarily provide or cover
- Very secure once running
- Tends to be cheaper

## Cloud

- **Cloud Connect:** Not Internet, but a direct connection to something like AWS, Azure, or Google Cloud.
- **Cloud On-Ramp:** A similar connection, but made via SD-WAN over DIA.

## Cellular wireless

- If there are two numbers, the slower one is the upload.
- These need to be secured via IPSec or another Overlay Technology.

### Slow

**GSM**

- 9600bps
- ~1h to transfer 5MB

**GPRS**

- 128 Kbps
- ~5 minutes to transfer 5MB

**UMTS (3G)**

- 1Mbps
- ~8 seconds to transfer 5MB

### OK

**LTE**

- 300/50 Mbps
- ~1 hour to upload a 20GB file

**LTE Advanced**

- 600/100 Mbps
- ~30 minutes to upload a 20GB file


**LTE Advanced Pro**

- 1.1GB/200 Mbps
- ~15 minutes to upload a 20GB file

### Modern

**5G**

- 20/10 Gbps
- ~16 seconds to upload a 20GB file


## Overlay technologies

- [IPSec](./ipsec.md)
- [GETVPN](./getvpn.md)
- [SDWAN](./sd-wan.md)

## References
[Leased line - Wikipedia](https://en.wikipedia.org/wiki/Leased_line)

[T-carrier - Wikipedia](https://en.wikipedia.org/wiki/T-carrier)
