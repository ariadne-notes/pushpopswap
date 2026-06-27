# Style Guide

## Definitions

**MPL** --- Modern Parking Lot

- Uses [CommonMark]
- Bold for the abbreviation, which is used in common speech
- Expansion goes next to it with a hyphen train
- Items go underneath as bullets

- Sort of resembles a parking lot
- Never has periods on the end

[CommonMark]: https://commonmark.org/

**A** - Single hyphen

**Two** -- hyphens

**Hyphen Train** --- Uses three hyphens

What is a modern definition?
: It uses the colon in front, but there is no easy way to do line breaks. It's weird about where it puts the first indent. It's also like, very tightly spaced?

I guess this would be good for prose? Nope, doesn't respect indents.

Does it support bullets --- or modern parking lot?
:

- Just bolds the whole thing
- There's a line space above the top bullet
- Items like to be off by themselves

## Admonish

> [!NOTE]
> General information or additional context.

> [!TIP]
> A helpful suggestion or best practice.

> [!IMPORTANT]
> Key information that shouldn't be missed.

> [!WARNING]
> Critical information that highlights a potential risk.

> [!CAUTION]
> Information about potential issues that require caution.

## SUMMARY.md

```markdown

<-- Section should be a large inclusive word, because it will show up in the URIs -->

# Routing

                                                     <-- All files go into same same section folder -->
                                                     
- [OSPFv2](./routing/ospfv2.md)                       <-- Root -->
  - [DR Election](./routing/ospfv2-dr-election.md)    <-- Sidebar_Branch_Title is short, branch_name_is_qualified -->
      - [DR LSAs](./routing/ospfv2-dr-lsas.md)        <-- Sidebar_Leaf_Title is short, leaf_file_name_is_qualified -->
```

## Footnote

This is a footnote[^note].

## Links

[Duck Duck Go]

[Duck Duck Go]: http://www.duckduckgo.com

## Theme break

***

## A code block

    I'm wondering
    if this is 
    a way to get
    transparent 
    inline monospace.

## Reference

[Markdown - mdBook Documentation](https://rust-lang.github.io/mdBook/format/markdown.html)

[CommonMark Spec](https://spec.commonmark.org/)

[^note]: This text is the contents of the footnote, which will be rendered
