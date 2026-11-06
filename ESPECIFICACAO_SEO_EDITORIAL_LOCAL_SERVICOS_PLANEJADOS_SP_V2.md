# ESPECIFICAÇÃO AVANÇADA — SEO EDITORIAL, METADADOS E DIFERENCIAÇÃO LOCAL
## Planejados SP | H1, SEO Title, Meta Description e conteúdo exclusivo por serviço × localidade

**Versão:** 2.0  
**Referência de arquitetura:** `ESTRATEGIA_SERVICO_LOCAL_v4.md`  
**Escopo:** hubs geográficos, páginas de serviços locais N1 e páginas de soluções específicas N2.  
**Público de implementação:** Claude Code / equipe de desenvolvimento e conteúdo.

---

# 0. INSTRUÇÃO PRINCIPAL AO CLAUDE CODE

Leia este documento integralmente e confronte as regras com a versão atual do repositório antes de modificar qualquer arquivo.

Esta especificação aprofunda e substitui a antiga `especificacao-variacao-h1-planejados-sp.md` no que diz respeito a H1, SEO Title, meta descriptions e diferenciação editorial. **Ela não substitui nem revoga a arquitetura definida em `ESTRATEGIA_SERVICO_LOCAL_v4.md`.**

Em caso de conflito:

1. `ESTRATEGIA_SERVICO_LOCAL_v4.md` continua sendo a fonte de verdade para arquitetura de URLs, hierarquia N0/N1/N2, qualificação de localidades, cobertura, indexação, linkagem e requisitos mínimos de conteúdo local.
2. Este documento é a fonte de verdade para a lógica editorial de títulos, metadados, palavras-chave por intenção, diferenciação entre serviços e variáveis de conteúdo.
3. O código existente deve ser inspecionado antes de qualquer alteração. Não presumir que os exemplos deste documento já estejam implementados.
4. Não alterar URLs, slugs, hierarquia de pastas, canonical, robots ou estratégia de indexação por iniciativa própria.
5. Não criar páginas adicionais só porque existem modelos de H1 ou combinações de serviço × localidade. A existência de demanda, cobertura real e conteúdo útil deve justificar cada URL.

**Objetivo central:** fazer cada página responder com precisão a uma intenção de busca específica, demonstrando o serviço, a localidade, as soluções disponíveis e o motivo concreto pelo qual aquela página é útil. A variação de texto é consequência da diferenciação real, não seu substituto.

---

# 1. GÊNESE DO PROJETO E DIAGNÓSTICO DO REPOSITÓRIO

## 1.1. O projeto possui diferentes tipos de páginas — não aplicar uma única fórmula a todas

O repositório trabalha com uma arquitetura de conteúdo que combina páginas nacionais de serviço, hubs geográficos, categorias locais e soluções específicas.

### Camada A — Páginas-pilar nacionais

Exemplos existentes:

- `/cozinhas/`
- `/dormitorios-e-closets/`
- `/banheiros/`
- `/salas/`
- `/lavanderias/`
- `/escritorio-home-office/`
- `/varanda-e-area-gourmet/`
- `/ambientes/`

**Função:** explicar o ambiente ou serviço de maneira abrangente, apresentar possibilidades, materiais, configurações, critérios de escolha, etapas, dúvidas e orientações gerais.

**Intenção:** predominantemente informacional/comercial ampla, sem depender de uma única localidade.

Essas páginas não devem ser tratadas como cópias das respectivas páginas locais. Uma página nacional sobre cozinhas deve ensinar e orientar sobre cozinhas; uma página local sobre cozinha planejada em Osasco deve explicar como aquela solução pode ser considerada para o contexto de Osasco.

### Camada B — Hubs geográficos

Exemplos da arquitetura v4:

- Município: `/osasco/`
- Município: `/santos/`
- Distrito de São Paulo: `/moema-sp/`
- Bairro de São Paulo: `/vila-madalena-sp/`
- Zona da capital: `/moveis-planejados-zona-leste-sp/`

**Função:** apresentar a cobertura naquela localidade, contextualizar a procura por móveis planejados e orientar o visitante para os ambientes e serviços relevantes.

**Intenção principal:** móveis planejados + localidade, marcenaria sob medida + localidade e variações realmente observadas.

### Camada C — Serviço local N1

Exemplos:

- `/osasco/cozinha-planejada/`
- `/osasco/dormitorios-planejados/`
- `/moema-sp/closet-planejado/`
- `/vila-madalena-sp/cozinha-planejada/`

**Função:** responder à procura por um ambiente ou serviço específico naquela região.

**Intenção principal:** serviço/ambiente + localidade.

### Camada D — Solução específica N2

Exemplos previstos na v4:

- `[hub-local]/cozinha-planejada/cozinha-pequena/`
- `[hub-local]/cozinha-planejada/cozinha-com-ilha/`
- `[hub-local]/dormitorios-planejados/quarto-de-casal/`
- `[hub-local]/dormitorios-planejados/quarto-infantil/`
- `[hub-local]/closet-planejado/closet-camarim/`

**Função:** responder a uma necessidade mais específica, sem repetir a página N1.

**Intenção principal:** solução específica + localidade, quando houver demanda e diferenciação suficientes.

A arquitetura de URL acima deve permanecer subordinada à v4. Este documento não autoriza criar todas as combinações possíveis.

## 1.2. Constatações da leitura do código atual

A análise do repositório público identificou os seguintes pontos que precisam ser considerados na implementação:

| Área | Constatação | Direção de melhoria |
|---|---|---|
| `tools/h1-generator.js` | Já existe uma biblioteca de categorias e modelos | Evoluir para seleção orientada por serviço, intenção e localidade |
| Distribuição dos H1 | O código utiliza uma sequência cíclica; o comentário de percentuais não corresponde exatamente à sequência | Corrigir pesos e tornar a distribuição configurável |
| Tipo de localidade | `tipoLocal` é recebido, mas não dirige efetivamente a seleção dos modelos | Implementar regras por tipo de página e contexto gramatical |
| Vocabulário | `obterTermos()` deriva variações por substituição textual de “planejado” por “sob medida” | Usar vocabulário explícito por serviço, sem substituição cega |
| Fallback | Há fallback que pode reduzir o termo à primeira palavra quando o título fica longo | Nunca cortar a intenção; procurar outro modelo e retornar erro se não houver opção válida |
| Duplicidade | A memória atual controla H1 exatamente iguais durante a execução | Verificar duplicidade e repetição estrutural em todo o conjunto de páginas |
| SEO Title | O HTML gerado usa o H1 como base do `<title>` | Gerar SEO Title independentemente do H1 |
| Meta description | O gerador utiliza `servico.desc` | Criar uma descrição própria por URL, serviço e localidade |
| Open Graph | Título e descrição acompanham os metadados da página | Gerar campos alinhados, mas não necessariamente idênticos |
| Mapa local | A v4 exige seção de mapa em páginas locais | Conferir a presença real do bloco no HTML final, não apenas a inclusão de `mapa.js` |
| Publicação | Páginas de serviço locais examinadas possuem `noindex, follow` e canonical com domínio provisório | Preservar o estado até a configuração e aprovação de publicação |

### Problemas específicos do gerador atual

- A função que deriva termos por substituição textual pode produzir combinações semanticamente inadequadas, como acrescentar “sob medida” a um nome de serviço que já descreve uma solução completa.
- A categoria `PROJETO` contém o modelo `Projetos exclusivos em [local]`, que não identifica necessariamente o serviço e pode afirmar exclusividade sem prova.
- Alguns modelos de benefício, como `Ambientes funcionais em [local]`, podem deixar de apresentar a palavra-chave principal do serviço.
- A sequência cíclica depende da ordem de geração. Adicionar ou remover uma página pode alterar quais categorias serão atribuídas às páginas seguintes.
- O conjunto `usados` é memória em execução, não um controle persistente de todo o site.
- A validação atual de H1 não resolve a repetição de Title, meta description, abertura, H2, FAQ e demais blocos.
- No script `build-osasco-v4.js`, existem campos `title` nos objetos de serviço, mas o renderer observado monta o `<title>` com `h1Data.h1`. A implementação deve decidir e respeitar uma única fonte editorial para cada campo, sem deixar configurações ignoradas.
- As páginas locais de cozinha e dormitórios examinadas usam o arquivo `mapa.js`, mas não foi identificado um bloco de mapa explícito no HTML estático consultado. A v4 exige mapa funcional e contextualizado; verificar a implementação efetiva antes de liberar qualquer página para indexação.

Essas constatações devem ser revalidadas no checkout local, pois o repositório pode ter recebido alterações depois da versão consultada.

---

# 2. PRINCÍPIO DE SEO: UMA URL, UMA INTENÇÃO PRINCIPAL

## 2.1. Não escolher palavras-chave por sorteio

A palavra-chave principal de uma página deve ser definida com base em:

- intenção que a URL pretende atender;
- dados de pesquisa disponíveis;
- linguagem usada pelos potenciais clientes;
- aderência ao serviço realmente oferecido;
- relação com as páginas-pai e páginas-irmãs;
- dados do Search Console, quando houver;
- evidência de demanda em ferramentas de pesquisa de palavras-chave.

**Não alternar “móveis planejados”, “móveis sob medida” e “marcenaria” aleatoriamente só para criar diversidade.** São expressões relacionadas, mas não perfeitamente equivalentes em intenção ou oferta.

