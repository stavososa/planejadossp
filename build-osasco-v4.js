const fs = require('fs');
const path = require('path');
const h1Gen = require('./tools/h1-generator.js');

const ROOT = process.cwd();

// 1. Remover pastas antigas e subpastas N2 para desinchar o projeto conforme diretriz
const subDirsToRemove = [
  'osasco/cozinha-planejada/cozinha-pequena',
  'osasco/cozinha-planejada/cozinha-em-l',
  'osasco/cozinha-planejada/cozinha-com-ilha',
  'osasco/cozinha-planejada/cozinha-americana',
  'osasco/dormitorios-planejados/quarto-de-casal',
  'osasco/closet-planejado/guarda-roupa-embutido',
  'osasco/closet-planejado/closet-pequeno',
  'osasco/sala-planejada/painel-de-tv',
  'osasco/banheiro-planejado/gabinete-de-banheiro',
  'osasco/varanda-gourmet-planejada/area-gourmet',
  'osasco/home-office-planejado/home-office-compacto',
  'osasco/marcenaria-comercial/loja-planejada'
];

console.log('Removendo subpáginas N2 desnecessárias para manter arquitetura unificada e enxuta...');
for (const dir of subDirsToRemove) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`Removido com sucesso: /${dir}/`);
  }
}

// Bairros completos de Osasco para estruturação semântica e SEO local
const BAIRROS_OSASCO = [
  'Bela Vista',
  'Vila Campesina',
  'Vila Yara',
  'Umuarama',
  'Presidente Altino',
  'Jaguaribe',
  'Centro',
  'City Bussocaba',
  'Jardim das Flores',
  'Quitaúna',
  'Km 18',
  'Cipava',
  'Ayrosa',
  'Rochdale',
  'Adalgisa',
  'Bussocaba',
  'Jardim D\'Abril',
  'Novo Osasco',
  'Santa Maria',
  'Padroeira',
  'Pestana',
  'Veloso'
];

// Limpar histórico de H1 antes da geração
h1Gen.limparHistorico();

