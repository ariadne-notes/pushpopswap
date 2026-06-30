# TCP

Connection oriented.

## Header

```
 0                   1                   2                   3    
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1  
┌───────────────────────────────┬───────────────────────────────┐ 
│          Source Port          │       Destination Port        │ 
├───────────────────────────────┴───────────────────────────────┤ 
│                        Sequence Number                        │ 
├───────────────────────────────────────────────────────────────┤ 
│                    Acknowledgment Number                      │ 
├───────┬───────┬─┬─┬─┬─┬─┬─┬─┬─┬───────────────────────────────┤ 
│  Data │       │C│E│U│A│P│R│S│F│                               │ 
│ Offset│ Rsrvd │W│C│R│C│S│S│Y│I│            Window             │ 
│       │       │R│E│G│K│H│T│N│N│                               │ 
├───────┴───────┴─┴─┴─┴─┴─┴─┴─┴─┼───────────────────────────────┤ 
│           Checksum            │         Urgent Pointer        │ 
├───────────────────────────────┴───────────────────────────────┤ 
│                           [Options]                           │ 
├───────────────────────────────────────────────────────────────┤ 
│                                                               │ 
│                             Data                              │ 
│                                                               │ 
└───────────────────────────────────────────────────────────────┘ 
```

## Flags

- Congestion Window Reduced
- ECN-Echo
- Urgent
- Acknowledgment
- Push
- Reset
- Synchronize
- Final

## References

[RFC 9293: Transmission Control Protocol (TCP) | RFC Editor](https://www.rfc-editor.org/info/rfc9293/)
