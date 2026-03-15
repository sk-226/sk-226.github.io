# sk-226.github.io

Personal site built with [Quartz 4](https://quartz.jzhao.xyz/).

## Development

```bash
npm install
npx quartz build --serve
```

Open http://localhost:8080

## Content

Edit Markdown files in `content/` to update pages. The dev server watches for changes automatically.

## Deploy

This site is deployed with GitHub Actions.

1. In GitHub, open `Settings > Pages`.
2. Set `Source` to `GitHub Actions`.
3. Push to `main` to trigger a build and deploy.

To build the static site locally, run `npx quartz build`. The generated files will be written to `public/`.
