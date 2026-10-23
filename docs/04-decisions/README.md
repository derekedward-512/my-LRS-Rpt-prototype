---
title: Decisions
---

# 04 — Decisions

What we decided and why. Write these by hand, when the decision is made.

**Naming:** `YYYY-MM-DD-<slug>.md` — chronology is the point here.

## When to write one

Any choice that was genuinely contested, closed off an option, or would be expensive to
reverse. Scope cuts, sequencing calls, "we're not supporting X," picking one flow over
another after a review. Not routine choices with an obvious answer.

## Template

```markdown
# <Decision>

**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by <link>
**Decided by:** <names or roles>

## Context
What forced a decision. The constraints in play.

## Decision
What we're doing, stated plainly.

## Alternatives considered
What else was on the table and why it lost. This is the section future readers
actually need — it stops the same option being re-proposed every quarter.

## Consequences
What this makes easier, what it makes harder, and what we'll need to revisit.
```

## Supersede, don't delete

When a decision is reversed, mark the old record `Superseded by <link>` and write a new
one. The reversal and its reasoning are more instructive than either decision alone.
