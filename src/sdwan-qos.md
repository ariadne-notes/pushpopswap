# SDWAN QOS

## Queues

SD-WAN has 8 queues. 

**Queue 0**

- Cannot be disabled
- LLQ
- Control Traffic
  - OMP, BFD

**Queue 2**

The default queue. 

If QoS is not configured, all user traffic will take Queue 2.

## Queue Example

```console,editable
policy
 class-map
  class CL_REAL_TIME queue 0
  class CL_CRITICAL_DATA queue 1
  class CL_BEST_EFFORT queue 2
```

## Tables

**Example Class List to Queues**

| Class               | Queue | Method |
|---------------------|-------|--------|
| LLQ (Voice)         |     0 | LLQ    |
| CRTICAL_DATA        |     1 | WRR    |
| BULK                |     2 | WRR    |
| CLASS_DEFAULT       |     3 | WRR    |
| INTERACTIVE_VIDEO   |     4 | WRR    |
| CONTROL SIGNALING   |     5 | WRR    |
| Unused              |     6 | WRR    |
| Unused              |     7 | WRR    |

**Example Bandwidth and Buffer Values**

| Queue | Bandwidth | Buffer | Drops              |
|-------|-----------| -------|--------------------|
|     0 | 10        | 10     | Tail Drop          |
|     1 | 30        | 30     | Random Early (RED) |
|     2 | 10        | 10     | Random Early (RED) |
|     3 | 20        | 20     | Random Early (RED) |
|     4 | 20        | 20     | Random Early (RED) |

## References

[Cisco - Forwarding and QoS Configuration Guide for vEdge Routers, Cisco SD-WAN Release 20](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/qos/vEdge-20-x/qos-book/forwarding-qos.html)