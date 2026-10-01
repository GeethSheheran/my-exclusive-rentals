# My Exclusive Rentals

Next.js site exported to `out/` for Apache/cPanel. Production needs no Node.js
process and no PHP. All articles use one shared source template.

## Publishing from the dashboard

Publish a post in Firebase for this website and it appears on the next blog visit
or refresh. Open tabs also refresh when focused and every 60 seconds while
visible. Edits and unpublishing follow the same process. **No per-post rebuild,
file upload, deployment, or restart is needed.**

The blog listing includes a build-time snapshot for initial discovery, then
replaces it with current published Firebase posts. Each article loads its current
content from Firebase in the browser. Apache rewrites public article URLs to the
shared `blog/__article/index.html` shell, including slugs created after deployment.
There are no individual article source files.

## Build and deploy (one time for this fix, then for code/design changes)

```sh
npm ci
npm run lint
npm run build
npm run check:seo
npm run test:blog
```

Build with the Firebase settings in `.env.local` (never upload the environment
file). The existing names are supported:

```dotenv
FIREBASE_API_KEY=your-firebase-web-api-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_APP_ID=your-app-id
BLOG_SITE_ID=your-site-id
```

`NEXT_PUBLIC_` equivalents are also supported. Firebase web configuration is
included in the browser bundle; access is controlled by the existing Firestore
rules, which allow reads of published posts. Never use an admin/service-account
credential here. The query uses the existing index on `siteId`, `status`, and
`publishedAt`.

Upload the **complete new `out/` contents, including hidden `out/.htaccess`**, to
the same cPanel document root as before. Back up the current files first. The
`.htaccess` replacement is essential: an older rule either rejects new slugs or
serves stale exported article files. Preserve any host-managed PHP/Passenger or
other unrelated directives when merging the supplied Apache rules.

The new article rule takes precedence over old exported article directories.
Upload the new assets and shell before switching `.htaccess` and the blog listing.
Do not upload `.next/`, source files, `.env.local`, or `node_modules`. No new server
process or cPanel application setup is needed. `npm start` is only a **local
static preview** with equivalent routing; it is not a production requirement.

After deployment, open a newly published slug directly and refresh it. Confirm
its content, title, and canonical load. Do not enable stale HTML caching on the
blog or the shared shell. Firebase calls fetch current server data.

## SEO behavior and limits

- Published article URLs return HTTP 200 and load automatically without login or
  interaction. The browser sets a unique title, description, canonical, Open
  Graph tags, and BlogPosting structured data.
- The shell deliberately has no initial canonical and no initial `noindex`, so
  crawlers can render it without conflicting URL signals.
- A confirmed missing/unpublished article shows “Story not found” and adds
  `noindex` after the Firebase lookup. Static hosting cannot return a
  database-dependent HTTP 404; unrelated invalid URLs still return a real 404.
- Temporary Firebase failures show a retry message, rather than claiming the
  article is missing. A listing can retain its last available snapshot during an
  outage; an article already open retains its last loaded content.
- **`sitemap.xml` remains a build-time snapshot.** It includes articles published
  at the last build. New articles are discoverable through live `<a href>` links
  on `/blog/` without another deployment. Robots.txt points to this sitemap.
- Google can render JavaScript, but indexing can be delayed or fail if rendering
  or Firebase requests fail. Bots that do not run JavaScript will not see article
  content/metadata; social link previews may remain generic. This is client-side
  SEO, not server rendering. See
  [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Verification

`npm run check:seo` uses Python 3 to check initial listing links, sitemap coverage,
robots.txt, the shared shell's indexing signals, and the exported Apache file.
`npm run test:blog` uses Playwright against the unchanged static export, intercepts
Firestore reads with test data, and checks publish/edit/unpublish, new-URL refresh,
metadata, draft/site filtering, and retry behavior. It makes no database writes.

Tests use installed Google Chrome on macOS if available. Else install Chromium
with `npx playwright install chromium`, or set `CHROME_EXECUTABLE` to your browser.
For manual testing, run `npm start` and open `http://127.0.0.1:4173/blog/`.
