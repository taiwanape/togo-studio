# ToGo Studio website

Source lives in dist/. Open dist/index.html locally to preview.

GitHub Pages deployment is prepared in .github/workflows/pages.yml.
It runs manually from Actions after Pages is enabled with GitHub Actions as its source.
The deploy artifact includes only dist/. Sites metadata and project video files are excluded.

Current content is a design demonstration. News collection, scheduled updates, editorial publishing and a custom domain remain to be configured.

Reference architecture inspected: taiwanape/auntie-no-mad, GitHub Actions + GitHub Pages + custom domain. Its live-news workflow currently runs manually.
