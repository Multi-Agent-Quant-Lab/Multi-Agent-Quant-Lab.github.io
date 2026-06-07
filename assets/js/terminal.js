/* Terminal Quant — small progressive enhancements.
   Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── typewriter for the join prompt ─────────────────── */
  function typewriter(el) {
    var full = el.getAttribute("data-type") || "";
    if (reduce) { el.textContent = full; return; }
    var i = 0;
    el.textContent = "";
    (function step() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i++);
        setTimeout(step, 55 + Math.round(Math.sin(i) * 18) + 18);
      }
    })();
  }

  /* ── count-up for hero stats ────────────────────────── */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduce || isNaN(target) || target <= 0) {
      if (!isNaN(target)) el.textContent = target;
      return;
    }
    var start = null, dur = 900;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* run when scrolled into view */
  function onView(el, fn) {
    if (!("IntersectionObserver" in window)) { fn(el); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var cmd = document.querySelector("[data-type]");
    if (cmd) onView(cmd, typewriter);

    document.querySelectorAll(".stat b[data-count]").forEach(function (el) {
      onView(el, countUp);
    });
  });
})();
