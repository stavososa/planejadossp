/**
 * Módulo Central: Gerador e Validador de Variações de H1
 * Baseado na ESPECIFICAÇÃO — SISTEMA DE VARIAÇÃO DOS H1 (Planejados SP)
 * 
 * REGRA ABSOLUTA: Nenhum H1 pode ultrapassar 60 caracteres (incluindo espaços e pontuação).
 */

const CATEGORIAS = {
  PURO: 'puro',
  PREFIXO: 'prefixo',
  SUFIXO: 'sufixo',
  PREFIXO_SUFIXO: 'prefixo_sufixo',
  BENEFICIO: 'beneficio',
  PROJETO: 'projeto'
};

// Modelos por Categoria
// Placeholders: [termo] = palavra-chave do serviço, [local] = cidade/distrito/bairro
const MODELOS = {
  [CATEGORIAS.PURO]: [
    { id: 'PURO_01', template: '[termo] em [local]' },
    { id: 'PURO_02', template: '[termo_sob_medida] em [local]' },
    { id: 'PURO_03', template: 'Marcenaria sob medida em [local]' },
    { id: 'PURO_04', template: 'Ambientes planejados em [local]' },
    { id: 'PURO_05', template: 'Móveis sob medida em [local]' },
    { id: 'PURO_06', template: '[termo] sob medida em [local]' },
    { id: 'PURO_07', template: 'Marcenaria planejada em [local]' }
  ],
  [CATEGORIAS.PREFIXO]: [
    { id: 'PREF_01', template: 'Conheça [termo_min] em [local]' },
    { id: 'PREF_02', template: 'Descubra [termo_min] em [local]' },
    { id: 'PREF_03', template: 'Procurando [termo_min] em [local]?' },
    { id: 'PREF_04', template: 'Buscando [termo_min] em [local]?' },
    { id: 'PREF_05', template: 'Encontre [termo_min] em [local]' },
    { id: 'PREF_06', template: 'Planeje [termo_min] em [local]' }
  ],
  [CATEGORIAS.SUFIXO]: [
    { id: 'SUF_01', template: '[termo] em [local] para seu lar' },
    { id: 'SUF_02', template: '[termo] em [local] para sua casa' },
    { id: 'SUF_03', template: '[termo] em [local] com seu estilo' },
    { id: 'SUF_04', template: '[termo] em [local] sob medida' },
    { id: 'SUF_05', template: '[termo] em [local] para seu espaço' },
    { id: 'SUF_06', template: '[termo] em [local] sob encomenda' }
  ],
  [CATEGORIAS.PREFIXO_SUFIXO]: [
    { id: 'PRE_SUF_01', template: 'Descubra [termo_min] em [local] para seu lar' },
    { id: 'PRE_SUF_02', template: 'Conheça [termo_min] em [local] para sua casa' },
    { id: 'PRE_SUF_03', template: 'Encontre [termo_min] em [local] sob medida' }
  ],
  [CATEGORIAS.BENEFICIO]: [
    { id: 'BEN_01', template: 'Seu lar com [termo_min] em [local]' },
    { id: 'BEN_02', template: 'Mais espaço com [termo_min] em [local]' },
    { id: 'BEN_03', template: 'Transforme seu lar em [local] com planejados' },
    { id: 'BEN_04', template: 'Ambientes funcionais em [local]' },
    { id: 'BEN_05', template: 'Planeje melhor seus espaços em [local]' },
    { id: 'BEN_06', template: 'Seu espaço ideal: [termo_min] em [local]' }
  ],
  [CATEGORIAS.PROJETO]: [
    { id: 'PROJ_01', template: 'Projetos de [termo_min] em [local]' },
    { id: 'PROJ_02', template: 'Soluções em [termo_min] para [local]' },
    { id: 'PROJ_03', template: 'Marcenaria sob medida para [local]' },
    { id: 'PROJ_04', template: 'Projetos sob medida em [local]' },
    { id: 'PROJ_05', template: 'Seu projeto de [termo_min] em [local]' },
    { id: 'PROJ_06', template: 'Projetos exclusivos em [local]' }
  ]
};

// Ordem cíclica com base na distribuição sugerida:
// Puro (30%), Prefixo (15%), Sufixo (20%), Prefixo+Sufixo (5%), Benefício (15%), Projeto (15%)
const DISTRIBUICAO_PADRAO = [
  CATEGORIAS.PURO,
  CATEGORIAS.PREFIXO,
  CATEGORIAS.SUFIXO,
  CATEGORIAS.BENEFICIO,
  CATEGORIAS.PROJETO,
  CATEGORIAS.PURO,
  CATEGORIAS.SUFIXO,
  CATEGORIAS.PREFIXO,
  CATEGORIAS.PROJETO,
  CATEGORIAS.BENEFICIO,
  CATEGORIAS.PREFIXO_SUFIXO,
  CATEGORIAS.PURO
];

