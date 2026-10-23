# Prototype & Design Template

A starting point for product managers who want to make an idea clickable — a React
prototype, the product documents around it, and an AI toolkit that helps write both.

Clone it, run two commands, and start building. No React experience required.

```bash
npm install
npm run dev      # http://localhost:5173
```

Then open `.agents/README.md` and pick a skill.

To work on the docs at the same time, run `npm run dev:docs` in a second terminal
(http://localhost:3000/docs/).

## What you get

| | |
|---|---|
| **A working React app** | React 19, TypeScript, Vite, Tailwind. Routing wired, one example page. |
| **Modus, already set up** | Trimble's design system — the navbar, components, color tokens, Open Sans and icons are configured, so what you build looks like a Trimble product from the first commit. |
| **Ten PM skills** in `.agents/` | PRD and MRD drafting, feature brainstorming, epics, user stories, journey maps, design critiques, the prototyping loop, Modus UI guidance, and a React cookbook. |
| **A docs structure** in `docs/` | Four numbered folders — discovery, requirements, design, decisions — each with a README saying what belongs in it. |
| **A published docs site** | `docs/` renders as a real documentation site at `/docs/`, served from the same container as the prototype. One URL holds the clickable thing and the thinking behind it. |
| **Deployment** | Push to `main`, GitHub Actions ships it to Google Cloud Run. Setup in `docs/DEPLOYMENT.md`. |

Works in **Cursor** and **Claude Code** — the skills are written once in `.agents/` and
symlinked into both `.cursor/skills/` and `.claude/skills/`, so switching tools changes
nothing.

## The idea behind it

Build the rough prototype early — before the requirements are finished, before anyone
designs the polished version. A clickable skeleton unblocks everyone at once: the designer
has structure to react to instead of a blank canvas, engineers see the real shape of the
problem, and you find the requirements you missed by trying to build them.

So the documents and the prototype grow together. Write a PRD, build the screens, discover
the PRD was wrong, fix both. The `.agents/` skills exist to make each of those loops fast
enough that you're willing to do it repeatedly.

## Where things go

```
src/pages/          your screens — one file per screen, routed in src/App.tsx
src/layouts/        the app shell (Modus navbar)
src/components/     UI you use in more than a couple of places
src/data/           fake data shared across screens
docs/               product thinking, published at /docs/ (see docs/README.md)
docs-site/          the Docusaurus config that publishes docs/ — rarely touched
.agents/skills/     the PM toolkit (see .agents/README.md)
AGENTS.md           the rules your AI tool follows
.mcp.json           Modus component docs, available to your AI tool
```

## Commands

```bash
npm run dev        # prototype dev server, live reload
npm run dev:docs   # docs dev server on :3000 (proxied at /docs)
npm run build      # typecheck + build the prototype and the docs — the only gate
npm run build:app  # prototype only, for a faster loop while working in src/
npm run preview    # preview the production build locally
```

There's no test runner and no linter beyond the TypeScript compiler. That's deliberate: a
prototype gets rewritten far more often than it gets maintained, and a test suite you throw
away next week is a tax on the thing this repo optimizes for. Add them when the prototype
stops being a prototype.

## Using this as a template

On GitHub, click **Use this template** to make your own copy. Then:

1. Change `name` in `package.json`.
2. Fill in `SERVICE` and `PROJECT_ID` in `.github/workflows/deploy.yml`.
3. Replace `src/pages/HomePage.tsx` with your first real screen.
4. Delete this section from the README.

## A caution

Prototypes get shared, deployed, and screenshotted casually — treat everything here as
visible to anyone in your organization. Never commit real credentials, customer data, or
confidential material. Fake the data; that's what a prototype is for.
