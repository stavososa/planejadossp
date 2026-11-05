# Estratégia de Páginas de Serviço Local — v4 (Arquitetura Híbrida + Conteúdo Editorial Variável)

**Documento de arquitetura SEO e navegação para páginas combinadas de Serviço × Localidade.**
Válido para o site Planejados SP (intermediador, sem fabricação própria).
Última revisão: novembro/2026.

> **Decisão de arquitetura v4:** adotar uma estrutura híbrida. Para municípios, usar `/<cidade>/<servico>/`. Para zonas, distritos e bairros da cidade de São Paulo, usar um hub próprio diretamente na raiz, com `-sp` no slug, seguido do serviço: `/<local>-sp/<servico>/`. Assim, Moema será `/moema-sp/cozinha-planejada/`, e não `/sao-paulo/moema/cozinha-planejada/`. As páginas específicas N2 permanecem dentro da categoria N1 correspondente. Esta regra substitui os exemplos de distritos e bairros da v3.

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
| Sem anti-canibalização explicita | Risco de uma página local canibalizar `/cozinhas/` quando as intenções não forem diferenciadas |
| Taxonomia incompleta | Apenas 7 serviços específicos listados, catálogo tem 92 filhas nacionais de referência |
| Sem menção ao check-site.js | Validação técnica obrigatória omitida |
| Zonas da capital ausentes | Termo "móveis planejados zona leste SP" aparece no Bing — cluster de Nível 0 inexplorado |
| Landing por empreendimento ignorada | Ideia do dossiê (seção 13) com alto potencial de conversão |

---

## 1. Hierarquia de Localidades (4 Camadas)

> **Regra central:** a demanda observada dita a prioridade. Bairro sem termo Bing confirmado = página adiada. Os níveis representam escopo e prioridade editorial; não obrigam que o caminho de URL reproduza uma hierarquia geográfica. Em São Paulo, distritos e bairros têm hubs próprios na raiz com `-sp`.

```
Nível 0: Zonas da Capital (maior catchment, termo observado no Bing)
  └── Nível 1: Municípios e distritos (hubs locais independentes)
        └── Nível 2: Bairros (hubs próprios, apenas com prova local — pelo menos 1 projeto entregue)
              └── Nível 3: Empreendimento específico (escala futura — condominiais de alto padrão)
```

### Critério de Qualificação por Camada

| Camada | Pré-requisito mínimo |
|---|---|
| **Zona** (ex.: zona sul, zona leste) | Termo observado no Bing autocomplete + atendimento confirmado na zona |
| **Município / Distrito** | Localidade dentro da área de atendimento declarada pelo dono + demanda identificada; reunir casos documentados assim que existirem |
| **Bairro** | Projeto entregue no bairro documentado + foto real ou depoimento; página/hub independente na raiz com `-sp` |
| **Empreendimento** | Parceiro local ou 3+ projetos no condomínio |

> **Regra atual:** o site ainda não tem casos reais (projetos-entregues vazio). Portanto, **nenhuma página de bairro ou empreendimento deve ser publicada como "index" até que a prova local exista.** Publicar com `noindex` ou como rascunho é aceitável para preparação técnica.

---

## 2. Padrão de URL: Arquitetura Híbrida por Localidade → Serviço

A arquitetura mantém a relação **hub da localidade → categoria de serviço → solução específica**, mas o caminho do hub varia conforme o tipo de localidade. A intenção é evitar uma pasta intermediária desnecessária `/sao-paulo/` para distritos e bairros da capital, sem abandonar a organização hierárquica das páginas.

### 2A. Padrões obrigatórios por tipo de localidade

**Municípios da Grande São Paulo e do interior:** a cidade é o primeiro segmento.

- Hub: `https://urlprincipal.com/[cidade]/`
- Categoria local (N1): `https://urlprincipal.com/[cidade]/[servico]/`
- Solução específica (N2): `https://urlprincipal.com/[cidade]/[servico]/[solucao-especifica]/`

**Zonas, distritos e bairros da cidade de São Paulo:** o hub fica diretamente na raiz e o slug da localidade inclui `-sp`. Não inserir `/sao-paulo/` como diretório anterior.

- Hub de distrito: `https://urlprincipal.com/[distrito]-sp/`
- Hub de bairro: `https://urlprincipal.com/[bairro]-sp/`
- Categoria local (N1): `https://urlprincipal.com/[local]-sp/[servico]/`
- Solução específica (N2): `https://urlprincipal.com/[local]-sp/[servico]/[solucao-especifica]/`

**Zonas da capital:** preservar o slug descritivo de zona já utilizado como hub e acrescentar o serviço depois dele.

- Hub: `https://urlprincipal.com/moveis-planejados-zona-leste-sp/`
- Categoria local (N1): `https://urlprincipal.com/moveis-planejados-zona-leste-sp/cozinha-planejada/`
- Solução específica (N2): `https://urlprincipal.com/moveis-planejados-zona-leste-sp/cozinha-planejada/cozinha-pequena/`

### 2B. Exemplos por tipo de localidade

| Tipo | Hub da localidade | Categoria local (N1) | Solução específica (N2) |
|---|---|---|---|
| Município | `/osasco/` | `/osasco/cozinha-planejada/` | `/osasco/cozinha-planejada/cozinha-pequena/` |
| Município | `/santos/` | `/santos/cozinha-planejada/` | `/santos/cozinha-planejada/cozinha-com-ilha/` |
| Zona da capital | `/moveis-planejados-zona-leste-sp/` | `/moveis-planejados-zona-leste-sp/cozinha-planejada/` | `/moveis-planejados-zona-leste-sp/cozinha-planejada/cozinha-pequena/` |
| Distrito de SP | `/moema-sp/` | `/moema-sp/cozinha-planejada/` | `/moema-sp/cozinha-planejada/cozinha-com-ilha/` |
| Distrito de SP | `/pinheiros-sp/` | `/pinheiros-sp/closet-planejado/` | `/pinheiros-sp/closet-planejado/closet-camarim/` |
| Bairro de SP | `/vila-madalena-sp/` | `/vila-madalena-sp/closet-planejado/` | `/vila-madalena-sp/closet-planejado/closet-camarim/` |