Cada URL deve ter:

- uma palavra-chave principal;
- um conjunto de termos secundários;
- entidades e conceitos de apoio;
- perguntas relevantes;
- uma intenção de busca explícita;
- páginas concorrentes internas identificadas.

A palavra-chave principal permanece estável. A diversidade ocorre na construção do H1, no ângulo editorial, nos termos de apoio e nas informações específicas — não na troca aleatória do assunto.

## 2.2. Mapa inicial de intenção por tipo de página

| Tipo de página | Intenção principal | Termos de apoio possíveis |
|---|---|---|
| Hub de cidade | móveis planejados em [cidade] | móveis sob medida, marcenaria, projetos residenciais |
| Hub de distrito/bairro | móveis planejados em [localidade] | marcenaria sob medida, ambientes planejados |
| Cozinha local | cozinha planejada em [localidade] | cozinha sob medida, cozinha pequena, cozinha em L, cozinha americana, cozinha com ilha |
| Quarto/dormitório local | quarto planejado em [localidade] OU dormitório planejado em [localidade] | quarto de casal, quarto infantil, móveis para quarto, guarda-roupa planejado |
| Closet local | closet planejado em [localidade] | closet sob medida, armários de closet, organização |
| Sala local | sala planejada em [localidade] | painel de TV, rack sob medida, estante planejada |
| Banheiro local | banheiro planejado em [localidade] | gabinete, armário de banheiro, espelheira |
| Lavanderia local | lavanderia planejada em [localidade] | área de serviço, armários para lavanderia, lava e seca |
| Varanda/gourmet local | varanda gourmet planejada em [localidade] | área gourmet, móveis para churrasqueira, sacada |
| Home office local | home office planejado em [localidade] | escritório planejado, bancada de trabalho |
| Marcenaria comercial local | marcenaria comercial em [localidade] | loja planejada, recepção, consultório, escritório |
| Apartamento compacto local | móveis planejados para apartamento pequeno em [localidade] | studio, apartamento compacto, aproveitamento de espaço |

Esta matriz é uma base semântica, não uma afirmação de volume de busca. Confirmar o termo principal por pesquisa antes de fechar a estratégia de cada URL.

## 2.3. O caso especial de “quarto planejado” × “dormitório planejado”

O repositório possui a página-pilar `/dormitorios-e-closets/` e a categoria local `/dormitorios-planejados/`. O conteúdo atual já menciona quartos de casal, solteiro e infantis, guarda-roupas, cabeceiras e bancadas.

É necessário escolher a expressão principal usando dados de demanda e intenção:

- **“Quarto planejado”**: linguagem mais direta e cotidiana; pode ser a principal se os dados de busca confirmarem maior aderência.
- **“Dormitório planejado”**: linguagem mais técnica/editorial; pode ser principal se a demanda observada ou a estratégia da página justificar.
- **“Guarda-roupa planejado”**: solução específica de armazenamento; não deve substituir a intenção geral de quarto quando a página cobre o ambiente completo.
- **“Closet planejado”**: ambiente/solução própria; deve permanecer semanticamente separado da página ampla de quarto quando a arquitetura tiver uma URL específica.

Não criar dois H1 principais concorrentes na mesma página. Escolher um termo central e utilizar os demais naturalmente no subtítulo, nos H2, nos cards e no texto.

Exemplo de distribuição coerente:

- Página N1: `Quarto planejado em Osasco`
- H2: `Soluções para quartos de casal, solteiro e infantil`
- H3: `Guarda-roupa até o teto`, `Cabeceira integrada`, `Bancada de estudos`
- Página irmã: `Closet planejado em Osasco`
- Página N2, se justificada: `Quarto de casal planejado em Osasco`

---

# 3. CAMPOS DE LOCALIDADE E GRAMÁTICA

Não concatenar a preposição `em` com o nome da localidade de forma indiscriminada. O português exige construções diferentes.

Exemplos:

- em Osasco
- em Barueri
- em Moema
- na Vila Mariana
- na Vila Madalena
- no Morumbi
- no Centro de Osasco
- na Granja Viana
- em Alphaville
- na Zona Leste de São Paulo

O cadastro da localidade deve oferecer a forma contextualizada pronta, revisada e reutilizável.

Campos recomendados:

| Campo | Função | Exemplo |
|---|---|---|
| `locality_name` | Nome principal | Vila Madalena |
| `locality_display` | Nome exibido | Vila Madalena |
| `locality_phrase` | Forma gramatical para títulos | na Vila Madalena |
| `municipality` | Município | São Paulo |
| `state` | UF | SP |
| `geo_level` | Nível geográfico | bairro |
| `parent_locality` | Localidade administrativa superior | São Paulo |
| `macro_region` | Região ampla | Zona Oeste |
| `disambiguation` | Complemento para evitar ambiguidade | Vila Madalena, São Paulo |
| `coverage_status` | Situação de atendimento | confirmado / pendente / não atendido |
| `proof_status` | Situação de prova local | documentada / pendente |
| `sources` | Fontes dos dados locais | URL, órgão, data e trecho |
| `verified_at` | Data de validação | AAAA-MM-DD |

O gerador deve usar `locality_phrase` nos modelos que exigem preposição e `locality_display` nos casos em que o nome aparece sem preposição.

Não modificar o nome oficial ou popular de uma localidade para fazer o título caber. Trocar o modelo é preferível.

---

# 4. SISTEMA DE H1

## 4.1. Regra de comprimento

**Todo H1 deve ter no máximo 60 caracteres.**

A contagem deve acontecer depois de:

1. substituir todas as variáveis;
2. aplicar a forma gramatical da localidade;
3. normalizar o texto em Unicode NFC;
4. remover espaços duplicados;
5. retirar espaços excedentes no início e no fim.

O limite de 60 caracteres é uma regra editorial interna solicitada para o projeto. Não é um limite técnico oficial do Google para H1.

Na implementação JavaScript, não usar truncamento automático. Usar contagem consistente de caracteres Unicode, preferencialmente por grafemas ou code points após normalização NFC, e testar acentos, hífens e caracteres compostos.

Se o modelo ultrapassar 60 caracteres, descartar o candidato e selecionar outro. Nunca cortar palavras, remover a localidade ou reduzir a palavra-chave principal automaticamente.

## 4.2. O que é título puro

Título puro é aquele que não recebe prefixo nem sufixo.

Exemplos:

- Móveis planejados em Osasco
- Cozinha planejada em Osasco
- Quarto planejado em Osasco
- Closet planejado em Moema
- Marcenaria sob medida em Barueri

Títulos puros são desejáveis. Eles são objetivos, reconhecíveis e muitas vezes representam a melhor resposta para a busca.

Não forçar uma frase criativa em toda página.

## 4.3. O que é prefixo

Prefixo é uma expressão colocada antes da palavra-chave principal.

Exemplos:

- Conheça [serviço] em [local]
- Descubra [serviço] em [local]
- Procurando [serviço] em [local]?
- Buscando [serviço] em [local]?
- Encontre [serviço] em [local]
- Seu projeto de [serviço] em [local]

O prefixo modifica a entrada do título, mas não deve apagar o serviço nem a localidade.

Usar com moderação. Expressões como “está em busca de”, “buscando por” e “procurando por” podem soar artificiais quando repetidas em muitas páginas.

## 4.4. O que é sufixo

Sufixo é um complemento colocado depois da construção principal.

Exemplos:

- [serviço] em [local] para sua casa
- [serviço] em [local] para seu lar
- [serviço] em [local] com seu estilo
- [serviço] em [local] para seus ambientes
- [serviço] em [local] sob medida
- [serviço] em [local] para aproveitar melhor o espaço

O sufixo adiciona uma informação ou benefício. Não deve ser usado somente para aumentar o comprimento do título.

## 4.5. Combinações permitidas

O sistema deve aceitar todas as possibilidades abaixo:

| Tipo | Exemplo |
|---|---|
| Puro | Cozinha planejada em Osasco |
| Apenas prefixo | Conheça cozinhas planejadas em Osasco |
| Apenas sufixo | Cozinha planejada em Osasco para seu lar |
| Prefixo + sufixo | Descubra cozinhas planejadas em Osasco para sua casa |
| Construção de benefício | Mais espaço com uma cozinha planejada em Osasco |
| Construção de projeto | Seu projeto de cozinha em Osasco |

Não obrigar a combinação prefixo + palavra-chave + sufixo.

## 4.6. Distribuição editorial

Como ponto de partida para o conjunto de páginas, pode-se trabalhar com uma distribuição aproximada:

| Categoria | Faixa inicial |
|---|---:|
| Puro | 30% a 40% |
| Prefixo | 10% a 20% |
| Sufixo | 15% a 20% |
| Prefixo + sufixo | 0% a 5% |
| Benefício/resultado | 10% a 20% |
| Projeto/personalização | 10% a 15% |

As faixas são orientação editorial, não regra de ranqueamento nem obrigação matemática por pequeno grupo de páginas.

A seleção deve depender também da extensão do nome local, da força da palavra-chave, do tipo de serviço e da naturalidade. Em um conjunto com poucas páginas, não forçar cotas.

## 4.7. Biblioteca geral de H1

Os modelos abaixo são candidatos. O gerador só pode usá-los quando a substituição final permanecer natural, verdadeira e dentro de 60 caracteres.

### Puros

