# EAP-TLS with Cisco ISE and WLC

This flow is pulled out of the [TACENT-2025] slides, with corrections to
Phase 3[^1] and Phase 4[^2]; the same flow is documented in this Cisco whitepaper, 
[Configure EAP-TLS on 9800 WLC with ISE Internal CA]. 

[TACENT-2025]: /pdfs/ciscolive/TACENT-2025.pdf
[Configure EAP-TLS on 9800 WLC with ISE Internal CA]: https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/222721-configure-eap-tls-on-9800-wlc-with-ise-i.html

```mermaid
sequenceDiagram
    autonumber
    participant C as Wireless Client
    participant AP as Access Point
    participant WLC as Catalyst 9800 WLC
    participant ISE as Cisco ISE / RADIUS

    C->>AP: Associate to WLAN
    Note over C,AP: Data blocked until 802.1X completes

    rect rgba(128, 160, 255, 0.12)
        Note over C,ISE: Phase 1 — Identity + TLS start (< 1000 bytes)
        WLC->>C: EAP-Request/Identity
        C->>WLC: EAP-Response/Identity
        WLC->>ISE: RADIUS Access-Request (user ID)
        ISE->>WLC: Access-Challenge (EAP-TLS Start)
        WLC->>C: EAP-Request/EAP-TLS (Start)
        C->>WLC: EAP-Response/EAP-TLS (ClientHello)
        WLC->>ISE: Access-Request (ClientHello)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over C,ISE: Phase 2 — Server credentials (avg cert 2,200-8,000 bytes)
        ISE->>WLC: Access-Challenge (ServerHello, Certificate,<br>ServerKeyExchange, CertificateRequest, ServerHelloDone)
        WLC->>C: EAP-Request/EAP-TLS (server handshake)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over C,ISE: Phase 3 — Client credentials (avg cert 2,200-8,000 bytes)
        C->>WLC: EAP-Response/EAP-TLS (Certificate, ClientKeyExchange,<br>CertificateVerify, ChangeCipherSpec, Finished)
        WLC->>ISE: Access-Request (client handshake)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over C,ISE: Phase 4 — Completion (< 1000 bytes)
        ISE->>WLC: Access-Challenge (ChangeCipherSpec, Finished)
        WLC->>C: EAP-Request/EAP-TLS (ChangeCipherSpec, Finished)
        C->>WLC: EAP-Response/EAP-TLS (no data)
        WLC->>ISE: Access-Request (EAP-TLS response)
        ISE->>WLC: Access-Accept
        WLC->>C: EAP-Success
        Note over C,AP: 802.11 4-Way Handshake (M1/M2/M3/M4)
        AP->>C: WLAN access allowed
    end
```

[^1]: The slide lists "Server Key Exchange" in the client's Phase 3 flight;
    that is a typo for ClientKeyExchange --- in TLS 1.2 the client's flight is
    Certificate, ClientKeyExchange, CertificateVerify, ChangeCipherSpec,
    Finished (RFC 5246 §7.3).

[^2]: Phase 4 in TLS 1.2 is the server's ChangeCipherSpec + Finished. There is
    no protected success indication here --- that was added in EAP-TLS 1.3
    (RFC 9190).

## References

[Configure EAP-TLS on 9800 WLC with ISE Internal CA - Cisco](https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/222721-configure-eap-tls-on-9800-wlc-with-ise-i.html)

[EAP-TLS - RFC 5216: The EAP-TLS Authentication Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc5216/)

[Cisco Live - Maximize Your 9800 Wireless Controller Capabilities: Troubleshoot 802.1x and Gain Radius Fragment Control with MTU - Carlos Socorro - TACENT-2025](/pdfs/ciscolive/TACENT-2025.pdf)
