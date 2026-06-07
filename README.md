# Multi-Agent Quant Lab

Website for the **Multi-Agent Quant Lab** study collective — a "Terminal Quant"
themed static site built with [Jekyll](https://jekyllrb.com/) and served by
[GitHub Pages](https://pages.github.com/).

🔗 **Live:** https://multi-agent-quant-lab.github.io

## Editing content

Most updates are just YAML — no HTML needed:

| What | File |
|------|------|
| Members | `_data/members.yml` |
| Focus / study areas | `_data/topics.yml` |
| Ticker tape items | `_data/ticker.yml` |
| Title, tagline, links | `_config.yml` |

Adding a member, for example:

```yaml
# _data/members.yml
- handle: "KIM.J"
  name: "Jiwon Kim"
  role: "Quant"
  focus: "volatility / options"
  github: "jiwon"      # optional
  link: ""             # optional external url
  status: "ACTIVE"     # ACTIVE | ALUMNI
```

## Local preview (optional)

GitHub Pages builds the site for you on every push, so this is only needed if
you want to preview changes before pushing.

```bash
gem install bundler jekyll   # one-time
bundle install
bundle exec jekyll serve      # → http://localhost:4000
```

## Structure

```
_config.yml          site config
index.html           home page (all sections)
_layouts/default.html  HTML shell, fonts, overlays
_data/               members / topics / ticker content
assets/css/main.css  the Terminal Quant theme
assets/js/terminal.js  typewriter + count-up enhancements
```

## Deployment

Pushing to `main` triggers a GitHub Pages build automatically. Make sure
**Settings → Pages → Source** is set to **Deploy from a branch → `main` / `root`**.
