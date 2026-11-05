# MarcenariaSP — Home (HTML5 + CSS + JS mínimo)

Abra `index.html` por um servidor local (por exemplo `python3 -m http.server`) ou publique a pasta como está.

## Estrutura

```
index.html                 página completa, todo o conteúdo no HTML
assets/css/styles.css      tokens (cores, fontes, espaços, raios) em :root + componentes
assets/js/main.js          menu mobile, validação do formulário, ano do rodapé (3,8 KB)
assets/fonts/              DM Serif Display e Manrope (woff2, subconjunto latin)
assets/img/                ilustrações provisórias em SVG + favicon
```

## Antes de publicar

1. **WhatsApp.** Troque o número em todos os links de uma vez (só dígitos, com 55 e DDD):
   `sed -i 's/WHATSAPP_NUMBER_INTERNATIONAL/55SEUDDDSEUNUMERO/g' index.html`
2. **Canonical e Open Graph.** No `<head>`, descomente e preencha o canonical e acrescente `og:url` e `og:image`.
3. **Imagens.** Troque cada SVG por foto real do projeto, mantendo `width`, `height` e `alt` coerentes:

   | Arquivo | Uso | Proporção | Tamanho mínimo |
   |---|---|---|---|
   | hero-cozinha-planejada-londrina | hero | 16:9 ou 2:1 | 2000x1100 |
   | ambiente-cozinha / closet / sala / home-office | cartões de ambientes | 4:5 | 900x1125 |
   | sobre-marcenaria | seção Sobre | 4:5 | 1000x1250 |
   | projeto-cozinha / closet / sala | galeria | 4:3 e 3:4 | 1200 no lado maior |
   | encerramento-ambiente | chamada final | 16:9 | 1800x1000 |

   Com fotos, use `<picture>` com AVIF e WebP e mantenha `fetchpriority="high"` só no hero:

   ```html
   <picture>
     <source type="image/avif" srcset="assets/img/hero-800.avif 800w, assets/img/hero-1400.avif 1400w, assets/img/hero-2000.avif 2000w" sizes="100vw">
     <source type="image/webp" srcset="assets/img/hero-800.webp 800w, assets/img/hero-1400.webp 1400w, assets/img/hero-2000.webp 2000w" sizes="100vw">
     <img class="hero__media" src="assets/img/hero-2000.jpg" width="2000" height="1100" alt="..." fetchpriority="high" decoding="async">
   </picture>
   ```
   Depois remova a nota "Imagens ilustrativas" da galeria e o `<link rel="preload">` do hero se o arquivo mudar de nome.
4. **Confirmar com a empresa** (comentários `CONFIRMAR` e notas no HTML): cidades atendidas (FAQ), serviços do processo (medição, projeto 3D, instalação), telefone, endereço, Instagram, garantias e prazos.
   **Atenção na área de atendimento.** O site declara "todo o estado de São Paulo: capital, Grande São Paulo e interior", no rodapé, na linha `lp-area` de todas as páginas e no `areaServed` do JSON-LD. Se a operação não instala no interior hoje, isso precisa ser corrigido nos **três** templates antes de publicar — é a afirmação de maior alcance do site inteiro. Ela agora aparece também em `/sobre/#atendimento` e em `/projetos-entregues/#onde`, com cidades nomeadas.
5. **Depoimentos.** A seção foi omitida de propósito. Só publique com avaliações reais e autorização.
6. **Páginas dos ambientes.** Já existem oito e os cartões, o menu e o rodapé apontam para elas. Com o lote institucional, **só o menu do Blog continua com `data-destino-futuro`** — 1 link (o item Blog, agora sem dropdown) em cada uma das 114 páginas.
7. **Formulário.** Ao enviar, abre o WhatsApp com a mensagem pronta (nenhum dado passa por servidor). Para gravar leads em um backend, troque `action`/`method`, adicione `name` aos campos e remova o bloco de envio de `main.js`. A política de privacidade já existe em `/politica-de-privacidade/` e descreve exatamente esse mecanismo — se você trocar o formulário por um backend, ela precisa ser reescrita junto, porque a seção 2 dela afirma que nenhum dado passa por servidor.
8. **Ano do rodapé** atualiza sozinho com JavaScript; o HTML traz 2026 como valor inicial.

## Tradução automática do Chrome

- `<html lang="pt-BR">` declarado, sem `notranslate` na página.
- Todo texto está no DOM como texto real (nada em imagem, nada gerado por CSS ou JS).
- Só o nome da marca usa `translate="no"`.
- Para o Chrome oferecer a tradução, publique em `https` e deixe a página indexável.

## Decisões de design

- Paleta azul petróleo: tokens `--c-*` em `:root`. Contraste calculado e medido nos pixels renderizados (texto normal 4,5:1, texto grande 3:1, bordas de campos 3:1).
- Sobre fotografias, o gradiente do hero e da chamada final foi reforçado em relação ao JSON (início em 0,88 em vez de 0,56) para manter 4,5:1 mesmo com foto clara.
- Movimento: só a entrada do hero ao carregar, o cabeçalho que fica mais sólido ao rolar e a abertura do FAQ. Tudo respeita `prefers-reduced-motion`.
- Ícones: Lucide (ISC) e Simple Icons (CC0), embutidos em um sprite SVG no HTML.

## Geografia: a regra das Camadas A e B

O site nasceu focado em Londrina e foi migrado para o **estado de São Paulo**. Páginas por cidade e por bairro são uma etapa posterior. A migração está registrada em `tools/migrar-sp.js` (páginas geradas) e `tools/migrar-sp-html.js` (home e pilar de cozinha, que não são geradas) — os dois são scripts de uso único, versionados como registro da regra, e não precisam rodar de novo.

A geografia **não é uniforme**. Antes, cada página repetia "em Londrina" umas 17 vezes; isso já era excessivo para uma cidade e, replicado em 83 páginas técnicas, seria geo-stuffing. A regra agora:

| | Quem | Geografia no texto |
| --- | --- | --- |
| **Camada A** | 8 pilares + home + 36 filhas de alta demanda | Em 4 campos: `title`, `h1`, `description` e **uma** H2, com a forma alternando |
| **Camada B** | as filhas restantes (47 até o lote H21; 55 contando as 8 páginas de H07 sem geografia) | **Nenhuma** no texto visível |

Em **todas** as páginas o sinal geográfico fica no JSON-LD: `areaServed: { '@type': 'State', name: 'São Paulo' }`, definido nos dois templates. O rodapé e a linha `lp-area` também são comuns a todas, e falam do estado — isso é chrome, não conteúdo da página.

**A forma alterna** entre `em SP` (curta) e `em São Paulo` (por extenso), entre páginas e dentro da mesma página: metade das páginas da Camada A tem title curto e H1 por extenso, a outra metade inverte, e qual H2 recebe a geografia gira entre `preco.h2`, `projeto.h2` e `final.h2`. Distribuição atual: 32 títulos com `em SP`, 13 com `em São Paulo`, 55 sem geografia. Nenhum título passa de 60 caracteres — quando a forma por extenso estoura esse limite, o título usa a curta.

A lista da Camada A está na constante `CAMADA_A` em `tools/migrar-sp.js`. **Ao criar páginas novas, decida a camada antes de escrever**: termo com demanda real leva geografia, termo técnico ou de cauda longa não leva. É esse acervo sem geografia que permitirá abrir outras praças sem duplicar conteúdo.

## A referência de termos: `tools/termos-sp.md`

**`tools/termos-sp.md` é a referência de termos do projeto.** Ele substitui `tools/hubs.txt` nesse papel — o `hubs.txt` continua valendo como **taxonomia de hubs** (H01, H02, …), mas as 813 palavras-chave dele ainda têm sufixo "londrina" e não devem mais ser usadas como lista literal. Consulte `termos-sp.md` **antes** de decidir a camada e o recorte de qualquer página nova: ele traz, por hub, o termo, a camada e se já existe página.

A fonte é o autocomplete do Bing, coletado com o script novo `tools/bing-sugest.js`:

```bash
node tools/bing-sugest.js -e "termo raiz"     # consulta o termo e o termo + espaço
node tools/bing-sugest.js -f lista.txt        # um termo por linha
```

O par termo / termo-mais-espaço importa: o espaço força o autocomplete a devolver o nível seguinte de modificadores em vez de repetir a raiz.

**Autocomplete não dá volume**, só indica que a busca existe com alguma frequência — e o Bing tem menos tráfego brasileiro que o Google, então a cauda real é provavelmente mais profunda do que aparece. O arquivo marca explicitamente o que é observado e o que é **[inferência]**. As quatro conclusões que mudam o planejamento:

1. **A cauda geográfica é rasa, e onde não é rasa ela é de marca.** Campinas, Osasco, Piracicaba, ABC, Tatuapé, Pinheiros, Morumbi e Alphaville retornam **nada**. Sorocaba, Guarulhos, Jundiaí e Bauru retornam só nome de empresa, ou seja, busca navegacional que página genérica não disputa.
2. **A geografia que o autocomplete reconhece em SP é a ZONA da capital, não o bairro.** Oito termos genéricos de zona observados (`moveis planejados zona leste sp`, `móveis planejados são paulo zona sul`, `marcenaria são paulo zona norte`, `marcenaria no centro de são paulo`…) contra zero termos genéricos de bairro. Se o hub H22 for feito, o recorte certo é zona da capital + as cidades onde a empresa instala.
3. **A cauda de metragem de apartamento é a mais rica do levantamento e o site não cobre nada dela.** `para apartamento de 46m2` apareceu em 9 consultas, `apartamento 50 m2` em 9, `apartamentos de 40m2` em 7, `casa completa` em 5. Já "compacto", "na planta" e "kitnet" **não têm termo próprio**. O H07 deve ser montado por metragem numérica, não pelo recorte literal da planilha.
4. **"Projeto 3D" é dominado por intenção DIY.** Praticamente toda sugestão traz *grátis, online, app, programa, simulador, como fazer*. Quem digita quer software, não marcenaria. O hub H10 deve ser **1 página de conversão**, destino do CTA que as 100 páginas já fazem, e não uma aposta de ranqueamento; o termo aproveitável ali é `modelo de orçamento de móveis planejados`.

## Páginas de ambiente

Oito páginas, uma por item do menu Ambientes. Todas usam `assets/css/lp.css` e `assets/js/lp.js` além do CSS base, e repetem a estrutura da cozinha: primeira dobra com formulário, abas de tipos com esquema em planta, faixas de preço, comparativo, "o que tem dentro", passo a passo, projetos, contrato e garantia, checklist, FAQ e chamada final.

| URL | Hub | Palavra-chave principal | Imagem |
| --- | --- | --- | --- |
| `/cozinhas/` | H01 | cozinha planejada em São Paulo | foto (WebP) |
| `/dormitorios-e-closets/` | H03 | guarda-roupa e closet planejados | foto (WebP) |
| `/salas/` | H02 | móveis planejados para sala, painel de TV | foto (WebP) + 10 filhas |
| `/escritorio-home-office/` | H04 | home office planejado | foto (WebP) + SVG + 3 filhas |
| `/lazer-diversao/` | H04 | espaços de lazer planejados | foto (WebP) + SVG + 6 filhas |
| `/lavanderias/` | H05 | lavanderia e área de serviço planejadas | foto (WebP) + 6 âncoras |
| `/banheiros/` | H05 | banheiro e gabinete planejados | foto (WebP) + 2 filhas |
| `/varanda-e-area-gourmet/` | H06 | varanda gourmet planejada | foto (WebP) + 8 filhas |
| `/para-empresas/` | H13 | móveis planejados comerciais | foto (WebP) + 19 filhas |

A cozinha é editada direto no HTML. As outras sete são **geradas**: o texto fica em `tools/ambientes/pages/<slug>.js` (um arquivo por ambiente), a estrutura em `tools/ambientes/template.js`, e o comando abaixo reescreve os sete `index.html`. Editar o HTML gerado à mão funciona, mas a próxima execução do script sobrescreve.

```bash
node tools/build-ambientes.js
```

Ao publicar um novo ambiente, acrescente-o à lista `AMBIENTES` em `tools/ambientes/template.js` (menu e rodapé saem dela) e repita os links em `site/index.html` e em `site/cozinhas/index.html`, que não são gerados.

### Páginas filhas de layout (hub H01)

Oito páginas de serviço abaixo da cozinha, em `/cozinhas/<layout>/`: `cozinha-pequena-planejada`, `cozinha-compacta-para-apartamento`, `cozinha-corredor-planejada`, `cozinha-em-l-planejada`, `cozinha-em-u-planejada`, `cozinha-com-ilha-planejada`, `cozinha-com-peninsula-planejada` e `cozinha-americana-planejada`. São as linhas de Fase 1 e prioridade Alta do hub H01 no Mapa de Hubs.

São **mais curtas de propósito**, para não concorrer com a pilar. Estrutura: trilha de navegação, primeira dobra com formulário, "funciona quando × pense duas vezes", o que a medição resolve com planta em SVG, três variações do layout, o que pesa no preço, erros comuns, projetos, FAQ de 6 perguntas e links para os outros sete layouts. Prazo, material, contrato, garantia, checklist de orçamento e as faixas de preço por padrão ficam só na pilar, e cada filha aponta para lá — é assim que a canibalização é evitada. O JSON-LD traz `BreadcrumbList` de quatro níveis e `isRelatedTo` apontando para a pilar.

Conteúdo em `tools/ambientes/layouts/<slug>.js`, estrutura em `tools/ambientes/template-layout.js`, registro dos layouts (que alimenta o bloco "outros layouts") em `tools/ambientes/layouts/_base.js`:

```bash
node tools/build-layouts.js
```

As abas da página pilar já apontam para essas filhas. O script `tools/link-pilar-cozinha.js` fez essa troca uma única vez e não precisa rodar de novo. Para conferir links internos, âncoras, ids duplicados e JSON-LD de todas as páginas:

```bash
node tools/check-site.js
```

### Ambientes anexos e módulos (hub H01, Fase 2)

Mais nove páginas na mesma pasta, com o mesmo template: `cozinha-gourmet-planejada`, `copa-planejada`, `despensa-planejada`, `adega-planejada`, `bar-planejado`, `armario-de-cozinha-suspenso`, `balcao-de-cozinha-planejado`, `gabinete-de-pia-planejado` e `cristaleira-planejada`. Com elas, as 18 linhas de página própria do hub H01 estão publicadas.

Elas formam um grupo separado dos layouts: no registro de `_base.js` há duas listas, `LAYOUTS` e `MODULOS`, e cada página lista no fim só as irmãs do seu grupo — quem compara layout não está comparando módulo. A página pilar ganhou a seção `#modulos`, que leva a todas as nove.

As sete palavras-chave que o mapa marca como "seção na página pai" viraram âncoras reais dentro dessas páginas, no bloco de variações:

| Âncora | Onde |
| --- | --- |
| `#despensa-extraivel-planejada` | `/despensa-planejada/` |
| `#cantinho-do-cafe-planejado` e `#cantinho-do-chimarrao-planejado` | `/bar-planejado/` |
| `#armario-de-cozinha-com-bancada` | `/armario-de-cozinha-suspenso/` |
| `#torre-quente-planejada` | `/gabinete-de-pia-planejado/` |
| `#buffet-planejado` e `#aparador-planejado` | `/cristaleira-planejada/` |

