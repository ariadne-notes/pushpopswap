# Addressing

## Address ranges

| Range              | Purpose                          | RFC           | IPs         |
|--------------------|----------------------------------|---------------|-------------|
| `0.0.0.0/8`        | "This Network"                   | [791], [1122] | 16,777,216  |
| `10.0.0.0/8`       | Private Use                      | [1918]        | 16,777,216  |
| `127.0.0.0/8`      | Loopback                         | [1122]        | 16,777,216  |
| `172.16.0.0/12`    | Private Use                      | [1918]        | 1,048,576   |
| `169.254.0.0/16`   | Automatic Addressing             | [3927]        | 65,536      |
| `192.0.2.0/24`     | Documentation (TEST-NET-1)       | [5737]        | 256         |
| `192.168.0.0/16`   | Private Use                      | [1918]        | 65,536      |
| `198.51.100.0/24`  | Documentation (TEST-NET-2)       | [5737]        | 256         |
| `203.0.113.0/24`   | Documentation (TEST-NET-3)       | [5737]        | 256         |
| `224.0.0.0/4`      | Multicast (Class D)              | [5771]        | 268,435,456 |
| `240.0.0.0/4`      | Reserved / Experimental (Class E)| [1122]        | 268,435,456 |

[791]: https://www.rfc-editor.org/info/rfc791/
[1122]: https://www.rfc-editor.org/info/rfc1122/
[1918]: https://www.rfc-editor.org/info/rfc1918/
[3927]: https://www.rfc-editor.org/info/rfc3927/
[1918]: https://www.rfc-editor.org/info/rfc1918/
[5737]: https://www.rfc-editor.org/info/rfc5737/
[5771]: https://www.rfc-editor.org/info/rfc5771/

**This Network**

The `0.0.0.0` address literally means "when an app requests connectivity to 0.0.0.0, bind to every interface running IP and make it work".

## References

[How Class E addresses solve for IP address exhaustion in GKE | Google Cloud Blog](https://cloud.google.com/blog/products/containers-kubernetes/how-class-e-addresses-solve-for-ip-address-exhaustion-in-gke)
