/* Multi-Agent Quant Lab — site interactions.
   Degrades gracefully: without JS the site shows Korean (default). */
(function () {
  "use strict";
  var doc = document.documentElement;

  /* ── language toggle (KO ⇄ EN, remembered) ───────────── */
  function setLang(lang) {
    doc.dataset.lang = lang;
    doc.lang = lang;
    try { localStorage.setItem("maq-lang", lang); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang");
    if (!btn) return;
    setLang(doc.dataset.lang === "ko" ? "en" : "ko");
  });

  /* ── scroll-aware header ─────────────────────────────── */
  var head = document.querySelector(".site-head");
  if (head) {
    var onScroll = function () {
      head.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── mobile nav ──────────────────────────────────────── */
  var toggle = document.querySelector(".navtoggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal is a one-time calm fade on load (CSS only) — no scroll-
  // triggered motion, keeping the page static as the user scrolls.
})();