Ao criar uma nova página desse grupo, acrescente-a a `MODULOS` em `tools/ambientes/layouts/_base.js` e repita o link na seção `#modulos` da pilar, que é editada à mão.

### Páginas filhas de dormitórios e closets (hub H03, Fase 1)

Quinze páginas em `/dormitorios-e-closets/<slug>/` (os closets ficam aqui, junto da categoria), as de Fase 1 e prioridade Alta do hub, em três grupos:

| Grupo | Páginas |
| --- | --- |
| Guarda-roupas | `guarda-roupa-planejado`, `guarda-roupa-com-portas-de-correr`, `guarda-roupa-embutido` |
| Closets | `closet-planejado`, `closet-pequeno-planejado`, `closet-com-ilha-planejado`, `closet-de-casal-planejado`, `closet-de-sapatos` |
| Quartos | `dormitorio-de-casal-planejado`, `dormitorio-de-solteiro-planejado`, `dormitorio-infantil-planejado`, `quarto-de-bebe-planejado`, `quarto-de-adolescente-planejado`, `quarto-de-hospedes-planejado`, `penteadeira-planejada` |

Mesmo template das filhas de cozinha. Conteúdo em `tools/ambientes/dormitorios/<slug>.js`, grupos em `tools/ambientes/dormitorios/_base.js`, e o mesmo `node tools/build-layouts.js` gera os dois hubs. Cada página lista no fim só as irmãs do seu grupo; a ligação entre grupos é feita pela pilar, que ganhou a seção `#filhas` com as três listas (essa seção é **gerada**, a partir do campo `filhas` em `tools/ambientes/pages/dormitorios-e-closets.js`).

As frases que remetem à pilar — trilha, link de preço, de projetos e de FAQ — saem de `tools/ambientes/pai.js`, que tem uma entrada por hub. Para um hub novo, acrescente a entrada lá (incluindo `path`, que alimenta o JSON-LD) e passe `pai: '<chave>'` no `_base.js` do grupo. Atenção ao campo `voltar`: ele existe porque `.toLowerCase()` no nome da pilar gerava "em londrina" minúsculo.

As 20 palavras-chave que o mapa marca como "seção na página pai" viraram âncoras reais dentro dessas páginas: `#guarda-roupa-com-portas-de-giro`, `#guarda-roupa-com-espelho`, `#guarda-roupa-ate-o-teto`, `#closet-aberto-planejado`, `#closet-fechado-planejado`, `#closet-em-l-planejado`, `#closet-em-u-planejado`, `#closet-de-solteiro-planejado`, `#closet-infantil-planejado`, `#closet-com-portas-de-vidro`, `#closet-com-iluminacao-embutida`, `#closet-de-bolsas`, `#cabeceira-planejada`, `#painel-de-cabeceira`, `#criado-mudo-planejado`, `#berco-planejado`, `#trocador-planejado`, `#comoda-planejada`, `#quarto-de-empregada-planejado` e `#camarim-planejado`.

### Camas (hub H03, Fase 2)

Um quarto grupo na mesma pasta: `cama-planejada` (âncoras `#cama-com-bau`, `#cama-com-gavetas`, `#cama-com-bicama`), `cama-retratil` (`#cama-murphy`, `#cama-suspensa-planejada`) e `beliche-planejado` (`#treliche-planejado`). Com elas, as 18 linhas de página própria do hub H03 e as 26 de seção estão publicadas.

**Confirmar antes de publicar.** Essas três páginas citam limites técnicos que dependem do fornecedor de ferragem: carga do pistão em cama com baú e em cama retrátil, faixa de peso e espessura de colchão suportada por cada sistema retrátil, e altura de guarda-corpo medida sobre o colchão instalado. Os textos pedem que esses números constem no orçamento — confirme que a operação consegue informá-los.

**Nota sobre berço.** A página de quarto de bebê recomenda berço de fábrica certificado em vez de berço em marcenaria, por causa das exigências de segurança. Se a empresa fabricar berço, revise esse trecho antes de publicar.

### Páginas filhas de salas (hub H02, Fase 1)

Dez páginas em `/salas/<slug>/`, as de Fase 1 e prioridade Alta do hub, em dois grupos — os mesmos do Mapa de Hubs:

| Grupo | Páginas |
| --- | --- |
| Painéis, racks e estantes | `painel-de-tv-planejado`, `painel-ripado-planejado`, `rack-planejado`, `home-theater-planejado`, `estante-planejada`, `biblioteca-planejada` |
| Salas e áreas sociais | `sala-de-estar-planejada`, `sala-de-jantar-planejada`, `sala-integrada-planejada`, `hall-de-entrada-planejado` |

Mesmo template das filhas de cozinha e de dormitório. Conteúdo em `tools/salas/<slug>.js`, grupos em `tools/salas/_base.js`, e o mesmo `node tools/build-layouts.js` gera as filhas de todos os hubs (hoje 83 páginas em sete hubs: H01, H02, H03, H04, H05, H06 e H13). Cada página lista no fim só as irmãs do seu grupo; a ligação entre os grupos é feita pela pilar, que ganhou a seção `#filhas` com as duas listas (gerada a partir do campo `filhas` em `tools/ambientes/pages/salas.js`).

Os links das abas da pilar passaram a apontar para as filhas. Para isso o template dos pilares (`tools/ambientes/template.js`) aceita, em cada item de `tipos`, um campo `links: [{ href, label }]` com caminhos relativos à pilar; quando ele não existe, continua valendo o par `futuro`/`futuroLabel`, que gera `data-destino-futuro`. A pilar de dormitórios ainda usa o par antigo nas abas e linka as filhas pela seção `#filhas`.

As dez palavras-chave que o mapa marca como "seção na página pai" viraram âncoras reais dentro dessas páginas, no bloco de variações:

| Âncora | Onde |
| --- | --- |
| `#lareira-revestida-em-marcenaria` | `/painel-de-tv-planejado/` |
| `#estante-com-nichos-planejada` e `#nicho-planejado` | `/estante-planejada/` |
| `#movel-de-apoio-para-sala` e `#sala-de-tv-planejada` | `/sala-de-estar-planejada/` |
| `#mesa-de-jantar-planejada` | `/sala-de-jantar-planejada/` |
| `#divisoria-planejada-entre-ambientes` | `/sala-integrada-planejada/` |
| `#aparador-de-entrada-planejado`, `#sapateira-planejada` e `#painel-de-entrada-com-espelho` | `/hall-de-entrada-planejado/` |

**Uma decisão de escopo: "sala de TV planejada".** O mapa traz K0040 (`sala de tv planejada londrina`) como página própria, em `/salas/sala-de-tv-planejada/`. Aqui ela virou a seção `#sala-de-tv-planejada` dentro de sala de estar. Os dois termos têm a mesma intenção — planejar o ambiente social da casa — e duas páginas disputariam a mesma SERP, que é exatamente a canibalização que a estrutura em pilar e filhas existe para evitar. O recorte técnico que justificaria a separação (distância de visão, reflexo na tela, tratamento de som) está dividido entre essa seção e a página de home theater. Se o Search Console mostrar demanda própria e distinta para o termo, a seção pode ser promovida a página sem reescrever o resto.

**Desambiguações deliberadas neste hub.** Pares que o mapa mantém separados e que foram escritos com recortes diferentes de propósito, para não gerar páginas quase iguais:

- **Painel de TV × painel ripado.** O painel trata da parede da TV (altura da tela, fiação, quadro de energia, fixação). O ripado trata da régua (espessura, espaçamento, fundo escuro, fechamento no canto, limpeza, ripado acústico), e vale para qualquer parede, não só a da TV.
- **Rack × buffet e aparador.** O rack é o móvel da TV. Buffet e aparador já têm página no hub H01 (`/cozinhas/cristaleira-planejada/`, com as âncoras `#buffet-planejado` e `#aparador-planejado`) e são linkados de rack e de sala de jantar, não repetidos.
- **Estante × biblioteca.** A estante é dimensionada para carga pontual (objeto, foto, alguns livros) e aceita vão largo. A biblioteca é dimensionada para carga contínua de livro: 25 a 40 kg por metro, vãos de 50 a 60 cm, prateleira regulável por formato, vidro contra poeira e sol, e atenção ao peso total sobre o piso.
- **Sala de estar × sala integrada.** Estar trata de circulação e das peças de um ambiente delimitado. Integrada trata da costura entre ambientes: acabamento contínuo, cheiro de cozinha, ruído de eletrodoméstico, circuitos de luz e divisória.

**Correção no template das filhas.** `tools/ambientes/template-layout.js` tinha o `BreadcrumbList` e o `isRelatedTo` do JSON-LD fixos em "Cozinhas" e em `/cozinhas/`, o que estava errado nas 18 filhas de dormitório desde que elas foram criadas. Agora os dois saem da entrada do hub em `tools/ambientes/pai.js`, pelos campos `path` (URL absoluta da pilar) e `pilar`, com um campo opcional `trilha` para o hub cuja pilar não fica debaixo de `/ambientes/` — será o caso de `/para-empresas/`. As páginas de dormitório foram regeradas com a trilha correta.

**Confirmar antes de publicar nas dez páginas de salas.** Além das faixas de preço e das promessas gerais, estas páginas citam números e exigências que dependem de fornecedor e de execução:

1. **Faixas de referência.** As páginas não publicam faixa por padrão de acabamento (isso é só da pilar), mas citam que o painel liso suspenso é a peça de entrada e que o painel do piso ao teto pode custar três vezes isso. Confirme com a tabela real.
2. **Limites estruturais citados.** Vão livre por espessura de painel (60 cm em 15 mm, 70 a 80 cm em 18 mm, perto de 1 m em 25 mm), carga de corrediça (25 kg e 45 kg), largura máxima de gaveta perto de 90 cm e peso de livro de 25 a 40 kg por metro. São referências de mercado: confirme com o fornecedor de painel e de ferragem antes de publicar.
3. **Promessas de execução.** Caixa de passagem e conduíte dentro do painel, respiro em nicho de equipamento, reforço interno para suporte articulado de TV, box selado atrás de caixa acústica de embutir, canaleta embutida até a posição do sofá, espelho laminado ou com filme de segurança no hall, e ripado acústico com lã mineral e ficha técnica no orçamento. Todas aparecem como o que a empresa faz — só mantenha o que a operação realmente entrega.
4. **Norma elétrica.** As páginas de painel de TV e de hall afirmam que o quadro de distribuição precisa continuar acessível (NBR 5410) e oferecem porta de inspeção como solução. Confirme que isso é de fato o procedimento da equipe.
5. **Serviço elétrico.** Várias páginas dizem que a empresa informa antes de fechar o que é marcenaria e o que é do eletricista (mudar tomada, ponto de antena, ponto de pendente, circuitos separados). Confirme esse combinado.
6. **Imagens.** As dez páginas usam `ambiente-sala.webp` (com `srcset`) e `projeto-sala.svg`. Nenhuma tem foto do layout específico: troque por entregas reais com metragem, bairro e prazo, com autorização de uso de imagem.

### Páginas filhas de home office e estudo (hub H04)

Três páginas em `/home-office-e-lazer/<slug>/`, as de maior prioridade do hub (o H04 não tem linha de Fase 1; a faixa alta dele é Fase 2 / Média):

| Grupo | Páginas |
| --- | --- |
| Home office e estudo | `escritorio-residencial-planejado`, `escrivaninha-planejada`, `cantinho-de-estudos-planejado` |

Conteúdo em `tools/ambientes/homeoffice/<slug>.js`, grupo em `tools/ambientes/homeoffice/_base.js`. Âncoras de seção: `#estacao-de-trabalho-planejada` e `#biblioteca-com-escritorio-integrado`, as duas em `/escrivaninha-planejada/`.

**Desambiguação do hub.** "Home office planejado" e "escritório residencial planejado" são praticamente sinônimos na busca, e o mapa os mantém separados. A pilar ficou com o termo geral, incluindo as soluções de canto dentro de outro ambiente; a filha trata só do ambiente fechado e dedicado ao trabalho — porta que fecha, arquivo físico, ponto de rede cabeado, duas estações e fundo de videochamada. É o que ela tem de diferente, e isso está dito no texto da própria página. A terceira página, de cantinho de estudos, se separa por idade e aponta para `/dormitorios-e-closets/quarto-de-adolescente-planejado/` quando o assunto é o quarto inteiro.

**Segundo lote do H04 — já publicado.** O grupo "Lazer e hobbies" foi criado no lote 2, descrito mais abaixo.

### Páginas filhas de banheiro, e o ajuste do hub H05

Duas páginas em `/banheiros/<slug>/`: `gabinete-de-banheiro-planejado` (com as âncoras `#armario-de-banheiro-planejado` e `#bancada-de-banheiro-em-marcenaria`) e `lavabo-planejado`. Conteúdo em `tools/banheiros/<slug>.js`.

**Por que só duas.** No Mapa de Hubs o H05 é um hub único, com pilar em `/ambientes/banheiro-e-lavanderia/` e cinco páginas próprias de Fase 2: banheiro planejado, gabinete de banheiro, lavabo, lavanderia planejada e área de serviço. Como este site separou banheiro e lavanderia em duas pilares (motivo registrado mais acima), três dessas cinco linhas deixaram de ser filhas e passaram a ser as próprias pilares:

| Linha do mapa | Onde ela vive no site |
| --- | --- |
| banheiro planejado | a pilar `/banheiros/` |
| lavanderia planejada | a pilar `/lavanderias/` |
| área de serviço planejada | absorvida pela pilar de lavanderias, que já responde pelos dois termos |

Criar filhas com esses nomes abaixo das próprias pilares seria canibalização pura. Então o lado da lavanderia **não ganhou nenhuma filha neste lote**: as seis palavras-chave que o mapa marca como seção dela viraram âncoras reais nas abas da pilar — `#lavanderia-compacta-planejada`, `#armario-para-maquina-de-lavar`, `#armario-para-secadora`, `#armario-de-produtos-de-limpeza`, `#tabua-de-passar-embutida` e `#varal-retratil-integrado-ao-movel`.

Para isso, duas coisas novas no código:

- `tools/ambientes/template.js` aceita, em cada item de `tipos`, um campo `anchors: ['...']`, que emite um `<span class="lp-anchor" id="..." aria-hidden="true">` imediatamente antes do painel da aba. É assim que uma palavra-chave de seção ganha URL própria sem criar página.
- `site/assets/js/lp.js` passou a abrir a aba certa quando a URL chega com uma dessas âncoras (e no `hashchange`), em vez de abrir sempre a primeira. Sem isso, o conteúdo apontado nasceria dentro de um painel escondido.

**Desambiguação banheiro × lavabo.** A diferença não é de tamanho, é de chuveiro: o banheiro de uso diário tem o vapor do banho atacando tudo, e o lavabo tem só respingo de torneira. Por isso o lavabo aceita lâmina natural, laca e ripado, e o banheiro não. As duas páginas repetem a mesma divisão de responsabilidade — marcenaria no corpo e nas frentes, pedra no tampo, alvenaria no nicho do box.

