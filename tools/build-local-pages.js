/**
 * Aplica o SEO local nas 126 páginas locais (9 cidades + 117 distritos/bairros de SP).
 *
 *   node tools/build-local-pages.js            -> edita os HTML e grava o relatório
 *   node tools/build-local-pages.js --dry-run  -> não grava nada, só imprime o resumo
 *
 * É idempotente: o resultado depende só do conjunto de páginas e dos slugs
 * (sementes derivadas do slug, nunca aleatórias), então rodar duas vezes
 * produz exatamente o mesmo HTML.
 *
 * O que faz em cada página:
 *   3a  H1 (gerador central, tools/h1-generator.js) + subtítulo do hero
 *   3b  meta description (e description do JSON-LD) focada no negócio
 *   3c  termos "móveis planejados / marcenaria / móveis sob medida /
 *       móveis personalizados / movelaria planejada" em H2 diferentes
 *   3d  ordem estável e variável das seções + sumário "Nesta página"
 *   3e  remoção da palavra "subprefeitura"
 *   3f  conexão dos números do IBGE com o planejamento
 * Nenhuma regra de H1 vive aqui: tudo vem de h1-generator.js.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gen = require('./h1-generator.js');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');
const RELATORIO = path.join(ROOT, 'log', '2026-11-07-h1-seo-local.md');

const CIDADES = [
  'osasco', 'guarulhos', 'barueri', 'diadema', 'santo-andre',
  'sao-bernardo-do-campo', 'sao-caetano-do-sul', 'taboao-da-serra', 'mogi-das-cruzes'
];

/* ================================================================== *
 * Utilidades
 * ================================================================== */
function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = hash32(seed) || 1;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (arr, r) => arr[Math.floor(r() * arr.length)];
function shuffle(arr, r) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const min1 = s => s.charAt(0).toLowerCase() + s.slice(1);
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ================================================================== *
 * Descoberta e leitura das páginas
 * ================================================================== */
function descobrir() {
  const dirs = fs.readdirSync(ROOT).filter(n => {
    if (!n.endsWith('-sp') || n === 'sao-paulo') return false;
    return fs.existsSync(path.join(ROOT, n, 'index.html'));
  }).sort();
  const lista = [];
  for (const c of CIDADES) lista.push({ slug: c, dir: c, urlPath: `/${c}/`, tipo: 'cidade' });
  for (const d of dirs) lista.push({ slug: d, dir: d, urlPath: `/${d}/`, tipo: 'distrito' });
  for (const p of lista) {
    p.file = path.join(ROOT, p.dir, 'index.html');
    p.html = fs.readFileSync(p.file, 'utf8');
    const m = p.html.match(/id="final-titulo">[^<]*? sob medida (em|no|na) ([^<]+)</);
    if (!m) throw new Error('Não achei a localidade em ' + p.file);
    p.loc = gen.montarLocal(m[2].trim(), m[1]);
    if (p.tipo === 'distrito' && /id="o-bairro"/.test(p.html)) p.tipo = 'bairro';
  }
  return lista;
}

/* ================================================================== *
 * Banco de termos (3c) e bancos de títulos por papel da seção
 * ================================================================== */
const TERMOS = [
  'móveis planejados', 'marcenaria', 'móveis sob medida', 'móveis personalizados', 'movelaria planejada'
];