### 2C. Regra especial para distritos e bairros de São Paulo

- Distritos e bairros terão hubs diretamente na raiz do domínio: `/moema-sp/`, `/pinheiros-sp/`, `/vila-madalena-sp/`.
- Os serviços ficam dentro desses hubs: `/moema-sp/cozinha-planejada/`.
- As soluções específicas ficam dentro da categoria correspondente: `/moema-sp/cozinha-planejada/cozinha-pequena/`.
- **Não usar** `/sao-paulo/moema/`, `/sao-paulo/moema/cozinha-planejada/` ou `/sao-paulo/vila-madalena/closet-planejado/`.
- A terminação `-sp` identifica a unidade federativa e diferencia a localidade de nomes homônimos. Ela não autoriza criar página sem demanda, cobertura ou conteúdo próprio.
- Uma página geral `/sao-paulo/` pode existir como índice de navegação da capital, mas não será diretório-pai das páginas de distrito ou bairro. Ela deve apontar diretamente para os hubs `/moema-sp/`, `/pinheiros-sp/` etc.

### 2D. O que permanece na raiz

- Páginas institucionais e pilares nacionais/informacionais, como `/sobre/` e `/cozinhas/`, continuam na raiz.
- Hubs de municípios permanecem como `/osasco/`, `/santos/` e outros municípios qualificados.
- Hubs de distritos e bairros da capital também ficam na raiz, com `-sp`: `/moema-sp/`, `/vila-madalena-sp/`.
- Hubs de zonas preservam seus slugs descritivos, como `/moveis-planejados-zona-leste-sp/`.
- As categorias e soluções locais ficam subordinadas ao hub correspondente, conforme os padrões acima.

### 2E. Por que esta estrutura foi escolhida

A escolha é principalmente **arquitetural e operacional**, não uma promessa de vantagem direta de ranqueamento. Para municípios, `/osasco/cozinha-planejada/` torna explícita a relação entre cidade e serviço. Para distritos e bairros da capital, `/moema-sp/cozinha-planejada/` preserva a mesma lógica sem adicionar uma pasta `/sao-paulo/` que não é necessária para identificar a localidade, pois o próprio hub já contém `-sp`.

Não há garantia de que uma URL mais curta, plana ou com a palavra-chave em uma posição específica vá ranquear melhor. O Google descobre páginas por links rastreáveis, sitemaps e outros sinais técnicos. A descoberta depende de uma malha de links internos útil, sitemap atualizado, resposta HTTP acessível e ausência de bloqueios técnicos — não apenas de reduzir a quantidade de segmentos.

### 2F. Regra de colisão e validação de caminhos

O `check-site.js` (em `tools/`) deve validar caminhos completos. Antes de criar qualquer página:
1. Confirmar o tipo de localidade e aplicar o padrão correto: município, zona, distrito ou bairro.
2. Confirmar que a localidade está na área de atendimento efetiva.
3. Verificar se o hub e a combinação `[hub-local]/[servico]/` já existem.
4. Verificar se a solução específica está subordinada à categoria local correta.
5. Rodar `node tools/check-site.js` → deve retornar **"Sem problemas."**
6. Conferir canonical, breadcrumb, sitemap e links internos após a geração.

> **Não criar pastas intermediárias genéricas** como `/atendemos/` ou `/servicos-locais/`. Para distritos e bairros de São Paulo, também não criar `/sao-paulo/` como diretório obrigatório: o hub raiz com `-sp` já identifica a localidade.

---

## 3. Linkagem Interna (Hub Local → Categoria → Solução)

O menu global (cabeçalho/rodapé) pode permanecer limpo. A descoberta das páginas locais deve acontecer principalmente pelas **páginas de hub de cada localidade**, com links HTML rastreáveis e descritivos. Nenhuma página local importante deve ficar órfã ou depender exclusivamente do sitemap.

### Fluxo de linkagem

```text
Hub de município, zona, distrito ou bairro
  ├── Seção "Ambientes Planejados em [Local]"
  │     ├── Link → [hub-local]/cozinha-planejada/       ← Nível 1
  │     ├── Link → [hub-local]/dormitorios-planejados/  ← Nível 1
  │     └── ... apenas serviços realmente oferecidos/relevantes
  │
  ├── [hub-local]/cozinha-planejada/ (Nível 1)
  │     ├── Visão geral de cozinhas planejadas naquela localidade
  │     ├── Link → [hub-local]/cozinha-planejada/cozinha-pequena/  ← Nível 2
  │     ├── Link → [hub-local]/cozinha-planejada/cozinha-com-ilha/ ← Nível 2
  │     ├── Link de retorno → [hub-local]/
  │     └── Link contextual → /cozinhas/ (pilar nacional; não usar como canonical)
  │
  └── [hub-local]/cozinha-planejada/cozinha-pequena/ (Nível 2)
        ├── Foco: necessidade específica + realidade local
        ├── Link para categoria-mãe → [hub-local]/cozinha-planejada/
        ├── Links irmãos somente quando forem úteis
        └── Link de retorno → [hub-local]/
```

`[hub-local]` representa o caminho completo do hub e varia conforme a localidade. Exemplos: `/osasco/`, `/santos/`, `/moveis-planejados-zona-leste-sp/`, `/moema-sp/` ou `/vila-madalena-sp/`.

### Regra de breadcrumb