### Páginas filhas de área externa (hub H06)

Duas páginas em `/varanda-e-area-gourmet/<slug>/`: `varanda-planejada` e `area-gourmet-planejada` (com a âncora `#churrasqueira-com-marcenaria`). Conteúdo em `tools/ambientes/varanda/<slug>.js`.

Das três páginas próprias de Fase 2 do hub, "varanda gourmet planejada" é a própria pilar deste ambiente no site, então sobraram duas — e elas se separam bem: a varanda de apartamento lida com sol, chuva, guarda-corpo e regra de condomínio; a área gourmet de casa lida com fogo, água e gás. O grupo "Espaços especiais" (`garagem-planejada`, `deposito-planejado`, `marcenaria-sob-a-escada`, `sotao-planejado`, `mezanino-planejado` e `espaco-pet-planejado`) é Fase 3 / Baixa e foi criado no lote 2, descrito mais abaixo.

### Páginas filhas para empresas (hub H13)

Cinco páginas em `/para-empresas/<slug>/`, o grupo "Saúde, beleza e bem-estar", que é a única faixa de prioridade **Alta** do hub:

| Grupo | Páginas |
| --- | --- |
| Saúde, beleza e bem-estar | `marcenaria-para-clinicas`, `marcenaria-para-consultorios-medicos`, `marcenaria-para-consultorios-odontologicos`, `marcenaria-para-saloes-de-beleza`, `marcenaria-para-academias` |

Conteúdo em `tools/ambientes/empresas/<slug>.js`, grupo em `tools/ambientes/empresas/_base.js`. Essas páginas falam diretamente com a persona P5 do dossiê de ICP ("O que não pode parar"): instalação fora do horário de atendimento, prazo amarrado à data de inauguração, nota fiscal em CNPJ e contrato PJ aparecem no `note` da primeira dobra, no bloco de preço e no FAQ de todas as cinco.

Âncoras de seção:

| Âncora | Onde |
| --- | --- |
| `#marcenaria-para-laboratorios`, `#marcenaria-para-clinicas-veterinarias`, `#marcenaria-para-farmacias` e `#marcenaria-para-pet-shops` | `/marcenaria-para-clinicas/` |
| `#marcenaria-para-clinicas-de-estetica` | `/marcenaria-para-consultorios-odontologicos/` |
| `#marcenaria-para-barbearias` | `/marcenaria-para-saloes-de-beleza/` |
| `#marcenaria-para-estudios-de-pilates` | `/marcenaria-para-academias/` |

**Quatro âncoras foram remanejadas.** O mapa pendura farmácias, laboratórios, clínicas veterinárias e pet shops como seções de `/marcenaria-para-academias/`. Isso é arranjo de planilha: nenhuma delas tem relação com academia, e as quatro compartilham com clínica a mesma exigência de superfície lavável e de fluxo de material. Elas foram para `/marcenaria-para-clinicas/`, que trata de estabelecimento de saúde em geral. Em academias ficou só a âncora coerente, de estúdio de pilates.

**Desambiguação do trio clínica / consultório médico / consultório odontológico.** São três termos próximos, com recortes deliberadamente diferentes: clínica é o estabelecimento com vários ambientes, e o assunto é fluxo entre limpo e sujo, expurgo e balcão acessível; consultório médico é a sala única, e o assunto é a disputa entre conversa, exame e arquivo em 10 a 12 m²; consultório odontológico é definido pela tubulação do equipo, pela autoclave e por uma química de desinfecção mais agressiva. Salão se separa pela química de coloração e pela carga elétrica de secador; academia, por suor, álcool e impacto.

**Lotes seguintes do H13 — já publicados.** Os grupos de escritório e corporativo, varejo e eventos, gastronomia, hospedagem, educação, culto, serviços e condomínios foram criados no lote 2, descrito mais abaixo. Com eles, nenhuma aba da pilar para empresas usa mais `data-destino-futuro`.

**Confirmar antes de publicar nas páginas comerciais.** Elas assumem compromissos de operação que precisam ser verdadeiros:

1. **Instalação fora do horário comercial** — à noite, em fim de semana ou ambiente por ambiente, com cronograma por dia, proteção de piso, limpeza ao fim de cada turno e equipe identificada. As cinco páginas afirmam isso e dizem que o custo da modalidade é declarado no orçamento.
2. **Nota fiscal em CNPJ, contrato PJ e pagamento em marcos**, com prazo em dias úteis e, quando há data de inauguração, cronograma escrito a partir dela e sincronizado com as outras frentes da obra.
3. **Especificação declarada em contrato** — linha do painel, acabamento, tipo de borda, material do tampo, resistência química e marca das ferragens. As páginas dizem que isso é entregue por escrito, porque é o documento que o cliente apresenta se a especificação for questionada.
4. **Ferragem de ciclo alto** com marca declarada em armário de uso público (armário de aluno, armário de clínica).
5. **Referências normativas.** As páginas citam a exigência sanitária de superfície lisa, lavável e impermeável sem ranhuras, e a medida de balcão de atendimento acessível (trecho rebaixado de 0,75 a 0,80 m com no mínimo 0,90 m de largura e aproximação frontal livre). O texto é explícito em dizer que as exigências específicas variam por atividade e por município e devem ser confirmadas com a assessoria do cliente ou com o órgão — mantenha essa ressalva.
6. **Imagens.** As cinco páginas usam `ambiente-comercial.webp` e `projeto-comercial.svg`. Nenhuma tem foto de obra comercial real: troque por entrega própria, com autorização de uso de imagem do cliente, que em espaço comercial costuma exigir acordo formal.

**Confirmar nas filhas de H04, H05 e H06.** Além das faixas e promessas gerais: os limites de vão de bancada suspensa (até cerca de 1,20 m em 25 mm com testeira), a especificação de painel para umidade de banheiro e para uso externo em varanda, a ferragem resistente à corrosão, o afastamento de material combustível em relação à churrasqueira (que as páginas dizem vir do manual do fabricante) e a abertura permanente no nicho de botijão de gás. A página de cama retrátil já tinha uma ressalva parecida sobre carga de pistão, e a de escritório residencial repete esses números — mantenha as duas coerentes.

### Lote 2: lazer, espaços especiais e o resto do hub comercial

O segundo lote fechou as três faixas que tinham ficado para depois, mais os grupos de Fase 2 e Fase 3 do hub H13. São 26 páginas novas, e com elas os hubs H02, H04, H05, H06 e H13 estão **completos** em relação ao Mapa de Hubs.

| Hub | Grupo | Páginas |
| --- | --- | --- |
| H04 | Lazer e hobbies | `quarto-gamer-planejado`, `sala-de-jogos-planejada`, `sala-de-cinema-planejada`, `brinquedoteca-planejada`, `atelie-planejado`, `espaco-fitness-planejado` |
| H06 | Espaços especiais | `garagem-planejada`, `deposito-planejado`, `marcenaria-sob-a-escada`, `sotao-planejado`, `mezanino-planejado`, `espaco-pet-planejado` |
| H13 | Escritórios e corporativo | `escritorio-corporativo-planejado`, `recepcao-planejada` |
| H13 | Varejo e eventos | `marcenaria-para-lojas`, `marcenaria-para-shopping`, `estandes-de-feira` |
| H13 | Gastronomia | `marcenaria-para-restaurantes`, `marcenaria-para-bares`, `marcenaria-para-cafeterias` |
| H13 | Hospedagem | `marcenaria-para-hoteis`, `marcenaria-para-pousadas` |
| H13 | Educação, culto, serviços e condomínios | `marcenaria-para-escolas`, `marcenaria-para-igrejas`, `marcenaria-para-escritorios-de-advocacia`, `marcenaria-para-condominios` |

Conteúdo em `tools/ambientes/homeoffice/`, `tools/ambientes/varanda/` e `tools/ambientes/empresas/`, com os grupos declarados nos respectivos `_base.js`. As pilares de H04, H06 e H13 ganharam esses grupos na seção `#filhas` e tiveram as abas repontadas para as páginas reais.

**Âncoras múltiplas por bloco de variação.** `tools/ambientes/template-layout.js` passou a aceitar `anchors: ['...']` em cada item de `variacoes`, emitindo um `<span class="lp-anchor" id="..." aria-hidden="true">` antes do `<article>` — o mesmo recurso que já existia nas abas das pilares. Isso permite que um bloco de variação carregue duas ou três palavras-chave de seção sem inventar blocos quase idênticos só para ter um `id`. Cuidado ao usar: se a âncora for igual ao `id` do próprio `article`, o `check-site.js` acusa id duplicado — nesse caso basta o `id`, sem o `anchors`.

**Três remanejamentos e um rebaixamento deste lote**, pelo mesmo critério dos anteriores:

- `móveis corporativos sob medida` (K0247) era página própria e virou a âncora `#moveis-corporativos-sob-medida` dentro de escritório corporativo. O termo é quase sinônimo da pilar `/para-empresas/` e ficaria espremido entre ela e a página de escritório.
- `#balcoes-de-bar-sob-medida` saiu de cafeterias e foi para `marcenaria-para-bares`, onde o balcão é o assunto central.
- `#mesas-e-bancos-para-restaurantes` saiu de cafeterias e foi para `marcenaria-para-restaurantes`, pelo mesmo motivo.
- `#marcenaria-para-farmacias`, `#marcenaria-para-laboratorios`, `#marcenaria-para-clinicas-veterinarias` e `#marcenaria-para-pet-shops` já tinham saído de academias para clínicas no lote 1.

**Desambiguações deste lote:**

- **Sala de cinema × home theater.** `/home-office-e-lazer/sala-de-cinema-planejada/` trata do **ambiente dedicado** (blecaute, estrado da segunda fileira, distância de projeção, poltrona reclinável); `/salas/home-theater-planejado/` trata do **equipamento dentro de uma sala que também serve para outras coisas** (posição de caixa, calor, cabo, tratamento possível). As duas páginas apontam uma para a outra por link em texto.
- **Hotel × pousada.** Hotel resolve por repetição (protótipo aprovado, módulo fabricado dezenas de vezes); pousada, flat, hostel e temporada resolvem por unidade autossuficiente, porque não há recepção por perto e o móvel precisa ser autoexplicativo.
- **Restaurante × bar × cafeteria.** Salão (capacidade, mesa, banco, acústica, fluxo de garçom), balcão (líquido, gelo, refrigeração sob balcão, back bar) e vitrine com fila (pedir, pagar e retirar em pontos separados). Nenhuma das três repete o assunto da outra.
- **Escritório corporativo × escritório de serviços.** O primeiro trata de estações, cabeamento e reunião; o segundo (advocacia, contabilidade, imobiliária, agência, órgão público) trata de sigilo, arquivo físico com prazo legal de guarda e sala de atendimento reservada.
- **Garagem × depósito × sótão × mezanino × sob a escada.** Cinco páginas de "espaço que a casa tem e não usa", separadas pelo problema real: abertura da porta do carro; carga e inventário de longo prazo; forro inclinado e calor; pé-direito dividido com guarda-corpo; altura variável a cada centímetro.

**Confirmar antes de publicar nas 26 páginas do lote 2.** Além do que já vale para o lote 1:

1. **Compromissos comerciais repetidos.** Instalação fora do horário (noite, fim de semana, por setor, por andar, entre cultos, no recesso escolar), nota em CNPJ, contrato PJ, pagamento em marcos e prazo em dias úteis aparecem nas 15 páginas de H13. Confirme que a operação sustenta cada modalidade.
2. **Protótipo hoteleiro.** A página de hotéis afirma que a primeira entrega é um apartamento-modelo montado e aprovado antes da série, com estoque de peças de reposição combinado na entrega. Confirme os dois.
3. **Orçamento em formato de apresentação.** As páginas de condomínios e de órgãos públicos prometem escopo por ambiente com especificação escrita item a item e preço separado, para assembleia e para conferência no recebimento. Confirme que o orçamento sai nesse formato.
4. **Referências normativas citadas.** Balcão acessível (0,75–0,80 m de altura, mínimo 0,90 m de largura, aproximação frontal) aparece em recepção, lojas, agências, portaria, biblioteca e academia; provador acessível em lojas; guarda-corpo de mezanino e de beliche; e espaços reservados distribuídos em igrejas. Os textos dizem que as exigências específicas devem ser confirmadas com a assessoria do cliente ou com o órgão — mantenha a ressalva.
5. **Números técnicos de referência.** Vão de prateleira por carga, 25 a 40 kg por metro de livro, largura de estação de 1,40 a 1,60 m, folgas de salão (60 cm por pessoa, 1,10 a 1,20 m de corredor de serviço), alturas de balcão de bar (1,05 a 1,10 m na face do cliente, 90 a 95 cm de trabalho), folga de tacada de 1,50 m em sinuca e folga de 40 a 60 cm atrás de poltrona reclinável. São referências de mercado e de ergonomia: confirme com fornecedor e com a prática da equipe.
6. **Limites de escopo declarados.** Várias páginas dizem explicitamente o que **não** é marcenaria: estrutura de mezanino, isolamento acústico, isolamento térmico de sótão, superfície de manipulação de alimento (inox), piso de impacto de academia, instalações de equipo odontológico, projeto elétrico e de rede. Essas ressalvas são o que protege a empresa de expectativa errada — não as remova ao revisar.
7. **Imagens.** As 26 páginas reutilizam `ambiente-comercial.webp`, `projeto-comercial.svg`, `ambiente-home-office.webp`, `projeto-home-office.svg`, `ambiente-varanda.webp` e `projeto-varanda-gourmet.svg`. Nenhuma tem foto do caso específico.

### Estrutura de URLs: categorias na raiz, e /ambientes/ só como índice

**Nenhuma categoria tem `/ambientes/` na URL nem na trilha.** A página `/ambientes/` existe, mas é só o índice que reúne todas; ao entrar em uma categoria o caminho é `/<categoria>/`:

| Categoria | URL da pilar | Filhas |
| --- | --- | --- |
| Cozinhas | `/cozinhas/` | `/cozinhas/<slug>/` (17) |
| Dormitórios e closets | `/dormitorios-e-closets/` | `/dormitorios-e-closets/<slug>/` (18, **os 5 closets incluídos**) |
| Salas e painéis | `/salas/` | `/salas/<slug>/` (10) |
| Home office e lazer | `/home-office-e-lazer/` | `/home-office-e-lazer/<slug>/` (9) |
| Lavanderias | `/lavanderias/` | sem filhas (abas com âncora) |
| Banheiros | `/banheiros/` | `/banheiros/<slug>/` (2) |
| Varandas e áreas gourmet | `/varanda-e-area-gourmet/` | `/varanda-e-area-gourmet/<slug>/` (8) |
| Espaços comerciais | `/para-empresas/` | `/para-empresas/<slug>/` (19) |

Os closets ficam **só dentro da categoria de dormitórios e closets**, como era antes (chegaram a ser separados na raiz por engano de leitura e voltaram). Isso desfez a entrada `closets` de `pai.js` e o `ehCloset` de `dormitorios/_base.js`.

**O que mudou no código** (as oito pilares e as 92 filhas migraram de `ambientes/<categoria>/` para `<categoria>/`):

