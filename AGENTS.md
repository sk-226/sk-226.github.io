# AGENTS.md

## Cursor Cloud specific instructions

This is a [Quartz 4](https://quartz.jzhao.xyz/) static site (personal site for sk-226.github.io).

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npx quartz build --serve` (port 8080) |
| Build | `npx quartz build` |
| Lint/check | `npm run check` (runs `tsc --noEmit` + `prettier --check`) |
| Format | `npm run format` |
| Tests | `npm test` |

### Content editing

- Content lives in `content/` as Markdown files with YAML frontmatter.
- Site config: `quartz.config.ts` (title, colors, plugins).
- Layout config: `quartz.layout.ts` (which components appear on pages).
- Custom CSS: `quartz/styles/custom.scss`.

### Notes

- The dev server watches for content changes and rebuilds automatically.
- Files not tracked by git will produce date warnings during build; these are harmless.
- The layout has been simplified (no sidebar explorer, graph, or TOC) for a minimal stephango.com-inspired design.
