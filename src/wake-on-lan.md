# Wake on LAN

* Usually a UDP port 0 broadcast `255.255.255.255` frame with `FF FF FF FF FF FF` as it's payload.
* 16 repetitions of the target computers 48-bit MAC Address.
* Sometimes sent as a directed broadcast `10.0.0.1/24` becomes `10.0.0.255`.
  - Directed broadcasts require the routers be configured to allow them.