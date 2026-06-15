/* mermaid-lightbox.js — click/tap a rendered mermaid diagram to open it in a
   fullscreen pan/zoom viewer powered by svg-pan-zoom (bumbu/svg-pan-zoom v3.6.1).
   Load svg-pan-zoom.min.js BEFORE this file. */
(function () {
  "use strict";

  var overlay = null, stage = null, clone = null, pz = null;

  /* --- mark rendered diagrams as focusable buttons (poll until mermaid finishes) --- */
  function decorate() {
    document.querySelectorAll(".mermaid").forEach(function (m) {
      if (m.dataset.lbReady || !m.querySelector("svg")) return;
      m.dataset.lbReady = "1";
      m.setAttribute("tabindex", "0");
      m.setAttribute("role", "button");
      m.setAttribute("aria-label", "Open diagram in zoom viewer");
    });
  }
  var tries = 0;
  var iv = setInterval(function () { decorate(); if (++tries > 40) clearInterval(iv); }, 250);
  window.addEventListener("load", decorate);

  /* --- open from click/tap or Enter --- */
  document.addEventListener("click", function (e) {
    if (overlay) return;                                  // already open
    var host = e.target.closest ? e.target.closest(".mermaid") : null;
    if (!host || (e.target.closest && e.target.closest("a"))) return;  // let diagram links work
    var svg = host.querySelector("svg");
    if (svg) open(svg);
  });
  document.addEventListener("keydown", function (e) {
    if (overlay) return;
    var a = document.activeElement;
    if (e.key === "Enter" && a && a.classList && a.classList.contains("mermaid")) {
      var svg = a.querySelector("svg");
      if (svg) { e.preventDefault(); open(svg); }
    }
  });

  function readout(z) {
    var el = overlay && overlay.querySelector(".mlb-zoom");
    if (el) el.textContent = Math.round((z || 1) * 100) + "%";
  }

  function open(srcSvg) {
    close();
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
    stage = overlay.querySelector(".mlb-stage");

    clone = srcSvg.cloneNode(true);
    clone.removeAttribute("style");
    clone.style.display = "block";
    stage.appendChild(clone);

    overlay.querySelector(".mlb-toolbar").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var act = b.dataset.act;
      if (act === "close") return close();
      if (!pz) return;
      if (act === "in") pz.zoomIn();
      else if (act === "out") pz.zoomOut();
      else if (act === "fit") { pz.resize(); pz.fit(); pz.center(); }
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

    if (typeof svgPanZoom === "undefined") {        // graceful fallback: static, scrollable
      stage.style.overflow = "auto";
      sizeClone();
      return;
    }

    // init after layout so the library can measure the stage. svg-pan-zoom strips
    // the viewBox on init (README gotcha) which collapses height unless the SVG has
    // an explicit size — so we set px dimensions equal to the stage.
    requestAnimationFrame(function () {
      sizeClone();
      pz = svgPanZoom(clone, {
        zoomEnabled: true,
        panEnabled: true,
        controlIconsEnabled: false,     // we render our own toolbar
        dblClickZoomEnabled: true,
        mouseWheelZoomEnabled: true,
        fit: true,
        center: true,
        minZoom: 0.1,
        maxZoom: 50,
        zoomScaleSensitivity: 0.3,
        onZoom: readout
      });
      readout(pz.getZoom());
    });

    window.addEventListener("resize", onResize);
  }

  function sizeClone() {
    if (!stage || !clone) return;
    clone.setAttribute("width", Math.max(1, stage.clientWidth));
    clone.setAttribute("height", Math.max(1, stage.clientHeight));
  }

  function onResize() {
    if (!pz) return;
    sizeClone();
    pz.resize(); pz.fit(); pz.center();
  }

  function close() {
    window.removeEventListener("resize", onResize);
    if (pz) { try { pz.destroy(); } catch (_) {} pz = null; }
    if (overlay) { overlay.remove(); overlay = null; stage = null; clone = null; }
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) {
    if (!overlay) return;
    if (e.key === "Escape") close();
    else if (pz && (e.key === "+" || e.key === "=")) pz.zoomIn();
    else if (pz && (e.key === "-" || e.key === "_")) pz.zoomOut();
    else if (pz && e.key === "0") { pz.resize(); pz.fit(); pz.center(); }
  });
})();