- `url` e `root` dos `_base.js` das filhas (cozinha em `layouts/`, `salas/`, `homeoffice/`, `varanda/`, `dormitorios/`, `banheiros/`): `root` caiu de `../../../` para `../../`.
- `url` e `root` das pilares em `tools/ambientes/pages/*.js` (`root`: de `../../` para `../`), mais o BreadcrumbList delas, que perdeu o item "Ambientes".
- `path` em `tools/ambientes/pai.js`; as chaves de `AMBIENTES` (`template.js`) e de `RESUMO` (`entidade.js`); os links de `imovel/index-hub.js` e de `ambientes-hub.js`.
- `template-layout.js`: a trilha visível e o BreadcrumbList viraram **Início › pilar › página** em todas as filhas, sem "Ambientes" (a trilha explícita em `pai.js` continua valendo onde existe); e o aviso de canonical do cabeçalho passou a usar só o primeiro segmento da URL.
- **A cozinha é escrita à mão** (não é gerada): a pasta `site/ambientes/cozinhas/` foi **movida** para `site/cozinhas/`, os `../../` viraram `../`, e o item "Ambientes" saiu do BreadcrumbList. `site/index.html` teve os links trocados por sed. Se o menu mudar de novo, esses dois arquivos precisam ser editados à mão.
- A pasta de **conteúdo** em `tools/ambientes/` (`dormitorios/`, `salas/`, …) não mudou de lugar: só o destino publicado mudou.
- `tools/link-pilar-cozinha.js` (script de uso único, já executado) ainda cita `/ambientes/cozinhas/` num atributo; não precisa rodar de novo e não foi alterado.

As pastas antigas de `site/ambientes/` eram só saída gerada e foram apagadas; hoje `site/ambientes/` contém só o `index.html` do índice. **Não há redirecionamento** das URLs antigas porque o site ainda não foi publicado; se alguma `/ambientes/<categoria>/` já foi ao ar, é preciso um 301 para a nova.

**A página `/ambientes/`** é um índice, Camada B (sem geografia no texto visível). Reúne os oito ambientes e todas as subcategorias (as 8 pilares, as 83 filhas de ambiente, a página Seu imóvel e as seis soluções de lavanderia), cada ambiente em um bloco com o cartão da página principal e as famílias de filhas sob subtítulos:

| Bloco | Subcategorias |
| --- | --- |
| Cozinhas | layouts (8) e ambientes anexos e módulos (9) |
| Dormitórios e closets | guarda-roupas, closets, quartos e camas |
| Salas e painéis | painéis, racks e estantes; salas e áreas sociais |
| Home office e lazer | home office e estudo; lazer e hobbies |
| Lavanderias | as seis soluções, que são abas da pilar (sem páginas filhas) |
| Banheiros e lavabos | banheiro e lavabo |
| Varandas e áreas gourmet | varanda e área gourmet; espaços especiais |
| Espaços comerciais | seis segmentos |

As listas vêm dos mesmos `_base.js` que geram o bloco "outras páginas do grupo" de cada filha, então o índice não diverge do que existe: ao criar uma filha nova e registrá-la no `_base.js`, ela aparece em `/ambientes/` no próximo `node tools/build-layouts.js`. O conteúdo está em `tools/ambientes/ambientes-hub.js` e usa o template institucional, que ganhou o campo `grupos` (cartões sob subtítulos h3, ao lado de `links`). O JSON-LD traz `CollectionPage` com `ItemList` dos oito ambientes, `BreadcrumbList` (Início › Ambientes) e `areaServed` de estado. O menu **Ambientes** continua sendo o dropdown; "Ver todos os ambientes" e o item "Ambientes" do rodapé apontam para `/ambientes/`.

### Hub H07: tipo de imóvel e metragem (`/para-seu-imovel/`)

Dez páginas novas, na raiz do site (a pilar do mapa é `/para-seu-imovel/`, na raiz): a pilar e nove filhas, em dois grupos.

| Grupo | Páginas | Camada |
| --- | --- | --- |
| Pilar | `/para-seu-imovel/` | B |
| Por metragem | `moveis-planejados-para-apartamento-pequeno`, `…-apartamento-de-40-m2`, `…-apartamento-de-46-m2`, `…-apartamento-de-50-m2`, `moveis-planejados-para-studio` | **A** só em apartamento pequeno; B nas outras |
| Pelo momento da compra | `moveis-planejados-para-apartamento-na-planta`, `moveis-planejados-para-imovel-recem-entregue`, `apartamento-completo-planejado`, `casa-completa-planejada` | **A** só em casa completa; B nas outras |

```bash
node tools/build-layouts.js   # gera as filhas de todos os hubs E a pilar de H07
```

Conteúdo em `tools/ambientes/imovel/<slug>.js`, grupos em `tools/ambientes/imovel/_base.js` e a pilar em `tools/ambientes/imovel/index-hub.js`. As filhas usam o `template-layout.js` (com a entrada `para-seu-imovel` nova em `tools/ambientes/pai.js`, que tem trilha explícita Início › Seu imóvel). **A pilar usa o `template-inst.js`**, o template de prosa e cartões, porque é uma página-índice: não há layouts para comparar em abas e uma faixa de preço em reais seria inventada. Para as filhas poderem apontar para `../#precos` e `../#duvidas`, a pilar tem esses dois ids; o link de projetos vai para `/projetos-entregues/` (campo novo `hrefProjetos` em `pai.js`, opcional).

**Reconciliação do mapa novo com o levantamento.** O Mapa de Hubs (SP, 3/nov) recorta o H07 por tipo de imóvel e não tem nenhuma página de metragem; o levantamento (`tools/termos-sp.md`, 1.3) mostra que 46, 50 e 40 m² são os termos mais recorrentes e que kitnet, "compacto" e "na planta" não têm termo próprio. Resultado:

| Linha do mapa | Decisão |
| --- | --- |
| apartamento pequeno, studio, na planta, recém-entregue, apartamento completo, casa completa | publicadas, com as URLs do mapa |
| kitnet, flat | **âncoras** dentro de studio (`#moveis-planejados-para-kitnet`, `#moveis-planejados-para-flat`): o autocomplete não tem termo próprio e são o mesmo problema (um cômodo só); o mapa as tem como páginas de Fase 1 |
| 40, 46 e 50 m² | **acrescentadas** (não existem no mapa) |
| casa, sobrado, cobertura, casa em condomínio, chácara (Fase 1 no mapa) | **adiadas**: "para casa" só devolve marca no autocomplete e nada sustenta página própria agora. A pilar diz o que fazer com esses imóveis sem prometer página |
| econômicos, médio padrão, alto padrão, luxo, investimento, alugado, temporada (Fase 2) | não feitas |

**Camada A.** `apartamento-pequeno` (title "em SP", h1 "em São Paulo", H2 de preço "em SP") e `casa-completa-planejada` (title "em São Paulo", h1 "em SP", H2 de projetos "em São Paulo"), alternando como manda a regra. Distribuição agora: 32 títulos com `em SP`, 13 com `em São Paulo`, 55 sem geografia. As oito páginas Camada B foram conferidas por script: zero ocorrência de "SP" ou "São Paulo" no texto visível (fora do rodapé e da linha `lp-area`); nenhum title passa de 56 caracteres.

**O que cada página tem de diferente.** Para as de metragem não virarem três cópias, cada uma tem um recorte próprio:

- **pequeno:** o princípio (dupla função, armário até o teto, porta de correr, passagem cotada). Quatro estratégias.
- **40 m²:** um quarto e uma sala; home office dentro do quarto, cama escondida para hóspede, máquina de lavar embutida.
- **46 m²:** dois quartos pequenos; a decisão é o uso do segundo quarto e a medida do **menor lado**, não a área.
- **50 m²:** a folga que sobra; a decisão é onde gastá-la (closet na suíte, bancada de refeição, lavanderia com porta, painel e aparador).
- **studio, kitnet e flat:** cama que some, cozinha de uma parede, regras do prédio no flat, padrão repetível para locação (persona P4).
- **na planta:** a linha do tempo antes das chaves; o que decidir antes do acabamento (pontos), por que a medição só vale com a obra pronta (persona P1a).
- **recém-entregue:** o cronograma de trás para frente, ordem dos ambientes, condomínio e vistoria de recebimento (persona P1b).
- **apartamento completo:** o projeto único; o que se repete entre ambientes e três formas de executar (obra única, duas fases, por ambiente).
- **casa completa:** a ordem de obra entre reforma e marcenaria, medição por ambiente, acesso e escada, condomínio horizontal.

**Menu e rodapé.** **Atualização (3/nov): o item "Seu imóvel" foi REMOVIDO do menu principal a pedido do usuário** (`template.js`, `site/index.html` e `site/cozinhas/index.html`); a página segue acessível pelo rodapé e pelo índice `/ambientes/`. O texto a seguir descreve o que foi feito antes: o item **Seu imóvel** entrou no menu principal (antes de Projetos) e **Por tipo de imóvel** no rodapé de todas as 111 páginas. Isso mexeu em `template.js` e, à mão, em `site/index.html` e `site/cozinhas/index.html`, que não são gerados. Mesma ressalva dos ambientes: a página de cozinha e a home precisam ser editadas à mão se o menu mudar de novo.

**Três correções de passagem.** (1) O placeholder do telefone nos formulários era `(43) 99999-9999`, DDD de Londrina; virou `(11) …`. (2) `.site-nav__link` ganhou `white-space: nowrap`: com o item novo, "Seu imóvel" quebrava em duas linhas na largura de 800 px. (3) O rótulo dos desenhos em planta (`.plan__label` em `lp.css`) ganhou um halo na cor do fundo, porque rótulos que caem sobre o móvel escuro ou sobre a ilha ficavam quase ilegíveis; vale também para as 83 filhas antigas.

**Exemplos de projeto, não casos.** A seção `#projetos` de cada página mostra "Exemplo: …", com imagem ilustrativa e texto que descreve a **lógica** do desenho, não uma obra entregue. Nada ali é caso real. Quando houver obra documentada, troque pelos casos de `/projetos-entregues/`.

**Confirmar antes de publicar nas dez páginas de H07.**

1. **Plantas de exemplo.** As páginas de 40, 46 e 50 m² usam uma distribuição de cômodos como exemplo ("se a sua planta tem um quarto…", "quando a planta traz dois quartos…"). São contas ilustrativas, sempre condicionadas, e não afirmam o que o mercado entrega nessas metragens. A metragem típica por praça é hipótese do dossiê (seção 17); não a fixe como fato.
2. **Medidas de referência citadas.** Cama de casal de 1,38 × 1,88 m, solteiro de 0,88 × 1,88 m, guarda-roupa de 55 a 60 cm de fundo, passagem de 60 cm ao lado da cama e de 90 cm em circulação, 2,10 m livres para cama retrátil, nicho de máquina de 70 a 75 cm. São referências de ergonomia e de mercado: confirme com a prática da equipe e com o fornecedor de ferragem.
3. **Cama retrátil e suspensa.** As páginas de 40 m², 46 m² e studio dizem que o orçamento informa a carga do pistão e a espessura de colchão aceita. É o mesmo compromisso já listado em Camas (hub H03): só mantenha se a operação o informa.
4. **Cama suspensa e divisória em forro de gesso.** O texto afirma que exigem reforço previsto antes do fechamento do forro. Confirme que a equipe sabe fazer e faz.
5. **Prazos e etapas.** As páginas de recém-entregue, na planta, apartamento completo e casa completa **não trazem prazo em dias**: dizem que cada etapa tem prazo em dias úteis no contrato e ensinam a conta de trás para frente. Confirme que o contrato tem prazo por etapa e que o evento de início está escrito. Elas também afirmam que contrato assinado antes das chaves traz a medição como condição para fabricar e a regra de ajuste por escrito, que preço pode ser congelado por um período e que há reajuste previsto entre etapas: confirme cada um.
6. **Pagamento em marcos e vistoria.** Repetem que a parcela final só vem após a vistoria de aceite (já prometido em `/formas-de-pagamento/`).
7. **Flat e locação.** A página de studio afirma que alguns prédios exigem mobiliário padrão ou aprovação de projeto, e que padronizar para locação só vale se a peça de reposição for a mesma. É orientação geral; não cita nenhum prédio.
8. **Medição por ambiente e acesso em casa.** A página de casa completa afirma que peças que não passam pela escada ou pelo portão são divididas em módulos e montadas no andar, com cronograma maior. Confirme.
9. **Imagens.** As dez páginas reutilizam `ambiente-cozinha`, `ambiente-closet`, `ambiente-sala`, `ambiente-home-office` e `projeto-sala.svg`. Nenhuma tem foto do caso específico.

### Páginas institucionais (hub H21) — e o terceiro template

Onze páginas na **raiz** do site (oito do lote original e três do lote H10/H21, descrito mais abaixo): elas valem para o site todo e não são filhas de nenhuma pilar.

| URL | Camada | O que resolve |
| --- | --- | --- |
| `/como-funciona/` | B | As sete etapas, com prazo de cada uma e o que costuma atrasar |
| `/orcamento/` | B | Os 12 itens que um orçamento sério traz, e o que a falta de cada um esconde |
| `/contrato-e-garantia/` | B | As dez cláusulas, o que a garantia cobre e a vistoria antes da parcela final |
| `/prazos-e-instalacao/` | B | De onde o prazo conta, os 5 eventos que o suspendem, o dia da montagem |
| `/formas-de-pagamento/` | B | Pagamento em marcos, reajuste e por que evitar financeira |
| `/sobre/` | **A** | **A página-entidade**: o que é a empresa, o que faz por ambiente, do que os móveis são feitos, para quem, o que não faz e onde atende |
| `/projetos-entregues/` | **A** | O padrão de cada caso e as galerias por ambiente |
| `/politica-de-privacidade/` | B | LGPD, descrevendo o que o código realmente faz |

```bash
node tools/build-institucional.js
```

Conteúdo em `tools/ambientes/institucional/<slug>.js`, registro em `tools/ambientes/institucional/_base.js`, estrutura em **`tools/ambientes/template-inst.js`**. A ordem completa de geração do site passou a ser:

```bash
node tools/build-ambientes.js      # 8 pilares
node tools/build-layouts.js        # 92 filhas de serviço + a pilar de H07 (/para-seu-imovel/)
node tools/build-institucional.js  # 11 institucionais
node tools/build-cidades.js        # hub /onde-atendemos/ + 10 cidades na raiz (H22)
node tools/build-sao-paulo.js      # 96 distritos + 21 bairros em /sao-paulo/ (H22)
node tools/build-profissionais.js  # 4 páginas para profissionais na raiz (menu Empresa)
node tools/check-site.js           # precisa voltar "Sem problemas."
```

**Por que um terceiro template.** O `template-layout.js` é feito para página de serviço: hero com foto, planta em SVG, variações, faixa de preço e FAQ. Nada disso serve a "contrato" ou "privacidade". O `template-inst.js` reaproveita `header`, `footer`, `form`, `icon`, `SPRITE` e `WA` de `template.js` — e também as classes de CSS que já existiam (`lp-clauses`, `lp-flow`, `lp-compare`, `lp-spec`, `lp-drivers`, `lp-strip`, `lp-callout`, `lp-siblings`, `faq__*`), **sem uma linha de CSS nova**. As diferenças deliberadas:

