---
title: Product Docs
sidebar_label: Overview
sidebar_position: 0
---

# `docs/` — where product thinking lives

Everything here is published as a documentation site at **`/docs/`**, alongside the
prototype — so one link gives a stakeholder both the clickable thing and the reasoning
behind it. Write markdown, and it appears; the sidebar follows the folder structure.

Four folders, in the order work moves through them. If you're not sure where something
goes, the question is **"what stage of thinking is this?"** — not what format it's in.

| Folder | What belongs here | Skills that fill it |
|---|---|---|
| **`01-discovery/`** | Why this is worth doing. Problem statements, user research and interview notes, market requirements (MRD), competitive analysis, feature brainstorms. | `brainstorm-features`, `mrd-draft` |
| **`02-requirements/`** | What we're building. PRDs, epics, user stories and acceptance criteria. | `prd-draft`, `epic-draft`, `user-story-draft` |
| **`03-design/`** | How it should work and feel. Journey maps, service blueprints, empathy maps, design critiques, UI notes. | `journey-mapping`, `design-critique` |
| **`04-decisions/`** | What we decided and why. Short decision records — the choice, the alternatives, the reasoning, the date. | — (write these by hand) |

Each folder has its own README with more detail and a naming convention.

## The rule that matters

**Write the decision down when you make it, not later.** The single most expensive thing in
a prototype-driven project is re-litigating a decision six weeks on because nobody recorded
why it was made. `04-decisions/` exists for exactly this and takes two minutes to use.

## Naming

`<type>-<slug>.md`, lowercase, hyphenated: `prd-timesheet-approval.md`,
`journey-foreman-weekly-close.md`, `2026-09-10-offline-mode.md` for decisions.

Dates in filenames only for decision records, where chronology is the point. Elsewhere the
slug should stay stable so links don't rot.

Keep filenames kebab-case — they become the published URL. The folder's numeric prefix is
stripped, so `01-discovery/mrd-permits.md` is served at `/docs/discovery/mrd-permits`.

## Publishing

Add a `# Heading` and the page renders; no frontmatter is required. To set the sidebar label
or order explicitly, add `title:` / `sidebar_position:` frontmatter — see
`docs-site/README.md` for the short list of keys that do something.

## What doesn't go here

- **Screens** — those are the prototype, in `src/pages/`.
- **Anything confidential.** Prototypes get shared and deployed casually; treat this repo
  as visible to anyone in your organization. No customer names in research notes, no
  contract terms, no unannounced financials.
- **Meeting notes**, unless a decision came out of them — in which case write the decision
  record and drop the notes.
