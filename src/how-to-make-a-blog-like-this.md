# How to Make a Blog Like This

## Documentation as code

This blog follows the [Documentation as Code] ethos.

[Documentation as Code]: https://www.writethedocs.org/guide/docs-as-code

- Create an account on [GitHub]
- Write articles in [Markdown]
- Learn [Git Fundamentals]
- Use [Git]
- Use a [development environment]
- Use *GitHub Pages* and *Actions* to Deploy [mdBook]
  - My [Deploy script on GitHub]

[Git]: https://github.com/git-guides
[GitHub]: https://github.com/
[Git Fundamentals]: https://www.youtube.com/results?search_query=git+fundamentals
[Markdown]: https://www.markdownguide.org/basic-syntax/
[Deploy script on GitHub]: https://github.com/ariadne-notes/networking/blob/main/.github/workflows/mdbook.yml
[mdBook]: https://rust-lang.github.io/mdBook/
[development environment]: https://docs.github.com/en/get-started/learning-to-code/developing-your-project-locally

## My development environment

I use Notepad++ with [Syncthing].

[Syncthing]: https://syncthing.net

When I save a file in Notepad++, Syncthing is notified of the change and propagates it to `tesseract`. mdBook sees the modification and rebuilds the webpage.

```console
ariadne@tesseract:~/git/pushpopswap$ mdbook serve -n 0.0.0.0
 INFO Book building has started
 INFO Running the html backend
 INFO HTML book written to `/home/ariadne/git/pushpopswap/book`
 INFO Serving on: http://0.0.0.0:3000
 INFO Watching for changes...
 INFO Files changed: ["/home/ariadne/git/pushpopswap/src/how-to-make-a-blog-like-this.md"]
 INFO Book building has started
 INFO Running the html backend
 INFO HTML book written to `/home/ariadne/git/pushpopswap/book`
 INFO Files changed: ["/home/ariadne/git/pushpopswap/src/how-to-make-a-blog-like-this.md"]
 INFO Book building has started
 INFO Running the html backend
 INFO HTML book written to `/home/ariadne/git/pushpopswap/book`
```

## Processing

mdBook is used to turn [CommonMark] into html.

These tools extend the html features, typically with [JavaScript].

[CommonMark]: https://commonmark.org/
[JavaScript]: https://en.wikipedia.org/wiki/JavaScript

## Preprocessing

These are tasks mdBook cannot do without addons.

### Mermaid

- Javascript
- [Turns text into diagrams]
- Allows version control for diagrams
- SVG Adaptive
  - Resize Nicely
  - Light and Dark theme adaptive

[Turns text into diagrams]: https://mermaid.ai/open-source/intro/

Mermaid is a binary js file that gets copied to the root of the repo.

```console
curl -sL https://cdn.jsdelivr.net/npm/mermaid@11.5.0/dist/mermaid.min.js -o mermaid.min.js
```

Then mdbook needs to be rebuilt:

```console
mdbook build
```

### SVGBOB

- [Converts ASCII Art to a SVG]
  - Buggy
- It does this on build

[Converts ASCII Art to a SVG]: https://ivanceras.github.io/svgbob-editor

`mdbook-svgbob` uses the above [embed svgbob into mdBook](https://github.com/boozook/mdbook-svgbob)

### GitInfo

- [Injects Git Metadata into the rendered HTML articles]
  - Commit
  - Date of Commit
  - Link to Commit
  - Onto every webpage
  
[Injects Git Metadata into the rendered HTML articles]: https://compeng0001.github.io/mdbook-gitinfo

### SVG-Pan-Zoom

- [Click on a SVG]
  - Get zoomable picture

[Click on a SVG]:  https://github.com/bumbu/svg-pan-zoom

## Custom scripts

### Mermaid lightbox

- `mermaid-lightbox.js`
- Enables svg-pan-zoom work with mermaid diagrams
- Vibecoded

### Editable extras

- `editable-extras.js`
- modifies `book.js`
  - Enables editing console examples directly on the webpage
- Vibecoded

## AI

There is some AI use here, the articles are 98% human written.


I use Anthropic's tools.

### Where LLMs are used

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

### Where LLMs are not used

- Lab Design
- [Note Taking]
- [Prose]
- [Technical Writing]

[Technical Writing]: https://en.wikipedia.org/wiki/Technical_writing
[Prose]: https://en.wikipedia.org/wiki/Prose
[Note Taking]: https://en.wikipedia.org/wiki/Note-taking
