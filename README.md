# ToGo Studio website

Public website: https://taiwanape.github.io/togo-studio/
Source repository: https://github.com/taiwanape/togo-studio

Source files live in dist/. Preview with any static server pointed at dist/ (opening the file directly also works for the page itself).
GitHub Pages serves the gh-pages branch root. That branch contains only dist/ files.
The manual Deploy ToGo Studio workflow checks JavaScript, publishes dist/ to gh-pages and requests a Pages build.

The approved look is the default. There is no `?brand=` switch in this repository: the approved channel artwork (avatar, banner, footer wordmark) is part of the base page, so `https://taiwanape.github.io/togo-studio/` and `?brand=approved-a` show the same page. Older layout experiments are not kept as selectable variants.

Current articles are design demonstrations. News collection, scheduled updates and a custom domain remain to be configured.
Self-hosted font files in dist/assets/fonts/ are a subset of Noto Sans TC covering the characters used on the site. Add new copy, then rebuild that subset, or missing glyphs fall back to PingFang TC / Microsoft JhengHei.
