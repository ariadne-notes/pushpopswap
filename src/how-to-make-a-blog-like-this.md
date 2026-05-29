# How to Make a Blog Like This

- Create an account on [GitHub](https://github.com/).
- Write articles with [Markdown](https://www.markdownguide.org/basic-syntax/).
- Learn [Git Fundamentals](https://www.youtube.com/results?search_query=git+fundamentals).
- Use [Git](https://github.com/git-guides).

> On My Windows machine, I just use the Desktop App.

- Use `GitHub Pages` and `Actions` to Deploy [mdBook](https://github.com/rust-lang/mdBook) ... My [deploy script on GitHub].

[deploy script on GitHub]: https://github.com/ariadne-notes/networking/blob/main/.github/workflows/mdbook.yml

I am a **very** heavy AI user. I used Claude Sonnet 4.6 to help figure this out.

## Notes


The preprocessor for mdBook in this install relies on [mermaid.js](https://mermaid.js.org/), a binary file that needs to be copied to the root of the repo.

```console
curl -sL https://cdn.jsdelivr.net/npm/mermaid@11.5.0/dist/mermaid.min.js -o mermaid.min.js
```

Then mdbook needs to be rebuilt:

```console
mdbook build
```
