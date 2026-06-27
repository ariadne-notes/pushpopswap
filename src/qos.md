# QoS

... is planned unfairness. To make some traffic faster, other traffic must wait.

## Terms

**BE** --- Best Effort

- Default traffic class

**FIFO** --- First in, First out

- Default behavior

**Differentiated Services**

- AKA, DiffServ
- Giving packet flows different levels of network service
- Based on classification

**Integrated Services**

- AKA, IntServ
- Packet flows explicitly reserve bandwidth along a path
- Uses admission control

**RSVP** --- Resource Reservation Protocol

- An IntServ Implementation

**Marking**

- Changing the DSCP bits in the IP header field

**DSCP** --- Differentiated Services Code Point

- The markings of an IP packet that allows DiffServ

**PHB** --- Per Hop Behavior

- What a node should or shouldn't do with marked traffic.

**Queuing**

- Hold a packet in memory
  - Delays transmission
  - Buffers have limits
  - Expensive, because memory is expensive
  - Enables [RED](/congestion.md)

**LLQ** --- Low Latency Queuing

- Describes queue behavior for the EF PHB
  - Always service this queue first
  - No RED
  - Must be policed or it will starve other queues

**EF** --- Expedited Forwarding

- The highest PHB for network data

**Control Traffic**

- Routing Traffic
  - OSPF, EIGRP, IS-IS, BGP, etc

**CAR** --- Committed Access Rate

- Contractual data rate a traffic source will flow at
- SLA oriented

**SLA** --- Service Level Agreement

- A Business agreements about data servicing requirements

**WFQ** --- Weighted Fair Queuing

- Legacy default on serial interfaces at E1 speeds and below ~2.048 Mbps
- Sorts traffic into high bw and low bw classes.

**CBWFQ** --- Class Based Weighted Fair Queuing

- AKA, Modular QoS

- Multiple queues
- Bandwidth limits
- Different kinds of queues, like LLQ

**MQC**

- Modular QoS CLI

**PQ** --- Priority Queue

- A queue that is served first, even if other queues have been waiting longer
- An LLQ is an example of a PQ

## Type of service

How these 8 bits work has changed over the years.

```text
                 0 1 2 3 4 5 6 7
                ┌─────┬─────┬─┬─┐
 RFC 791 (1981) │IP Pr│ ToS │0│0│
                └─────┴─────┴─┴─┘

                 0 1 2 3 4 5 6 7
                ┌─────┬───────┬─┐
RFC 1349 (1992) │IP Pr│  TOS  │0│
                └─────┴───────┴─┘

                 0 1 2 3 4 5 6 7
                ┌───────────┬─┬─┐
RFC 2474 (1998) │    DSCP   │0│0│
                └───────────┴─┴─┘

                 0 1 2 3 4 5 6 7
                ┌───────────┬───┐
RFC 3168 (2001) │    DSCP   │ECN│
                └───────────┴───┘
```

### PHB - per hop behaviors

| PHB    | Name                  | Description                                        |
|--------|-----------------------|----------------------------------------------------|
| **CS** | Class Selector        | CS0 to CS7, backward compatible with IP Precedence |
| **AF** | Assured Forwarding    | Modern Queuing and congestion avoidance            |
| **EF** | Expedited Forwarding  | Lossless and LLQ                                   |

## Assured forwarding

