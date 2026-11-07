/**
 * Validação das 126 páginas locais (9 cidades + 117 distritos/bairros de SP).
 *   node tools/validate-local-pages.js
 * Sai com código 1 se algum teste falhar.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const gen = require('./h1-generator.js');

const ROOT = path.resolve(__dirname, '..');
const CIDADES = [
  'osasco', 'guarulhos', 'barueri', 'diadema', 'santo-andre',
  'sao-bernardo-do-campo', 'sao-caetano-do-sul', 'taboao-da-serra', 'mogi-das-cruzes'
];
const TERMOS = ['móveis planejados', 'marcenaria', 'móveis sob medida', 'móveis personalizados', 'movelaria planejada'];
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const falhas = [];
const falha = (teste, msg) => falhas.push(`[${teste}] ${msg}`);

function listarHtml(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listarHtml(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const slugsDistrito = fs.readdirSync(ROOT)
  .filter(n => n.endsWith('-sp') && n !== 'sao-paulo' && fs.existsSync(path.join(ROOT, n, 'index.html')))
  .sort();
const paginas = CIDADES.concat(slugsDistrito).map(slug => {
  const file = path.join(ROOT, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/id="final-titulo">[^<]*? sob medida (em|no|na) ([^<]+)</);
  return { slug, file, html, loc: gen.montarLocal(m[2].trim(), m[1]), cidade: CIDADES.includes(slug) };
});

/* 1-3: H1 */
const vistos = new Map();
const puros = [];
for (const p of paginas) {
  const m = p.html.match(/<h1 id="capa-titulo">([^<]*)<\/h1>/);
  if (!m) { falha('H1', `${p.slug}: sem H1`); continue; }
  p.h1 = m[1];
  if (p.h1.length > 60) falha('1-H1<=60', `${p.slug}: ${p.h1.length} caracteres`);
  const k = p.h1.toLowerCase();
  if (vistos.has(k)) falha('2-H1 duplicado', `${p.slug} e ${vistos.get(k)}: ${p.h1}`);
  vistos.set(k, p.slug);
  const semInterrog = p.h1.replace(/\?$/, '');
  const temPre = gen.PREFIXOS.some(x => semInterrog.startsWith(x.texto + ' '));
  const temSuf = gen.SUFIXOS.some(x => semInterrog.endsWith(x.texto));
  p.temPre = temPre; p.temSuf = temSuf;
  if (!temPre && !temSuf) puros.push(p);
  if (!p.h1.includes(p.loc.nome)) falha('H1', `${p.slug}: nome da localidade ausente`);
  if (gen.TERMOS_PROIBIDOS.test(p.h1)) falha('H1', `${p.slug}: termo proibido`);
}
const ambos = paginas.filter(p => p.temPre && p.temSuf).length;
const um = paginas.filter(p => p.temPre !== p.temSuf).length;

/* 4: "subprefeitura" em todo HTML do repositório */
let totalSub = 0;
for (const f of listarHtml(ROOT)) {
  const n = (fs.readFileSync(f, 'utf8').match(/subprefeitura/gi) || []).length;
  if (n) { totalSub += n; falha('4-subprefeitura', `${path.relative(ROOT, f)}: ${n} ocorrência(s)`); }
}

/* 5: caminho antigo sao-paulo/<slug>/ */
const slugsBase = slugsDistrito.map(s => s.replace(/-sp$/, ''));
const reAntigo = new RegExp('sao-paulo/(' + slugsBase.map(escRe).join('|') + ')(?![\\w-])');
let totalAntigo = 0;
for (const f of listarHtml(ROOT)) {
  const t = fs.readFileSync(f, 'utf8');
  if (reAntigo.test(t)) { totalAntigo++; falha('5-caminho antigo', path.relative(ROOT, f)); }
}
for (const s of slugsBase) if (fs.existsSync(path.join(ROOT, 'sao-paulo', s))) falha('5-caminho antigo', `pasta sao-paulo/${s} ainda existe`);