- Hub de município: `Início › Osasco`.
- Categoria local em município: `Início › Osasco › Cozinha Planejada em Osasco`.
- Hub de distrito: `Início › Moema (São Paulo)`.
- Categoria local em distrito: `Início › Moema (São Paulo) › Cozinha Planejada em Moema`.
- Hub de bairro: `Início › Vila Madalena (São Paulo)`.
- Categoria local em bairro: `Início › Vila Madalena (São Paulo) › Closet Planejado na Vila Madalena`.
- Solução específica: acrescentar a categoria e a solução ao caminho visual, sem inventar diretórios que não existem.

O breadcrumb deve refletir a hierarquia de navegação e apontar para URLs existentes. Para distritos e bairros, o item de localidade aponta diretamente para `/moema-sp/` ou `/vila-madalena-sp/`; não deve apontar para uma pasta intermediária `/sao-paulo/moema/`.

### Regra de profundidade e descoberta

- Hubs de município, zona, distrito e bairro devem estar ligados a partir de páginas relevantes de navegação (por exemplo, `/sao-paulo/`, uma página de regiões atendidas ou um seletor de localidades).
- A página `/sao-paulo/`, se existir, funciona como índice de navegação e deve ligar diretamente aos hubs de distrito/bairro terminados em `-sp`.
- N1 deve receber link direto do hub de localidade correspondente.
- N2 deve receber link contextual da página N1 que a explica.
- Links entre cidades ou bairros só devem ser usados quando ajudarem o usuário a comparar ou encontrar cobertura; evitar listas artificiais de localidades inseridas apenas para criar links.
- Sitemap XML complementa a descoberta, mas não substitui uma arquitetura interna navegável.

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
| móveis planejados zona sul SP | 〔inf〕 | `/moveis-planejados-zona-sul-sp/` (hub) |
| móveis planejados zona oeste SP | 〔inf〕 | `/moveis-planejados-zona-oeste-sp/` (hub) |
| cozinha planejada zona leste | 〔inf〕 | `/moveis-planejados-zona-leste-sp/cozinha-planejada/` |
| dormitório planejado zona sul | 〔inf〕 | `/moveis-planejados-zona-sul-sp/dormitorio-planejado/` |

> **Ação imediata:** estas slugs não existem ainda e têm o maior catchment de tráfego local. Criar antes das páginas de distrito individuais.

### 4B. Nível 1 — Categorias Locais (8 Pilares × Localidade)

O slug do serviço é um segmento dentro do hub. `[hub-local]` deve ser substituído pelo caminho real da página de localidade.

| Categoria | Caminho-modelo | Variações observadas |
|---|---|---|
| Cozinha | `[hub-local]/cozinha-planejada/` | "cozinha em L", "cozinha americana" |
| Dormitório/Quarto | `[hub-local]/dormitorios-planejados/` ou `[hub-local]/quarto-planejado/` | "quarto de casal", "quarto infantil" |
| Closet | `[hub-local]/closet-planejado/` | — |
| Sala/Painel | `[hub-local]/sala-planejada/` | "painel de TV" |
| Banheiro | `[hub-local]/banheiro-planejado/` | — |
| Home Office | `[hub-local]/home-office-planejado/` | "escritório planejado" |
| Varanda/Gourmet | `[hub-local]/varanda-gourmet-planejada/` | — |
| Comercial | `[hub-local]/marcenaria-comercial/` | "loja planejada", "escritório comercial" |

Exemplos completos:
- Osasco: `/osasco/cozinha-planejada/`
- Santos: `/santos/cozinha-planejada/`
- Moema: `/moema-sp/cozinha-planejada/`
- Zona Leste: `/moveis-planejados-zona-leste-sp/cozinha-planejada/`

Usar apenas os pilares com maior aderência ao perfil e à demanda da localidade. Exemplo: zona comercial do centro → priorizar marcenaria comercial quando houver atendimento e intenção de busca comprovados, em vez de publicar todos os oito pilares automaticamente.

### 4C. Nível 2 — Serviços Específicos de Alta Conversão

A página N2 fica dentro da categoria N1 correspondente. O último segmento descreve a solução específica, sem repetir artificialmente o nome da cidade.

| Serviço específico | Caminho-modelo | Diferencial local recomendado |
|---|---|---|
| Cozinha pequena | `[hub-local]/cozinha-planejada/cozinha-pequena/` | Metragem e limitações reais de imóveis da região |
| Cozinha com ilha | `[hub-local]/cozinha-planejada/cozinha-com-ilha/` | Quando plantas abertas e espaço disponível justificarem a solução |
| Cozinha americana | `[hub-local]/cozinha-planejada/cozinha-americana/` | Integração entre sala e cozinha |
| Cozinha em L | `[hub-local]/cozinha-planejada/cozinha-em-l/` | Aproveitamento de cantos e circulação |
| Guarda-roupa embutido | `[hub-local]/closet-planejado/guarda-roupa-embutido/` | Nichos, vãos e limitações do imóvel |
| Closet camarim | `[hub-local]/closet-planejado/closet-camarim/` | Layout, iluminação e armazenamento, quando pertinentes |
| Quarto de casal | `[hub-local]/dormitorios-planejados/quarto-de-casal/` | Metragem, circulação e armazenamento |
| Quarto infantil | `[hub-local]/dormitorios-planejados/quarto-infantil/` | Segurança, evolução de uso e organização |
| Quarto de solteiro | `[hub-local]/dormitorios-planejados/quarto-de-solteiro/` | Studios, kitnets e espaços compactos, se comprovados |
| Painel de TV | `[hub-local]/sala-planejada/painel-de-tv/` | Integração com rack, cabos e dimensões da sala |
| Home office compacto | `[hub-local]/home-office-planejado/home-office-compacto/` | Espaço disponível, ergonomia e uso diário |
| Móveis para apartamento pequeno | `[hub-local]/moveis-para-apartamento-pequeno/` | Planta, metragem e prioridades de uso reais |
| Dormitório completo | `[hub-local]/dormitorios-planejados/dormitorio-completo/` | Integração entre cama, armário e circulação |
| Varanda gourmet | `[hub-local]/varanda-gourmet-planejada/varanda-gourmet/` | Regras do condomínio, exposição ao tempo e uso do ambiente |
| Loja planejada | `[hub-local]/marcenaria-comercial/loja-planejada/` | Necessidades comerciais e operação do espaço |

