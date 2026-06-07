source "https://rubygems.org"

# Mirrors the gem set GitHub Pages uses to build the site.
# Lets you run `bundle exec jekyll serve` locally with the
# same versions GitHub Pages uses in production.
gem "github-pages", group: :jekyll_plugins

# Faster file-watching on some platforms during local preview.
gem "webrick", "~> 1.8"

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
