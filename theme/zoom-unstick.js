/* zoom-unstick.js — while the page is pinch-zoomed, tag <html> with
   .pinch-zoomed so custom.css can unstick the menu bar. A sticky header rides
   along with native pinch-zoom, magnified and covering the content being
   zoomed; suppressing stickiness only while zoomed keeps zoom clean without
   costing the header (and its search button) the rest of the time.

   visualViewport.scale is 1 when unzoomed and >1 during pinch-zoom; its
   resize event fires on every scale change. Browsers without visualViewport
   just keep stock sticky behavior. */
(function () {
  "use strict";
  var vv = window.visualViewport;
  if (!vv) return;

  function update() {
    document.documentElement.classList.toggle("pinch-zoomed", vv.scale > 1.01);
  }
  vv.addEventListener("resize", update);
  update();
})();
