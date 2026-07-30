# Do Not Use .local for Authoritative DNS

> [!WARNING]
> 
> mDNS does not behave like normal DNS.

**Question:** Should I configure sensitive or important services on `.local`?

No.

```text
1. (omitted)
   Since there is no central authority responsible for assigning
   dot-local names, and all devices on the local network are
   equally entitled to claim any dot-local name, users SHOULD be
   aware of this and SHOULD exercise appropriate caution.  In an
   untrusted or unfamiliar network environment, users SHOULD be
   aware that using a name like "www.local" may not actually
   connect them to the web site they expected, and could easily
   connect them to a different web page, or even a fake or spoof
   of their intended web site, designed to trick them into
   revealing confidential information.  As always with networking,
   end-to-end cryptographic security can be a useful tool.
```

**Question:** Should I as an operator implement `.local` as an authoritative zone?

No.

```text
6. DNS server operators SHOULD NOT attempt to configure
   authoritative DNS servers to act as authoritative for any of
   these names.  Configuring an authoritative DNS server to act as
   authoritative for any of these names may not, in many cases,
   yield the expected result.  Since name resolver libraries and
   caching DNS servers SHOULD NOT send queries for those names
   (see 3 and 4 above), such queries SHOULD be suppressed before
   they even reach the authoritative DNS server in question, and
   consequently it will not even get an opportunity to answer
   them.
```

**Question:** Should my device send a DNS request to the configured DNS server if I use `.local`?

No.

```text
3. Name resolution APIs and libraries SHOULD recognize these names
   as special and SHOULD NOT send queries for these names to their
   configured (unicast) caching DNS server(s).  This is to avoid
   unnecessary load on the root name servers and other name
   servers, caused by queries for which those name servers do not
   have useful non-negative answers to give, and will not ever
   have useful non-negative answers to give.
```

**Question:** Should my DNS software even allow me to configure it as authoritative for `.local`?

No.

```text
5. Authoritative DNS servers SHOULD NOT by default be configurable
   to answer queries for these names, and, like caching DNS
   servers, SHOULD generate immediate NXDOMAIN responses for all
   such queries they may receive. DNS server software MAY provide
   a configuration option to override this default, for testing
   purposes or other specialized uses.
```

**Question:** Should a caching server answer `.local` queries?

No.

```text
4. Caching DNS servers SHOULD recognize these names as special and
   SHOULD NOT attempt to look up NS records for them, or otherwise
   query authoritative DNS servers in an attempt to resolve these
   names.  Instead, caching DNS servers SHOULD generate immediate
   NXDOMAIN responses for all such queries they may receive (from
   misbehaving name resolver libraries).  This is to avoid
   unnecessary load on the root name servers and other name
   servers.
```

## References

[RFC 6762: Multicast DNS | RFC Editor](https://www.rfc-editor.org/info/rfc6762/)
