---
name: prd-draft
description: Draft a succinct, human-consumable Product Requirements Document (≤3,000 words) from user input plus reference material (MRD, research, competitive analysis, strategy decks, prior PRDs). Use when the user asks to draft, scaffold, write, or update a PRD; introduces a new initiative or feature that needs requirements captured; says "draft a PRD", "write requirements", "turn this into a PRD"; or has discovery material they want converted into requirements.
---

# PRD Draft

Draft a **succinct, skimmable, human-consumable PRD** — not an engineering design doc, not a
spec dump. Someone should be able to read it in one sitting and know what is being built,
for whom, and how you will know it worked.

Save the result to `docs/02-requirements/prd-<slug>.md`.

## When to use

- The user wants requirements captured for a new initiative or feature.
- The user has discovery material (research, an MRD, competitive analysis, strategy notes)
  and wants it turned into requirements.

Do **not** use for:

- Breaking an approved PRD into epics → use `epic-draft`.
- Writing user stories → use `user-story-draft`.
- Exploring ideas before requirements are clear → use `brainstorm-features`.
- Market sizing, competitive landscape, positioning → use `mrd-draft`.

## Inputs

User-provided text is the highest-priority signal, followed by referenced documents (MRD,
research, competitive analysis, strategy decks, prior PRDs). Check `docs/01-discovery/` for
material that already exists in the repo before asking.

If nothing has been provided, ask:

> "Do you have any reference material — an MRD, research, competitive analysis, strategy
> notes, a past PRD — I should read first?"

**User input and referenced documents are ground truth.** Extrapolate only when the
inference is obvious, and label it **Inferred**.

## Workflow

### 1. Gather

Ask 5–8 essential questions first, not everything at once. Skip any the user has already
answered:

- Product or feature name
- One-sentence description
- Primary users / personas
- The main problem it solves
- Top 3 goals or success metrics
- Timeline expectations (MVP, full release)

If the user asks for **quick mode**, ask only what you cannot infer. If they ask for
**full mode**, go section by section.

### 2. Draft

Generate the full PRD using the template below. On follow-up prompts, update **only the
changed sections** unless a full regeneration is requested. When uncertain, propose options
rather than inventing an answer.

### 3. Constraints

- **≤3,000 words** (~8–10 pages). The user can ask for an extended PRD to relax this.
- Bullets and tables over prose.
- No deep technical detail — technical content stays high-level.

## PRD template

Use this structure exactly.

### 1. Initiative Definition

- **1a. Overview** — 3–5 sentences: what, who, what value.
- **1b. Problem Statement** — the user and business problems, their impact, and why
  today's tools fall short.
- **1c. Goals** — business and user goals.
- **1d. Success Metrics** — 3–5 metrics tied to the goals above.
- **1e. Out of Scope** — explicit exclusions and deferrals. Do not skip this one; it is
  the section that prevents the most rework.

### 2. Users & Usage Context

- **2a. Personas** — table: name/role, description, goals, needs, pain points, environment
  or constraints.
- **2b. User Journeys** — high-level flows: entry point, actors, major steps, system
  responses, decision points, exceptions.
- **2c. High-Level Use Cases** — table required: Use Case | Description | Priority (P0/P1/P2).

### 3. Requirements

- **3a. Functional Requirements** — "the system shall…", grouped by feature area, mapped to
  use cases, each marked P0/P1/P2.
- **3b. Non-Functional Requirements** — only the ones that actually apply: performance,
  availability, security/privacy, compliance, scalability, accessibility, usability.
- **3c. Technical Dependencies** — high-level only. Key data entities and relationships (no
  schemas), integrations and their purpose/triggers/error expectations (no API contracts),
  and platform constraints that affect user experience.
- **3d. Epics** — 4–8 outcome-oriented bodies of work, non-exhaustive. Table: Epic |
  Description | Goals Supported | Related Use Cases. Epics are user- or value-centered, not
  technical tasks.
- **3e. High-Level Acceptance Criteria** — 5–10 bullets describing what success looks like
  from a user and business perspective. Product-level, not QA test cases.
- **3f. Prototype Links** — ask the user for links to any prototype screens that exist.

### 4. Delivery Plan

- **4a. Release Plan** — MVP scope, phasing, milestones, rollout (pilot → beta → GA).

### 5. Supporting Information

- **5a. Assumptions**
- **5b. Dependencies** — teams, vendors, systems, data sources.
- **5c. Risks & Mitigations** — table: Risk | Probability | Impact | Mitigation.
- **5d. Analytics & Telemetry** — events, KPIs, dashboards, owners.
- **5e. Open Questions** — unresolved decisions and who owns each.

## Style

- Succinct and skimmable. Bullets and tables.
- Label uncertainty explicitly: **Inferred**, **Assumption**, **[TBD]**,
  **⚠️ Requires human review**.
- Second person and active voice. Clear, direct language.

## Low-hallucination protocol

Never fabricate specifics — especially numbers, customer names, or competitor behavior.
Extrapolate only when the inference is obvious, and label it. Flag ambiguity with
**⚠️ Requires human review** rather than resolving it silently. Ask when you need to.

## Handoffs

- PRD approved and ready to break down → `epic-draft`. Do not generate epics beyond the
  non-exhaustive table in 3d.
- Requirements are not clear enough yet → `brainstorm-features`.
- Market context is missing → `mrd-draft`.
- Ready to make it clickable → `rapid-prototyping`.