// Estado global de memória de geração
const historico = [];
const usados = new Set();
let cicloIndex = 0;

/**
 * Normaliza o termo do serviço
 */
function obterTermos(servicoNome) {
  const s = servicoNome.trim();
  const termoMin = s.charAt(0).toLowerCase() + s.slice(1);
  
  // Variação "sob medida" do termo
  let termo_sob_medida = s.replace(/planejad[oa]s?/gi, 'sob medida');
  if (termo_sob_medida === s) {
    termo_sob_medida = s + ' sob medida';
  }

  return {
    termo: s,
    termo_min: termoMin,
    termo_sob_medida: termo_sob_medida
  };
}

/**
 * Preenche o template com os valores
 */
function interpolar(template, termos, local) {
  return template
    .replace(/\[termo\]/g, termos.termo)
    .replace(/\[termo_min\]/g, termos.termo_min)
    .replace(/\[termo_sob_medida\]/g, termos.termo_sob_medida)
    .replace(/\[local\]/g, local)
    .trim();
}

/**
 * Gera um H1 garantindo estritamente <= 60 caracteres e diversidade editorial
 */
function gerarH1({ local, servicoNome, tipoLocal = 'cidade', urlPath = '', categoriaPreferida = null }) {
  const termos = obterTermos(servicoNome);
  
  // Escolher categorias a tentar em ordem
  let categoriasOrdem = [];
  if (categoriaPreferida && MODELOS[categoriaPreferida]) {
    categoriasOrdem.push(categoriaPreferida);
  }
  
  // Próxima categoria da distribuição
  const catDaVez = DISTRIBUICAO_PADRAO[cicloIndex % DISTRIBUICAO_PADRAO.length];
  cicloIndex++;
  if (!categoriasOrdem.includes(catDaVez)) {
    categoriasOrdem.push(catDaVez);
  }

  // Demais categorias como fallback
  for (const cat of Object.values(CATEGORIAS)) {
    if (!categoriasOrdem.includes(cat)) {
      categoriasOrdem.push(cat);
    }
  }

  let melhorCandidato = null;

  for (const cat of categoriasOrdem) {
    const modelos = MODELOS[cat];
    for (const m of modelos) {
      const h1 = interpolar(m.template, termos, local);
      const chars = h1.length;

      // REGRA ABSOLUTA: <= 60 caracteres
      if (chars <= 60) {
        // Se ainda não foi usado globalmente nesta execução, prioriza
        if (!usados.has(h1)) {
          melhorCandidato = {
            h1,
            chars,
            categoria: cat,
            modeloId: m.id,
            aprovado: true
          };
          break;
        } else if (!melhorCandidato) {
          // Mantém como fallback se já tiver sido usado mas cabe
          melhorCandidato = {
            h1,
            chars,
            categoria: cat,
            modeloId: m.id,
            aprovado: true
          };
        }
      }
    }
    if (melhorCandidato && !usados.has(melhorCandidato.h1)) {
      break;
    }
  }

  // Fallback de segurança se nada deu certo (Puro ultra curto)
  if (!melhorCandidato || melhorCandidato.chars > 60) {
    const fallbackH1 = `${termos.termo} em ${local}`;
    melhorCandidato = {
      h1: fallbackH1.length <= 60 ? fallbackH1 : `${termos.termo.split(' ')[0]} em ${local}`,
      chars: fallbackH1.length <= 60 ? fallbackH1.length : `${termos.termo.split(' ')[0]} em ${local}`.length,
      categoria: CATEGORIAS.PURO,
      modeloId: 'FALLBACK_PURO',
      aprovado: true
    };
  }

  usados.add(melhorCandidato.h1);

  const registro = {
    url: urlPath,
    localidade: local,
    tipo: tipoLocal,
    h1: melhorCandidato.h1,
    chars: melhorCandidato.chars,
    categoria: melhorCandidato.categoria,
    modeloId: melhorCandidato.modeloId,
    aprovado: melhorCandidato.chars <= 60
  };

  historico.push(registro);
  return registro;
}

/**
 * Retorna o relatório formatado em tabela Markdown
 */
function gerarRelatorioValidacao() {
  let md = '| URL | Localidade | Tipo | H1 Gerado | Caracteres | Categoria | Modelo | Validação |\n';
  md += '|---|---|---|---|:---:|---|---|:---:|\n';

  historico.forEach(r => {
    const status = r.aprovado ? '✅ Aprovado' : '❌ Reprovado';
    md += `| \`${r.url}\` | ${r.localidade} | ${r.tipo} | **${r.h1}** | ${r.chars} | ${r.categoria} | ${r.modeloId} | ${status} |\n`;
  });

  return md;
}

/**
 * Limpa o histórico de geração
 */
function limparHistorico() {
  historico.length = 0;
  usados.clear();
  cicloIndex = 0;
}

module.exports = {
  CATEGORIAS,
  MODELOS,
  gerarH1,
  gerarRelatorioValidacao,
  limparHistorico,
  historico
};
