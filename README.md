# sk-226.github.io

Redirects the old personal site to **[sk-226.com](https://sk-226.com/)**.
This repository is not the source of the new site.

## Destinations

| Old URL path | Destination |
| --- | --- |
| `/`, `/index.html` | `https://sk-226.com/` |
| `/about`, `/about/`, `/about.html`, `/about/index.html` | `https://sk-226.com/about/` |
| `/notes`, `/notes/`, `/notes.html`, `/notes/index.html` | `https://sk-226.com/writing/` |
| Other paths | `https://sk-226.com/` via `404.html` |

Known pages have their own HTML files, rather than relying on a 404 response.
The deployment workflow also copies the About and Notes redirects to directory indexes.
Unknown paths deliberately go to the homepage instead of forwarding an unverified path.

JavaScript preserves the query string and fragment and uses `location.replace`
so the browser's Back button does not return to the redirect page.
With JavaScript disabled, an immediate meta refresh uses the fixed destination
(query strings and fragments are not explicitly preserved). A manual link is always present.
If the script is blocked or fails, use that link.

These are **browser-side redirects, not HTTP 301/308 redirects**.
An unknown URL still returns GitHub Pages' HTTP 404 before the browser navigates;
that fallback is for visitors, not a claim of search-ranking transfer.
The `*.github.io` hostname remains on GitHub Pages. Do not set a custom domain or
change the Cloudflare/DNS configuration for `sk-226.com` in this repository.

## Deployment and checks

Keep the repository public and GitHub Pages enabled with **Source: GitHub Actions**.
Merging into `main` runs `.github/workflows/deploy.yml`, tests the redirect files,
and publishes only the static files in `_site/`. Pull requests run the tests but
cannot deploy. No npm installation or static-site generator is needed.

Run source checks with Node.js 22:

```sh
node --test tests/redirects.test.mjs
```

Reproduce the deployment artifact and its checks:

```sh
mkdir -p _site/about _site/notes
cp index.html 404.html about.html notes.html redirect.js _site/
cp about.html _site/about/index.html
cp notes.html _site/notes/index.html
touch _site/.nojekyll
SITE_DIR=_site node --test tests/redirects.test.mjs
```

After deployment, check `/`, `/about`, `/notes`, an unknown path,
and a URL containing a query and fragment in a browser. Verify the no-JavaScript
fallback as well. Confirm that the destination site is reachable before merging.

## Previous site

The Quartz site is preserved on the `legacy-quartz` branch at
`ecca5fd0c8257e9f5133ce2a38792646d832fdab` and remains in Git history.
Removing it from the default branch does not hide or erase that public history.
