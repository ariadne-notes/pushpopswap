# How to Make a Blog Like This

This blog follows the [Documentation as Code] ethos.

[Documentation as Code]: https://www.writethedocs.org/guide/docs-as-code

- Create an account on [GitHub]
- Write articles in [Markdown]
- Learn [Git Fundamentals]
- Use [Git]
- Use *GitHub Pages* and *Actions* to Deploy [mdBook]
  - My [Deploy script on GitHub]

[Git]: https://github.com/git-guides
[GitHub]: https://github.com/
[Git Fundamentals]: https://www.youtube.com/results?search_query=git+fundamentals
[Markdown]: https://www.markdownguide.org/basic-syntax/
[Deploy script on GitHub]: https://github.com/ariadne-notes/networking/blob/main/.github/workflows/mdbook.yml
[mdBook]: https://rust-lang.github.io/mdBook/

There is some AI use here, the articles are 98% human written. 

I use Anthropic's tools.

## Where LLMs are used
- [OCR] tasks
  - Diagram-to-Code tasks
- Reforming tables
- [Lint]
- Spelling and grammar
- Finding potential technical errors
- [Rubber Ducking]
- [Vibe Coding]
- [Debugging]
- Lab Implementation

[OCR]: https://en.wikipedia.org/wiki/Optical_character_recognition
[Lint]: https://github.com/caramelomartins/awesome-linters
[Rubber Ducking]: https://en.wikipedia.org/wiki/Rubber_duck_debugging
[Vibe Coding]: https://en.wikipedia.org/wiki/Vibe_coding
[Debugging]: https://en.wikipedia.org/wiki/Debugging

## Where LLMs are **never used**
- Lab Design
- [Note Taking]
- [Prose]
- [Technical Writing]

[Technical Writing]: https://en.wikipedia.org/wiki/Technical_writing
[Prose]: https://en.wikipedia.org/wiki/Prose
[Note Taking]: https://en.wikipedia.org/wiki/Note-taking

## Preprocessors

mdBook is used to turn [CommonMark] into html.

These tools extend the html features, typically with [JavaScript].

[CommonMark]: https://commonmark.org/
[JavaScript]: https://en.wikipedia.org/wiki/JavaScript

### [Mermaid]

[Mermaid]: https://mermaid.ai/open-source/intro/

- Turns text into diagrams
- Allows version control for diagrams
- SVG Adaptive
  - Resize Nicely
  - Light and Dark theme adaptive

Mermaid is a binary js file that gets copied to the root of the repo.

```console
curl -sL https://cdn.jsdelivr.net/npm/mermaid@11.5.0/dist/mermaid.min.js -o mermaid.min.js
```

Then mdbook needs to be rebuilt:

```console
mdbook build
```

### [SVGBOB]

[SVGBOB]: https://ivanceras.github.io/svgbob-editor/

- Sometimes
 - Converts [ASCII Art to a SVG]
 - It does this on build

[ASCII art to a SVG]: https://github.com/boozook/mdbook-svgbob

### [gitinfo]

[GitInfo]: https://compeng0001.github.io/mdbook-gitinfo/

- Injects Git Metadata into the rendered HTML articles
  - Commit
  - Date of Commit
  - Link to Commit
  
... Onto every webpage

### Editable Extras

A tiny js file that modifies `book.js` to allow editing console examples directly on the webpage.

This lives in the root of the repo.