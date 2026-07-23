# The Correctness Hierarchy

This is an ordered list of how correct something tends to be, from the standpoint of a Network Engineer.

> Ariadne's maxim
> 
> The more correct a material tends to be, the harder it becomes to understand and/or access.

## The list

<h2 class="sr-only">A tier list ranking sources of technical correctness from S (most authoritative) to F (least): S is observed behavior, A is published standards, B is inventor sources, C is vendor sources, D is Wikipedia, E is content creator sources, F is vendor marketing and social media.</h2>

<div class="tierlist">
  <div class="tier"><div class="tier-label tier-s">S</div><div class="tier-items">
    <span>Observed behavior on a network</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-a">A</div><div class="tier-items">
    <span>Published standards</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-b">B</div><div class="tier-items">
    <span>Inventor's publications</span>
    <span>Inventor's blog</span>
    <span>Distinguished Engineer's publications</span>
    <span>Distinguished Engineer's blog</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-c">C</div><div class="tier-items">
    <span>Vendor documentation</span>
    <span>Vendor slides</span>
    <span>Vendor blog</span>
    <span>Vendor community</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-d">D</div><div class="tier-items">
    <span>Observed behavior in simulation</span>
    <span>Vendor Textbook</span>
    <span>Wikipedia</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-e">E</div><div class="tier-items">
    <span>Content creator's publications</span>
    <span>Content creator's blog</span>
  </div></div>
  <div class="tier"><div class="tier-label tier-f">F</div><div class="tier-items">
    <span>Vendor marketing materials</span>
    <span>Social media</span>
    <span>AI</span>
  </div></div>
</div>

## Terms

**Published Standards** --- IETF Documents or IEEE documents

**Inventor** --- The person who created it

**Distinguished Engineer** --- Someone famous in the Industry

**Content Creator** --- Someone making content

## Examples

Using the AI to be correct is a failing grade at **F-tier.** Same goes for social media (let's say, TikTok, Linkedin, Facebook, et. al)

Vendors lie when they market, so they also go to **F-tier.**

Textbooks are **E-tier**, there is no independent auditing of textbook correctness, and they are very difficult to correct once published.

If the vendor has a textbook, that's **D-tier.** Usually, a certification is tied to it, so they are a touch better edited.

The vendor community is interesting, people post both very stupid questions, but also get brilliant answers. Solid **C-tier.**

Vendor materials can't get above **C-tier** because money is always involved. Getting material published at a vendor is difficult enough.

John Moy's book on OSPF is **B-tier**. Ivan's site <https://blog.ipspace.net/> is also **B-tier**, he's been in the Industry forever.

The [RFC for OSPFv2] is **A-tier**, it's what we all refer to to check the behavior, otherwise we need to get onto a mailing list.

A setup running OSPFv2 is **S-tier.** It might be ancient, broken, or incorrect, but we cannot argue that it did not happen.

[RFC for OSPFv2]: https://datatracker.ietf.org/doc/html/rfc2328