---
name: design-critique
description: Evaluate a UI against usability heuristics, UX laws, interaction patterns, information architecture, and content quality — delivered inline or as a severity-rated critique report. Use when the user says "critique this", "design review", "evaluate this screen", "what's wrong with this UI", or wants a saved critique doc.
---

# Design Critique

Evaluate an interface against established principles so the feedback is specific and
arguable, not a matter of taste.

Two modes:

- **Inline** — a review in the conversation. The default.
- **Report** — a severity-rated markdown doc saved to `docs/03-design/critique-<slug>.md`.
  Use when the user asks for something committable or wants to track fixes.

## Before critiquing

Establish these, or the critique will be generic:

- **Who is the user** and what are they trying to accomplish on this screen?
- **What stage is this?** A sloppy prototype gets critiqued for flow and comprehension, not
  spacing. Critiquing polish on a rough prototype is noise — say so and refocus.
- **What does the user want feedback on?** Sometimes they want the whole thing; often they
  have one worry.

Look at the actual screen: the running app (`npm run dev`), a screenshot, or the page
source in `src/pages/`.

## What to evaluate

Work through these lenses. Skip any that don't apply rather than padding.

**Usability heuristics** — visibility of system status; match between system and real
world; user control and freedom (undo, escape hatches); consistency; error prevention;
recognition over recall; flexibility; minimalist design; error recovery; help.

**Interaction and cognition** — Is the primary action obvious within a second? How many
decisions is the user making at once? Is related information grouped, or scattered? Are
click targets and reading order sensible? What happens while it's loading, when it's empty,
and when it fails?

**Information architecture** — Does the structure match how the user thinks about the
domain, or how the database is shaped? Can they tell where they are and what's available?

**Content** — Is the copy in the user's language? Are labels specific ("Save changes" vs
"Submit")? Do error messages say what failed, why, and what to do next? Is anything
important conveyed only by color?

**Accessibility basics** — keyboard reachability, focus visibility, semantic structure,
text alternatives, contrast. Flag issues; a full audit is a separate exercise.

## Severity

Rate every finding:

| Severity | Meaning |
|---|---|
| **Critical** | Blocks the task or causes data loss |
| **Major** | Causes frequent errors, confusion, or abandonment |
| **Minor** | Slows the user or creates mild friction |
| **Polish** | Cosmetic or consistency |

Order findings by severity, and lead with the critical ones. A list where a contrast nit
sits above a broken flow buries the thing that matters.

## Each finding

- **What** — the specific element or behavior. Name it precisely.
- **Why it's a problem** — the principle it violates and the consequence for the user.
- **Severity**
- **Suggested fix** — concrete. "Reduce cognitive load" is not a fix; "move the three
  advanced fields behind a disclosure so the default form is four fields" is.

## Rules

- **Critique the design, not the designer.** Describe the effect on the user.
- **Be specific enough to act on.** If you can't name the element and the consequence, you
  don't have a finding yet.
- **Say what works, briefly.** Not for morale — so the team doesn't refactor away the parts
  that are load-bearing.
- **Don't invent user data.** "Users will be confused" is a hypothesis; say so, and say how
  it could be tested.
- **Respect the fidelity.** On a rough prototype, ignore visual polish entirely unless
  asked.

## Report format

When saving a report: context and scope at the top (what was reviewed, for which user and
task, at what fidelity, on what date), findings by severity, then a short summary of themes
and what to fix first.

## Handoffs

- Fixing the findings → `rapid-prototyping`.
- The problem is upstream of this screen → `journey-mapping`.
