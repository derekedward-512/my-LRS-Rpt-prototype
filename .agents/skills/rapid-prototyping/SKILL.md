---
name: rapid-prototyping
description: Build and iterate on the clickable prototype — the sloppy-first workflow, what fidelity to aim for at each stage, page and route conventions, and how the prototype hands off to design and engineering. Use when the user wants to build a screen, make an idea clickable, add a page or flow to the prototype, or asks "can you mock this up", "build a prototype of X", "make this clickable".
---

# Rapid Prototyping

Build the clickable thing. The prototype exists to make an idea real enough that people can
react to it — and it is the fastest way to discover that a requirement doesn't survive
contact with a screen.

## The core idea: sloppy first

**Build the rough version before anyone designs the polished one.** A clickable skeleton
with placeholder content, built in an hour, unblocks the PM, the designer, and the engineer
simultaneously — the designer has structure to react to instead of a blank canvas, the
engineer sees the real shape of the problem, and the PM finds the missing requirements by
trying to build them.

What "sloppy" means in practice:

- Real structure and real navigation. **Fake data, unpolished visuals.**
- Every screen in the flow exists and is reachable, even if some are near-empty.
- No edge cases, no validation, no error states — until the flow itself is agreed.
- Wrong-but-plausible copy beats `Lorem ipsum`; it surfaces disagreements about meaning.

What it does not mean: broken links, dead-end screens, or a flow you have to narrate for
someone to understand. The test is whether a stakeholder can click through it alone.

**Polish comes when the flow is settled**, and usually only on the screens being reviewed
or tested. Polishing a flow that's still moving is the most common way to waste a week here.

## Workflow

### 1. Know what you're building and why

Check `docs/02-requirements/` for the story or PRD behind it. If there isn't one, that's
fine — prototyping to *discover* requirements is a legitimate use — but say which mode
you're in, because it changes what "done" means.

### 2. Sketch the flow before the screens

List the screens and how the user moves between them. Three bullets is enough. Building
screen by screen without the flow is how you end up with four pages that don't connect.

### 3. Build the skeleton

Every screen in the flow, routed and reachable. Layout and navigation real, content fake.

### 4. Click through it yourself

Run `npm run dev` and walk the flow as the user. This is where you find the missing
screen, the state you can't get back from, and the decision the requirements didn't make.
Do this before showing anyone.

### 5. Report what you learned

The requirements gaps you hit while building are the most valuable output of a prototype —
more valuable than the screens. Write them into `docs/04-decisions/` or raise them, don't
leave them in your head.

## Conventions

These keep the prototype navigable as it grows. Full stack rules are in `AGENTS.md`.

- **A screen is a page**: `src/pages/SomethingPage.tsx`, exporting
  `export default function SomethingPage()`.
- **Every page gets a route** in `src/App.tsx`. An unrouted page is invisible in a review.
- **Complex flows get a folder**: `src/pages/onboarding/OnboardingPage.tsx` as the entry
  point, with step components in `steps/` named `SomethingStep.tsx`.
- **Fake data goes in `src/data/`** once two pages need it; inline in the component until
  then.
- **`npm run build` before you're done.** It is the only gate.

## Fidelity guide

| Stage | Build | Skip |
|---|---|---|
| Exploring an idea | One screen, the core interaction | Navigation, other screens |
| Testing a flow | Every screen, real navigation | Validation, errors, empty states |
| Stakeholder review | The above + plausible content | Edge cases, responsive polish |
| User testing | The above + the states users will hit | Anything off the tested path |
| Engineering handoff | The above + edge cases the stories name | Production concerns entirely |

## Rules

- **The prototype is disposable.** Nobody is going to ship this code. Optimize for how fast
  it can change, not for how well it's factored. Duplication is cheaper than the wrong
  abstraction here.
- **Never wire real credentials or customer data.** Fake it. Prototypes get deployed and
  shared casually.
- **Don't build what nobody asked to see.** Extra screens dilute the review.
- **Keep it honest.** If a screen implies functionality that would be hard or is undecided,
  flag it when you present it — prototypes create expectations, and an unflagged fake
  becomes a commitment.

## Handoffs

- The flow is settled and needs a critique → `design-critique`.
- Building surfaced requirement gaps → `user-story-draft` or `prd-draft`.
- You need stack mechanics (forms, tables, state) → `react-frontend-basics`.
