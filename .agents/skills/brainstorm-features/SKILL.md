---
name: brainstorm-features
description: Generate and rate high-value feature concepts for a topic or product area using four lenses (Automate, Validate, Predict/Personalize, Assist). Produces an executive summary, a concepts table with impact and effort ratings, and detailed top recommendations. Use when the user wants to explore ideas, find improvement opportunities, or evaluate feature concepts before requirements are crisp enough for a PRD — "what could we build here", "brainstorm features", "ideas for X".
---

# Brainstorm Features

Generate feature concepts for a product area and rate them, so the user leaves with a
ranked shortlist rather than a pile of ideas.

Save the result to `docs/01-discovery/brainstorm-<topic>.md`.

## When to use

Before requirements are crisp. If the user already knows what they're building, they want
`prd-draft`, not this.

## Inputs

Ask for whatever is missing, but do not interrogate — two or three answers is enough to start:

- The topic, product area, persona, or theme to explore
- Who the user is and what they're trying to get done
- Any constraints (timeline, platform, what's off the table)

Read anything relevant in `docs/01-discovery/` first.

## The four lenses

Run the topic through each lens. They exist to break the default habit of only generating
one kind of idea:

| Lens | The question it asks |
|---|---|
| **Automate** | What work is the user doing by hand that the system could just do? |
| **Validate** | Where does the user make errors we could catch, prevent, or flag early? |
| **Predict / Personalize** | What could we anticipate from their history, role, or context? |
| **Assist** | Where is the user stuck, guessing, or lacking information to decide? |

Aim for 3–6 concepts per lens. Cut the weak ones before presenting — a rated shortlist of
12 beats an unrated list of 30.

## Output

### Executive Summary

3–5 sentences: the biggest opportunity you found, the theme connecting the strongest ideas,
and what you'd do first.

### Feature Concepts

Table, sorted with the highest impact/effort ratio first:

| Concept | Lens | Description | User Value | Impact (H/M/L) | Effort (H/M/L) |

Rate impact on user or business outcome, not on how interesting the idea is. Rate effort
relative to the other concepts in the table, and say so — you are not estimating in days.

### Top Recommendations

Expand the top 3. For each:

- **What it is** — 2–3 sentences.
- **Why it wins** — the specific user or business outcome.
- **How it would work** — enough detail to be arguable, not a spec.
- **What would have to be true** — the assumption most likely to sink it.
- **Smallest version worth building** — what you'd prototype first to test it.

## Rules

- **Ground ideas in the user's actual context.** A generic feature list is worthless; if
  you don't have enough context to be specific, ask before generating.
- **Include at least one uncomfortable idea** — something that questions the current
  approach rather than adding to it.
- Do not invent user research findings or usage data to justify a concept. If a concept
  rests on an unvalidated belief, that belongs in "what would have to be true."

## Handoffs

- A concept is worth committing to → `prd-draft`.
- The market opportunity behind it is unproven → `mrd-draft`.
- You want to make a concept clickable to test it → `rapid-prototyping`.
