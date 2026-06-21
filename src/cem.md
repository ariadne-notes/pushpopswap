# Circuit Emulation

## Key terms

| Term        | Definition |
|-------------|------------|
| **SPA**     | Shared Port Adapter |
| **CEoP**    | Circuit Emulation over Packet |
| **CESoPSN** | Circuit Emulation Service over Packet Switched Network |
| **SAToP**   | Structure-Agnostic Transport over Packet |


## What is CEM?

> CEM treats data as an **arbitrary bit stream** — the actual Layer 1/Layer 2 format is irrelevant to the transport. This makes it ideal for carrying legacy or opaque traffic over modern packet-switched networks.


## Common CEM use cases

- **2G / 3G** mobile backhaul traffic
- **T1 / E1** circuit emulation over packet networks
- **PBX-to-PBX** connectivity
- **Inter-MSC** (Mobile Switching Center) connectivity
- **Already-encrypted traffic** with no defined structure (government, high-security)
- **Proprietary** synchronous or asynchronous data streams
- **Leased line emulation**


## CEoP SPAs (for Cisco 7600)

| SPA                  | Description |
|----------------------|-------------|
| `SPA-24CHT1-CE-ATM=` | 24-Port Channelized T1/E1 ATM CEoP SPA |
| `SPA-2CHT3-CE-ATM=`  | 2-Port Channelized T3/E3 ATM CEoP SPA |
| `SPA-1CHOC3-CE-ATM=` | 1-Port Channelized OC-3/STM-1 ATM CEoP SPA |


## Platforms supporting CEM

| Platform                         | Notes |
|----------------------------------|-------|
| **MWR2941**                      | Native CEM support |
| **ASR 1000 series**              | Via SPA cards |
| **ASR 900 series**               | Via SPA cards |
| **Legacy routers with NM slots** | Via NM card |

## Key configuration note

> Creating a `channel-group` under a T1 controller automatically creates the associated **serial interface**.

## Clock distribution

- The hub router owns the clock
- The spoke router recovers the clocks from `0/0/0`
- The spoke router uses that clock, to sync lines `0/0/1, 0/1/0, and `0/1/1`

```plain
        Hub Router                                                      Spoke Site Router      
                                                                                               
 <Reference Clock>                                                                             
     │                                                                                         
┌────┼─────────────────────┐                                     ┌──────────────────────────┐  
│    ▼                     │                                     │                          │  
│┌────────┬──────► Internal│ 0/0/0─────────────────────────0/0/0 │Line->Network-Clock ──┐   │  
││PLL (1) │                │                                     │                      │   │  
││ Clock  ├──────► Internal│ 0/0/1─────────────────────────0/0/1 │Internal ◄─────────┐  │   │  
│└────┬──┬┘                │                                     │                   │  ▼   │  
│     │  └───────► Internal│ 0/0/2─────────────────────────0/1/0 │Internal ◄─────┬───┴─────┐│  
│     │                    │                                     │               │PLL  (2) ││  
│     └──────────► Internal│ 0/0/3─────────────────────────0/1/1 │Internal ◄─────┤ Clock   ││  
│                          │                                     │               └─────────┘│  
└──────────────────────────┘                                     └──────────────────────────┘  
                    4 Port card in Slot 0     2x 2 port cards Slot 0 and Slot 1        │       
                                                                                       ▼       
 PLL = Phase Locked Loop                                             <clock recovered from hub>
```

## Wireshark decoding

- SAToP traffic can be decoded using the **`pwsatopcw`** protocol keyword
- If Wireshark does not auto-detect the encapsulation, **right-click the frame → Decode As** and manually select the correct protocol
  - You need to already know what format the traffic is in — there is no auto-detection for pseudowire types

## CEM command reference

| IOS Command | Mode | RFC |
|----------------------------|---------|----------|
| `cem-group unframed`       | SAToP   | RFC 4553 |
| `cem-group timeslots 1-24` | CESoPSN | RFC 5086 |

## Key configuration notes

- **TDM byte** = one timeslot
- **`xconnect`** requires matching **VCIDs** on both ends to bring up the pseudowire connection
