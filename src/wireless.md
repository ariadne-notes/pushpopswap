# Wireless

`show chassis detail`

`show chassis rmi`

## Lightweight modes

## Terms

**WECA** --- Wireless Ethernet Compatibility Alliance

- Now called the Wi-Fi Alliance


**MAP** --- Mesh Access Point

## Client-Serving AP modes

**Local**

- Default
- Tunnels traffic with CAPWAP
- Must be connected to the WLC to work
- No mesh

**FlexConnect**

- CAPWAP or AP LAN port
- No mesh

**Bridge** 

Two submodes:

- **Bridge-root**

- Has wired access, provides mesh access

**Bridge-mesh**

- Relies on other APs for CAPWAP backhaul

## Network management AP modes

**Monitor**

- Dedicated Monitoring
- RRM and Rogues

**Rogue Detector** 

- Turn off RF
- Monitor the LAN for on-wire rogues
- Deprecated

**Sniffer**

- Capture all Wi-Fi traffic on 1 channel
- Tunneled in CAPWAP to WLC
- forwarded to a machine running OmniPeek or Wireshark

**SE-Connect** 

- Spectrum Expert
  - Clean Air

## References

[Cisco Live - The Great Wi-Fi Architecture Debate - Simone Arena](/pdfs/ciscolive/BRKEWN-2002.pdf)

[Cisco Wireless Controller Configuration Guide, Release 8.10](https://www.cisco.com/c/en/us/td/docs/wireless/controller/8-10/config-guide/b_cg810/managing_aps.html)
