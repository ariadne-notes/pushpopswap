# BGP Neighbor FSM

## Events

There are 28 events total.

### Administrative Events

Things the operator can set.

- Event 1: `ManualStart`
- Event 2: `ManualStop`
- Event 3: `AutomaticStart`
- Event 4: `ManualStart_with_PassiveTcpEstablishment`
- Event 5: `AutomaticStart_with_PassiveTcpEstablishment`
- Event 6: `AutomaticStart_with_DampPeerOscillations`
- Event 7: `AutomaticStart_with_DampPeerOscillations_and_PassiveTcpEstablishment`
- Event 8: `AutomaticStop`

### Timer Events

- Event 9: `ConnectRetryTimer_Expires`
- Event 10 `HoldTimer_Expires`
- Event 11 `KeepaliveTimer_Expires`
- Event 12 `DelayOpenTimer_Expires`
- Event 13 `IdleHoldTimer_Expires`

### TCP connection based events

Packet based, not necessarily the BGP app, but the underlying transport.

- Event 14: `TcpConnection_Valid`
- Event 15: `Tcp_CR_Invalid`
- Event 16: `Tcp_CR_Acked`
- Event 17: `TcpConnectionConfirmed`
- Event 18: `TcpConnectionFails`

### BGP message based events

Sent or received over TCP.

- Event 19: `BGPOpen`
- Event 20: `BGPOpen with DelayOpenTimer running`
- Event 21: `BGPHeaderErr`
- Event 22: `BGPOpenMsgErr`
- Event 23: `OpenCollisionDump`
- Event 24: `NotifMsgVerErr`
- Event 25: `NotifMsg`
- Event 26: `KeepAliveMsg`
- Event 27: `UpdateMsg`
- Event 28: `UpdateMsgErr`
