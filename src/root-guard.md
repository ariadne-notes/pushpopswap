# Root Guard

Rootguard is an alternative to BPDU guard, when the port needs to participate in BPDUs, but should never receive a superior BPDU.

Normally SW1 is the root bridge

<pre>
┌───────────┐                                                                                      ┌───────────────┐
│  SW1   DP ├──  0 / 1 / 52:54:00:e8:3a:ff ─────────────────────── 4096 / 1 / 52:54:00:4b:99:08  ──┤ RP     SW2    │
└───────────┘                                                                                      └───────────────┘
</pre>

Someone configures SW2 to be the root by making the switch priority 0.

<pre>
┌───────────┐                                                                                      ┌───────────────┐
│  SW1   RP ├──  0 / 1 / 52:54:00:e8:3a:ff ───────────────────────    0 / 1 / 52:54:00:4b:99:08  ──┤ DP     SW2    │
└───────────┘                                                                                      └───────────────┘
</pre>

This can be prevented with this config. Root guard goes onto DPs.

```console
!
! SW1
!
interface 1
  spanning tree guard root
```

## Verification


```console
sw1# show spanning-tree 

VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    4097
             Address     5254.004f.110e
             This bridge is the root
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    4097   (priority 4096 sys-id-ext 1)
             Address     5254.004f.110e
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  300 sec

Interface           Role Sts Cost      Prio.Nbr Type
------------------- ---- --- --------- -------- --------------------------------
Gi0/0               Desg BKN*4         128.1    P2p *ROOT_Inc 
Gi0/2               Desg BKN*4         128.3    P2p *ROOT_Inc 
```

## Logs

```console
*May  3 20:14:45.169: %SPANTREE-2-ROOTGUARD_BLOCK: Root guard blocking port GigabitEthernet0/0 on VLAN0001.  
```
