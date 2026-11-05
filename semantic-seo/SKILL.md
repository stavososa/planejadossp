---
name: semantic-seo
description: >
  Apply Koray Tuğberk Gübür's Semantic SEO methodology to build topical authority,
  structure content clusters, optimize for entities, and execute on-page and technical
  SEO. Use this skill whenever the user asks about: topical authority, semantic SEO,
  content clusters, pillar pages, entity-based SEO, keyword research strategy,
  internal linking architecture, structured data, featured snippets, local SEO page
  structures, or building niche websites with many pages (e.g. neighborhood pages,
  service pages). Also trigger for questions like "how should I structure my site?",
  "how do I rank for all variations of X?", "what pages do I need to create?",
  "how do I build topical authority?", or "how do I do SEO for [niche] site?".
  This skill covers the complete SOP: Keyword Research → Content Clustering →
  Entity-Based SEO → On-Page Optimization → Technical SEO.
---

# Semantic SEO Systems — Complete SOP
*Based on Koray Tuğberk Gübür's methodology, compiled from CORA SEO Software*

## Core Philosophy

Semantic SEO = optimize for **meaning, entities, and topical breadth**, not isolated keywords.
The goal is **Topical Authority**: rank higher by covering all connected topics and their queries with accurate, expert information.

**The 5-pillar system:**
1. Keyword Research (Entity-Based)
2. Content Clustering (Pillar + Cluster structure)
3. Entity-Based SEO (NLP + semantic signals)
4. On-Page Optimization (semantic relevance + topical depth)
5. Technical SEO (structured data + indexing + performance)

---

## Workflow Overview

When a user brings a SEO project or niche site, follow this sequence:

### Step 1 — Understand the project
Ask (or infer from context):
- What niche/topic is the site about?
- What is the main entity? (business, location, service, concept)
- Is it local SEO, informational, or e-commerce?
- What stage are they at? (planning / content creation / publishing / optimization)

### Step 2 — Choose the right module
Jump to the reference file that matches the user's current need:

| Need | Reference file |
|------|----------------|
| Building keyword list & topical map | `references/01-keyword-research.md` |
| Structuring pages, clusters, pillar | `references/02-content-clustering.md` |
| Optimizing for entities & NLP | `references/03-entity-seo.md` |
| On-page content optimization | `references/04-on-page.md` |
| Technical SEO, schema, indexing | `references/05-technical-seo.md` |

Read the relevant reference file before producing output for that module.

### Step 3 — Produce output
Depending on the user's request, deliver one or more of:
- **Topical Map** — hierarchical list of pillar + cluster pages
- **Keyword Groups** — keywords organized by intent
- **Entity List** — entities to cover on a page
- **Content Brief** — heading structure + entity coverage for a specific page
- **Internal Link Plan** — which pages should link to which
- **Schema Markup** — JSON-LD for page types
- **On-Page Audit** — checklist review of existing content

---

## Key Principles to Always Apply

**Topical completeness over volume**
Cover all micro and macro intents of a topic. Low-volume queries that complete the topic still matter.

**One topic = one page**
Never mix two distinct subtopics. If a page covers two things, split it. If two pages cover the same thing, merge them.

**Pillar ↔ Cluster bidirectional linking**
Pillar links OUT to each cluster. Each cluster links BACK to pillar. Clusters also link laterally to related clusters.

**Entities over keywords**
Think in entities (people, places, brands, concepts) — not just strings. Mention entities with their attributes and relationships.

**Neighbor content effect**
A weak page inside a topical cluster degrades the whole cluster. Quality control the entire group.

**Freshness is ongoing**
Topical authority is not a one-time build. Monitor GSC, find gaps, update content, add new cluster pages as topics evolve.

---

## Local SEO Adaptation (Gus's Use Case)

When building local SEO sites (e.g. electricians in São José do Rio Preto, services in Londrina), the semantic framework maps like this:

| Semantic SEO concept | Local SEO equivalent |
|----------------------|----------------------|
| Main entity | Service + City (e.g. "eletricista São José do Rio Preto") |
| Pillar page | Main service page targeting the city |
| Cluster pages | One page per neighborhood (bairro) |
| Sub-clusters | Service variations per neighborhood (e.g. instalação elétrica + bairro) |
| Entity attributes | CEP, zona, características do bairro, serviços prestados |
| Topical map | Grid: [services] × [neighborhoods] |
| Internal linking | Pillar → bairro pages; bairro pages → pillar + related bairros |

For neighborhood page structures specifically, apply `references/02-content-clustering.md` but map clusters = bairros and pillar = city-level service page.

---

## Output Formats

**Topical Map output format:**
```
[PILLAR] Main topic page
  ├── [CLUSTER] Subtopic A
  │     ├── [SUB-CLUSTER] Subtopic A.1
  │     └── [SUB-CLUSTER] Subtopic A.2
  ├── [CLUSTER] Subtopic B
  └── [CLUSTER] Subtopic C
```

**Content Brief output format:**
```
PAGE TITLE: ...
PRIMARY KEYWORD: ...
SECONDARY KEYWORDS: ...
ENTITIES TO COVER: ...
H1: ...
H2: ...
  H3: ...
  H3: ...
H2: ...
INTERNAL LINKS OUT: ...
INTERNAL LINKS IN (from): ...
SCHEMA TYPE: ...
SNIPPET TARGET: ...
```

**Entity list output format:**
```
ENTITY | TYPE | ATTRIBUTES TO MENTION | RELATED ENTITIES
...    | ...  | ...                   | ...
```

---

## Reference Files

Read these files when executing specific tasks:

- `references/01-keyword-research.md` — full SOP for entity-based keyword research
- `references/02-content-clustering.md` — full SOP for pillar/cluster architecture
- `references/03-entity-seo.md` — full SOP for entity-based optimization and NLP
- `references/04-on-page.md` — full SOP for on-page semantic optimization
- `references/05-technical-seo.md` — full SOP for structured data, indexing, performance
