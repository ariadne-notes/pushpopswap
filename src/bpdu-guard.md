# BPDU Guard

- Only works if the attached device sends a BPDU. Cannot prevent a switch from being attached to a port. 802.1x helps with that.

## Detects A BPDU, and Err-Disables A port

The global command only affects ports that have portfast already turned on, i.e. this is an edge feature.

```console
switch(config)# spanning-tree portfast bpduguard default
```

... should be set so access ports go `errdisable` when a rogue switch is connected and require an operator to correct.

## Seeing `err-disabled` status

```console
switch# show int status

Port      Name               Status       Vlan       Duplex  Speed Type 
[output omitted]
Et2/3                        err-disabled 1            auto   auto unknown
Et3/0                        connected    trunk        auto   auto unknown
Et3/1                        connected    1            auto   auto unknown
```

## Turning on automated recovery

```console
switch(config)# errdisable recovery cause bpduguard
```

## Verify

```console
switch# show errdisable recovery 
ErrDisable Reason            Timer Status
-----------------            --------------
arp-inspection               Disabled
bpduguard                    Enabled

[output omitted]
          
Interface       Errdisable reason       Time left(sec)
---------       -----------------       --------------
unicast-flood                Disabled
vmps                         Disabled
psp                          Disabled
dual-active-recovery         Disabled
evc-lite input mapping fa    Disabled
Recovery command: "clear     Disabled

Timer interval: 300 seconds

Interfaces that will be enabled at the next timeout:

Interface       Errdisable reason       Time left(sec)
---------       -----------------       --------------
Et2/3                  bpduguard          296
```
