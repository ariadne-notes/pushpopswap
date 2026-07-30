# Unpaid DNS TLDs

## Recommended TLDs

I recommend the ICANN resolution protected TLDs.

Ordinary DNS software can serve them normally.

```text
.internal
.home
.corp
.mail
```

## ICANN Resolution Protected TLDs

**[ICANN]** --- Internet Corporation for Assigned Names and Numbers

[ICANN]: https://icannwiki.org/ICANN

The home/corp/mail trinity have been in continuous use by thousands of networks for decades. ICANN resolved to defer delegation of those TLDs indefinitely.

> As part of this commitment, ICANN organization published in July 2014 the Name Collision 
> Occurrence Management Framework. 
> 
> Guided by recommendations in reports from the SSAC and 
> JAS Global Advisors, the Framework recommended that the delegation of the strings 
> `.HOME`, `.CORP`, and `.MAIL` be deferred indefinitely.
>
> [ICANN Board Resolution 2018.02.04.12](https://www.icann.org/en/board-activities-and-meetings/materials/approved-board-resolutions-regular-meeting-of-the-icann-board-04-02-2018-en#2.c.rationale)

`.internal` is new, but permanently reserved.

> Resolved (2024.07.29.06), the Board reserves `.INTERNAL` from delegation in the DNS root zone 
> permanently to provide for its use in private-use applications. 
>
> The Board recommends that efforts be undertaken to raise awareness of its 
> reservation for this purpose through the organization's technical outreach.
>
> [ICANN Board Resolution 2024.07.29.06](https://www.icann.org/en/board-activities-and-meetings/materials/approved-resolutions-special-meeting-of-the-icann-board-29-07-2024-en)

## IETF DNS Special-Use Names

`home.arpa.` is the current recommended domain for residential home networks.

```text
home.arpa.
.example
example.com.
example.net.
example.org.
```

## Undelegated TLDs

ICANN could delegate these and they would enter the global DNS namespace, causing collisions. 

```text
.lan  
.private
```

## What about .local?

See [Do Not Use Local for Authoritative DNS].

[Do Not Use Local for Authoritative DNS]: /do-not-use-local-for-authoritative-dns.md


## References

[IANA - Root Zone Database](https://www.iana.org/domains/root/db)

[IANA - Special-Use Domain Names](https://www.iana.org/assignments/special-use-domain-names/special-use-domain-names.xhtml)

[Wikipedia: Special-use domain name](https://en.wikipedia.org/wiki/Special-use_domain_name)

[ICANN Board Resolution 2018.02.04.12](https://www.icann.org/en/board-activities-and-meetings/materials/approved-board-resolutions-regular-meeting-of-the-icann-board-04-02-2018-en#2.c.rationale)

[RFC 6762]: https://www.rfc-editor.org/info/rfc6762/