Não é obrigatório criar uma N2 para cada variação de palavra-chave. Só abrir uma URL quando houver intenção de busca suficientemente distinta, atendimento real e conteúdo que acrescente utilidade em relação à página N1.

### 4D. Cluster de Metragem (Diferencial Único — Não Replicável por Concorrente Genérico)

O autocomplete do Bing mostrou **metragem como o cluster mais rico** de cauda longa local:

| Metragem | Aparições no levantamento | Slug possível |
|---|---|---|
| 46m² | 9 | `[hub-local]/cozinha-planejada/cozinha-apartamento-46m2/` |
| 50m² | 9 | `[hub-local]/moveis-para-apartamento-pequeno/apartamento-50m2/` |
| 40m² | 7 | `[hub-local]/moveis-para-apartamento-pequeno/apartamento-40m2/` |
| Casa completa | 5 | `[hub-local]/moveis-planejados-casa-completa/` quando houver intenção local distinta |

> **Estratégia de cruzamento:** quando a intenção e a demanda forem distintas e houver informação real, o tema pode ser tratado dentro da hierarquia local, por exemplo `[hub-local]/moveis-para-apartamento-50m2/`. Não criar automaticamente uma URL para cada metragem × cidade: a página precisa apresentar plantas, medidas, soluções ou orientação verificável que ajude o usuário.

---

## 5. Regras de Anti-Canibalização

### 5A. Diferenciação de Intent por Nível

| Nível | URL exemplo | Intent | Conteúdo central |
|---|---|---|---|
| Pilar nacional | `/cozinhas/` | Informacional ("como funciona", materiais, processos) | Guia completo do ambiente, tipos, preços médios SP |
| Categoria Local (N1) | `/moema-sp/cozinha-planejada/` | Misto (informacional + local) | Cozinhas planejadas no contexto de Moema — perfil dos imóveis, cobertura, processo e logística realmente aplicáveis |
| Específica Local (N2) | `/moema-sp/cozinha-planejada/cozinha-pequena/` | Transacional local | Dor específica: cozinha compacta — medidas, circulação, soluções e limitações comprovadas para aquela praça |

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

## 6. Originalidade, Relevância e Utilidade Obrigatórias (por Página Local)

**Objetivo editorial:** cada URL local deve existir para resolver uma necessidade concreta de alguém que procura aquele serviço naquela localidade. Não basta trocar "Osasco" por "Barueri" em um texto-base. A página precisa demonstrar que a empresa conhece a área atendida, explicar o serviço naquele contexto e ajudar a pessoa a tomar uma decisão ou avançar para um orçamento.

O Google orienta priorizar conteúdo original, confiável e feito para pessoas, com valor substancial além de reformular o que já existe. Também aponta como risco páginas semelhantes criadas para consultas geográficas específicas que apenas conduzem o usuário a um mesmo destino sem oferecer utilidade própria. Por isso, **a hierarquia de URL não torna páginas repetitivas seguras**: a qualidade e a função real de cada página continuam sendo determinantes.

### 6A. Critério mínimo de diferenciação local

Para uma página de serviço local ser considerada para publicação como `index`, deve apresentar **pelo menos 3 dos 5 elementos abaixo**, desde que sejam reais, pertinentes àquele serviço e verificáveis. Esta é uma regra editorial interna do projeto, não um número ou limiar definido pelo Google. Cumprir a contagem, isoladamente, não garante indexação nem posicionamento.

| # | Elemento | O que pode ser incluído | Exigência de comprovação |
|---|---|---|---|
| 1 | **Informação local objetiva** | Perfil predominante dos imóveis, tipos de condomínios, características urbanas ou dados demográficos relevantes | Fonte oficial ou levantamento identificável; informar fonte e ano quando houver estatística |
| 2 | **Condições reais dos imóveis** | Metragens, plantas, dimensões, soluções recorrentes ou restrições de casas/apartamentos daquela área | Projeto, planta, medição, levantamento ou amostra identificável; não generalizar a partir de suposição |
| 3 | **Logística e cobertura efetivas** | Bairros atendidos, distância/condições de deslocamento, agendamento, regras de acesso, entrega e instalação | Confirmar com a operação e com os parceiros responsáveis; não prometer cobertura ou prazo não confirmado |
| 4 | **Contexto arquitetônico e de uso** | Tipos de ambiente, integração de cômodos, necessidades recorrentes e soluções que fazem sentido para imóveis locais | Referências reais, observação documentada ou justificativa técnica; evitar estereótipos sobre o bairro |
| 5 | **Prova local** | Projeto realizado, fotos próprias, antes/depois autorizado, depoimento verdadeiro ou estudo de caso | Identificar local e contexto com autorização; nunca inventar clientes, fotos, avaliações ou projetos |

> **Regra de precisão:** se um dado local não tiver fonte ou comprovação, não publicar como fato. Remover o dado é melhor do que preencher a página com estatísticas, metragens, hábitos ou dificuldades presumidas.

### 6B. Originalidade: o que precisa ser próprio

Cada página deve ter conteúdo editorial preparado ou revisado especificamente para a combinação **serviço × localidade**. A originalidade não significa apenas reescrever frases; significa acrescentar conhecimento, evidência, orientação ou informação que não esteja repetida nas demais páginas.

