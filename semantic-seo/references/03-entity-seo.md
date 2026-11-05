# Module 3: Entity-Based SEO (Entities, NLP & Semantic Search)

## Philosophy
Google is an **entity-oriented search engine**. It evaluates pages based on the entities mentioned, how they're described, and how they connect to other entities — not just keyword frequency.

An **entity** = a noun of interest: person, place, organization, concept, product, event.

Content that lacks key entities about a topic will be outranked by content that includes them — even if the keyword usage is identical.

> Koray's insight: knowing a topic's entities and their relationships is *crucial* for higher rankings. A page missing important entity attributes signals shallow coverage.

---

## Step-by-Step Process

### Step 1 — Identify Key Entities for Your Topic
Sources to find entities:
- **Google Knowledge Panel** → entities Google associates with your main topic
- **Google's NLP API** → run competitor content, see what entities Google detects
- **InLinks** → entity extraction tool built for SEO
- **Wikipedia** → section headings often map to key entities

For each topic, classify entities by type:
| Type | Example |
|------|---------|
| Person | Elon Musk |
| Organization | Tesla, EPA |
| Location | Palo Alto, USA |
| Concept | Lithium-ion battery, renewable energy |
| Product | Tesla Model 3, CHAdeMO standard |
| Event | Tesla Battery Day |

### Step 2 — Research Entities and Their Relationships
For each key entity, gather:
- **What type of entity it is**
- **Key attributes** (dates, specs, relationships, roles)
- **Related entities** and how they connect

Example entity profile:
```
Tesla (Organization)
- Founded: 2003
- CEO: Elon Musk (Person)
- Products: Model 3, Model S, Powerwall (Products)
- HQ: Austin, Texas (Location)
- Related concepts: electric vehicles, sustainable energy, autonomous driving
```

This becomes raw material for writing authoritative, entity-rich content.

### Step 3 — Incorporate Entities Contextually in Content

**Introduce entities clearly (first mention):**
- ✅ "Elon Musk, CEO of Tesla, revolutionized the electric vehicle market..."
- ❌ "He revolutionized the market..."

**Provide supporting attributes:**
- ✅ "The Tesla Model 3 (Tesla's best-selling electric sedan, launched in 2017)..."
- ❌ "The Model 3..."

**Link entities to authoritative sources:**
- On first mention, link entity to Wikipedia or official site
- This connects your content to the knowledge graph
- Pages that lack external references for key entities risk being outranked

**Use entity-relevant phrases:**
- Include synonyms, acronyms, full names: "Electric Vehicle (EV)", "United States (USA)"
- Include technical attributes: "kilowatt-hour (kWh)", "range rating", "charging cycles"

### Step 4 — Use Synonyms and Variant Names
Why it matters: covers more query variations, helps search algorithms reconcile different terms for the same entity.

How to do it naturally:
- Alternate between formal and common names: "electric vehicles" / "EVs"
- Use both acronym and full form: "General Motors (GM)"
- Vary phrasing: "extend battery life" / "increase battery longevity"

Rules:
- Never force awkward synonyms — readability first
- Use parenthetical introductions: "EV batteries (i.e., electric car batteries) degrade over time"
- Plural/singular variations where contextually natural

### Step 5 — Disambiguate Ambiguous Entities
If an entity could mean two things, clarify immediately:
- "Jaguar (the luxury car brand)" vs "jaguar (the big cat)"
- "Apple (the tech company)" vs "apple (the fruit)"
- Use context words, units, full names: "US dollars" not just "money"; "Jaguar Cars" not just "Jaguar"

For less-known entities, add a short definition inline:
- "The CHAdeMO standard (a fast-charging protocol for electric vehicles)..."
- "ANEEL (Agência Nacional de Energia Elétrica, Brazil's electricity regulator)..."

### Step 6 — Leverage Structured Data for Entities
Schema.org markup explicitly declares entities to search engines:

| Content type | Schema type | Key properties to fill |
|---|---|---|
| Article | Article / BlogPosting | headline, author (Person), datePublished, about |
| Business page | LocalBusiness / Organization | name, address, telephone, sameAs |
| Person/Author | Person | name, jobTitle, affiliation, sameAs |
| Product | Product | name, brand, description, offers |
| FAQ sections | FAQPage | mainEntity (Question + acceptedAnswer) |

**sameAs property:** links entity to Wikidata/Wikipedia, removes all ambiguity.

```json
{
  "@type": "Organization",
  "name": "Tesla",
  "sameAs": "https://www.wikidata.org/wiki/Q478214"
}
```

### Step 7 — Review Content with an Entity Lens
After drafting, do an entity audit:

- **Entity coverage:** are all major entities mentioned? Compare to your research list.
- **Entity consistency:** same entity referred to the same way throughout. Don't switch from "Tesla" to "the company" without clear antecedent.
- **Fact-checking:** verify dates, numbers, relationships. Incorrect entity facts hurt credibility.
- **NLP testing (optional):** paste content into Google's Natural Language API demo — see what entities it detects, check salience scores, verify nothing is misclassified.

### Step 8 — Connect Entities via Links
**Internal linking for entities:**
- If you have a cluster page *about* an entity, link to it every time that entity is mentioned on other pages
- Example: if "Tesla Motors History" is a cluster page, link "Tesla" to it across the site

**External linking for entities:**
- First mention of important entity → link to Wikipedia or official source
- Don't link every occurrence — just the first or most relevant mention per page

---

## Checklist

- [ ] All major entities (people, brands, concepts, locations) identified for the topic
- [ ] Entity profiles created (type + attributes + related entities)
- [ ] Each key entity introduced clearly on first mention
- [ ] Supporting attributes provided for central entities
- [ ] Synonyms and variant names used naturally
- [ ] Ambiguous entities disambiguated with context
- [ ] External links to authoritative entity sources added
- [ ] Schema markup implemented for page type + entities
- [ ] sameAs links added for key organizations/people
- [ ] Content reviewed with NLP tool (optional but recommended)
- [ ] No orphaned entity mentions (no entity introduced without context)

---

## Key Principles

**Entities are the anchor of meaning:**
Keywords tell Google what you're saying. Entities tell Google *what you're talking about*. Both matter, but entities are deeper.

**Attributes signal depth:**
A page that mentions Tesla but never mentions "EV", "battery capacity", "autopilot", or "Elon Musk" signals shallow coverage. Include entity attributes to show comprehensive understanding.

**External links are not weakness:**
Linking out to authoritative sources for entities is a *positive* signal. It places your content within the knowledge graph rather than in isolation.

---

## Local SEO Application

For local service sites, entities = the business ecosystem:

| Entity | Type | Attributes to mention |
|--------|------|-----------------------|
| [Service type] (e.g. eletricista) | Concept/Service | what the service covers, legal requirements, CREA registration |
| [City/neighborhood] | Location | zona, CEP range, nearby landmarks, características |
| [Regulatory body] | Organization | CREA, NR10, ABNT norms |
| [Service variations] | Concept | instalação, manutenção, inspeção, laudos |

**Entity disambiguation for local SEO:**
- "São José do Rio Preto (cidade do interior de São Paulo)" — not just "Rio Preto"
- "Bairro Boa Vista (zona norte de São José do Rio Preto)" — with zone context
- This signals to Google exactly which entity/location your page targets

**sameAs for local businesses:**
```json
{
  "@type": "LocalBusiness",
  "name": "Eletricista São José do Rio Preto",
  "sameAs": [
    "https://www.google.com/maps/place/YOUR_PLACE_ID",
    "https://www.facebook.com/BUSINESS_PAGE"
  ]
}
```
