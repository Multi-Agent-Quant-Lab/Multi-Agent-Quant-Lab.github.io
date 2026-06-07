// Dev-only screenshot QA for the MAQ Lab site.
//
//   node tools/screenshot.mjs [baseURL]
//
// Defaults to http://localhost:4000 (run `bundle exec jekyll serve` first).
// Captures every page at desktop + mobile widths, in BOTH languages,
// as full-page PNGs under .shots/ (gitignored). Read those to self-review.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = (process.argv[2] || "http://localhost:4000").replace(/\/$/, "");

const PAGES = [
  ["home", "/"],
  ["about", "/about/"],
  ["research", "/research/"],
  ["people", "/people/"],
  ["activities", "/activities/"],
  ["activity-detail", "/activities/2026-06-07-macro-mapping/"],
];

const VIEWPORTS = [
  ["desktop", 1280, 900],
  ["mobile", 390, 844],
];

const LANGS = ["ko", "en"];

await mkdir(".shots", { recursive: true });

const browser = await chromium.launch();
let count = 0;

for (const [vname, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    // Reveal-on-scroll hides below-fold content until intersected; for a
    // full-page capture we want everything visible, so emulate reduced
    // motion (the CSS shows all .reveal elements under that preference).
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  for (const lang of LANGS) {
    // Seed the language preference the toggle reads from localStorage.
    await ctx.addInitScript((l) => {
      try { localStorage.setItem("maq-lang", l); } catch (e) {}
    }, lang);

    for (const [name, path] of PAGES) {
      const url = base + path;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(450); // let reveal animations settle
        const file = `.shots/${name}-${vname}-${lang}.png`;
        await page.screenshot({ path: file, fullPage: true });
        console.log("✓", file);
        count++;
      } catch (e) {
        console.error("✗", url, "—", e.message);
      }
    }
  }
  await ctx.close();
}

await browser.close();
console.log(`\nDone. ${count} screenshots in .shots/`);