/* 6: ../../ nos distritos movidos; canonical e breadcrumb */
for (const p of paginas.filter(x => !x.cidade)) {
  if (p.html.includes('../../')) falha('6-../../', p.slug);
  if (!p.html.includes(`https://SEU-DOMINIO/${p.slug}/`)) falha('canonical', `${p.slug}: URL com -sp ausente`);
  if (!/"name": "São Paulo",\s*"item": "https:\/\/SEU-DOMINIO\/sao-paulo\/"/.test(p.html)) falha('breadcrumb', `${p.slug}: item São Paulo`);
}

/* 7: termos (headings + corpo) */
const contagemTermos = { 5: 0, 4: 0, menos: 0 };
for (const p of paginas) {
  const texto = p.html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const heads = [...texto.matchAll(/<h[23][^>]*>([^<]*)<\/h[23]>/g)].map(x => x[1]).join(' | ');
  p.termosEmHeadings = TERMOS.filter(t => new RegExp(escRe(t + ' ' + p.loc.em), 'i').test(heads));
  const noCorpo = TERMOS.filter(t => new RegExp(escRe(t + ' ' + p.loc.em), 'i').test(texto));
  if (noCorpo.length >= 5) contagemTermos[5]++;
  else if (noCorpo.length === 4) contagemTermos[4]++;
  else { contagemTermos.menos++; falha('7-termos', `${p.slug}: só ${noCorpo.length}/5`); }
  if (p.termosEmHeadings.length < 4) falha('7-termos', `${p.slug}: só ${p.termosEmHeadings.length}/5 em headings`);
}
// mapeamento termo->heading varia
const mapas = new Set();
for (const p of paginas) {
  const ids = [...p.html.matchAll(/<h2 id="([^"]+)">([^<]*)<\/h2>/g)];
  const mapa = ids.map(([, id, tx]) => id + '=' + (TERMOS.findIndex(t => new RegExp(escRe(t + ' ' + p.loc.em), 'i').test(tx)))).join(',');
  mapas.add(mapa);
}

/* 8: ordem das seções e sumário */
let anterior = null;
let iguaisVizinhas = 0;
const ordens = new Set();
for (const p of paginas) {
  const iFinal = p.html.indexOf('<section class="lp-final"');
  const iSum = p.html.indexOf('aria-labelledby="sumario-titulo"');
  const iFimSum = p.html.indexOf('</section>', iSum);
  const meio = p.html.slice(iFimSum, iFinal);
  const ids = [...meio.matchAll(/<section class="section" id="([^"]+)"/g)].map(x => x[1]);
  p.ordem = ids;
  ordens.add(ids.join(','));
  if (ids[0] === 'mapa' || ids[ids.length - 1] === 'mapa' || !ids.includes('mapa')) falha('8-mapa', `${p.slug}: mapa em posição inválida ou ausente`);
  if (!p.html.includes('<section class="lp-hero" id="inicio"') || p.html.indexOf('id="inicio"') > iSum) falha('8-ordem', `${p.slug}: hero fora do início`);
  const sum = [...p.html.slice(iSum, iFimSum).matchAll(/<a href="#([^"]+)">/g)].map(x => x[1]);
  const esperado = ids.filter(i => sum.includes(i));
  if (sum.join(',') !== esperado.join(',')) falha('8-sumário', `${p.slug}: sumário fora da ordem real`);
  for (const i of sum) if (!ids.includes(i)) falha('8-sumário', `${p.slug}: link #${i} sem seção`);
  const h2s = new Map([...meio.matchAll(/<section class="section" id="([^"]+)"[\s\S]*?<h2 id="[^"]*">([^<]*)<\/h2>/g)].map(x => [x[1], x[2]]));
  for (const i of sum) {
    const li = p.html.slice(iSum, iFimSum).match(new RegExp('<a href="#' + escRe(i) + '"><span><b>([^<]*)</b>'));
    if (!li || li[1] !== h2s.get(i)) falha('8-sumário', `${p.slug}: texto do sumário #${i} difere do H2`);
  }
  if (anterior && anterior.join(',') === ids.join(',')) { iguaisVizinhas++; falha('8-ordem', `${p.slug}: mesma ordem da vizinha`); }
  anterior = ids;
}

