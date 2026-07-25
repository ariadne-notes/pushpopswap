# EAP-FAST

**EAP-FAST** --- Flexible Authentication via Secure Tunneling

EAP-FAST is a tunneled EAP method defined in RFC 4851. It was developed by
Cisco as a replacement for LEAP: keep the username/password style deployment
model, but put weak inner credentials inside a mutually authenticated TLS
tunnel instead of exposing them to passive capture.

At a high level, EAP-FAST looks like PEAP:

- **Phase 1**, establishes or resumes a TLS tunnel between the peer and the
  EAP-FAST server.
- **Phase 2**, carries inner authentication data inside that tunnel using TLVs.
  The inner method can be another EAP method or other authentication data.

The distinctive EAP-FAST piece is the **Protected Access Credential (PAC)**.
A PAC can let the client and server resume or establish the tunnel from a
shared secret instead of requiring a traditional server-certificate-only PEAP
model every time.

PAC components:

- **PAC-Key**, shared secret used to derive TLS keying material.
- **PAC-Opaque**, opaque ticket data the peer returns to the server.
- **PAC-Info**, optional metadata useful to the peer.

```mermaid
sequenceDiagram
    autonumber
    participant C as Wireless Client
    participant AP as Access Point
    participant WLC as WLC<br/>Authenticator
    participant AS as EAP-FAST Server
    participant IMS as Inner Method Server

    C->>AP: Associate to WLAN
    Note over C,AP: Data blocked until 802.1X completes

    rect rgba(128, 160, 255, 0.12)
        Note over C,AS: Phase 1 — EAP identity + TLS tunnel
        WLC->>C: EAP-Request/Identity
        C->>WLC: EAP-Response/Identity
        WLC->>AS: RADIUS Access-Request (EAP identity)
        AS->>WLC: Access-Challenge (EAP-FAST Start)
        WLC->>C: EAP-Request/EAP-FAST (Start)
        C->>WLC: EAP-Response/EAP-FAST (TLS ClientHello / PAC data)
        WLC->>AS: Access-Request (EAP-FAST TLS data)
        AS->>WLC: Access-Challenge (TLS server data)
        WLC->>C: EAP-Request/EAP-FAST (TLS server data)
        C->>WLC: EAP-Response/EAP-FAST (TLS client data)
        WLC->>AS: Access-Request (EAP-FAST TLS data)
        Note over C,AS: Protected tunnel established
    end

    rect rgba(120, 200, 140, 0.14)
        Note over C,IMS: Phase 2 — Inner authentication inside TLVs
        AS-->>C: EAP-FAST TLV (EAP-Payload / inner request)
        C-->>AS: EAP-FAST TLV (EAP-Payload / inner response)
        AS->>IMS: Validate inner method, if separate
        IMS->>AS: Inner authentication result
        AS-->>C: EAP-FAST TLV (Result + Crypto-Binding)
        C-->>AS: EAP-FAST TLV (Result acknowledgement)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over C,AS: Completion
        AS->>WLC: Access-Accept (MSK)
        WLC->>C: EAP-Success
        Note over C,AP: 802.11 4-Way Handshake<br/>(M1/M2/M3/M4)
        AP->>C: WLAN access allowed
    end
```

## Notes

- The authenticator, EAP-FAST server, and inner method server are logical
  roles. They may be separate systems or collapsed into one device.
- RFC 4851 was published in 2007 and originally referenced TLS 1.0/1.1. Those
  versions are deprecated by RFC 8996, and TLS-based EAP methods were later
  updated for TLS 1.3 by RFC 9427.
- EAP-FAST provides fast reconnect, fragmentation, key derivation, replay
  protection, cryptographic binding, and dictionary attack protection.

## References

[RFC 4851: The Flexible Authentication via Secure Tunneling Extensible Authentication Protocol Method (EAP-FAST) | RFC Editor](https://www.rfc-editor.org/info/rfc4851/)

[RFC 8996: Deprecating TLS 1.0 and TLS 1.1 | RFC Editor](https://www.rfc-editor.org/info/rfc8996/)

[RFC 9427: TLS-Based Extensible Authentication Protocol (EAP) Types for Use with TLS 1.3 | RFC Editor](https://www.rfc-editor.org/info/rfc9427/)
