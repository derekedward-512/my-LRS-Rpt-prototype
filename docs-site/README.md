# docs-site

The [Docusaurus](https://docusaurus.io) site that publishes `../docs/` at `/docs/`, next to
the prototype. In production both are served by the same Express process from the same Cloud
Run container, so a stakeholder gets one URL.

**You rarely need to touch this folder.** Write markdown in `../docs/` and it appears here.

## How it works

- `../docs/` is the source of truth. Nothing is copied — `docusaurus.config.ts` points the
  docs plugin at it directly.
- The sidebar is generated from the folder structure. A folder's `README.md` becomes its index
  page, and the `01-`/`02-` prefixes set the order and are stripped from the URL — so
  `docs/01-discovery/README.md` is served at `/docs/discovery/`.
- This is a **separate npm project** with its own lockfile. Docusaurus 3 is React 18 and the
  prototype is React 19; keeping them apart is deliberate. The root `postinstall` installs
  this folder for you, so `npm install` at the root is still all you need.

## Local development

The prototype and the docs run as two processes:

```bash
npm run dev        # prototype  → http://localhost:5173
npm run dev:docs   # docs       → http://localhost:3000/docs/
```

The Vite dev server proxies `/docs` to port 3000, so links between the two work at
`localhost:5173` as long as both are running.

## Building

`npm run build` at the repo root builds both. To build only the docs:

```bash
npm run build:docs      # → docs-site/build/
```

`DOCS_BASE_URL` (default `/docs/`) sets the path the site is served from; it is baked in at
build time, and the "Prototype" navbar link is derived from it.

## Frontmatter that does something

None of it is required — a file with just an `# H1` renders fine, using the heading as its
title. The useful keys:

| Key | Effect |
|---|---|
| `title` | Page title and default sidebar label |
| `sidebar_label` | Overrides just the sidebar label |
| `sidebar_position` | Orders the page within its folder |
| `slug` | Overrides the URL |
| `unlisted` | Builds the page but hides it from the sidebar |

## Search

`@easyops-cn/docusaurus-search-local` builds the index at compile time and ships it with the
site — no external service and no API key, so it works behind SSO.

**Search only works in a built site.** In `npm run dev:docs` the box is there but says the
index is unavailable; that is expected, not a bug. To try it for real, `npm run build` and
`npm start`, then open `/docs/`.

## Adding diagrams

Deliberately left out, about a five-minute add if you want it: **Mermaid** —
`@docusaurus/theme-mermaid` plus `markdown: { mermaid: true }`.

## Gotcha: clear the cache after changing plugins or themes

Adding or removing anything in the `themes`/`plugins` arrays can leave `.docusaurus/` stale,
and the dev server then fails with a confusing `Can't resolve '@theme/...'` — while
`npm run build` succeeds. Fix:

```bash
npm --prefix docs-site run clear
```

## Dark mode

Off, because the prototype is light-only and a docs site that flips dark reads as a different
product. To enable it, drop `disableSwitch: true` from `colorMode` in `docusaurus.config.ts`
and add a `[data-theme='dark']` block to `src/css/custom.css`.
