# WAN Considerations

- **DIA:** Direct Internet Access. This is what we hawe at home, a "connection to the Internet." Many (especially older) WAN technologies are point-to-point.

## [Leased Lines]

- Point-to-point
- Logically "a wire" between two sites.
- ISP makes the wire look continuous.
- Usually based on T-Carrier, or OCx technology.
- Usually takes months to provision.
- Usually older tech
- Usually very private (only the ISP can see the data)
- Sometimes requires construction to provision.
- Always more expensive, but reliable and dedicated bandwidth.
- Gets more expensive with a SLA.

## [T-Carrier]

- Leased line.
- Invented in the 1950s, used to link telephone central offices and transport telephone calls.
- Completely private
- Dedicated Bandwidth
- Expensive
- Old cell-towers still sometimes require handoff via a T-Carrier.
- Very few of these still exist.

| Level | Signal | Line Rate     | DS0 Voice Channels | Composition         |
|-------|--------|---------------|--------------------|---------------------|
| T1    | DS1    | 1.544 Mbps    | 24                 | 24x DS0             |
| T2    | DS2    | 6.312 Mbps    | 96                 | 4x T1               |
| T3    | DS3    | 44.736 Mbps   | 672                | 7x T2 (28x T1)      |
| T4    | DS4    | 274.176 Mbps  | 4,032              | 6x T3 (168x T1)     |

## SONET

- Leased Lines
- Uses a ring to provide built-in redundancy.
- 50ms failover time.
- Higher uptime than other technologies.
- **Expensive.** Extremely expensive dedicated links.

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
- Gets expensive when a SLA is required.

## MPLS Layer 3 VPN

- Can be multi-site.
- Relatively cheap.
- Requires peering with the provider who carries the routes between sites.

## MPLS Layer 2 VPNs

- Always more expensive.
- Required if your App needs direct adjacency.
- Required if you want to do your own routing (peer with just your own nodes).
- **VPWS** Virtual private wire service is point-to-point.
- **VPLS** Virtual Private LAN Service is Full-Mesh.

## Metro Ethernet

- Can be *very* fast, 10Gbps and above.
- Can also offer high SLA.
- Usually easy to ask for more bandwidth.

## Fiber Technologies


### DWDM

- Usually owned by the ISP as the multiplexers are very, very expensive.
- A single fiber can support multiple channels.
- A single channel can support 10 to 400G.
- Tight channel spacing. (Less than 1nm)
- 80+ channels.
- Used to link continents with [submarine cables](https://cablegraph.com).
- Can multiplex wavelengths of light in channels.
- Unknown theoretical speed.

### CWDM

- Channels are widely spaced. (20nm)
- Significantly cheaper that DWDM.
- 18 channels is common.

### Dark Fiber

- The DIY Solution
- A business asks an ISP "do you have any fiber I can just .. use?"
- The ISP goes "yeah, but ... it's your problem."
- Dark fiber is service-less.
- Dark fiber is literally a glass pipe.
- Dark fiber doesn't have a SLA.
- Dark fiber means bringing your own optics, your own transceivers, your own signal regenerators. Anything an ISP would ordinarily provide or cover.
- Very secure once running.


## Cloud

- **Cloud Connect:** Not Internet, but a direct connection to something like AWS, Azure, or Google Cloud.
- **Cloud On-Ramp:** A similar connection, but made via SD-WAN over DIA.

## Cellular Wireless

- If there are two numbers, the slower one is the upload.
- These need to be secured via IPSec or another Overlay Technology.

### Slow

- **GSM** is 9600bps, or about an hour to transfer a 5MB file.
- **GPRS** can be 128 Kbps, or about 5 minutes for that 5MB file.
- **UMTS** (3G) is around 1Mbps. It takes about 8 seconds to transfer that file.

### OK

- **LTE** can be 300/50 Mbps . It takes about an hour to upload a 20GB file.
- **LTE Advanced** can be 600/100 Mbps. It takes about 30 minutes to upload a 20GB file.
- **LTE Advanced Pro** can be 1.1GB/200 Mbps. It takes about 15 minutes to upload a 20GB file.

### Modern

- 5G can be 20/10 Gbps. It can upload a 20GB file in about 16 seconds.

## Overlay Technologies


## IPSec

- **ISAKMP** Used to exchange keys
  * **IKEv1:** Symmetric Encryption
  * **IKEv2:** Asymmetric Encryption
- **IPSEC ESP** Encryption of data
- **IPsec AH:** Authentication only

IPSec doesn't support routing protocols unless it's the outside is a GRE tunnel.

## GETVPN

- Good over ISP L2 networks to encrypt the traffic, just in case.
- Doesn't change the outside IPs, does not make an overlay network.

## References
[Leased line - Wikipedia](https://en.wikipedia.org/wiki/Leased_line)

[T-carrier - Wikipedia](https://en.wikipedia.org/wiki/T-carrier)
