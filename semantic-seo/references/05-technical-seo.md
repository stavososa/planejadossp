# Module 5: Technical SEO (Structured Data, Indexing & Performance)

## Philosophy
Technical SEO is the **infrastructure** that allows great semantic content to be discovered, understood, and rewarded by search engines.

Content without technical SEO = a library no one can find or enter.
Technical SEO without great content = a beautiful empty library.

Three pillars:
1. **Structured Data** — helps engines parse meaning and earn rich results
2. **Crawling & Indexing** — ensures all your content cluster is actually indexed
3. **Performance** — fast, crawlable, clean site = more Googlebot love

> Koray's observation: after building topical authority, Google increased crawl rate to 1400+ pages crawled. Be technically ready for that scale.

---

## Pillar 1: Structured Data (Schema.org)

### Schema types and when to use them

| Page type | Schema type | Key properties |
|-----------|-------------|----------------|
| Article/Blog post | `Article` / `BlogPosting` | headline, author, datePublished, image, publisher |
| Service page | `Service` / `LocalBusiness` | name, description, areaServed, provider |
| Local business | `LocalBusiness` | name, address, telephone, openingHours, geo, sameAs |
| FAQ section | `FAQPage` | mainEntity: Question + acceptedAnswer |
| How-to content | `HowTo` | step (HowToStep with text + name) |
| Product | `Product` | name, brand, offers (Offer with price, availability) |
| Person/Author | `Person` | name, jobTitle, affiliation, sameAs |
| Breadcrumb | `BreadcrumbList` | itemListElement (ListItem with position, name, item) |

### Entity disambiguation via schema
Use `sameAs` to link entities to Wikidata/Wikipedia/Google Maps:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Eletricista São José do Rio Preto",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São José do Rio Preto",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.google.com/maps/place/...",
    "https://www.facebook.com/..."
  ]
}
```

### FAQPage schema (highest ROI for semantic sites)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa um eletricista no Jardim Paulista?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O custo de um eletricista no Jardim Paulista varia entre R$150 e R$350 por visita, dependendo do tipo de serviço..."
      }
    }
  ]
}
```

