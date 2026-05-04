Back-to-Back frame relay is without a Frame Relay Hub, the encapsulation is frame-relay on a point-to-point link.

Frame relay expects LMI by default, so to get this work, we need to disable keepalives.

```
             10.0.0.0/30
┌────┐DCE                  DTE┌────┐
│ R1 ├────────────────────────│ R2 │
└────┘ .1                  .2 └────┘
```

# R1
The DCE generates the clock.

```
!
! R1
!
ip address 10.0.0.1 255.255.255.252
encapsulation frame-relay
frame-relay map ip 10.0.0.2 102
clockrate 64000
no keepalive
no shut
```

# R2
```
!
! R2
!
ip address 10.0.0.2 255.255.255.252
encapsulation frame-relay
frame-relay map ip 10.0.0.0 1
no keepalive
no shut
```

# Reference

[CCIE Nyquist - Back to Back Frame Relay](https://ccie.nyquist.eu/layer-2-technologies/layer-2-wan-protocols/frame-relay/frame-relay-101#back-to-back-frame-relay)