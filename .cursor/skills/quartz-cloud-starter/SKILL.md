---
name: quartz-cloud-starter
description: Practical setup, preview, and test workflows for Cloud agents working on this Quartz 4 static site.
---

# Quartz Cloud starter

Use this skill when working in this repository. It gives the minimum setup, run, and test steps a Cloud agent usually needs right away.

## Quick start

1. Work from the repo root.
2. Confirm tool versions if the environment looks suspicious:
   - `node -v` should be `>= 22`
   - `npm -v` should be `>= 10.9.2`
3. Install dependencies if `node_modules/` is missing or `package-lock.json` changed:
   - `npm install`
4. No login is required for local work.
   - This repo is a static Quartz site.
   - There is no app backend, database, or third-party auth flow to boot locally.
5. Before starting a preview server, check whether one is already running so you do not start duplicates.
6. Start the local preview server from the repo root:
   - `npx quartz build --serve`
7. Open `http://localhost:8080`.

## Common environment facts

- The main runtime switches live in `quartz.config.ts`.
- There are no backend feature flags to seed or mock in normal local work.
- The closest thing to a content gate is frontmatter:
  - `draft: true` keeps content out of normal output because `Plugin.RemoveDrafts()` is enabled.
  - `ignorePatterns` in `quartz.config.ts` excludes directories such as `private`.
- Analytics are currently disabled with `analytics: null`. Keep them disabled unless the task is specifically about analytics.
- Untracked content files can produce date warnings during build. Those warnings are expected and usually harmless.

## Codebase areas and concrete workflows

### 1. Content pages: `content/**/*.md`

Use this area for page copy, frontmatter, internal links, and note structure.

Typical workflow:

1. Start `npx quartz build --serve`.
2. Edit the Markdown file in `content/`.
3. Wait for the rebuild to finish.
4. Open the changed page in the browser.
5. Click any changed internal links and confirm the destination renders correctly.

Recommended checks:

- Fast validation for normal copy edits:
  - `npx quartz build`
- If you changed frontmatter shape, slugs, or lots of links:
  - `npm run check`
  - `npx quartz build`

Notes:

- Prefer testing the exact changed page plus one inbound or outbound linked page.
- If you need to hide work-in-progress content, set `draft: true` and verify it is absent from the built site before committing.

### 2. Site config and presentation: `quartz.config.ts`, `quartz.layout.ts`, `quartz/styles/custom.scss`

Use this area for site title, theme, layout, colors, page chrome, and global presentation.

Typical workflow:

1. Start `npx quartz build --serve`.
2. Make the config, layout, or style change.
3. Reload the affected page in the browser.
4. If the preview looks stale after config or layout changes, restart the preview server once and re-check.

Recommended checks:

- `npm run check`
- `npx quartz build`
- Manual browser verification of:
  - the home page
  - one content page
  - dark mode if your change touches colors or layout

Notes:

- `quartz.config.ts` contains practical toggles such as `enableSPA`, `enablePopovers`, `analytics`, theme colors, locale, and ignore patterns.
- `quartz.layout.ts` controls which components render around content pages and list pages.
- `quartz/styles/custom.scss` is the first place to look for site-specific CSS changes.

### 3. Quartz internals: `quartz/components/**`, `quartz/plugins/**`, `quartz/util/**`, `quartz/processors/**`

Use this area for generator behavior, rendering logic, scripts, plugins, and utilities.

Typical workflow:

1. Make the code change.
2. Run the most targeted existing tests you can for the touched area.
3. Run repo-wide type and formatting checks.
4. Run a full site build.
5. Preview the changed behavior in the browser if it affects rendered output.

Recommended checks:

- Targeted tests first, for example:
  - `npm test -- quartz/util/path.test.ts`
  - `npm test -- quartz/util/fileTrie.test.ts`
  - `npm test -- quartz/components/scripts/search.test.ts`
- Then:
  - `npm run check`
  - `npx quartz build`

Notes:

- If you change parsing, links, or emitters, verify the result against a real page in `content/`, not just tests.
- If you add temporary debugging logs or config changes to investigate behavior, remove them before committing.

## Troubleshooting

- Port `8080` already in use:
  - Reuse the existing preview server if it matches this repo.
  - If you must stop a process, stop the exact PID only. Never kill by process name pattern.
- Preview did not reflect the change:
  - Refresh the page.
  - If the change was in config, layout, plugins, or build pipeline code, restart `npx quartz build --serve`.
- Tooling errors after dependency changes:
  - Run `npm install` again from the repo root.

## How to update this skill

Whenever you discover a new reliable runbook step, testing shortcut, or debugging trick:

1. Add it under the most relevant codebase area instead of appending random notes at the end.
2. Include the exact command or action.
3. State when to use it.
4. State the expected success signal.
5. Remove or rewrite stale instructions when the codebase changes.

Keep this file short, concrete, and biased toward steps a Cloud agent can execute immediately.
