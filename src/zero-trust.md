# Zero Trust

> There’s an old saying in information security: “We want our network to be like an M&M, with a hard
> crunchy outside and a soft chewy center.” 
>
> For a generation of information security professionals, this was the motto we grew up with. 
> It was a motto based on trust and the assumption that malicious
> individuals wouldn’t get past the “hard crunchy outside.” 
> 
> In today’s new threat landscape, this is no
> longer an effective way of enforcing security. Once an attacker gets past the shell, he has access to all
> the resources in our network. 
> 
> We’ve built strong perimeters, but well-organized cybercriminals have
> recruited insiders and developed new attack methods that easily pierce our current security protections.
> 
> To confront these new threats, information security professionals must eliminate the soft chewy center
> by making security ubiquitous throughout the network, not just at the perimeter. 
> 
> To help security
> professionals do this effectively, Forrester has developed a new model for information security, called
> Zero Trust. This report, the first in a series, will introduce the necessity and key concepts of the Zero
> Trust Model.

[Forrester - No More Chewy Centers - John Kindervag]

[Forrester - No More Chewy Centers - John Kindervag]: /pdfs/Forrester-No-More-Chewy-Centers.pdf

**Assume attackers are**

- Working for the org
- On the network
- Crafting malicious traffic
- Capturing sensitive traffic

**Enforce these things**

- Least privilege
- Access controls
- Continuous monitoring

## Pitfalls

**1. It’s Impossible To Identify “Trusted” Interfaces**

- *"The attack is coming from inside the house"*

**2. The Mantra “Trust But Verify” Is A Joke — Literally**

- Never trust
- Authenticate, Authorize, then log

**3. Malicious Insiders Are Often In Positions Of “Trust"**

- The people who can hurt the org most work there

**4. “Trust” Doesn’t Apply To Packets**

- All we can know is in the packets
- Packets are not a substitute for identity
- Packets can be forged

## Concepts

**1. Ensure That All Resources Are Accessed Securely Regardless Of Location**

- no trusted part of the network
- Everything requires auth
- Anything sensitive should be encrypted

**2. Adopt A Least Privilege Strategy And Strictly Enforce Access Control**

- Discourage idle curiosity, log everything
- Ensure everyone knows, everything is logged

**3.  Inspect And Log All Traffic**

- Capture, inspect and log

## References

[NIST Special Publication 800-207 - Zero Trust Architecture](/pdfs/NIST.SP.800-207.pdf)

[Forrester - No More Chewy Centers - John Kindervag](/pdfs/Forrester-No-More-Chewy-Centers.pdf)

[Cisco - Introduction to Resilient Zero Trust Access](https://securitydocs.cisco.com/docs/csa/best-practice/161173.dita)

[Cisco Live - Zero Trust Network Access Demystified - Steven Chimes - BRKSEC-2079](/pdfs/ciscolive/BRKSEC-2079.pdf)
