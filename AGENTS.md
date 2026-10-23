# Working in this repo (for AI agents)

This is a **product prototype**: a clickable React app a product manager builds to make an
idea real enough to react to, plus the product documents that surround it. It is not
production code. Screens here are disposable illustrations of a workflow — the point is to
learn fast, not to ship this codebase.

Two things live here and both matter:

- `src/` — the prototype.
- `docs/` — the product thinking behind it (discovery, requirements, design, decisions).

## Stack

React 19 + TypeScript (strict) + Vite + Tailwind v4, **Modus** (Trimble's design system) for
UI, React Router for pages, and a small Express server that serves the built app on Cloud
Run. No test framework, no linter beyond the TypeScript compiler — that is deliberate, see
below.

## Rules

- **`npm run build` is the only gate.** It typechecks and builds the prototype, then builds
  the docs site. Run it before you call a change done. There is no `test`, `lint`, or `format`
  script — do not invent one and do not report having run one. (`npm run build:app` skips the
  docs build when you are iterating on `src/` and want the fast loop.)
- **TypeScript is strict.** Never use `any`; use `unknown` and narrow. The build fails on
  unused locals and parameters too.
- **Build UI from Modus components** (`ModusWcButton`, `ModusWcCard`, `ModusWcBadge`,
  `ModusWcTypography`, …), not hand-styled divs. Read `.agents/skills/modus-frontend/SKILL.md`
  before writing any UI — it covers the component catalog, the tokens, and the React
  integration traps that otherwise cost an hour each.
- **Color comes from Modus tokens**, never a hex value or a generic Tailwind color:
  `bg-base-page`, `text-base-content`, `text-primary`, `text-danger`. Tailwind is for
  **layout** (flex, grid, gap, spacing, responsive), not for recreating components.
- **Put spacing on wrapper divs, not on `customClass`.** `customClass` lands on a Modus
  component's inner element while the host stays `display: inline`, so margins set there
  misbehave. Use `flex flex-col gap-*` wrappers.
- **Modus icon names use underscores** — `lightbulb_on`, not `lightbulb-on`. A wrong name
  fails silently, rendering nothing.
- **Modus sizes run small**: typography `md` (the default) is 14px, `sm` is 12px, `xs` is
  10px. Use `md` for body copy, `lg` for lead text.
- **Tailwind `border-*` utilities do nothing** — the Modus reset zeroes `border-width`. Use
  `ModusWcDivider` for separators.
- **No `React.StrictMode`.** It breaks Modus slotted children in dev. `src/main.tsx` omits it
  on purpose.
- **No inline `style` props**, and no CSS files beyond `src/index.css`.
- **Every page is a routed page.** A screen goes in `src/pages/` as `SomethingPage.tsx` and
  gets a `<Route>` in `src/App.tsx`. A page nobody can navigate to does not exist as far as
  a stakeholder review is concerned.
- **Use the `@/` alias** for internal imports (`@/pages/HomePage`), never `../../`.
- **Function components only.** Named `export default function SomethingPage()`.
- **Never commit secrets.** No API keys, tokens, or customer data — prototypes get shared
  and deployed casually. If a feature needs a real secret, it is out of scope for the
  prototype; fake the data instead.
- **Prefer fake data over real integrations.** A hardcoded array in the component beats a
  backend call. Put shared fixtures in `src/data/` when two pages need the same thing.
- **Don't touch the deploy plumbing** (`Dockerfile`, `.github/workflows/`, `server/`)
  unless deployment is the actual task.

## Splitting up work

Split a component when it passes ~150 lines or starts doing two unrelated things. Until
then, keep it in one file — a prototype gets rewritten more often than it gets read, and
premature abstraction costs more than duplication here.

## The PM workflow

`.agents/skills/` holds the skills that take an idea from a hunch to a clickable prototype:
market and product requirements, feature brainstorming, epics and user stories, journey
maps, design critiques, and the prototyping loop itself. **Read `.agents/README.md`** for
the index and the order they're normally used in.

Those skills write their output into `docs/`. See `docs/README.md` for what belongs in
which folder.

## The docs site

`docs/` is published as a Docusaurus site at **`/docs/`**, served by the same Express process
as the prototype. Write markdown in `docs/` and it appears — the sidebar is generated from the
folder structure, and a folder's `README.md` becomes its index page. `docs-site/` holds the
config and rarely needs touching; see `docs-site/README.md`.

- **Link to the docs with a plain `<a href="/docs/…">`, never react-router's `<Link>`.** The
  SPA does not own `/docs`; Express does. A `<Link>` would client-route into a prototype route
  that doesn't exist.
- URLs drop the numeric prefix: `docs/01-discovery/` is served at `/docs/discovery/`.
- Locally the docs are a second process — `npm run dev:docs` on port 3000, which the Vite dev
  server proxies. Without it running, `/docs` links are dead in dev but fine in production.

## Ship it

```bash
npm install      # first time (also installs docs-site/)
npm run dev      # prototype  → http://localhost:5173
npm run dev:docs # docs       → http://localhost:3000/docs/  (optional, second terminal)
npm run build    # the gate — must pass before you're done
```

Push to `main` and GitHub Actions deploys to Cloud Run. First-time setup is in
`docs/DEPLOYMENT.md`.