Exigências:
- A introdução deve explicar por que aquele serviço é relevante naquela área, sem apenas inserir o nome da cidade no H1.
- O conteúdo principal deve abordar pelo menos uma característica concreta da localidade e explicar como ela afeta o planejamento, a escolha ou a execução do serviço.
- As recomendações devem ser específicas ao ambiente e ao problema pesquisado. Uma página de cozinha pequena deve tratar de circulação, medidas, armazenamento e limitações; uma página de closet deve tratar de organização, vãos, ventilação e configuração, conforme aplicável.
- Usar fotos próprias, projetos, plantas, esquemas, exemplos ou materiais de referência com direitos de uso sempre que disponíveis. Se ainda não houver projeto local, não simular portfólio nem apresentar imagem ilustrativa como obra executada.
- FAQ deve responder dúvidas relevantes daquela combinação de serviço e localidade. Não criar perguntas artificiais só para repetir palavras-chave.
- Não copiar texto de concorrentes, catálogos de fornecedores ou de outra página do próprio site. Fontes externas podem embasar fatos, mas a página deve acrescentar explicação e aplicação próprias.

### 6B.1. Diversidade editorial: sintaxe, oratória, vocabulário e n-gramas

As páginas locais devem ter uma voz natural e própria. O objetivo não é apenas evitar duplicidade literal: é impedir que dezenas de páginas pareçam versões mecânicas de um mesmo texto, com as mesmas aberturas, transições, títulos, argumentos e sequência de frases.

**Variar a construção da linguagem, sem perder clareza:**
- Alternar frases curtas e diretas com explicações mais desenvolvidas, conforme a complexidade do assunto.
- Variar a sintaxe: voz ativa, perguntas respondidas, explicações por causa e consequência, comparações, exemplos e orientações passo a passo.
- Alternar a oratória de acordo com a intenção: consultiva quando orientar uma escolha, objetiva quando explicar cobertura ou orçamento, técnica quando tratar de medidas e materiais e acolhedora quando conduzir ao contato.
- Variar o ponto de entrada do texto. Uma página pode começar por uma necessidade de uso; outra, por uma limitação de espaço; outra, pelo tipo de imóvel ou por uma dúvida prática — desde que isso seja verdadeiro e relevante para aquela localidade.
- Construir subtítulos e FAQs a partir das dúvidas e características reais da página, evitando repetir em todas as localidades a mesma lista de títulos com o nome do bairro substituído.
- Variar conectivos, ritmo, extensão de parágrafos, exemplos e forma de apresentar recomendações. Não usar sempre a mesma sequência "problema → benefício → CTA" em todos os blocos.

**Controle de n-gramas e padrões repetidos:**
- Revisar sequências recorrentes de palavras (n-gramas), sobretudo em introduções, subtítulos, frases de transição, descrições, FAQs e CTAs.
- Evitar repetir literalmente blocos de 3, 4, 5 ou mais palavras em muitas páginas quando a repetição não for necessária. Termos essenciais como "cozinha planejada", "móveis planejados" e o nome da localidade podem e devem aparecer quando fizerem sentido; a regra não é removê-los artificialmente.
- Não usar apenas substituição de sinônimos para disfarçar um texto-base. A diferença deve vir de informações, argumentos, exemplos, perguntas e orientações realmente pertinentes àquela combinação de serviço e localidade.
- Manter Title, H1, descrição, texto e headings semanticamente alinhados à intenção de busca. A variação editorial não pode apagar o serviço nem a localidade que o usuário procura.
- Usar ferramentas de comparação textual e análise de n-gramas como **alerta para revisão**, não como meta matemática de originalidade. Não existe percentual mágico de palavras diferentes que garanta qualidade, indexação ou posicionamento.

**O que não fazer:**
- Não produzir texto artificialmente embaralhado, frases truncadas ou vocabulário rebuscado apenas para parecer diferente.
- Não trocar termos por sinônimos inadequados, repetir palavras-chave de forma forçada ou escrever para um suposto algoritmo de densidade.
- Não inventar primeira pessoa ou experiência prática. Frases como "já realizamos diversos projetos em Moema" só podem ser usadas se houver projetos reais documentados.
- Não aleatorizar frases dentro de parágrafos. A variação deve ser editorial, planejada e coerente com a necessidade do visitante.

**Regra prática:** cada página deve ter um briefing próprio com intenção de busca, público, contexto local comprovado, ângulo editorial, dúvidas prioritárias, soluções pertinentes e CTA. O template pode padronizar componentes técnicos e identidade visual; não pode determinar que todas as páginas contem a mesma história.

### 6C. Relevância: por que esta página merece existir?

Antes de criar ou indexar a URL, responder afirmativamente:
1. A localidade está dentro da área de atendimento efetivamente confirmada?
2. O serviço é realmente oferecido naquela localidade por meio da operação/parceiros disponíveis?
3. A intenção de busca é suficientemente específica e diferente da página-pai ou de outra página já existente?
4. Há conteúdo e informação próprios para responder à necessidade, em vez de uma página intermediária que apenas encaminha o usuário a outro destino?
5. O usuário consegue entender o que pode contratar, como funciona o atendimento e qual é o próximo passo?

Se a resposta for negativa para cobertura ou oferta real, não publicar a página. Se o conteúdo não tiver diferenciação ou utilidade suficiente, consolidar a informação na página-pai ou manter a URL fora do índice até que exista valor real. `noindex` não deve ser usado como licença para produzir centenas de páginas finas.

### 6D. Utilidade prática: o que o visitante deve conseguir fazer