1. `[serviço] em [local]`
2. `[serviço_plural] em [local]`
3. `Móveis planejados em [local]`
4. `Móveis sob medida em [local]`
5. `Marcenaria sob medida em [local]`
6. `Ambientes planejados em [local]`
7. `Projetos de móveis em [local]`
8. `Móveis personalizados em [local]`

### Com prefixo

1. `Conheça [serviço] em [local]`
2. `Descubra [serviço] em [local]`
3. `Procurando [serviço] em [local]?`
4. `Buscando [serviço] em [local]?`
5. `Encontre [serviço] em [local]`
6. `Planeje [ambiente] em [local]`
7. `Seu projeto de [ambiente] em [local]`

### Com sufixo

1. `[serviço] em [local] para seu lar`
2. `[serviço] em [local] para sua casa`
3. `[serviço] em [local] com seu estilo`
4. `[serviço] em [local] para seu espaço`
5. `[serviço] em [local] sob medida`
6. `[serviço] em [local] para seus ambientes`

### Benefícios e projetos

1. `Mais espaço com [serviço] em [local]`
2. `Ambientes funcionais com [serviço] em [local]`
3. `Seu lar com [serviço] em [local]`
4. `Soluções de [ambiente] para [local]`
5. `Projetos personalizados de [ambiente] em [local]`
6. `Planejamento de [ambiente] em [local]`

A biblioteca geral não deve ser aplicada indistintamente a todos os serviços. Os bancos específicos abaixo têm prioridade.

---

# 5. BIBLIOTECAS DE H1 POR SERVIÇO

A palavra-chave principal definida para a URL deve ter prioridade. Os modelos alternativos somente serão utilizados quando forem equivalentes à intenção daquela página.

## 5.1. Cozinha planejada

**Intenção central:** cozinha planejada na localidade.

Modelos puros:

- Cozinha planejada em [local]
- Cozinhas planejadas em [local]
- Cozinha sob medida em [local]
- Projetos de cozinha em [local]

Modelos com prefixo:

- Conheça cozinhas planejadas em [local]
- Procurando cozinha planejada em [local]?
- Sua cozinha planejada em [local]
- Planeje sua cozinha em [local]

Modelos com sufixo:

- Cozinha planejada em [local] para seu lar
- Cozinha sob medida em [local] para sua casa
- Cozinhas planejadas em [local] com melhor aproveitamento

Ângulos semânticos possíveis para o conteúdo:

- cozinha pequena;
- cozinha em L;
- cozinha linear ou paralela;
- cozinha americana;
- cozinha com ilha;
- integração com sala de jantar;
- espaço para geladeira, forno, cooktop e micro-ondas;
- despensa, gavetões, nichos e organização;
- circulação, abertura de portas e acesso às bancadas;
- medidas de eletrodomésticos e pontos hidráulicos/elétricos.

Não afirmar que uma ilha, torre quente ou determinada configuração é viável sem considerar a planta e a circulação disponível.

## 5.2. Quarto e dormitório planejado

**Intenção central:** escolher entre `quarto planejado` e `dormitório planejado` a partir da pesquisa de palavras-chave. Não deixar o gerador alternar os dois termos como se fossem sempre equivalentes em demanda.

Modelos puros:

- Quarto planejado em [local]
- Quartos planejados em [local]
- Dormitórios planejados em [local]
- Quarto sob medida em [local]
- Móveis para quarto em [local]

Modelos com prefixo:

- Conheça quartos planejados em [local]
- Procurando quarto planejado em [local]?
- Planeje seu quarto em [local]
- Seu projeto de quarto em [local]

Modelos com sufixo:

- Quarto planejado em [local] para seu lar
- Quartos planejados em [local] sob medida
- Dormitórios planejados em [local] para sua casa

Ângulos semânticos possíveis:

- quarto de casal;
- quarto de solteiro;
- quarto infantil;
- quarto juvenil;
- guarda-roupa e armário de piso ao teto;
- cabeceira integrada;
- mesas de cabeceira;
- cama com gavetões ou baú, quando oferecida;
- bancada de estudo ou trabalho;
- portas de correr ou de abrir;
- circulação ao redor da cama;
- armazenamento de roupas, calçados, malas e roupa de cama;
- evolução do ambiente conforme a idade da criança.

Não misturar a página de quarto com a página de closet a ponto de apagar a intenção específica de cada uma.

## 5.3. Closet planejado

Modelos puros:

- Closet planejado em [local]
- Closets planejados em [local]
- Closet sob medida em [local]
- Armários para closet em [local]

Modelos com prefixo:

- Conheça closets planejados em [local]
- Seu projeto de closet em [local]
- Procurando closet sob medida em [local]?

Modelos com sufixo:

- Closet planejado em [local] para seu espaço
- Closets sob medida em [local] para sua rotina
- Closet em [local] com organização personalizada

Ângulos semânticos:

- closet aberto ou fechado;
- closet linear, em L ou em U;
- cabideiros, gavetas, sapateiras e nichos;
- espelhos e iluminação, quando disponíveis;
- aproveitamento de cantos e vãos;
- ventilação, acesso e manutenção;
- integração com quarto ou suíte.

## 5.4. Sala planejada e painel de TV

Modelos:

- Sala planejada em [local]
- Salas planejadas em [local]
- Painel de TV planejado em [local]
- Rack sob medida em [local]
- Móveis planejados para sala em [local]
- Projetos de sala em [local]

Ângulos:

- painel de TV;
- rack suspenso ou apoiado;
- estantes e nichos;
- passagem de cabos e tomadas;
- integração com jantar e cozinha;
- armazenamento de equipamentos;
- dimensões da televisão e distância de visualização;
- circulação e composição visual.

Não transformar a página ampla de sala em uma página exclusivamente sobre painel de TV. Usar o painel como solução complementar, salvo quando houver URL específica.

## 5.5. Banheiro e lavabo planejado

Modelos:

- Banheiro planejado em [local]
- Banheiros planejados em [local]
- Móveis para banheiro em [local]
- Gabinete sob medida em [local]
- Lavabo planejado em [local]

Ângulos:

- gabinete suspenso ou apoiado;
- gavetas, portas e nichos;
- espelheira e armário superior;
- espaço para sifão e tubulação;
- dimensões da cuba e bancada;
- ventilação, umidade e limpeza;
- seleção de materiais e ferragens adequados ao ambiente, conforme especificação real.

Não prometer resistência absoluta à água, vapor ou maresia. Qualquer atributo técnico deve ser compatível com a ficha do material e as condições de uso.

## 5.6. Lavanderia e área de serviço

Modelos:

- Lavanderia planejada em [local]
- Lavanderias planejadas em [local]
- Móveis para lavanderia em [local]
- Armários para área de serviço em [local]
- Lavanderia sob medida em [local]

Ângulos:

- máquina de lavar e lava e seca;
- abertura e ventilação dos equipamentos;
- tanque e área molhada;
- armário vassoureiro;
- tulhas e cestos;
- armazenamento de produtos;
- varais e circulação;
- aproveitamento vertical em áreas compactas.

## 5.7. Varanda e área gourmet

Modelos:

- Varanda gourmet planejada em [local]
- Área gourmet planejada em [local]
- Móveis para área gourmet em [local]
- Móveis para varanda em [local]
- Projetos de varanda gourmet em [local]

Ângulos:

- churrasqueira e bancada;
- cervejeira, frigobar e equipamentos;
- armários e nichos;
- integração com sala ou cozinha;
- exposição ao sol, chuva e umidade;
- regras de condomínio e limitações de obra;
- materiais apropriados ao nível de exposição real.

## 5.8. Home office e escritório

Modelos:

- Home office planejado em [local]
- Escritório planejado em [local]
- Móveis para home office em [local]
- Bancada de trabalho sob medida em [local]
- Projetos de escritório em [local]

Ângulos:

- bancada de trabalho;
- altura e profundidade adequadas ao uso;
- monitor, notebook e periféricos;
- tomadas e gerenciamento de cabos;
- iluminação;
- gavetas e armazenamento;
- uso profissional, estudo ou trabalho compartilhado.

Usar “ergonômico” como orientação de projeto, não como certificação ou garantia técnica sem documentação.

## 5.9. Marcenaria comercial

Modelos:

- Marcenaria comercial em [local]
- Móveis comerciais sob medida em [local]
- Projetos para lojas em [local]
- Móveis para consultórios em [local]
- Móveis para escritórios em [local]

Ângulos:

- balcões e recepções;
- expositores e vitrines;
- armazenamento e estoque;
- fluxo de atendimento;
- mobiliário para clínicas e consultórios;
- durabilidade e limpeza;
- acessibilidade e requisitos normativos, quando verificados.

Não afirmar conformidade com normas ou exigências sanitárias sem validação técnica.

## 5.10. Apartamentos compactos e imóveis pequenos

Modelos:

- Móveis para apartamento pequeno em [local]
- Planejados para apartamentos em [local]
- Móveis sob medida para studios em [local]
- Soluções para espaços compactos em [local]
- Móveis planejados para studios em [local]

Ângulos:

- integração de ambientes;
- armários até o teto;
- móveis multifuncionais;
- bancadas retráteis ou extensíveis, quando oferecidas;
- armazenamento vertical;
- circulação;
- medidas reais da planta;
- aproveitamento de nichos, vãos e paredes.

Não criar uma página de metragem específica (por exemplo, 40 m², 46 m² ou 50 m²) sem demanda observada e sem conteúdo realmente relacionado àquela metragem.

