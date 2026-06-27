# In Building Wireless

Used to boost the signal of cellular.

## Terms

**IBW** --- In Building Wireless

**DAS** --- Distributed Antenna System.

**BTS** --- Base Transceiver Station

**ER** --- Equipment Room

**Donor Antenna**

- Mounted outside to get signal from cellular provider

## Signal Sources

### Off-Air

Getting the signal **off the air**

- AKA, repeater
- AKA, bi-directional amplifier
- Does not add capacity
- Extends coverage
- Cheapest

### BTS Signal Source

- AKA, NobeB
- AKA, eNodeB
- Carrier dependent
- Requires fiber from the cellular provider
- Fiber goes into BTS
- BTS goes into DAS
- Expensive

### Small Cell

![panduit-ibw-small-cell](/images/panduit-ibw-small-cell.jpg)

Image courtesy of [Panduit].

[Panduit]: https://www.panduit.com/content/dam/panduit/en/website/solutions/documents/NI-ENT-InBldgWirelessRefArch_CPAT74-SA-ENG.pdf

- Carrier dependent
- Internet based
  - No SLA
- Doesn't always scale well

| Type      | Power     | Coverage   | Capacity     | Use Case          |
|-----------|-----------|------------|--------------|-------------------|
| Femtocell | 0.1 Watt  |  60 ft.    |  6 users     | Indoors           |
| Picocell  | 1 Watt    |  750 ft.   |  64 users    | Indoors           |
| Metrocell | 5 Watts   |  1,000 ft. |  200 users   | Indoors/Outdoors  |
| Microcell | 10 Watts  |  5,000 ft. |  1,000 users | Indoors/Outdoors  |

## DAS Types

**Passive**

- RF couplings
- Splitters
- Taps
- Wires

**Hybrid**

- Fiber
- RF is carried via coax to passive antennas

![panduit-ibw-passive](/images/panduit-ibw-hybrid-passive.jpg)

Image courtesy of [Panduit].

**Active**

![panduit-ibw-active](/images/panduit-ibw-active.jpg)

Image courtesy of [Panduit].

- Fiber
- Active antennas generate their own RF

## References

[Panduit - In-Building Wireless Reference Architecture](https://www.panduit.com/content/dam/panduit/en/website/solutions/documents/NI-ENT-InBldgWirelessRefArch_CPAT74-SA-ENG.pdf)

[ATT - Managed In-Building Solution](https://www.business.att.com/content/dam/attbusiness/briefs/in-building-solutions-product-brief.pdf)