[Assured Forwarding PHB Group](https://datatracker.ietf.org/doc/html/rfc2597)

AF uses the first 6 bits to create 4 traffic classes, 4 is best.

Within those classes, there is a drop precedence, or ... at what point of queue congestion should this traffic be dropped.

Used for RED, or WRED.

Four AF classes, each should get its own resources.

### Binary

```plain
Drop
 Precedence      Class 1        Class 2        Class 3       Class 4

            ┌───────────────┬───────────────┬───────────────┬──────────────┐
   Low    │ │ AF11  001 010 │ AF21  010 010 │ AF31  011 010 │ AF41 100 010 │
   Medium │ │ AF12  001 100 │ AF22  010 100 │ AF32  011 100 │ AF42 100 100 │
   High   ▼ │ AF13  001 110 │ AF23  010 110 │ AF33  011 110 │ AF43 100 110 │
            └───────────────┴───────────────┴───────────────┴──────────────┘
             ────────────► Importance to Organization ───────────►
```

### DSCP

```plain
Drop
 Precedence      Class 1        Class 2        Class 3       Class 4

            ┌───────────────┬───────────────┬───────────────┬──────────────┐
   Low    │ │ AF11  DSCP 10 │ AF21  DSCP 18 │ AF31  DSCP 26 │ AF41 DSCP 34 │
   Medium │ │ AF12  DSCP 12 │ AF22  DSCP 20 │ AF32  DSCP 28 │ AF42 DSCP 36 │
   High   ▼ │ AF13  DSCP 14 │ AF23  DSCP 22 │ AF33  DSCP 30 │ AF43 DSCP 38 │
            └───────────────┴───────────────┴───────────────┴──────────────┘
             ────────────► Importance to Organization ───────────►
```

Yields the following formula.

DSCP = 8 (class) + 2 (drop)

## QoS consequences

LAN QoS with voice (buffer management)

- One voice packet, no voice, but modem will retrain
- Two voice packets, audio clip, fax call disconnection
- VoIP QoS cannot be fixed by adding bandwidth
  - It must be treated as LLQ

## QoS commands

| Command | Description |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `show mls qos interface f0/0`        | shows if the interface trusts the markings                                |
| `mls qos trust device cisco-phone`   | trusts the phone on the attached port. Uses CDP to verify its a phone     |

## RFC 4594 — DiffServ service classes

| Service Class         | PHB  | DSCP     | Flow type        | Queue Strategy             |                                           |
|-----------------------|------|----------|------------------|----------------------------|-------------------------------------------|
| Network Control       | CS7  | 56       |                  |                            | (unused, reserved)                        |
| Internetwork Control  | CS6  | 48       | Inelastic        | Vendor Controlled          | BGP, OSPF, IS-IS                          |
| Telephony (VoIP)      | EF   | 46       | Inelastic        | Priority Queue (PQ)        | IP Phones                                 |
| Broadcast Video       | CS5  | 40       | Inelastic        | Priority Queue (PQ)        | TV, Live Events, IP Surveillance Cameras  |
| Real-Time Interactive | CS4  | 32       | Inelastic        | Priority Queue (PQ)        | Telepresence                              |
| Multimedia Conf.      | AF4x | 34/36/38 | Rate-Adaptive    | BW Queue + DSCP WRED       | Softphone Video                           |
| Multimedia Streaming  | AF3x | 26/28/30 | Elastic          | BW Queue + DSCP WRED       | Video Training                            |
| Call Signaling        | CS3  | 24       | Elastic          | BW Queue                   | SCCP, SIP                                 |
| OAM                   | CS2  | 16       | Elastic          | BW Queue                   | SNMP, Syslog, SSH                         |
| Transactional Data    | AF2x | 18/20/22 | Elastic          | BW Queue + DSCP WRED       | ERP Apps, Business Apps, Ordering         |
| Bulk Data             | AF1x | 10/12/14 | Elastic          | BW Queue + DSCP WRED       | CDN Data, Email, FTP, Backup Apps         |
| Best Effort           | DF   | 0        | Elastic          | Default Queue + RED        | Undifferentiated                          |
| Scavenger             | CS1  | 8        | Elastic          | Min BW Queue (Deferential) | YouTube, BitTorent, Xbox Live             |

> Source: RFC 4594 (Aug 2006), updated by RFC 5865 and RFC 8622.
> AF drop precedence: x1=low, x2=medium, x3=high drop probability.

## References

[An Architecture for Differentiated Services](https://www.rfc-editor.org/rfc/rfc2475)
