# SNMP is Dead

## The problem

**SNMP doesn't timestamps data**

Polling the same OID, multiple times, leads to the same data.

There is always a delay between the counters, and when the SNMP agent scrapes the counter to add to the MIB.

The delay between the counter and the MIB update can be 30 to 60 seconds behind.

We never see real-time data.

**Timeouts** 

SNMP frequently fails to return anything at all, even under modest load conditions. 

When the data is graphed, the most impactful data (the spikes) will not show up, because the SNMP agent didn't return a result.

The resulting graph is missing vital data.

**SNMP is bad at low-latency updates**

- Polling is asynchronous
- Over-polling leads to more load
- Traps are UDP and get lost
- Fast events like an interface flap are unnecessarily difficult to detect

**SNMP doesn't scale**

- Modern RIBs are cannot be transmitted via SNMP.

## The solution

Streaming Telemetry.

## References

[SNMP is Dead - Carl Lebsack, Rob Shakir - NANOG73](./pdfs/nanog/20180625_Shakir_Snmp_Is_Dead_v1.pdf)
