# BPDU Filter

Maybe you don't want a port to send BPDUs. This effectively turns off spanning-tree.

This feature melts networks.

## Globally


If a port, is running portfast, this feature will transmit 10 to 12 BPDUs when the port first turns on.

```console
spanning-tree portfast bpdufilter default
```

## Per Interface


This port will never send BPDUs.

```console
interface 1
  spanning-tree bpdufilter enable
```
