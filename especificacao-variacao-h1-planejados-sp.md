# ESPECIFICAÇÃO --- SISTEMA DE VARIAÇÃO DOS H1

## Projeto Planejados SP

**Objetivo:** implementar um sistema inteligente de criação e
distribuição de H1 para páginas de cidades, distritos e bairros,
reduzindo a repetição estrutural entre páginas sem prejudicar a
relevância semântica, a naturalidade editorial e a intenção comercial.

------------------------------------------------------------------------

# 1. CONTEXTO E PROBLEMA

Atualmente, as páginas locais tendem a seguir estruturas muito
semelhantes:

-   Móveis planejados em \[localidade\]
-   Móveis sob medida em \[localidade\]
-   Marcenaria sob medida em \[localidade\]
-   Móveis planejados e sob medida em \[localidade\]

Embora sejam construções válidas, a repetição sistemática dessas
estruturas pode deixar a arquitetura editorial previsível e pouco
diversificada.

O objetivo não é simplesmente substituir palavras por sinônimos, mas
desenvolver diferentes maneiras naturais de apresentar o serviço e a
localidade.

Queremos que cada página tenha um H1 coerente, comercial,
contextualizado e linguisticamente diferente das demais.

**REGRA ABSOLUTA: nenhum H1 poderá ultrapassar 60 caracteres, contando
espaços, pontuação e todos os caracteres após a substituição das
variáveis.**

# 2. CONCEITOS FUNDAMENTAIS

O sistema deverá trabalhar com quatro elementos:

### 2.1. Palavra-chave principal

É o termo que representa o serviço oferecido.

Exemplos:

-   Móveis planejados
-   Móveis sob medida
-   Marcenaria sob medida
-   Marcenaria personalizada
-   Ambientes planejados
-   Projetos de móveis
-   Móveis personalizados

A palavra-chave deverá permanecer semanticamente relacionada ao serviço
efetivamente oferecido.

Não utilizar termos como marcenaria, fabricação própria ou projetos de
interiores como afirmações comerciais se não houver respaldo no conteúdo
e na operação da empresa.

### 2.2. Prefixo

O prefixo é uma expressão colocada **ANTES** da palavra-chave principal.

Sua função é modificar a abertura do título, criando uma construção
diferente da tradicional.

Exemplos:

-   Conheça móveis planejados em \[local\]
-   Descubra móveis planejados em \[local\]
-   Procurando móveis planejados em \[local\]?
-   Buscando móveis sob medida em \[local\]?
-   Para quem procura móveis planejados em \[local\]
-   Está buscando marcenaria sob medida em \[local\]?

Outras possibilidades:

-   Encontre
-   Conheça
-   Descubra
-   Procurando
-   Buscando
-   Se você procura
-   Para quem deseja
-   Soluções para quem busca

**Importante:** o prefixo é opcional. Não deve ser utilizado em todos os
títulos. Muitas vezes, a melhor construção será começar diretamente pela
palavra-chave.

### 2.3. Sufixo

O sufixo é uma expressão colocada **DEPOIS** da construção principal.

Sua função é complementar o título com uma proposta de valor, benefício
ou contexto residencial.

Exemplos:

-   Móveis planejados em \[local\] para sua casa
-   Móveis planejados em \[local\] para seu lar
-   Móveis planejados em \[local\] com seu estilo
-   Móveis planejados em \[local\] para seus ambientes
-   Móveis planejados em \[local\] para aproveitar cada espaço
-   Móveis planejados em \[local\] com soluções personalizadas
-   Móveis planejados em \[local\] para transformar sua casa

Outras possibilidades de complementos:

-   Para sua residência
-   Para seu espaço
-   Para seus ambientes
-   Com melhor aproveitamento
-   Com funcionalidade e estilo
-   Para ambientes mais funcionais
-   Sob medida para seu espaço
-   Para transformar seu ambiente

