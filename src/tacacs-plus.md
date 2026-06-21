# TACACS+

## Terms

**RADIUS** --- Remote Authentication Dial-In User Service.


Created to provide AAA for ISP users, or Dial-In for businesses.

**TACACS** --- Terminal Access Controller Access-Control System.

An AAA protocol to provide support for authenticate once, authorize many.

**TACACS+**

Same as above, basically an upgraded version, not backward compatible.

**EAP** --- Extensible Authentication Protocol

802.1x, used for LAN Auth, only works with RADIUS.

## TACACS+ authentication messages

```mermaid
sequenceDiagram
    participant T as Terminal User
    participant C as AAA Client
    participant S as AAA Server

    T ->>  C: Admin Session
    C ->>  S: START (Authentication) - User Trying to Connect
    S -->> C: REPLY (Authentication) - Request Username
    C ->>  S: CONTINUE (Authentication) - Username
    S -->> C: REPLY (Authentication) - Request Password
    C ->>  S: CONTINUE (Authentication) - Password
    S -->> C: REPLY (Authentication) - Pass
    Note over C: Authentication Complete
```

## TACACS authorization and accounting messages

```mermaid
sequenceDiagram
    participant T as Terminal User
    participant C as AAA Client
    participant S as AAA Server

    Note over C: Authentication Complete
    C ->>  S: REQUEST (Authorization) – Service = Shell
    S -->> C: RESPONSE (Authorization) – PASS_ADD
    C ->>  S: REQUEST (Accounting) – START
    S -->> C: RESPONSE (Accounting) – SUCCESS
    T ->>  C: #35; show run
    C ->>  S: REQUEST (Authorization) – Service = Command
    S -->> C: RESPONSE (Authorization) – Pass_ADD
    C ->>  S: REQUEST (Accounting) – CONTINUE
    S -->> C: RESPONSE (Accounting) – SUCCESS
```

# References

A. Woland, V. Santuka, J. Sanbower, and C. Mitchell, *Integrated Security Technologies and Solutions – Volume II: Cisco Security Solutions for Network Access Control, Segmentation, Context Sharing, Secure Connectivity, and Virtualization*. Hoboken, NJ, USA: Cisco Press, 2019, ISBN 978-1-58714-707-4.