---

# 6. SEO TITLE — ELEMENTO INDEPENDENTE DO H1

## 6.1. Função

O SEO Title é o conteúdo do elemento `<title>` no HTML e pode influenciar o link de título mostrado na busca.

Ele deve descrever a página com clareza, incluir a intenção principal e, quando útil, um diferencial verdadeiro.

**Não copiar automaticamente o H1 para o Title.** Os dois precisam estar alinhados, mas podem cumprir funções diferentes.

O Google não estabelece um limite fixo de caracteres para `<title>`; a exibição pode ser truncada conforme a largura disponível. Portanto, não impor o limite de 60 caracteres do H1 ao SEO Title.

Como orientação editorial, buscar títulos concisos, informativos e sem repetições. A largura em pixels e a leitura natural importam mais do que atingir uma contagem matemática.

## 6.2. Estrutura recomendada

Para páginas locais:

`[palavra-chave principal] em [localidade] | [diferencial específico]`

Alternativas:

- `[serviço] em [localidade] — [solução principal]`
- `[serviço] em [localidade] | [ambiente/variação relevante]`
- `[serviço] em [localidade] | Como funciona e orçamento`

A marca poderá aparecer no final quando contribuir para reconhecimento e não transformar todos os títulos em modelos longos e repetitivos.

Não usar a mesma cauda de marca e a mesma lista de serviços em todas as URLs. A marca deve ser inserida de forma concisa e consistente com a identidade real do site.

## 6.3. Exemplos de SEO Title

| Página | SEO Title candidato |
|---|---|
| Hub Osasco | Móveis planejados em Osasco \| Soluções para cada ambiente |
| Cozinha Osasco | Cozinha planejada em Osasco \| Layouts e soluções |
| Quarto Osasco | Quarto planejado em Osasco \| Casal, solteiro e infantil |
| Closet Osasco | Closet planejado em Osasco \| Armários e organização |
| Cozinha Moema | Cozinha planejada em Moema \| Projetos para apartamentos |
| Home office Pinheiros | Home office planejado em Pinheiros \| Bancadas e organização |
| Área gourmet Barueri | Varanda gourmet planejada em Barueri \| Móveis sob medida |

Os exemplos são modelos editoriais. Confirmar que cada característica anunciada existe no conteúdo e na operação.

## 6.4. O que evitar

- `<title>` idêntico em todas as páginas, mudando apenas uma localidade.
- Repetição de sinônimos: “móveis planejados, móveis sob medida, marcenaria planejada...” no mesmo título.
- Listas longas de ambientes sem relação com a página.
- Promessas vagas como “a melhor empresa”, “o menor preço” ou “número 1”.
- Incluir marca em todas as páginas se o nome ocupar espaço sem acrescentar reconhecimento.
- Título que anuncia “projeto 3D grátis” se a condição não estiver comprovada e disponível naquela página.

---

# 7. META DESCRIPTION — RESUMO ÚTIL E EXCLUSIVO

## 7.1. Função

A meta description deve resumir o que a pessoa encontrará, destacar o aspecto mais útil daquela página e, quando fizer sentido, sugerir um próximo passo.

O Google pode usar a meta description, mas também pode montar o snippet a partir do conteúdo da página, conforme a consulta. Portanto, a descrição não deve ser tratada como texto que controla obrigatoriamente o snippet.

## 7.2. Orientação de tamanho

Adotar como referência editorial inicial algo próximo de 140 a 160 caracteres, sem transformar isso em regra rígida.

Não cortar frases artificialmente para atingir um número exato. Descrição curta e específica é preferível a uma descrição maior com repetições.

## 7.3. Estrutura recomendada

Uma descrição local pode combinar:

1. serviço e localidade;
2. duas ou três soluções concretas;
3. contexto ou diferencial verdadeiro;
4. ação que o visitante pode realizar.

Modelo:

`[Serviço] em [localidade]. [Soluções específicas e contexto]. [Orientação ou próximo passo].`

## 7.4. Exemplos por página

**Hub de cidade — Osasco**

`Conheça soluções de móveis planejados em Osasco para cozinhas, quartos, closets e outros ambientes. Entenda o atendimento e solicite uma avaliação.`

**Cozinha planejada — Osasco**

`Veja opções de cozinha planejada em Osasco, de layouts compactos a cozinhas integradas. Conheça os pontos que influenciam o projeto e peça uma avaliação.`

**Quarto planejado — Osasco**

`Quarto planejado em Osasco para casal, solteiro e infantil. Explore soluções para guarda-roupas, cabeceiras e bancadas conforme as medidas do ambiente.`

**Closet planejado — Moema**

`Closets planejados em Moema com opções de armários, gavetas, cabideiros e nichos. Veja como organizar o espaço e quais medidas ajudam no orçamento.`

**Lavanderia planejada — Barueri**

`Planeje a lavanderia em Barueri considerando máquina, tanque, armários e circulação. Veja soluções para organizar a área de serviço e solicitar orçamento.`

As descrições acima são exemplos de redação. Só manter itens, serviços, projeto 3D, medição, orçamento e etapas se estiverem disponíveis de fato.

## 7.5. Regras de qualidade

- Criar uma meta description por URL.
- Não repetir a mesma descrição mudando apenas o nome do local.
- Não empilhar palavras-chave.
- Não prometer preço, prazo, instalação, garantia ou gratuidade sem comprovação.
- Não usar chamada genérica sem descrever a página.
- Não escrever uma descrição que contradiga o H1, o SEO Title ou o conteúdo visível.
- Se a página não possuir informação própria suficiente, revisar sua necessidade de publicação em vez de inventar um resumo.

---

# 8. SUBTÍTULO, ABERTURA, EYEBROW E CTA

Os elementos do hero devem se complementar, não repetir a mesma frase em quatro formatos.

## 8.1. H1

Identifica o assunto central da página.

Exemplo:

`Quarto planejado em Osasco`

## 8.2. Eyebrow

É um rótulo curto de contexto. Não precisa repetir o H1.

Exemplos:

- Dormitórios e organização
- Projetos para quartos
- Ambientes residenciais
- Cozinhas sob medida
- Soluções para espaços compactos

## 8.3. Subtítulo/lead

Deve responder rapidamente o que a página oferece e acrescentar uma informação que não esteja simplesmente repetindo o H1.

Exemplo:

`Soluções para quartos de casal, solteiro e infantis, com atenção às medidas da cama, circulação, guarda-roupa e armazenamento.`

## 8.4. CTA

O CTA deve expressar a ação de maneira direta e coerente com o processo real.

Exemplos:

- Solicitar avaliação do projeto
- Enviar medidas para orçamento
- Conversar sobre meu ambiente
- Ver como funciona o atendimento
- Pedir orientação para meu quarto

Não repetir a palavra-chave completa em todos os botões apenas para produzir densidade.

---

# 9. DIFERENCIAÇÃO REAL: SERVIÇO × LOCALIDADE

## 9.1. A unidade editorial é a combinação

O briefing de cada página deve nascer da combinação entre:

- serviço;
- localidade;
- intenção;
- perfil do imóvel;
- necessidade do usuário;
- evidências disponíveis;
- soluções viáveis;
- etapa de decisão.

Exemplo:

`cozinha planejada × Osasco`

é diferente de:

`cozinha planejada × Moema`

Não porque o nome da cidade mudou, mas porque as informações locais, a cobertura, os tipos de imóvel comprovados, as dúvidas e as soluções pertinentes podem ser diferentes.

## 9.2. Dados de localidade que o gerador pode utilizar

Aproveitar e ampliar os campos já previstos em `base_localidades_moveis_planejados_sp.md`.

| Variável | O que registrar | Uso editorial |
|---|---|---|
| Nome e tipo geográfico | Cidade, distrito, bairro, zona, condomínio | Precisão do texto e da navegação |
| Município e região macro | Município, UF, zona/corredor | Desambiguação e cobertura |
| Perfil imobiliário | Casas, apartamentos, studios, sobrados, condomínios | Contextualização dos ambientes |
| Metragens | Faixas identificadas em fontes ou projetos | Orientações específicas, sem generalização |
| Características urbanas | Densidade, verticalização, idade do imóvel, quando comprovadas | Explicar limitações ou oportunidades |
| Referências locais | Parques, avenidas, estações e centros comerciais | Orientação geográfica e mapa |
| Logística | Acesso, distância, regras de condomínio e agendamento | Explicar atendimento e execução |
| Demanda | Palavras-chave observadas e origem dos dados | Definir prioridade e intenção |
| Projetos locais | Fotos, planta, depoimento, estudo de caso | Prova concreta e conteúdo único |
| Cobertura | Bairros e localidades efetivamente atendidos | Não prometer atendimento inexistente |
| Atualização | Fonte e data de validação | Evitar informação desatualizada |

## 9.3. Não transformar hipóteses em fatos

A base de localidades possui informações de perfil imobiliário e comportamento de compra que podem incluir hipóteses.

O gerador deve distinguir:

- **Fato verificado:** possui fonte, data ou evidência identificável.
- **Observação documentada:** possui base identificável, mesmo que não seja estatística oficial.
- **Hipótese editorial:** pode orientar pesquisa, mas não deve ser publicada como fato.
- **Informação pendente:** não utilizar em afirmações públicas.

Exemplos de afirmações que exigem comprovação:

