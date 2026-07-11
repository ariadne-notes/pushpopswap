/* mermaid-lightbox.js — click/tap a rendered mermaid diagram to open it in a
   fullscreen pan/zoom viewer powered by svg-pan-zoom (bumbu/svg-pan-zoom v3.6.1).

   Load order (additional-js): svg-pan-zoom.min.js BEFORE this file.
   Pairs with mermaid-lazyload.js, which dispatches `mermaid:rendered` on the document
   each time diagrams (re)render — including on theme toggle — so decoration is
   event-driven rather than polled.

   Four single-purpose units, composed in the bootstrap at the bottom:
     Decorator — marks rendered diagrams as focusable buttons (a11y)
     Viewer    — wraps a cloned <svg> in svg-pan-zoom + the sizing workaround
     Lightbox  — the fullscreen overlay: DOM, lifecycle, toolbar, keyboard
     Triggers  — global click/keyboard delegation that opens the Lightbox
*/
(function () {
  "use strict";

  var PANZOOM_OPTS = {
    zoomEnabled: true,
    panEnabled: true,
    controlIconsEnabled: false,     // we render our own toolbar
    dblClickZoomEnabled: true,
    mouseWheelZoomEnabled: true,
    fit: true,
    center: true,
    minZoom: 0.1,
    maxZoom: 50,
    zoomScaleSensitivity: 0.3
  };

  function isSvgImage(img) {
    var src = img.currentSrc || img.getAttribute("src") || "";
    return /\.svg(?:[?#].*)?$/i.test(src);
  }

  /* -------------------------------------------------------------------------
     Decorator — annotate rendered diagrams and SVG image embeds so they're
     keyboard-focusable buttons. Idempotent: safe to call repeatedly.
  ------------------------------------------------------------------------- */
  function createDecorator() {
    function decorate() {
      document.querySelectorAll(".mermaid").forEach(function (m) {
        if (m.dataset.lbReady || !m.querySelector("svg")) return;
        m.dataset.lbReady = "1";
        m.setAttribute("tabindex", "0");
        m.setAttribute("role", "button");
        m.setAttribute("aria-label", "Open diagram in zoom viewer");
      });

      document.querySelectorAll(".content img").forEach(function (img) {
        if (img.dataset.lbReady || !isSvgImage(img)) return;
        img.dataset.lbReady = "1";
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", "Open image in zoom viewer");
      });
    }
    return { decorate: decorate };
  }

  /* -------------------------------------------------------------------------
     Viewer — owns a cloned <svg> inside a stage element and the svg-pan-zoom
     instance bound to it. Contains the library's viewBox-strip gotcha: it drops
     the viewBox on init, collapsing height unless the SVG has explicit px
     dimensions, so the clone is sized to the stage before init and on resize.
  ------------------------------------------------------------------------- */
  function createViewer(srcSvg, stage, onZoom) {
    var clone = srcSvg.cloneNode(true);
    clone.removeAttribute("style");
    clone.style.display = "block";
    stage.appendChild(clone);

    var pz = null;

    function sizeClone() {
      clone.setAttribute("width", Math.max(1, stage.clientWidth));
      clone.setAttribute("height", Math.max(1, stage.clientHeight));
    }

    // No library present → static, scrollable fallback with no-op controls.
    if (typeof svgPanZoom === "undefined") {
      stage.style.overflow = "auto";
      sizeClone();
      return {
        zoomIn: function () {}, zoomOut: function () {},
        fit: function () {}, resize: function () {},
        getZoom: function () { return 1; },
        destroy: function () {}
      };
    }

    function fit() { if (pz) { pz.resize(); pz.fit(); pz.center(); } }

    // Init after layout so the library can measure the stage.
    requestAnimationFrame(function () {
      sizeClone();
      pz = svgPanZoom(clone, Object.assign({}, PANZOOM_OPTS, { onZoom: onZoom }));
      if (onZoom) onZoom(pz.getZoom());
    });

    return {
      zoomIn:  function () { if (pz) pz.zoomIn(); },
      zoomOut: function () { if (pz) pz.zoomOut(); },
      fit:     fit,
      resize:  function () { if (pz) { sizeClone(); fit(); } },
      getZoom: function () { return pz ? pz.getZoom() : 1; },
      destroy: function () { if (pz) { try { pz.destroy(); } catch (_) {} pz = null; } }
    };
  }

  function createSvgImageLoader() {
    var cache = new Map();

    function load(img) {
      var src = img.currentSrc || img.getAttribute("src");
      var url = new URL(src, window.location.href).href;

      if (!cache.has(url)) {
        cache.set(url, fetch(url, { credentials: "same-origin" })
          .then(function (r) {
            if (!r.ok) throw new Error("Unable to load SVG image: " + url);
            return r.text();
          })
          .then(function (text) {
            var doc = new DOMParser().parseFromString(text, "image/svg+xml");
            var svg = doc.documentElement;
            if (!svg || svg.nodeName.toLowerCase() !== "svg") {
              throw new Error("Image is not an SVG: " + url);
            }
            return svg;
          }));
      }

      return cache.get(url).then(function (svg) {
        return svg.cloneNode(true);
      });
    }

    return { load: load };
  }

  /* -------------------------------------------------------------------------
     Lightbox — the single fullscreen overlay. Builds its DOM, locks body
     scroll, delegates all svg interaction to a Viewer, and owns open/close,
     the toolbar, and the while-open keyboard controls.
  ------------------------------------------------------------------------- */
  function createLightbox() {
    var overlay = null, viewer = null;

    function isOpen() { return overlay !== null; }

    function readout(zoom) {
      var el = overlay && overlay.querySelector(".mlb-zoom");
      if (el) el.textContent = Math.round((zoom || 1) * 100) + "%";
    }

    function onResize() { if (viewer) viewer.resize(); }

    function open(srcSvg) {
      if (overlay) close();

      overlay = document.createElement("div");
      overlay.className = "mlb-overlay";
      overlay.innerHTML =
        '<div class="mlb-toolbar">' +
          '<button data-act="out" title="Zoom out (\u2212)">\u2212</button>' +
          '<span class="mlb-zoom">100%</span>' +
          '<button data-act="in" title="Zoom in (+)">+</button>' +
          '<button data-act="fit" title="Fit (0)">Fit</button>' +
          '<button data-act="close" title="Close (Esc)">\u2715</button>' +
        "</div>" +
        '<div class="mlb-stage"></div>';
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      viewer = createViewer(srcSvg, overlay.querySelector(".mlb-stage"), readout);

      overlay.querySelector(".mlb-toolbar").addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        switch (b.dataset.act) {
          case "close": close(); break;
          case "in":    viewer.zoomIn(); break;
          case "out":   viewer.zoomOut(); break;
          case "fit":   viewer.fit(); break;
        }
      });
      overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
      window.addEventListener("resize", onResize);
    }

    function close() {
      window.removeEventListener("resize", onResize);
      if (viewer) { viewer.destroy(); viewer = null; }
      if (overlay) { overlay.remove(); overlay = null; }
      document.body.style.overflow = "";
    }

    // Keyboard controls — active only while the overlay is open.
    document.addEventListener("keydown", function (e) {
      if (!overlay) return;
      switch (e.key) {
        case "Escape":          close(); break;
        case "+": case "=":     viewer && viewer.zoomIn(); break;
        case "-": case "_":     viewer && viewer.zoomOut(); break;
        case "0":               viewer && viewer.fit(); break;
      }
    });

    return { open: open, close: close, isOpen: isOpen };
  }

  /* -------------------------------------------------------------------------
     Triggers — global delegation: open the lightbox from a click/tap or Enter
     on a decorated diagram. Queries the SVG fresh each time, so it keeps
     working after diagrams are re-rendered on a theme toggle.
  ------------------------------------------------------------------------- */
  function wireTriggers(lightbox, svgImageLoader) {
    document.addEventListener("click", function (e) {
      if (lightbox.isOpen()) return;
      var host = e.target.closest && e.target.closest(".mermaid");
      if (host && !e.target.closest("a")) {   // let diagram links work
        var svg = host.querySelector("svg");
        if (svg) lightbox.open(svg);
        return;
      }

      var img = e.target.closest && e.target.closest(".content img");
      if (!img || !isSvgImage(img) || e.target.closest("a")) return;
      svgImageLoader.load(img).then(function (svg) {
        lightbox.open(svg);
      }).catch(function () {
        window.open(img.currentSrc || img.src, "_blank", "noopener");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.isOpen() || e.key !== "Enter") return;
      var a = document.activeElement;
      if (a && a.classList && a.classList.contains("mermaid")) {
        var svg = a.querySelector("svg");
        if (svg) { e.preventDefault(); lightbox.open(svg); }
      }
      if (a && a.tagName === "IMG" && isSvgImage(a)) {
        e.preventDefault();
        svgImageLoader.load(a).then(function (svg) {
          lightbox.open(svg);
        }).catch(function () {
          window.open(a.currentSrc || a.src, "_blank", "noopener");
        });
      }
    });
  }

  /* --- bootstrap ----------------------------------------------------------- */
  var decorator = createDecorator();
  var svgImageLoader = createSvgImageLoader();
  var lightbox  = createLightbox();
  wireTriggers(lightbox, svgImageLoader);

  // Decorate whenever mermaid-lazyload.js (re)renders, plus once now in case a page
  // ever ships pre-rendered diagrams. Idempotent, so double-firing is harmless.
  document.addEventListener("mermaid:rendered", decorator.decorate);
  document.addEventListener("DOMContentLoaded", decorator.decorate);
  decorator.decorate();
})();
