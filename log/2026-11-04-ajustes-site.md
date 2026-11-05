# Log de alterações — 2026-11-04

Resumo das mudanças feitas no site (pasta `site/` do projeto original, publicadas aqui na raiz do repositório) nesta sessão de trabalho.

## 1. Menu "Onde atendemos" — distritos de amostra

O menu de navegação (presente em todas as páginas) tinha uma coluna "Distritos de São Paulo" mostrando 6 distritos de amostra. Os exemplos originais eram periféricos e de baixa renda (Grajaú, Jardim Ângela, Capão Redondo, Sapopemba, Sacomã, Itaquera), o que não representava bem o posicionamento da marca (móveis planejados de padrão alto).

**Trocados pelos distritos oficiais mais ricos de São Paulo:**
- Moema
- Itaim Bibi
- Jardim Paulista
- Pinheiros
- Alto de Pinheiros
- Perdizes

Aplicado nas 248 páginas que compartilham esse menu, preservando o prefixo de link relativo correto por profundidade de pasta e o atributo `aria-current="page"` quando a página atual é um dos distritos listados.

## 2. Separação das páginas de Beliche e Treliche

Antes, uma única página (`dormitorios-e-closets/beliche-planejado/`) misturava beliche (2 camas) e treliche (3 camas), com título, FAQ e dados estruturados compartilhados.

- `dormitorios-e-closets/beliche-planejado/` passou a tratar **somente** do beliche (2 camas): título, meta description, Open Graph, JSON-LD (Service/Breadcrumb/FAQPage), H1, variações, FAQ e CTA final revisados para falar só de beliche.
- Criada a página nova `dormitorios-e-closets/treliche-planejado/`, com conteúdo próprio sobre o treliche (3 camas): H1, descrição, JSON-LD, variações de layout (clássico e escada-gaveta, ambos agora desenhados para 3 camas), FAQ específico (pé-direito maior, guarda-corpo nas duas camas elevadas, escada mais alta etc.), preços e erros ajustados ao contexto de 3 camas.
- As duas páginas agora se referenciam como irmãs (links cruzados: "veja o treliche planejado" / "veja o beliche planejado").
- Atualizada a página pilar `dormitorios-e-closets/index.html`: a lista de "18 soluções" virou "19 soluções" (contagem corrigida em todo o site, nas 249 páginas que mostram esse link no menu), e a grade de soluções agora lista Beliche planejado e Treliche planejado como itens separados.

## 3. Título (H1) com até 58 caracteres em todas as páginas

Auditoria dos 249 arquivos `index.html`: 93 tinham H1 com mais de 58 caracteres (geralmente por repetir "em São Paulo"/"em SP" ou por manter uma frase explicativa longa depois de dois-pontos/vírgula).

Todos os 93 foram encurtados para ≤58 caracteres, priorizando:
1. Remover o sufixo de localização redundante ("em São Paulo", "em SP") quando isso já resolvia o excesso.
2. Cortar no primeiro ponto natural da frase (dois-pontos ou vírgula), preservando a palavra-chave do início do H1.

Resultado da auditoria final: 0 páginas com H1 acima de 58 caracteres.

## 4. CTAs personalizados por página

O texto "Quero meu projeto 3D gratuito" aparecia, de forma idêntica, no botão do formulário do topo, no título do formulário final e no botão de envio final — repetido em praticamente todas as ~245 páginas que têm formulário de lead.

Esse texto genérico foi trocado por versões contextuais:
- **Páginas de distrito/cidade:** ex. "Quero meus móveis planejados em Moema", "Receba seu orçamento em Moema", "Quero meu orçamento em Moema".
- **Páginas de produto/ambiente (cozinhas, dormitórios, salas, banheiros, lazer, varanda, etc.) e B2B (para-empresas):** ex. "Quero meu projeto 3D — Cozinha pequena planejada", "Quero ver em 3D — Marcenaria para clínicas", "Receber meu projeto 3D — Painel de TV planejado".
- **Páginas institucionais sem padrão automático** (arquitetos-interiores, construtoras-incorporadoras, imobiliárias-corretores, modelo-de-orçamento, orçamento, paisagistas, perguntas-frequentes, sobre): textos escritos à mão, alinhados ao contexto de cada uma (ex. "Quero ser parceiro da MarcenariaSP" / "Falar sobre parceria", "Quero um orçamento para o empreendimento" / "Falar sobre o empreendimento").

Verificação final: nenhuma ocorrência restante do texto genérico "Quero meu projeto 3D gratuito" no site.

## 5. Chamada final (perto do rodapé) sem o texto genérico "projeto 3D do seu imóvel"

Pedido específico: não usar "Peça o projeto 3D do seu imóvel" (nem a variante "Peça o projeto 3D dos seus móveis planejados em {cidade}") no título (H2) que aparece perto do rodapé, antes do formulário final.

Trocado por **"Peça seu planejamento 3D sob medida"**, mantendo o complemento de localização quando existia (ex. "Peça seu planejamento 3D sob medida em Moema", "... no Alto de Pinheiros"). Corrigido em 130 páginas (distritos, cidades, contato e as páginas de `para-seu-imovel/`). As páginas de produto, que já tinham uma chamada final própria e diferente (ex. "Peça o projeto 3D da sua cozinha com ilha"), não foram alteradas — elas não usavam o texto reclamado.

## Observações

- Nenhuma dessas alterações foi testada em navegador real (é um site estático, as mudanças foram feitas direto no HTML).
- As descrições (`meta description`) já continham, na maioria dos casos, a palavra-chave do H1 (ainda que não como substring literal contígua); não foi necessária reescrita em massa nesse ponto.
- Scripts auxiliares usados para aplicar as mudanças em massa (dropdown de distritos, split beliche/treliche, encurtar H1, personalizar CTAs, corrigir o H2 do rodapé) foram descartados ao final — não ficaram no repositório.

## 6. Separação de "Arquitetos e designers de interiores"

A página combinada `arquitetos-interiores/` misturava dois públicos distintos (arquitetos e designers de interiores). Foi dividida em duas páginas:

- **`arquitetos-urbanistas/`** — "Marcenaria para Arquitetos e Urbanistas". Mantém o conteúdo de escritório de arquitetura (projeto, medição na obra, cronograma com a obra, detalhamento técnico). Título formal usado no Brasil (profissão registrada no CAU); não amplia o escopo para urbanismo.
- **`designers-de-interiores/`** — "Marcenaria para Designers de Interiores". Página nova, com foco em memorial de design, paleta, acabamento e medição no local. Sem linguagem de obra civil. FAQ próprio (sem exigência de formação em arquitetura, acompanhamento de medição, condições comerciais).

Ajustes em todo o site (250 páginas):
- Menu "Empresa" passou a ter dois links separados: "Arquitetos e urbanistas" e "Designers de interiores", com `aria-current="page"` na página atual.
- Trilha de navegação e dados estruturados (JSON-LD) atualizados para cada página.
- Removida a pasta `arquitetos-interiores/`; nenhuma referência ao slug antigo permanece no site.
- H1 das duas páginas dentro do limite de 58 caracteres.
- Chamada final e formulário de cada página adaptados ao público (ex.: "Tem um projeto de arquitetura para executar em marcenaria?" e "Tem um projeto de design de interiores para executar em marcenaria?").
