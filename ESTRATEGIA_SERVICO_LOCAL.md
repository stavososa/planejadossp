# Estratégia de Páginas de Serviço Local — v2 (Revisada)

**Documento de arquitetura SEO e navegação para páginas combinadas de Serviço × Localidade.**
Válido para o site Planejados SP (intermediador, sem fabricação própria).
Última revisão: novembro/2026.

---

## 0. Diagnóstico Honesto da Versão Anterior (v1)

A v1 tinha estrutura correta nos princípios, mas lacunas graves de execução:

| Lacuna | Impacto |
|---|---|
| Não diferenciava bairro de zona da capital | Risco de criar páginas sem demanda observada (bairros não aparecem no Bing autocomplete) |
| Nenhuma priorização por praça | Implementação virava caça-níquel sem ordem de ROI |
| Sem regra de qualificação de localidade | Poderia gerar páginas para cidades fora da área de atendimento real |
| Nenhuma camada A/B de páginas locais | Confundia Nível 1 (Categoria Local) com Nível 2 (Específica Local) em termos de intent e conteúdo |
| Metragem ignorada como diferencial | O cluster mais rico de cauda longa (46m², 50m², 40m²) não aparecia na estratégia |
| Sem anti-canibalização explicita | Risco de `/cozinha-planejada-moema/` canibalizar `/cozinhas/` |
| Taxonomia incompleta | Apenas 7 serviços específicos listados, catálogo tem 92 filhas nacionais de referência |
| Sem menção ao check-site.js | Validação técnica obrigatória omitida |
| Zonas da capital ausentes | Termo "móveis planejados zona leste SP" aparece no Bing — cluster de Nível 0 inexplorado |
| Landing por empreendimento ignorada | Ideia do dossiê (seção 13) com alto potencial de conversão |

---

## 1. Hierarquia de Localidades (4 Camadas)

> **Regra central:** a demanda observada dita a prioridade. Bairro sem termo Bing confirmado = página adiada.

```
Nível 0: Zonas da Capital (maior catchment, termo observado no Bing)
  └── Nível 1: Cidade ou Distrito (população confirmada na área de atendimento)
        └── Nível 2: Bairro (apenas com prova local — pelo menos 1 projeto entregue)
              └── Nível 3: Empreendimento específico (escala futura — condominiais de alto padrão)
```

### Critério de Qualificação por Camada

| Camada | Pré-requisito mínimo |
|---|---|
| **Zona** (ex.: zona sul, zona leste) | Termo observado no Bing autocomplete + atendimento confirmado na zona |
| **Cidade / Distrito** | Cidade na área de atendimento declarada pelo dono + pelo menos 1 caso documentado no futuro |
| **Bairro** | Projeto entregue no bairro documentado + foto real ou depoimento |
| **Empreendimento** | Parceiro local ou 3+ projetos no condomínio |

> **Regra atual:** o site ainda não tem casos reais (projetos-entregues vazio). Portanto, **nenhuma página de bairro ou empreendimento deve ser publicada como "index" até que a prova local exista.** Publicar com `noindex` ou como rascunho é aceitável para preparação técnica.

---

## 2. Padrão de URL: Slugs Planas (Sem Ascendentes)

Todas as páginas — categorias e específicas — residem **diretamente na raiz do domínio**, sem pastas intermediárias.

**Formato:** `https://urlprincipal.com/[servico]-[local]/`

### Exemplos por Camada

| Camada | Exemplo de URL | Slug |
|---|---|---|
| Zona (Nível 0) | Categoria de zona | `/cozinha-planejada-zona-sul-sp/` |
| Zona específica | Nível 2 de zona | `/closet-planejado-zona-norte-sp/` |
| Cidade | Categoria de cidade | `/cozinha-planejada-santos/` |
| Cidade específica | Nível 2 de cidade | `/closet-planejado-sao-jose-dos-campos/` |
| Distrito SP | Categoria de distrito | `/cozinha-planejada-moema/` |
| Distrito específica | Nível 2 de distrito | `/cozinha-pequena-planejada-moema/` |
| Bairro | Categoria de bairro | `/cozinha-planejada-vila-madalena/` |
| Empreendimento | Landing futura | `/moveis-planejados-edificio-[nome]/` |

> **Nunca** usar `/atendemos/[local]/[servico]/`, `/sp/[local]/[servico]/` ou qualquer aninhamento. Isso foi reafirmado pelo dono em múltiplas sessões.

### Regra de Colisão de Slugs