A página deve ajudar o visitante a avançar em uma decisão concreta. Conforme o serviço, incluir informações como:
- Quais ambientes, soluções e tipos de projeto podem ser solicitados naquela área.
- Quais medidas, fotos, plantas ou informações o interessado deve separar para pedir orçamento.
- Quais fatores influenciam o orçamento (dimensões, materiais, ferragens, acabamento, complexidade, transporte e instalação), sem inventar preço fechado.
- Como funciona o atendimento, desde o primeiro contato até medição, projeto, aprovação, fabricação, entrega e montagem — somente as etapas que realmente fazem parte do processo oferecido.
- Como são tratados agendamento, acesso a condomínios, elevadores, regras de obra e logística, quando isso for relevante e estiver confirmado.
- Quais materiais, acabamentos, ferragens, garantias e responsabilidades estão disponíveis, sempre conforme as condições reais dos fornecedores/parceiros.
- Como pedir avaliação ou orçamento, com CTA funcional e expectativa transparente sobre o retorno.
- Links para soluções complementares que ajudem o visitante, sem criar navegação artificial.

**Teste de utilidade:** se alguém acessar a página diretamente, sem ter vindo do Google, ela ainda deve explicar algo útil, transmitir confiança e permitir um próximo passo claro. Se o visitante terminar a leitura precisando pesquisar tudo novamente em outro site, a página ainda não cumpriu seu objetivo.

### 6E. Transparência sobre o modelo de operação

O Planejados SP atua como **intermediador**, sem fabricação própria. A comunicação deve refletir exatamente esse modelo:
- Explicar com clareza como o interessado é atendido e como ocorre a conexão com marcenarias ou profissionais parceiros.
- Não afirmar que a empresa possui fábrica, equipe própria de instalação, showroom, estoque, unidade física ou endereço na localidade se isso não for verdadeiro.
- Não atribuir diretamente ao site serviços, garantias, prazos, preços ou responsabilidades que são definidos pelo parceiro sem explicar essa relação.
- Identificar quem executa cada etapa quando isso for relevante para a decisão do consumidor.
- Só mencionar parceiros, especializações, certificações, avaliações e disponibilidade depois de confirmar a informação.

A confiança depende de dizer com precisão **quem atende, quem projeta, quem fabrica, quem entrega e quem instala**, conforme o fluxo real de cada contratação.

### 6F. Estrutura recomendada: módulos contextuais e ordem variável

Cada página deve ter uma jornada editorial adequada à intenção de busca. **A ordem das sections pode variar entre páginas**, mas a variação deve ser contextual e preservar uma leitura lógica. Não aplicar um embaralhamento aleatório sem critério.

**Blocos fixos (obrigatórios):**
1. **Abertura:** H1 `[Serviço] em [Local]`, subtítulo específico e resposta direta sobre o que é oferecido naquela área.
2. **Mapa da localidade e área de atendimento:** section obrigatória em toda página local de serviço. O mapa deve corresponder à localidade exata — cidade, zona, distrito ou bairro — e ser apresentado com título e legenda contextualizados.
3. **CTA de encerramento:** próximo passo claro, canal de contato funcional e explicação transparente sobre o atendimento.

**Módulos editoriais que podem mudar de ordem conforme a página:**
- Contexto local comprovado: características dos imóveis, perfil urbano ou condições relevantes para o serviço.
- Soluções para o ambiente: layouts, armazenamento, circulação, materiais, acabamentos e uso.
- Logística e cobertura: bairros atendidos, deslocamento, acesso, agendamento e instalação, somente quando confirmados.
- Como funciona o atendimento: etapas reais e papel da plataforma e dos parceiros.
- Projeto, exemplo visual ou estudo de caso: sempre identificado corretamente e com autorização.
- Orientações para orçamento: medidas, fotos, planta, materiais e fatores que influenciam o investimento.
- Dúvidas frequentes: perguntas genuínas e respostas verificadas.
- Serviços relacionados: links contextuais para categorias e soluções complementares.

**A section de mapa é obrigatória e precisa ter utilidade real:**
- Usar mapa incorporado ou componente cartográfico confiável, centralizado na cidade, zona, distrito ou bairro tratado pela página.
- Nomear o mapa de forma específica, por exemplo: "Área de atendimento em Moema", "Localização de Vila Madalena e região" ou "Regiões atendidas em Osasco". Variar o título de acordo com a localidade e a função do mapa.
- Exibir limites, bairros próximos, pontos de referência ou áreas cobertas apenas quando os dados forem corretos e relevantes. Não inventar polígonos, distâncias, rotas, pins ou cobertura.
- Como o Planejados SP é intermediador e pode não possuir unidade física local, **não colocar um pin fictício que sugira loja, showroom, fábrica ou escritório**. O mapa deve localizar a área atendida, não simular um endereço comercial.
- Se a cobertura exata ainda não estiver confirmada, o mapa pode situar a localidade de referência, acompanhado de texto claro de que a disponibilidade será confirmada no atendimento. Não pintar uma área maior do que a operação realmente cobre.
- Fornecer contexto em texto próximo ao mapa: localidade, município/UF, bairros do entorno quando pertinentes e explicação do que o mapa representa. O mapa não deve ser apenas decorativo.

**Aleatorização controlada da ordem das sections:**
- O gerador pode selecionar diferentes sequências de módulos por página, considerando serviço, localidade, dados disponíveis, intenção de busca e etapa da decisão do visitante.
- A abertura deve permanecer no início; o CTA de encerramento deve permanecer próximo ao final; o mapa precisa estar presente em posição coerente com o contexto e a jornada de leitura.
- Exemplos de sequências válidas:
  - Contexto local → mapa e cobertura → soluções → como funciona → orientações para orçamento → FAQ → serviços relacionados.
  - Soluções para o ambiente → mapa da localidade → prova visual/estudo de caso → contexto dos imóveis → processo de atendimento → FAQ.
  - Resposta direta → como funciona → orientações para orçamento → mapa e área atendida → soluções específicas → dúvidas frequentes.
- Não usar a mesma sequência em todas as páginas de uma localidade. Também não forçar uma section sem informação útil apenas para criar variação.
- A sequência escolhida deve ser estável para a URL (por exemplo, definida no momento da geração com uma seed baseada na página), e não mudar a cada carregamento. Isso preserva consistência de leitura, rastreamento e manutenção.
- O mapa pode mudar de posição entre os módulos, mas nunca deve ser removido de uma página local publicada como `index`.

