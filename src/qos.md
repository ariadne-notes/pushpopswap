# Terms
* **FIFO:** First in, First out. The default behavior of an network node processing IP traffic.
* **Differentiated Services:** AKA, DiffServ. Giving packet flows different levels of network service, based on classification.
* **Marking:** Changing the DSCP bits in the IP header field to put an IP flow into a specific traffic class.
* **DSCP:** Differentiated Services Code Point. The marking of an IP packet that allows DiffServ
* **PHB:** Per Hop Behavior. What a node should or shouldn't do with marked traffic.
* **LLQ:** Low latency queuing. Describes queue behavior for the EF PHB: never drop, never delay, send immediately, police aggressively.
* **EF:** Expedited Forwarding. The highest tier of service for network data, that isn't control traffic.
* **Control Traffic:** Usually CS6. These are either routing protocol packets (OSPF, IS-IS, BGP) or data-plane setup packets (IPSec, ISAKMP) 


### Type of Service
How these 8 bits get used has changed over the years.

<pre>
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
</pre>

### Assured Forwarding
[Assured Forwarding PHB Group](https://datatracker.ietf.org/doc/html/rfc2597)

AF uses the first 6 bits to create 4 traffic classes, 4 is best.

Within those classes, there is a drop precedence, or ... at what point of queue congestion should this traffic be dropped.

Used for RED, or WRED.

Four AF classes, each should get it's own resources.

<pre>
Drop                                                                        
 Precedence      Class 1        Class 2        Class 3       Class 4        
            ┌───────────────┬───────────────┬───────────────┬──────────────┐
   Low    │ │ AF11  001 010 │ AF21  010 010 │ AF31  011 010 │ AF41 100 010 │
   Medium │ │ AF12  001 100 │ AF22  010 100 │ AF32  011 100 │ AF42 100 100 │
   High   ▼ │ AF13  001 110 │ AF23  010 110 │ AF33  011 110 │ AF43 100 110 │
            └───────────────┴───────────────┴───────────────┴──────────────┘
             ────────────►  Importance  to Business/Net work ───────────►   
<pre>

### QoS Consequences

LAN QoS with voice (buffer management)

 * One voice packet, no voice, but modem will retrain
 * Two voice packets, audio clip, fax call disconnection.
 * VoIP QoS cannot be fixed by adding bandwidth. You simply cannot drop these
 * packets.
 
#### QoS Commands

| Command | Description |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `show mls qos interface f0/0`        | shows if the interface trusts the markings                                |
| `mls qos trust device cisco-phone`   | trusts the phone on the attached port. Uses CDP to verify its a phone     |


### PHB - Per Hop Behaviors
| PHB | Name | Description |
|--------|-----------------------|---|
| **CS** | Class Selector        | CS0 to CS7, backward compatible with IP Precedence |
| **AF** | Assured Forwarding    | Modern Queuing and congestion avoidance |
| **EF** | Expedited Forwarding  | Lossless and LLQ |


</pre>

# Modern QoS
### RFC 4594 — DiffServ Service Classes

| Service Class         | PHB  | DSCP    | Admission Control | Queuing & AQM           |
|-----------------------|------|---------|-------------------|-------------------------|
| Telephony (VoIP)      | EF   | 46      | Required          | Priority Queue (PQ)     |
| Broadcast Video       | CS5  | 40      | Required          | Priority Queue (PQ)     |
| Real-Time Interactive | CS4  | 32      | Required          | Priority Queue (PQ)     |
| Multimedia Conf.      | AF4x | 34/36/38| Required          | BW Queue + DSCP WRED    |
| Multimedia Streaming  | AF3x | 26/28/30| Recommended       | BW Queue + DSCP WRED    |
| Network Control       | CS6  | 48      | —                 | BW Queue                |
| Call Signaling        | CS3  | 24      | —                 | BW Queue                |
| OAM                   | CS2  | 16      | —                 | BW Queue                |
| Transactional Data    | AF2x | 18/20/22| —                 | BW Queue + DSCP WRED    |
| Bulk Data             | AF1x | 10/12/14| —                 | BW Queue + DSCP WRED    |
| Standard / Best Effort| DF   | 0       | —                 | Default Queue + RED     |
| Low-Priority Data     | CS1  | 8       | —                 | Min BW Queue (Deferential) |

> Source: RFC 4594 (Aug 2006), updated by RFC 5865 and RFC 8622.
> AF drop precedence: x1=low, x2=medium, x3=high drop probability.

# References
[An Architecture for Differentiated Services](https://www.rfc-editor.org/rfc/rfc2475)