import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const site = process.env.SITE_DIR || '.';
const read = file => readFileSync(path.join(site, file), 'utf8');
const script = read('redirect.js');
const pages = new Map([
  ['index.html', 'https://sk-226.com/'],
  ['about.html', 'https://sk-226.com/about/'],
  ['notes.html', 'https://sk-226.com/writing/'],
  ['404.html', 'https://sk-226.com/'],
]);

for (const [file, expected] of pages) {
  const html = read(file);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];

  test(`${file}: fixed canonical, no-JS refresh, and manual link agree`, () => {
    assert.equal(canonical, expected);
    assert.ok(html.includes(`<a href="${expected}">`));
    assert.match(html, /<noscript>\s*<meta http-equiv="refresh" content="0; url=[^"]+">\s*<\/noscript>/);
    assert.ok(html.includes(`content="0; url=${expected}"`));
    assert.match(html, /<script src="\/redirect\.js"><\/script>/);
    assert.ok(html.indexOf('rel="canonical"') < html.indexOf('<script'));
  });

  for (const suffix of ['', '?utm_source=legacy#profile', '?q=%E6%95%B0%E5%80%A4&x=a%2Bb#%E7%A0%94%E7%A9%B6', '?next=https://example.org/#//example.org/']) {
    test(`${file}: replace navigation preserves ${suffix || 'an empty query/fragment'}`, () => {
      const source = new URL(`https://sk-226.github.io/${file}${suffix}`);
      const replacements = [];
      runInNewContext(script, {
        URL,
        document: {
          querySelector(selector) {
            assert.equal(selector, 'link[rel="canonical"]');
            return { href: canonical };
          },
        },
        window: { location: {
          pathname: source.pathname,
          search: source.search,
          hash: source.hash,
          replace: url => replacements.push(url),
        } },
      });
      assert.deepEqual(replacements, [expected + source.search + source.hash]);
      assert.equal(new URL(replacements[0]).origin, 'https://sk-226.com');
    });
  }
}

test('unknown paths go to the homepage, not a guessed destination', () => {
  const canonical = pages.get('404.html');
  for (const pathname of ['/missing/note', '//example.org/', '/%2F%2Fexample.org/', '/__proto__']) {
    let destination;
    runInNewContext(script, {
      URL,
      document: { querySelector: () => ({ href: canonical }) },
      window: { location: { pathname, search: '', hash: '', replace: url => { destination = url; } } },
    });
    assert.equal(destination, 'https://sk-226.com/');
  }
});

if (process.env.SITE_DIR) {
  test('published artifact contains only redirects and known route aliases', () => {
    const files = readdirSync(site, { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => path.relative(site, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'))
      .sort();
    assert.deepEqual(files, [
      '.nojekyll', '404.html', 'about.html', 'about/index.html',
      'index.html', 'notes.html', 'notes/index.html', 'redirect.js',
    ].sort());
    assert.equal(read('about/index.html'), read('about.html'));
    assert.equal(read('notes/index.html'), read('notes.html'));
  });
}