A quantidade e a profundidade dos módulos dependem do conteúdo real disponível. Uma página menor, mas precisa e útil, é preferível a uma página longa preenchida com blocos repetitivos.

### 6G. Regra de aprovação antes de `index`

Checklist editorial obrigatório:
- [ ] Cobertura geográfica e serviço confirmados.
- [ ] Intenção de busca distinta da página-pai e das páginas irmãs.
- [ ] Pelo menos 3 dos 5 elementos de diferenciação local da seção 6A, com comprovação.
- [ ] Texto principal escrito/revisado para aquela localidade e serviço — não apenas substituição de nomes.
- [ ] Informações práticas suficientes para ajudar o usuário a decidir ou pedir orçamento.
- [ ] Nenhum dado, depoimento, projeto, foto, prazo, preço, parceiro ou endereço inventado.
- [ ] Papel do Planejados SP e dos parceiros apresentado sem ambiguidade.
- [ ] Links para a página-pai, hub local e conteúdos relacionados.
- [ ] Section do mapa presente, contextualizada para a localidade e sem endereço/pin/cobertura fictícios.
- [ ] Ordem das sections coerente, variada em relação a outras páginas e estável por URL.
- [ ] Sintaxe, oratória, headings, FAQs, CTAs e n-gramas revisados para evitar padrões mecânicos repetidos.
- [ ] Canonical, breadcrumb, sitemap e status de indexação revisados.

Se não passar, **não publicar como `index`**. Preferir não criar ainda, consolidar o assunto na página existente ou manter rascunho enquanto se reúne informação própria.

---

## 7. Priorização de Rollout (Ordem de Implementação)

### Fase 1 — Hubs de Zonas da Capital (Executar Primeiro)

Criar/validar primeiro as páginas de entrada das zonas com demanda observada e cobertura confirmada. Depois, publicar os serviços como filhas de cada hub (por exemplo, `/moveis-planejados-zona-leste-sp/cozinha-planejada/`). A abrangência maior da zona não dispensa informação útil nem comprovação de atendimento.

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

Os hubs de distritos ficam diretamente na raiz, com `-sp`, sem `/sao-paulo/` intermediário. Exemplo: `/moema-sp/` e seus serviços em `/moema-sp/cozinha-planejada/`. Priorizar pelos distritos já existentes no site. A ordem final deve considerar demanda observada, cobertura e evidência local; hipóteses sobre renda, perfil dos imóveis e potencial premium precisam ser confirmadas antes de virarem afirmações editoriais.

1. Moema — avaliar potencial de imóveis verticais e projetos de padrão elevado com dados verificáveis.
2. Pinheiros — validar perfil dos imóveis, demanda e serviços mais procurados.
3. Vila Mariana — avaliar densidade, tipos de imóveis e intenção de busca.
4. Lapa — priorizar conforme demanda e cobertura confirmadas.
5. Santo André / São Bernardo / Diadema (ABC — confirmar atendimento com o dono).

### Fase 4 — Bairros (Apenas com Prova Local)

Quando qualificados, os hubs de bairros também ficam diretamente na raiz e terminam em `-sp`, por exemplo `/vila-madalena-sp/`; os serviços entram depois do hub. Aguardar prova local conforme a seção 1 antes de publicar como `index`. Manter páginas em rascunho ou `noindex` como preparação técnica, sem usar isso como justificativa para gerar páginas finas em escala.

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
    { "@type": "ListItem", "position": 2, "name": "Moema (São Paulo)", "item": "https://urlprincipal.com/moema-sp/" },
    { "@type": "ListItem", "position": 3, "name": "Cozinhas Planejadas em Moema", "item": "https://urlprincipal.com/moema-sp/cozinha-planejada/" }
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

1. `_base.js` define o esqueleto HTML com placeholders: `{{servico}}`, `{{local}}`, `{{tipoLocalidade}}`, `{{hubPath}}`, `{{pagePath}}`, `{{parentPath}}`, dados comprovados da localidade, dados do mapa e briefing editorial.
2. Cada `[pilar].js` fornece: nome do serviço, variações (N2), intent, vocabulário pertinente, perguntas reais, dados comprovados e módulos de conteúdo específicos.
3. `build-servicos-locais.js` itera localidades qualificadas × pilares × variações e gera arquivos conforme o tipo de localidade: município (`pages/[cidade]/[servico]/index.html`), distrito/bairro (`pages/[local]-sp/[servico]/index.html`) ou zona (`pages/[hub-zona]/[servico]/index.html`), respeitando o padrão real do projeto.
4. Toda página N1 recebe o caminho do hub como pai; toda N2 recebe a URL N1 como pai. O gerador escolhe uma ordem contextual e estável para os módulos editoriais, inclui sempre a section do mapa e não repete a mesma sequência mecanicamente em todas as páginas. Breadcrumbs, links internos, canonical e sitemap devem usar o mesmo caminho final.
5. Após geração: `node tools/check-site.js` → **deve retornar "Sem problemas."** (obrigatório antes de commit). Rodar também uma revisão de similaridade textual/n-gramas para sinalizar blocos repetidos e revisar manualmente os alertas.

### 9C. Validação Obrigatória

```bash
# Após qualquer geração de páginas locais:
node tools/check-site.js
# Resultado esperado: "Sem problemas."

# Verificar colisão de slugs antes de criar:
# conferir caminho completo e relação pai/filha no diretório pages/
```

### 9D. Referência a Geradores Existentes

- `tools/build-layouts.js` — gerador de páginas de serviço nacional (referência de padrão)
- `tools/build-sao-paulo.js` — gerador de distritos/bairros (já tem regra de colisão de slugs)
- Novos geradores devem seguir o mesmo padrão de output e validação

---

