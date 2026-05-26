# MPLS

## MPLS Requires CEF


## Frame Format

<pre>
  RFC 3032 - MPLS Label Stack Encoding

  0                   1                   2                   3
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ Label
  |                Label                  | Exp |S|       TTL     | Stack
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ Entry

                      Label:  Label Value, 20 bits
                      Exp:    Experimental Use, 3 bits
                      S:      Bottom of Stack, 1 bit
                      TTL:    Time to Live, 8 bits
</pre>

## MPLS Control Plane

| Table                                | Short Form | Notes |  Command |
| ------------------------------------ | ---- | ------------------------ | ------------------------- |
| Routing Information Base             | RIB  | The Best Path            | `show ip route`           |
| Label Information Base               | LIB  | All labels we've heard   | `show mpls ldp binding`   |
| Label Forwarding Information Base    | LFIB | The best label           | `show mpls forwarding`    |
| LDP Peers                            |   -  | Who provides labels      | `show mpls ldp neighbors` |

**Local Label** - This is what the LSP tells others it wants to recieve.

**Outgoing label** - What the LSP does next.

## Null Labels

`[3] Implicit` Pop the label. Implicit because the label is missing.

`[0] Explicit` Keep the label, but the destination must pop it. Used for MPLS QoS.


## Steps To Build The LFIB

### 1. Find The Next-Hop For The Destination Prefix

```console
show ip route 3.3.3.4
 * 10.1.2.1, from 10.1.2.1 via Eth0/0
```

### 2. Confirm The LDP Neighbor Behind That Next-Hop

```console
show mpls ldp neighbor 10.1.2.1
 * peer LDP ident 3.3.3.3; Local LDP ident 2.2.2.2
```

### 3. Check What Label That Peer Advertised For The Prefix

```console
show mpls ldp binding 3.3.3.4 255.255.255.255
 * remote binding: lsr: 3.3.3.3, label: imp-null
```

### 4. Verify The Resulting LFIB Entry

```console
show mpls forwarding 3.3.3.4
- Local 20, Outgoing Pop, Prefix 3.3.3.3/32, Outgoing Int E0/0, Nexthop 10.1.2.1
```

## Testing Pseudowires

You can test MPLS pseduowire labels by doing labeled pings.

`ping mpls pseudowire 3.3.3.3 11000`