**Importante:** assim como os prefixos, os sufixos são opcionais. Não
devem ser adicionados automaticamente.

### 2.4. Título puro

O título puro é aquele que não possui prefixo nem sufixo.

É uma construção direta, objetiva e sem complementos.

Exemplos:

-   Móveis planejados em \[local\]
-   Móveis sob medida em \[local\]
-   Marcenaria sob medida em \[local\]
-   Ambientes planejados em \[local\]
-   Móveis personalizados em \[local\]
-   Projetos de móveis em \[local\]

**Essa categoria é extremamente importante.**

Não queremos que todas as páginas tenham frases elaboradas, comerciais
ou aparentemente criativas.

Algumas páginas devem apresentar títulos simples e diretos. Essa
alternância é fundamental para a naturalidade editorial do conjunto.

# 3. BIBLIOTECA DE CONSTRUÇÕES

O gerador deverá possuir uma biblioteca de modelos organizados por
categoria.

## 3.1. Modelos puros --- sem prefixo ou sufixo

1.  Móveis planejados em \[local\]
2.  Móveis sob medida em \[local\]
3.  Marcenaria sob medida em \[local\]
4.  Ambientes planejados em \[local\]
5.  Móveis personalizados em \[local\]
6.  Marcenaria personalizada em \[local\]
7.  Projetos de móveis em \[local\]
8.  Ambientes sob medida em \[local\]
9.  Planejamento de móveis em \[local\]

## 3.2. Modelos com prefixo

1.  Conheça móveis planejados em \[local\]
2.  Descubra móveis planejados em \[local\]
3.  Procurando móveis planejados em \[local\]?
4.  Buscando móveis sob medida em \[local\]?
5.  Encontre marcenaria sob medida em \[local\]
6.  Está buscando móveis planejados em \[local\]?
7.  Para quem procura móveis planejados em \[local\]
8.  Se você procura móveis sob medida em \[local\]

## 3.3. Modelos com sufixo

1.  Móveis planejados em \[local\] para sua casa
2.  Móveis planejados em \[local\] para seu lar
3.  Móveis planejados em \[local\] com seu estilo
4.  Móveis planejados em \[local\] para seus ambientes
5.  Móveis planejados em \[local\] sob medida
6.  Móveis sob medida em \[local\] para sua casa
7.  Marcenaria em \[local\] para seu projeto
8.  Ambientes planejados em \[local\] para seu lar

## 3.4. Modelos com abordagem de benefício

1.  Seu lar com móveis planejados em \[local\]
2.  Planejados para sua casa em \[local\]
3.  Transforme seu espaço com planejados em \[local\]
4.  Mais funcionalidade com planejados em \[local\]
5.  Móveis para transformar sua casa em \[local\]
6.  Ambientes funcionais com planejados em \[local\]
7.  Planeje melhor seus espaços em \[local\]
8.  Seu espaço, seu projeto: planejados em \[local\]

## 3.5. Modelos com abordagem de projeto

1.  Projetos sob medida para imóveis em \[local\]
2.  Soluções em móveis para \[local\]
3.  Marcenaria personalizada para \[local\]
4.  Móveis planejados para \[local\]
5.  Móveis sob medida para \[local\]
6.  Seu projeto de interiores em \[local\]
7.  Soluções personalizadas para seu lar em \[local\]

A biblioteca deverá ser expansível. Novos modelos poderão ser
acrescentados sem necessidade de modificar a lógica central do gerador.

# 4. LÓGICA DE VARIAÇÃO E COMBINAÇÃO

O sistema **NÃO** deverá obrigatoriamente combinar prefixo +
palavra-chave + sufixo.

Essa é uma das principais regras desta implementação.

Devemos ter diferentes possibilidades:

**Possibilidade A --- Título puro**

Móveis planejados em Osasco

**Possibilidade B --- Apenas prefixo**

Conheça móveis planejados em Osasco

**Possibilidade C --- Apenas sufixo**