// {T} = termo + local, capitalizado; {t} = idem em minúscula; {N} = nome; {em} = em/no/na + nome; {de} = do/da/de + nome
const BANCO = {
  distrito: {
    dados: {
      termo: [
        '{T}: o distrito em números',
        '{T} e os números do Censo 2022',
        'Antes de pedir {t}, os números do distrito',
        'O distrito em números, para quem busca {t}',
        'Censo 2022: o que os números dizem a quem quer {t}'
      ],
      plain: [
        '{N} em números: o distrito dentro de São Paulo',
        'Os números de {N} no Censo 2022',
        '{N} em números: população e tamanho do distrito'
      ]
    },
    projeto: {
      termo: [
        '{T}: o que pesa no projeto',
        '{T}: do acesso à montagem',
        'O que pesa no projeto de {t}',
        '{T}: o que a obra pede antes do corte',
        'Projeto de {t}: medição, acesso e regras do prédio'
      ],
      plain: [
        '{N}: o que pesa no projeto e na montagem',
        'Projeto e montagem {em}: o que pesa',
        'O que pesa no projeto, do acesso à obra {de_loc}'
      ]
    },
    vizinhos: {
      termo: [
        '{T} e os distritos da mesma região',
        'Distritos da região, para quem busca {t}',
        '{T}: o que há ao redor, na mesma região'
      ],
      plain: [
        'Distritos vizinhos a {N}',
        'Distritos da mesma região de {N}',
        'Ao redor de {N}: distritos da região',
        'Outros distritos da região de {N}'
      ]
    },
    mapa: {
      termo: [
        '{T} no mapa de São Paulo',
        '{T}: localização no mapa',
        'O mapa, para quem busca {t}'
      ],
      plain: [
        '{N} no mapa de São Paulo',
        'Onde fica {N} no mapa',
        'Localização de {N} no mapa de São Paulo'
      ]
    },
    ambientes: {
      termo: [
        '{T}, por ambiente',
        '{T}: por onde começar',
        '{T}, ambiente por ambiente',
        'Por ambiente: {t}'
      ],
      plain: [
        'Por onde começar, ambiente por ambiente',
        'Ambientes para planejar {em}',
        'Escolha o ambiente e comece {de_loc}'
      ]
    },
    duvidas: {
      termo: [
        'Dúvidas de quem busca {t}',
        'Dúvidas sobre {t}',
        '{T}: perguntas frequentes',
        'Perguntas de quem quer {t}'
      ],
      plain: [
        'Dúvidas de quem quer planejar {em}',
        'Perguntas frequentes sobre atendimento {em}'
      ]
    }
  },
  cidade: {
    dados: {
      termo: [
        '{T}: o que o Censo 2022 diz sobre as moradias',
        'Censo 2022: as moradias da cidade e {t}',
        '{T} e os números das moradias',
        'Moradias e {t}: o que o Censo 2022 mostra'
      ],
      plain: [
        '{N}: o que o Censo 2022 diz sobre as moradias',
        'As moradias da cidade em números: Censo 2022'
      ]
    },
    geografia: {
      termo: [
        '{T}: o que a geografia da cidade tem de próprio',
        '{T} e o desenho da cidade',
        'A geografia da cidade, para quem busca {t}'
      ],
      plain: [
        '{N}: o que a geografia da cidade tem de próprio',
        'A cidade de {N} em contexto: geografia e perfil'
      ]
    },
    acessos: {
      termo: [
        '{T}: como se chega e o que isso muda na entrega',
        'Como se chega {a_loc} e o que muda na entrega de {t}',
        '{T} e os acessos à cidade'
      ],
      plain: [
        'Como se chega e o que isso muda na entrega',
        'Acessos à cidade e o efeito na entrega'
      ]
    },
    projeto: {
      termo: [
        '{T}: o que isso muda no projeto',
        'O que muda no projeto de {t}',
        '{T}: do orçamento à montagem'
      ],
      plain: [
        '{N}: o que isso muda no projeto',
        'O que a cidade muda no projeto e na montagem'
      ]
    },
    mapa: {
      termo: [
        '{T} no mapa',
        '{T}: a cidade no mapa',
        'O mapa, para quem busca {t}'
      ],
      plain: ['{N} no mapa', 'Onde fica {N} no mapa', 'A cidade de {N} e a região no mapa']
    },
    duvidas: {
      termo: [
        'Dúvidas de quem busca {t}',
        'Dúvidas sobre {t}',
        '{T}: perguntas frequentes',
        'Perguntas de quem quer {t}'
      ],
      plain: ['Dúvidas de quem quer planejar móveis {em}', 'Perguntas frequentes sobre atendimento {em}']
    }
  }
};
BANCO.bairro = Object.assign({}, BANCO.distrito, {
  dados: {
    termo: [
      '{T}: onde fica e por que isso importa no orçamento',
      'Orçamento de {t}: onde fica o bairro e o que isso muda',
      '{T} e o distrito a que o bairro pertence',
      'Orçamento de {t}: onde o bairro se encaixa na cidade'
    ],
    plain: [
      'Onde fica {N}, e por que isso importa no orçamento',
      'Onde {N} se encaixa na cidade, e o que isso muda no orçamento'
    ]
  },
  vizinhos: {
    termo: [
      '{T} e o resto da região',
      'O resto da região, para quem busca {t}',
      '{T} e as páginas ao redor'
    ],
    plain: ['{N} e o resto da região', 'Ao redor de {N}']
  }
});

// papéis -> id do h2 em cada tipo de página
const IDS_H2 = {
  distrito: { dados: 'numeros-titulo', projeto: 'projeto-titulo', vizinhos: 'vizinhos-titulo', mapa: 'mapa-titulo', ambientes: 'ambientes-titulo', duvidas: 'faq-titulo' },
  bairro: { dados: 'o-bairro-titulo', projeto: 'projeto-titulo', vizinhos: 'perto-titulo', mapa: 'mapa-titulo', ambientes: 'ambientes-titulo', duvidas: 'faq-titulo' },
  cidade: { dados: 'numeros-titulo', geografia: 'geografia-titulo', acessos: 'acessos-titulo', projeto: 'projeto-titulo', mapa: 'mapa-titulo', duvidas: 'faq-titulo' }
};

function preencher(tpl, p, termo) {
  const loc = p.loc;
  const T = termo ? cap(termo + ' ' + loc.em) : '';
  const t = termo ? termo + ' ' + loc.em : '';
  return tpl
    .replace(/\{T\}/g, T)
    .replace(/\{t\}/g, t)
    .replace(/\{N\}/g, loc.nome)
    .replace(/\{em\}/g, loc.em)
    .replace(/\{de\}/g, loc.de)
    .replace(/\{de_loc\}/g, loc.em)
    .replace(/\{a_loc\}/g, 'a ' + loc.nome);
}

/* ================================================================== *
 * Escolha estável de permutações (cabeçalhos e ordem das seções)
 * ================================================================== */
