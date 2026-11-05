# Module 2: Content Clustering (Semantic Content Structure & Internal Linking)

## Philosophy
Content clustering = organizing your site's pages to reflect the **semantic relationships between topics**.

Structure: one **Pillar Page** (broad overview) + multiple **Cluster Pages** (deep dives on each subtopic).

This creates a "Semantic Content Network" where each page reinforces the others. Without this structure, Google may only index isolated passages and ignore the rest — passage indexing without topical recognition.

> **Critical insight:** A weak page inside a cluster drags the whole cluster down. Google evaluates topical groups collectively. Bad neighbor = bad neighborhood.

---

## Step-by-Step Process

### Step 1 — Convert Topical Map into Site Structure
Take the hierarchy from keyword research and assign:
- **Broad topic group** → Pillar Page
- **Subtopic groups** → Cluster Pages
- **Sub-subtopic groups** → Sub-cluster Pages (use sparingly)

Example:
```
[PILLAR] Ultimate Guide to Electric Cars
  ├── [CLUSTER] How Electric Car Batteries Work
  ├── [CLUSTER] Cost of Owning an Electric Car
  ├── [CLUSTER] Charging Infrastructure for EVs
  └── [CLUSTER] Electric vs Hybrid Cars
```

Sketch a tree diagram. Every topic has a home. No topic without a URL, no URL without a clear topic.

### Step 2 — Create the Pillar Page (Cornerstone)
The pillar page is:
- A comprehensive **overview** of the main topic
- "Wikipedia-style" — covers all subtopics with summarized sections
- Answers fundamental questions: What is X? How does X work? Why does X matter?
- Long enough to be a standalone resource, but each section naturally leads to the cluster page

Structure of the pillar:
- One section per major subtopic (each section = a few paragraphs)
- **Internal link from each section → its cluster page**
- Accessible from main navigation or category menu

### Step 3 — Create Cluster Pages (Supporting Content)
Each cluster page:
- **Dives deep** into one specific subtopic
- Fully answers the intent group it targets
- Uses all relevant keywords and entities from that group
- **Links back to the pillar page** (at least once, where contextually natural)
- **Links laterally** to related cluster pages (where relevant)

Scope control: if a cluster page starts covering another cluster's topic, split the content. Prevents internal competition.

### Step 4 — Build the Internal Link Web
**Bidirectional rule:**
- Pillar → every cluster (via descriptive anchor text)
- Every cluster → pillar (once, in intro or conclusion)
- Clusters → related clusters (where logical)

**Anchor text:** use descriptive, topic-specific anchors, not "click here" or "learn more".
- ✅ "electric car maintenance costs"
- ❌ "click here"

**No orphaned pages:** every cluster page must have at least one internal link pointing to it. Check with Screaming Frog or GSC.

### Step 5 — Maintain Clear Topical Hierarchy
- Each URL has exactly one primary topic
- Heading structure mirrors the semantic hierarchy (H2 = major sections, H3 = sub-points)
- Do NOT mix distinct topics on one page → dilutes dominant search intent
- If content covers two unrelated things, split into two pages

Sub-clusters (3rd level) should only exist if:
- The topic genuinely demands it
- The cluster page would otherwise be too long
- There's real search demand for that micro-topic

### Step 6 — Use URL Structure and Categories Strategically
- URL hierarchy can signal topical grouping:
  `/electric-cars/charging-infrastructure` places the page within the "electric cars" topic
- Implement **breadcrumbs** (with BreadcrumbList schema):
  `Home > Electric Cars > Charging Infrastructure`
- Assign cluster pages to CMS categories that mirror the topical cluster

### Step 7 — Quality Control
Every cluster page must:
- [ ] Fully address its target intent (not thin)
- [ ] Contain unique information (no overlap with sibling pages)
- [ ] Be accurate and demonstrate E-E-A-T
- [ ] Not cannibalize another page's keywords

If a page is thin or overlapping: improve it, merge it, or noindex it.

### Step 8 — Monitor and Expand Over Time
- Use GSC to track what queries each cluster page gets
- Find gaps → create new cluster pages
- Update pillar to link to new clusters
- Remove or merge underperformers

Topical authority is a **living system**, not a one-time publication.

---

## Checklist

- [ ] Pillar page covers all subtopics at summary level
- [ ] Every cluster page has one clear primary topic
- [ ] Pillar links to every cluster
- [ ] Every cluster links back to pillar
- [ ] Lateral links between related clusters are in place
- [ ] No orphaned cluster pages
- [ ] No keyword cannibalization between pages
- [ ] No thin or duplicate pages within the cluster
- [ ] URL structure reflects topical hierarchy
- [ ] Breadcrumbs implemented
- [ ] Category/tag structure mirrors clusters
- [ ] GSC monitoring set up for cluster performance

---

## Key Principles

**Hub-and-spoke model:**
Pillar = hub. Clusters = spokes. No spoke can exist without a hub. No hub is complete without all its spokes.

**One topic = one page:**
Never split one topic across two pages. Never merge two distinct topics into one page.

**Neighbor content effect:**
Google evaluates pages in a topical cluster collectively. A bad page brings the whole cluster down. A great cluster lifts all pages within it.

---

## Local SEO Application

For neighborhood-based local SEO sites:

```
[PILLAR] Eletricista em [Cidade]
  ├── [CLUSTER] Eletricista no [Bairro A]
  ├── [CLUSTER] Eletricista no [Bairro B]
  ├── [CLUSTER] Instalação Elétrica em [Cidade]
  │     ├── [SUB-CLUSTER] Instalação Elétrica no [Bairro A]
  │     └── [SUB-CLUSTER] Instalação Elétrica no [Bairro B]
  └── [CLUSTER] Manutenção Elétrica em [Cidade]
```

**Internal link pattern for bairro pages:**
- Each bairro page → pillar (city service page)
- Each bairro page → neighboring bairros (by zone)
- Pillar → all bairro pages (can be in a grid/index section)
- Zone pages (if used) → bairros within that zone

**Quality control for neighborhood pages:**
- Each page must have unique content (neighborhood characteristics, CEP, zona, services in that area)
- Avoid thin pages that are identical except for the neighborhood name
- Distinguish pages with local signals: mention real landmarks, neighborhoods nearby, zone (Norte/Sul/etc.)
