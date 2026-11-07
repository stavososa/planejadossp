/**
 * Módulo Central: Gerador e Validador de Variações de H1 (Planejados SP)
 * Baseado na ESPECIFICAÇÃO — SISTEMA DE VARIAÇÃO DOS H1.
 *
 * REGRAS
 *  1. REGRA ABSOLUTA: nenhum H1 passa de 60 caracteres, contados DEPOIS de
 *     substituir a localidade (espaços e pontuação contam). Nunca se corta palavra.
 *  2. Instrução do dono (substitui a distribuição percentual da seção 5 da
 *     especificação, que fica só como referência de diversidade):
 *       a) prioridade: PREFIXO + SUFIXO juntos, quando o resultado couber em 60;
 *       b) se não couber, usar ao menos um dos dois (prefixo OU sufixo), variando qual;
 *       c) título puro só como último recurso, quando nenhuma combinação com
 *          prefixo ou sufixo couber em 60 caracteres (o registro traz o motivo).
 *  3. Nenhum H1 duplicado no site (memória global desta execução).
 *  4. Páginas próximas na sequência não repetem prefixo, sufixo, palavra-chave
 *     nem a mesma estrutura sintática (janela deslizante, regra rígida).
 *  5. Diferenciação por tipo de localidade (cidade, distrito, bairro): seção 6.
 *  6. Seção 8: proibido "melhor", "mais barato", "menor preço", "premium",
 *     "especialista" e qualquer afirmação de fabricação própria.
 *
 * COMO FUNCIONA
 *  O H1 é montado combinando PREFIXOS x PALAVRAS-CHAVE x SUFIXOS (listas
 *  abaixo). Para expandir a biblioteca basta acrescentar itens às listas:
 *  a lógica central não muda. Compatibilidades (para evitar construções
 *  artificiais) são controladas por `tags` e pelos grupos de conector.
 *
 * Toda regra de H1 vive só aqui; nenhum outro script deve duplicá-la.
 */

'use strict';

const MAX_H1 = 60;

const CATEGORIAS = {
  PURO: 'puro',
  PREFIXO: 'prefixo',
  SUFIXO: 'sufixo',
  PREFIXO_SUFIXO: 'prefixo_sufixo',
  BENEFICIO: 'beneficio' // prefixo de benefício ("Seu lar com ..."), com ou sem sufixo
};

const TIPOS_LOCAL = ['cidade', 'distrito', 'bairro'];

/* ------------------------------------------------------------------ *
 * PALAVRAS-CHAVE (o serviço). `tags` evitam redundância com prefixos e
 * sufixos (ex.: "sob medida" + sufixo "sob medida").
 *  - conectores: 'em' (em/no/na + local) e/ou 'para' (para + [o/a] + local)
 *  - afinidade: peso 0..1 por tipo de localidade (1 = preferida; seção 6)
 * ------------------------------------------------------------------ */
const PALAVRAS_CHAVE = [
  { id: 'KW01', texto: 'Móveis planejados', tags: ['plan'], conectores: ['em', 'para'], afinidade: { cidade: 1, distrito: 1, bairro: 0.8 } },
  { id: 'KW02', texto: 'Móveis sob medida', tags: ['sm'], conectores: ['em', 'para'], afinidade: { cidade: 0.9, distrito: 1, bairro: 0.9 } },
  { id: 'KW03', texto: 'Móveis personalizados', tags: ['pers'], conectores: ['em', 'para'], afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'KW04', texto: 'Marcenaria sob medida', tags: ['sm', 'marc'], conectores: ['em', 'para'], afinidade: { cidade: 1, distrito: 0.9, bairro: 0.7 } },
  { id: 'KW05', texto: 'Marcenaria personalizada', tags: ['pers', 'marc'], conectores: ['em', 'para'], afinidade: { cidade: 0.6, distrito: 1, bairro: 0.9 } },
  { id: 'KW06', texto: 'Marcenaria planejada', tags: ['plan', 'marc'], conectores: ['em'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.8 } },
  { id: 'KW07', texto: 'Marcenaria', tags: ['marc'], conectores: ['em'], afinidade: { cidade: 0.6, distrito: 0.7, bairro: 0.7 } },
  { id: 'KW08', texto: 'Ambientes planejados', tags: ['plan', 'ambiente'], conectores: ['em'], afinidade: { cidade: 0.5, distrito: 0.8, bairro: 1 } },
  { id: 'KW09', texto: 'Ambientes sob medida', tags: ['sm', 'ambiente'], conectores: ['em'], afinidade: { cidade: 0.5, distrito: 0.8, bairro: 1 } },
  { id: 'KW10', texto: 'Projetos de móveis', tags: ['projeto'], conectores: ['em'], afinidade: { cidade: 1, distrito: 0.9, bairro: 0.7 } },
  { id: 'KW11', texto: 'Planejamento de móveis', tags: ['plan', 'projeto'], conectores: ['em'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.8 } },
  { id: 'KW12', texto: 'Movelaria planejada', tags: ['plan', 'movelaria'], conectores: ['em'], afinidade: { cidade: 0.5, distrito: 0.8, bairro: 0.8 } },
  { id: 'KW13', texto: 'Soluções em móveis', tags: ['projeto'], conectores: ['para'], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.8 } },
  { id: 'KW14', texto: 'Projetos sob medida para imóveis', tags: ['sm', 'projeto', 'imovel'], conectores: ['em'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } }
];

