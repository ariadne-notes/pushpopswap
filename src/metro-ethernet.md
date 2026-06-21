# Metro Ethernet

## General caveats

- Shut down interfaces before configuring (best practice on ME3400)
- **No DTP** — dynamic trunk negotiation does not exist
- **No VTP** — VLAN Trunking Protocol does not exist
- Default STP mode is **PVST**
- Typically deployed as the **last hop** (service provider edge / CPE)
- Port model is based on **port-types** and **UNI VLANs** rather than standard IOS switchport modes

---

## Port types (MEF terminology)

### UNI — user network interface

- Connects to **customer end devices** (phones, computers, routers at the customer site)
- All ports except uplinks default to UNI
- Can only forward traffic toward **NNI ports**
- **No STP**
- **No CDP**
- **No Link Aggregation**

### ENI — enhanced network interface

- Connects to **routers or switches** (slightly trusted devices)
- Supports **STP**
- Supports **CDP**
- Supports **Link Aggregation**

### NNI — network node interface

- **Network-to-Network** — connects to other provider nodes/uplinks
- **No Layer 2 protocol filtering** — passes BPDUs, CDP, etc. transparently

---

## Port type comparison

| Feature              | UNI | ENI | NNI |
|----------------------|-----|-----|-----|
| STP                  | ✗   | ✓   | ✓   |
| CDP                  | ✗   | ✓   | ✓   |
| Link Aggregation     | ✗   | ✓   | ✓   |
| L2 Protocol Filtering| ✓   | ✓   | ✗   |
| Customer-facing      | ✓   | ✓   | ✗   |
