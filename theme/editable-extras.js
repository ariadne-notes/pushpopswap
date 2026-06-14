// editable-extras.js
// mdBook only adds the "Undo changes" button inside its Rust `.playground` loop.
// For non-Rust editable blocks (e.g. ```console,editable) it adds the copy button
// but not undo. This adds undo, mirroring mdBook's own implementation exactly:
//   - class "reset-button" (NOT "fa fa-history" — recent mdBook hides .fa)
//   - icon reused from the embedded #fa-clock-rotate-left SVG
//   - reset via editor.originalCode, which editor.js sets on every .editable
"use strict";
window.addEventListener("load", function () {
    if (typeof window.ace === "undefined") return; // needs editable + copy-js
    var icon = document.getElementById("fa-clock-rotate-left");

    document.querySelectorAll("code.editable").forEach(function (code) {
        var pre = code.closest("pre");
        if (!pre || pre.classList.contains("playground")) return; // Rust path handles these
        if (pre.querySelector(".reset-button")) return;           // already added

        // mdBook's copyable loop already made .buttons; reuse it (don't bail on it).
        var buttons = pre.querySelector(".buttons");
        if (!buttons) {
            buttons = document.createElement("div");
            buttons.className = "buttons";
            pre.insertBefore(buttons, pre.firstChild);
        }

        // editor.js hardcodes ace/mode/rust; switch to plain text so shell commands
        // aren't colored as Rust. Delete this line to keep Rust coloring.
        try { window.ace.edit(code).session.setMode("ace/mode/text"); } catch (e) {}

        var undo = document.createElement("button");
        undo.className = "reset-button";
        undo.title = "Undo changes";
        undo.setAttribute("aria-label", undo.title);
        if (icon) undo.innerHTML = icon.innerHTML; // reuse mdBook's SVG, respects .fa{display:none}
        buttons.insertBefore(undo, buttons.firstChild);

        undo.addEventListener("click", function () {
            var editor = window.ace.edit(code);
            editor.setValue(editor.originalCode);
            editor.clearSelection();
        });
    });
});