O `check-site.js` (em `tools/`) já detecta colisões entre bairros e distritos. Antes de criar qualquer nova página de serviço local:
1. Verificar se a slug `[servico]-[local]` já existe em outro contexto
2. Rodar `node tools/check-site.js` → deve retornar **"Sem problemas."**

---

## 3. Linkagem Interna (Ancorada nas Páginas de Localidade)

O menu global (cabeçalho/rodapé) permanece limpo. A descoberta acontece exclusivamente pelas **páginas de localidade existentes**. O modelo espelha o cabeçalho temático — mas com fator local.

### Fluxo de Linkagem

```
Página de Localidade (hub)
  ├── Seção "Ambientes Planejados em [Local]" (igual às categorias do menu, mas local)
  │     ├── Link → /cozinha-planejada-[local]/      ← Nível 1 (Categoria Local)
  │     ├── Link → /dormitorios-planejados-[local]/ ← Nível 1
  │     └── ...
  │
  ├── /cozinha-planejada-[local]/ (Nível 1)
  │     ├── Visão geral do ambiente na localidade
  │     ├── Link → /cozinha-pequena-planejada-[local]/   ← Nível 2
  │     ├── Link → /cozinha-com-ilha-planejada-[local]/  ← Nível 2
  │     ├── Link de retorno → /[local]/
  │     └── Link breadcrumb → /cozinhas/ (pilar nacional — NÃO é canonical)
  │
  └── /cozinha-pequena-planejada-[local]/ (Nível 2)
        ├── Foco: dor específica + realidade local (metragem, condomínio, logística)
        ├── Links irmãos (outras soluções de cozinha no local)
        └── Volta → /[local]/ e → /cozinha-planejada-[local]/
```

### Regra de Profundidade de Links

- Página de zona (Nível 0) → não entra no hub de localidade; tem seu próprio hub de zona ou aparece em `/sao-paulo/` (hub da capital)
- Nível 1 e Nível 2 → sempre linkados a partir do hub da localidade correspondente
- Breadcrumb visual: **Início › [Local] › [Categoria Local] › [Serviço Específico]**

---

## 4. Matriz de Palavras-Chave

### Legenda
- ✅ **Observado**: apareceu no Bing autocomplete (termos-sp.md)
- 〔inf〕 **Inferido**: derivado por analogia, sem confirmação direta

### 4A. Nível 0 — Zonas da Capital (Prioridade Máxima)

| Termo-alvo | Status | Slug sugerida |
|---|---|---|
| móveis planejados zona leste SP | ✅ | `/moveis-planejados-zona-leste-sp/` |
| marcenaria São Paulo zona norte | ✅ | `/marcenaria-zona-norte-sp/` |
| marcenaria no centro de São Paulo | ✅ | `/marcenaria-centro-sp/` |
| móveis planejados zona sul SP | 〔inf〕 | `/moveis-planejados-zona-sul-sp/` |
| móveis planejados zona oeste SP | 〔inf〕 | `/moveis-planejados-zona-oeste-sp/` |
| cozinha planejada zona leste | 〔inf〕 | `/cozinha-planejada-zona-leste-sp/` |
| dormitório planejado zona sul | 〔inf〕 | `/dormitorio-planejado-zona-sul-sp/` |

> **Ação imediata:** estas slugs não existem ainda e têm o maior catchment de tráfego local. Criar antes das páginas de distrito individuais.

### 4B. Nível 1 — Categorias Locais (8 Pilares × Localidade)

| Categoria | Slug-modelo | Variações observadas |
|---|---|---|
| Cozinha | `/cozinha-planejada-[local]/` | "cozinha em L", "cozinha americana" |
| Dormitório/Quarto | `/dormitorios-planejados-[local]/` ou `/quarto-planejado-[local]/` | "quarto de casal", "quarto infantil" |
| Closet | `/closet-planejado-[local]/` | — |
| Sala/Painel | `/sala-planejada-[local]/` | "painel de TV" |
| Banheiro | `/banheiro-planejado-[local]/` | — |
| Home Office | `/home-office-planejado-[local]/` | "escritório planejado" |
| Varanda/Gourmet | `/varanda-gourmet-planejada-[local]/` | — |
| Comercial | `/marcenaria-comercial-[local]/` | "loja planejada", "escritório comercial" |

> Usar apenas os pilares com maior aderência ao perfil demográfico da localidade. Exemplo: zona comercial do centro → priorizar `/marcenaria-comercial-centro-sp/` antes de `/varanda-gourmet-planejada-centro-sp/`.

