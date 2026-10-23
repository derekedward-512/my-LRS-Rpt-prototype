---
name: mrd-draft
description: Draft a Market Requirements Document — market sizing, jobs to be done, competitive landscape, positioning, and success metrics — with strict citation discipline. Use when the user asks for an MRD, market analysis, market sizing, TAM/SAM/SOM, competitive landscape, or positioning; is evaluating whether a market opportunity is real before committing to requirements; or says "draft an MRD", "size this market", "who else does this".
---

# MRD Draft

An MRD answers **"is this market worth entering, and what does it demand of us?"** It comes
before the PRD: the MRD argues the opportunity is real, the PRD defines what you'll build
for it.

Save the result to `docs/01-discovery/mrd-<slug>.md`.

## When to use

- The user is evaluating a market opportunity and needs it documented.
- Someone asked "how big is this?" or "who else is doing this?"
- A PRD is being written without market context to justify it.

Do **not** use for defining what to build → use `prd-draft`.

## Required inputs

Do not start until you have these. Ask for whatever is missing:

- Product or initiative name
- The problem context — what you believe is broken in the market today
- Target segment(s) — industry, company size, role
- Any research, analyst reports, win/loss data, or customer interviews to draw on

## Citation discipline

This is the rule that makes an MRD trustworthy, and the easiest one to break.

- **Every quantitative claim needs a source** — a direct link, a named report, or a named
  internal data source. No exceptions.
- A number you cannot source is written as
  **`[ASSUMPTION — requires validation]`** with your reasoning shown.
- Never invent market sizes, growth rates, competitor revenue, or customer counts. A
  labeled gap is useful; a fabricated number poisons every downstream decision.
- Distinguish *what a source says* from *what you conclude from it*.

## Template

### 1. Revision History

Table: Date | Version | Author | Changes. Required — an MRD gets revisited as the market
moves, and readers need to know which version they're arguing with.

### 2. Executive Summary

The opportunity, the recommendation, and the three facts that most support it. Written for
someone who will read only this section.

### 3. Problem Statement

What is broken in the market today, for whom, and what it costs them. Evidence-backed.

### 4. Market Sizing

- **TAM / SAM / SOM** — each with the calculation shown, not just the result.
- Keep the three **MECE**: mutually exclusive, collectively exhaustive. SOM is a subset of
  SAM is a subset of TAM. State the basis (top-down, bottom-up, or both).
- Growth rate and its source.

### 5. Jobs To Be Done

The functional, emotional, and social jobs the target user is hiring a solution for. Framed
as "when [situation], I want to [motivation], so I can [outcome]."

### 6. Competitive Landscape

- **Direct competitors** — table: Competitor | Segment | Strengths | Weaknesses | Pricing
  approach.
- **Indirect / substitutes** — including spreadsheets, manual process, and "do nothing,"
  which are usually the real incumbents.
- **Where we would win and where we would lose.** Be honest about the second one.

### 7. Positioning

For [target segment] who [need], our [product] is a [category] that [key benefit]. Unlike
[primary alternative], we [differentiator].

### 8. Requirements Overview (MoSCoW)

Market-level capability requirements — Must / Should / Could / Won't. Capabilities the
market demands, not features you've designed. Feature-level detail belongs in the PRD.

### 9. Success Metrics

What would prove the market thesis right, with target and timeframe.

### 10. Go-to-Market Considerations

Buyer vs. user, sales motion, pricing implications, partnership or channel needs.

### 11. Risks

Table: Risk | Likelihood | Impact | Mitigation. Include market risks (timing, adoption,
regulation), not just execution risks.

### 12. Dependencies

External conditions the thesis rests on.

### 13. Open Questions

What you could not resolve, who could resolve it, and what it would change.

### 14. Sources

Every citation used above, listed with links.

## Handoff

Once the market thesis holds up → `prd-draft` to define what to build for it.