- “A maioria dos apartamentos da região possui 70 m².”
- “Os condomínios exigem agendamento de carga e descarga.”
- “A região tem predominância de imóveis de alto padrão.”
- “Os moradores procuram principalmente closets.”
- “Entregamos em todos os bairros da cidade.”

Referências a parques, avenidas e estações podem ajudar a orientar o mapa, mas não demonstram por si só que a empresa atende naquela região ou que determinado tipo de imóvel predomina ali.

## 9.4. Exclusividade por conexão, não por adjetivo

Uma página não fica exclusiva apenas porque contém:

- o nome do bairro;
- o nome de um parque;
- uma frase com “sob medida”;
- uma lista de benefícios;
- uma foto genérica de ambiente;
- um mapa sem informação útil.

A exclusividade deve aparecer na conexão entre uma característica comprovada e uma recomendação pertinente ao serviço.

Exemplo de raciocínio editorial:

1. Evidência: a localidade possui determinado conjunto de imóveis ou uma planta documentada.
2. Implicação: essa característica influencia armazenamento, circulação, instalação ou escolha de layout.
3. Aplicação: a página explica uma solução adequada, seus limites e o que precisa ser medido.
4. Utilidade: o visitante entende o que deve avaliar antes de solicitar orçamento.

---

# 10. MATRIZ DE INFORMAÇÕES EXCLUSIVAS POR SERVIÇO

A seguir estão os ângulos que podem diferenciar as páginas sem inventar particularidades locais.

| Serviço | Informação técnica útil | Pergunta do usuário | O que pode diferenciar a página |
|---|---|---|---|
| Cozinha | Layout, circulação, eletrodomésticos, pontos hidráulicos/elétricos, armazenamento | Qual formato cabe na minha cozinha? | Aplicação dos layouts às plantas e medidas locais comprovadas |
| Quarto | Medidas da cama, portas do armário, circulação, cabeceira, bancada | Como aproveitar o quarto sem apertar a circulação? | Soluções para casal, solteiro ou infantil conforme o imóvel e o público |
| Closet | Tipologia, cabideiros, gavetas, sapateiras, nichos, ventilação | Closet aberto ou fechado: qual funciona melhor? | Organização de vãos, formatos e limitações dos imóveis |
| Sala | Painel, rack, cabos, tomadas, equipamentos, integração | Como organizar TV e armazenamento? | Relação entre sala integrada, dimensões e equipamentos |
| Banheiro | Cuba, sifão, umidade, ventilação, espelho e limpeza | Qual gabinete cabe no espaço disponível? | Soluções compatíveis com área molhada e materiais especificados |
| Lavanderia | Máquina, tanque, varal, ventilação, produtos e armários | Como organizar uma área de serviço pequena? | Aproveitamento vertical e compatibilidade com equipamentos |
| Varanda gourmet | Churrasqueira, bancada, calor, umidade, equipamentos e condomínio | Que móveis podem ficar na varanda? | Condições de exposição e regras reais do condomínio |
| Home office | Bancada, cadeira, monitor, iluminação, cabos e armazenamento | Como montar um espaço de trabalho funcional? | Uso diário, espaço disponível e equipamentos |
| Comercial | Atendimento, fluxo, exposição, estoque, limpeza e acessibilidade | Como organizar uma loja ou recepção? | Necessidades operacionais do estabelecimento |

As recomendações técnicas precisam ser compatíveis com o projeto, os materiais e os fornecedores disponíveis. Não apresentar medidas universais como se fossem obrigatórias para todos os imóveis.

---

# 11. EXCLUSIVIDADE EDITORIAL POR TIPO DE PÁGINA

## 11.1. Hub de cidade

A página deve responder:

- Qual é a área efetivamente atendida?
- Quais ambientes podem ser solicitados?
- Qual é o perfil dos imóveis, quando houver dado confiável?
- Como funciona o atendimento?
- Quais são as etapas, responsabilidades e próximos passos?
- Quais páginas de serviços locais são realmente relevantes?

O hub não deve se transformar em uma cópia de cada página de ambiente. Sua função é orientar e distribuir o interesse para as categorias adequadas.

## 11.2. Hub de distrito ou bairro

Além da função de navegação, deve explicar a relação daquela região com os serviços oferecidos.

Possibilidades de informação, se comprovadas:

- tipos de imóveis;
- condomínios e empreendimentos;
- características de acesso;
- referências geográficas;
- projetos realizados;
- soluções com maior aderência;
- cobertura real.

Não publicar como página indexável se não houver justificativa local suficiente. A v4 estabelece critérios específicos para bairros e empreendimentos, incluindo prova local.

## 11.3. Serviço local N1

É a página em que a diferenciação deve ser mais evidente.

Exemplo: `/osasco/dormitorios-planejados/`

A página não deve repetir a página nacional de dormitórios nem ser um texto genérico com “Osasco” inserido.

Deve abordar:

- o ambiente e suas principais configurações;
- os problemas que o serviço resolve;
- as decisões de projeto;
- a relação com os imóveis da localidade, quando comprovada;
- a logística e cobertura;
- as dúvidas de orçamento;
- como o usuário avança para o atendimento.

## 11.4. Serviço específico N2

Uma página de `quarto-de-casal`, por exemplo, deve tratar do quarto de casal como necessidade principal, e não repetir todo o conteúdo da categoria de dormitórios.

Ela pode aprofundar:

- dimensões da cama;
- circulação lateral e frontal;
- divisão interna do guarda-roupa;
- mesas de cabeceira;
- cabeceira e iluminação;
- armazenamento;
- integração com closet, quando pertinente.

Só criar/publicar N2 quando a intenção de busca for distinta, houver demanda e existir informação suficiente para uma página útil.

---

# 12. MODELO DE BRIEFING EDITORIAL POR URL

Antes de gerar qualquer página, construir um briefing estruturado.

Exemplo de formato:

```json
{
  "page_type": "local_service_n1",
  "url": "/osasco/dormitorios-planejados/",
  "locality": {
    "name": "Osasco",
    "geo_level": "municipality",
    "municipality": "Osasco",
    "state": "SP",
    "phrase": "em Osasco",
    "coverage_status": "confirmed",
    "local_proof_status": "pending",
    "verified_facts": [],
    "hypotheses": [],
    "sources": []
  },
  "service": {
    "id": "bedroom_planned",
    "canonical_name": "Quarto planejado",
    "primary_keyword": "quarto planejado em Osasco",
    "secondary_keywords": [
      "dormitórios planejados em Osasco",
      "quarto de casal planejado",
      "quarto infantil planejado",
      "guarda-roupa planejado"
    ],
    "search_intent": "commercial_local",
    "solutions": [
      "quarto de casal",
      "quarto de solteiro",
      "quarto infantil",
      "cabeceira",
      "guarda-roupa",
      "bancada de estudos"
    ]
  },
  "editorial": {
    "angle": "organização, armazenamento e circulação por tipo de quarto",
    "audience": "pessoa que está planejando mobiliar ou reformar o quarto",
    "decision_stage": "consideration",
    "local_evidence_ids": [],
    "service_evidence_ids": [],
    "priority_questions": [],
    "recommended_modules": [],
    "claims_to_avoid": []
  }
}
```

O exemplo é ilustrativo. Não preencher `verified_facts`, prova local, cobertura ou soluções com dados inventados.

O briefing deve ser a fonte de dados para H1, Title, Description, abertura, headings, módulos, FAQ, links e relatório.

---

# 13. VARIAÇÃO DE HEADINGS E ORDEM DAS SECTIONS

## 13.1. O H1 não resolve sozinho a repetição

Não adianta variar o H1 e manter em todas as URLs:

- o mesmo H2;
- o mesmo subtítulo;
- o mesmo parágrafo de abertura;
- os mesmos cards;
- as mesmas perguntas;
- a mesma ordem de módulos;
- o mesmo CTA;
- as mesmas frases de transição.

A variação precisa acompanhar a intenção e a informação de cada página.

## 13.2. Exemplos de H2 para páginas de quartos

Evitar usar sempre `O que muda no projeto sob medida em [local]`.

Alternativas contextuais:

- Soluções para quartos de casal e solteiro
- Como organizar guarda-roupa, cama e circulação
- O que considerar antes de planejar o quarto
- Cabeceiras, armários e bancadas no mesmo ambiente
- Como aproveitar paredes e espaços disponíveis
- Planejamento de quartos infantis e juvenis
- Quais medidas ajudam a definir o projeto

## 13.3. Exemplos de H2 para cozinhas

- Qual layout combina com sua cozinha?
- Armários, gavetões e aproveitamento vertical
- Cozinha pequena: decisões que fazem diferença
- Ilha ou bancada: o que a planta permite?
- Eletrodomésticos e medidas antes do projeto
- Integração entre cozinha e sala

## 13.4. Exemplos de H2 para closets

- Como dividir o espaço interno do closet
- Cabideiros, gavetas e sapateiras
- Closet aberto ou com portas?
- Aproveitamento de cantos e paredes
- O que medir antes de solicitar o projeto

## 13.5. Ordem variável, sem embaralhamento

A v4 determina que a abertura permaneça no início, o CTA final próximo ao encerramento e o mapa esteja em posição coerente. O meio da página pode variar conforme o conteúdo.

Sequências possíveis:

**Sequência A — foco no problema**