1. **Sem hero de foto.** O cabeçalho é de texto, sobre `--c-tint`. Não existe foto honesta para ilustrar "contrato" ou "privacidade", e um hero obrigaria a inventar uma e a carregar um preload de 200 KB sem função.
2. **Motor de prosa.** O corpo é uma lista de `blocos`, cada um com `h2` e qualquer combinação de `p`, `lista`, `numeros`, `defs`, `fichas`, `simples`, `callout`, `nota` e `cta`. É o que permite oito páginas de formatos diferentes sem oito templates. Com 4 ou mais blocos com `id`, um sumário de âncoras é gerado sozinho.
3. **FAQ e formulário opcionais.** `semForm: true` tira o formulário, a barra fixa do celular e o CTA do cabeçalho. Só a política de privacidade usa: pedir lead em cima de um texto de LGPD é contraditório.
4. **JSON-LD por tipo de página**, pelo campo `schemaTipo`: `HowTo` em como funciona, `AboutPage` em sobre, `CollectionPage` em projetos entregues, `WebPage` no resto. Marcar uma política de privacidade como `Service` seria dado estruturado incoerente com a tela. O `areaServed: State São Paulo` continua em todas, dentro de `about`.

**Os links mortos que isso matou.** `/contrato-modelo/` e `/projetos-entregues/` eram `data-destino-futuro` nas 8 pilares, e a política de privacidade não existia. Agora: o botão "Quero ver o contrato modelo" e o "Ver mais projetos" apontam para páginas reais; o rodapé de todas as páginas linka a política; o item "Sobre" do menu e do rodapé passou a apontar para `/sobre/` em vez da âncora da home, e o rodapé ganhou "Como funciona", "Contrato e garantia" e "Projetos entregues". **Continuam mortos só os 5 links do menu Blog**, em todas as 100 páginas — o blog não estava neste lote.

Também foram corrigidas **seis abas do pilar de dormitórios** que ainda usavam o par `futuro`/`futuroLabel` apontando para páginas que já existem desde o lote H03. Agora usam o campo `links`, como as demais pilares.

**Geografia nas duas páginas de Camada A** (a regra manda alternar a forma):

| | `title` | `h1` | `description` | H2 com geografia |
| --- | --- | --- | --- | --- |
| `/sobre/` | em SP | em São Paulo (com o nome da marca) | em São Paulo | `#atendimento` |
| `/projetos-entregues/` | em São Paulo | em SP | em SP | `#onde` |

A justificativa de elas serem Camada A está no levantamento: `loja de móveis planejados` apareceu em 17 consultas e `empresa de moveis planejados` em 14; com geografia, `lojas de moveis planejados em sp` em 9 e `melhores empresas de móveis planejados em sp` é sugestão direta. É intenção de **avaliar fornecedor**, e é o que essas duas páginas respondem. As outras seis são Camada B porque os termos de desconfiança não são digitados: `moveis planejados reclamacao`, `moveis planejados problemas`, `como escolher marcenaria` e `marcenaria confiavel` retornam **zero** sugestões.

#### `/sobre/` é a página-entidade do site

A MarcenariaSP é definida **uma vez**, em `tools/ambientes/entidade.js`, e o nó completo (`FurnitureStore` com `@id` `https://SEU-DOMINIO/#organizacao`) só é emitido no JSON-LD de `/sobre/`, junto com um `WebSite` (`#site`). Ele traz nome, descrição, `areaServed` (estado), nove assuntos de domínio em `knowsAbout` e um `hasOfferCatalog` com os oito ambientes e o projeto 3D, cada um com a URL da sua página. **As outras 99 páginas apontam para esse mesmo `@id`** (`provider` nos dois templates de serviço, `about` no institucional, `provider` na cozinha e a home à mão), em vez de repetir um `FurnitureStore` solto. É isso que costura o site inteiro numa entidade só.

Conteúdo da página, pensado como a resposta completa a "o que é essa empresa": **oito linhas em resumo** (o que é, entrega, para quem, onde, como começa, como cobra, como garante, o que não faz); **planejado × sob medida × modulado × marcenaria** explicados sem jargão; **o catálogo por ambiente**, linkando as oito pilares; **painel, borda e ferragem** (MDF × MDP, espessura, fita de borda, dobradiça/corrediça/pistão) e por que isso vai escrito no contrato; **os três casos para os quais o método foi desenhado** (mobiliar do zero, reforma com a casa funcionando, espaço comercial que não pode parar); os cinco compromissos; o que a empresa não faz; área de atendimento; e os dados da empresa. O FAQ tem 10 perguntas, entre elas "O que é a MarcenariaSP?" e "planejado × modulado", que são as que um buscador usaria para definir a entidade.

Duas coisas novas no `template-inst.js`: os blocos `fatos` (ficha de termo e definição em largura total) e `links` (cartões de navegação com caminho relativo à raiz), e a limpeza do texto de FAQ no JSON-LD (os comentários `CONFIRMAR` que viviam dentro das respostas iam parar no dado estruturado; agora são removidos e o texto visível continua idêntico ao do JSON-LD). **As outras páginas institucionais já usavam esse mesmo template e foram corrigidas junto**; as filhas de serviço e as pilares usam outro e não foram auditadas para isso.

**Onde entram os dados que ainda não existem.** `address`, `telephone`, `foundingDate`, `sameAs` e `logo` ficam **fora** do JSON-LD até serem confirmados. Quando forem, entram em `entidade.js`, só lá, e idênticos ao Perfil da Empresa no Google. A área de atendimento também passou a morar nesse arquivo (`areaServed`): se a operação não cobre o interior, corrija em `entidade.js`, nos três templates e em `/sobre/#atendimento`.

#### CONFIRMAR antes de publicar as oito páginas institucionais

Esta é a parte mais perigosa do site: cada afirmação aqui é verificável por um cliente, e várias são obrigações contratuais. **Nada pode ficar no texto se a operação não cumprir.**

1. **`/sobre/` está deliberadamente incompleta.** Não inventei ano de fundação, número de projetos entregues, tamanho de equipe, nome de sócio, endereço nem showroom — todos esses pontos estão como `CONFIRMAR` no bloco `#quem-faz` e nas respostas do FAQ. Preencha com o que é verdade ou **retire o item**. Número inventado em página "Sobre" é a mentira mais fácil de verificar que existe, e derrubaria a credibilidade das outras 99 páginas.
2. **`/projetos-entregues/` não tem nenhum projeto.** Também de propósito, e pelo mesmo motivo. Hoje ela é um índice real das galerias por ambiente mais o **padrão** que cada caso vai seguir. O bloco `#casos` traz, em comentário no código, os seis campos obrigatórios de cada caso (ambiente e região, metragem medida, escopo, prazo real decorrido, o problema do caso, foto própria) e as exigências: autorização de uso de imagem por escrito, nunca endereço completo nem nome de cliente, nunca valor de contrato de cliente identificável.
3. **A política de privacidade descreve o código de hoje, e isso tem prazo de validade.** A seção 5 afirma, com precisão, que o site não grava cookie próprio, não carrega script de terceiros, serve as fontes do próprio domínio e usa só a chave `lp_origin` no `sessionStorage`. **No dia em que o GTM e o Google Ads forem instalados isso vira falso.** A instalação precisa vir acompanhada, no mesmo deploy, de: reescrita da seção 5 com a lista de cookies e prazos, banner de consentimento com recusa tão fácil quanto o aceite e bloqueio das tags até o consentimento, e revisão da base legal da seção 3. É o risco de conformidade mais concreto do projeto.
4. **Identificação do controlador (LGPD, art. 9º).** Razão social, CNPJ, endereço e canal de atendimento ao titular estão como `CONFIRMAR` na seção 1. **Sem eles a página não deve ir ao ar.** Faltam também o prazo de resposta a solicitação de titular (art. 19), o prazo de guarda de proposta não fechada e a retenção de log do provedor. E convém revisão por advogado: o texto descreve o código com precisão, que é a parte difícil, mas conformidade jurídica é parecer, não redação de site.
5. **Prazos e números do contrato.** As páginas não publicam prazo de garantia em meses, percentual de marco de pagamento nem os números da cláusula de atraso — elas dizem que isso está no contrato. Isso é intencional: prazo errado publicado é pior que prazo não publicado. Confirme que o contrato real tem os três, **e a cláusula de atraso nos dois sentidos**, porque `/contrato-e-garantia/` e `/prazos-e-instalacao/` afirmam isso.
6. **Compromissos de operação repetidos.** Medição técnica gratuita com responsabilidade pelo erro de medida, duas rodadas de ajuste no projeto 3D, projeto que fica com o cliente mesmo sem fechar, parcela final só após a vistoria, revisões de 30 e 90 dias, instalação fora do horário em espaço comercial, nota em CNPJ e contrato PJ. Já estavam espalhados pelas outras páginas; aqui viraram texto explícito e exigível.
7. **Área de atendimento, de novo.** `/sobre/` lista capital, Grande São Paulo, interior e litoral em `#atendimento`, e `/projetos-entregues/` repete em `#onde`, incluindo a especificação de ferragem resistente à corrosão no litoral. Se a operação não instala em alguma dessas faixas, corrija **aqui, nos dois templates de ambiente e no institucional** — é a afirmação de maior alcance do site.
8. **`/formas-de-pagamento/` fala de dinheiro.** Confirme percentuais de marco, meios de pagamento aceitos, política de reajuste e validade. Ela também recomenda **contra** financiar planejado com juros, e diz que a empresa não é instituição financeira. Se houver financeira parceira, declare quem é e com CET, em vez de omitir.

### Lote H10 e H21 de consolidação (3/nov): três páginas

Três páginas novas na raiz, geradas por `node tools/build-institucional.js` com o `template-inst.js` (nenhum template ou CSS novo). Todas Camada B, sem geografia no texto visível, com `areaServed` de estado no JSON-LD e FAQ visível igual ao JSON-LD.

| URL | Hub | O que resolve |
| --- | --- | --- |
| `/modelo-de-orcamento/` | H10 | O orçamento como documento em branco, em 14 campos, sem valor, prazo em dias nem percentual; como conferir uma proposta com ele; o que levar para a medição; estimativa × orçamento |
| `/materiais-e-ferragens/` | H21 | Dossiê, seção 18: MDF e MDP (onde cada um entra, sem afirmar qual resiste melhor à umidade), fita de borda, espessura por componente, ferragens, pés e pedra |
| `/perguntas-frequentes/` | H21 | 15 perguntas consolidadas das outras páginas institucionais, mais cartões por tema; não cria fato novo |

**Por que a H10 não é "projeto 3D" nem repete `/orcamento/`.** `/orcamento/` já foi escrita para o termo "modelo de orçamento de móveis planejados" (explica os 12 itens e o que a falta de cada um esconde) e `/como-funciona/` já explica o que é o projeto 3D gratuito. Uma terceira página sobre o mesmo assunto canibalizaria as duas. A nova tem outro formato, o **documento em si**, e linka as duas. O slug é `/modelo-de-orcamento/` (o termo), e não `/projeto-e-consultoria/` (URL do mapa), seguindo a recomendação de manter as URLs publicadas e registrar a divergência.

**Rodapé.** Os itens "Materiais e ferragens" e "Perguntas frequentes" entraram na coluna Navegação do rodapé de todas as 114 páginas (em `template.js` e, à mão, em `site/index.html` e `site/cozinhas/index.html`). `/modelo-de-orcamento/` não entrou no rodapé: é alcançada por `/orcamento/`, pelas outras institucionais (bloco "O resto do que a gente põe por escrito") e pelas perguntas frequentes. O menu principal não mudou.

**CONFIRMAR antes de publicar.**

1. **Modelo de orçamento.** Que o orçamento real da operação traz os 14 campos, e a validade padrão da proposta.
2. **Materiais.** Fornecedor e linha dos painéis, espessuras reais de caixaria, fundo, portas e prateleiras (as citadas são referência de mercado), marca e modelo de dobradiça, corrediça, pistão e puxador, e que a ficha técnica do painel fica à disposição. **Nenhuma marca de ferragem é afirmada** na página.
3. **Perguntas frequentes.** Herdam os CONFIRMAR das páginas de origem: gratuidade do projeto 3D e da medição, marcos e percentuais de pagamento, prazo de garantia e de resposta ao chamado, nota em CNPJ e contrato PJ. Se uma resposta mudar em `contrato-e-garantia`, `formas-de-pagamento`, `prazos-e-instalacao` ou `sobre`, mude aqui também.

As três entraram em `INSTITUCIONAL` (`tools/ambientes/institucional/_base.js`) e aparecem no bloco de irmãs de cada institucional.

**Correção de contraste e espaçamento (3/nov).** (1) `.lp-clauses` foi escrita para a seção escura de garantia (texto claro), mas o `template-inst.js` a usa em seções claras (campo `lista`), onde o texto ficava quase invisível em todas as institucionais. Em `lp.css`, fora de `.lp-guarantee`, ela agora usa `--c-text`, `--c-text-2`, `--c-accent` e `--c-border-strong`. (2) O sumário "Nesta página" usava `var(--sp-7)`, token que não existe (a escala pula de 6 para 8), então ficava sem padding vertical; passou a `--sp-12`. Regra: **só use tokens `--sp-` da escala de `styles.css`** (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24). Auditoria de contraste (mínimo 4,5:1) em 15 páginas: sem falhas.

**O site é intermediador, sem CNPJ (3/nov, decisão do usuário).** O MarcenariaSP intermedia o contato entre o cliente final e a empresa parceira que executa o projeto, e por ora não tem CNPJ próprio. Já aplicado: (1) **"8 anos de prática no setor"** no rodapé de todas as 114 páginas (`template.js`, `site/index.html`, `site/cozinhas/index.html`) e na `description` do schema da organização (`tools/ambientes/entidade.js` e o nó da home), **sem mencionar intermediação no JSON-LD** (a pedido do usuário; a intermediação aparece só no rodapé e na política de privacidade); `foundingDate` NÃO foi preenchido, porque os 8 anos são de prática e não de fundação de empresa; (2) **`/politica-de-privacidade/`** reescrita nas seções 1, 2, 3, 4 e 6: o controlador é o responsável pelo site (sem CNPJ; nome e canal de contato ficam como CONFIRMAR) e a empresa parceira passa a constar como destinatária do pedido e como controladora dos dados do contrato e da nota. **Ainda NÃO ajustado, e conflita com o modelo de intermediação:** as demais páginas afirmam em primeira pessoa que "nós" projetamos, fabricamos, instalamos, emitimos nota em CNPJ e assinamos contrato e garantia (`sobre`, `contrato-e-garantia`, `formas-de-pagamento`, `prazos-e-instalacao`, `orcamento`, `como-funciona`, as pilares e as filhas), e o texto do /sobre/ (FAQ, JSON-LD) ainda diz que a empresa fabrica. Falta decidir como reescrever esses trechos (quem assina o contrato, quem dá a garantia, quem emite a nota).

