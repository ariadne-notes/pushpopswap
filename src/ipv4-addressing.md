# IPv4

## Address Ranges

| Range             | Purpose                          | RFC               | IPs         |
|-------------------|----------------------------------|-------------------|-------------|
| `0.0.0.0/8`       | "This Network"                   | RFC 791, RFC 1122 | 16,777,216  |
| `10.0.0.0/8`      | Private Use                      | RFC 1918          | 16,777,216  |
| `127.0.0.0/8`     | Loopback                         | RFC 1122          | 16,777,216  |
| `172.16.0.0/12`   | Private Use                      | RFC 1918          | 1,048,576   |
| `192.0.2.0/24`    | Documentation (TEST-NET-1)       | RFC 5737          | 256         |
| `192.168.0.0/16`  | Private Use                      | RFC 1918          | 65,536      |
| `198.51.100.0/24` | Documentation (TEST-NET-2)       | RFC 5737          | 256         |
| `203.0.113.0/24`  | Documentation (TEST-NET-3)       | RFC 5737          | 256         |
| `224.0.0.0/4`     | Multicast (Class D)              | RFC 5771          | 268,435,456 |
| `240.0.0.0/4`     | Reserved / Experimental (Class E)| RFC 1112          | 268,435,456 |

## References

[RFC 1918 - Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918)

[RFC 5737 - IPv4 Address Blocks Reserved for Documentation](https://datatracker.ietf.org/doc/rfc5737/)

[How Class E addresses solve for IP address exhaustion in GKE | Google Cloud Blog](https://cloud.google.com/blog/products/containers-kubernetes/how-class-e-addresses-solve-for-ip-address-exhaustion-in-gke)
