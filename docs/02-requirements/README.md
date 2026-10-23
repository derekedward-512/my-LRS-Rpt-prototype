---
title: Requirements
---

# 02 — Requirements

What we're building. This is the commitment layer: if it's here and approved, someone can
plan against it.

**Put here:** PRDs, epic breakdowns, user stories with acceptance criteria, scope decisions.

**Skills:** `prd-draft` → `epic-draft` → `user-story-draft`

**Naming:** `prd-<slug>.md`, `epics-<slug>.md`, `stories-<epic-slug>.md`

## Traceability

Each layer should point at the one above it: stories name their epic, epics name the PRD
goals and use cases they serve, the PRD points at the discovery evidence behind it. It
costs a line per document and it is what lets you answer "why are we building this?"
without archaeology.

## Out of scope is a required section

The most valuable line in a requirements doc is usually the one saying what isn't included.
Write it even when it feels obvious — especially then.