**Faixas de preço reduzidas (3/nov, pedido do usuário).** Preços em R$ só existem nas oito pilares (cozinha à mão; as outras em `tools/ambientes/pages/*.js`), no cartão de cada padrão e na resposta do FAQ "quanto custa" (o texto visível e o JSON-LD saem do mesmo campo). Redução de cerca de 25%: cozinhas essencial R$ 9 mil e intermediário R$ 13–24 mil; dormitórios R$ 4,5 mil e R$ 7,5–16 mil; salas R$ 2,5 mil e R$ 6–15 mil; home office R$ 2 mil e R$ 4,5–12 mil; lavanderias R$ 1,8 mil e R$ 3,5–9 mil. **"Sob consulta"** no padrão intermediário de banheiros, varanda/área gourmet e para empresas (no "a partir de" de cada uma o valor foi reduzido: R$ 1,3 mil, R$ 3 mil e R$ 4,5 mil). O premium já era "Sob projeto" em todas. Continuam sendo faixas de referência com CONFIRMAR: troque pela tabela real.

**Área de atendimento mudou (3/nov, decisão do usuário).** Deixou de ser "todo o estado de São Paulo: capital, Grande São Paulo e interior (e litoral)". Agora: **"Atendemos a capital, a Grande São Paulo e algumas cidades do interior. Para saber se atendemos a sua, é só entrar em contato."** Nenhuma cidade do interior é listada. Aplicado na linha `lp-area` dos três templates e da cozinha, no rodapé (texto e linha do pin, em `template.js`, home e cozinha), na home (eyebrow, FAQ "atende o interior?" e JSON-LD), em `/sobre/` (resumo, #atendimento, ficha "Algumas cidades do interior", FAQ) e em `/projetos-entregues/` (#onde e FAQ). O litoral deixou de ser citado como área atendida. **`areaServed` do JSON-LD continua "State: São Paulo"** (regra do projeto). A afirmação "todo o estado" continua nos títulos/meta de Camada A só como "em SP" / "em São Paulo", que descrevem o termo de busca. Quando o usuário informar as cidades do interior, só as páginas de cidade (H22) as listam.

### Hub H22: onde atendemos (`/onde-atendemos/` e 10 cidades), 3/nov

Onze páginas novas: o hub `/onde-atendemos/` e as cidades **na raiz do site** e as cidades `sao-paulo`, `guarulhos`, `osasco`, `santo-andre`, `sao-bernardo-do-campo`, `sao-caetano-do-sul`, `barueri`, `diadema`, `mogi-das-cruzes` e `taboao-da-serra`. **Ordem de geração do site agora:** `build-ambientes` → `build-layouts` → `build-institucional` → **`build-cidades`** → `check-site` (a última precisa voltar "Sem problemas."; `build-cidades` também precisa vir depois de `build-ambientes` só porque o rodapé é regenerado por todos).

```bash
node tools/build-cidades.js
```

**Código.** Dados em `tools/ambientes/cidades/dados.js` (números brutos do Censo e textos locais), montagem em `tools/ambientes/cidades/pagina.js`, template `template-inst.js` com dois campos novos: `trilha` (níveis intermediários da trilha visível e do BreadcrumbList: Início › Atendemos › Cidade) e `cidade` (acrescenta `City` ao `areaServed`, que continua com `State: São Paulo`). Nenhum CSS novo. Rodapé: item **"Onde atendemos"** em todas as páginas (`template.js` e, à mão, `site/index.html` e `site/cozinhas/index.html`). O menu principal não mudou.

**Por que estas dez.** Capital (a zona é o recorte que o autocomplete reconhece, `tools/termos-sp.md` 1.2) e as nove cidades mais populosas ou mais coerentes com P1/P4/P5 da lista de trabalho: Guarulhos, Osasco, Santo André, São Bernardo, São Caetano, Barueri, Diadema, Mogi das Cruzes e Taboão da Serra, cobrindo ABC, sub-região oeste, sudoeste e leste/Alto Tietê. Ficaram para a próxima leva Mauá, Carapicuíba, Cotia, Itaquaquecetuba, Suzano e as demais da aba Cidades SP (o Censo delas já foi consultado: ver abaixo). **Nenhuma cidade do interior** foi escrita nem listada; o hub diz só "algumas cidades do interior… é só entrar em contato".

**Regra de geografia (Camada A, ajustada em 3/nov a pedido do usuário).** A cidade é o assunto, e as palavras-chave locais entram nos títulos de forma natural, variando o termo: title e h1 alternam entre "Móveis Planejados em X" e "Marcenaria e Móveis Sob Medida em X" (posição par/ímpar na lista de cidades; title ≤ 60, máximo atual 57), a description cita "móveis planejados e marcenaria sob medida em X", e cinco títulos de seção usam uma variação cada: `Planejados em X: o que o Censo 2022 diz…`, `Marcenaria em X: o que a geografia…`, `Móveis sob medida em X: o que isso muda no projeto`, `Móveis planejados por zona de X…` (só a capital) e a chamada final; também o título do FAQ e uma pergunta "Quanto tempo leva para planejar móveis sob medida em X?". As demais H2 não citam a cidade, para não inflar. Não há "em SP" no title. Mudança em `tools/ambientes/cidades/pagina.js`.

**Conteúdo único, sem inventar.** Cada página tem: (1) ficha do **Censo 2022 do IBGE** (população, área, densidade, % casas, % apartamentos, % casa de vila ou em condomínio, % alugados) e a posição da cidade entre as dez, calculada pelo código; (2) geografia, distritos e história locais; (3) acessos (rodovias, trens, terminais); (4) "o que muda no projeto", que é **inferência** marcada com `<!-- [H] -->` e em linguagem condicional; (5) vizinhas; (6) FAQ de 3 perguntas próprias. A capital tem ainda um bloco por zona.

**Fontes.** IBGE, API de agregados (`servicodados.ibge.gov.br/api/v3/agregados`), tabelas 4714 (população, área, densidade), 6326 (domicílios por tipo) e 9930 (condição de ocupação, para alugados); Wikipédia (pt) para geografia, rodovias, linhas de trem, distritos e história (só o estável; PIB, rankings e trechos "carece de fontes" ficaram fora). Os dados brutos e o script de consulta estão na nota `side-session-notes/local_300145fb-…/` (`ibge.js`, `ibge-raw.json`, `wiki/`).

**Achado que contraria o dossiê.** A hipótese "predomínio vertical" para Capital e Grande SP **não se sustenta no Censo 2022**: casa é a maioria em nove das dez cidades (apartamento: capital 33%, Guarulhos 23%, Osasco 25%, Santo André 35%, SBC 32%, Barueri 29%, Diadema 19%, Mogi 22%, Taboão 23%). **Só São Caetano do Sul tem mais apartamento (53%) que casa.** As páginas seguem o dado, e a hipótese de perfil da aba Cidades SP deve ser corrigida (a demanda de reforma de casa, P2, pesa mais do que o dossiê previa). Consulta extra (não publicada): Mauá 12% apto, Carapicuíba 16%, Cotia 16% (com 11% casa em condomínio), Itaquaquecetuba 8%, Suzano 17%, Embu das Artes 6%.

**CONFIRMAR (tudo isto depende do dono):** (1) quais cidades do interior são atendidas; (2) bairros atendidos por cidade e zonas da capital; (3) casos locais, avaliações e projetos entregues por cidade (o dossiê proíbe página de cidade sem prova local: as páginas têm só dado público e devem ganhar caso antes de ir ao ar como página forte); (4) prazo por praça e raio de segurança do prazo (perguntas 15 e 16 da seção 28 do dossiê); (5) se Alphaville/Tamboré (condomínios), Paranapiacaba e o distrito rural de Mogi estão na área; (6) a base na cidade, que **nenhuma página afirma**. Itens de dado que ficaram **de fora** por não terem confirmação: "Capital do Móvel" e Centro Moveleiro da Jurubatuba em São Bernardo (Wikipédia marca "carece de fontes"), tombamento de Paranapiacaba, clima por cidade (a classificação de Diadema na Wikipédia diverge das vizinhas), PIB e rankings. O IDH-M de São Caetano (0,862) é de 2010 e está datado no texto.

**Como acrescentar uma cidade.** (1) Consulte o Censo (tabelas 4714, 6326, 9930, município N6 pelo código IBGE) e reúna 3 ou 4 fatos locais verificáveis (rodovias, trens, distritos, geografia); (2) acrescente um objeto em `CIDADES` (`dados.js`): `slug`, `nome`, `regiao` (uma das de `REGIOES`), `censo`, `vizinhas`, `resumoHub`, `lead`, `acessos`, `historia`, `muda`, `faq` e, se for pertinente, `zonas`; (3) inclua o slug em `POR_CIDADE` (`pagina.js`, links de "Páginas que ajudam a decidir"); (4) `node tools/build-cidades.js`, regere o rodapé com os outros builds e rode `check-site`. Não copie parágrafos de outra cidade: se só houver o Censo, a cidade ainda não merece página. **Não é para fazer as combinações serviço × cidade (aba Localidades, Fase 3).**

### Menu "Empresa" e as páginas para profissionais (hub H14, 3/nov)

O cabeçalho ganhou o item **Empresa**, com dropdown (antes de Projetos): **Arquitetos e designers de interiores**, **Empresas e negócios** (a pilar `/para-empresas/`, que já existia), **Construtoras e incorporadoras**, **Paisagistas** e **Imobiliárias e corretores**. Não há página-índice nem link "ver todos": o dropdown é o índice. O rótulo "Empresa" foi o pedido do usuário; se confundir com "sobre a empresa", renomear para "Parceiros" em `template.js`, `site/index.html` e `site/cozinhas/index.html` (o menu é escrito à mão nas duas últimas). O Blog continua link simples, sem dropdown.

**URLs na raiz, sem pasta-mãe** (a pedido do usuário: nada de `/parceiros/`): `/arquitetos-interiores/`, `/construtoras-incorporadoras/`, `/imobiliarias-corretores/` e `/paisagistas/`. As URLs divergem do mapa (que usa `/parceiros/parceria-com-arquitetos/` etc.); registre a divergência. A trilha é Início › página.

```bash
node tools/build-profissionais.js   # conteúdo em tools/ambientes/profissionais/ (_base.js e uma página por perfil)
```

**Combinação de dois grupos de termos** em title, h1, description, eyebrow, títulos de seção e perguntas do FAQ, de forma natural e contextual (descrita no cabeçalho de `tools/ambientes/profissionais/_base.js`). Grupo 1, o que fazemos: marcenaria, planejados, móveis planejados, móveis sob medida, marcenaria sob medida. Grupo 2, quem procura: arquitetos, designers de interiores, escritórios de arquitetura, paisagistas, construtoras, incorporadoras, imobiliárias, corretores, empresas, profissionais. Exemplos: "Marcenaria para arquitetos e designers de interiores" (title), "Marcenaria para escritórios de arquitetura: do projeto ao móvel instalado", "Móveis planejados em lote para incorporadoras", "Planejados para o cliente do corretor", "Marcenaria sob medida para imobiliárias e corretores", "Marcenaria e móveis sob medida para paisagistas". Ao criar um perfil novo, varie o par em cada título e não repita a mesma combinação. A página de arquitetos cobre também **designers de interiores como quem envia o projeto** (trabalhamos sobre o projeto deles), o que é coerente com `/sobre/` ("não fazemos projeto de interiores"); uma página de **serviço** de design de interiores continua não feita.

Camada B (sem geografia no texto visível), template `template-inst.js`. **Nada de condição comercial é publicado:** comissão, desconto, programa de indicação, capacidade de produção em lote e tamanho mínimo de série são `CONFIRMAR`. Não afirmam serviço que o site não declara em outro lugar (sem deck, pergolado ou jardim). **Confirmar antes de publicar:** gratuidade do 3D e do detalhamento para projetos de escritório, acompanhamento do arquiteto na medição e na vistoria, protótipo e peça de reposição em lote, personalização por comprador de empreendimento, especificação para uso externo, e se existe qualquer condição para profissionais. "Empresas e negócios" (`/para-empresas/`) é Camada A e não recebeu a mesma combinação de termos nesta rodada.

### Menu "Onde atendemos": cidades, distritos e bairros (3/nov)

O cabeçalho ganhou **Onde atendemos** (depois de Empresa). O dropdown tem **três colunas, a classificação pedida pelo usuário: Cidades, Distritos de São Paulo e Bairros de referência**, cada uma com **seis exemplos** e um "ver todos" que leva às âncoras `#cidades`, `#distritos` e `#bairros` de `/onde-atendemos/`. **A lista completa fica na página, não no dropdown.** A coluna de bairros lista bairros que **não** são distritos (Higienópolis, Vila Madalena, Vila Olímpia, Jardim América, Vila Nova Conceição e Brooklin); a de distritos lista os mais populosos. Os três "ver todos" levam ao hub.

**Conteúdo de `/onde-atendemos/`** (montagem em `tools/ambientes/cidades/pagina.js`, dados em `dados.js`): (1) **Cidades**: as 10 páginas, agrupadas por região; (2) **Distritos da cidade de São Paulo**: os **96 distritos**, lista completa na grafia da API de localidades do IBGE (acentos de Cangaíba e Cidade Líder corrigidos à mão), mais um atalho para os 10 mais populosos; (3) **Bairros de referência da capital**: os de metro quadrado mais alto no Índice FipeZAP e os polos de comércio e serviços, com atalho. "Todos" vale para cidades e distritos; **bairros não são exaustivos** (a cidade tem centenas e não há lista oficial), e a página diz que o do cliente pode ser outro. Em `/atendemos/sao-paulo/` ficam os detalhes: `#distritos-populosos` (10 mais populosos, Censo 2022: lista da Wikipédia e Informe Urbano nº 64 da Prefeitura; subprefeitura e zona de fora porque a fonte divergia) e `#bairros-de-referencia` (sem valor do m², porque o ranking muda todo mês e as fontes oscilam). "Badalado" não é critério: não há fonte objetiva. Não há página por bairro (o dossiê só admite onde há demanda e prova; o levantamento mostra bairro sem termo de busca). `CONFIRMAR`: distritos e bairros realmente atendidos, casos e prazo.

O menu é escrito em `template.js` e, à mão, em `site/index.html` e `site/cozinhas/index.html`. **Cuidado ao editar o dropdown por script:** uma troca anterior deixou restos do bloco antigo dentro do cabeçalho e o `check-site.js` não acusou (ele não valida o desenho); só a conferência no navegador mostrou. Depois de mexer no menu, abra uma página.

**Cabeçalho mais largo, breakpoint novo.** Com sete itens, o menu não cabia em 1024 a ~1250 px (a página ganhava rolagem horizontal). O menu completo agora só aparece a partir de **1200 px** (`styles.css` e `nav.js`, antes 1024), com o espaço entre itens reduzido entre 1200 e 1359 px; abaixo de 1200 vale o menu do celular. 

### Páginas de distrito da capital (96 páginas, 3/nov)

Uma página por distrito do município de São Paulo, em `/sao-paulo/<distrito>/`, com trilha Início › Onde atendemos › São Paulo › Distrito. Com elas o site vai a **225 páginas**.

```bash
node tools/build-sao-paulo.js
```

Dados em `tools/ambientes/cidades/distritos.js` (uma linha por distrito: nome, slug, preposição, população, posição e subprefeitura), montagem em `cidades/pagina-distrito.js`, template `template-inst.js`.

**Fontes.** População: IBGE, Censo Demográfico 2022, população total por distrito, pela lista da Wikipédia que cita o Censo; os três primeiros batem com o Informe Urbano nº 64 da Prefeitura. Subprefeitura: divisão administrativa do município, pela lista de subprefeituras da Wikipédia (conferida distrito a distrito em alguns casos: Pinheiros, Sé, Vila Mariana e Mooca batem). **A zona/macrorregião daquela página está inconsistente** (Itaquera aparece sob "Zona Leste 1" e o texto a chama de Leste 2), então **zona não é usada**: o agrupamento é por subprefeitura. **Não há área nem densidade por distrito**, porque a única tabela encontrada traz área sem fonte declarada e população de 2008; uma densidade calculada a partir dela seria um número inventado.

**O que diferencia uma página da outra:** a população, a posição entre os 96, a participação na população da cidade, a subprefeitura, a lista de distritos vizinhos (os da mesma subprefeitura) e a preposição do nome, escrita à mão para o texto não sair com "em Grajaú" (são "no Grajaú", "na Penha", "em Pinheiros"). O bloco "o que pesa no projeto" tem **quatro variantes**, por faixa de população, e o bloco de ambientes gira entre seis combinações. O title alterna entre `Móveis Planejados <prep> <Distrito> | São Paulo` e `Marcenaria e Planejados <prep> <Distrito> | SP`, com o h1 na forma oposta (máximo atual: 50 caracteres).

**Risco registrado, e é o mais sério destas páginas.** O dossiê de ICP (seção 13) diz que página de localidade sem atendimento real, sem caso local e com texto repetido é conteúdo fino, afasta o cliente e tende a ser mal avaliada pelo Google; o levantamento (`tools/termos-sp.md`, 1.1 e 1.2) mostra que **bairro não tem termo de busca próprio em SP** e que o recorte com demanda observada é a zona da capital. Estas 96 páginas se sustentam em dado público do IBGE, mas **a parte do texto que fala de obra é compartilhada por faixa de população**. Elas só deixam de ser finas quando a empresa acrescentar, por região, caso entregue, foto própria e avaliação. Enquanto isso não existir, vale considerar publicar em levas ou deixá-las fora do sitemap — decisão do dono.

**Nada é afirmado sobre a operação:** nenhuma página diz que o distrito é atendido, nem cita caso, prazo, bairro coberto ou base local. Isso é `CONFIRMAR`, em comentário HTML, e o FAQ responde "conte o bairro que confirmamos na conversa". **Para acrescentar ou corrigir um distrito**, edite `distritos.js` à mão (a preposição é obrigatória) e rode o build.

**Ligações.** `/onde-atendemos/#distritos` lista os 96, agrupados pelas 31 subprefeituras, cada um com população e posição; `/sao-paulo/#distritos-populosos` linka os dez primeiros e a lista completa; cada distrito linka os vizinhos da mesma subprefeitura.

### Estrutura de URLs da geografia, e os bairros da capital (3/nov, decisão do usuário)

**Não existe o ascendente `/atendemos/`.** A geografia ficou assim, e é a terceira vez que o usuário pede o mesmo princípio (antes foi `/ambientes/` e `/parceiros/`): URL curta, sem pasta-mãe que não seja a própria entidade.

| O quê | URL | Trilha |
| --- | --- | --- |
| Hub | `/onde-atendemos/` | Início › Onde atendemos |
| Cidade | `/<cidade>/` (ex.: `/osasco/`, `/barueri/`) | Início › Onde atendemos › Cidade |
| Distrito da capital | `/sao-paulo/<distrito>/` | Início › Onde atendemos › São Paulo › Distrito |
| Bairro da capital | `/sao-paulo/<bairro>/` | Início › Onde atendemos › São Paulo › Bairro |

Distrito e bairro ficam **no mesmo nível**, sem `/distritos/` nem `/bairros/` separando — também a pedido. Por isso `tools/build-sao-paulo.js` **recusa rodar se um slug de bairro colidir com o de um distrito**. As cidades na raiz convivem com as pilares de ambiente (`/cozinhas/`, `/salas/`…) e com as páginas para profissionais; ao criar qualquer página na raiz, confira que o slug está livre. **Não há redirecionamento das URLs antigas** (`/atendemos/…`) porque o site não foi publicado; se alguma já tiver ido ao ar, é preciso 301.

#### Bairros da capital (21 páginas)

Bairros conhecidos que **não são distritos** — Higienópolis, Vila Madalena, Vila Olímpia, Jardim América, Vila Nova Conceição, Pacaembu, Brooklin e outros. Dados em `tools/ambientes/cidades/bairros.js`, montagem em `cidades/pagina-bairro.js`, geradas pelo mesmo `build-sao-paulo.js`.

**A regra que define a lista:** só entrou bairro cujo artigo público **diz a que distrito ele pertence**. Cerqueira César ficou de fora porque é cortado pela Avenida Paulista e a fonte não resolve o distrito. Quando o bairro fica entre dois distritos (Pacaembu, Vila Clementino), a página diz os dois e não escolhe. Cada bairro tem uma frase de fato parafraseada da fonte, e os números (população, subprefeitura, posição) são os **do distrito**, porque o IBGE não conta por bairro — a página explica isso, e o FAQ tem a pergunta "é bairro ou distrito?".

**Bairro que também é distrito** (Moema, Pinheiros, Itaim Bibi, Vila Mariana, Perdizes, Jardim Paulista, Campo Belo…) **não ganha página de bairro**: já tem a de distrito. O menu e o hub mandam para ela.

**Para acrescentar um bairro:** confirme o distrito em fonte pública, escreva a preposição ("no Pacaembu", "na Vila Madalena", "em Higienópolis") e acrescente a `bairros.js`. A lista não é exaustiva e a página diz isso: a cidade tem centenas de bairros e não existe lista oficial.

### H04 dividido, e o menu Ambientes em árvore (3/nov)

**Três pedidos do usuário, de uma vez.**

**1. O hub H04 virou duas categorias.** `/home-office-e-lazer/` deixou de existir:

| Antes | Agora | Filhas |
| --- | --- | --- |
| `/home-office-e-lazer/` | `/escritorio-home-office/` — "Home office e escritórios" | escritório residencial, escrivaninha, cantinho de estudos (3) |
| (grupo "Lazer e hobbies" dentro dele) | `/lazer-diversao/` — "Lazer e diversão", **categoria primária nova** | quarto gamer, sala de jogos, sala de cinema, brinquedoteca, ateliê, espaço fitness (6) |

O conteúdo das seis filhas de lazer não mudou; mudaram a URL, a pilar e a trilha. Os arquivos saíram de `tools/ambientes/homeoffice/` para **`tools/ambientes/lazer/`**, com `_base.js` próprio, e `build-layouts.js` ganhou o grupo. A pilar nova é `tools/ambientes/pages/lazer-diversao.js` (quatro abas: setup gamer; jogos e cinema; ateliê e brinquedoteca; espaço fitness), e a antiga perdeu as duas abas de lazer e o grupo de filhas correspondente. Também mudaram `pai.js` (entrada nova), `AMBIENTES` em `template.js` (agora **9 categorias**), `entidade.js` e `ambientes-hub.js`. **No Mapa de Hubs as seis páginas continuam no H04** e o `hub` dos arquivos segue 'H04': é divergência deliberada entre o mapa e o site, como já acontece em H05 e H06.

**2. O menu Ambientes virou árvore.** Em vez de duas colunas de pilares, agora é **uma categoria por linha**; quem tem filhas mostra o segundo nível. No **desktop (≥1200 px) o segundo nível abre à direita** com o mouse em cima ou com o foco dentro (CSS puro: `.has-sub2:hover` e `:focus-within`); no **celular abre em acordeão**, pelo botão, com `.is-open2` (JS em `nav.js`, seção 1c). A lista de filhas vem dos mesmos `_base.js` que geram as páginas (constante `SUBMENU` em `template.js`), então **nunca diverge do que existe**; mostra no máximo `MAX_SUB` = 8 e fecha com "Ver as N soluções". Classes novas em `styles.css`: `.site-nav__tree`, `.site-nav__branch`, `.site-nav__branch-toggle`, `.site-nav__sub2`, `.site-nav__chev2`. Há `.site-nav__sub2--esquerda` pronta no CSS para o caso de o segundo nível encostar na borda direita; hoje nenhum ramo encosta (conferido em 1366 px), e nada aplica essa classe.

**3. Menu Empresa:** ganhou **"Ver para sua empresa"** no rodapé do dropdown, apontando para `/para-empresas/`.

**O `<nav>` e o `<footer>` da home e da cozinha agora são GERADOS.** Eram mantidos à mão e já tinham divergido duas vezes. Um script passou a recortar o bloco das duas páginas e colar o que `header(page)` e `footer(page)` produzem, com `{root:'', url:''}` na home e `{root:'../', url:'cozinhas/'}` na cozinha. **Ao mexer no menu ou no rodapé, mude só `template.js` e repita esse recorte** — não edite as duas páginas à mão.

### Página de contato e mapas do Google (4/nov)

**`/contato/`** é página própria (institucional, `contato.js`): canais, o mapa de **São Paulo** e link para `/onde-atendemos/`. O item **Contato** do menu e do rodapé agora aponta para ela (antes era `#contato`, a âncora do formulário). **Nenhum dado de empresa é publicado**: telefone, e-mail, endereço e horário são `CONFIRMAR`.

**Mapa do Google em:** `/contato/`, **seção "Onde atendemos" da home**, as 10 cidades (zoom 11, capital 10), os 96 distritos (zoom 13) e os 21 bairros (zoom 14, consulta "Bairro, São Paulo, SP"). Código em `tools/ambientes/mapa.js` (bloco), `site/assets/js/mapa.js` e `.mapa` em `styles.css`; no `template-inst.js` é o campo `mapa: { q, zoom }` de um bloco.

**Carrega só depois do clique** ("Carregar o mapa de X"). Sem o clique nenhuma requisição vai ao Google, então a política de privacidade continua verdadeira; a seção 5 dela ganhou o parágrafo dos mapas. O embed usa `google.com/maps?q=…&output=embed`, sem chave de API; a consulta destaca o ponto, e o contorno da cidade aparece quando o Google o tem. Se quiser destaque de contorno garantido ou estilo próprio, é preciso a Maps Embed API com chave (decisão e custo do dono). Testado: antes do clique 0 iframes, depois 1, console limpo. O embed em si depende do Google e não foi avaliado visualmente aqui.

**Pendências abertas da migração para São Paulo.**

1. **`tools/hubs.txt` está desatualizado.** São 813 ocorrências de "Londrina" nas palavras-chave. Ele é o dump da planilha de mapa de hubs, ou seja, um insumo, e não saída do site — por isso não foi reescrito. A taxonomia de hubs continua válida; o sufixo de cidade não. Re-exporte a planilha quando ela for refeita para SP. **Como referência de termos, ele foi substituído por `tools/termos-sp.md`.** **Atualização de 3 de novembro:** o mapa foi refeito para SP (`site/Mapa_de_Hubs_Planejados_SP.xlsx`, 807 linhas, com as abas Cidades SP e Localidades) e o dossiê também (`site/ICP_Planejados_SP_Dossie_de_Personas.md`). O dump do mapa novo está em `tools/hubs-sp.txt` (gerado com `node tools/xlsx-dump.js`); o `hubs.txt` e os arquivos `Londrina` em `site/` ficaram obsoletos. A taxonomia e os URLs sugeridos do mapa novo diferem dos já publicados em alguns hubs (ex.: H05 e H06 aqui têm pilares separadas, e o H21 do mapa prevê 27 páginas contra as 8 feitas) — confira antes de seguir a coluna "URL sugerida" ao pé da letra.
2. **O dossiê de ICP e este LEIA-ME estão dentro de `site/`**, a pasta que vai ao ar. Os dois seriam publicados junto com o site. Vale movê-los para `tools/` ou para a raiz antes de publicar.
3. **A pasta do projeto ainda se chama `planejadolondrina`.** Renomear quebra o diretório de trabalho de sessões abertas; faça manualmente, com tudo fechado. O mesmo vale para o repositório e o domínio.
4. **O mapa de hubs foi montado para uma cidade.** Com o foco em estado e páginas de cidade e bairro depois, a camada geográfica (hubs H22 e afins) precisa ser repensada antes de virar página.

**O que ainda falta no mapa.** Dos hubs do dropdown, H01, H02, H03, H04, H05, H06 e H13 estão cobertos, e o H21 (institucional) foi criado fora do mapa. A ordem seguinte, já revista pelo levantamento em `tools/termos-sp.md`:

| | Hub | Páginas | O que o dado mudou |
| --- | --- | --- | --- |
| ~~1~~ | H21 institucional | **11, feitas** (8 + modelo de orçamento, materiais e perguntas frequentes) | — |
| ~~2~~ | H07 tipo de imóvel | **10, feitas** (pilar + 9; ver "Hub H07") | Recorte trocado de "apartamento / casa / sobrado" para **metragem numérica**: pequeno (A), 40 m², 46 m², 50 m², casa completa (A), studio, 2 quartos, na planta. É a maior lacuna com demanda observada |
| ~~3~~ | H10 projeto e orçamento | **1, feita** (`/modelo-de-orcamento/`) | O termo "projeto 3D" é DIY. Vira página de conversão, não de ranqueamento |
| ~~4~~ | H22 localidades | **11, feitas** (hub + capital e 9 cidades) | Recorte trocado de bairro para **zona da capital + cidades atendidas**. Depende de o usuário dizer onde a operação instala |

**Mapa e dossiê novos (3/nov): o que muda e a ordem proposta depois do H07.** O mapa refeito para SP (`tools/hubs-sp.txt`) traz 22 hubs e 807 linhas, e o dossiê (`site/ICP_Planejados_SP_Dossie_de_Personas.md`) acrescenta a regra "a persona é estadual, a prova é local". Reconciliação com o que está publicado (114 páginas):

| Hub do mapa | Situação | Observação |
| --- | --- | --- |
| H01, H02, H03, H04, H06, H13 | publicados e completos | seguem as URLs publicadas |
| H05 | publicado como **duas** pilares (`/banheiros/`, `/lavanderias/`) | o mapa novo tem uma pilar só, `/ambientes/banheiro-e-lavanderia/`, e H06 como `/ambientes/areas-externas-e-especiais/`. **Recomendação: manter as URLs publicadas** e só registrar a divergência; migrar custaria redirecionamento sem ganho |
| H07 | **feito neste lote** | ver "Hub H07" |
| H21 | 11 de 27 | das 19 linhas de Fase 1 que faltam, a maioria é **seção** (garantia por escrito, entrega programada…) e já está dentro das 8 páginas; as que seriam páginas próprias dependem de dado da empresa (fábrica e showroom, avaliações, contato, preços e prazos) ou são consolidação (perguntas frequentes, materiais e ferragens) |
| H10, H18 | só o que o levantamento sustenta | H10 vira **1 página de conversão** ("modelo de orçamento"), H18 já é coberto por `/formas-de-pagamento/` e `/orcamento/`; as URLs do mapa (`/projeto-e-consultoria/`, `/condicoes/`) divergem das publicadas, mesma recomendação do H05 |
| H20 (guias e blog) | não existe | é o que resolveria o **menu Blog**, hoje com 1 link morto (sem dropdown) em 114 páginas. 36 artigos no mapa, 15 de Fase 1 |
| H22 (`/onde-atendemos/`) | **hub e 10 cidades da capital e Grande SP feitos (3/nov)** | ver "Hub H22". Só dado público; falta caso local, bairro atendido, prazo por praça e as cidades do interior (perguntas 15 e 16 da seção 28 do dossiê) |
| H08, H09, H11, H12, H14–H17, H19 | fora de escopo por ora | Fase 2 e 3 no mapa; H11 e H12 dependem de a empresa prestar montagem avulsa e assistência |

Ordem proposta, pelo critério "o que não depende de dado que só o dono tem" primeiro:

1. **~~Sem dado do dono~~ (feito em 3/nov, ver "Lote H10 e H21 de consolidação"):** uma página H10 de conversão (modelo de orçamento), e as páginas H21 de consolidação, **materiais e ferragens** (dossiê, seção 18; a marca real entra como `CONFIRMAR`) e **perguntas frequentes**. O Blog continua para decidir (criar H20 com 3 ou 4 artigos de Fase 1 ou tirar o item do menu); o usuário pediu para decidir depois.
2. **Depois que o dono responder** (praça-base, fábrica própria ou terceirizada, prazo real, equipe de instalação, garantia em meses, pagamento): H21 com dado (preços e prazos, contato, fábrica e showroom, avaliações) e os `CONFIRMAR` que esses números destravam.
3. **Só então H22**, com cidade-piloto (2 ou 3 praças, camadas 1 e 2 da aba Cidades SP), cada uma com caso local. Zona da capital continua sendo o recorte que o autocomplete reconhece, mas também depende de atender a capital.
4. **H07, segundo lote** (casa, sobrado, cobertura, casa em condomínio, chácara, padrão de acabamento, investidor) só se o Search Console mostrar demanda, ou se o dono disser que esses imóveis são o grosso da carteira.

**Decidido (3/nov): "remova /site" = não mexer.** Nenhuma URL do projeto contém `/site/`: a pasta `site/` é só a raiz publicada, e os links são relativos. Duas leituras possíveis: (1) limpar só as referências `site/…` da documentação; (2) achatar a estrutura, levando `site/` para a raiz do projeto, o que mexe em todos os scripts de `tools/` (a constante `SITE`), em `.claude/launch.json` e reabre o problema de `tools/` e dos documentos passarem a ser publicados junto. Das duas leituras, o usuário escolheu **não mexer**: a pasta `site/` e os scripts ficam como estão. Se voltar ao assunto, as duas opções acima continuam valendo.

Continuam fora do escopo os hubs H08 (marcenaria sob medida avulsa), H15 (complementares em madeira) e H16 (soluções funcionais e tecnologia).

**O menu Blog continua apontando para o vazio.** São 1 link `data-destino-futuro` (o item Blog, agora sem dropdown) em cada uma das 114 páginas, e eram os únicos links mortos que sobraram depois do lote institucional. Duas saídas: criar o hub de blog, ou tirar o item do menu até ele existir. **O usuário pediu para decidir depois.** **Atualização (3/nov):** a pedido do usuário, o Blog deixou de ter dropdown e é um link simples (`#contato` com `data-destino-futuro="/blog/"`), em `template.js`, `site/index.html` e `site/cozinhas/index.html`. Continua sendo o único link morto até o hub existir. O mapa tem linhas de H08 que pedem atenção quando forem criadas: `estante sob medida`, `sapateira sob medida`, `painel ripado` e `painel para TV sob medida` já têm nota de canibalização com as páginas de H02 criadas aqui.

**Imagens.** Os oito cartões de ambiente da home usam foto. As quatro últimas (`ambiente-lavanderia`, `ambiente-banheiro`, `ambiente-varanda`, `ambiente-comercial`) são **fotos de referência, não entregas da empresa** — troque por projeto próprio com autorização de uso de imagem. Elas também ainda **não foram redimensionadas**: estão com cerca de 1250 px e 200 a 280 KB cada, enquanto o cartão exibe no máximo uns 360 px. Antes de publicar, gere para cada uma a versão de 720 px e a de 480 px e acrescente o `srcset`, como nas quatro primeiras:

```html
srcset="assets/img/ambiente-lavanderia-480.webp 480w, assets/img/ambiente-lavanderia.webp 720w"
```

As mesmas quatro fotos são o hero das páginas de lavanderia, banheiro, varanda e comercial. As ilustrações em SVG feitas para o site (`projeto-lavanderia`, `projeto-banheiro`, `projeto-varanda-gourmet`, `projeto-comercial`, `projeto-home-office`) passaram a ser usadas só na seção de projetos dessas páginas — nenhuma ficou sem uso.

**Enquadramento do hero.** O hero tem proporção de cerca de 1,9:1 e a imagem é cortada com `object-fit: cover`, então, de uma foto quadrada, só a faixa central aparece, e de uma foto em pé, pouco mais de um terço. Quando o assunto da foto cai fora desse corte, use o campo `pos` no `hero` do arquivo de conteúdo, que vira `object-position`:

```js
hero: { img: 'ambiente-lavanderia.webp', pos: '72% 62%', w: 1254, h: 1254, alt: '…' }
```

O padrão do CSS é `72% center`. A lavanderia usa `72% 62%` para a bancada e a máquina entrarem no corte. Ao trocar por foto própria, prefira imagem deitada, de 2000 px no lado maior, que dispensa esse ajuste.

**Observação sobre a hierarquia.** No Mapa de Hubs, banheiro e lavanderia são um hub só (H05). Aqui foram separados em duas páginas porque o menu já separava os dois e porque as palavras-chave e as objeções são diferentes (umidade de respingo contra umidade de lavagem). Se o Search Console mostrar canibalização entre elas, junte-as em `/ambientes/banheiro-e-lavanderia/` com canonical apontando para a página mantida.

### O modelo: cozinha planejada em São Paulo

**Uma página, uma persona, um próximo passo:** o CTA único é o projeto 3D gratuito (formulário de 3 campos). Quem ainda compara tem uma segunda saída (checklist por WhatsApp).

| Intenção de busca | Onde é atendida |
| --- | --- |
| Transacional | Primeira dobra com formulário, faixas de preço, chamada final com formulário, barra fixa no celular |
| Comercial investigativa | Layouts (abas), padrões de preço, comparativo planejado × marcenaria × modulado com a ficha do que tem dentro do móvel, checklist de 24 itens |
| Informacional | Dores nomeadas, "para quem é", como funciona, FAQ de 16 perguntas por objeção |
| Navegacional e de confiança | Projetos, contrato e garantia, cabeçalho e rodapé iguais aos da home (com privacidade) |

**Pronta para Google Ads**
- Cabeçalho e rodapé iguais aos da home (o menu está em `assets/js/nav.js`, compartilhado). Se quiser máxima retenção no tráfego pago, dá para trocar por um cabeçalho só com âncoras e um botão.
- Formulário visível na primeira tela, também no celular. Barra fixa no celular some enquanto um formulário está na tela.
- UTM e `gclid` são lidos da URL, guardados na sessão e enviados nos campos ocultos e no evento `generate_lead`.
- Eventos no `dataLayer`: `form_start`, `generate_lead`, `whatsapp_click`, `cta_click`, `layout_view`. No GTM, crie a conversão do Google Ads com o gatilho "evento personalizado = generate_lead". Cole os snippets do GTM nos comentários marcados no `<head>` e no `<body>`.
- Use esta mesma URL com UTM nos anúncios. Não crie cópia: a canonical evita conteúdo duplicado.
- Sem scripts de terceiros, imagens em WebP com tamanho declarado e só a imagem da primeira dobra com prioridade.

**Antes de publicar (todos marcados com `CONFIRMAR` no HTML)**
1. Faixas de preço: são referência de mercado nacional. Troque pela tabela real.
2. Promessas: projeto 3D gratuito, medição técnica, prazo em dias úteis, parcela final só após a vistoria, revisão aos 30 e 90 dias, garantia por escrito, preço garantido por período. Só deixe o que a operação cumpre.
3. Prazo real de cada etapa do "como funciona", marca e espessura dos materiais e marca das ferragens.
4. Imagens de projeto: são ilustrativas. Troque por entregas reais com metragem, bairro e prazo, com autorização de uso de imagem.
5. Contrato modelo e política de privacidade já têm página (`/contrato-e-garantia/` e `/politica-de-privacidade/`), e os links apontam para elas. Falta o **checklist em PDF**, que o formulário do bloco "Ainda comparando?" promete enviar pelo WhatsApp — ele precisa existir como arquivo antes de a página ir ao ar.
6. Dados da empresa (razão social, CNPJ, endereço, telefone), área de atendimento e `SEU-DOMINIO` nos dados estruturados.

**Termos de busca cobertos** (sem volumes: o Semrush está sem saldo de API; confirme no Search Console depois de publicar)
- Principal: cozinha planejada em São Paulo (title, H1, eyebrow, alt da imagem e dados estruturados).
- Sinônimos: cozinha sob medida, armários de cozinha planejados, marcenaria sob medida, cozinha modulada (H2, H3, textos e FAQ).
- 3D: projeto de cozinha 3D, cozinha em 3D, cozinha 3D em São Paulo (H1, H3 do passo a passo, H2 e título da chamada final, FAQ).
- Layouts do mapa H01: cozinha pequena, americana, em L, em U, com ilha ou península, corredor (títulos dos painéis e links para as futuras páginas).
- Preço e orçamento: quanto custa uma cozinha planejada em São Paulo (H2), preço de cozinha sob medida, orçamento de cozinha planejada (passo a passo e checklist).
- Materiais: MDF, MDP, ferragens e soft close (H2 e H3).

### Termos cobertos nas outras páginas

Cada página repete o padrão da cozinha: o termo principal no title, H1, eyebrow e dados estruturados; os sinônimos nos H2 e H3; as variações de tipo nos títulos das abas, com link `data-destino-futuro` para a futura página filha do Mapa de Hubs.

- **Dormitórios e closets:** dormitório planejado, guarda-roupa planejado e sob medida, roupeiro embutido, portas de correr e de giro, closet planejado, closet pequeno, aberto, em L, em U e com ilha, quarto de bebê, infantil e de adolescente, penteadeira.
- **Salas e painéis:** móveis planejados para sala, painel de TV planejado, painel ripado, rack, buffet, estante planejada, nichos, biblioteca, home theater, sala de estar, sala de jantar, sala integrada, hall de entrada, sapateira, aparador.
- **Home office e lazer:** home office planejado, escritório residencial, escrivaninha planejada, estação de trabalho, cantinho de estudos, quarto gamer, sala de jogos, ateliê, espaço fitness.
- **Lavanderias:** lavanderia planejada, área de serviço planejada, lavanderia compacta, armário para máquina de lavar e para secadora, tábua de passar embutida, varal retrátil, armário de produtos de limpeza, despensa.
- **Banheiros:** banheiro planejado, gabinete de banheiro planejado, armário de banheiro, bancada de banheiro em marcenaria, lavabo planejado, banheiro pequeno, espelheira, nicho de box.
- **Varandas e áreas gourmet:** varanda planejada, varanda gourmet planejada, área gourmet planejada, churrasqueira com marcenaria, bar e adega, móveis planejados para área externa, marcenaria sob a escada, garagem planejada, espaço pet.
- **Espaços comerciais:** móveis planejados comerciais, móveis corporativos sob medida, escritório corporativo planejado, recepção planejada, marcenaria para lojas, para clínicas, para consultórios, para restaurantes, para cafeterias, para salões de beleza.

**Confirmar antes de publicar nas sete páginas novas:** as faixas de preço (todas são referência de mercado, com comentário `CONFIRMAR` no HTML), as promessas de prazo, revisão aos 30 e 90 dias e instalação fora do horário comercial (página de empresas), a emissão de nota em CNPJ e contrato PJ, e as imagens provisórias.


## Vídeo do hero (home)

A home usa `assets/video/` como fundo do hero. O `<img class="hero__media">` é o **poster** (e o LCP, com `fetchpriority="high"` e preload); o vídeo é criado por `assets/js/hero-video.js` só depois do `load`, em ociosidade, e entra com fade por cima do poster.

**Arquivos** (origem: `Downloads/marcenaria.mp4`, 1920x1080, 12,2 s, 30 fps, 32,2 MB, com áudio AAC):

| Arquivo | Uso | Tamanho |
| --- | --- | --- |
| `hero-marcenaria.av1.webm` / `hero-marcenaria.mp4` | desktop (1280x720) | 747 KB / 873 KB |
| `hero-marcenaria-sm.av1.webm` / `hero-marcenaria-sm.mp4` | celular, até 767 px (720x404) | 363 KB / 339 KB |
| `hero-marcenaria-poster.webp` / `-poster-sm.webp` | poster (1280 / 720 px) | 45 KB / 22 KB |

O navegador pega o AV1 se suportar; senão o MP4 (H.264). Sem trilha de áudio (`-an`), 24 fps, 11,3 s: cortei 0,3 s do início e o final, que escurecem (fade preto) e piscariam no laço.

**Comandos** (ffmpeg; `$S` = vídeo original; desktop mostrado, celular troca `scale=720:404` e CRF 43/31):

```bash
T="-ss 0.3 -t 11.3 -i $S -an"
ffmpeg $T -vf "fps=24,scale=1280:720:flags=lanczos" -c:v libsvtav1 -crf 42 -preset 4 -g 240 -pix_fmt yuv420p hero-marcenaria.av1.webm
ffmpeg $T -vf "fps=24,scale=1280:720:flags=lanczos" -c:v libx264 -crf 30 -preset veryslow -profile:v high -pix_fmt yuv420p -movflags +faststart hero-marcenaria.mp4
ffmpeg -ss 0.8 -i $S -frames:v 1 -vf scale=1280:-1 -c:v libwebp -quality 72 hero-marcenaria-poster.webp
```

**Comportamento.** O vídeo não é carregado (fica só o poster) com `prefers-reduced-motion: reduce`, `navigator.connection.saveData` ou conexão 2g. É decorativo: `muted`, `loop`, `autoplay`, `playsinline`, `aria-hidden="true"`, `tabindex="-1"`, sem controles. Se o `play()` falhar, o elemento é removido e o poster permanece.

**Contraste.** O gradiente do hero não mudou: medido em todos os quadros do vídeo (zona do texto, pior pixel, sem contar o desfoque), o texto menos contrastante (`hero__note`) fica em 5,7:1 e o branco em ≥ 8,6:1. Não dá para clarear o gradiente sem cair abaixo de 4,5:1.

**Trocar o vídeo.** Gere os mesmos nomes de arquivo com os comandos acima (corte o fade preto, tire o áudio) e escolha o poster em um quadro nítido. Se mudar a proporção, ajuste `width`/`height` do `<img>` do hero e o `object-position` de `.hero__video` em `styles.css`.