### 4C. Nível 2 — Serviços Específicos de Alta Conversão

| Serviço Específico | Slug-modelo | Diferencial local recomendado |
|---|---|---|
| Cozinha pequena | `/cozinha-pequena-planejada-[local]/` | Metragem típica de aptos na região |
| Cozinha com ilha | `/cozinha-com-ilha-planejada-[local]/` | Plantas abertas de alto padrão |
| Cozinha americana | `/cozinha-americana-planejada-[local]/` | Integração sala-cozinha |
| Cozinha em L | `/cozinha-em-l-planejada-[local]/` | — |
| Guarda-roupa embutido | `/guarda-roupa-planejado-[local]/` | — |
| Closet camarim | `/closet-camarim-planejado-[local]/` | Alto padrão, distritos nobres |
| Quarto de casal | `/quarto-de-casal-planejado-[local]/` | Metragem e layout típico |
| Quarto infantil | `/quarto-infantil-planejado-[local]/` | — |
| Quarto de solteiro | `/quarto-solteiro-planejado-[local]/` | Kitnet/studio |
| Painel de TV | `/painel-de-tv-planejado-[local]/` | Sala integrada |
| Home office compacto | `/home-office-compacto-planejado-[local]/` | Aptos com canto de trabalho |
| Móveis apartamento pequeno | `/moveis-planejados-apartamento-pequeno-[local]/` | Hotspot: 46m², 50m², 40m² |
| Dormitório completo | `/dormitorio-completo-planejado-[local]/` | — |
| Varanda gourmet | `/varanda-gourmet-planejada-[local]/` | Casas no entorno da capital |
| Loja planejada | `/loja-planejada-[local]/` | Zonas comerciais |

### 4D. Cluster de Metragem (Diferencial Único — Não Replicável por Concorrente Genérico)

O autocomplete do Bing mostrou **metragem como o cluster mais rico** de cauda longa local:

| Metragem | Aparições no levantamento | Slug possível |
|---|---|---|
| 46m² | 9 | `/cozinha-planejada-apartamento-46m2/` |
| 50m² | 9 | `/moveis-planejados-apartamento-50m2/` |
| 40m² | 7 | `/moveis-planejados-apartamento-40m2/` |
| Casa completa | 5 | `/moveis-planejados-casa-completa-[local]/` |

> **Estratégia de cruzamento:** uma página como `/moveis-planejados-apartamento-50m2-moema/` cria unicidade real — combina metragem (demanda observada) + localidade (nicho de alto padrão). Nenhum concorrente genérico publica isso com profundidade.

---

## 5. Regras de Anti-Canibalização

### 5A. Diferenciação de Intent por Nível

| Nível | URL exemplo | Intent | Conteúdo central |
|---|---|---|---|
| Pilar nacional | `/cozinhas/` | Informacional ("como funciona", materiais, processos) | Guia completo do ambiente, tipos, preços médios SP |
| Categoria Local (N1) | `/cozinha-planejada-moema/` | Misto (informacional + local) | "Cozinhas planejadas no contexto de Moema" — tipos de imóvel, estilo do bairro, logística |
| Específica Local (N2) | `/cozinha-pequena-planejada-moema/` | Transacional local | Dor específica: "cozinha pequena no aparto de Moema" — layout, desafios do condomínio, exemplos |

**Regra de ouro:** a página local não repete o conteúdo da pilar nacional. Ela **pressupõe** que o usuário já sabe o que são móveis planejados e foca no **como isso funciona AQUI, neste imóvel, neste bairro**.

### 5B. Canonical e Indexação

- Cada página local é **canônica de si mesma** (não aponta para a pilar nacional como canonical)
- Pilar nacional não aponta para páginas locais como canonical
- Páginas de bairro sem prova local: usar `<meta name="robots" content="noindex, follow">` até ter conteúdo real
- Páginas de empreendimento (futuras): apenas com `noindex` até lançar com conteúdo completo

### 5C. Volume Máximo por Localidade (Regra Anti-Saturação)

Para evitar diluição de autoridade e conteúdo fino:

| Localidade | Máx. Nível 1 | Máx. Nível 2 |
|---|---|---|
| Zona da capital | 8 (todos os pilares) | 10 serviços específicos |
| Cidade (polo regional) | 6 pilares mais relevantes | 8 serviços específicos |
| Distrito SP | 4 pilares com aderência demográfica | 5 serviços específicos |
| Bairro | 2–3 pilares (apenas com prova) | 2–3 (apenas com prova real) |

---

