# Custom Scripts

Javascript here modifies mdbook or extends mdbook to allow a better site viewing experience.

## Mermaid

### Mermaid lazyload

> [mermaid-lazyload.js](https://github.com/ariadne-notes/pushpopswap/blob/main/theme/mermaid-lazyload.js)

[Lighthouse] penalizes pages based on first content paint times.

Mermaid comes with a large binary, ~3MB: `mermaid-11.15.0.min.js`.

This script is put into the render blocking path. The big mermaid file is only loaded on pages with Mermaid.

Connected to:

- `mermaid-11.15.0.min.js`
- `svg-zoomer.js`

[Lighthouse]: https://developer.chrome.com/docs/lighthouse/

### SVG zoomer

> [svg-zoomer.js](https://github.com/ariadne-notes/pushpopswap/blob/main/theme/svg-zoomer.js)

There are some very large diagrams on this site.

SVGs and Mermaid diagrams can't be zoom'd natively on desktop. This script creates a fullscreen pan/zoom viewer.

- Desktop only: on mobile the browser's own pinch-to-zoom already works; this script is disabled.
- Self-contained (Pointer Events), no libraries

Connected to:

- `mermaid-lazyload.js`


### Zoom unstick

> [zoom-unstick.js](https://github.com/ariadne-notes/pushpopswap/blob/main/theme/zoom-unstick.js)

On touch devices a sticky menu bar rides along magnified during pinch-zoom, covering the content being zoomed. This tags `<html>` with `pinch-zoomed` while zoomed in so the menu bar unsticks, then restores it when zoomed back out.

- Uses `visualViewport` scale, no libraries
- Keeps the search button reachable at normal zoom
## SEO

This site doesn't do great on Bing.

### Stamp page mtimes

> [stamp-page-mtimes.sh](https://github.com/ariadne-notes/pushpopswap/blob/main/scripts/sitemap/stamp-page-mtimes.sh)

Necessary for accurate dates on pages before submitting with IndexNow.

This is run right before build.

## Use-ability

Things to make the notes experience nicer.

### Editable extras

[editable-extras.js](https://github.com/ariadne-notes/pushpopswap/blob/main/theme/editable-extras.js)

- Extends mdBook's editable code block behavior after `book.js` runs
  - Adds undo controls for editable non-Rust examples
  - Uses code fences: ` ```text,editable `