/* ------------------------------------------------------------------ *
 * PREFIXOS (antes da palavra-chave).
 *  - familia: 'imperativo' | 'pergunta' | 'condicional' | 'beneficio'
 *  - pergunta: true => o H1 termina com "?"
 *  - semSufixoPara: não combinar com sufixos do grupo 'para' (evita "para ... para")
 *  - aceitaSufixo: 'todos' | 'beneficio' (só sufixos marcados com `beneficio: true`)
 *  - semKw: tags de palavra-chave incompatíveis
 * ------------------------------------------------------------------ */
const PREFIXOS = [
  // imperativos / convites
  { id: 'PRE01', texto: 'Conheça', familia: 'imperativo', afinidade: { cidade: 1, distrito: 0.9, bairro: 0.8 } },
  { id: 'PRE02', texto: 'Descubra', familia: 'imperativo', afinidade: { cidade: 0.9, distrito: 1, bairro: 0.9 } },
  { id: 'PRE03', texto: 'Encontre', familia: 'imperativo', afinidade: { cidade: 1, distrito: 0.9, bairro: 0.8 } },
  { id: 'PRE04', texto: 'Veja', familia: 'imperativo', afinidade: { cidade: 0.7, distrito: 0.9, bairro: 1 } },
  { id: 'PRE05', texto: 'Explore', familia: 'imperativo', afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'PRE06', texto: 'Escolha', familia: 'imperativo', afinidade: { cidade: 0.8, distrito: 0.8, bairro: 0.8 } },
  { id: 'PRE07', texto: 'Confira', familia: 'imperativo', afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'PRE08', texto: 'Busque', familia: 'imperativo', afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.8 } },
  { id: 'PRE09', texto: 'Conte com', familia: 'imperativo', afinidade: { cidade: 0.9, distrito: 0.8, bairro: 0.7 } },
  { id: 'PRE10', texto: 'Peça orçamento de', familia: 'imperativo', afinidade: { cidade: 1, distrito: 0.7, bairro: 0.6 } },
  // perguntas
  { id: 'PRE11', texto: 'Procurando', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.7, distrito: 1, bairro: 0.9 } },
  { id: 'PRE12', texto: 'Buscando', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.7, distrito: 1, bairro: 0.9 } },
  { id: 'PRE13', texto: 'Está buscando', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE14', texto: 'Está procurando', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE15', texto: 'Precisa de', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.9 } },
  { id: 'PRE16', texto: 'Quer', familia: 'pergunta', pergunta: true, afinidade: { cidade: 0.5, distrito: 0.8, bairro: 0.9 } },
  // condicionais
  { id: 'PRE17', texto: 'Se você procura', familia: 'condicional', afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE18', texto: 'Se você busca', familia: 'condicional', afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE19', texto: 'Se você quer', familia: 'condicional', afinidade: { cidade: 0.5, distrito: 0.8, bairro: 0.9 } },
  { id: 'PRE20', texto: 'Para quem procura', familia: 'condicional', semSufixoPara: true, afinidade: { cidade: 0.7, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE21', texto: 'Para quem busca', familia: 'condicional', semSufixoPara: true, afinidade: { cidade: 0.7, distrito: 0.9, bairro: 0.9 } },
  { id: 'PRE22', texto: 'Para quem quer', familia: 'condicional', semSufixoPara: true, afinidade: { cidade: 0.5, distrito: 0.8, bairro: 0.9 } },
  { id: 'PRE23', texto: 'Soluções para quem busca', familia: 'condicional', semSufixoPara: true, afinidade: { cidade: 0.8, distrito: 0.8, bairro: 0.7 } },
  // benefício / transformação (seção 3.4); só combinam com sufixos marcados como `beneficio`
  { id: 'BEN01', texto: 'Seu lar com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['lar'], semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.9, bairro: 1 } },
  { id: 'BEN02', texto: 'Sua casa com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['casa'], semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 1 } },
  { id: 'BEN03', texto: 'Seu espaço com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['espaco'], semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN04', texto: 'Mais espaço com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['espaco'], semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.9, bairro: 0.9 } },
  { id: 'BEN05', texto: 'Mais funcionalidade com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['funcional'], semKw: ['imovel'], afinidade: { cidade: 0.7, distrito: 0.9, bairro: 0.9 } },
  { id: 'BEN06', texto: 'Mais conforto com', familia: 'beneficio', aceitaSufixo: 'beneficio', semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN07', texto: 'Transforme sua casa com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['casa', 'transforma'], semKw: ['imovel'], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN08', texto: 'Transforme seu espaço com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['espaco', 'transforma'], semKw: ['imovel'], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN09', texto: 'Aproveite cada espaço com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['espaco'], semKw: ['imovel'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN10', texto: 'Planeje seus ambientes com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['ambiente', 'plan'], semKw: ['imovel', 'plan', 'ambiente'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN11', texto: 'Ambientes funcionais com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['ambiente', 'funcional'], semKw: ['imovel', 'ambiente'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'BEN12', texto: 'Cada ambiente com', familia: 'beneficio', aceitaSufixo: 'beneficio', tags: ['ambiente'], semKw: ['imovel', 'ambiente'], afinidade: { cidade: 0.5, distrito: 0.8, bairro: 0.9 } }
];

/* ------------------------------------------------------------------ *
 * SUFIXOS (depois da construção principal; sempre começam com espaço).
 *  - grupo: 'para' | 'com' | 'sm' ("sob medida"/"sob encomenda")
 *  - beneficio: pode acompanhar prefixos de benefício
 *  - semKw: tags de palavra-chave incompatíveis (evita redundância)
 *  - tags: conceitos usados (conflito com prefixo/palavra-chave de mesma tag)
 * ------------------------------------------------------------------ */
const SUFIXOS = [
  { id: 'SUF01', texto: ' para sua casa', grupo: 'para', tags: ['casa'], afinidade: { cidade: 1, distrito: 1, bairro: 1 } },
  { id: 'SUF02', texto: ' para seu lar', grupo: 'para', tags: ['lar'], afinidade: { cidade: 1, distrito: 1, bairro: 1 } },
  { id: 'SUF03', texto: ' para seu espaço', grupo: 'para', tags: ['espaco'], afinidade: { cidade: 0.9, distrito: 0.9, bairro: 0.9 } },
  { id: 'SUF04', texto: ' para seus ambientes', grupo: 'para', tags: ['ambiente'], afinidade: { cidade: 0.7, distrito: 0.9, bairro: 1 } },
  { id: 'SUF05', texto: ' para sua residência', grupo: 'para', tags: ['casa'], afinidade: { cidade: 0.9, distrito: 0.8, bairro: 0.8 } },
  { id: 'SUF06', texto: ' para seu imóvel', grupo: 'para', tags: ['imovel'], semKw: ['imovel'], afinidade: { cidade: 0.9, distrito: 0.9, bairro: 0.8 } },
  { id: 'SUF07', texto: ' para seu apartamento', grupo: 'para', tags: ['imovel'], semKw: ['imovel'], afinidade: { cidade: 0.7, distrito: 0.9, bairro: 0.9 } },
  { id: 'SUF08', texto: ' para você', grupo: 'para', tags: [], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.8 } },
  { id: 'SUF09', texto: ' para sua família', grupo: 'para', tags: [], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.9 } },
  { id: 'SUF10', texto: ' para seu projeto', grupo: 'para', tags: ['projeto'], semKw: ['projeto'], afinidade: { cidade: 0.9, distrito: 0.8, bairro: 0.7 } },
  { id: 'SUF11', texto: ' para cada ambiente', grupo: 'para', beneficio: true, tags: ['ambiente'], afinidade: { cidade: 0.7, distrito: 0.9, bairro: 1 } },
  { id: 'SUF12', texto: ' para aproveitar cada espaço', grupo: 'para', tags: ['espaco'], afinidade: { cidade: 0.7, distrito: 0.9, bairro: 0.9 } },
  { id: 'SUF13', texto: ' para ambientes mais funcionais', grupo: 'para', tags: ['ambiente', 'funcional'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'SUF14', texto: ' para transformar sua casa', grupo: 'para', tags: ['casa', 'transforma'], afinidade: { cidade: 0.7, distrito: 0.8, bairro: 0.9 } },
  { id: 'SUF15', texto: ' para transformar seu ambiente', grupo: 'para', tags: ['ambiente', 'transforma'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'SUF18', texto: ' para casa e apartamento', grupo: 'para', tags: ['casa', 'imovel'], semKw: ['imovel'], afinidade: { cidade: 0.9, distrito: 0.8, bairro: 0.8 } },
  { id: 'SUF19', texto: ' para reformas e imóveis novos', grupo: 'para', tags: ['imovel'], semKw: ['imovel'], afinidade: { cidade: 0.8, distrito: 0.8, bairro: 0.7 } },
  { id: 'SUF20', texto: ' com seu estilo', grupo: 'com', tags: ['estilo'], afinidade: { cidade: 0.8, distrito: 1, bairro: 1 } },
  { id: 'SUF21', texto: ' com estilo', grupo: 'com', tags: ['estilo'], afinidade: { cidade: 0.6, distrito: 0.8, bairro: 0.9 } },
  { id: 'SUF22', texto: ' com soluções personalizadas', grupo: 'com', tags: ['pers'], semKw: ['pers'], afinidade: { cidade: 0.9, distrito: 0.9, bairro: 0.8 } },
  { id: 'SUF23', texto: ' com funcionalidade e estilo', grupo: 'com', tags: ['estilo', 'funcional'], afinidade: { cidade: 0.8, distrito: 0.9, bairro: 0.9 } },
  { id: 'SUF24', texto: ' com aproveitamento de espaço', grupo: 'com', tags: ['espaco'], afinidade: { cidade: 0.8, distrito: 0.9, bairro: 0.9 } },
  { id: 'SUF25', texto: ' com medição técnica', grupo: 'com', tags: [], afinidade: { cidade: 0.9, distrito: 0.8, bairro: 0.7 } },
  { id: 'SUF26', texto: ' sob medida', grupo: 'sm', tags: ['sm'], semKw: ['sm', 'pers', 'projeto'], afinidade: { cidade: 0.7, distrito: 0.7, bairro: 0.7 } }
];

/* ------------------------------------------------------------------ *
 * Termos proibidos (seção 8 da especificação e restrições do negócio)
 * ------------------------------------------------------------------ */
const TERMOS_PROIBIDOS = /\b(melhor(es)?|mais barato|menor pre[cç]o|premium|especialista|exclusiv[oa]s?|f[aá]brica|fabrica[cç][aã]o|fabricamos|showroom)\b/i;

/* ------------------------------------------------------------------ *
 * Configuração ajustável (ativar/desativar categorias, pesos, janela)
 * ------------------------------------------------------------------ */
const config = {
  categoriasAtivas: {
    [CATEGORIAS.PREFIXO_SUFIXO]: true,
    [CATEGORIAS.PREFIXO]: true,
    [CATEGORIAS.SUFIXO]: true,
    [CATEGORIAS.BENEFICIO]: true,
    [CATEGORIAS.PURO]: true
  },
  janelaVizinhos: 4,       // páginas próximas que não podem repetir prefixo/sufixo/palavra-chave
  janelaEstrutura: 6,      // janela de penalização suave
  pesoUsoGlobal: 3,        // equilibra uso de cada prefixo/sufixo/palavra-chave no site
  pesoAfinidadeTipo: 14    // peso da afinidade por tipo de localidade (seção 6)
};

function configurar(parcial = {}) {
  Object.assign(config, parcial, {
    categoriasAtivas: Object.assign({}, config.categoriasAtivas, parcial.categoriasAtivas || {})
  });
  return config;
}

/* ------------------------------------------------------------------ *
 * Estado: memória global de geração
 * ------------------------------------------------------------------ */
const historico = [];
const usados = new Set();
const usoGlobal = new Map();   // contadores por peça (prefixo, sufixo, palavra-chave, conector)
let ultimoSingle = null;       // 'prefixo' | 'sufixo' da última página com apenas um dos dois

/* ------------------------------------------------------------------ *
 * Utilidades
 * ------------------------------------------------------------------ */
function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function min1(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

/**
 * Monta o objeto de localidade com as formas gramaticais necessárias.
 * @param {string} nome  Nome correto e acentuado (ex.: "Butantã")
 * @param {string} prep  'em' | 'no' | 'na' (preposição já contraída)
 */
function montarLocal(nome, prep = 'em') {
  const artigo = prep === 'no' ? 'o ' : prep === 'na' ? 'a ' : '';
  return {
    nome,
    prep,
    em: `${prep} ${nome}`,           // "no Butantã", "em Moema"
    para: `para ${artigo}${nome}`,   // "para o Butantã", "para Moema"
    de: `${prep === 'no' ? 'do' : prep === 'na' ? 'da' : 'de'} ${nome}`
  };
}

function normalizarLocal(local) {
  if (local && typeof local === 'object') {
    return local.em ? local : montarLocal(local.nome, local.prep || 'em');
  }
  return montarLocal(String(local), 'em');
}

function inter(a = [], b = []) {
  return a.some(x => b.includes(x));
}

function usoDe(chave) { return usoGlobal.get(chave) || 0; }
function incrementaUso(chave) { usoGlobal.set(chave, usoDe(chave) + 1); }

/* ------------------------------------------------------------------ *
 * Montagem de um H1 a partir de (prefixo?, palavra-chave, conector, sufixo?)
 * ------------------------------------------------------------------ */
function montar(pre, kw, conector, suf, loc) {
  const kwTexto = pre ? min1(kw.texto) : kw.texto;
  const ponta = conector === 'para' ? loc.para : loc.em;
  let h1 = `${pre ? pre.texto + ' ' : ''}${kwTexto} ${ponta}${suf ? suf.texto : ''}`;
  if (pre && pre.pergunta) h1 += '?';
  return h1;
}

function compativel(pre, kw, conector, suf) {
  if (kw.conectores.indexOf(conector) === -1) return false;
  if (pre) {
    if (pre.semKw && inter(pre.semKw, kw.tags)) return false;
    if (pre.tags && inter(pre.tags, kw.tags)) return false;
    if (pre.familia === 'beneficio' && conector === 'para') return false;
    if (pre.familia === 'beneficio' && kw.conectores.indexOf('em') === -1) return false;
    // prefixos que começam com "Para" (condicionais) não combinam com o conector
    // "para" (ex.: KW13/KW14): evita duplicidade "Para quem busca ... para [local]"
    if (/^Para /i.test(pre.texto) && conector === 'para') return false;
  }
  if (suf) {
    if (suf.semKw && inter(suf.semKw, kw.tags)) return false;
    if (inter(suf.tags, kw.tags)) return false;
    if (conector === 'para' && suf.grupo === 'para') return false;
    if (conector === 'para' && suf.grupo === 'sm') return false;
    // palavra-chave já "planejada" + sufixo "sob medida" soa redundante/contraditório
    if (kw.tags.indexOf('plan') !== -1 && suf.grupo === 'sm') return false;
    if (pre) {
      if (pre.semSufixoPara && suf.grupo === 'para') return false;
      if (pre.semSufixoPara && suf.id === 'SUF20') return false; // "Para quem busca ... com seu estilo"
      if (pre.aceitaSufixo === 'beneficio' && !suf.beneficio && suf.grupo !== 'sm') return false;
      if (pre.tags && inter(pre.tags, suf.tags)) return false;
      if (pre.tags && pre.tags.indexOf('plan') !== -1 && suf.grupo === 'sm') return false;
      // perguntas e condicionais: sufixo "sob medida" soaria como resposta, não como complemento
      if ((pre.familia === 'pergunta' || pre.familia === 'condicional') && suf.grupo === 'sm') return false;
    }
  }
  return true;
}

/* ------------------------------------------------------------------ *
 * Validação de um H1 isolado
 * ------------------------------------------------------------------ */
function validarH1(h1, local) {
  const motivos = [];
  const loc = normalizarLocal(local || { nome: '' });
  if (h1.length > MAX_H1) motivos.push(`acima de ${MAX_H1} caracteres (${h1.length})`);
  if (loc.nome && h1.indexOf(loc.nome) === -1) motivos.push('nome da localidade ausente');
  if (TERMOS_PROIBIDOS.test(h1)) motivos.push('termo proibido (seção 8)');
  if (/\s{2,}|\[|\]|\{|\}/.test(h1)) motivos.push('espaços duplos ou marcador não substituído');
  if (!/^[A-ZÀ-Ú]/.test(h1)) motivos.push('não começa com maiúscula');
  return { ok: motivos.length === 0, motivos };
}

/* ------------------------------------------------------------------ *
 * Enumeração e pontuação de candidatos
 * ------------------------------------------------------------------ */
function categoriaDe(pre, suf) {
  if (pre && pre.familia === 'beneficio') return CATEGORIAS.BENEFICIO;
  if (pre && suf) return CATEGORIAS.PREFIXO_SUFIXO;
  if (pre) return CATEGORIAS.PREFIXO;
  if (suf) return CATEGORIAS.SUFIXO;
  return CATEGORIAS.PURO;
}

/** Nível de prioridade pedido pelo dono: 1 = prefixo+sufixo; 2 = um dos dois; 3 = puro */
function nivelDe(pre, suf) {
  if (pre && suf) return 1;
  if (pre || suf) return 2;
  return 3;
}

function enumerar(loc, palavrasChave) {
  const out = [];
  const pres = [null].concat(PREFIXOS);
  const sufs = [null].concat(SUFIXOS);
  for (const kw of palavrasChave) {
    for (const conector of kw.conectores) {
      for (const pre of pres) {
        for (const suf of sufs) {
          if (!compativel(pre, kw, conector, suf)) continue;
          const h1 = montar(pre, kw, conector, suf, loc);
          if (h1.length > MAX_H1) continue; // REGRA ABSOLUTA
          const categoria = categoriaDe(pre, suf);
          if (!config.categoriasAtivas[categoria]) continue;
          out.push({ h1, pre, kw, conector, suf, categoria, nivel: nivelDe(pre, suf) });
        }
      }
    }
  }
  return out;
}

function palavrasChaveParaServico(servicoNome) {
  if (!servicoNome) return PALAVRAS_CHAVE;
  // Compatibilidade com scripts que informam um serviço específico (ex.: "Cozinhas planejadas").
  const s = servicoNome.trim();
  const tags = [];
  if (/planejad/i.test(s)) tags.push('plan');
  if (/sob medida/i.test(s)) tags.push('sm');
  if (/personaliz/i.test(s)) tags.push('pers');
  if (/marcenaria/i.test(s)) tags.push('marc');
  if (/ambiente/i.test(s)) tags.push('ambiente');
  return [{ id: 'KWSERV', texto: cap(s), tags, conectores: ['em', 'para'], afinidade: { cidade: 1, distrito: 1, bairro: 1 } }];
}

function estruturaDe(c) {
  return [c.pre ? c.pre.familia : '-', c.kw.id, c.conector, c.suf ? c.suf.grupo : '-'].join('|');
}

function modeloIdDe(c) {
  return [c.pre ? c.pre.id : 'SEM', c.kw.id + (c.conector === 'para' ? 'p' : ''), c.suf ? c.suf.id : 'SEM'].join('+');
}

function pontuar(c, tipo, seed) {
  const janela = historico.slice(-config.janelaEstrutura);
  let custo = 0;

  // diferenciação por tipo de localidade (seção 6)
  const afin = (c.kw.afinidade[tipo] ?? 1)
    * (c.pre ? (c.pre.afinidade[tipo] ?? 1) : 1)
    * (c.suf ? (c.suf.afinidade[tipo] ?? 1) : 1);
  custo += (1 - afin) * config.pesoAfinidadeTipo;

  // equilíbrio global: peças menos usadas até agora saem na frente
  custo += usoDe('kw:' + c.kw.id) * config.pesoUsoGlobal * 0.6;
  if (c.pre) custo += usoDe('pre:' + c.pre.id) * config.pesoUsoGlobal;
  if (c.suf) custo += usoDe('suf:' + c.suf.id) * config.pesoUsoGlobal;
  custo += usoDe('conn:' + c.conector) * 0.15 * (c.conector === 'para' ? 6 : 0);
  custo += usoDe('fam:' + (c.pre ? c.pre.familia : '-')) * 0.5;

  // penalização suave por semelhança estrutural com as vizinhas (janela maior)
  const estrutura = estruturaDe(c);
  janela.forEach((h, i) => {
    const peso = (i + 1) / janela.length; // vizinhas mais recentes pesam mais
    if (h._estrutura === estrutura) custo += 25 * peso;
    if (h._kwId === c.kw.id) custo += 12 * peso;
    if (c.pre && h._preFamilia === c.pre.familia) custo += 6 * peso;
    if (c.suf && h._sufGrupo === c.suf.grupo) custo += 3 * peso;
    if (h._conector === c.conector && c.conector === 'para') custo += 8 * peso;
  });

  // desempate determinístico
  custo += (hash32(seed + '|' + c.h1) % 1000) / 1000 * 4;
  return custo;
}

function violaVizinhanca(c) {
  const janela = historico.slice(-config.janelaVizinhos);
  for (const h of janela) {
    if (c.pre && h._preId === c.pre.id) return true;
    if (c.suf && h._sufId === c.suf.id) return true;
    if (h._kwId === c.kw.id && h._conector === c.conector) return true;
  }
  const ult = historico[historico.length - 1];
  if (ult && ult._estrutura === estruturaDe(c)) return true;
  return false;
}

/* ------------------------------------------------------------------ *
 * API principal
 * ------------------------------------------------------------------ */
/**
 * Gera um H1.
 * @param {Object} p
 * @param {string|Object} p.local   Nome ("Osasco") ou objeto de montarLocal()
 * @param {string} [p.tipoLocal]    'cidade' | 'distrito' | 'bairro'
 * @param {string} [p.urlPath]      Caminho da página (para o relatório)
 * @param {string} [p.servicoNome]  Serviço específico (compatibilidade); omitido = biblioteca completa
 * @param {string} [p.seed]         Semente de desempate (padrão: urlPath ou nome)
 */
function gerarH1({ local, servicoNome = null, tipoLocal = 'cidade', urlPath = '', seed = null }) {
  const loc = normalizarLocal(local);
  const tipo = TIPOS_LOCAL.indexOf(tipoLocal) === -1 ? 'cidade' : tipoLocal;
  const semente = seed || urlPath || loc.nome;
  const todos = enumerar(loc, palavrasChaveParaServico(servicoNome))
    .filter(c => !usados.has(c.h1.toLowerCase()) && !TERMOS_PROIBIDOS.test(c.h1));

  let escolhido = null;
  let motivoPuro = null;

  // Níveis em ordem de prioridade do dono: 1) prefixo+sufixo; 2) um dos dois; 3) puro.
  for (const nivel of [1, 2, 3]) {
    let pool = todos.filter(c => c.nivel === nivel);
    if (!pool.length) continue;

    if (nivel === 2) {
      // varia qual dos dois é usado: alterna com o último caso de "apenas um"
      const queroPrefixo = ultimoSingle !== 'prefixo';
      const preferidos = pool.filter(c => (queroPrefixo ? !!c.pre : !!c.suf));
      if (preferidos.length) pool = preferidos;
    }

    const livres = pool.filter(c => !violaVizinhanca(c));
    const base = livres.length ? livres : pool;
    let melhor = null;
    let melhorCusto = Infinity;
    for (const c of base) {
      const custo = pontuar(c, tipo, semente);
      if (custo < melhorCusto) { melhorCusto = custo; melhor = c; }
    }
    escolhido = melhor;
    if (nivel === 3) motivoPuro = 'nenhum modelo com prefixo ou sufixo cabe em 60 caracteres sem repetir H1 já usado';
    break;
  }

  if (!escolhido) {
    throw new Error(`Nenhum H1 válido (<= ${MAX_H1} caracteres e inédito) para "${loc.nome}" (${urlPath})`);
  }

  const c = escolhido;
  usados.add(c.h1.toLowerCase());
  incrementaUso('kw:' + c.kw.id);
  incrementaUso('conn:' + c.conector);
  incrementaUso('fam:' + (c.pre ? c.pre.familia : '-'));
  if (c.pre) incrementaUso('pre:' + c.pre.id);
  if (c.suf) incrementaUso('suf:' + c.suf.id);
  if (c.nivel === 2) ultimoSingle = c.pre ? 'prefixo' : 'sufixo';

  const validacao = validarH1(c.h1, loc);
  const registro = {
    url: urlPath,
    localidade: loc.nome,
    tipo,
    h1: c.h1,
    chars: c.h1.length,
    categoria: c.categoria,
    modeloId: modeloIdDe(c),
    aprovado: validacao.ok,
    problemas: validacao.motivos,
    motivoPuro,
    palavraChave: c.kw.texto,
    prefixo: c.pre ? c.pre.texto : null,
    sufixo: c.suf ? c.suf.texto.trim() : null,
    // campos internos de controle de vizinhança
    _estrutura: estruturaDe(c),
    _kwId: c.kw.id,
    _conector: c.conector,
    _preId: c.pre ? c.pre.id : null,
    _preFamilia: c.pre ? c.pre.familia : null,
    _sufId: c.suf ? c.suf.id : null,
    _sufGrupo: c.suf ? c.suf.grupo : null
  };
  historico.push(registro);
  return registro;
}

/* ------------------------------------------------------------------ *
 * Verificações globais e relatório (seção 11 da especificação)
 * ------------------------------------------------------------------ */
function verificarHistorico() {
  const problemas = [];
  const vistos = new Map();
  historico.forEach(r => {
    if (r.chars > MAX_H1) problemas.push(`${r.url}: H1 com ${r.chars} caracteres`);
    const k = r.h1.toLowerCase();
    if (vistos.has(k)) problemas.push(`H1 duplicado: "${r.h1}" (${vistos.get(k)} e ${r.url})`);
    vistos.set(k, r.url);
    if (!r.aprovado) problemas.push(`${r.url}: ${r.problemas.join('; ')}`);
  });
  return problemas;
}

function gerarRelatorioValidacao() {
  let md = '| URL | Localidade | Tipo | H1 gerado | Caracteres | Categoria | Modelo | Validação |\n';
  md += '|---|---|---|---|:---:|---|---|:---:|\n';
  historico.forEach(r => {
    const status = r.aprovado ? 'Aprovado' : 'Reprovado';
    md += `| \`${r.url}\` | ${r.localidade} | ${r.tipo} | **${r.h1}** | ${r.chars} | ${r.categoria} | ${r.modeloId} | ${status} |\n`;
  });
  return md;
}

function limparHistorico() {
  historico.length = 0;
  usados.clear();
  usoGlobal.clear();
  ultimoSingle = null;
}

module.exports = {
  MAX_H1,
  CATEGORIAS,
  PALAVRAS_CHAVE,
  PREFIXOS,
  SUFIXOS,
  TERMOS_PROIBIDOS,
  configurar,
  montarLocal,
  validarH1,
  gerarH1,
  verificarHistorico,
  gerarRelatorioValidacao,
  limparHistorico,
  historico
};