1. Abertura e resposta direta
2. Soluções para o ambiente
3. Contexto local comprovado
4. Mapa e área de atendimento
5. Como funciona o atendimento
6. Orientações para orçamento
7. Dúvidas frequentes
8. Serviços relacionados
9. CTA final

**Sequência B — foco na localidade**

1. Abertura e resposta direta
2. Contexto dos imóveis da região
3. Mapa e cobertura
4. Soluções pertinentes ao serviço
5. Logística e execução
6. Orientações para orçamento
7. Prova visual ou estudo de caso
8. Serviços relacionados
9. CTA final

**Sequência C — foco na decisão**

1. Abertura e resposta direta
2. Como funciona o projeto
3. O que influencia medidas e orçamento
4. Soluções e configurações
5. Mapa e cobertura
6. Perguntas frequentes
7. Prova local, quando existente
8. CTA final

A sequência deve ser definida de maneira determinística por URL/briefing, para que não mude a cada carregamento. Não incluir uma section sem informação útil só para conseguir uma ordem diferente.

---

# 14. FAQ: DÚVIDAS REAIS, NÃO REPETIÇÃO DE PALAVRAS-CHAVE

As perguntas devem nascer da combinação serviço × localidade e da etapa de decisão.

### Perguntas possíveis para quarto planejado

- O que preciso medir antes de planejar o quarto?
- É possível integrar guarda-roupa, cabeceira e bancada?
- Qual a diferença entre portas de correr e portas de abrir?
- Como aproveitar um quarto pequeno?
- Quais informações ajudam a preparar um orçamento?
- O projeto pode considerar cama, televisão e espaço de estudo?

### Perguntas possíveis para cozinha

- Quais medidas preciso enviar para avaliar a cozinha?
- Como saber se a planta comporta uma ilha?
- O que considerar antes de escolher os eletrodomésticos?
- É possível planejar uma cozinha em L ou americana?
- Quais fatores influenciam o orçamento?

### Perguntas locais

Somente usar perguntas geográficas quando existir resposta concreta:

- O atendimento cobre [localidade]?
- Como é organizado o acesso a condomínios na região?
- Há atendimento em [bairro específico]?
- Como funciona a medição em imóveis localizados em [localidade]?

Não criar FAQ com a mesma pergunta em dezenas de páginas, apenas trocando o nome do bairro.

Não incluir respostas especulativas sobre prazo, cobertura, preço, instalação, garantia ou disponibilidade.

---

# 15. POSICIONAMENTO TRANSPARENTE SOBRE O MODELO DE ATENDIMENTO

A estratégia do repositório descreve o Planejados SP como intermediador, sem fabricação própria.

Essa característica precisa ser respeitada em toda a comunicação.

Não afirmar automaticamente:

- nossa fábrica;
- nossa equipe de fabricação;
- nossos instaladores;
- nossa loja física na localidade;
- nosso showroom;
- nossa unidade em [bairro];
- fabricação própria;
- instalação própria;
- garantia direta;
- prazo garantido;
- projeto 3D gratuito;
- medição gratuita.

Essas afirmações só poderão entrar no conteúdo quando o modelo operacional, os parceiros e as condições comerciais confirmarem a promessa.

Explicar de maneira clara, quando pertinente:

- qual é o papel da plataforma;
- como o interessado é conectado ao profissional ou parceiro;
- quem realiza a medição;
- quem desenvolve ou apresenta o projeto;
- quem fabrica;
- quem entrega e instala;
- quem responde pelo contrato e pela garantia;
- quais condições dependem do fornecedor.

Não atribuir ao site uma estrutura que pertence ao parceiro. Transparência é um diferencial de confiança e deve aparecer no conteúdo, no CTA e nas respostas comerciais.

---

# 16. MAPA, COBERTURA E REFERÊNCIAS GEOGRÁFICAS

A estratégia v4 considera obrigatório o bloco de mapa nas páginas locais publicadas como `index`.

O mapa precisa:

- representar a localidade exata da página;
- utilizar localização geográfica correta;
- possuir título e legenda contextuais;
- explicar a área de atendimento, quando houver cobertura confirmada;
- não sugerir endereço físico ou unidade onde não existe atendimento presencial;
- não transformar pontos de referência em alegações de presença comercial.

Exemplos de títulos:

- Área de atendimento em Osasco
- Referências e cobertura na região de Moema
- Localização de Vila Madalena e entorno
- Atendimento em Barueri e áreas próximas

Variar o título do bloco conforme a função do mapa, não por substituição aleatória.

A auditoria do HTML final deve verificar se o mapa aparece de fato na página e funciona. Incluir `mapa.js` no `<head>` não comprova que a seção está presente, contextualizada e funcional.

---

# 17. IMAGENS, ALT TEXT E PROVA VISUAL

As imagens também precisam representar o assunto da URL.

Regras:

- Priorizar fotos próprias, projetos reais e imagens autorizadas.
- Não apresentar imagem ilustrativa como se fosse projeto entregue na localidade.
- Não reutilizar a mesma imagem principal em todas as páginas quando houver alternativas relevantes.
- Selecionar imagem coerente com o ambiente: quarto para quarto, cozinha para cozinha, closet para closet.
- O atributo `alt` deve descrever o que realmente aparece na imagem, não repetir mecanicamente o H1.
- Não preencher `alt` com listas de palavras-chave.
- Identificar projetos e fotos com contexto e autorização quando isso agregar prova.
- Se a imagem for meramente decorativa, aplicar o tratamento de acessibilidade adequado.

Exemplo:

Ruim: `alt="Quarto planejado em Osasco móveis planejados quarto sob medida"`

Melhor, se a imagem realmente mostrar isso: `alt="Quarto de casal com guarda-roupa planejado e cabeceira integrada"`

Não afirmar que a foto é de Osasco se a origem não estiver confirmada.

---

# 18. ANTI-CANIBALIZAÇÃO E LINKAGEM INTERNA

## 18.1. Uma página não deve disputar a função de outra

Exemplo de separação:

| URL | Tema que deve dominar |
|---|---|
| `/dormitorios-e-closets/` | Guia amplo sobre dormitórios e closets |
| `/osasco/` | Móveis planejados e cobertura em Osasco |
| `/osasco/dormitorios-planejados/` | Quarto/dormitório planejado em Osasco |
| `/osasco/closet-planejado/` | Closet planejado em Osasco |
| `/osasco/dormitorios-planejados/quarto-de-casal/` | Quarto de casal planejado em Osasco |

O texto pode mencionar assuntos relacionados, mas a página deve manter um foco central.

## 18.2. Âncoras internas

Os links devem antecipar o conteúdo de destino.

Exemplos:

- cozinhas planejadas em Osasco;
- quartos planejados em Osasco;
- closet sob medida em Moema;
- soluções para cozinha pequena;
- projeto de quarto de casal.

Evitar usar sempre “saiba mais”, “clique aqui” ou a mesma âncora repetida em todos os contextos.

## 18.3. Relações recomendadas

- Hub local → serviços N1 relevantes.
- Serviço N1 → hub local correspondente.
- Serviço N1 → soluções N2 relacionadas.
- Serviço N2 → categoria N1 e outras soluções irmãs quando fizer sentido.
- Pilar nacional → páginas locais relevantes, sem transformar o artigo em lista de localidades.
- Breadcrumb → somente URLs existentes e hierarquia real.

Não inventar páginas de destino nem criar links para slugs que ainda não existem.

---

# 19. QUALIFICAÇÃO PARA INDEXAÇÃO E ORIGINALIDADE

Esta especificação deve preservar os critérios já definidos pela v4.

Para considerar uma página local de serviço para publicação como `index`, aplicar os critérios editoriais internos da estratégia v4, incluindo pelo menos três dos cinco elementos locais quando pertinentes e verificáveis:

1. Informação local objetiva.
2. Condições reais dos imóveis.
3. Logística e cobertura efetivas.
4. Contexto arquitetônico e de uso.
5. Prova local.

Esse requisito é uma regra interna do projeto; não é um limiar oficial do Google e não garante indexação ou posicionamento.

Além da contagem, a página deve responder:

- A localidade está dentro da cobertura efetiva?
- O serviço pode ser realmente atendido naquela área?
- A intenção é distinta da página-pai e das páginas irmãs?
- Há conteúdo próprio e útil?
- O visitante entende a oferta, as responsabilidades e o próximo passo?

Se não houver conteúdo suficiente, consolidar na página-pai ou manter fora do índice até existir valor real. `noindex` não deve ser usado como licença para criar páginas finas em escala.

A comparação textual, n-gramas e similaridade podem ser utilizados como **alertas de revisão**. Não criar metas artificiais de percentual de diferença. Não existe uma porcentagem mágica que transforme conteúdo repetitivo em conteúdo útil.

---

# 20. REGRAS DE SEO QUE NÃO DEVEM SER CONFUNDIDAS

## 20.1. H1 de 60 caracteres

É um padrão editorial solicitado para este projeto. Não é limite oficial imposto pelo Google.

## 20.2. SEO Title

Não possui limite técnico fixo de caracteres. Deve ser descritivo, conciso e distinto entre páginas. A exibição pode ser truncada conforme a largura disponível.

## 20.3. Meta description

Não controla obrigatoriamente o snippet. O Google pode selecionar trechos do conteúdo da própria página. A descrição deve ser específica e representar fielmente o material.

## 20.4. Repetição de palavra-chave

Não usar densidade fixa ou repetição mecânica. A palavra-chave deve aparecer nos lugares naturais e importantes, sem prejudicar a leitura.

