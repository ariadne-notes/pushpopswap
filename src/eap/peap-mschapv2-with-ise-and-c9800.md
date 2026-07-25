# PEAP-MSCHAPv2 with ISE and C9800

**PEAP** --- Protected Extensible Authentication Protocol

ISE uses a certificate, the clients authenticate with a username and password against active directory.

It has two phases:

- **Phase 1** builds a TLS tunnel, much like the HTTPS handshake. The client
  validates ISE's server certificate but does not present one of its own.

- **Phase 2** runs a second, inner EAP conversation --- EAP-MSCHAPv2 ---
  entirely *inside* that tunnel, so the username and the challenge/response are
  encrypted on the wire.

The outer identity in Phase 1 can be anonymous (e.g. `anonymous`); the real
username is only sent inside the tunnel in Phase 2.

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
        Note over C,ISE: Phase 1 — Identity + TLS tunnel (cleartext)
        WLC->>C: EAP-Request/Identity
        C->>WLC: EAP-Response/Identity (outer / anonymous)
        WLC->>ISE: RADIUS Access-Request (outer identity)
        ISE->>WLC: Access-Challenge (EAP-Request/PEAP Start)
        WLC->>C: EAP-Request/PEAP (Start)
        C->>WLC: EAP-Response/PEAP (TLS ClientHello)
        WLC->>ISE: Access-Request (ClientHello)
        ISE->>WLC: Access-Challenge (ServerHello, Certificate,<br>ServerKeyExchange, ServerHelloDone)
        WLC->>C: EAP-Request/PEAP (server handshake)
        Note over C: Validate ISE server cert
        C->>WLC: EAP-Response/PEAP (ClientKeyExchange,<br>ChangeCipherSpec, Finished)
        WLC->>ISE: Access-Request (client handshake)
        ISE->>WLC: Access-Challenge (ChangeCipherSpec, Finished)
        WLC->>C: EAP-Request/PEAP (tunnel established)
    end

    rect rgba(120, 200, 140, 0.14)
        Note over C,ISE: Phase 2 — Inner EAP-MSCHAPv2 (encrypted inside TLS tunnel)
        ISE-->>C: Inner EAP-Request/Identity
        C-->>ISE: Inner EAP-Response/Identity (real username)
        ISE-->>C: Inner EAP-Request/MSCHAPv2 (Challenge)
        C-->>ISE: Inner EAP-Response/MSCHAPv2 (Peer Challenge + NT Response)
        Note over ISE: Validate against Active Directory
        ISE-->>C: Inner EAP-Request/MSCHAPv2 (Success + Authenticator Response)
        C-->>ISE: Inner EAP-Response/MSCHAPv2 (ack)
        ISE-->>C: Inner EAP-Request/Extensions (Result TLV = success)
        C-->>ISE: Inner EAP-Response/Extensions (Result TLV = success)
    end

    rect rgba(128, 160, 255, 0.12)
        Note over C,ISE: Completion
        ISE->>WLC: Access-Accept (MSK)
        WLC->>C: EAP-Success
        Note over C,AP: 802.11 4-Way Handshake (M1/M2/M3/M4)
        AP->>C: WLAN access allowed
    end
```

## References

[Demystifying PEAP-MSCHAPv2 Packet Flow with Wireshark - Cisco Community](https://community.cisco.com/t5/security-blogs/demystifying-peap-mschapv2-packet-flow-with-wireshark/ba-p/5145121)

[Catalyst 9800 Software Configuration Guide - 802.1x Support (EAP-TLS and EAP-PEAP) - Cisco](https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/17-9/config-guide/b_wl_17_9_cg/m_801x_support_eap-tls_and_eap-peap-neat.html)

[RFC 2759: Microsoft PPP CHAP Extensions, Version 2 (MSCHAPv2) | RFC Editor](https://www.rfc-editor.org/info/rfc2759/)
