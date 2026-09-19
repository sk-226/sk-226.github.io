# AGENTS.md

This repository only redirects the legacy GitHub Pages site to https://sk-226.com/.
Keep it dependency-free; do not restore Quartz or change the production site's hosting.

- `index.html`, `about.html`, `notes.html`, and `404.html` declare their destinations.
- `redirect.js` preserves query strings and fragments using `location.replace`.
- Keep each canonical URL, no-JavaScript refresh, and manual link consistent.
- `node --test tests/redirects.test.mjs` checks the source files.
- `.github/workflows/deploy.yml` stages and tests the public artifact, then deploys only from `main`.
- Do not publish README, tests, or repository history in the Pages artifact.
- The previous site is preserved on `legacy-quartz` and in Git history.