## 6. Checklist de Conteúdo Único Obrigatório (por Página Local)

Cada página de serviço local deve conter **pelo menos 3 dos 5 elementos** abaixo para ser publicada como `index`:

| # | Elemento | Exemplo aplicado |
|---|---|---|
| 1 | **Dado demográfico local** | "Moema tem 53% de domicílios em apartamentos — maior concentração vertical de SP (Censo 2022)" |
| 2 | **Metragem típica da região** | "Aptos de Moema têm entre 70m² e 180m² — projetos priorizaram cozinha integrada e ilha" |
| 3 | **Desafio logístico real** | "Entregas em condomínios fechados no Morumbi exigem agendamento com síndico — nossos parceiros já têm esse fluxo" |
| 4 | **Vocação arquitetônica** | "Vila Madalena tem maioria de casas com terreno — permite varanda gourmet e área externa" |
| 5 | **Prova local** (após ter casos reais) | Foto, depoimento ou projeto entregue naquela praça |

> **Regra da persona:** "a persona é estadual, a prova é local." O texto pode falar para qualquer morador de SP, mas o diferencial é o conhecimento específico daquela praça.

### Seções Recomendadas por Página Local (Ordem)

1. **H1 + subtítulo:** `[Serviço] em [Local]` + proposta de valor específica ao local
2. **Contexto local:** perfil do imóvel típico, estilo de vida, desafios construtivos
3. **Galeria/referências** (ou CTA para orçamento sem fotos reais ainda)
4. **Como funciona** (versão abreviada — 3 etapas; o completo está na pilar nacional)
5. **Especificidades técnicas** do serviço naquele ambiente local
6. **Depoimento ou prova local** (CONFIRMAR — deixar vazio até ter real)
7. **Serviços relacionados nesta localidade** (links N1 e N2 irmãos)
8. **CTA final** + link de volta para o hub da localidade

---

## 7. Priorização de Rollout (Ordem de Implementação)

### Fase 1 — Zonas da Capital (Executar Primeiro)

Maior volume de busca, menor risco de saturação, nenhuma prova local exigida pois a zona é ampla.

1. `/moveis-planejados-zona-leste-sp/` (termo ✅ observado)
2. `/marcenaria-zona-norte-sp/` (termo ✅ observado)
3. `/marcenaria-centro-sp/` (termo ✅ observado)
4. `/moveis-planejados-zona-sul-sp/` (inferido por simetria)
5. `/moveis-planejados-zona-oeste-sp/` (inferido por simetria)

### Fase 2 — Cidades Polo com Demanda Observada

Apenas cidades com termo Bing confirmado OU com atendimento declarado pelo dono.

1. Santos (termos ✅)
2. Ribeirão Preto (termos ✅)
3. São José dos Campos (termos ✅)
4. Outras cidades a confirmar com o dono

### Fase 3 — Distritos de SP com Alta Densidade

Priorizar pelos 10 distritos já existentes no site. Ordem por perfil de alta conversão:

1. Moema (vertical premium, 53% aptos)
2. Pinheiros (jovens adultos, alta renda, reforma frequente)
3. Vila Mariana (perfil mixto, alta densidade)
4. Lapa
5. Santo André / São Bernardo / Diadema (ABC — confirmar atendimento com dono)

### Fase 4 — Bairros (Apenas com Prova Local)

Aguardar primeiro projeto entregue. Manter páginas em `noindex` como preparação técnica.

---

## 8. Schema JSON-LD para Páginas Locais

Cada página de serviço local deve incluir **dois blocos** de JSON-LD:

### 8A. Service + areaServed

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cozinha Planejada em Moema",
  "description": "Projetos de cozinha planejada para apartamentos e casas em Moema, São Paulo.",
  "provider": {
    "@id": "https://urlprincipal.com/sobre/#organizacao"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Moema",
    "containedInPlace": {
      "@type": "City",
      "name": "São Paulo",
      "addressRegion": "SP"
    }
  },
  "serviceType": "Móveis Planejados"
}
```

### 8B. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://urlprincipal.com/" },
    { "@type": "ListItem", "position": 2, "name": "Moema", "item": "https://urlprincipal.com/sao-paulo/moema/" },
    { "@type": "ListItem", "position": 3, "name": "Cozinhas Planejadas em Moema", "item": "https://urlprincipal.com/cozinha-planejada-moema/" }
  ]
}
```

> O `@id` da organização deve ser o mesmo de `/sobre/` — reutilizar o bloco `Organization` já definido.

---

## 9. Implementação Técnica

