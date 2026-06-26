# Path attributes

[RFC 4271 - BGP-4](https://www.rfc-editor.org/rfc/rfc4271#section-5)

**Mandatory**

- All prefixes must contain

**Well-known**

- All BGP implementations must recognize

**Discretionary**

These attributes can be absent.

| Attribute Name         | Attribute Type / Status  |Type Code|
| -----------------------| ------------------------ |--------:|
| [ORIGIN]               | Well-known mandatory     |        1|
| [AS_PATH]              | Well-known mandatory     |        2|
| [NEXT_HOP]             | Well-known mandatory     |        3|
| [LOCAL_PREF]           | Well-known discretionary |        5|
| [ATOMIC_AGGREGATE]     | Well-known discretionary |        6|
| [AGGREGATOR]           | Optional transitive      |        7|
| [COMMUNITIES]          | Optional transitive      |        8|
| [EXTENDED_COMMUNITIES] | Optional transitive      |       16|
| [MULTI_EXIT_DISC]      | Optional non-transitive  |        4|
| [ORIGINATOR_ID]        | Optional non-transitive  |        9|
| [CLUSTER_LIST]         | Optional non-transitive  |       10|
| [MP_REACH_NLRI]        | Optional non-transitive  |       14|
| [MP_UNREACH_NLRI]      | Optional non-transitive  |       15|
| DPA                    | Deprecated               |       11|
| ADVERTISER             | Deprecated               |       12|
| RCID_PATH / CLUSTER_ID | Deprecated               |       13|

[AS_PATH]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.2
[ORIGIN]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.1
[NEXT_HOP]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.3
[LOCAL_PREF]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.5
[MULTI_EXIT_DISC]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.4
[ATOMIC_AGGREGATE]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.6
[AGGREGATOR]: https://www.rfc-editor.org/info/rfc4271/#section-5.1.7
[Communities]: https://www.rfc-editor.org/info/rfc1997/
[EXTENDED_COMMUNITIES]: https://www.rfc-editor.org/info/rfc4360/
[ORIGINATOR_ID]: https://www.rfc-editor.org/info/rfc4456/#section-8
[CLUSTER_LIST]: https://www.rfc-editor.org/info/rfc4456/#section-8
[MP_REACH_NLRI]: https://datatracker.ietf.org/doc/html/rfc4760#section-3
[MP_UNREACH_NLRI]: https://datatracker.ietf.org/doc/html/rfc4760#section-3