### Article schema with author entity
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Eletricista no Jardim Paulista – Guia Completo",
  "author": {
    "@type": "Person",
    "name": "Nome do Autor",
    "url": "https://seusite.com.br/sobre"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nome do Site",
    "logo": {
      "@type": "ImageObject",
      "url": "https://seusite.com.br/logo.png"
    }
  },
  "datePublished": "2025-01-01",
  "dateModified": "2025-06-01"
}
```

### Validation
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org
- Fix all errors; review warnings
- Check GSC > Enhancements for active issues

---

## Pillar 2: Crawling & Indexing

### XML Sitemap
- List all important URLs in your cluster
- Separate sitemaps per section for large sites (1 sitemap per topic cluster)
- Submit to Google Search Console and Bing Webmaster Tools
- Include: pillar pages, all cluster pages, all sub-cluster pages
- Exclude: thin pages, tag pages, paginated archives, admin URLs

### robots.txt
Allow: all important content pages
Disallow: admin, internal search results, duplicate content paths, staging pages

```
User-agent: *
Disallow: /wp-admin/
Disallow: /?s=
Disallow: /tag/
Allow: /
```

### Canonical Tags
- Every page must have a self-referencing canonical
- If same content reachable via multiple URLs: canonical → primary URL
- Common issues to fix:
  - HTTP vs HTTPS duplicates
  - www vs non-www duplicates
  - Trailing slash vs no trailing slash
  - URL parameter duplicates (?page=1, ?utm_source=…)

### Crawl Budget Management
Reserve crawl budget for important pages:
- **Noindex** thin pages: tag pages, author archives, paginated archives
- **Consolidate** thin content: merge or improve rather than proliferate
- **Robots.txt block** admin/script paths
- Monitor "Discovered – currently not indexed" in GSC: means crawl budget issue

### Indexing Strategies
**For new content clusters:**
- Publish 3-5 pages/day consistently rather than 50 pages at once
- Consistent publishing schedule trains Googlebot visit frequency
- Use GSC URL Inspection > Request Indexing for critical pages

**Monitoring in GSC:**
| Status | Meaning | Action |
|--------|---------|--------|
| Indexed | ✅ | Monitor performance |
| Crawled – not indexed | Thin/duplicate content suspected | Improve content quality |
| Discovered – not indexed | Crawl budget issue | Add internal links, check sitemap |
| Duplicate without user canonical | Multiple URLs for same content | Add canonical tag |
| Excluded by noindex | Intentional or accidental | Verify it should be excluded |

**Crawl acceleration tips:**
- Fast server response (TTFB < 200ms) → Googlebot can fetch more pages/day
- Strong internal linking → passes crawl signals to deep pages
- Sitemap stays updated → new pages discovered faster

---

## Pillar 3: Site Architecture & Performance

### URL Structure
- Short and descriptive: `/servicos-eletricos/jardim-paulista/`
- Match URL hierarchy to topical hierarchy where meaningful
- Include primary keyword in slug
- No parameters in canonical URLs
- Consistent casing (lowercase preferred)

### Breadcrumbs
Implement on every page except homepage:
```
Home > Serviços Elétricos > Jardim Paulista
```
Mark up with BreadcrumbList schema. Benefits:
- Appears in SERP instead of full URL
- Signals topical hierarchy to Google
- Improves user navigation within cluster

### Internal Link Architecture
From a technical perspective:
- No page more than 3 clicks from homepage
- Category/pillar pages in main navigation
- Cluster pages accessible from pillar
- Use Screaming Frog or similar to map internal link graph
- Fix orphaned pages (no inlinks) immediately

### Site Performance
**Core Web Vitals targets:**
| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP | < 2.5s | Largest visible element load time |
| INP | < 200ms | Interaction responsiveness |
| CLS | < 0.1 | Visual layout stability |

**Key improvements:**
- Image compression + WebP format
- Lazy loading for below-fold images
- Minimize render-blocking JS/CSS
- Enable browser caching
- Use CDN for static assets
- Server-side: fast hosting, TTFB < 200ms

**Mobile-first:**
- All content must be accessible on mobile
- No intrusive interstitials on mobile
- Test with Google's Mobile-Friendly Test

### Duplicate Content Prevention
- Use `rel="canonical"` consistently
- 301 redirect HTTP → HTTPS, non-www → www (or vice versa, pick one)
- Avoid near-duplicate pages (especially relevant for neighborhood pages — each must have unique content)

### Pagination
- Use `rel="prev"` / `rel="next"` where applicable (limited Google support, but still good practice)
- Consider consolidating paginated content into a single page if possible

---

## Checklist

**Structured Data:**
- [ ] Correct schema type for each page type
- [ ] All key properties populated
- [ ] sameAs links for key entities
- [ ] FAQPage schema on pages with FAQ sections
- [ ] HowTo schema on step-by-step content
- [ ] BreadcrumbList schema implemented
- [ ] Validated with Rich Results Test — zero errors
- [ ] GSC Enhancements tab shows no issues

**Crawling & Indexing:**
- [ ] XML sitemap created and submitted to GSC + Bing
- [ ] robots.txt reviewed — no important pages blocked
- [ ] Canonical tags on every page
- [ ] HTTP/HTTPS/www consistency enforced with 301 redirects
- [ ] Thin pages noindexed or improved
- [ ] No orphaned pages (every URL has at least one internal link)
- [ ] GSC Index Coverage monitored weekly
- [ ] Publishing schedule is consistent (not massive dumps)

**Performance:**
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] TTFB < 200ms
- [ ] Images compressed + WebP
- [ ] Mobile-friendly verified
- [ ] Breadcrumbs implemented and schema marked up

---

## Key Principles

**Crawling before indexing:**
A page that isn't crawled can't be indexed. A page that isn't indexed can't rank. Fix crawl issues before any optimization work.

**Schema = structured entity declaration:**
Every piece of schema you add is an explicit statement to the search engine about what your content is about. It removes ambiguity and can earn rich SERP features.

**Crawl budget is finite:**
Especially on smaller sites and new sites. Every URL Googlebot wastes time on (thin pages, admin paths, parameter duplicates) is a URL it didn't spend time on your real content. Ruthlessly protect crawl budget.

---

## Local SEO Technical Specifics

### LocalBusiness schema (full example for local service site)
```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Eletricista São José do Rio Preto",
  "description": "Serviços elétricos residenciais e comerciais em São José do Rio Preto e região.",
  "url": "https://seusite.com.br",
  "telephone": "+55-17-XXXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São José do Rio Preto",
    "addressRegion": "SP",
    "postalCode": "15000-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8155,
    "longitude": -49.3775
  },
  "areaServed": {
    "@type": "City",
    "name": "São José do Rio Preto"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/...",
    "https://www.facebook.com/..."
  ]
}
```

### Sitemap structure for neighborhood site
```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>https://seusite.com.br/sitemap-servicos.xml</loc></sitemap>
  <sitemap><loc>https://seusite.com.br/sitemap-bairros.xml</loc></sitemap>
</sitemapindex>
```

Each bairro page in sitemap-bairros.xml. Keeps GSC reporting clean by topic.

### Duplicate prevention for bairro pages
The biggest risk for neighborhood sites: near-identical pages.
Requirements for each bairro page to be indexable:
- At least one unique paragraph (zone context, neighborhood characteristics)
- Unique title tag and H1 (must contain bairro name)
- Unique meta description
- At least 2-3 unique internal links (to/from neighboring bairros, zone page)
- Unique FAQ entry specific to that area (if using FAQ)