Móveis planejados em Osasco para sua casa

**Possibilidade D --- Prefixo e sufixo**

Descubra móveis planejados em Osasco para seu lar

**Possibilidade E --- Construção alternativa**

Seu lar com móveis planejados em Osasco

**Possibilidade F --- Abordagem de projeto**

Projetos sob medida para imóveis em Osasco

O gerador deverá selecionar entre essas possibilidades de maneira
diversificada e contextualizada.

Não é necessário que todas as categorias tenham a mesma participação.

# 5. DISTRIBUIÇÃO EDITORIAL SUGERIDA

Como ponto de partida, utilizar a seguinte distribuição:

  Categoria                      Participação
  ---------------------------- --------------
  Títulos puros                           30%
  Títulos com prefixo                     15%
  Títulos com sufixo                      20%
  Prefixo + sufixo                         5%
  Benefícios e transformação              15%
  Projetos e personalização               15%

Essas porcentagens são referências iniciais, não regras rígidas de SEO.

O objetivo é impedir que o sistema fique dependente de uma única
estrutura.

A seleção deve considerar os títulos já utilizados em outras páginas,
evitando repetições.

# 6. DIFERENCIAÇÃO POR TIPO DE LOCALIDADE

O sistema deverá considerar o tipo de página antes de escolher a
construção.

### 6.1. Páginas de cidades

Priorizar construções comerciais e palavras-chave de maior intenção de
contratação.

Exemplos:

-   Móveis planejados em \[cidade\]
-   Marcenaria sob medida em \[cidade\]
-   Conheça móveis planejados em \[cidade\]
-   Móveis planejados em \[cidade\] para sua casa
-   Projetos de móveis em \[cidade\]

### 6.2. Páginas de distritos

Permitir maior diversidade entre serviço, projeto e personalização.

Exemplos:

-   Móveis sob medida em \[distrito\]
-   Seu lar com móveis planejados em \[distrito\]
-   Marcenaria personalizada em \[distrito\]
-   Procurando móveis planejados em \[distrito\]?
-   Projetos de móveis em \[distrito\]

### 6.3. Páginas de bairros

Permitir construções mais contextualizadas com espaços residenciais,
ambientes e personalização.

Exemplos:

-   Móveis planejados em \[bairro\]
-   Seu projeto de interiores em \[bairro\]
-   Ambientes planejados em \[bairro\]
-   Móveis sob medida para \[bairro\]
-   Marcenaria personalizada para \[bairro\]
-   Seu lar com móveis planejados em \[bairro\]

Não significa que os bairros deverão obrigatoriamente utilizar títulos
mais criativos. Títulos puros também devem aparecer nessas páginas.

# 7. REGRAS OBRIGATÓRIAS DE VALIDAÇÃO

O gerador deverá implementar as seguintes verificações:

1.  O H1 deve possuir no máximo 60 caracteres.
2.  A contagem deve acontecer **DEPOIS** da substituição da localidade.
3.  Espaços e pontuação entram na contagem.
4.  Não cortar automaticamente palavras ou expressões para atingir o
    limite.
5.  Não permitir títulos duplicados entre páginas.
6.  Não repetir excessivamente a mesma estrutura sintática.
7.  Não utilizar prefixos ou sufixos que deixem o título artificial.
8.  Não sacrificar a clareza da palavra-chave para produzir diversidade.
9.  Preservar o nome correto da localidade.
10. Garantir que o H1 represente o conteúdo real da página.

Se um modelo ultrapassar 60 caracteres, o sistema deverá tentar outro
modelo compatível.

Se nenhum modelo da categoria escolhida funcionar, poderá recorrer a
outra categoria.

Se necessário, deverá utilizar uma construção pura e curta.

Nunca gerar um H1 acima do limite.

# 8. DIVERSIDADE SINTÁTICA E NATURALIDADE

A diversidade não deverá se limitar à substituição de palavras.