function escolherPermutacao(itens, seed, valida, usadas, recentes, primeiroAnterior) {
  itens = itens.slice().sort(); // ordem canônica: o resultado não depende da ordem atual da página
  const r = rng(seed);
  let melhor = null;
  for (let tent = 0; tent < 6000; tent++) {
    const cand = shuffle(itens, r);
    if (valida && !valida(cand)) continue;
    const chave = cand.join(',');
    if (recentes.includes(chave)) continue;
    if (tent < 3000) {
      if (usadas.has(chave)) continue;
      if (primeiroAnterior != null && cand[0] === primeiroAnterior) continue;
    }
    melhor = cand;
    break;
  }
  if (!melhor) throw new Error('Sem permutação válida para ' + seed);
  return melhor;
}

/* ================================================================== *
 * Textos: description (3b), subtítulo do hero (3a), conexões do IBGE (3f)
 * ================================================================== */
const SERVICOS = ['móveis planejados', 'marcenaria sob medida', 'móveis sob medida', 'móveis personalizados', 'movelaria planejada', 'marcenaria personalizada', 'ambientes planejados'];
const AMBIENTES = [
  'cozinha, dormitório e closet', 'sala, home office e lavanderia', 'cozinha e área de serviço', 'quartos e closets',
  'varanda e área gourmet', 'banheiro e lavanderia', 'escritório em casa e sala', 'dormitórios, closets e banheiros',
  'cozinha, sala e varanda', 'lavanderia, banheiro e cozinha', 'closet, dormitório e home office', 'sala de TV, estantes e painéis'
];
const PROCESSOS_A = ['medição técnica no imóvel', 'medidas conferidas no local', 'projeto feito sobre as medidas reais', 'projeto em 3D antes da decisão'];
const PROCESSOS_B = ['orçamento item por item', 'orçamento por escrito', 'preço, prazo e contrato por escrito'];
const CONTEXTOS = [
  'apartamento ou casa', 'prédio antigo ou novo', 'reforma ou imóvel novo', 'condomínio com regras de obra',
  'casa de rua ou apartamento em prédio', 'imóvel pronto ou ainda em obra', 'reforma de um ambiente ou da casa toda'
];
const PROXIMOS_DESC = [
  'Conte o endereço e confirmamos o atendimento.',
  'Envie as medidas e peça seu orçamento.',
  'Descreva o imóvel e peça um orçamento.',
  'Mande fotos e medidas para começar.',
  'Fale no WhatsApp com o endereço.',
  'Peça orçamento e confirme o atendimento.',
  'Atendimento confirmado pelo endereço.',
  'Chame no WhatsApp para começar.',
  'Veja se atendemos o seu endereço.',
  'Comece pelo endereço e pelo ambiente.',
  'Mande o endereço e tire suas dúvidas.'
];
const PROXIMOS_LEAD = [
  'A disponibilidade em cada endereço é confirmada antes da visita.',
  'Se o seu endereço estiver fora do atendimento, avisamos já na primeira conversa.',
  'Mande uma foto do ambiente e as medidas para começar.',
  'Conte como é o imóvel e o que você quer planejar.',
  'A conversa pelo WhatsApp começa pelo endereço e pelo ambiente.',
  'Antes de qualquer visita, o endereço é conferido.',
  'A primeira conversa serve também para confirmar o atendimento.',
  'Chame no WhatsApp com o endereço e o ambiente que quer planejar.',
  'Não precisa ter a planta em mãos: fotos e medidas aproximadas já ajudam a começar.',
  'Se preferir, comece só pelo endereço: o resto é perguntado na conversa.',
  'Peça um orçamento e confirme a disponibilidade para o seu endereço.',
  'O atendimento é confirmado endereço a endereço, sem compromisso de visita.'
];

function dois(r) {
  const a = pick(PROCESSOS_A, r);
  const b = pick(PROCESSOS_B, r);
  return r() < 0.5 ? [a, b] : [b, a];
}

// A description precisa usar um termo-chave DIVERGENTE do H1 (mesmo contexto,
// palavra diferente) — nunca repetir o termo exato que já está no H1.
function servicoDoH1(rec, r) {
  const kw = (rec.palavraChave || '').toLowerCase();
  const pool = SERVICOS.filter(s => s !== kw && !kw.includes(s) && !s.includes(kw));
  return pick(pool.length ? pool : SERVICOS, r);
}

const SCHEMAS_DESC = [
  c => `${cap(c.S)} ${c.em}: ${c.A} com ${c.P1}. ${c.N}`,
  c => `Planejar ${c.A} ${c.em}? A conversa começa por ${c.C} e pelas medidas do ambiente, antes do orçamento. ${c.N}`,
  c => `${cap(c.em)}, o projeto de ${c.S} começa pela conversa sobre ${c.C}, com ${c.P1} e ${c.P2}. ${c.N}`,
  c => `Quem mora ${c.em} e quer ${c.A} sob medida conta com ${c.P1} e ${c.P2}. ${c.N}`,
  c => `Orçamento de ${c.S} ${c.em}: ${c.A}, com ${c.P1} e atendimento pelo WhatsApp. ${c.N}`,
  c => `Antes de fechar ${c.S} ${c.em}, confira ${c.P1} e ${c.P2}. ${c.N}`,
  c => `Do primeiro contato à montagem: ${c.S} ${c.em} com ${c.P1}. ${c.N}`,
  c => `Reforma ou imóvel novo ${c.em}? ${cap(c.S)} para ${c.A}, com ${c.P1}. ${c.N}`,
  c => `Peça orçamento de ${c.S} ${c.em} e veja ${c.A} no projeto, com ${c.P1}. ${c.N}`,
  c => `Atendimento pelo WhatsApp para ${c.S} ${c.em}: ${c.P1}, ${c.P2} e confirmação do endereço.`,
  c => `${cap(c.em)}: ${c.A} planejados conforme ${c.C}, com ${c.P1}. ${c.N}`,
  c => `${cap(c.S)} ${c.em} para ${c.C}: ${c.P1} e ${c.P2}. ${c.N}`,
  c => `Como pedir ${c.S} ${c.em}: conte o imóvel, envie as medidas e receba ${c.P1}. ${c.N}`
];

