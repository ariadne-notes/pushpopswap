# MDT

* Can be ordinary TCP.
* Can also use gRPC, to add TLS.

## TCP Dial-out


```mermaid
sequenceDiagram
    participant C as Collector
    participant R as Router

    R->>C: SYN
    C->>R: SYN-ACK
    R->>C: ACK
    R->>C: Telemetry data
```

## TCP Dial-in


```mermaid
sequenceDiagram
    participant C as Collector
    participant R as Router

    C->>R: SYN
    R->>C: SYN-ACK
    C->>R: ACK
    R->>C: Telemetry data
```

## References

[Model-Driven Telemetry: Dial-In or Dial-Out ? | Telemetry | XRdocs](<https://xrdocs.io/telemetry/blogs/2017-01-20-model-driven-telemetry-dial-in-or-dial-out>)