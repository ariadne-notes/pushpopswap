# QoS

## Terms

**FIFO**
- First in, First out.
- The default behavior of an network node processing IP traffic.

**Differentiated Services**
- AKA, DiffServ.
- Giving packet flows different levels of network service, based on classification.

**Integrated Services** 
- AKA, IntServ. 
- Packet flows explicitly reserve bandwidth along a path, via admission control.

**RSVP** 
- Resource Reservation Protocol.
- Uses Admission control to make explicit QoS reservations on each device in the path.

**Marking** 
- Changing the DSCP bits in the IP header field to put an IP flow into a specific traffic class.

**DSCP** 
- Differentiated Services Code Point.
- The marking of an IP packet that allows DiffServ

**PHB**
- Per Hop Behavior.
- What a node should or shouldn't do with marked traffic.

**Queuing**
- Holding a packet in memory, delaying transmission. Queuing is always expensive.

**LLQ**
- Low latency queuing.
- Describes queue behavior for the EF PHB: 
  - Never drop
  - Never delay
  - Send immediately
  - Police aggressively

**EF**
- Expedited Forwarding.
- The highest tier of service for network data, that isn't control traffic.

**Control Traffic**
- CS6. CS6 traffic is used to share topology information, eg. (OSPF, IS-IS, BGP)

**CAR**
- Committed Access Rate.
- The agreed rate a traffic source will flow at, or violate it's SLA.

**SLA**
- Service Level Agreement.
- SLAs are business agreements about data servicing requirements.

**WFQ**
- Weighted Fair Queuing.
- The default strategy on links under 2Mbps. Sorts traffic into high bw and low bw classes.

**CBWFQ**
- Class Based Weighted Fair Queuing
- AKA, Modular QoS: multiple queues, bandwidth limits, and access to different kinds of queues, like LLQ.

**MQC**
- Modular QoS CLI.

**PQ**
- Priority Queue.
- A queue that is served first, even if other queues have been waiting longer.


## Type of Service

How these 8 bits get used has changed over the years.

```plain
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

### PHB - Per Hop Behaviors

| PHB | Name | Description |
|--------|-----------------------|---|
| **CS** | Class Selector        | CS0 to CS7, backward compatible with IP Precedence |
| **AF** | Assured Forwarding    | Modern Queuing and congestion avoidance |
| **EF** | Expedited Forwarding  | Lossless and LLQ |


## Assured Forwarding

[Assured Forwarding PHB Group](https://datatracker.ietf.org/doc/html/rfc2597)

AF uses the first 6 bits to create 4 traffic classes, 4 is best.

Within those classes, there is a drop precedence, or ... at what point of queue congestion should this traffic be dropped.

Used for RED, or WRED.

Four AF classes, each should get it's own resources.

```plain
Drop

 Precedence      Class 1        Class 2        Class 3       Class 4

            ┌───────────────┬───────────────┬───────────────┬──────────────┐
   Low    │ │ AF11  001 010 │ AF21  010 010 │ AF31  011 010 │ AF41 100 010 │
   Medium │ │ AF12  001 100 │ AF22  010 100 │ AF32  011 100 │ AF42 100 100 │
   High   ▼ │ AF13  001 110 │ AF23  010 110 │ AF33  011 110 │ AF43 100 110 │
            └───────────────┴───────────────┴───────────────┴──────────────┘
             ────────────►  Importance  to Business/Net work ───────────►
```

Again, with DSCP

```plain
Drop

 Precedence      Class 1        Class 2        Class 3       Class 4

            ┌───────────────┬───────────────┬───────────────┬──────────────┐
   Low    │ │ AF11  DSCP 10 │ AF21  DSCP 18 │ AF31  DSCP 26 │ AF41 DSCP 34 │
   Medium │ │ AF12  DSCP 12 │ AF22  DSCP 20 │ AF32  DSCP 28 │ AF42 DSCP 36 │
   High   ▼ │ AF13  DSCP 14 │ AF23  DSCP 22 │ AF33  DSCP 30 │ AF43 DSCP 38 │
            └───────────────┴───────────────┴───────────────┴──────────────┘
             ────────────►  Importance  to Business/Network ───────────►
```

Yields the following formula.

DSCP = 8 (class) + 2 (drop)

## QoS Consequences

LAN QoS with voice (buffer management)

- One voice packet, no voice, but modem will retrain
- Two voice packets, audio clip, fax call disconnection.
- VoIP QoS cannot be fixed by adding bandwidth. You simply cannot drop these
- packets.

## QoS Commands

| Command | Description |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `show mls qos interface f0/0`        | shows if the interface trusts the markings                                |
| `mls qos trust device cisco-phone`   | trusts the phone on the attached port. Uses CDP to verify its a phone     |

## RFC 4594 — DiffServ Service Classes

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
