# RFC 3535, 20 Years Later

IAB organized a workshop between June 4 to June 6th in 2002 to establish a dialog between network operators and developers to guide the IETF on network automation.

That workshop is recorded in [RFC 3535].

[RFC 3535]: https://www.rfc-editor.org/info/rfc3535/

Twenty years later, how is progress?

| RFC3535 Requests              | Solved?                              |
| ----------------------------- | ------------------------------------ |
| EASE-USE                      | Config yes, monitor no               |
| CONFIG-OPS-SEPARATE           | Yes                                  |
| CONFIG-OPS-FETCH-SEPARATE     | Yes                                  |
| NETWORK-NOT-DEVICE            | Mostly                               |
| NETWORK-WIDE-TRANSACTIONS     | Yes                                  |
| CONFIG-DIFF                   | Yes                                  |
| CONFIG-DUMP-RESTORE           | Yes                                  |
| CONFIG-CONSISTENCY-CHECK      | Implementation-specific              |
| CONFIG-NETWORK-WIDE-SCHEMA    | Yes                                  |
| TXT-PROCESSING-TOOLS          | Deployment-specific                  |
| ACCESS-CONTROL-OPS-CENTRIC    | Implementation-specific              |
| ACCESS-CONTROL-CHECKS         | Implementation-specific              |
| CONFIG-SEPARATE-DISTRIB-ACTIV | Yes                                  |
| ACCESS-CONTROL-BOTH-DATA-TASK | Yes                                  |

## Ongoing Industry Problems

Models tend to be proprietary since the vendors consider technology their competitive advantage.

Operators don't want to share how they use their models, since ... being good at networking is their competitive advantage.

The industry wants **XaaS** -- X as a Service, but to get there, data models are required to specify **everything.**

No data models, no network API.

### IETF is slow

IS-IS for SR was published in 2019, the YANG model took 5 years to come out.

## References

[Documentation | OpenTelemetry](https://opentelemetry.io/docs/)

[RFC 3535, 20 Years Later: An Update of Operators Requirements on Network Management Protocols and Modelling](https://www.ietf.org/archive/id/draft-boucadair-nmop-rfc3535-20years-later-08.html)