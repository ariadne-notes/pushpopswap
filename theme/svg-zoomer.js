/* svg-zoomer.js — click a rendered mermaid diagram or an SVG image to
   open it in a fullscreen pan/zoom viewer. Self-contained: pan/zoom is built on
   Pointer Events, no libraries.

   Desktop-pointer devices only. Browsers give a mouse no per-element zoom, so
   the lightbox fills that gap; on touch devices native pinch-to-zoom already
   handles SVGs perfectly (they're vectors — page zoom stays sharp), so there
   the whole feature stands down and taps do nothing. Touch gestures are still
   wired inside the viewer for hybrid devices (touchscreen laptops) where the
   primary pointer is a mouse but fingers may land on the open lightbox.

   Pairs with mermaid-lazyload.js, which dispatches `mermaid:rendered` on the
   document each time diagrams (re)render — including on theme toggle — so
   decoration is event-driven rather than polled.

   Four single-purpose units, composed in the bootstrap at the bottom:
     Decorator — marks rendered diagrams as focusable buttons (a11y)
     Viewer    — a cloned <svg> on a transformed canvas: pan, pinch, wheel, tap
     Lightbox  — the fullscreen overlay: DOM, lifecycle, toolbar, keyboard
     Triggers  — global click/keyboard delegation that opens the Lightbox

   Gestures: drag to pan; pinch to zoom (anchored at the gesture midpoint);
   mouse wheel to zoom at the cursor; double-tap/double-click to zoom in.
   Zoom is reported relative to the fit-to-stage scale, so "100%" = fitted.
*/
(function () {
  "use strict";

  // Touch-first device: leave zooming to the platform's pinch-to-zoom.
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

  var MIN_ZOOM = 0.1;   // relative to fit
  var MAX_ZOOM = 50;    // relative to fit
  var STEP     = 1.3;   // toolbar / keyboard zoom factor
  var TAP_MS   = 320;   // double-tap window
  var TAP_SLOP = 32;    // px between taps to still count as a double-tap

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
     Viewer — owns a cloned <svg> on an absolutely-positioned canvas div inside
     the stage, moved with `translate(x,y) scale(k)`. Transforming a wrapper
     div (rather than resizing the SVG) means the SVG just renders at its
     natural size and never needs viewBox surgery.

     Input handling is Pointer Events only: one active pointer pans, two pinch,
     wheel zooms at the cursor, and a stationary tap-tap (any pointer type,
     so mouse double-click too) zooms in. Requires `touch-action: none` on the
     stage (set in CSS) so the browser hands gestures to us instead of
     scrolling the page.
  ------------------------------------------------------------------------- */
  function createViewer(srcSvg, stage, onZoom) {
    var clone = srcSvg.cloneNode(true);
    clone.removeAttribute("style");
    clone.style.display = "block";

    var canvas = document.createElement("div");
    canvas.className = "mlb-canvas";
    canvas.appendChild(clone);
    stage.appendChild(canvas);

    // Natural size: viewBox first, then width/height attrs, then measure.
    var size = (function () {
      var vb = clone.viewBox && clone.viewBox.baseVal;
      if (vb && vb.width > 0 && vb.height > 0) return { w: vb.width, h: vb.height };
      var w = parseFloat(clone.getAttribute("width"));
      var h = parseFloat(clone.getAttribute("height"));
      if (w > 0 && h > 0) return { w: w, h: h };
      try {
        var b = clone.getBBox();
        if (b.width > 0 && b.height > 0) return { w: b.x + b.width, h: b.y + b.height };
      } catch (_) {}
      return { w: 800, h: 600 };
    })();
    clone.setAttribute("width", size.w);
    clone.setAttribute("height", size.h);

    var x = 0, y = 0, k = 1, fitK = 1;

    function apply() {
      canvas.style.transform = "translate(" + x + "px," + y + "px) scale(" + k + ")";
      if (onZoom) onZoom(k / fitK);
    }

    // Zoom toward a stage-relative point, keeping it fixed on screen.
    function zoomAt(px, py, factor) {
      var k2 = Math.min(fitK * MAX_ZOOM, Math.max(fitK * MIN_ZOOM, k * factor));
      factor = k2 / k;
      x = px - (px - x) * factor;
      y = py - (py - y) * factor;
      k = k2;
      apply();
    }

    function fit() {
      var sw = stage.clientWidth, sh = stage.clientHeight;
      fitK = Math.min(sw / size.w, sh / size.h) || 1;
      k = fitK;
      x = (sw - size.w * k) / 2;
      y = (sh - size.h * k) / 2;
      apply();
    }

    /* --- gestures --- */
    var pointers = new Map();               // pointerId → last stage-relative point
    var moved = 0;                          // px of travel since first pointerdown
    var lastTap = { t: 0, x: 0, y: 0 };

    function pt(e) {
      var r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, pt(e));
      if (pointers.size === 1) moved = 0;
    });

    stage.addEventListener("pointermove", function (e) {
      var prev = pointers.get(e.pointerId);
      if (!prev) return;
      var p = pt(e);

      if (pointers.size === 1) {
        x += p.x - prev.x;
        y += p.y - prev.y;
        moved += Math.abs(p.x - prev.x) + Math.abs(p.y - prev.y);
        apply();
      } else if (pointers.size === 2) {
        moved = Infinity;                   // a pinch is never a tap
        var other = null;
        pointers.forEach(function (v, id) { if (id !== e.pointerId) other = v; });
        var oldD = Math.hypot(prev.x - other.x, prev.y - other.y);
        var newD = Math.hypot(p.x - other.x, p.y - other.y);
        if (oldD > 0) {
          var mx = (p.x + other.x) / 2, my = (p.y + other.y) / 2;
          x += mx - (prev.x + other.x) / 2;   // follow the midpoint…
          y += my - (prev.y + other.y) / 2;
          zoomAt(mx, my, newD / oldD);        // …and scale about it
        }
      }
      pointers.set(e.pointerId, p);
    });

    function pointerEnd(e) {
      if (!pointers.delete(e.pointerId)) return;
      if (e.type !== "pointerup" || pointers.size > 0 || moved > 8) return;
      // Stationary tap: second one inside the window/slop zooms in.
      var p = pt(e);
      if (e.timeStamp - lastTap.t < TAP_MS &&
          Math.abs(p.x - lastTap.x) < TAP_SLOP &&
          Math.abs(p.y - lastTap.y) < TAP_SLOP) {
        zoomAt(p.x, p.y, 2);
        lastTap.t = 0;
      } else {
        lastTap = { t: e.timeStamp, x: p.x, y: p.y };
      }
    }
    stage.addEventListener("pointerup", pointerEnd);
    stage.addEventListener("pointercancel", pointerEnd);

    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      var p = pt(e);
      zoomAt(p.x, p.y, Math.exp(-d * 0.0022));
    }, { passive: false });

    fit();

    function center() { return { x: stage.clientWidth / 2, y: stage.clientHeight / 2 }; }
    return {
      zoomIn:  function () { var c = center(); zoomAt(c.x, c.y, STEP); },
      zoomOut: function () { var c = center(); zoomAt(c.x, c.y, 1 / STEP); },
      fit:     fit,
      resize:  fit,
      getZoom: function () { return k / fitK; },
      destroy: function () { pointers.clear(); }   // listeners die with the stage
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
    var overlay = null, viewer = null, chromeTimer = null;

    function isOpen() { return overlay !== null; }

    function readout(zoom) {
      var el = overlay && overlay.querySelector(".mlb-zoom");
      if (el) el.textContent = Math.round((zoom || 1) * 100) + "%";
    }

    function onResize() { if (viewer) viewer.resize(); }

    // Toolbar auto-hide, video-player style: visible on open and on any
    // interaction, fading out after a quiet spell so the diagram gets the
    // whole screen. Never hides out from under a hovering mouse cursor.
    function showChrome() {
      if (!overlay) return;
      overlay.classList.remove("mlb-chrome-hidden");
      clearTimeout(chromeTimer);
      chromeTimer = setTimeout(function hide() {
        if (!overlay) return;
        var tb = overlay.querySelector(".mlb-toolbar");
        if (tb && tb.matches(":hover")) { chromeTimer = setTimeout(hide, 1000); return; }
        overlay.classList.add("mlb-chrome-hidden");
      }, 2500);
    }

    function open(srcSvg) {
      if (overlay) close();

      overlay = document.createElement("div");
      overlay.className = "mlb-overlay";
      overlay.innerHTML =
        '<div class="mlb-toolbar">' +
          '<button data-act="out" title="Zoom out (−)">−</button>' +
          '<span class="mlb-zoom">100%</span>' +
          '<button data-act="in" title="Zoom in (+)">+</button>' +
          '<button data-act="fit" title="Fit (0)">Fit</button>' +
          '<button data-act="close" title="Close (Esc)">✕</button>' +
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

      // Any interaction resets the auto-hide clock (capture phase, so pans
      // and pinches on the stage count too).
      overlay.addEventListener("pointerdown", showChrome, true);
      overlay.addEventListener("pointermove", showChrome, true);
      overlay.addEventListener("wheel", showChrome, true);
      showChrome();
    }

    function close() {
      window.removeEventListener("resize", onResize);
      clearTimeout(chromeTimer);
      if (viewer) { viewer.destroy(); viewer = null; }
      if (overlay) { overlay.remove(); overlay = null; }
      document.body.style.overflow = "";
    }

    // Keyboard controls — active only while the overlay is open.
    document.addEventListener("keydown", function (e) {
      if (!overlay) return;
      showChrome();
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
