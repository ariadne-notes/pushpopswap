# MDT

## Terms

**ST** --- Streaming Telemetry

**MDT** --- Model Driven Telemetry

- Can be ordinary TCP
- Can also use gRPC, to add TLS

## TCP dial-in

- Collector establishes a connection
- Then subscribes


```mermaid
sequenceDiagram
    participant C as Collector
    participant R as Router

    C->>R: SYN
    R->>C: SYN-ACK
    C->>R: ACK
    R->>C: Telemetry data
```

## TCP dial-out

- Telemetry is pushed to the collector
- As soon as it changes (low latency)
- When in changes (low throughput)

```mermaid
sequenceDiagram
    participant C as Collector
    participant R as Router

    R->>C: SYN
    C->>R: SYN-ACK
    R->>C: ACK
    R->>C: Telemetry data
```

## References

[Cisco - Whitepaper - Model Driven Telemetry](https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9300-series-switches/model-driven-telemetry-wp.html)

[Cisco Live - gRPC, gNMI, gNOI ... Oh My! - Jeremy Cohoe - BRKDEV-2017](/pdfs/ciscolive/BRKDEV-2017.pdf)

[NANOG73 - SNMP is Dead - Carl Lebsack, Rob Shakir](/pdfs/nanog/20180625_Shakir_Snmp_Is_Dead_v1.pdf)

[XRdocs - Model-Driven Telemetry: Dial-In or Dial-Out ? | Telemetry](<https://xrdocs.io/telemetry/blogs/2017-01-20-model-driven-telemetry-dial-in-or-dial-out>)
