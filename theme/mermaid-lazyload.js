// theme/mermaid-lazyload.js — lazy-load mermaid, render on demand, re-render on theme toggle.
// Pairs with mermaid-lightbox.js via the `mermaid:rendered` event (keep the name identical).
(() => {
  const nodes = [...document.querySelectorAll("pre.mermaid, .mermaid")];
  if (!nodes.length) return;                         // no diagrams on this page → never load mermaid

  const DARK = ["ayu", "navy", "coal"];              // mdBook dark theme classes, applied to <html>
  const themeNow = () =>
    [...document.documentElement.classList].some(c => DARK.includes(c)) ? "dark" : "default";

  const sources = nodes.map(el => el.textContent);   // stash graph source before mermaid consumes it
  let lastTheme = themeNow();
  let busy = false, queued = false;

  function render() {
    if (busy) { queued = true; return; }             // coalesce toggles fired while a render is mid-flight
    busy = true;
    lastTheme = themeNow();
    nodes.forEach((el, i) => {                        // restore source + clear the processed flag so
      el.textContent = sources[i];                   // mermaid will reprocess these nodes
      el.removeAttribute("data-processed");
    });
    mermaid.initialize({ startOnLoad: false, theme: lastTheme });
    mermaid.run({ nodes })
      .then(() => document.dispatchEvent(new Event("mermaid:rendered")))
      .finally(() => { busy = false; if (queued) { queued = false; render(); } });
  }

  const s = document.createElement("script");        // load the library only now, on a page that needs it
  s.src = "/lazyload-js/mermaid-11.15.0.min.js";    // verbatim passthrough from src/lazyload-js/ (unhashed)
  s.onload = render;
  document.head.appendChild(s);

  // mdBook swaps the theme class on <html>; re-render when the theme actually changes.
  let raf = 0;
  new MutationObserver(() => {
    if (!window.mermaid) return;                      // library not loaded yet → nothing to redo
    cancelAnimationFrame(raf);                        // debounce the remove-old + add-new pair into one
    raf = requestAnimationFrame(() => {
      if (themeNow() !== lastTheme) render();
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
})();