// 2. Definição das 10 Páginas de Serviço Local Consolidadas para Osasco
const servicosOsasco = [
  {
    relPath: 'osasco/cozinha-planejada',
    urlPath: 'osasco/cozinha-planejada',
    servicoNome: 'Cozinha planejada',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    heroImg: 'assets/img/hero-cozinha-planejada.webp',
    title: 'Cozinha Planejada em Osasco | Marcenaria Sob Medida',
    desc: 'Cozinhas planejadas em Osasco sob medida. Soluções para casas e apartamentos: cozinha pequena, em L, com ilha e americana. Projeto 3D.',
    eyebrow: 'Cozinhas sob medida · Osasco',
    lead: 'Projetos de cozinha sob medida desenhados para a realidade dos lares de Osasco: armários até a laje, circulação confortável e divisão inteligente entre área molhada e eletros.',
    especificidades: [
      { titulo: 'Aproveitamento vertical', texto: 'Armários superiores estendidos até o teto para armazenar utensílios sem entulhar as bancadas.' },
      { titulo: 'Resistência à umidade', texto: 'Módulos inferiores em compensado naval ou MDF hidrófugo com fitas de borda de alta selagem.' },
      { titulo: 'Integração de ambientes', texto: 'Harmonia entre marcenaria da cozinha, sala de jantar e lavanderia acoplada.' }
    ],
    modelosTitulo: 'Modelos e configurações de cozinha planejada em Osasco',
    modelosSubtitulo: 'Configurações sob medida adaptadas para sobrados, casas geminadas e apartamentos em Osasco.',
    modelos: [
      {
        titulo: 'Cozinha pequena planejada',
        lead: 'Para plantas enxutas de 4 a 6 m² em apartamentos e casas compactas de Osasco.',
        specs: [
          { label: 'Armários até o teto', desc: 'Aproveitamento vertical total sem frestas para pó.' },
          { label: 'Nicho aéreo para micro-ondas', desc: 'Libera espaço contínuo para preparo na bancada.' },
          { label: 'Gavetões de extração total', desc: 'Facilidade de acesso a panelas pesadas sem abaixar.' }
        ]
      },
      {
        titulo: 'Cozinha em L planejada',
        lead: 'Otimização funcional do canto e bancada contínua para circulação ergonômica.',
        specs: [
          { label: 'Ferragens articuladas de canto', desc: 'Bandejas giratórias que resgatam 100% do vão cego.' },
          { label: 'Triângulo de trabalho', desc: 'Distâncias perfeitas entre pia, fogão e refrigerador.' },
          { label: 'Bancada contínua', desc: 'Espaço amplo para preparo de alimentos e apoio de eletros.' }
        ]
      },
      {
        titulo: 'Cozinha com ilha planejada',
        lead: 'Conceito aberto com bancada central para integração social da família e amigos.',
        specs: [
          { label: 'Circulação de 90 a 100 cm', desc: 'Passagem confortável ao redor de toda a ilha.' },
          { label: 'Infraestrutura técnica oculta', desc: 'Tubulação embutida para gás, coifa e cooktop.' },
          { label: 'Bancada estendida', desc: 'Apoio com reforço metálico invisível para banquetas.' }
        ]
      },
      {
        titulo: 'Cozinha americana planejada',
        lead: 'Balcão divisor inteligente que integra visualmente a cozinha à sala de estar.',
        specs: [
          { label: 'Balcão de dupla face', desc: 'Armários do lado interno e acabamento amadeirado para a sala.' },
          { label: 'Continuidade estética', desc: 'Mesma paleta de tons entre os ambientes integrados.' },
          { label: 'Altura ergonômica', desc: 'Calibragem precisa para banquetas médias com conforto.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/dormitorios-planejados',
    urlPath: 'osasco/dormitorios-planejados',
    servicoNome: 'Dormitórios planejados',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    heroImg: 'assets/img/ambiente-closet.webp',
    title: 'Dormitórios Planejados em Osasco | Quartos Sob Medida',
    desc: 'Quartos e dormitórios planejados em Osasco sob medida. Guarda-roupas de piso ao teto, cabeceiras integradas e soluções para casal e solteiro.',
    eyebrow: 'Dormitórios sob medida · Osasco',
    lead: 'Projetos sob medida para o repouso e a rotina diária: guarda-roupas até o gesso, portas de correr suaves e marcenaria para casais, solteiros e filhos.',
    especificidades: [
      { titulo: 'Portas de correr amortecidas', texto: 'Economizam espaço de circulação entre a cama e o armário.' },
      { titulo: 'Painéis de cabeceira com elétrica', texto: 'Interruptores e tomadas embutidos ao alcance das mãos.' },
      { titulo: 'Mesas de apoio suspensas', texto: 'Leveza visual e piso livre para facilitar a passagem do aspirador.' }
    ],
    modelosTitulo: 'Configurações de dormitórios sob medida em Osasco',
    modelosSubtitulo: 'Soluções personalizadas para dormitórios de casal, solteiro e quartos infantis.',
    modelos: [
      {
        titulo: 'Quarto de casal planejado',
        lead: 'Harmonia, espaço e circulação equilibrada para o casal.',
        specs: [
          { label: 'Divisão interna proporcional', desc: 'Dois lados com cabideiros, sapateiras e gavetas individuais.' },
          { label: 'Painel slim para TV', desc: 'Instalação compacta sem roubar área de passagem no quarto.' },
          { label: 'Corrediças telescópicas', desc: 'Abertura total suave sem emperrar mesmo com bastante carga.' }
        ]
      },
      {
        titulo: 'Quarto de solteiro e estudos',
        lead: 'Ambiente multifuncional unindo repouso, guarda-roupa e posto de estudos.',
        specs: [
          { label: 'Bancada de estudos ergonômica', desc: 'Espaço para notebook, livros e iluminação focal.' },
          { label: 'Cama com gavetões inferiores', desc: 'Aproveitamento do vão sob o colchão para roupas de cama.' },
          { label: 'Prateleiras aéreas', desc: 'Verticalização inteligente para livros e itens decorativos.' }
        ]
      },
      {
        titulo: 'Quarto infantil e juvenil',
        lead: 'Projetos evolutivos com segurança e ergonomia para os filhos.',
        specs: [
          { label: 'Bordas e cantos suaves', desc: 'Acabamentos protegidos para evitar batidas e acidentes.' },
          { label: 'Nichos de fácil alcance', desc: 'Estimula a organização independente de brinquedos.' },
          { label: 'Estruturação reforçada', desc: 'Gavetões com corrediças resistentes a uso contínuo.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/closet-planejado',
    urlPath: 'osasco/closet-planejado',
    servicoNome: 'Closet planejado',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    heroImg: 'assets/img/ambiente-closet.webp',
    title: 'Closet Planejado em Osasco | Armários Sob Medida',
    desc: 'Closets planejados em Osasco sob medida. Modelos abertos, portas de vidro reflecta, armários embutidos e iluminação LED interna.',
    eyebrow: 'Closets sob medida · Osasco',
    lead: 'Transforme um cômodo anexo, corredor ou passagem da suíte em um closet organizado, elegante e prático no dia a dia em Osasco.',
    especificidades: [
      { titulo: 'Setorização milimétrica', texto: 'Divisões calibradas para vestidos longos, camisas, ternos, sapatos e joias.' },
      { titulo: 'Iluminação técnica em LED', texto: 'Perfis de LED embutidos nas prateleiras para visualização fiel das cores.' },
      { titulo: 'Opções abertas ou fechadas', texto: 'Portas de giro, correr com amortecimento ou armários abertos com circulação ergonômica.' }
    ],
    modelosTitulo: 'Opções de closets e guarda-roupas sob medida em Osasco',
    modelosSubtitulo: 'Aproveitamento inteligente para suítes, quartos e closets privativos.',
    modelos: [
      {
        titulo: 'Guarda-roupa embutido até o teto',
        lead: 'Fechamento integral da parede à alvenaria sem acúmulo de poeira.',
        specs: [
          { label: 'Fechamento superior no gesso', desc: 'Elimina vãos mortos inacessíveis no topo do armário.' },
          { label: 'Portas com espelho de segurança', desc: 'Chapas inteiriças que ampliam a luminosidade do quarto.' },
          { label: 'Trilhos em alumínio reforçado', desc: 'Deslizamento suave com sistema anti-descarrilamento.' }
        ]
      },
      {
        titulo: 'Closet pequeno em L ou corredor',
        lead: 'Otimização inteligente para espaços de 3 a 6 m² em suítes compactas.',
        specs: [
          { label: 'Estrutura sem portas externas', desc: 'Ganha até 40% a mais de espaço útil em relação a armários comuns.' },
          { label: 'Cabideiros em dois níveis', desc: 'Duplica a capacidade para camisas, calças e casacos.' },
          { label: 'Sapateiras verticais corrediças', desc: 'Aproveitamento milimétrico de vãos estreitos.' }
        ]
      },
      {
        titulo: 'Closet de casal com ilha central',
        lead: 'Sofisticação e ampla capacidade para closets amplos e suítes máster.',
        specs: [
          { label: 'Ilha com gaveteiro e joalheiro', desc: 'Tampo de vidro transparente para relógios e joias.' },
          { label: 'Portas de vidro reflecta', desc: 'Protege as roupas da poeira com visual moderno e translúcido.' },
          { label: 'Iluminação perimetral automática', desc: 'Sensores de abertura para acendimento automático dos LEDs.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/sala-planejada',
    urlPath: 'osasco/sala-planejada',
    servicoNome: 'Sala planejada',
    pilarNacional: 'salas',
    pilarNacionalNome: 'Salas e painéis',
    heroImg: 'assets/img/ambiente-sala.webp',
    title: 'Sala Planejada em Osasco | Painéis e Racks Sob Medida',
    desc: 'Salas planejadas em Osasco sob medida. Painéis ripados para TV, racks suspensos, fiação oculta e móveis integrados para estar e jantar.',
    eyebrow: 'Salas e painéis · Osasco',
    lead: 'Móveis planejados para o convívio da família e recepção de amigos: painéis de TV de parede inteira, racks suspensos e integração com a varanda.',
    especificidades: [
      { titulo: 'Fiação 100% invisível', texto: 'Tubulações técnicas embutidas no painel para passagem de cabos HDMI e energia.' },
      { titulo: 'Ripado usinado de precisão', texto: 'Acabamento contínuo em MDF de alta densidade sem juntas plásticas aparentes.' },
      { titulo: 'Móveis suspensos do piso', texto: 'Facilidade para aspiração diária e passagem livre de robôs aspiradores.' }
    ],
    modelosTitulo: 'Soluções para salas de estar e TV em Osasco',
    modelosSubtitulo: 'Design sob medida para televisores grandes, recepção e integração de ambientes.',
    modelos: [
      {
        titulo: 'Painel de TV ripado com LED',
        lead: 'Destaque visual do piso ao teto com elegância contemporânea.',
        specs: [
          { label: 'Ancoragem estruturada', desc: 'Suporte seguro para televisores de 55 a 85 polegadas.' },
          { label: 'Fita de LED oculta', desc: 'Iluminação indireta acolhedora para assistir a filmes à noite.' },
          { label: 'Ripado usinado milimétrico', desc: 'Réguas contínuas sem emendas plásticas visíveis.' }
        ]
      },
      {
        titulo: 'Rack suspenso com gavetões',
        lead: 'Apoio prático para receptores, videogames e caixas de som sem ocupar o piso.',
        specs: [
          { label: 'Portas basculantes com pistão', desc: 'Fechamento suave que protege aparelhos contra poeira.' },
          { label: 'Passagem técnica de cabos', desc: 'Aberturas calculadas para ventilação dos eletrônicos.' },
          { label: 'Piso 100% livre', desc: 'Facilidade total para limpeza e robôs aspiradores.' }
        ]
      },
      {
        titulo: 'Estantes e divisórias de ambientes',
        lead: 'Integração fluida entre sala de estar, jantar e home office.',
        specs: [
          { label: 'Nichos com iluminação', desc: 'Exposição de livros, quadros e peças decorativas.' },
          { label: 'Divisória vazada', desc: 'Separação elegante sem bloquear a circulação de luz natural.' },
          { label: 'Acabamento dupla face', desc: 'Mesmo padrão de marcenaria de ambos os lados.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/banheiro-planejado',
    urlPath: 'osasco/banheiro-planejado',
    servicoNome: 'Banheiro planejado',
    pilarNacional: 'banheiros',
    pilarNacionalNome: 'Banheiros e lavabos',
    heroImg: 'assets/img/ambiente-banheiro.webp',
    title: 'Banheiro Planejado em Osasco | Gabinetes e Armários',
    desc: 'Banheiros planejados em Osasco sob medida. Gabinetes suspensos, espelheiras com armário oculto e materiais navais resistentes ao vapor.',
    eyebrow: 'Banheiros sob medida · Osasco',
    lead: 'Marcenaria naval sob medida resistente à umidade: gabinetes projetados para o milímetro exato da bancada de pedra e espelheiras organizadoras.',
    especificidades: [
      { titulo: 'MDF naval com bordas seladas', texto: 'Tratamento contra vapor constante de chuveiro e respingos de água.' },
      { titulo: 'Recorte sob medida para sifão', texto: 'Gaveta usinada em "U" que preserva espaço útil ao redor do encanamento.' },
      { titulo: 'Espelheira com armário oculto', texto: 'Profundidade reduzida de 12 a 15 cm ideal para guardar itens de higiene diária.' }
    ],
    modelosTitulo: 'Configurações de marcenaria para banheiros e lavabos',
    modelosSubtitulo: 'Resistência ao vapor e aproveitamento inteligente para banheiros de Osasco.',
    modelos: [
      {
        titulo: 'Gabinete de banheiro suspenso',
        lead: 'Encaixe preciso sob a cuba de pedra ou louça com gavetões organizadores.',
        specs: [
          { label: 'Corrediças inox anti-ferrugem', desc: 'Mecanismos que não oxidam com a umidade do ambiente.' },
          { label: 'Puxadores em cava usinada', desc: 'Sem saliências que possam machucar em banheiros estreitos.' },
          { label: 'Gaveta com recorte para sifão', desc: 'Aproveita as laterais da bancada sem bater no encanamento.' }
        ]
      },
      {
        titulo: 'Espelheira com armário oculto',
        lead: 'Organização vertical de perfumes, escovas e remédios sem ocupar a bancada.',
        specs: [
          { label: 'Profundidade slim de 12 a 15 cm', desc: 'Dimensão perfeita sem bater a cabeça ao lavar o rosto.' },
          { label: 'Iluminação perimetral em LED', desc: 'Luz frontal difusa ideal para maquiagem e barbear.' },
          { label: 'Prateleiras reguláveis em vidro', desc: 'Facilidade para higienização e ajuste de altura de frascos.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/varanda-gourmet-planejada',
    urlPath: 'osasco/varanda-gourmet-planejada',
    servicoNome: 'Varanda gourmet planejada',
    pilarNacional: 'varanda-e-area-gourmet',
    pilarNacionalNome: 'Varandas e áreas gourmet',
    heroImg: 'assets/img/ambiente-varanda.webp',
    title: 'Varanda Gourmet Planejada em Osasco | Áreas de Churrasco',
    desc: 'Varanda gourmet planejada em Osasco sob medida. Armários sob a pia da churrasqueira, nichos para cervejeira e móveis para sacadas envidraçadas.',
    eyebrow: 'Espaços gourmet · Osasco',
    lead: 'Integração de sacadas e varandas com marcenaria sob medida: proteção contra calor da churrasqueira, respiros para cervejeiras e acabamento duradouro.',
    especificidades: [
      { titulo: 'Isolamento térmico técnico', texto: 'Distanciamento seguro e chapas protetoras no entorno da churrasqueira.' },
      { titulo: 'Nichos com ventilação calculada', texto: 'Respiros para que cervejeiras e adegas funcionem sem superaquecimento.' },
      { titulo: 'Acabamentos com proteção UV', texto: 'Revestimentos resistentes à claridade e luz solar direta de sacadas.' }
    ],
    modelosTitulo: 'Soluções para varandas gourmet e churrasqueiras em Osasco',
    modelosSubtitulo: 'Marcenaria de lazer para casas, sobrados e apartamentos com sacada.',
    modelos: [
      {
        titulo: 'Área gourmet para churrasqueira',
        lead: 'Móveis sob a pia de apoio e bancadas de corte completas.',
        specs: [
          { label: 'Gavetões vedados para carvão', desc: 'Armazenamento limpo que não espalha fuligem pelo ambiente.' },
          { label: 'Bancadas amplas de apoio', desc: 'Área de trabalho em pedra e madeira para corte e travessas.' },
          { label: 'Dobradiças de alta ciclagem', desc: 'Ferragens robustas para suportar encontros e festas de família.' }
        ]
      },
      {
        titulo: 'Módulo integrado para cervejeira e adega',
        lead: 'Acomodação técnica para bebidas geladas sem interferir na circulação.',
        specs: [
          { label: 'Grelhas de exaustão de calor', desc: 'Preserva a vida útil do motor de refrigeração.' },
          { label: 'Porta-taças aéreo embutido', desc: 'Acesso rápido e elegante às taças de cristal.' },
          { label: 'Gavetas organizadoras de churrasco', desc: 'Divisões para facas de corte, pegadores e espetos.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/lavanderia-planejada',
    urlPath: 'osasco/lavanderia-planejada',
    servicoNome: 'Lavanderia planejada',
    pilarNacional: 'lavanderias',
    pilarNacionalNome: 'Lavanderias e áreas de serviço',
    heroImg: 'assets/img/ambiente-lavanderia.webp',
    title: 'Lavanderia Planejada em Osasco | Área de Serviço',
    desc: 'Lavanderia planejada em Osasco sob medida. Armários para máquina lava e seca, tulhas aramadas para roupa suja e armário vassoureiro alto.',
    eyebrow: 'Lavanderias sob medida · Osasco',
    lead: 'Organização prática para áreas de serviço compactas: encaixe para lava e seca sob a pedra, tulhas aramadas e armários do piso ao teto.',
    especificidades: [
      { titulo: 'Tulha basculante aramada', texto: 'Esconde roupas a lavar de forma ventilada e sem ocupar espaço no chão.' },
      { titulo: 'Armário vassoureiro alto', texto: 'Vão vertical sob medida para rodos, vassouras, tábua de passar e aspirador.' },
      { titulo: 'Encaixe com recuo de vibração', texto: 'Folga calculada de 2 a 3 cm para absorver a vibração da máquina na centrifugação.' }
    ],
    modelosTitulo: 'Soluções inteligentes para áreas de serviço em Osasco',
    modelosSubtitulo: 'Aproveitamento milimétrico para lavanderias integradas à cozinha ou externas.',
    modelos: [
      {
        titulo: 'Módulo embutido para lava e seca',
        lead: 'Bancada contínua de pedra cobrindo a máquina com tanque embutido.',
        specs: [
          { label: 'Recuo técnico antivibração', desc: 'Evita batidas na marcenaria durante o ciclo de lavagem.' },
          { label: 'Armário superior com cabideiro', desc: 'Espaço para pendurar camisas passadas no vapor.' },
          { label: 'Fitas de borda impermeáveis', desc: 'Proteção contra umidade e respingos constantes do tanque.' }
        ]
      },
      {
        titulo: 'Armário vassoureiro vertical',
        lead: 'Organização vertical fechada para itens compridos de limpeza.',
        specs: [
          { label: 'Suporte para tábua e ferro', desc: 'Acomodação suspensa e segura.' },
          { label: 'Vão para aspirador e baldes', desc: 'Fundo reforçado para suportar peso de produtos de limpeza.' },
          { label: 'Portas de piso a teto', desc: 'Esconde a desordem visual da lavanderia.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/home-office-planejado',
    urlPath: 'osasco/home-office-planejado',
    servicoNome: 'Home office planejado',
    pilarNacional: 'escritorio-home-office',
    pilarNacionalNome: 'Home office e escritórios',
    heroImg: 'assets/img/ambiente-home-office.webp',
    title: 'Home Office Planejado em Osasco | Bancadas Ergonômicas',
    desc: 'Home office planejado em Osasco sob medida. Bancadas para múltiplos monitores, calhas para fiação, gaveteiros com chave e estantes de livros.',
    eyebrow: 'Home office sob medida · Osasco',
    lead: 'Estações de trabalho e estudos desenhadas para ergonomia e foco diário: altura regulamentar de bancada, conectividade embutida e gaveteiros.',
    especificidades: [
      { titulo: 'Ergonomia de bancada (74 a 76 cm)', texto: 'Postura correta para longas jornadas de trabalho com teclado e mouse.' },
      { titulo: 'Caixas de conectividade no tampo', texto: 'Tomadas e USB integrados para conectar notebooks e celulares sem extensões pelo chão.' },
      { titulo: 'Prateleiras e estantes aéreas', texto: 'Aproveitamento da parede livre para livros e equipamentos de suporte.' }
    ],
    modelosTitulo: 'Opções de estações de trabalho e home office em Osasco',
    modelosSubtitulo: 'Soluções para trabalho remoto, estudos e consultoria residencial.',
    modelos: [
      {
        titulo: 'Home office compacto para quarto ou sala',
        lead: 'Bancadas slim de 90 a 120 cm que ocupam cantos com eficiência.',
        specs: [
          { label: 'Passa-fios com calha oculta', desc: 'Cabos organizados e escondidos atrás do painel.' },
          { label: 'Gaveteiro suspenso', desc: 'Não prende o movimento das pernas e cadeira de escritório.' },
          { label: 'Prateleira de apoio superior', desc: 'Espaço para iluminação e livros sem poluir o tampo.' }
        ]
      },
      {
        titulo: 'Escritório corporativo residencial',
        lead: 'Estação completa para múltiplos monitores e atendimento de clientes.',
        specs: [
          { label: 'Tampo engrossado de 25 a 36 mm', desc: 'Robustez sem envergar sob peso de monitores pesados.' },
          { label: 'Armários fechados com chave', desc: 'Guarda segura de documentos contábeis e contratos.' },
          { label: 'Iluminação difusa antiréflexo', desc: 'Conforto visual para trabalho em tela durante a noite.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/marcenaria-comercial',
    urlPath: 'osasco/marcenaria-comercial',
    servicoNome: 'Marcenaria comercial',
    pilarNacional: 'para-empresas',
    pilarNacionalNome: 'Espaços comerciais',
    heroImg: 'assets/img/ambiente-comercial.webp',
    title: 'Marcenaria Comercial em Osasco | Lojas e Escritórios',
    desc: 'Marcenaria comercial em Osasco sob medida. Balcões de recepção, clínicas, consultórios médicos e escritórios corporativos com alta durabilidade.',
    eyebrow: 'Espaços comerciais em Osasco',
    lead: 'Móveis corporativos projetados para alto tráfego: tampos resistentes em laminado de alta pressão (fórmica), balcões de atendimento e recepções.',
    especificidades: [
      { titulo: 'Resistência para uso intenso', texto: 'Bordas em PVC de 2 mm e revestimentos resistentes a riscos e desinfetantes hospitalares.' },
      { titulo: 'Acessibilidade ABNT NBR 9050', texto: 'Rebaixo para atendimento confortável a usuários de cadeira de rodas.' },
      { titulo: 'Montagem alinhada com cronograma', texto: 'Pontualidade para não atrasar a data de abertura do seu estabelecimento.' }
    ],
    modelosTitulo: 'Soluções de marcenaria corporativa e comercial em Osasco',
    modelosSubtitulo: 'Projetos para lojas, clínicas médicas, escritórios e consultórios em Osasco.',
    modelos: [
      {
        titulo: 'Lojas e balcões caixa',
        lead: 'Vitrines iluminadas, expositores modulares e balcão caixa com passa-fios.',
        specs: [
          { label: 'Iluminação comercial em LED', desc: 'Realça as cores e o apelo visual dos produtos à venda.' },
          { label: 'Gavetas com fechadura e cofre', desc: 'Segurança operacional para caixa e comprovantes.' },
          { label: 'Revestimento em BP texturizado', desc: 'Alta resistência a atritos de bolsas e embalagens.' }
        ]
      },
      {
        titulo: 'Recepções e consultórios',
        lead: 'Móveis de recepção sofisticados e consultórios médicos/odontológicos.',
        specs: [
          { label: 'Acessibilidade regulamentar', desc: 'Atende às exigências de fiscalização e vigilância sanitária.' },
          { label: 'Superfícies laváveis', desc: 'Resistência a produtos de limpeza hospitalar e álcool 70%.' },
          { label: 'Painéis acústicos com ripado', desc: 'Isolamento sonoro e sofisticação na sala de espera.' }
        ]
      }
    ]
  },
  {
    relPath: 'osasco/moveis-para-apartamento-pequeno',
    urlPath: 'osasco/moveis-para-apartamento-pequeno',
    servicoNome: 'Móveis para apartamento pequeno',
    pilarNacional: 'para-seu-imovel',
    pilarNacionalNome: 'Móveis para seu imóvel',
    heroImg: 'assets/img/hero-cozinha-planejada.webp',
    title: 'Móveis para Apartamento Pequeno em Osasco | Studios e Flats',
    desc: 'Móveis planejados para apartamento pequeno em Osasco. Soluções milimétricas para studios de 28 a 50m², aproveitamento vertical e multifuncional.',
    eyebrow: 'Apartamentos compactos · Osasco',
    lead: 'Projetos pensados para as plantas de 30 a 50 m² dos novos edifícios de Osasco: divisórias vazadas, mesas retráteis e armários até a laje.',
    especificidades: [
      { titulo: 'Móveis de dupla função', texto: 'Camas com baú, painéis giratórios de TV e mesas retráteis que dobram o espaço livre.' },
      { titulo: 'Divisão de ambientes sem paredes', texto: 'Estantes vazadas que separam o quarto da sala preservando iluminação e ventilação.' },
      { titulo: 'Profundidades reduzidas sob medida', texto: 'Armários com 35 a 45 cm que guardam tudo sem estrangular corredores e passagens.' }
    ],
    modelosTitulo: 'Soluções multifuncionais para apartamentos compactos',
    modelosSubtitulo: 'Aproveitamento milimétrico para studios, lofts e apartamentos de 1 e 2 dormitórios em Osasco.',
    modelos: [
      {
        titulo: 'Projetos para studio de 28 a 38 m²',
        lead: 'Integração completa sem divisórias pesadas para amplitude máxima.',
        specs: [
          { label: 'Painel giratório 360° para TV', desc: 'Permite assistir à TV na cama ou no sofá da sala.' },
          { label: 'Cozinha linear compacta', desc: 'Integra fogão, depurador, cuba e máquina sem frestas.' },
          { label: 'Cama com baú pneumático', desc: 'Guarda malas, cobertores e caixas embaixo do colchão.' }
        ]
      },
      {
        titulo: 'Apartamentos de 40 a 50 m² (2 dormitórios)',
        lead: 'Distribuição inteligente entre sala de estar, jantar compacta e dormitórios.',
        specs: [
          { label: 'Mesa de jantar de apoio', desc: 'Bancada encostada no painel com gavetas inferiores.' },
          { label: 'Guarda-roupa com portas de correr', desc: 'Não rouba espaço de abertura entre a cama e o armário.' },
          { label: 'Lavanderia acoplada à cozinha', desc: 'Divisória de vidro com armário vassoureiro planejado.' }
        ]
      }
    ]
  }
];

// 3. Função de Renderização de Página de Serviço Local Unificada
function renderServicoLocal(servico, todosServicos) {
  const rootPrefix = '../../';
  const osascoPrefix = '../';

  // Gerar H1 inteligente respeitando estritamente a especificação (<= 60 chars)
  const h1Data = h1Gen.gerarH1({
    local: 'Osasco',
    servicoNome: servico.servicoNome,
    tipoLocal: 'cidade',
    urlPath: servico.urlPath
  });

  const heroImgPath = `${rootPrefix}${servico.heroImg}`;

  // Breadcrumbs Schema e visual
  const breadcrumbItems = [
    { position: 1, name: 'Início', item: 'https://SEU-DOMINIO/' },
    { position: 2, name: 'Osasco', item: 'https://SEU-DOMINIO/osasco/' },
    { position: 3, name: h1Data.h1, item: `https://SEU-DOMINIO/${servico.urlPath}/` }
  ];

  const breadcrumbHtml = `
      <ol>
        <li><a href="${rootPrefix}">Início</a></li>
        <li><a href="${osascoPrefix}">Osasco</a></li>
        <li><span aria-current="page">${h1Data.h1}</span></li>
      </ol>`;

  // Schema.org com AreaServed contendo a Cidade e os Bairros atendidos
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': `${h1Data.h1}`,
        'description': servico.desc,
        'serviceType': 'Móveis Planejados',
        'provider': {
          '@id': 'https://SEU-DOMINIO/#organizacao'
        },
        'areaServed': [
          {
            '@type': 'City',
            'name': 'Osasco',
            'containedInPlace': {
              '@type': 'State',
              'name': 'São Paulo',
              'addressRegion': 'SP'
            }
          },
          ...BAIRROS_OSASCO.map(b => ({
            '@type': 'AdministrativeArea',
            'name': `${b}, Osasco`
          }))
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems.map(b => ({
          '@type': 'ListItem',
          'position': b.position,
          'name': b.name,
          'item': b.item
        }))
      }
    ]
  };

  // Especificidades técnicas
  const especificidadesHtml = servico.especificidades.map(esp => `
          <div class="lp-compare__col" style="background:var(--c-surface);padding:var(--sp-6);border-radius:var(--r-md);border:1px solid var(--c-border)">
            <h3 style="font-size:var(--fs-4);margin-bottom:var(--sp-2);color:var(--c-brand)">${esp.titulo}</h3>
            <p style="color:var(--c-text-2);font-size:var(--fs-2);line-height:1.6">${esp.texto}</p>
          </div>
  `).join('');

  // Modelos e configurações consolidados
  const modelosCardsHtml = servico.modelos.map(m => `
        <article class="lp-model-card">
          <h3>${m.titulo}</h3>
          <p class="lp-model-card__lead">${m.lead}</p>
          <ul class="lp-model-card__specs">
            ${m.specs.map(s => `<li><b>${s.label}:</b> ${s.desc}</li>`).join('\n            ')}
          </ul>
        </article>
  `).join('');

  // Outros serviços em Osasco para malha interna
  const outrosServicos = todosServicos
    .filter(s => s.relPath !== servico.relPath)
    .map(s => `<li><a href="${osascoPrefix}${s.relPath.replace('osasco/', '')}/"><span><b>${s.servicoNome} em Osasco</b><span>${s.desc.split('.')[0]}</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>`)
    .join('\n          ');

  // Lista semântica estruturada de bairros atendidos com Microdata ItemList + Place
  const bairrosListHtml = BAIRROS_OSASCO.map(b => `
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/Place">
            <span itemprop="name">${b}</span>
          </li>`).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${h1Data.h1} | MarcenariaSP</title>
  <meta name="description" content="${servico.desc}">
  <meta name="robots" content="noindex, follow, max-image-preview:large">
  <meta name="theme-color" content="#0A2A31">
  <meta name="color-scheme" content="light">

  <link rel="canonical" href="https://SEU-DOMINIO/${servico.urlPath}/">

  <!-- GTM: cole aqui o snippet do Google Tag Manager (head) -->
  <script>document.documentElement.classList.add("js");window.dataLayer=window.dataLayer||[];</script>

  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="MarcenariaSP">
  <meta property="og:title" content="${h1Data.h1} | MarcenariaSP">
  <meta property="og:description" content="${servico.desc}">

  <link rel="icon" href="${rootPrefix}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${rootPrefix}assets/fonts/dm-serif-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${rootPrefix}assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${rootPrefix}assets/css/styles.css">
  <link rel="stylesheet" href="${rootPrefix}assets/css/lp.css">
  <script src="${rootPrefix}assets/js/nav.js" defer></script>
  <script src="${rootPrefix}assets/js/lp.js" defer></script>
  <script src="${rootPrefix}assets/js/mapa.js" defer></script>

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>

<body>
  <!-- GTM: cole aqui o snippet noscript do Google Tag Manager (body) -->
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <svg class="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14"/> <path d="m12 5 7 7-7 7"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 5h16"/> <path d="M4 12h16"/> <path d="M4 19h16"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"/> <path d="m6 6 12 12"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  </svg>

  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="${rootPrefix}">
        <svg class="brand__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="brand__mark-a" d="M0 0h16v8H8v8H0z"/><path class="brand__mark-b" d="M18 0h6v24H0v-6h10v-8h8z"/></svg>
        <span class="brand__name" translate="no">MarcenariaSP</span>
      </a>

      <nav class="site-nav" id="menu" aria-label="Principal">
        <ul class="site-nav__list">
          <li class="site-nav__item has-sub">
            <button class="site-nav__link site-nav__trigger" type="button" aria-expanded="false" aria-controls="sub-ambientes">Ambientes<svg class="icon site-nav__chev" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></button>
            <div class="site-nav__sub site-nav__sub--tree" id="sub-ambientes">
              <div class="site-nav__panel">
                <ul class="site-nav__tree">
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}cozinhas/">Cozinhas planejadas</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}dormitorios-e-closets/">Dormitórios e closets</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}salas/">Salas e painéis</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}escritorio-home-office/">Home office e escritórios</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}lavanderias/">Lavanderias</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}banheiros/">Banheiros e lavabos</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}varanda-e-area-gourmet/">Varandas e áreas gourmet</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="${rootPrefix}para-empresas/">Espaços comerciais</a></li>
                </ul>
                <a class="site-nav__all" href="${rootPrefix}ambientes/">Ver todos os ambientes <svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
              </div>
            </div>
          </li>
          <li><a class="site-nav__link" href="${rootPrefix}onde-atendemos/">Onde atendemos</a></li>
          <li><a class="site-nav__link" href="${rootPrefix}sobre/">Sobre</a></li>
          <li><a class="site-nav__link" href="${rootPrefix}como-funciona/">Como funciona</a></li>
          <li><a class="site-nav__link" href="${rootPrefix}contato/">Contato</a></li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--primary btn--sm" data-track="header" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20${encodeURIComponent(h1Data.h1)}%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer">
          <svg class="icon btn__wa" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>
          <span class="btn__label-long">Solicitar orçamento</span>
          <span class="btn__label-short">Orçamento</span>
          <svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu">
          <span class="visually-hidden">Menu</span>
          <svg class="icon icon--open" aria-hidden="true" focusable="false"><use href="#i-menu"/></svg>
          <svg class="icon icon--close" aria-hidden="true" focusable="false"><use href="#i-x"/></svg>
        </button>
      </div>
    </div>
  </header>

  <main id="conteudo">

    <nav class="container lp-crumbs" aria-label="Trilha de navegação">${breadcrumbHtml}
    </nav>

    <!-- 1. Hero com imagem estática nítida à direita e fundo espelhado desfocado à esquerda -->
    <section class="lp-hero" id="inicio" aria-labelledby="hero-titulo">
      <img class="lp-hero__media" src="${heroImgPath}" width="1672" height="941" alt="${h1Data.h1}" fetchpriority="high" decoding="async">
      <div class="lp-hero__blur" aria-hidden="true"></div>
      <div class="lp-hero__scrim" aria-hidden="true"></div>
      <div class="container lp-hero__grid">
        <div class="lp-hero__text">
          <p class="eyebrow eyebrow--inverse">${servico.eyebrow}</p>
          <h1 id="hero-titulo">${h1Data.h1}</h1>
          <p class="lp-hero__lead">${servico.lead}</p>
          <p style="margin-top:var(--sp-6)">
            <a class="btn btn--primary" href="#contato" data-track="capa">Solicitar projeto em Osasco<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Diferenciais e Soluções técnicas para Osasco -->
    <section class="section" id="diferenciais" aria-labelledby="diferenciais-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Soluções planejadas</p>
            <h2 id="diferenciais-titulo">O que muda no projeto sob medida em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Projetos desenhados para a proporção real de casas, sobrados e apartamentos em Osasco.</p>
          </div>
        </header>
        <div class="lp-compare" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--sp-6)" data-reveal>
          ${especificidadesHtml}
        </div>
      </div>
    </section>

    <!-- 3. Modelos e Configurações Consolidadas (Substitui subpáginas N2 de forma rica e contextual) -->
    <section class="section" id="modelos" aria-labelledby="modelos-titulo" style="background:var(--c-tint)">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Modelos e configurações</p>
            <h2 id="modelos-titulo">${servico.modelosTitulo}</h2>
          </div>
          <div class="section-head__aside">
            <p>${servico.modelosSubtitulo}</p>
          </div>
        </header>

        <div class="lp-models-grid" data-reveal>
          ${modelosCardsHtml}
        </div>
      </div>
    </section>

    <!-- 4. Seção Semântica Estruturada: Bairros Atendidos em Osasco (Para Indexação do Google) -->
    <section class="section lp-bairros" id="bairros-atendidos" aria-labelledby="bairros-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Cobertura local</p>
            <h2 id="bairros-titulo">Bairros atendidos em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Atendimento presencial com visita técnica e medição milimétrica em todas as regiões de Osasco.</p>
          </div>
        </header>
        <p style="color:var(--c-text-2);max-width:70ch">Seja em sobrados residenciais, casas térreas ou condomínios verticais de apartamentos, nossa equipe técnica atende nos seguintes bairros:</p>
        <ul class="lp-bairros__grid" itemscope itemtype="https://schema.org/ItemList" data-reveal>
          ${bairrosListHtml}
        </ul>
      </div>
    </section>

    <!-- 5. Outros Ambientes Planejados em Osasco -->
    <section class="section" id="outros-ambientes" aria-labelledby="outros-ambientes-titulo" style="background:var(--c-surface)">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Ambientes integrados</p>
            <h2 id="outros-ambientes-titulo">Mais soluções sob medida em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Planeje seu imóvel completo com a mesma marcenaria e acabamentos padronizados.</p>
          </div>
        </header>
        <ul class="lp-siblings" data-reveal>
          ${outrosServicos}
        </ul>
      </div>
    </section>

    <!-- 6. Contato e Formulário -->
    <section class="section lp-cta" id="contato" aria-labelledby="contato-titulo">
      <div class="container">
        <header class="section-head section-head--center" data-reveal>
          <p class="eyebrow">Atendimento e orçamento</p>
          <h2 id="contato-titulo">Inicie seu projeto de ${servico.servicoNome.toLowerCase()} em Osasco</h2>
          <p style="margin-top:var(--sp-4);color:var(--c-text-2);max-width:60ch;margin-inline:auto">Envie sua planta, medidas aproximadas ou converse com um projetista técnico para agendar a medição no seu imóvel.</p>
          <p style="margin-top:var(--sp-6)">
            <a class="btn btn--primary btn--lg" data-track="cta-final" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20${encodeURIComponent(servico.servicoNome)}%20em%20Osasco." target="_blank" rel="noopener noreferrer">
              <svg class="icon btn__wa" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>
              Solicitar orçamento no WhatsApp
              <svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
            </a>
          </p>
        </header>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container site-footer__bottom">
      <p>© <span id="ano-atual">2026</span> MarcenariaSP. Atendimento em Osasco, Grande São Paulo e capital.</p>
      <p><a href="${osascoPrefix}">Voltar para o hub de Osasco</a> · <a href="${rootPrefix}${servico.pilarNacional}/">Ver categoria geral de ${servico.pilarNacionalNome.toLowerCase()}</a></p>
    </div>
  </footer>
</body>
</html>`;
}

// 4. Executar a geração das 10 páginas de Osasco
console.log('Gerando páginas consolidadas de serviço local para Osasco...');
for (const servico of servicosOsasco) {
  const dirPath = path.join(ROOT, servico.relPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const html = renderServicoLocal(servico, servicosOsasco);
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Gerado: /${servico.urlPath}/`);
}

// 5. Atualizar osasco/index.html para apontar somente para as páginas consolidadas N1
const osascoHubPath = path.join(ROOT, 'osasco', 'index.html');
if (fs.existsSync(osascoHubPath)) {
  let osascoHubHtml = fs.readFileSync(osascoHubPath, 'utf8');

  // Bloco limpo de ambientes consolidados
  const novoBlocoAmbientes = `
    <!-- Seção Completa de Ambientes Planejados em Osasco (Arquitetura Consolidada) -->
    <section class="section" id="ambientes-osasco" aria-labelledby="ambientes-osasco-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Arquitetura local consolidada</p>
            <h2 id="ambientes-osasco-titulo">Ambientes planejados em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Conheça os projetos sob medida por categoria de ambiente, com todos os modelos e configurações reunidos de forma única.</p>
          </div>
        </header>

        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="./cozinha-planejada/"><span><b>Cozinhas planejadas em Osasco</b><span>Modelos pequena, em L, com ilha e americana</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./dormitorios-planejados/"><span><b>Dormitórios planejados em Osasco</b><span>Quartos de casal, solteiro e dormitórios infantis</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./closet-planejado/"><span><b>Closets planejados em Osasco</b><span>Guarda-roupas embutidos até o teto e closets abertos</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./sala-planejada/"><span><b>Salas planejadas em Osasco</b><span>Painéis de TV ripados, racks suspensos e estantes</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./banheiro-planejado/"><span><b>Banheiros planejados em Osasco</b><span>Gabinetes navais sob medida e espelheiras organizadoras</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./varanda-gourmet-planejada/"><span><b>Varandas gourmet em Osasco</b><span>Móveis para churrasqueira e sacadas envidraçadas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./lavanderia-planejada/"><span><b>Lavanderias planejadas em Osasco</b><span>Módulos para lava e seca, tulhas e armários verticais</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./home-office-planejado/"><span><b>Home office planejado em Osasco</b><span>Bancadas ergonômicas slim e estações corporativas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./marcenaria-comercial/"><span><b>Marcenaria comercial em Osasco</b><span>Lojas, recepções corporativas e consultórios médicos</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="./moveis-para-apartamento-pequeno/"><span><b>Apartamentos pequenos em Osasco</b><span>Móveis multifuncionais para studios e plantas compactas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>
      </div>
    </section>`;

  // Substituir a seção antiga
  osascoHubHtml = osascoHubHtml.replace(
    /<!-- Seção Completa de Ambientes Planejados em Osasco[\s\S]*?<\/section>/,
    novoBlocoAmbientes.trim()
  );

  fs.writeFileSync(osascoHubPath, osascoHubHtml, 'utf8');
  console.log('Atualizado hub principal: /osasco/index.html');
}

// 6. Imprimir o Relatório de Validação de H1
console.log('\n======================================================');
console.log('RELATÓRIO DE VALIDAÇÃO DE H1 — ESPECIFICAÇÃO PLANEJADOS SP');
console.log('======================================================\n');
console.log(h1Gen.gerarRelatorioValidacao());