## 10. Regras de Nomenclatura de Slugs e Caminhos

| Regra | Correto | Errado |
|---|---|---|
| Sempre kebab-case | `cozinha-planejada` | `cozinhaplanejada` |
| Português sem acentos | `sao-paulo`, `guarulhos` | `são-paulo`, `guarulhós` |
| Município como primeiro segmento | `/osasco/cozinha-planejada/` | `/cozinha-planejada-osasco/` como padrão de município |
| Distrito de SP com hub direto na raiz e `-sp` | `/moema-sp/cozinha-planejada/` | `/sao-paulo/moema/cozinha-planejada/` |
| Bairro de SP com hub direto na raiz e `-sp` | `/vila-madalena-sp/closet-planejado/` | `/sao-paulo/vila-madalena/closet-planejado/` |
| N2 dentro da categoria-mãe | `/moema-sp/cozinha-planejada/cozinha-pequena/` | `/cozinha-pequena-planejada-moema/` como página solta sem relação interna |
| Zona com hub descritivo preservado | `/moveis-planejados-zona-leste-sp/cozinha-planejada/` | Criar hub concorrente para a mesma intenção sem motivo |
| Sem número de versão ou data | `cozinha-planejada` | `cozinha-planejada-2024` |

**Regra de identificação local:** para distritos e bairros da cidade de São Paulo, acrescentar `-sp` ao slug do hub (`moema-sp`, `pinheiros-sp`, `vila-madalena-sp`). O serviço aparece no segmento seguinte. Não acrescentar `/sao-paulo/` antes do hub. Para municípios, usar o nome do município no primeiro segmento (`/osasco/`, `/santos/`).

---

## 11. O Que Este Documento NÃO Autoriza

- ❌ Criar páginas de bairro específico sem pelo menos 1 projeto entregue documentado, conforme a regra de qualificação da seção 1.
- ❌ Inventar dados demográficos, metragens típicas, perfil de moradores, características arquitetônicas ou desafios logísticos.
- ❌ Inventar depoimentos, fotos, projetos, avaliações, parceiros, prazos, preços, garantias, certificações ou endereços.
- ❌ Publicar páginas locais repetitivas que só trocam o nome da cidade/bairro ou que encaminham o usuário para o mesmo destino sem valor próprio.
- ❌ Criar páginas para cidades fora da área de atendimento sem confirmação operacional.
- ❌ Publicar como `index` página que não passe pelo checklist editorial da seção 6.
- ❌ Criar automaticamente todas as combinações de localidade × serviço × variação de palavra-chave.
- ❌ Declarar fabricação própria, equipe, showroom ou unidade local se a operação é intermediadora e isso não corresponde à realidade.
- ❌ Usar intenção de "projeto 3D grátis" como CTA — esse cluster é DIY, não converte para o serviço.
- ❌ Usar `/sao-paulo/` como pasta intermediária obrigatória para distritos e bairros da capital; usar hubs próprios na raiz com `-sp` (ex.: `/moema-sp/`).
- ❌ Criar páginas locais sem a section obrigatória de mapa contextualizado e sem esclarecer o que o mapa representa.
- ❌ Aleatorizar conteúdo ou sections sem critério; a ordem pode variar, mas deve preservar contexto, jornada de leitura e estabilidade por URL.

---

## 12. Referências de Qualidade e Política de Busca

As regras editoriais desta versão se alinham às orientações públicas do Google Search Central. Consultar as páginas oficiais antes de ampliar a produção em escala:

- **Criar conteúdo útil, confiável e voltado às pessoas:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content
  - Priorizar informação original, precisão, experiência demonstrável, valor substancial e conteúdo preparado para ajudar o visitante — não apenas atrair tráfego orgânico.
- **Políticas de spam para a Pesquisa Google:** https://developers.google.com/search/docs/essentials/spam-policies
  - Atenção especial a abuso de páginas de entrada (*doorway abuse*) e conteúdo em escala sem valor original. Páginas para cidades/áreas não devem ser quase idênticas nem funcionar apenas como intermediárias para outro destino.
- **Links rastreáveis:** https://developers.google.com/search/docs/crawling-indexing/links-crawlable
  - Usar links HTML rastreáveis e caminhos de navegação claros para que pessoas e mecanismos de busca descubram páginas importantes.

> A estrutura de URL é uma decisão de organização. Ela não substitui demanda real, cobertura efetiva, conteúdo original, utilidade, links internos, qualidade técnica ou uma boa experiência para o visitante.

---

## Apêndice — Localidades Prioritárias para Fase 1 e 2

As linhas abaixo representam hubs de localidade. Municípios, zonas, distritos e bairros seguem os padrões diferentes definidos na seção 2. As páginas de serviço são criadas como filhas do hub correspondente.

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
| Moema | Distrito | 〔inf〕 | Hub direto na raiz: `/moema-sp/` (validar/criar) | 🟡 Média |
| Pinheiros | Distrito | 〔inf〕 | Hub direto na raiz: `/pinheiros-sp/` (validar/criar) | 🟡 Média |
| Vila Mariana | Distrito | 〔inf〕 | Hub direto na raiz: `/vila-mariana-sp/` (validar/criar) | 🟡 Média |

---

*Versão 4 — adota arquitetura híbrida: municípios em `/<cidade>/<servico>/`; zonas, distritos e bairros de São Paulo em hubs diretos na raiz com `-sp`, seguidos pelos serviços. Reforça os critérios de originalidade, relevância, utilidade, diversidade de sintaxe/oratória, controle de n-gramas, ordem contextual e variável das sections e mapa obrigatório por localidade. Preserva como base o levantamento Bing autocomplete (termos-sp.md), o dossiê ICP (ICP_Planejados_SP_Dossie_de_Personas.md) e a arquitetura do site (LEIA-ME.md), sujeitos à validação operacional antes da publicação.*
