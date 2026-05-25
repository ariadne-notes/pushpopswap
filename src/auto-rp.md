# Auto-RP

Cisco devices can announce their willingness to be an RP, via `cisco-rp-announce`

A different service, a mapping agent, will read these messages, pick a winner, then advertise that out via `cisco-rp-discovery`

* 5.5.5.5, Candidate RP.
* 4.4.4.4, mapping agent.

<pre>
R4# show ip pim autorp

AutoRP Information:

  AutoRP is enabled.
  RP Discovery packet MTU is 1500.
  224.0.1.40 is joined on Loopback0.
  AutoRP groups over sparse mode interface is enabled

PIM AutoRP Statistics: Sent/Received
  RP Announce: 0/16, RP Discovery: 64/42
</pre>

These packets are slow.

<pre>
R4# debug ip pim auto-rp

PIM Auto-RP debugging is on
!
! Sent to cisco-rp-discovery
!
*Apr 25 19:57:08.940: Auto-RP(0): Build RP-Discovery packet
*Apr 25 19:57:08.941: Auto-RP(0):  Build mapping (224.0.0.0/4, RP:5.5.5.5), PIMv2 v1,
*Apr 25 19:57:08.942: Auto-RP(0): Send RP-discovery packet of length 48 on GigabitEthernet0/3 (1 RP entries)
*Apr 25 19:57:08.943: Auto-RP(0): Send RP-discovery packet of length 48 on GigabitEthernet0/4 (1 RP entries)
*Apr 25 19:57:08.945: Auto-RP(0): Send RP-discovery packet of length 48 on GigabitEthernet0/0 (1 RP entries)
*Apr 25 19:57:08.948: Auto-RP(0): Send RP-discovery packet of length 48 on Loopback0(*) (1 RP entries)
*Apr 25 19:57:12.008: Auto-RP(0): Received RP-discovery packet of length 48, from 10.0.45.5, ignored
!
! Received by cisco-rp-announce
!
*Apr 25 19:58:30.159: Auto-RP(0): Received RP-announce packet of length 48, from 5.5.5.5, RP_cnt 1, ht 181
*Apr 25 19:58:30.159: (0): pim_add_prm:: 224.0.0.0/240.0.0.0, rp=5.5.5.5, repl = 0, ver =3, is_neg =0, bidir = 0, crp = 0
*Apr 25 19:58:30.160: Auto-RP(0): Update
*Apr 25 19:58:30.160:  prm_rp->bidir_mode = 0 vs bidir = 0 (224.0.0.0/4, RP:5.5.5.5), PIMv2 v1
R4# undebug all
All possible debugging has been turned off
</pre>

## References

[Cisco - Configuring a Rendezvous Point](https://www.cisco.com/c/en/us/td/docs/ios/solutions_docs/ip_multicast/White_papers/rps.html#wp1029236)