### 9A. Arquivos a Criar

```
tools/
  build-servicos-locais.js        ← script gerador principal
  ambientes/
    servicos-locais/
      _base.js                    ← template compartilhado (HTML + JSON-LD)
      cozinha-planejada.js        ← dados para o pilar Cozinha
      dormitorios-planejados.js   ← dados para o pilar Dormitório
      ...
```

### 9B. Fluxo de Geração

1. `_base.js` define o esqueleto HTML com placeholders: `{{servico}}`, `{{local}}`, `{{slug}}`, `{{demografico}}`
2. Cada `[pilar].js` fornece: nome do serviço, variações (N2), intent, seção de conteúdo específico
3. `build-servicos-locais.js` itera: praças qualificadas × pilares × variações → gera arquivos HTML
4. Após geração: `node tools/check-site.js` → **deve retornar "Sem problemas."** (obrigatório antes de commit)

### 9C. Validação Obrigatória

```bash
# Após qualquer geração de páginas locais:
node tools/check-site.js
# Resultado esperado: "Sem problemas."

# Verificar colisão de slugs antes de criar:
# grep -r 'cozinha-planejada-moema' pages/
```

### 9D. Referência a Geradores Existentes

- `tools/build-layouts.js` — gerador de páginas de serviço nacional (referência de padrão)
- `tools/build-sao-paulo.js` — gerador de distritos/bairros (já tem regra de colisão de slugs)
- Novos geradores devem seguir o mesmo padrão de output e validação

---

## 10. Regras de Nomenclatura de Slugs

| Regra | Correto | Errado |
|---|---|---|
| Sempre kebab-case | `cozinha-planejada-moema` | `cozinhaplanejadamoema` |
| Português sem acentos | `sao-paulo`, `guarulhos` | `são-paulo`, `guarulhós` |
| Serviço antes do local | `cozinha-planejada-moema` | `moema-cozinha-planejada` |
| Sem "/sp" desnecessário em distritos | `cozinha-planejada-moema` | `cozinha-planejada-moema-sp` |
| Com "-sp" apenas em zonas e cidades homônimas | `moveis-planejados-zona-leste-sp` | `moveis-planejados-zona-leste` |
| Sem número de versão ou data | `cozinha-planejada-moema` | `cozinha-planejada-moema-2024` |

---

## 11. O Que Este Documento NÃO Autoriza

- ❌ Criar páginas de bairro específico sem pelo menos 1 projeto entregue documentado
- ❌ Inventar dados demográficos — usar apenas Censo 2022 (IBGE) ou fontes oficiais citadas
- ❌ Inventar depoimentos, fotos de projetos, prazos ou preços fechados
- ❌ Usar slugs aninhadas (`/sp/moema/cozinha/`) — sempre raiz plana
- ❌ Criar páginas para cidades fora da área de atendimento sem confirmação do dono
- ❌ Publicar como `index` página sem os 3 elementos mínimos de conteúdo único (seção 6)
- ❌ Usar intenção de "projeto 3D grátis" como CTA — esse cluster é DIY, não converte para o serviço

---

## Apêndice — Localidades Prioritárias para Fase 1 e 2

| Localidade | Tipo | Demanda Bing | Status no site | Prioridade |
|---|---|---|---|---|
| Zona Leste SP | Zona | ✅ | Não existe | 🔴 Alta |
| Zona Norte SP | Zona | ✅ | Não existe | 🔴 Alta |
| Centro SP | Zona | ✅ | Não existe | 🔴 Alta |
| Zona Sul SP | Zona | 〔inf〕 | Não existe | 🟠 Média-alta |
| Zona Oeste SP | Zona | 〔inf〕 | Não existe | 🟠 Média-alta |
| Santos | Cidade | ✅ | Existe (`/santos/`) | 🟠 Média-alta |
| Ribeirão Preto | Cidade | ✅ | Existe | 🟠 Média-alta |
| São José dos Campos | Cidade | ✅ | Existe | 🟠 Média-alta |
| Moema | Distrito | 〔inf〕 | Existe (`/sao-paulo/moema/`) | 🟡 Média |
| Pinheiros | Distrito | 〔inf〕 | Existe | 🟡 Média |
| Vila Mariana | Distrito | 〔inf〕 | Existe | 🟡 Média |

---

*Versão 2 — revisada com base em: análise crítica da v1, levantamento Bing autocomplete (termos-sp.md), dossiê ICP (ICP_Planejados_SP_Dossie_de_Personas.md) e arquitetura do site (LEIA-ME.md).*
