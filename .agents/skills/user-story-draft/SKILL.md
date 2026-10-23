---
name: user-story-draft
description: Break an approved epic into user stories — first a story overview table for approval, then full stories with Gherkin acceptance criteria. Use when the user has an approved epic and asks to "write user stories", "break this epic down", "draft stories", or "write acceptance criteria".
---

# User Story Draft

Break an approved epic into stories. This runs in **two phases with an approval gate in
between** — do not skip to phase 2. Expanding twenty stories the user then rescopes wastes
everyone's time, and the boundaries are the part worth arguing about.

Save the result to `docs/02-requirements/stories-<epic-slug>.md`.

## Inputs

- The approved epic (check `docs/02-requirements/`)
- The PRD behind it, for requirement traceability
- Any prototype screens in `src/pages/` that show the flow

---

## Phase 1 — Story overview (get this approved first)

Produce **only** a table. No full stories yet.

| # | Story title | User goal (one line) | Priority | Effort | Depends on |

Then, below the table:

- **Design gaps** — anything the epic or prototype doesn't answer that a developer would
  need. Be specific: "what happens when the list is empty" beats "needs design."
- **Proto-acceptance criteria** — one line per story on what "done" roughly means, so the
  user can sanity-check the boundaries before you expand.
- **Coverage check** — which parts of the epic each story covers, and anything left over.

### How to find story boundaries

- **Vertical slices.** A story delivers something a user can do end to end, not a layer.
  "View the roster" is a story; "build the roster table component" is a task.
- **One user goal each.** If the title needs "and", it's probably two stories.
- **Independently demoable.** You should be able to show it working on its own.
- **A few days of work.** Bigger, split it. Much smaller, it's a task inside another story.
- Split by **workflow step, user type, or data variation** — not by technical layer.

Stop here and ask for approval.

---

## Phase 2 — Expand approved stories

Only after the overview is approved. Expand each story using this template:

### [Story title]

**Priority:** P{n} | **Effort:** {n} | **Epic:** {epic name}

**User Goal**
As a [persona], I want [capability] so that [outcome].

**Functional Summary**
Narrative prose describing what the system does and why. Not a bullet dump of requirements —
this is the section a developer reads to understand intent.

**Acceptance Criteria**
Gherkin scenarios only:

```
Scenario 1: [name]
  GIVEN [precondition]
  WHEN [action]
  THEN [observable outcome]
  AND [additional outcome]
```

Cover the happy path, the important edge cases, and the failure modes. Assert
**system behavior**, not UI mechanics — "the save is blocked and the invalid field is
identified" rather than "a red border appears on the input." Visual design is a design-time
decision; the story owns the behavioral contract.

**Validation Rules** *(only when the story has user-entered data)*
One bullet per field: label, required or optional, format/range/allowed values, and what
happens on failure. End with the save-gate behavior. Omit this section entirely for
read-only or navigation-only stories.

**Constraints**
Business rules, regulatory requirements, or technical limits that bound the solution.

**Dependencies**
Other stories or external work this needs first.

**Out of Scope**
What a reader would reasonably assume is included but isn't.

---

## Rules

- **Do not put acceptance criteria in the functional summary**, and do not restate
  constraints or dependencies inside the criteria. Each belongs in one place.
- **Avoid prescribing UI.** No component names, button labels, or layout instructions.
  Describe what the user can accomplish and what the system guarantees.
- **Do not invent requirements.** If a story needs behavior the epic and PRD don't cover,
  flag it as an open question instead of deciding it silently.
- Write criteria that are **verifiable**. "The page is intuitive" is not a criterion.

## Handoff

Stories written and a screen needs to exist → `rapid-prototyping`.