## 20.5. Variação de sinônimos

Trocar palavras sem mudar a informação não cria exclusividade. Variações precisam refletir intenção, serviço, evidência e orientação útil.

## 20.6. Criação em escala

Não gerar dezenas ou centenas de páginas apenas combinando termos, localidades e frases. Páginas produzidas em escala sem valor original podem se enquadrar nas políticas de abuso de conteúdo em escala e páginas doorway do Google.

---

# 21. MODELO DE METADADOS COMPLETO POR URL

Cada página deverá possuir um objeto editorial explícito e independente.

Exemplo:

```json
{
  "url": "/osasco/cozinha-planejada/",
  "pageType": "local_service_n1",
  "locality": {
    "name": "Osasco",
    "phrase": "em Osasco",
    "geoLevel": "municipality",
    "municipality": "Osasco",
    "state": "SP"
  },
  "service": {
    "id": "kitchen_planned",
    "primaryKeyword": "cozinha planejada em Osasco",
    "secondaryKeywords": [
      "cozinha sob medida em Osasco",
      "cozinha pequena planejada",
      "cozinha em L",
      "cozinha americana",
      "cozinha com ilha"
    ],
    "intent": "commercial_local"
  },
  "metadata": {
    "h1": "Cozinha planejada em Osasco",
    "h1Model": "service_pure_01",
    "seoTitle": "Cozinha planejada em Osasco | Layouts e soluções",
    "metaDescription": "Veja opções de cozinha planejada em Osasco, de layouts compactos a cozinhas integradas. Conheça os pontos que influenciam o projeto e peça uma avaliação.",
    "ogTitle": "",
    "ogDescription": ""
  },
  "editorial": {
    "angle": "layouts e decisões de projeto conforme medidas e equipamentos",
    "localEvidence": [],
    "serviceEvidence": [],
    "faqIds": [],
    "moduleSequence": "kitchen_decision_a"
  },
  "publication": {
    "robots": "noindex, follow",
    "canonical": "a definir com o domínio oficial",
    "approvalStatus": "pending_review"
  }
}
```

O exemplo não autoriza inventar evidências nem alterar a indexação atual. `ogTitle` e `ogDescription` devem ser preenchidos por regra explícita ou receber uma derivação coerente dos metadados aprovados.

---

# 22. ARQUITETURA TÉCNICA RECOMENDADA

## 22.1. Separar os módulos

Evitar concentrar toda a lógica em uma única função com substituições de string.

Estrutura sugerida, adaptável ao projeto existente:

```text
tools/
  seo/
    h1-generator.js
    title-generator.js
    meta-description-generator.js
    editorial-briefing.js
    locality-language.js
    similarity-checker.js
    seo-validation.js
  data/
    services/
      kitchen.js
      bedroom.js
      closet.js
      living-room.js
      bathroom.js
      laundry.js
      gourmet.js
      home-office.js
      commercial.js
      compact-apartment.js
    localities/
      osasco.js
      barueri.js
      moema.js
      ...
```

Não criar esta estrutura cegamente se o projeto já possuir um padrão melhor. O importante é separar responsabilidades e manter uma única fonte de dados por serviço e localidade.

## 22.2. Dicionário explícito de serviço

Cada serviço deve declarar suas próprias formas:

```js
{
  id: "bedroom",
  canonicalName: "Quarto planejado",
  primaryKeyword: "quarto planejado",
  singular: "quarto planejado",
  plural: "quartos planejados",
  relatedTerms: [
    "dormitório planejado",
    "guarda-roupa planejado",
    "cabeceira",
    "bancada de estudos"
  ],
  allowedSolutions: [
    "quarto de casal",
    "quarto de solteiro",
    "quarto infantil"
  ],
  excludedClaims: [
    "fabricação própria",
    "instalação própria"
  ]
}
```

Não tentar deduzir singular, plural, gênero e sinônimos apenas com expressões regulares.

## 22.3. Seleção dos modelos

O gerador deve receber:

- tipo de página;
- serviço;
- palavra-chave principal;
- forma gramatical da localidade;
- extensão dos termos;
- modelos permitidos;
- histórico de títulos;
- restrições editoriais.

Fluxo esperado:

1. Carregar briefing da URL.
2. Identificar palavra-chave principal e intenção.
3. Buscar modelos compatíveis com o serviço.
4. Eliminar construções gramaticalmente inválidas.
5. Substituir as variáveis.
6. Validar o limite de 60 caracteres do H1.
7. Verificar clareza e presença da intenção principal.
8. Comparar H1 e estrutura com o conjunto existente.
9. Selecionar candidato válido.
10. Registrar modelo, categoria e resultado no relatório.

O gerador não deve escolher `quarto` ou `dormitório` aleatoriamente se uma das expressões foi definida como principal para a URL.

## 22.4. Determinismo

A mesma URL e o mesmo briefing devem gerar o mesmo resultado em diferentes execuções, salvo alteração deliberada dos dados ou da versão da biblioteca.

Usar uma seed estável baseada na URL/ID da página ou registrar explicitamente o modelo escolhido no briefing.

Evitar que a ordem do array ou a quantidade de páginas inseridas modifique títulos já publicados sem necessidade.

---

# 23. VALIDAÇÃO AUTOMÁTICA

O relatório deve abranger todas as páginas geradas.

| Campo | Validação |
|---|---|
| URL | Existe e não colide com outra URL |
| Tipo de página | Hub, pilar, N1 ou N2 |
| Palavra-chave principal | Definida e coerente |
| H1 | Obrigatório, único na página e até 60 caracteres |
| Modelo H1 | Registrado |
| SEO Title | Existe, descreve a URL e não é boilerplate |
| Meta description | Existe, é específica e coerente |
| OG Title | Coerente com a página |
| OG Description | Coerente com a página |
| Localidade | Nome e preposição corretos |
| Serviço | Corresponde ao conteúdo real |
| Conteúdo local | Evidências identificadas |
| Mapa | Seção presente, contextualizada e funcional |
| FAQ | Perguntas relevantes e respostas verificadas |
| Links internos | Destinos existentes e âncoras descritivas |
| Imagem | Correspondência com o ambiente e alt descritivo |
| Canonical | URL oficial correta |
| Robots | Política coerente com o estágio de publicação |
| Schema | Dados compatíveis com a entidade e o atendimento reais |

## 23.1. Alertas necessários

O relatório deve sinalizar:

- H1 acima de 60 caracteres;
- H1 duplicado;
- Title duplicado;
- Description duplicada;
- mesma estrutura repetida em sequência excessiva;
- palavra-chave principal ausente do conjunto de elementos centrais;
- localidade sem forma gramatical validada;
- promessa sem evidência;
- página sem briefing;
- página sem prova/contexto suficiente;
- página sem mapa;
- canonical provisório;
- página `index` sem cumprir a qualificação editorial;
- serviço cuja oferta/cobertura está pendente.

Não reprovar automaticamente uma página apenas porque compartilha termos ou estruturas naturais com outra. A similaridade é um sinal para revisão humana.

## 23.2. Relatório de saída

Gerar CSV ou Markdown com:

- URL;
- tipo de página;
- serviço;
- localidade;
- palavra-chave principal;
- H1;
- quantidade de caracteres do H1;
- categoria/modelo do H1;
- SEO Title;
- tamanho aproximado do SEO Title;
- meta description;
- tamanho da description;
- ângulo editorial;
- evidências locais utilizadas;
- sequência de módulos;
- robots;
- canonical;
- status de validação;
- alertas.

---

# 24. CHECKLIST ESPECÍFICO PARA O CASO “QUARTO PLANEJADO”

Antes de aprovar `/osasco/dormitorios-planejados/` ou equivalente:

- [ ] Definir se o foco principal será “quarto planejado” ou “dormitórios planejados” com base nos dados de busca.
- [ ] Manter “guarda-roupa planejado” como termo de apoio ou página específica, conforme intenção.
- [ ] Manter “closet planejado” separado quando houver URL própria.
- [ ] Garantir que o H1 identifique o ambiente e a localidade.
- [ ] Criar SEO Title próprio, sem copiar automaticamente o H1.
- [ ] Criar meta description própria, citando soluções realmente abordadas.
- [ ] Usar imagem principal coerente com quarto/dormitório, não apenas uma foto genérica de closet.
- [ ] Descrever a imagem no `alt`, sem repetir mecanicamente o H1.
- [ ] Criar H2 próprios sobre circulação, guarda-roupa, cabeceira, quarto infantil ou outras necessidades relevantes.
- [ ] Diferenciar os cards de casal, solteiro e infantil com recomendações tecnicamente coerentes.
- [ ] Não inventar metragem típica de Osasco.
- [ ] Não afirmar que um projeto foi executado em Osasco sem prova.
- [ ] Explicar o processo de atendimento e o papel dos parceiros.
- [ ] Verificar o mapa local exigido pela v4.
- [ ] Conectar a página ao hub de Osasco e às páginas de closet e soluções específicas.
- [ ] Manter `noindex` até a aprovação integral dos requisitos de publicação.

---

# 25. EXEMPLOS COMPLETOS DE DIFERENCIAÇÃO

Os exemplos abaixo mostram que é possível variar a apresentação mantendo a intenção.

## Exemplo A — Hub de cidade

**H1:** Móveis planejados em Osasco

**SEO Title:** Móveis planejados em Osasco | Soluções para cada ambiente

