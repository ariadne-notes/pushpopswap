# Traceroute

`ip proto 1`


```
  10.0.0.1/32     10.0.0.2/32     10.0.0.3/3       10.0.0.4/32       10.0.0.5/32
     │               │               │                │                 │       
     │ 10.0.12.0/24  │ 10.2.23.0/24  │  10.0.34.0/24  │  10.2.45.0/24   │       
     ▼       │       ▼       │       ▼        │       ▼        │        ▼       
  ┌────┐.1   ▼  .2┌────┐.2   ▼  .3┌────┐.3    ▼  .4┌────┐.4    ▼   .5┌────┐     
  │    ├──────────┤    ├──────────┤    ├───────────┤    ├────────────┤    │     
  │ R1 │          │ R2 │          │ R3 │           │ R4 │            │ R5 │     
  │    ├──────────┤    ├──────────┤    ├───────────┤    ├────────────┤    │     
  └────┘.1   ▲  .2└────┘.2   ▲  .3└────┘.3    ▲  .4└────┘.4    ▲   .5└────┘     
             │               │                │                │                
       10.1.12.0/24    10.3.23.0/24     10.1.34.0/24     10.3.45.0/24           
```

## Loss on R4-R5 from R1

```
R1# traceroute ip 10.0.0.5 source 10.0.0.1 probe 5
Type escape sequence to abort.
Tracing the route to 10.0.0.5
VRF info: (vrf in name/id, vrf out name/id)
  1 10.0.12.2 4 msec
    10.1.12.2 5 msec
    10.0.12.2 5 msec
    10.1.12.2 5 msec
    10.0.12.2 5 msec
  2 10.3.23.3 7 msec 7 msec 6 msec 6 msec 7 msec
  3 10.1.34.4 9 msec 10 msec 9 msec 10 msec 9 msec
  4 10.2.45.5 11 msec 9 msec *  11 msec * 
```

## Loss on R1-R2

```
R5# traceroute 10.0.0.1 source 10.0.0.5 probe 5
Type escape sequence to abort.
Tracing the route to 10.0.0.1
VRF info: (vrf in name/id, vrf out name/id)
  1 10.2.45.4 5 msec
    10.3.45.4 4 msec
    10.2.45.4 5 msec
    10.3.45.4 5 msec
    10.2.45.4 5 msec
  2 10.0.34.3 7 msec 7 msec 6 msec 5 msec 7 msec
  3 10.2.23.2 9 msec 10 msec 10 msec 10 msec 10 msec
  4 10.0.12.1 11 msec 11 msec *  12 msec * 
```
