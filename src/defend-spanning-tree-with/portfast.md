# with Portfast

The best practice is to configure this on every port connected to hosts.

- Hosts and end devices
- Transition to forwarding faster
- Do not send TCN BPDUs

> [!NOTE]
>

> This stops TCNs, which cause the max-age timer to reduce to the duration of the forward delay on receipt of a TCN.


## Hosts wich require portfast

- PXE
- DHCP

The minimum time for 802.1D is 30 seconds, (2x the forwarding delay).

This means some computers will miss DHCP, and sometimes PXE fails.

## Config

### Enable on all access ports

```console
spanning-tree portfast default
```

### Enable on trunks

Some trunk ports connect to servers. Portfast can be enabled on those too.

```console
spanning-tree portfast trunk
```