/* 9: HTML bem formado (pilha de tags) + JSON-LD + ids únicos */
const VOID = new Set(['meta', 'link', 'img', 'br', 'hr', 'input', 'source', 'use', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'stop', 'col', 'wbr']);
function checarTags(html, rotulo) {
  const limpo = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '<script></script>').replace(/<style[\s\S]*?<\/style>/g, '<style></style>');
  const pilha = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  let m;
  while ((m = re.exec(limpo)) !== null) {
    const [, fecha, tag, resto] = m;
    const nome = tag.toLowerCase();
    if (VOID.has(nome) || /\/\s*$/.test(resto)) continue;
    if (!fecha) pilha.push(nome);
    else {
      const topo = pilha.pop();
      if (topo !== nome) { falha('9-html', `${rotulo}: </${nome}> fecha <${topo}>`); return; }
    }
  }
  if (pilha.length) falha('9-html', `${rotulo}: tags abertas ${pilha.join(',')}`);
}
for (const p of paginas) {
  checarTags(p.html, p.slug);
  const abre = (p.html.match(/<section[ >]/g) || []).length;
  const fecha = (p.html.match(/<\/section>/g) || []).length;
  if (abre !== fecha) falha('9-section', `${p.slug}: ${abre} <section> x ${fecha} </section>`);
  for (const blk of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(blk[1]); } catch (e) { falha('9-jsonld', `${p.slug}: ${e.message}`); }
  }
  const ids = [...p.html.matchAll(/\sid="([^"]+)"/g)].map(x => x[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) falha('9-ids', `${p.slug}: ids repetidos ${[...new Set(dup)].join(',')}`);
}

/* descriptions */
const descs = new Map();
for (const p of paginas) {
  const m = p.html.match(/<meta name="description" content="([^"]*)"/);
  if (!m) { falha('desc', `${p.slug}: sem description`); continue; }
  p.desc = m[1];
  if (p.desc.length > 160) falha('desc', `${p.slug}: ${p.desc.length} caracteres`);
  if (descs.has(p.desc)) falha('desc', `${p.slug}: duplicada de ${descs.get(p.desc)}`);
  descs.set(p.desc, p.slug);
  if (/moradores|habitantes|Censo|IBGE|posição|população|%/i.test(p.desc)) falha('desc', `${p.slug}: dado do IBGE na description`);
  if (/gratuit|grátis|fábrica|showroom|fabricação|prazo de \d|a partir de/i.test(p.desc)) falha('desc', `${p.slug}: promessa na description`);
  if (!p.html.includes(`"description": "${p.desc}"`)) falha('desc', `${p.slug}: JSON-LD com description diferente`);
}

/* relatório */
const rel = path.join(ROOT, 'log', '2026-11-07-h1-seo-local.md');
if (!fs.existsSync(rel)) falha('10-relatório', 'arquivo ausente');

const maxH1 = Math.max(...paginas.map(p => (p.h1 || '').length));
console.log(`Páginas validadas: ${paginas.length} (cidades: ${paginas.filter(p => p.cidade).length})`);
console.log(`1  maior H1: ${maxH1} caracteres`);
console.log(`2  H1 únicos: ${vistos.size}/${paginas.length}`);
console.log(`3  prefixo+sufixo: ${ambos}; apenas um: ${um}; puros: ${puros.length}${puros.length ? ' (' + puros.map(p => p.slug).join(', ') + ')' : ''}`);
console.log(`4  ocorrências de "subprefeitura" em HTML: ${totalSub}`);
console.log(`5  arquivos com caminho sao-paulo/<distrito>/: ${totalAntigo}`);
console.log(`7  termos no corpo: 5/5 em ${contagemTermos[5]}, 4/5 em ${contagemTermos[4]}, menos em ${contagemTermos.menos}; mapeamentos de heading distintos: ${mapas.size}`);
console.log(`8  ordens de seção distintas: ${ordens.size}/${paginas.length}; vizinhas iguais: ${iguaisVizinhas}`);
if (falhas.length) {
  console.log(`\n${falhas.length} falha(s):`);
  falhas.slice(0, 80).forEach(f => console.log(' - ' + f));
  process.exit(1);
}
console.log('\nTodos os testes passaram.');