const SCHEMAS_LEAD = [
  c => `${cap(c.S)} ${c.em}: o projeto parte das medidas reais do imóvel e das regras de acesso à obra. ${c.N}`,
  c => `${cap(c.A)}, com ${c.P1}. O que muda ${c.em} é o imóvel e o acesso, não o processo. ${c.N}`,
  c => `Pensando em ${c.S} ${c.em}? Comece contando o tipo de imóvel (${c.C}): é a partir daí que o projeto é desenhado. ${c.N}`,
  c => `${cap(c.C)}: cada caso pede um tipo de medição. Para ${c.S} ${c.em}, o ponto de partida é ${c.PA}. ${c.N}`,
  c => `Quem quer ${c.A} ${c.em} começa pela conversa: tipo de imóvel, medidas e acesso à obra. ${c.N}`,
  c => `Sem pressa para decidir: ${c.P1} e ${c.P2} para você comparar antes de decidir por ${c.S} ${c.em}. ${c.N}`,
  c => `Reformar um ambiente ou equipar um imóvel novo ${c.em}? ${cap(c.P1)}, e o projeto segue o que o espaço permite. ${c.N}`,
  c => `Para ${c.S} ${c.em}, olhe primeiro o imóvel: ${c.C}. ${c.N}`,
  c => `${cap(c.P1)} e ${c.P2}: é assim que começa o pedido de ${c.S} ${c.em}. ${c.N}`,
  c => `${cap(c.A)} ${c.em}, planejados com ${c.P1}. ${c.N}`,
  c => `O processo é o mesmo em qualquer endereço; o que muda ${c.em} é o imóvel. Para ${c.S}, comece por ${c.C}. ${c.N}`,
  c => `Do primeiro contato à instalação, ${c.A} ${c.em} seguem etapas combinadas por escrito. ${c.N}`
];
const SCHEMA_LEAD_BAIRRO = c => `${c.nome} fica ${c.distritoFrase}. Para ${c.S} ${c.em}, o projeto parte do tipo de imóvel (${c.C}) e das medidas reais. ${c.N}`;

