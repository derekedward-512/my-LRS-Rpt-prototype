---
name: journey-mapping
description: Create alignment diagrams — current-state journey maps, service blueprints, experience maps, empathy maps, and mental model diagrams. Guides which diagram type fits the question, how to structure it, and how to run an alignment conversation around it. Use when the user asks to "map the journey", "build a journey map", "service blueprint", "empathy map", or wants to understand a user's end-to-end experience.
---

# Journey Mapping

Journey maps are **alignment diagrams**: their value is the shared understanding they
create, not the artifact. A beautiful map nobody argued over was a waste of time.

Save the result to `docs/03-design/journey-<slug>.md`.

## Pick the right diagram first

Do not default to a journey map. Ask what question needs answering:

| Question | Diagram |
|---|---|
| What does the user experience, step by step, today? | **Current-state journey map** |
| What has to happen behind the scenes to deliver that? | **Service blueprint** |
| What is the user's whole experience of this problem, across all solutions? | **Experience map** |
| How does this user think and feel about this domain? | **Empathy map** |
| How does the user's mental model differ from our system's model? | **Mental model diagram** |

If the user asked for a "journey map" but the question is really "why does our support
queue spike here," a service blueprint will serve them better. Say so.

## Grounding rule

A journey map built from assumptions documents the team's beliefs, not the user's
experience — and then gets cited for a year as if it were research.

- Draw on real inputs: interviews, support tickets, session recordings, sales calls,
  analytics.
- **Mark every unresearched step** as `[ASSUMPTION]`. A map that is half assumptions is
  still useful; a map that hides which half is dangerous.
- Note the evidence source per phase where you have one.

If the user has no research, build it anyway as an explicit **hypothesis map**, label it
that way in the title, and list what would need validating.

## Current-state journey map structure

Set the frame first: **which persona**, **which scenario**, **what scope** (start and end
point). A map without these is unreadable by anyone who wasn't in the room.

Then, per phase:

- **Phase** — the user's name for this stage, not yours.
- **Actions** — what they do.
- **Thoughts** — what they're asking themselves.
- **Emotions** — the emotional arc, with intensity. Note where it dips hardest.
- **Touchpoints** — systems, people, documents, channels.
- **Pain points** — friction, confusion, workarounds, dead ends.
- **Opportunities** — where an intervention would matter most.

A table with phases as columns reads best. Close with the **two or three moments that
matter most** — the map's whole point is to make those obvious.

## Service blueprint additions

A blueprint is a journey map plus the delivery system underneath, split by lines:

- **Frontstage** — what the user sees.
- **Line of visibility**
- **Backstage** — staff actions the user doesn't see.
- **Line of internal interaction**
- **Support processes** — systems and infrastructure.

Use it when the failure is operational rather than interface-level.

## Empathy map structure

Four quadrants for one persona in one context: **Says**, **Thinks**, **Does**, **Feels**.
Add **Pains** and **Gains** beneath. Quote real user language wherever you have it —
paraphrasing sands off exactly the detail that makes it useful.

## Rules

- **The user's words, not internal jargon.** If the team calls it "onboarding" and users
  call it "getting set up," use theirs.
- **Include the boring steps.** Waiting, re-entering data, and looking for a password are
  where journeys actually break.
- **Do not fabricate emotions.** Infer from evidence, label the inference.
- Don't extend into future-state solutioning inside a current-state map — capture ideas in
  the opportunities row and keep the two separate.

## Handoffs

- Opportunities worth building → `brainstorm-features`.
- The pain is in an existing screen → `design-critique`.
- Ready to show a better flow → `rapid-prototyping`.
