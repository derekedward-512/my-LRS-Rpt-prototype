# `.agents/` — the PM toolkit

Ten skills that take an idea from a hunch to a clickable prototype backed by real
requirements. Each one is a set of instructions your AI tool follows — you invoke it by
name and answer questions, rather than writing the prompt yourself.

**This folder is the source of truth.** `.claude/skills/` and `.cursor/skills/` are
symlinks pointing here, so the same skills work in Claude Code and in Cursor. Edit files
under `.agents/skills/` — never the symlinks.

## The skills

| Skill | What it does | Output lands in |
|---|---|---|
| **brainstorm-features** | Generates and rates feature concepts through four lenses | `docs/01-discovery/` |
| **mrd-draft** | Market requirements — sizing, JTBD, competitors, positioning | `docs/01-discovery/` |
| **prd-draft** | Product requirements — the ≤3,000 word PRD | `docs/02-requirements/` |
| **epic-draft** | Breaks an approved PRD into 4–8 outcome-oriented epics | `docs/02-requirements/` |
| **user-story-draft** | Breaks an epic into stories with Gherkin acceptance criteria | `docs/02-requirements/` |
| **journey-mapping** | Journey maps, service blueprints, empathy maps | `docs/03-design/` |
| **design-critique** | Severity-rated usability review of a screen or flow | `docs/03-design/` |
| **rapid-prototyping** | The sloppy-first prototyping loop and its conventions | `src/pages/` |
| **modus-frontend** | Trimble's design system — components, color tokens, icons, React traps | `src/` |
| **react-frontend-basics** | Stack cookbook — pages, forms, tables, state, errors | — |

## How to invoke one

**Claude Code** — type `/prd-draft` (any skill name works as a slash command), or just
describe what you want; the skill triggers on its own when it fits.

**Cursor** — reference the skill by name in chat: "use the prd-draft skill to write
requirements for the approval flow."

Either way you can pass context in the same message: `/prd-draft for the timesheet approval
flow, using the MRD in docs/01-discovery/`.

## The order they're normally used in

Nothing forces this sequence — skip anything that doesn't apply to what you're doing.

```
Idea
 └─ brainstorm-features ──▶ narrows to a concept worth pursuing
     └─ mrd-draft ────────▶ is this market real?           (skip for internal tools)
         └─ prd-draft ────▶ what are we building?
             ├─ epic-draft ──▶ user-story-draft   (the backlog)
             └─ rapid-prototyping                 (the clickable thing)
                  ├─ modus-frontend     ─── how it should look while you build it
                  ├─ journey-mapping    ─┐
                  └─ design-critique    ─┴─ inform each other, run any time
```

The most important thing in that diagram: **`rapid-prototyping` runs in parallel with the
backlog work, not after it.** Building the rough prototype is how you find the requirements
the PRD missed. Wait until the backlog is finished and you'll write stories for screens
that turn out not to work.

## Two things worth knowing

**Everything is a draft.** These skills produce first drafts, fast — they handle structure
and completeness so you spend your time on judgment. Every output needs your review, and
anything the skill inferred rather than knew is labeled as such. Fix the labels; don't ship
around them.

**Say where you are in the process.** "Draft a PRD" gets a much better result with "…for
the timesheet approval flow, targeting foremen, based on the interviews in
`docs/01-discovery/`." The skills will ask if you don't, but leading with context saves a
round trip.

## Adding your own

Create `.agents/skills/<name>/SKILL.md` with frontmatter:

```markdown
---
name: your-skill
description: What it does and when to use it. Include the phrases someone would say when they want this — that is what makes it trigger.
---

# Your Skill
...
```

Then symlink it into both tool directories:

```bash
ln -s ../../.agents/skills/your-skill .claude/skills/your-skill
ln -s ../../.agents/skills/your-skill .cursor/skills/your-skill
```

## What's deliberately not here

No ticket-tracker integration, no automated prototype-to-backlog pipeline, no research
repository. Those exist in mature product repos and are worth adding once a team knows it
needs them — starting with them buries a new prototype in process. Add what you miss, in the
order you miss it.

For deeper Modus coverage, Trimble publishes per-component skills (tables, side navigation,
form inputs, autocomplete, charts, and more) at
<https://modus.trimble.com/modus-ai/skills/claude-code>. `modus-frontend` here covers the
setup and the common traps; pull in the specific ones when you hit a component that needs
them.