function tokensDe(txt) {
  return txt.toLowerCase().replace(/[^a-zà-úç0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
}
function ngramas(txt, n, nomes) {
  let t = tokensDe(txt);
  const nm = tokensDe(nomes);
  t = t.map(x => (nm.includes(x) ? '_' : x));
  const out = new Set();
  for (let i = 0; i + n <= t.length; i++) out.add(t.slice(i, i + n).join(' '));
  return out;
}

function compor(schemas, ctxBase, seed, limite, df, dfMax, minimo, extra, estado, npool) {
  const r = rng(seed);
  let melhor = null;
  let melhorViol = Infinity;
  let melhorIdx = -1;
  for (let tent = 0; tent < 500; tent++) {
    const [P1, P2] = dois(r);
    const c = Object.assign({}, ctxBase, {
      S: servicoDoH1(ctxBase.rec, r),
      A: pick(AMBIENTES, r),
      P1, P2,
      PA: PROCESSOS_A.includes(P1) ? P1 : P2,
      C: pick(CONTEXTOS, r),
      N: ''
    });
    const lista = extra ? schemas.concat([extra]) : schemas;
    const idx = (hash32(seed) + tent) % lista.length;
    const esquema = lista[idx];
    if (esquema === extra && !c.distritoFrase) continue;
    if (estado && tent < 100 && estado.ultimo === idx) continue;
    const corpo = esquema(c).replace(/\s+/g, ' ').trim();
    let txt = corpo;
    for (const n of shuffle(npool, r).slice(0, 5)) {
      if ((corpo + ' ' + n).length <= limite) { txt = corpo + ' ' + n; break; }
    }
    if (txt.length > limite || txt.length < minimo) continue;
    let viol = 0;
    for (const g of ngramas(txt, 5, ctxBase.nome)) if ((df.get(g) || 0) >= dfMax) viol++;
    if (viol < melhorViol) { melhor = txt; melhorViol = viol; melhorIdx = idx; }
    if (viol === 0) break;
  }
  if (!melhor) throw new Error('Não consegui compor texto para ' + seed);
  if (estado) estado.ultimo = melhorIdx;
  for (const g of ngramas(melhor, 5, ctxBase.nome)) df.set(g, (df.get(g) || 0) + 1);
  return melhor;
}

const DESC_CIDADES = {
  osasco: 'Planejados em Osasco para casas coladas, apartamentos novos e escritórios: medição técnica no endereço, orçamento por escrito e atendimento pelo WhatsApp.',
  guarulhos: 'Reforma de um ambiente ou da casa toda em Guarulhos: marcenaria sob medida, com medição técnica e orçamento item por item.',
  barueri: 'Móveis sob medida em Barueri, de casa em condomínio a imóvel alugado: conte o imóvel e confirmamos atendimento, medição e orçamento.',
  diadema: 'Marcenaria e móveis planejados em Diadema para reformar um ambiente por vez: medição técnica, orçamento por escrito e atendimento confirmado pelo endereço.',
  'santo-andre': 'Móveis personalizados em Santo André, em casa ou apartamento: a conversa muda conforme o bairro. Envie as medidas e peça orçamento pelo WhatsApp.',
  'sao-bernardo-do-campo': 'Marcenaria sob medida em São Bernardo do Campo: projeto sobre medidas reais, orçamento por escrito e atendimento confirmado pelo seu endereço.',
  'sao-caetano-do-sul': 'Móveis planejados para apartamento em São Caetano do Sul: medição técnica, regras do condomínio na conversa e orçamento por escrito.',
  'taboao-da-serra': 'Marcenaria sob medida em Taboão da Serra, colada à capital: medição técnica, orçamento por escrito e atendimento confirmado pelo seu endereço.',
  'mogi-das-cruzes': 'Móveis sob medida em Mogi das Cruzes, de condomínio horizontal a apartamento: projeto com medidas reais, orçamento por escrito e contato pelo WhatsApp.'
};

function extrairDados(html) {
  const row = dt => {
    const m = html.match(new RegExp('<dt>' + escRe(dt) + '</dt><dd>([^<]*)</dd>'));
    return m ? m[1] : null;
  };
  return row;
}

function conexaoNumerosDistrito(p, rec, row) {
  const r = rng('num:' + p.slug);
  const pop = (row('População') || '').replace(/ moradores.*/, '');
  const ranking = row('Posição entre os 96 distritos') || '';
  const n = parseInt(ranking, 10);
  const share = (row('Participação na cidade') || '').replace(/ dos moradores.*/, '');
  if (!pop || !n) return null;
  const S = pick(['móveis sob medida', 'marcenaria', 'móveis personalizados', 'móveis planejados'], r);
  const nome = p.loc.nome;
  const faixa = n <= 30 ? 'grande' : n >= 70 ? 'pequeno' : 'medio';
  const V = {
    grande: [
      `${pop} moradores colocam ${nome} entre os distritos mais populosos de São Paulo (${ranking}). Para quem pede ${S}, o número importa pouco: o que define a medição e a montagem é o endereço, com rua, elevador e horário de obra. Por isso a conversa inicial pergunta por eles.`,
      `Com ${pop} moradores${share ? ` (${share} da cidade)` : ''}, ${nome} está entre os mais populosos. Na prática, isso orienta a primeira pergunta do atendimento: como é o acesso à obra? Rua, portaria e elevador de serviço pesam mais no projeto de ${S} do que o tamanho do distrito.`,
      `Em um distrito deste tamanho (${pop} moradores) há imóveis de vários tipos, e o número não diz qual é o seu. Para ${S} ${p.loc.em}, o projeto parte da planta e das medidas do seu ambiente.`
    ],
    medio: [
      `${ranking}, com ${pop} moradores: ${nome} ocupa uma posição intermediária entre os 96 distritos. Para pedir ${S}, o que conta é o imóvel (tipo, medidas e acesso), e é isso que a conversa inicial levanta.`,
      `O tamanho do distrito (${pop} moradores${share ? `, ${share} da cidade` : ''}) situa ${nome}, mas não define o projeto. Em ${S}, quem decide a medida é o ambiente, e quem decide o prazo da montagem é o acesso à obra.`,
      `Com ${pop} moradores, ${nome} é um distrito de porte médio entre os 96. O que isso muda para ${S} é pouco: o orçamento começa pelo seu imóvel, com planta, fotos e regras do condomínio, quando houver.`
    ],
    pequeno: [
      `${pop} moradores colocam ${nome} entre os distritos menos populosos de São Paulo (${ranking}). Para ${S}, isso não simplifica nem encarece o projeto por si só: o que pesa é o tipo de imóvel e o acesso à obra.`,
      `Distrito menor${share ? ` (${share} da cidade)` : ''} não quer dizer projeto menor. Em ${nome}, o pedido de ${S} segue o mesmo caminho: medidas reais do ambiente, conferência do acesso e orçamento por escrito.`,
      `Com ${pop} moradores, ${nome} tem uma escala diferente da média da capital. O que ela muda para ${S} é pouco; o que muda de verdade é o endereço da obra, e é por ele que o atendimento é confirmado.`
    ]
  };
  return pick(V[faixa], r);
}

function conexaoNumerosCidade(p, row) {
  const pct = dt => {
    const v = row(dt) || '';
    const m = v.match(/\(([\d,]+)%\)/);
    return m ? m[1] : null;
  };
  const casas = pct('Casas');
  const aptos = pct('Apartamentos');
  const alug = pct('Domicílios alugados');
  if (!casas || !aptos) return null;
  const c = parseFloat(casas.replace(',', '.'));
  const a = parseFloat(aptos.replace(',', '.'));
  const nome = p.loc.nome;
  const partes = [];
  if (c >= a) {
    partes.push(`Com ${casas}% dos domicílios em casas e ${aptos}% em apartamentos, o projeto ${p.loc.em} costuma partir da medição de cada cômodo, já que a planta de uma casa varia mais; no apartamento, o ponto de partida é a planta do prédio e as regras do condomínio.`);
  } else {
    partes.push(`Com ${aptos}% dos domicílios em apartamentos e ${casas}% em casas, o projeto ${p.loc.em} parte com mais frequência da planta do prédio, do elevador de serviço e das regras do condomínio; na casa, a medição é feita cômodo a cômodo.`);
  }
  if (alug) {
    partes.push(`Como ${alug}% dos domicílios são alugados, vale combinar com o proprietário antes de fixar móveis em parede ou piso.`);
  }
  return partes.join(' ');
}

/* ================================================================== *
 * Operações sobre o HTML
 * ================================================================== */
function corrigirNomeSemAcento(html, nome) {
  const sem = semAcento(nome);
  if (sem === nome) return html;
  html = html.split(sem.replace(/ /g, '%20')).join(encodeURIComponent(nome));
  return html.replace(new RegExp('(?<![\\p{L}\\-])' + escRe(sem) + '(?![\\p{L}\\-])', 'gu'), nome);
}

function removerSubprefeitura(html, p, r) {
  // linhas de dados
  html = html.replace(/\s*<div><dt>Subprefeitura<\/dt><dd>[^<]*<\/dd><\/div>/g, '');
  html = html.replace(/\s*<div><dt>Distritos da mesma (?:subprefeitura|região)<\/dt><dd>é o único distrito da subprefeitura<\/dd><\/div>/g, '');
  html = html.replace(/<dt>Distritos da mesma subprefeitura<\/dt>/g, '<dt>Distritos da mesma região</dt>');
  // nota de fonte
  html = html.replace(/; subprefeitura conforme a divisão administrativa do município\./,
    '; os distritos da mesma região seguem a divisão administrativa do município.');
  // texto de apoio da seção de vizinhos
  const asides = [
    'São os distritos da mesma região administrativa. O atendimento é confirmado pelo endereço, distrito a distrito.',
    'Estes distritos ficam na mesma região da cidade. Se o seu imóvel estiver em um deles, a conversa começa pelo endereço.',
    'Distritos da mesma região administrativa, com o mesmo processo de atendimento: medição, projeto e orçamento por escrito.',
    'Vale conferir os distritos da região: o projeto muda pelo imóvel, e a disponibilidade é confirmada em cada endereço.'
  ];
  html = html.replace(/<p>A subprefeitura reúne distritos que dividem a mesma administração e, em geral, o mesmo tipo de via e de acesso\.<\/p>/,
    () => `<p>${pick(asides, r)}</p>`);
  // bairro: cláusula administrativa
  html = html.replace(/ e é administrado pela Subprefeitura de [^.<]+/g, '');
  return html;
}

function trocarH2(html, id, texto) {
  const re = new RegExp('(<h2 id="' + escRe(id) + '">)[^<]*(</h2>)');
  if (!re.test(html)) return html;
  return html.replace(re, (m, a, b) => a + texto + b);
}

function h2De(secaoHtml) {
  const m = secaoHtml.match(/<h2 id="[^"]*">([^<]*)<\/h2>/);
  return m ? m[1] : '';
}

/** Reordena as seções entre o sumário e o #contato; recria o sumário. */
function reordenarSecoes(html, ordemIds) {
  const iSum = html.indexOf('<section class="section" aria-labelledby="sumario-titulo"');
  if (iSum < 0) throw new Error('sumário não encontrado');
  const fimSum = html.indexOf('</section>', iSum) + '</section>'.length;
  const iFinal = html.indexOf('<section class="lp-final"');
  const meio = html.slice(fimSum, iFinal);

  const re = /((?:\s*<!--[\s\S]*?-->)*\s*)(<section class="section" id="([^"]+)"[\s\S]*?<\/section>)/g;
  const blocos = new Map();
  let ultimoFim = 0;
  let primeiroIni = null;
  let m;
  while ((m = re.exec(meio)) !== null) {
    if (primeiroIni === null) primeiroIni = m.index;
    blocos.set(m[3], { comentario: m[1].replace(/^\s+/, '').trim(), secao: m[2] });
    ultimoFim = m.index + m[0].length;
  }
  const qtd = (meio.match(/<section /g) || []).length;
  if (qtd !== blocos.size) throw new Error('quantidade de seções inesperada');
  for (const id of ordemIds) if (!blocos.has(id)) throw new Error('seção ausente: ' + id);
  if (ordemIds.length !== blocos.size) throw new Error('ordem incompleta');

  const trailer = meio.slice(ultimoFim);
  // sumário: manter o mesmo conjunto de itens que a página já tinha
  const sumHtml = html.slice(iSum, fimSum);
  const idsNoSumario = new Set([...sumHtml.matchAll(/<a href="#([^"]+)">/g)].map(x => x[1]));

  // fundos alternados (faixas): duvidas mantém a cor de destaque
  let alterna = 0;
  const novas = ordemIds.map(id => {
    const b = blocos.get(id);
    let sec = b.secao.replace(/^(<section class="section" id="[^"]+"[^>]*?)\s*style="background:var\(--c-(?:surface|tint)\)"/, '$1');
    let estilo = null;
    if (id === 'duvidas') estilo = 'var(--c-tint)';
    else { if (alterna % 2 === 1) estilo = 'var(--c-surface)'; alterna++; }
    if (estilo) sec = sec.replace(/^(<section class="section" id="[^"]+"[^>]*?)>/, `$1 style="background:${estilo}">`);
    return (b.comentario ? '    ' + b.comentario + '\n    ' : '    ') + sec;
  });

  const novoMeio = '\n\n' + novas.join('\n\n') + '\n' + trailer.replace(/^\n+/, '\n');
  let out = html.slice(0, fimSum) + novoMeio + html.slice(iFinal);

  // sumário
  const lis = ordemIds.filter(id => idsNoSumario.has(id)).map(id => {
    const h = h2De(blocos.get(id).secao);
    return `          <li><a href="#${id}"><span><b>${h}</b></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>`;
  });
  const novoSum = sumHtml.replace(/(<ul class="lp-siblings" data-reveal>)[\s\S]*?(\s*<\/ul>)/, (mm, a, b) => `${a}\n${lis.join('\n')}${b}`);
  out = out.replace(sumHtml, () => novoSum);
  return out;
}

/* ================================================================== *
 * Execução
 * ================================================================== */
function main() {
  gen.limparHistorico();
  const paginas = descobrir();
  const dfDesc = new Map();
  const dfLead = new Map();
  const estLead = { ultimo: -1 };
  const estDesc = { ultimo: -1 };
  const usadasOrdem = new Set();
  const usadasMapa = new Set();
  const recentesOrdem = [];
  const recentesMapa = [];
  let primeiroAnterior = null;
  const resumo = [];

  for (const p of paginas) {
    let html = p.html;
    const r = rng('pagina:' + p.slug);

    // 0) nome com acento correto onde a página tinha o nome sem acento
    html = corrigirNomeSemAcento(html, p.loc.nome);

    // 1) H1 pelo gerador central (prefixo+sufixo quando couber em 60)
    const rec = gen.gerarH1({ local: p.loc, tipoLocal: p.tipo, urlPath: p.urlPath, seed: p.slug });
    p.rec = rec;
    html = html.replace(/(<h1 id="capa-titulo">)[^<]*(<\/h1>)/, (m, a, b) => a + rec.h1 + b);

    // 2) eyebrow coerente com o tipo
    if (p.tipo === 'bairro') {
      html = html.replace(/(<p class="eyebrow eyebrow--inverse">)Distrito de São Paulo(<\/p>)/, '$1Bairro de São Paulo$2');
    }

    // 3) subprefeitura fora, dados do IBGE ligados ao negócio
    if (p.tipo !== 'cidade') html = removerSubprefeitura(html, p, rng('aside:' + p.slug));
    const row = extrairDados(html);
    html = html.replace(/\s*<p class="lp-guarantee__lead lp-conexao"[^>]*>[\s\S]*?<\/p>/g, '');
    let conexao = null;
    if (p.tipo === 'distrito') conexao = conexaoNumerosDistrito(p, rec, row);
    if (p.tipo === 'cidade') conexao = conexaoNumerosCidade(p, row);
    if (conexao) {
      html = html.replace(/(\s*)(<p class="lp-note">Fonte: IBGE)/, (m, sp, nota) =>
        `${sp}<p class="lp-guarantee__lead lp-conexao" style="color:var(--c-text-2);max-width:68ch;margin-top:var(--sp-6)">${conexao}</p>${sp}${nota}`);
    }
    if (p.tipo === 'cidade') {
      html = html.replace('O que fazemos com eles, no projeto, está nas seções seguintes.',
        'O que muda no projeto por causa deles está na seção sobre o projeto e logo abaixo dos números.');
    }

    // 4) subtítulo do hero (cidades mantêm o subtítulo com o fato local próprio da cidade)
    const distMatch = html.match(/fica (no distrito de [^,<]+|entre os distritos de [^,<]+?),? em São Paulo/);
    const ctxBase = { rec, em: p.loc.em, nome: p.loc.nome, distritoFrase: distMatch ? distMatch[1] : null };
    if (p.tipo !== 'cidade') {
      const lead = compor(SCHEMAS_LEAD, ctxBase, 'lead:' + p.slug, 230, dfLead, 15, 90, p.tipo === 'bairro' ? SCHEMA_LEAD_BAIRRO : null, estLead, PROXIMOS_LEAD);
      html = html.replace(/(<p class="lp-hero__lead">)[\s\S]*?(<\/p>)/, (m, a, b) => a + lead + b);
    }

    // 5) meta description e description do JSON-LD
    const desc = p.tipo === 'cidade'
      ? DESC_CIDADES[p.slug]
      : compor(SCHEMAS_DESC, ctxBase, 'desc:' + p.slug, 160, dfDesc, 14, 110, null, estDesc, PROXIMOS_DESC);
    if (desc.length > 160) throw new Error('description > 160: ' + p.slug);
    p.desc = desc;
    html = html.replace(/(<meta name="description" content=")[^"]*(")/, (m, a, b) => a + desc + b);
    html = html.replace(/("@type": "WebPage",\s*"name": "[^"]*",\s*"description": ")[^"]*(")/, (m, a, b) => a + desc + b);

    // 6) termos nos H2 (mapeamento papel -> termo varia por página)
    const grupo = p.tipo === 'cidade' ? 'cidade' : p.tipo;
    const idsPapel = IDS_H2[grupo];
    const papeis = Object.keys(idsPapel).filter(k => new RegExp('<h2 id="' + idsPapel[k] + '">').test(html));
    if (papeis.length < TERMOS.length) throw new Error('poucos títulos para os termos em ' + p.slug);
    const itens = TERMOS.concat(new Array(papeis.length - TERMOS.length).fill('_'));
    const atribuicao = escolherPermutacao(itens, 'termos:' + p.slug, null, usadasMapa, recentesMapa.slice(-4), null);
    const chaveMapa = atribuicao.join(',');
    usadasMapa.add(chaveMapa); recentesMapa.push(chaveMapa);
    const mapaTermos = {};
    papeis.forEach((papel, i) => { mapaTermos[papel] = atribuicao[i] === '_' ? null : atribuicao[i]; });
    for (const papel of papeis) {
      const termo = mapaTermos[papel];
      const rr = rng('h2:' + p.slug + ':' + papel);
      const banco = BANCO[grupo][papel];
      const tpl = pick(termo ? banco.termo : banco.plain, rr);
      html = trocarH2(html, idsPapel[papel], preencher(tpl, p, termo));
    }
    p.mapaTermos = mapaTermos;

    // 7) ordem das seções: estável por slug, vizinhas diferentes
    const iSum = html.indexOf('<section class="section" aria-labelledby="sumario-titulo"');
    const fimSum = html.indexOf('</section>', iSum) + 10;
    const meio = html.slice(fimSum, html.indexOf('<section class="lp-final"'));
    const ids = [...meio.matchAll(/<section class="section" id="([^"]+)"/g)].map(x => x[1]);
    const valida = ord => {
      const iMapa = ord.indexOf('mapa');
      if (iMapa === 0 || iMapa === ord.length - 1) return false;
      const naoPrimeiro = ['vizinhos', 'perto', 'ambientes', 'duvidas', 'comecar', 'outras-cidades', 'acessos', 'ambientes-osasco'];
      if (naoPrimeiro.includes(ord[0])) return false;
      if (ord.includes('duvidas') && ord.indexOf('duvidas') < 2) return false; // FAQ nunca abre a leitura
      if (ord.includes('geografia') && ord.includes('acessos') && ord.indexOf('geografia') > ord.indexOf('acessos')) return false;
      return true;
    };
    const ordem = escolherPermutacao(ids, 'ordem:' + p.slug, valida, usadasOrdem, recentesOrdem.slice(-4), primeiroAnterior);
    usadasOrdem.add(ordem.join(',')); recentesOrdem.push(ordem.join(','));
    primeiroAnterior = ordem[0];
    p.ordem = ordem;
    html = reordenarSecoes(html, ordem);

    p.novoHtml = html;
    resumo.push(`${p.slug}: ${rec.h1}`);
  }

  // verificações globais do gerador
  const problemas = gen.verificarHistorico();
  if (problemas.length) { console.error(problemas.join('\n')); process.exit(1); }

  if (!DRY) {
    for (const p of paginas) if (p.novoHtml !== p.html) fs.writeFileSync(p.file, p.novoHtml);
    fs.mkdirSync(path.dirname(RELATORIO), { recursive: true });
    fs.writeFileSync(RELATORIO, montarRelatorio(paginas));
  }
  console.log(`${paginas.length} páginas processadas${DRY ? ' (dry-run)' : ''}.`);
}

function montarRelatorio(paginas) {
  const porCat = {};
  gen.historico.forEach(r => { porCat[r.categoria] = (porCat[r.categoria] || 0) + 1; });
  const puros = gen.historico.filter(r => r.categoria === 'puro');
  let md = '# Relatório de validação dos H1 — SEO local (2026-11-07)\n\n';
  md += 'Gerado por `tools/build-local-pages.js` com o módulo central `tools/h1-generator.js`.\n\n';
  md += 'Regra aplicada (instrução do dono): prefixo + sufixo juntos quando couberem em 60 caracteres; se não couberem, ao menos um dos dois, variando qual; título puro só como último recurso.\n\n';
  md += `- Páginas: ${gen.historico.length} (9 cidades + 117 distritos/bairros)\n`;
  md += `- Maior H1: ${Math.max(...gen.historico.map(r => r.chars))} caracteres (limite 60)\n`;
  md += `- Distribuição por categoria: ${Object.entries(porCat).map(([k, v]) => `${k} = ${v}`).join('; ')}\n`;
  md += `- H1 puros: ${puros.length === 0 ? 'nenhum (em todas as páginas coube ao menos um prefixo ou sufixo)' : puros.map(r => `${r.url}: ${r.motivoPuro}`).join('; ')}\n`;
  md += `- Reprovados: ${gen.historico.filter(r => !r.aprovado).length}\n\n`;
  md += gen.gerarRelatorioValidacao();
  md += '\n## Ordem das seções por página\n\n| URL | Ordem (entre o sumário e o #contato) |\n|---|---|\n';
  paginas.forEach(p => { md += `| \`${p.urlPath}\` | ${p.ordem.join(' > ')} |\n`; });
  return md;
}

main();
