---
name: epic-draft
description: Derive a coherent set of outcome-oriented, user-centric epics from an approved PRD, brief, prototype, or flow map. Use when the user has an approved PRD and asks to "derive epics", "turn this PRD into epics", "break this down", or "draft epics for [initiative]".
---

# Epic Draft

Turn an approved PRD into a set of epics that a team could actually plan against.

Save the result to `docs/02-requirements/epics-<slug>.md`.

## When to use

**After** a PRD (or equivalent brief) is approved. If requirements are still moving, epics
will churn — send the user back to `prd-draft` first.

Do not use for individual user stories → `user-story-draft`.

## Inputs

- The approved PRD (check `docs/02-requirements/`)
- Any prototype screens that exist in `src/pages/`
- Journey maps in `docs/03-design/`

If PRD section 3d already lists non-exhaustive epics, treat it as a starting point to
validate and expand, not as the answer.

## What makes an epic

An epic is a **major, outcome-oriented body of work that delivers user or business value on
its own.** Test each one:

- **Outcome, not task.** "Employee onboarding" is an epic. "Build the employee API" is not.
- **User- or value-centered.** If the title only makes sense to engineers, rewrite it.
- **Groups multiple requirements.** An epic that maps to one functional requirement is a
  story wearing a costume.
- **Independently valuable.** Shipping it alone should improve something for someone.
- **2–6 sprints of work.** Bigger and it's an initiative; smaller and it's a story.
- **Traceable.** Every epic maps back to a PRD goal and a use case. Every P0 requirement in
  the PRD lands in exactly one epic.

Aim for 4–8 epics. More than 10 usually means you've decomposed into features.

## Output

### Epic Set Overview

Table:

| # | Epic | Outcome | Goals Supported | Use Cases | Priority | Rough Size |

### Per-Epic Detail

For each epic:

- **Epic name** — a user-facing outcome.
- **Outcome statement** — "So that [user] can [accomplish], which delivers [business value]."
- **Scope** — what's in.
- **Out of scope** — what's explicitly not, especially anything a reader would assume is in.
- **Requirements covered** — the PRD requirement IDs or descriptions rolled up here.
- **Dependencies** — other epics that must land first, and why.
- **Open questions** — what needs a decision before this can be planned.

### Coverage Check

State explicitly which PRD P0 requirements landed in which epic, and flag any that landed
nowhere or in more than one. This check is the main reason to run the skill rather than
eyeballing it — do not skip it.

### Sequencing

A recommended order with the reasoning: dependencies, risk retirement, or earliest user
value. Say which one you optimized for.

## Rules

- Do not invent requirements that aren't in the PRD. If an epic needs something the PRD
  doesn't cover, flag the gap — that is a PRD revision, not an epic decision.
- Do not create an epic per prototype screen. Screens are UI; epics are outcomes.
- Keep technical work inside the epic it serves rather than making "platform work" its own
  epic, unless it genuinely delivers standalone value.

## Handoff

Epics approved → `user-story-draft` to break one into stories.
