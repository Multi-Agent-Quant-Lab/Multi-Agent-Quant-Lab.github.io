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

  /* ── scroll-triggered reveal (re-arm elements below fold) ─ */
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.animationPlayState = "running";
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    document.querySelectorAll(".reveal").forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top > window.innerHeight * 1.1) {
        el.style.animationPlayState = "paused";
        io.observe(el);
      }
    });
  }
})();
