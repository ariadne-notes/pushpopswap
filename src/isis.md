# ISIS

ISIS Uses a simplified topology compared to OSPF.

There are only three kinds of routers.

* **L2** Backbone routers, which can carry summaries.

* **L1L2:** ABRs, AKA Area Border Routers.


* **L1:** These are the Area routers. They do not flood their link state databases into L2.

## Example


<pre>
                                             ┌──────┐
                                             │ L1   │
                                             └───┬──┘
                                                 │
┌──────┐     ┌──────┐        ┌──────┐        ┌───┴──┐     ┌─────┐
│  L1  ├─────┤ L1L2 ├────────┤  L2  ├────────┤ L1L2 ├─────┤ L1  │
└───┬──┘     └───┬──┘        └──────┘        └───┬──┘     └─────┘
    │            └──────┐                  ┌─────┘
┌───┴──┐             ┌──┴───┐          ┌───┴──┐
│  L1  │             │  L2  │──────────┤  L2  │
└──────┘             └──────┘          └──────┘
</pre>

## IS-IS Metric Styles

IS-IS supports two metric styles relevant to MPLS-TE:

| Style       | Description |
|-------------|--------------------------------------------------------------|
| **Narrow**  | Legacy metric style; max metric value 63 per link, 1023 path |
| **Wide**    | Extended metric style; max metric of 16 772 215.             |

### Configuration

Enable wide metrics:
```
metric-style wide
```

### Transition Commands

Used when migrating from narrow to wide without a hard cutover:

| Command | Behavior |
|---------|----------|
| `metric-style transition`         | Advertises **both** narrow and wide TLVs simultaneously |
| `metric-style narrow transition`  | Transitioning — still **advertising narrow** (old) |
| `metric-style wide transition`    | Transitioning — now **advertising wide** (new) |
