# Module 4: On-Page Optimization (Semantic Relevance & Topical Depth)

## Philosophy
On-page semantic optimization = making content a **clear conversation** that answers all relevant questions, uses language naturally and effectively, and is formatted so search engine algorithms can easily interpret it.

This goes beyond keyword placement. It's about:
- Contextual completeness (covering the full semantic field)
- Hierarchical structure (headings = semantic outline)
- Snippet readiness (direct answers to questions)
- HTML semantics (telling the crawler what's content vs. navigation)

> Koray's insight: pages that are comprehensive, well-structured, and semantically rich dominate rankings because they satisfy user intents more fully and communicate better with search engines.

---

## Step-by-Step Process

### Step 1 — Craft Title & Meta Description
**Title tag / H1:**
- Include primary keyword near the beginning
- Add an entity or secondary keyword for context
- Keep ≤ 60 characters for SERP display
- Must contextualize the content semantically, not just label it
- ✅ "Eletricista no Jardim Paulista – Serviços Elétricos no Bairro"
- ❌ "Eletricista"

**H1:**
- Must mirror or complement the title tag
- Should confirm the topic immediately — no cryptic or abstract H1

**Meta description:**
- Use synonyms and related terms naturally (not a ranking factor, but influences CTR)
- Pack in related concepts to signal comprehensiveness
- ✅ "Eletricista no Jardim Paulista, São José do Rio Preto. Instalação, manutenção e laudos elétricos. Atendimento rápido, profissional com CREA. Solicite orçamento."

### Step 2 — Build a Logical Heading Structure
Headings = the semantic outline of the page.

**H2s:** major sections / main user questions
**H3s:** sub-points within each section
**H4s:** only if genuinely needed for deeper structure

Rules:
- Never skip heading levels (H2 → H4 breaks the outline)
- H2s should map to your keyword groups / user questions
- Broader questions first, then more specific
- Use **question-form headings** for PAA-style queries:
  - ✅ "Quanto custa um eletricista no Jardim Paulista?"
  - ✅ "O que faz um eletricista residencial?"

After writing: extract all headings and read them in sequence — they should tell the complete story of the topic.

### Step 3 — Write Semantically Rich Content
Don't target a single keyword — **cover the full semantic field** of the topic.

For each section:
- Use the primary term AND related terms, synonyms, entities
- Include technical/domain vocabulary naturally: for electrical services → "disjuntor", "quadro de distribuição", "aterramento", "NR10", "laudo elétrico", "CREA"
- Vary phrasing: "instalação elétrica" / "serviço elétrico" / "mão de obra elétrica"
- Apply **semantic proximity**: use terms that co-occur with your topic in authoritative texts

What NOT to do:
- Don't repeat the exact same phrase mechanically (keyword stuffing)
- Don't use awkward synonyms just to vary — readability first
- Don't wander off-topic within a section

### Step 4 — Optimize for Featured Snippets
For every question-style heading:
1. Provide a **direct, concise answer in the first 1-2 sentences** (40-60 words)
2. Answer must be self-contained (make sense without surrounding context)
3. Restate the subject in the answer: "Electric car batteries last..." not "They last..."

**Snippet-friendly content formats:**
- Numbered lists → for procedural/how-to content (Google pulls step lists for "how to" queries)
- Bulleted lists → for features, benefits, comparisons
- Tables → for specs, comparisons, pricing
- Q&A paragraphs → for direct questions
- Definition paragraphs → for "what is X" queries

**PAA integration:**
- Add PAA questions as mini-sections or FAQ entries
- Check PAA for your main keyword → ensure each is answered somewhere on the page

**FAQ section:**
- Add at end of page for long-tail coverage
- Use `<h3>` for question, `<p>` for answer
- Mark up with FAQPage schema (see Module 5)

### Step 5 — Use Semantic HTML Elements
Proper HTML5 elements tell crawlers what's content vs. navigation:

| Element | Use for |
|---------|---------|
| `<main>` | Primary page content |
| `<article>` | Self-contained content piece |
| `<section>` | Distinct content groupings within the page |
| `<aside>` | Supplementary, non-core content (callouts, definitions, sidebars) |
| `<nav>` | Navigation elements (menus, breadcrumbs) |
| `<footer>` | Footer content |
| `<header>` | Page/section header |

**H tag nesting:** must be sequential. H1 → H2 → H3. Never jump levels.

Clean semantic HTML → crawler understands what's main content → better passage indexing.

### Step 6 — Optimize Images and Media Semantically
- **Alt text:** describe image AND reinforce content topic
  - ✅ `alt="Eletricista instalando quadro de distribuição em residência no Jardim Paulista"`
  - ❌ `alt="foto1"` or `alt="eletricista"`
- **File names:** descriptive slugs, not image001.jpg
  - ✅ `eletricista-jardim-paulista-quadro-eletrico.jpg`
- **Captions:** reference images in surrounding text ("como mostrado na imagem acima, o quadro de distribuição...")
- **Videos:** include transcript or summary text on page (indexed, adds semantic richness)
- Media should reinforce the topic — no decorative images without alt text

### Step 7 — Internal and External Links in Context
**Internal links:**
- Link key terms to their cluster pages (where topic is covered in depth)
- Descriptive anchor text: "laudo elétrico residencial" not "clique aqui"
- Every important subtopic mentioned on a page should link to its dedicated page

**External links:**
- Reference facts/statistics with authoritative sources (ABNT, CREA, government sites)
- Link entity mentions to their authoritative source (first mention, where relevant)
- Outbound links to quality sites = positive signal (not a weakness)

**Quantity:** a few well-placed links are better than many forced ones. Every link should have a purpose.

### Step 8 — Proofread for Semantic Clarity
- Can a reader with no background follow each section?
- Is every entity introduced clearly on first mention?
- Is every section's content aligned with its heading?
- Remove tangents that don't support the heading topic
- Short paragraphs (2-4 sentences) = clearer semantic signal per paragraph
- Avoid starting sections with pronouns without clear antecedent ("It is…", "They said…")

### Step 9 — UX Elements (Indirect Semantic Signals)
- **Table of contents** for long pages: improves navigation, can generate jump links in SERPs
- **Short paragraphs and clear breaks**: reduces pogo-sticking (user bouncing back = negative engagement signal)
- **Mobile-friendly layout**: confirmed in Content check (Performance → Mobile)
- **Page speed**: fast pages get crawled more, reduce bounce

---

## Checklist

- [ ] Primary keyword in title, H1, first paragraph, at least 2 H2s
- [ ] Secondary keywords in at least one section each
- [ ] Heading structure is logical, no skipped levels
- [ ] Heading outline "tells the full story" when read in sequence
- [ ] Direct answers provided under every question heading (≤60 words)
- [ ] Featured snippet candidates identified and formatted
- [ ] PAA questions all answered somewhere on the page
- [ ] FAQ section added if page has multiple Q&A entries
- [ ] Semantic HTML elements used (main, article, section, aside, nav)
- [ ] All images have descriptive alt text with entities/keywords
- [ ] Image file names are descriptive
- [ ] Internal links use descriptive anchor text
- [ ] External links reference key facts/entities
- [ ] No section content wanders off the heading's topic
- [ ] No awkward keyword repetition
- [ ] Table of contents on pages >1500 words
- [ ] Mobile-friendly verified
- [ ] FAQPage schema added for FAQ sections (see Module 5)

---

## Key Principles

**Semantic field > keyword density:**
What matters is covering the full vocabulary of the topic — all the terms, synonyms, entities, and concepts that experts and users would expect to see.

**Structure = signal:**
Headings are not just for readers. They are semantic labels that tell crawlers the topic and sub-topic of every section.

**Direct answers = snippet opportunity:**
Every question heading is a featured snippet opportunity. Answer directly in the first sentence.

---

## Local SEO On-Page Specifics

For neighborhood/bairro pages:

**H1:** "Eletricista no [Bairro] – [Cidade]"
**Opening paragraph must contain:**
- Full service name + neighborhood + city
- One key geographic entity (zona, CEP, nearby landmark)
- Primary service + call to action signal

**Section suggestions:**
- H2: "Serviços Elétricos no [Bairro]"
- H2: "Por que contratar um eletricista profissional em [Bairro]?"
- H2: "Quanto custa um eletricista no [Bairro]?"
- H2: "Como funciona o atendimento?"
- H2: "Bairros atendidos próximos ao [Bairro]" (lateral links)
- H2: FAQ section with 3-5 local questions

**Geographic entities to always mention:**
- Zona (Norte, Sul, Leste, Oeste, Central)
- CEP range of the bairro
- One or two neighboring bairros (for lateral linking)
- One local landmark or reference point if natural

**Unique content per bairro:**
Each page must have at least one paragraph that could NOT be copy-pasted to another bairro page. Geographic characteristics, zone context, local density (residencial/comercial/misto), or specific service notes for that area.
