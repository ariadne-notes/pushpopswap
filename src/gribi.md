# gRIBI

**gRIBI** --- gRPC Routing Information Base Interface

[Motivation](https://github.com/openconfig/gribi/blob/master/doc/motivation.md)

Routers do a poor job of providing telemetry for "I have the route installed."

- injected entries are interdependent (rely on other routes being present)
- Request/response driven
- Separate from other protocols
- A normal vendor neutral interface
- Treated as control plane
  - As if learned via a dynamic protocol
  - Not config

## Functions

[Overview](https://github.com/openconfig/gribi/blob/master/doc/motivation.md)

- Route Injection

## Client

[gRIBIc](https://gribic.kmrd.dev/)

## References

[NANOG 93 - gRPC Services under one roof - Reda Laichi - Nokia](/pdfs/nanog/20250202_Laichi_Grpc_Services_Under_v1.pdf)

[GitHub - openconfig/gribi: A gRPC Interface to a Network Element RIB](https://github.com/openconfig/gribi)