Exemplo de diversidade insuficiente:

-   Móveis planejados em Moema
-   Móveis planejados em Pinheiros
-   Móveis planejados em Perdizes
-   Móveis planejados em Itaim Bibi

Embora as localidades sejam diferentes, a construção permanece idêntica.

Exemplo de maior diversidade:

-   Móveis planejados em Moema
-   Seu lar com móveis planejados em Pinheiros
-   Marcenaria sob medida em Perdizes
-   Procurando móveis planejados no Itaim Bibi?
-   Projetos de móveis em Vila Mariana
-   Ambientes planejados em Santana

A distribuição deve ser natural e não apresentar um padrão facilmente
previsível.

Não utilizar construções gramaticalmente estranhas apenas para
diversificar.

Também não utilizar palavras como "melhor", "mais barato", "menor
preço", "premium" ou "especialista" sem que exista fundamento real para
essa afirmação.

# 9. CONTROLE DE REPETIÇÃO ENTRE PÁGINAS

Implementar um mecanismo de controle que considere:

-   H1 completo.
-   Estrutura sintática.
-   Palavra-chave principal.
-   Prefixo utilizado.
-   Sufixo utilizado.
-   Categoria editorial.
-   Localidade.

O sistema deverá evitar que páginas próximas na sequência de geração
utilizem a mesma construção.

Também deverá verificar duplicidade global, e não apenas dentro do mesmo
município.

Sempre que possível, utilizar uma distribuição com memória dos H1 já
gerados.

Não é necessário proibir permanentemente todas as estruturas
semelhantes, mas evitar repetições excessivas e sequências artificiais.

# 10. REQUISITOS DE IMPLEMENTAÇÃO

Antes de modificar o código:

1.  Inspecionar o gerador atual de páginas.
2.  Identificar onde os H1 são construídos.
3.  Verificar se já existe alguma biblioteca de modelos.
4.  Aproveitar as estruturas existentes quando possível.
5.  Evitar duplicar regras em diferentes scripts.

Centralizar a biblioteca de H1 em um único módulo ou arquivo
reutilizável.

A implementação deverá permitir:

-   Adicionar novos modelos facilmente.
-   Alterar as porcentagens de distribuição.
-   Ativar ou desativar categorias.
-   Validar o limite de caracteres.
-   Verificar duplicidades.
-   Identificar o modelo utilizado em cada página.
-   Gerar um relatório dos H1 finais.

# 11. RELATÓRIO DE VALIDAÇÃO

Após implementar, gerar uma tabela contendo:

  Campo        Descrição
  ------------ -----------------------------
  URL          Endereço da página
  Localidade   Cidade, distrito ou bairro
  Tipo         Categoria da página
  H1 gerado    Título final
  Caracteres   Quantidade total
  Categoria    Puro, prefixo, sufixo etc.
  Modelo       Identificador da construção
  Validação    Aprovado ou reprovado

O relatório deverá permitir identificar rapidamente títulos repetidos,
estruturas excessivamente semelhantes e qualquer H1 acima de 60
caracteres.

# 12. PRINCÍPIO FINAL

A implementação não deve transformar a criação de H1 em uma simples
combinação aleatória de palavras.

Queremos uma biblioteca editorial inteligente, que produza títulos
naturais, claros, comercialmente relevantes e diversificados.

**Nem todos os títulos precisam ser elaborados. Nem todos precisam ter
prefixo. Nem todos precisam ter sufixo. Nem todos precisam começar com a
palavra-chave principal.**

Algumas páginas terão títulos puros e objetivos. Outras terão
introduções comerciais. Outras apresentarão benefícios ou projetos.

O mais importante é que cada H1 tenha uma construção coerente, respeite
o limite de 60 caracteres e represente corretamente o serviço e a
localidade.

**Prioridade absoluta: qualidade editorial, relevância, naturalidade e
diversidade real --- nunca variação artificial apenas para modificar
palavras.**