**Meta description:** Conheça soluções de móveis planejados em Osasco para cozinhas, quartos, closets e outros ambientes. Entenda o atendimento e solicite uma avaliação.

**Lead:** Os projetos começam pela leitura do espaço, das medidas e da rotina de uso. Escolha o ambiente para conhecer as soluções disponíveis e entender como funciona o atendimento.

## Exemplo B — Cozinha planejada local

**H1:** Cozinha planejada em Osasco

**SEO Title:** Cozinha planejada em Osasco | Layouts e soluções

**Meta description:** Veja opções de cozinha planejada em Osasco, de layouts compactos a cozinhas integradas. Conheça os pontos que influenciam o projeto e peça uma avaliação.

**Lead:** A escolha do layout depende da planta, da posição dos pontos hidráulicos, dos eletrodomésticos e da circulação. Compare configurações antes de definir armários e bancadas.

## Exemplo C — Quarto planejado local

**H1:** Quarto planejado em Osasco

**SEO Title:** Quarto planejado em Osasco | Casal, solteiro e infantil

**Meta description:** Quarto planejado em Osasco para casal, solteiro e infantil. Explore soluções para guarda-roupas, cabeceiras e bancadas conforme as medidas do ambiente.

**Lead:** O projeto do quarto precisa equilibrar cama, armário, abertura das portas e espaço de passagem. As soluções mudam conforme a rotina de quem utiliza o ambiente.

## Exemplo D — Closet local

**H1:** Closet planejado em Moema

**SEO Title:** Closet planejado em Moema | Armários e organização

**Meta description:** Closets planejados em Moema com opções de armários, gavetas, cabideiros e nichos. Veja como organizar o espaço e quais medidas ajudam no orçamento.

**Lead:** A configuração do closet depende dos vãos disponíveis, do tipo de acesso e da quantidade de roupas e acessórios que precisam ser organizados.

## Exemplo E — Home office local

**H1:** Home office planejado em Pinheiros

**SEO Title:** Home office em Pinheiros | Bancadas e móveis planejados

**Meta description:** Conheça soluções de home office planejado em Pinheiros, com bancadas, armazenamento e organização de cabos. Veja o que considerar antes do orçamento.

**Lead:** Um espaço de trabalho funcional começa pela relação entre bancada, cadeira, monitor, iluminação e circulação. As medidas devem acompanhar o uso diário.

Estes exemplos são referências de estrutura. Ajustar todos os dados, serviços e promessas ao briefing real da URL.

---

# 26. PRIORIDADE DE IMPLEMENTAÇÃO NO REPOSITÓRIO

Executar na ordem abaixo, com revisão antes de publicar.

## Etapa 1 — Auditoria e compatibilidade

1. Ler `ESTRATEGIA_SERVICO_LOCAL_v4.md`.
2. Ler `base_localidades_moveis_planejados_sp.md`.
3. Ler `tools/h1-generator.js`.
4. Ler `build-osasco-v4.js`.
5. Inspecionar as páginas nacionais e locais já geradas.
6. Identificar quais metadados são configurados e quais são efetivamente renderizados.
7. Confirmar a situação das páginas `noindex`, canonicals e domínio definitivo.
8. Não substituir arquitetura v4 por uma versão anterior.

## Etapa 2 — Dados editoriais

1. Criar/normalizar o dicionário dos serviços.
2. Definir palavra-chave principal e secundárias por URL.
3. Estruturar os dados gramaticais das localidades.
4. Separar fatos verificados, hipóteses e informações pendentes.
5. Registrar evidências locais e de serviço.
6. Montar briefing editorial por URL.

## Etapa 3 — Metadados

1. Evoluir o gerador de H1.
2. Criar gerador de SEO Title independente.
3. Criar gerador de meta description independente.
4. Alinhar Open Graph, breadcrumb, hero e schema com os dados aprovados.
5. Garantir que o SEO Title não seja sobrescrito pelo H1 no renderer.

## Etapa 4 — Conteúdo

1. Diferenciar H2 e H3 por serviço.
2. Criar banco de dúvidas por ambiente e intenção.
3. Definir módulos adequados ao conteúdo disponível.
4. Variar sequência com lógica editorial e seed estável.
5. Implementar mapas contextuais.
6. Validar imagens e textos alternativos.
7. Rever links internos e páginas N1/N2 para evitar canibalização.

## Etapa 5 — Qualidade e liberação

1. Gerar relatório de todas as URLs.
2. Validar H1 com 60 caracteres.
3. Verificar duplicidade de Title e Description.
4. Revisar promessas e dados locais.
5. Confirmar cobertura efetiva.
6. Validar canonical e robots.
7. Executar os testes técnicos existentes, incluindo `check-site.js` quando aplicável.
8. Só liberar `index` depois de cumprir os critérios da estratégia v4.

---

# 27. CRITÉRIOS DE ACEITE

A implementação só será considerada concluída quando:

- [ ] A arquitetura de URLs da v4 estiver preservada.
- [ ] H1 e SEO Title forem campos independentes.
- [ ] Cada URL possuir palavra-chave principal declarada.
- [ ] Quarto, dormitório, closet e guarda-roupa tiverem papéis semânticos definidos.
- [ ] Prefixos e sufixos forem opcionais.
- [ ] Existirem títulos puros e diretos em quantidade adequada.
- [ ] Nenhum H1 ultrapassar 60 caracteres.
- [ ] A gramática das localidades estiver correta.
- [ ] Titles e meta descriptions forem específicos por página.
- [ ] As páginas locais possuírem briefings próprios.
- [ ] Não houver fatos locais sem fonte ou evidência.
- [ ] Não houver alegações comerciais sem comprovação.
- [ ] As páginas não repetirem mecanicamente a mesma sequência editorial.
- [ ] O mapa obrigatório da v4 estiver presente e funcional nas páginas locais indexáveis.
- [ ] A estratégia de indexação não tiver sido alterada sem aprovação.
- [ ] O relatório final apontar erros, alertas e status de cada URL.

---

# 28. PRINCÍPIO FINAL

O Planejados SP não deve parecer uma coleção de páginas montadas pela substituição do nome de cidades, bairros e serviços.

Cada URL precisa ter uma função clara:

- a página nacional explica o ambiente;
- o hub local apresenta a região e organiza a navegação;
- a página N1 responde à procura por um serviço naquela localidade;
- a página N2 aprofunda uma solução específica.

Os títulos devem refletir essa arquitetura. Alguns H1 serão puros; outros terão prefixo; outros terão sufixo; alguns apresentarão um benefício ou um projeto. A escolha não deve ser aleatória e nunca deve apagar a palavra-chave principal.

O SEO Title precisa vender corretamente o conteúdo do resultado. A meta description precisa resumir o que realmente existe na página. O subtítulo deve completar o H1. Os H2 precisam organizar as decisões do visitante. As informações locais devem ser comprovadas. As soluções devem ser próprias do ambiente. A comunicação deve explicar com transparência como o atendimento funciona.

**A prioridade não é parecer diferente para o Google. É ser uma resposta realmente melhor e mais específica para a pessoa que pesquisa aquele serviço naquela localidade.**

---

# 29. REFERÊNCIAS DO PROJETO E DOCUMENTAÇÃO

## Arquivos do repositório

- [ESTRATEGIA_SERVICO_LOCAL_v4.md](https://github.com/stavososa/planejadossp/blob/main/ESTRATEGIA_SERVICO_LOCAL_v4.md)
- [base_localidades_moveis_planejados_sp.md](https://github.com/stavososa/planejadossp/blob/main/base_localidades_moveis_planejados_sp.md)
- [tools/h1-generator.js](https://github.com/stavososa/planejadossp/blob/main/tools/h1-generator.js)
- [build-osasco-v4.js](https://github.com/stavososa/planejadossp/blob/main/build-osasco-v4.js)
- [Página local de Osasco](https://github.com/stavososa/planejadossp/blob/main/osasco/index.html)
- [Serviço local — cozinha planejada em Osasco](https://github.com/stavososa/planejadossp/blob/main/osasco/cozinha-planejada/index.html)
- [Serviço local — dormitórios planejados em Osasco](https://github.com/stavososa/planejadossp/blob/main/osasco/dormitorios-planejados/index.html)
- [Pilar nacional — dormitórios e closets](https://github.com/stavososa/planejadossp/blob/main/dormitorios-e-closets/index.html)
- [Dossiê de personas — Planejados SP](https://github.com/stavososa/planejadossp/blob/main/ICP_Planejados_SP_Dossie_de_Personas.md)

## Documentação oficial do Google

- [Como influenciar os links de título na Pesquisa Google](https://developers.google.com/search/docs/appearance/title-link?hl=pt-br)
- [Controlar os snippets nos resultados da Pesquisa](https://developers.google.com/search/docs/appearance/snippet?hl=pt-br)
- [Criar conteúdo útil, confiável e que prioriza as pessoas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=pt-br)
- [Políticas de spam para a Pesquisa Google](https://developers.google.com/search/docs/essentials/spam-policies?hl=pt-br)
- [Guia de SEO para iniciantes](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br)

**Nota de implementação:** este documento foi elaborado a partir da estrutura e dos arquivos públicos consultados no branch `main` do repositório. Antes de executar, o Claude Code deve conferir o estado atual do checkout local e preservar eventuais alterações mais recentes que não estejam refletidas nesta análise.
