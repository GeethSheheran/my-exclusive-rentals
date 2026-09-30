# My Exclusive Rentals

Next.js site with a live, server-rendered Firebase blog. One shared template at
`src/app/blog/[slug]/page.tsx` renders every article, including slugs created after
the app was deployed.

## Publishing from the dashboard

Publish, edit, or unpublish a post in Firestore for this site's `BLOG_SITE_ID`.
The next request to the blog listing, article, or `/sitemap.xml` reads the updated
data. **Article changes do not need a build, deployment, restart, or webhook.**
A visitor who already has a page open sees the update after refreshing.

The server returns complete article HTML, unique metadata, canonical links, and
BlogPosting structured data. Unknown and unpublished slugs return HTTP 404.
Firestore errors produce an error response instead of a successful empty sitemap
or a misleading 404. Site code/design changes still require a build and restart.

## Local development and checks

Use Node.js 22 or newer. Install with `npm ci`, create `.env.local`, then run
`npm run dev`.

```dotenv
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_APP_ID=your-app-id
BLOG_SITE_ID=your-site-id
```

Optional settings: `FIREBASE_AUTH_DOMAIN`, `FIREBASE_STORAGE_BUCKET`, and
`FIREBASE_MESSAGING_SENDER_ID`. Existing `NEXT_PUBLIC_` equivalents are accepted,
but the names above are preferred for runtime configuration on the server.
Published posts must be readable under the existing Firestore security rules;
this implementation does not bypass them or require an admin service account.
The existing query index uses `siteId`, `status`, and `publishedAt`.
Slugs must use lowercase letters, digits, and hyphens and must be unique per site.

```sh
npm run lint
npm run build
npm run test:blog
npm start
```

`test:blog` starts an isolated production app and a local Firestore REST stub. It
verifies publish/edit/unpublish after startup, site/draft isolation, live sitemap
updates, real 404s, and CMS error handling without touching production data.
`FIRESTORE_EMULATOR_HOST` is only for local testing; do not set it on the VPS.

With the app running, `npm run check:seo -- http://127.0.0.1:3000` checks all current
articles over HTTP without JavaScript. This read-only check requires Python 3.

## One-time cPanel VPS setup

This branch requires a running Node.js app. **Uploading static `out/` files will
not activate automatic publishing.** Build output is now `.next/`.

Prepare a separate application directory and staging domain first. Keep the
existing live document root and Apache rules untouched until staging passes the
checks and the production switch is approved.

1. Have the VPS administrator enable Node.js 22+ and Passenger/Application Manager
   (or the host's equivalent “Setup Node.js App”). See the official
   [cPanel Node.js setup guide](https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node-js-application/).
2. Put the project in the application directory, outside the publicly served
   document root. Run `npm ci` and `npm run build` there. Do not publish the source
   directory or `.env.local` as static files.
3. Register the app in production mode, with startup file **`app.js`**, and map the
   staging domain at `/`. Set `NODE_ENV=production` and the Firebase variables above
   in its environment. The app uses Passenger's listener integration; for a
   normal Node process it listens on `127.0.0.1` and `PORT` (default 3000).
4. Verify existing home/property/contact routes, assets, article HTML, sitemap,
   and missing-article 404s on staging. Configure HTTPS and the non-www canonical
   host at the Apache/cPanel layer. Response security headers are retained in
   `next.config.ts`.
5. Only at the approved production switch, map the live domain to the Node app.
   Remove the old static blog-shell rewrite and any static blog/sitemap files
   that could intercept requests. Preserve cPanel-generated Passenger directives.
   The former `public/.htaccess` file is deliberately no longer shipped.

If Application Manager is unavailable, the VPS administrator can run `npm start`
under a process supervisor and route Apache to the app on localhost. This needs
one-time server configuration; it cannot be enabled just by changing React code.

Do not enable full-page/proxy caching for `/blog/`, `/blog/*`, or `/sitemap.xml`.
Blog pages return `no-store`; the sitemap uses `max-age=0, must-revalidate` and is
generated on every request. Honor those headers so dashboard changes remain
visible on the next request. No per-post deployment is involved after this setup.

Keep the previous live files and hosting configuration available for rollback.
After the approved switch, submit `/sitemap.xml` in Google Search Console and
inspect the affected article URLs. Google controls when search results update.
