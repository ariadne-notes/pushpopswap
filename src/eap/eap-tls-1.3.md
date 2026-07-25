# EAP-TLS 1.3

I don't know if Cisco has this implemented. I saw the RFC and thought diagraming it would be neat.

RFC 9190 updates EAP-TLS for TLS 1.3. 

Compared to the [TLS 1.2 flow]:

[TLS 1.2 flow]: /eap/eap-tls-cisco-ise-and-wlc.md

- Server sends the handshake in one exchange
- Client certificate is encrypted
  - Client identity should be a privacy-friendly anonymous NAI (e.g. `@realm`)
- Server signals completion with a protected success indication
  -  one octet of TLS application data (`0x00`), before the cleartext EAP-Success

```mermaid
sequenceDiagram
    autonumber
    participant S as Supplicant
    participant AP as AP
    participant WLC as WLC
    participant AS as Authentication Server

    Note over S,AP: EAPoL
    Note over AP,WLC: CAPWAP
    Note over WLC,AS: RADIUS

    rect rgba(128, 160, 255, 0.12)
        Note over S,AS: Phase 1 — Identity + TLS 1.3 start (< 1000 bytes)
        WLC->>S: EAP-ID Request
        S->>WLC: EAP-ID Response (privacy-friendly NAI)
        WLC->>AS: Access-Request (EAP-ID Response)
        AS->>WLC: Access-Challenge (EAP-TLS Start)
        WLC->>S: EAP-Request/EAP-TLS (Start)
        S->>WLC: EAP-Response/EAP-TLS (TLS ClientHello)
        WLC->>AS: Access-Request (TLS ClientHello)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over S,AS: Phase 2 — Server TLS 1.3 handshake
        AS->>WLC: Access-Challenge (TLS ServerHello, EncryptedExtensions,<br>CertificateRequest, Certificate, CertificateVerify, Finished)
        WLC->>S: EAP-Request/EAP-TLS (server handshake)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over S,AS: Phase 3 — Client TLS 1.3 handshake
        S->>WLC: EAP-Response/EAP-TLS (TLS Certificate, CertificateVerify, Finished)
        WLC->>AS: Access-Request (client handshake)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over S,AS: Phase 4 — Protected success + 802.11 keys
        AS->>WLC: Access-Challenge (TLS Application Data 0x00)
        WLC->>S: EAP-Request/EAP-TLS (TLS Application Data 0x00)
        S->>WLC: EAP-Response/EAP-TLS (no data)
        WLC->>AS: Access-Request (EAP-TLS response)
        AS->>WLC: Access-Accept (MSK)
        WLC->>S: EAP Success
        Note over S,WLC: 4-Way Handshake (M1/M2/M3/M4) → Success
    end
```

## References

[EAP-TLS 1.3 - RFC 9190: Using the Extensible Authentication Protocol with TLS 1.3 | RFC Editor](https://www.rfc-editor.org/info/rfc9190/)

[EAP-TLS - RFC 5216: The EAP-TLS Authentication Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc5216/)
