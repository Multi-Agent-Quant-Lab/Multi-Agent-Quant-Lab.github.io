# Multi-Agent Quant Lab — Website

Bilingual (🇰🇷/🇬🇧) website for the **Multi-Agent Quant Lab** — an open study
building live-ready algorithmic trading systems with AI agents. Built with
[Jekyll](https://jekyllrb.com/), served by [GitHub Pages](https://pages.github.com/),
in a warm-academic / journal style.

🔗 **Live:** https://multi-agent-quant-lab.github.io

## Pages

| Path | KO | What |
|------|----|------|
| `/` | 홈 | Overview, mission, layers, recent activities |
| `/about/` | 소개 | Mission, why multi-agent, who should join |
| `/research/` | 연구 | Research tracks, build layers, tech stack |
| `/people/` | 멤버 | Circular portraits + short bios (10 members) |
| `/activities/` | 활동 | Study / session / talk logs |

## Editing content (mostly YAML)

| What | File |
|------|------|
| Members (name / role / bio / photo) | `_data/members.yml` |
| Navigation | `_data/nav.yml` |
| Title / tagline / contact links | `_config.yml` |
| Activity posts | `_activities/YYYY-MM-DD-slug.md` |

### Bilingual text

Everything ships in **Korean + English**; a toggle (top-right, default 한국어)
switches instantly and remembers the choice. In data files use `*_ko` / `*_en`
fields. In HTML, wrap inline text as:

```liquid
{% include t.html ko="홈" en="Home" %}
```

or use paired elements `<span lang="ko">…</span><span lang="en">…</span>`.

### Member photos

Drop an image in `assets/img/people/` and set `photo: filename.jpg` in
`_data/members.yml`. With no photo, an initials circle is shown automatically.

### Add an activity

Create `_activities/2026-06-14-my-session.md`:

```yaml
---
kind: study          # session | study | talk  (controls the tag color)
kind_ko: 스터디
kind_en: Study
title_ko: 제목
title_en: Title
summary_ko: 한 줄 요약
summary_en: One-line summary
date: 2026-06-14
tags: [macro, signals]
---
<div class="prose"> … bilingual body with <span lang="…"> … </span> … </div>
```

## Local preview

```bash
bundle install            # one-time (uses the github-pages gem set)
bundle exec jekyll serve  # → http://localhost:4000
```

## Deployment

Pushing to `main` triggers an automatic GitHub Pages build. Source is
**Settings → Pages → Deploy from a branch → `main` / `root`**.

## Structure

```
_config.yml             site config + activities collection
_data/                  members.yml · nav.yml
_layouts/               default · page · activity
_includes/t.html        bilingual inline helper
index.html              home
about.html research.html
people/  activities/    section index pages
_activities/            activity posts (collection)
assets/css/main.css     "Warm Academic" theme
assets/js/site.js       lang toggle · mobile nav · reveal
assets/img/             maq-profile.png (logo) · people/
```
