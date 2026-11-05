const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

// Configuração completa de todas as páginas de Osasco
const pages = [
  // ==========================================
  // COZINHAS
  // ==========================================
  {
    slug: 'cozinha-planejada-osasco',
    tipo: 'n1',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    title: 'Cozinha Planejada em Osasco | Marcenaria Sob Medida',
    desc: 'Cozinhas planejadas em Osasco sob medida. Soluções para casas e apartamentos, aproveitamento milimétrico, bancadas e armários até o teto. Projeto 3D.',
    h1: 'Cozinha planejada em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Com mais de 73% das moradias em casas e novos edifícios verticais no eixo da Autonomistas, a cozinha em Osasco pede projetos inteligentes que resolvem desde plantas geminadas compridas até cozinhas compactas de apartamento.',
    contextoLocal: {
      titulo: 'Projetando cozinhas para a realidade de Osasco',
      p1: 'Osasco tem uma distribuição habitacional marcante: 73,7% dos domicílios particulares são casas (192 mil moradias) e 24,8% são apartamentos (Censo IBGE 2022). Em bairros tradicionais como Bela Vista, Jaguaribe, Campesina e Rochdale, as casas frequentemente trazem cozinhas lineares ou em L com pontos de água e gás já consolidados.',
      p2: 'Já nos lançamentos recentes do Centro, Presidente Altino e Km 18, os apartamentos trazem plantas integradas com sala e lavanderia acoplada. Projetar sob medida em Osasco significa compatibilizar armários até o teto, circulação livre e a divisão correta entre a área molhada e os eletrodomésticos, respeitando a estrutura do imóvel.'
    },
    especificidades: [
      { titulo: 'Aproveitamento vertical', texto: 'Armários superiores estendidos até a laje para acomodar eletroportáteis e utensílios sem poluir a bancada de trabalho.' },
      { titulo: 'Resistência e umidade', texto: 'Módulos sob a pia estruturados com compensado naval ou MDF hidrófugo com selagem especial para evitar danos em caso de vazamentos.' },
      { titulo: 'Logística e montagem', texto: 'Acessos pelas rodovias Castelo Branco, Raposo Tavares e vias locais planejados na medição para subida por escadas ou elevadores de serviço.' }
    ],
    n2Links: [
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Para plantas enxutas e apartamentos' },
      { slug: 'cozinha-em-l-planejada-osasco', nome: 'Cozinha em L em Osasco', desc: 'Layout funcional para casas e sobrados' },
      { slug: 'cozinha-com-ilha-planejada-osasco', nome: 'Cozinha com ilha em Osasco', desc: 'Integração e sofisticação para ambientes amplos' },
      { slug: 'cozinha-americana-planejada-osasco', nome: 'Cozinha americana em Osasco', desc: 'Balcões de integração sala-cozinha' }
    ],
    faq: [
      { q: 'Quanto tempo leva para produzir uma cozinha planejada em Osasco?', a: 'O prazo de fabricação é definido por contrato em dias úteis a contar da aprovação executiva do projeto 3D. Varia conforme a complexidade dos acabamentos e ferragens escolhidas.' },
      { q: 'Vocês atendem casas geminadas e sobrados antigos em Osasco?', a: 'Sim. Em casas com paredes que não são 100% no esquadro, a marcenaria sob medida é a melhor alternativa, pois usa réguas de ajuste e compensações milimétricas.' },
      { q: 'Como funciona a medição no meu endereço em Osasco?', a: 'Após a conversa inicial pelo WhatsApp e envio da planta ou medidas prévias, agendamos a visita técnica presencial para conferir prumadas, pontos de elétrica e hidráulica.' }
    ]
  },
  {
    slug: 'cozinha-pequena-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    categoriaLocalSlug: 'cozinha-planejada-osasco',
    categoriaLocalNome: 'Cozinha planejada em Osasco',
    title: 'Cozinha Pequena Planejada em Osasco | Otimização 3D',
    desc: 'Cozinhas pequenas sob medida em Osasco. Soluções para 4m² a 8m² em casas e apartamentos compactos. Armários até o teto e gavetões funcionais.',
    h1: 'Cozinha pequena planejada em Osasco',
    eyebrow: 'Cozinhas sob medida · Osasco',
    lead: 'Em cozinhas de 4 a 6 m², cada centímetro faz diferença na rotina. Aproveitamento vertical até o teto, gavetões de panela e profundidades inteligentes para seu imóvel em Osasco.',
    contextoLocal: {
      titulo: 'Soluções inteligentes para cozinhas compactas em Osasco',
      p1: 'Com o crescimento de novos empreendimentos verticais ao longo das estações Osasco, Comandante Sampaio e Quitaúna, muitos moradores receberam apartamentos com cozinhas de área reduzida, muitas vezes integradas à área de serviço.',
      p2: 'Em espaços curtos, móveis comprados prontos deixam frestas inúteis e gavetas que batem na porta. A marcenaria sob medida permite subir armários até a laje, embutir depurador e forno, e usar gavetões com corrediças telescópicas que suportam peso real.'
    },
    especificidades: [
      { titulo: 'Gavetões inferiores', texto: 'Substituem prateleiras baixas desconfortáveis, permitindo alcançar panelas no fundo sem se abaixar.' },
      { titulo: 'Divisória de vidro ou ripada', texto: 'Separação discreta entre a cozinha e o tanque sem bloquear a luz natural vinda da janela.' },
      { titulo: 'Nichos suspensos para micro-ondas', texto: 'Libera espaço crucial na bancada da pia para preparo diário dos alimentos.' }
    ],
    n2Links: [
      { slug: 'cozinha-em-l-planejada-osasco', nome: 'Cozinha em L em Osasco', desc: 'Layout em ângulo para casas e sobrados' },
      { slug: 'cozinha-americana-planejada-osasco', nome: 'Cozinha americana em Osasco', desc: 'Bancadas de integração de ambientes' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno em Osasco', desc: 'Marcenaria completa para metragens reduzidas' }
    ],
    faq: [
      { q: 'O que cabe em uma cozinha de 5 m²?', a: 'Com bom planejamento, cabe geladeira, pia com cuba inox, cooktop de 4 bocas, forno embutido, armários aéreos até o teto e gavetões funcionais.' },
      { q: 'Vale a pena usar cooktop em vez de fogão de chão em cozinha pequena?', a: 'Sim, o cooktop libera o espaço inferior para gaveteiros ou forno embutido com altura ergonômica.' },
      { q: 'Como solicito o projeto 3D para minha cozinha em Osasco?', a: 'Basta preencher o formulário abaixo ou chamar no WhatsApp com as medidas aproximadas para iniciarmos o esboço sem compromisso.' }
    ]
  },
  {
    slug: 'cozinha-em-l-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    categoriaLocalSlug: 'cozinha-planejada-osasco',
    categoriaLocalNome: 'Cozinha planejada em Osasco',
    title: 'Cozinha em L Planejada em Osasco | Canto Inteligente',
    desc: 'Cozinha em L sob medida em Osasco. Aproveitamento do canto cego, bancadas amplas e integração em casas e apartamentos. Projeto 3D sem compromisso.',
    h1: 'Cozinha em L planejada em Osasco',
    eyebrow: 'Cozinhas sob medida · Osasco',
    lead: 'O layout em L é a escolha perfeita para criar o triângulo ergonômico ideal entre pia, fogão e geladeira, aproveitando o canto da parede com ferragens especiais em Osasco.',
    contextoLocal: {
      titulo: 'A eficiência da cozinha em L nas residências de Osasco',
      p1: 'Casas térreas e sobrados nos bairros Jaguaribe, Veloso, Cipava e Santo Antônio frequentemente contam com plantas de cozinha que se beneficiam do formato em L. Esse desenho permite criar uma bancada generosa para preparo e liberar a parede oposta para circulação ou mesa de copa.',
      p2: 'O ponto crítico de qualquer cozinha em L é o canto: sem marcenaria sob medida, ele vira um espaço escuro e inacessível. Nossos projetos utilizam prateleiras com recorte inteligente ou ferragens giratórias para resgatar 100% da capacidade do móvel.'
    },
    especificidades: [
      { titulo: 'Aproveitamento de canto cego', texto: 'Mecanismos de canto tipo articulado ou prateleiras em L que não deixam nenhum vão sem uso.' },
      { titulo: 'Triângulo de trabalho funcional', texto: 'Posicionamento planejado de geladeira, cuba e cocção para reduzir passos desnecessários ao cozinhar.' },
      { titulo: 'Bancada contínua de pedra', texto: 'Apoio em marcenaria reforçada para suportar tampos de quartzo, granito ou porcelanato sem emendas frágeis.' }
    ],
    n2Links: [
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Ideias para cozinhas compactas' },
      { slug: 'cozinha-com-ilha-planejada-osasco', nome: 'Cozinha com ilha em Osasco', desc: 'Projetos modernos com ilha central' },
      { slug: 'cozinha-planejada-osasco', nome: 'Cozinha planejada em Osasco', desc: 'Guia de cozinhas na cidade' }
    ],
    faq: [
      { q: 'Qual a vantagem da cozinha em L sobre a cozinha linear?', a: 'A cozinha em L duplica a área de bancada disponível e permite posicionar pia e fogão em paredes diferentes, criando uma rotina muito mais confortável.' },
      { q: 'Dá para colocar mesa de refeições rápidas em uma cozinha em L?', a: 'Sim, a depender da largura do cômodo, é possível estender o tampo como península para 2 ou 3 banquetas.' },
      { q: 'Vocês fazem a instalação dos móveis em sábados em Osasco?', a: 'Sim, respeitando os horários do condomínio ou o regulamento local de barulho da sua rua.' }
    ]
  },
  {
    slug: 'cozinha-com-ilha-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    categoriaLocalSlug: 'cozinha-planejada-osasco',
    categoriaLocalNome: 'Cozinha planejada em Osasco',
    title: 'Cozinha com Ilha Planejada em Osasco | Sob Medida',
    desc: 'Cozinha com ilha planejada em Osasco. Bancadas centrais para cooktop, banquetas e espaço gourmet em casas e apartamentos de conceito aberto.',
    h1: 'Cozinha com ilha planejada em Osasco',
    eyebrow: 'Cozinhas sob medida · Osasco',
    lead: 'A ilha central transforma a cozinha no coração da casa. Integração visual com a sala de estar, apoio para refeições rápidas e espaço gourmet sob medida em Osasco.',
    contextoLocal: {
      titulo: 'Cozinhas com ilha para imóveis de conceito aberto em Osasco',
      p1: 'Em casas do Parque dos Príncipes, City Bussocaba, Adalgisa e apartamentos de alto padrão no Campesina e Vila Yara, as plantas integradas pedem uma ilha central que una funcionalidade e estética.',
      p2: 'Calculamos vãos livres de circulação de no mínimo 90 a 100 cm em toda a volta da ilha, garantindo que portas de armários e da lava-louças abram confortavelmente sem esbarrar nas banquetas.'
    },
    especificidades: [
      { titulo: 'Pontos de elétrica e gás embutidos', texto: 'Projetada para receber cooktop, coifa de teto e tomadas torre de embutir com segurança total.' },
      { titulo: 'Bancada estendida para banquetas', texto: 'Balanço estruturado com reforço metálico invisível para acomodar as pernas com ergonomia.' },
      { titulo: 'Armazenamento periférico', texto: 'Gavetões voltados para o lado da cocção e nichos decorativos ou adega voltados para a sala.' }
    ],
    n2Links: [
      { slug: 'cozinha-americana-planejada-osasco', nome: 'Cozinha americana em Osasco', desc: 'Penínsulas e balcões integrados' },
      { slug: 'cozinha-em-l-planejada-osasco', nome: 'Cozinha em L em Osasco', desc: 'Combinação clássica com ilha' },
      { slug: 'cozinha-planejada-osasco', nome: 'Cozinha planejada em Osasco', desc: 'Página principal de cozinhas' }
    ],
    faq: [
      { q: 'Qual a metragem mínima para ter uma cozinha com ilha?', a: 'Geralmente recomendamos que a cozinha tenha pelo menos 12 a 14 m² ou esteja completamente integrada à sala de estar para manter a circulação fluida.' },
      { q: 'A coifa precisa ser de teto?', a: 'Sim, se o cooktop estiver na ilha, utiliza-se coifa de ilha fixada no teto ou depurador embutido no forro.' },
      { q: 'Vocês auxiliam na compatibilização com a marmoraria?', a: 'Sim, passamos o gabarito executivo exato da marcenaria para que a pedra se encaixe perfeitamente.' }
    ]
  },
  {
    slug: 'cozinha-americana-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'cozinhas',
    pilarNacionalNome: 'Cozinhas planejadas',
    categoriaLocalSlug: 'cozinha-planejada-osasco',
    categoriaLocalNome: 'Cozinha planejada em Osasco',
    title: 'Cozinha Americana Planejada em Osasco | Balcão Integrado',
    desc: 'Cozinha americana planejada sob medida em Osasco. Balcões divisores, armários inteligentes e harmonia visual entre cozinha e sala.',
    h1: 'Cozinha americana planejada em Osasco',
    eyebrow: 'Cozinhas sob medida · Osasco',
    lead: 'Integração moderna entre quem cozinha e quem está na sala. Balcões de apoio funcionais, acabamentos contínuos e armários sob medida em Osasco.',
    contextoLocal: {
      titulo: 'A tendência da cozinha americana em Osasco',
      p1: 'Seja em apartamentos de 45 a 70 m² no Bela Vista e Jaguaribe ou em reformas de sobrados que removeram a parede divisória, a cozinha americana é a solução favorita dos moradores de Osasco para ampliar a sensação de espaço.',
      p2: 'Desenvolvemos balcões de meia parede ou penínsulas que acomodam banquetas do lado da sala e armários práticos do lado da cozinha, harmonizando os tons amadeirados com o painel de TV da sala.'
    },
    especificidades: [
      { titulo: 'Balcão funcional de dupla face', texto: 'Apoio de refeições voltado para a sala com nichos ou armários funcionais do lado da cozinha.' },
      { titulo: 'Paleta integrada', texto: 'Acabamentos em MDF que conversam com os móveis da sala de estar e jantar.' },
      { titulo: 'Iluminação pontual', texto: 'Estruturação para pendentes sobre a bancada sem fios expostos.' }
    ],
    n2Links: [
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Soluções para metragens reduzidas' },
      { slug: 'cozinha-com-ilha-planejada-osasco', nome: 'Cozinha com ilha em Osasco', desc: 'Opções amplas de conceito aberto' },
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Ambientes integrados e harmônicos' }
    ],
    faq: [
      { q: 'Qual a altura padrão do balcão de cozinha americana?', a: 'Para banquetas altas, 100 a 105 cm; para banquetas médias ou continuidade da bancada de trabalho da pia, 90 a 92 cm.' },
      { q: 'Dá para colocar cooktop no balcão da cozinha americana?', a: 'Sim, desde que respeitada a distância de segurança e instalada uma coifa ou depurador adequado.' },
      { q: 'O balcão pode ser fechado com marcenaria em vez de alvenaria?', a: 'Sim, a marcenaria sob medida pode estruturar todo o balcão com tampos reforçados e armários embutidos.' }
    ]
  },

  // ==========================================
  // DORMITÓRIOS & CLOSETS
  // ==========================================
  {
    slug: 'dormitorios-planejados-osasco',
    tipo: 'n1',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    title: 'Dormitórios Planejados em Osasco | Sob Medida',
    desc: 'Quartos e dormitórios planejados em Osasco. Guarda-roupas sob medida, cabeceiras integradas e aproveitamento total de espaço para casal e solteiro.',
    h1: 'Dormitórios planejados em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Quartos sob medida desenhados para o repouso e a organização. Guarda-roupas até o teto, portas de correr suaves e marcenaria inteligente para casas e apartamentos em Osasco.',
    contextoLocal: {
      titulo: 'Otimização de quartos na malha urbana de Osasco',
      p1: 'Osasco possui mais de 11 mil moradores por km², o que torna a gestão do espaço interno essencial. Tanto em sobrados com quartos de formatos retangulares quanto em dormitórios de apartamentos novos de 9 a 12 m², colocar móveis prontos cria "cantos mortos" e perda de circulação.',
      p2: 'Com móveis planejados sob medida, calculamos vãos precisos para camas de casal ou queen, nichos embutidos, iluminação indireta e gaveteiros com divisórias funcionais para organizar roupas de frio e cama de forma ergonômica.'
    },
    especificidades: [
      { titulo: 'Portas de correr com amortecimento', texto: 'Ideais para dormitórios onde o espaço entre a cama e o armário não comporta abertura de portas de giro.' },
      { titulo: 'Divisão interna personalizada', texto: 'Cabideiros duplos, calceiros deslizantes e prateleiras com alturas desenhadas para os seus pertences reais.' },
      { titulo: 'Cabeceiras e mesas de apoio', texto: 'Painéis estofados ou em madeira com tomadas e interruptores já embutidos na altura exata da mão.' }
    ],
    n2Links: [
      { slug: 'guarda-roupa-planejado-osasco', nome: 'Guarda-roupa planejado em Osasco', desc: 'Armários embutidos de piso a teto' },
      { slug: 'quarto-de-casal-planejado-osasco', nome: 'Quarto de casal em Osasco', desc: 'Conforto e harmonia para o casal' },
      { slug: 'closet-planejado-osasco', nome: 'Closet planejado em Osasco', desc: 'Espaço aberto ou fechado para roupas' },
      { slug: 'closet-pequeno-planejado-osasco', nome: 'Closet pequeno em Osasco', desc: 'Aproveitamento para quartos compactos' }
    ],
    faq: [
      { q: 'É possível fazer armário planejado que contorne colunas estruturais?', a: 'Sim. Essa é uma das principais vantagens da marcenaria sob medida em relação aos móveis modulados. O fundo e as laterais são usinados no recorte da viga ou pilar.' },
      { q: 'Qual a espessura recomendada para o fundo e prateleiras?', a: 'Usamos fundos estruturados e prateleiras com espessura compatível com o vão para garantir que não haja envergadura com o peso das roupas e cobertores.' },
      { q: 'Vocês realizam entrega em condomínios de Osasco com horários restritos?', a: 'Sim, o cronograma de instalação é previamente alinhado com as regras do síndico e horários permitidos de barulho da sua região.' }
    ]
  },
  {
    slug: 'guarda-roupa-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    categoriaLocalSlug: 'dormitorios-planejados-osasco',
    categoriaLocalNome: 'Dormitórios planejados em Osasco',
    title: 'Guarda-Roupa Planejado em Osasco | Armário Sob Medida',
    desc: 'Guarda-roupa planejado em Osasco até o teto. Portas de correr ou giro, gaveteiros reforçados e divisão interna para casais e solteiros.',
    h1: 'Guarda-roupa planejado em Osasco',
    eyebrow: 'Armários sob medida · Osasco',
    lead: 'Acabe com a poeira sobre o armário e as frestas laterais. Guarda-roupas construídos exatamente na altura do seu pé-direito com divisão interna calculada para suas roupas.',
    contextoLocal: {
      titulo: 'Armários sob medida desenhados para a sua rotina em Osasco',
      p1: 'Ao comprar guarda-roupas modulares em lojas convencionais, o morador de Osasco invariavelmente perde de 30 a 50 cm até o forro e deixa vãos laterais que só servem para acumular sujeira. Em uma cidade com clima úmido e estações bem marcadas, cada nicho aéreo é valioso para edredons e malas.',
      p2: 'Fabricamos roupeiros sob medida com estruturas robustas em MDF, trilhos de alumínio anodizado e sistemas amortecidos que deslizam suavemente sem descarrilar, mesmo com uso constante de famílias numerosas.'
    },
    especificidades: [
      { titulo: 'Fechamento até a laje', texto: 'Aproveitamento do maleiro superior com acabamento de gesso ou réguas de selamento contínuo.' },
      { titulo: 'Espelhos inteiriços colados', texto: 'Portas de correr com espelho de segurança que ampliam a luminosidade e a sensação de amplitude do quarto.' },
      { titulo: 'Gavetas com corrediça oculta', texto: 'Extração total para ver todas as peças dobradas sem o risco de a gaveta despencar.' }
    ],
    n2Links: [
      { slug: 'quarto-de-casal-planejado-osasco', nome: 'Quarto de casal em Osasco', desc: 'Dormitórios completos para casal' },
      { slug: 'closet-planejado-osasco', nome: 'Closet planejado em Osasco', desc: 'Opções abertas e fechadas' },
      { slug: 'dormitorios-planejados-osasco', nome: 'Dormitórios em Osasco', desc: 'Visão geral para quartos' }
    ],
    faq: [
      { q: 'Porta de correr ou porta de bater: o que é melhor?', a: 'Se o espaço entre a cama e o guarda-roupa for menor que 80 cm, a porta de correr é mandatória para não travar a passagem.' },
      { q: 'Como evitar mofo no armário em paredes frias?', a: 'Aplicamos afastadores técnicos e ventilação adequada nas costas do móvel, evitando contato direto com alvenarias sujeitas à umidade.' },
      { q: 'Posso personalizar o número de gavetas e calceiros?', a: 'Sim, o projeto 3D é desenhado conforme a proporção real de calças, vestidos longos, camisas e sapatos que você precisa guardar.' }
    ]
  },
  {
    slug: 'quarto-de-casal-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    categoriaLocalSlug: 'dormitorios-planejados-osasco',
    categoriaLocalNome: 'Dormitórios planejados em Osasco',
    title: 'Quarto de Casal Planejado em Osasco | Projetos 3D',
    desc: 'Quarto de casal planejado sob medida em Osasco. Painéis de cabeceira, criados-mudos suspensos, guarda-roupas integrados e conforto visual.',
    h1: 'Quarto de casal planejado em Osasco',
    eyebrow: 'Quartos sob medida · Osasco',
    lead: 'Harmonia, espaço individual para os dois e circulação livre. Planejamos quartos de casal completos em Osasco com marcenaria sob medida elegante e funcional.',
    contextoLocal: {
      titulo: 'Projetando suítes e quartos de casal em Osasco',
      p1: 'Casais em Osasco lidam frequentemente com o desafio de acomodar cama Queen ou King em quartos de 10 a 14 m² sem estrangular as passagens laterais. O uso de criados-mudos suspensos e cabeceiras que se estendem de ponta a ponta na parede cria aconchego e linearidade.',
      p2: 'A divisão interna do guarda-roupa também é personalizada em dois lados equilibrados, permitindo que cada um tenha seus nichos, sapateiras e cabideiros dedicados com fácil acesso matinal.'
    },
    especificidades: [
      { titulo: 'Cabeceira com iluminação embutida', texto: 'Painel ripado ou estofado com luzes de leitura direcionáveis e interruptores individuais.' },
      { titulo: 'Mesas de cabeceira suspensas', texto: 'Facilitam a passagem do aspirador de pó e conferem leveza visual ao redor da cama.' },
      { titulo: 'Painel de TV slim', texto: 'Instalação da TV no quarto sem ocupar espaço no piso e sem cabos pendurados à vista.' }
    ],
    n2Links: [
      { slug: 'guarda-roupa-planejado-osasco', nome: 'Guarda-roupa em Osasco', desc: 'Armários de casal com portas de correr' },
      { slug: 'closet-planejado-osasco', nome: 'Closet planejado em Osasco', desc: 'Closets para suítes máster' },
      { slug: 'closet-pequeno-planejado-osasco', nome: 'Closet pequeno em Osasco', desc: 'Soluções para quartos enxutos' }
    ],
    faq: [
      { q: 'Cabe uma cama Queen em um quarto de 10 m²?', a: 'Sim, desde que a disposição do armário e a abertura das portas sejam milimetricamente calculadas na marcenaria sob medida.' },
      { q: 'Vocês fazem a instalação de tomadas e interruptores na cabeceira?', a: 'Deixamos os recortes e a estrutura prontos para os módulos elétricos na altura exata do seu conforto.' },
      { q: 'Como é feito o orçamento para o quarto de casal?', a: 'Você nos envia a planta ou fotos e medidas pelo WhatsApp, montamos o estudo prévio e agendamos a medição técnica em Osasco.' }
    ]
  },
  {
    slug: 'closet-planejado-osasco',
    tipo: 'n1',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    title: 'Closet Planejado em Osasco | Projetos Sob Medida',
    desc: 'Closets planejados em Osasco para casas e apartamentos. Modelos abertos, fechados com portas de vidro, camarins e ilhas centrais sob medida.',
    h1: 'Closet planejado em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Transforme um quarto auxiliar, uma passagem ou uma suíte em um closet organizado e prático. Marcenaria sob medida de alto padrão e projetos funcionais em Osasco.',
    contextoLocal: {
      titulo: 'Closets para casas e novos apartamentos em Osasco',
      p1: 'Em residências dos bairros Parque dos Príncipes, City Bussocaba, Bela Vista e Vila Yara, é muito comum destinar uma suíte máster ou um dormitório anexo para closet exclusivo. Nos apartamentos maiores do Jardim das Flores e Campesina, o closet integra banheiro e quarto.',
      p2: 'Desenhamos closets com circulação confortável de pelo menos 80 cm, iluminação em LED embutida nas prateleiras e setores específicos para vestidos longos, sapatos, ternos e acessórios finos.'
    },
    especificidades: [
      { titulo: 'Vidros refletivos e portas de alumínio', texto: 'Acabamentos contemporâneos que protegem as roupas da poeira mantendo a elegância visual.' },
      { titulo: 'Sapateiras telescópicas', texto: 'Gavetas inclinadas com corrediças ocultas que facilitam a visualização de todos os pares.' },
      { titulo: 'Ilhas de acessórios', texto: 'Módulos centrais com tampo de vidro para joias, relógios e divisores aveludados sob medida.' }
    ],
    n2Links: [
      { slug: 'closet-pequeno-planejado-osasco', nome: 'Closet pequeno em Osasco', desc: 'Closets compactos para apartamentos' },
      { slug: 'dormitorios-planejados-osasco', nome: 'Dormitórios planejados em Osasco', desc: 'Quartos completos e integrados' },
      { slug: 'guarda-roupa-planejado-osasco', nome: 'Guarda-roupa planejado em Osasco', desc: 'Modelos de armários embutidos' }
    ],
    faq: [
      { q: 'Compensa fazer closet aberto sem portas?', a: 'O closet aberto reduz custos com portas e ferragens e amplia a percepção de espaço, mas exige ambiente protegido de poeira e luz solar direta.' },
      { q: 'Quantos metros quadrados são necessários para ter um closet com ilha?', a: 'Para uma ilha central com gavetas, recomendamos um espaço livre mínimo de 12 a 14 m² para não comprometer a circulação ao redor.' },
      { q: 'Vocês instalam fita LED nas prateleiras?', a: 'Sim, projetamos a marcenaria com canaletas e rebaixos técnicos para passagem discreta da fiação e transformadores.' }
    ]
  },
  {
    slug: 'closet-pequeno-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'dormitorios-e-closets',
    pilarNacionalNome: 'Dormitórios e closets',
    categoriaLocalSlug: 'closet-planejado-osasco',
    categoriaLocalNome: 'Closet planejado em Osasco',
    title: 'Closet Pequeno Planejado em Osasco | Otimização Sob Medida',
    desc: 'Closet pequeno planejado em Osasco. Soluções para 3m² a 6m² em formato linear, L ou U. Cabideiros duplos, sapateiras e aproveitamento total.',
    h1: 'Closet pequeno planejado em Osasco',
    eyebrow: 'Closets sob medida · Osasco',
    lead: 'Mesmo em poucos metros quadrados, um closet bem projetado organiza mais que dois guarda-roupas convencionais. Marcenaria sob medida inteligente em Osasco.',
    contextoLocal: {
      titulo: 'Closets compactos em apartamentos e casas de Osasco',
      p1: 'Muitos apartamentos entregues em Osasco contam com um corredor de passagem entre o quarto e o banheiro da suíte, ou um quarto menor que pode ser convertido em closet. Sem portas convencionais batendo, o aproveitamento útil aumenta em até 40%.',
      p2: 'Trabalhamos com alturas calibradas para cabideiros duplos (camisas e calças), prateleiras deslizantes e espelhos de parede inteira que duplicam a sensação de amplitude do cômodo.'
    },
    especificidades: [
      { titulo: 'Disposição em L ou corredor', texto: 'Aproveitamento de duas paredes paralelas ou de canto com circulação livre central.' },
      { titulo: 'Cabideiros em dois níveis', texto: 'Duplica o espaço para roupas curtas sem amassar as barras.' },
      { titulo: 'Sapateiras verticais', texto: 'Gavetas corrediças estreitas que comportam dezenas de pares ocupando menos de 40 cm de largura.' }
    ],
    n2Links: [
      { slug: 'closet-planejado-osasco', nome: 'Closet planejado em Osasco', desc: 'Guia geral de closets' },
      { slug: 'guarda-roupa-planejado-osasco', nome: 'Guarda-roupa em Osasco', desc: 'Alternativa com portas fechadas' },
      { slug: 'dormitorios-planejados-osasco', nome: 'Dormitórios em Osasco', desc: 'Quartos sob medida completos' }
    ],
    faq: [
      { q: 'Qual o espaço mínimo para montar um closet pequeno?', a: 'Uma área de 1,5m por 2,0m (3 m²) já é suficiente para montar um closet funcional em L ou corredor.' },
      { q: 'Closet pequeno precisa ter portas?', a: 'Geralmente closets pequenos funcionam melhor abertos ou com cortina/porta de correr na entrada do cômodo, economizando espaço precioso.' },
      { q: 'Como é calculada a ventilação do closet?', a: 'Deixamos recuos técnicos e indicamos acabamentos resistentes à umidade para manter as roupas sempre frescas.' }
    ]
  },

  // ==========================================
  // SALAS E PAINÉIS
  // ==========================================
  {
    slug: 'sala-planejada-osasco',
    tipo: 'n1',
    pilarNacional: 'salas',
    pilarNacionalNome: 'Salas e painéis',
    title: 'Sala Planejada em Osasco | Painéis e Racks Sob Medida',
    desc: 'Salas de estar e jantar planejadas em Osasco. Painéis ripados para TV, racks suspensos, cristaleiras e integração de ambientes com marcenaria sob medida.',
    h1: 'Sala planejada em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'A sala é o cartão de visitas da sua casa em Osasco. Crie um ambiente sofisticado e acolhedor com painéis de TV de parede inteira, fiação 100% oculta e móveis desenhados para conviver.',
    contextoLocal: {
      titulo: 'Salas para o estilo de morar de Osasco',
      p1: 'Osasco une casas com salas amplas nos bairros residenciais a apartamentos com salas compactas integradas à varanda ou cozinha. O desafio mais frequente é ocultar cabos de receptores, consoles e soundbars mantendo a leveza do espaço.',
      p2: 'Trabalhamos com marcenaria suspensa que facilita a limpeza diária, painéis ripados produzidos em réguas usinadas e armários discretos com fecho-toque para guardar jogos, louças e documentos sem ruído visual.'
    },
    especificidades: [
      { titulo: 'Gestão invisível de fiação', texto: 'Canaletas embutidas atrás do painel que permitem passar novos cabos HDMI e de energia sem esforço.' },
      { titulo: 'Painéis ripados sob medida', texto: 'Ripado autêntico com espaçamento milimétrico calibrado para compor a acústica e a iluminação do cômodo.' },
      { titulo: 'Nichos com fita de LED', texto: 'Iluminação indireta quente que valoriza objetos decorativos e cria atmosfera de cinema à noite.' }
    ],
    n2Links: [
      { slug: 'painel-de-tv-planejado-osasco', nome: 'Painel de TV em Osasco', desc: 'Painéis até o teto com rack suspenso' },
      { slug: 'home-office-planejado-osasco', nome: 'Home office em Osasco', desc: 'Espaços de trabalho e estudo integrados' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno', desc: 'Soluções para salas integradas' }
    ],
    faq: [
      { q: 'O painel aguenta televisores pesados de 75 polegadas ou mais?', a: 'Sim, a estrutura de fixação na alvenaria é calculada conforme o peso da TV e do suporte articulado, garantindo segurança total.' },
      { q: 'Vocês fazem móveis para sala integrada com a varanda?', a: 'Sim. A integração sala-varanda gourmet é uma das solicitações mais comuns nos condomínios de Osasco.' },
      { q: 'Qual a diferença do ripado em marcenaria para o ripado de plástico?', a: 'A marcenaria permite usinagem contínua, acabamento em lâmina de madeira natural ou MDF de alta densidade sem juntas plásticas visíveis.' }
    ]
  },
  {
    slug: 'painel-de-tv-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'salas',
    pilarNacionalNome: 'Salas e painéis',
    categoriaLocalSlug: 'sala-planejada-osasco',
    categoriaLocalNome: 'Sala planejada em Osasco',
    title: 'Painel de TV Planejado em Osasco | Ripado e Racks',
    desc: 'Painel de TV planejado em Osasco. Modelos até o teto, ripados em MDF, racks suspensos com gavetas e fiação 100% embutida para salas e quartos.',
    h1: 'Painel de TV planejado em Osasco',
    eyebrow: 'Salas e painéis · Osasco',
    lead: 'Valorize sua sala em Osasco com um painel de TV sob medida de alto impacto estético. Fios completamente invisíveis, acabamento ripado de precisão e rack suspenso leve.',
    contextoLocal: {
      titulo: 'Painéis modernos para salas e dormitórios em Osasco',
      p1: 'O televisor é o centro de entretenimento da família osasquense, mas cabos aparentes e suportes desalinhados estragam o visual da sala. O painel planejado protege a alvenaria, permite embutir iluminação em LED e cria um fundo uniforme que transforma o ambiente.',
      p2: 'Seja em sobrados no Rochdale e Jaguaribe ou em apartamentos na Av. Franz Voegeli e Bussocaba, adaptamos as dimensões do painel e do rack às proporções reais da sala, garantindo que o sofá fique na distância ideal de visão.'
    },
    especificidades: [
      { titulo: 'Passagem técnica de cabos', texto: 'Tubo guia embutido para passar novos cabos de videogame, soundbar ou fibra óptica sem quebrar parede.' },
      { titulo: 'Portas basculantes no rack', texto: 'Com pistão a gás ou fecho-toque para guardar aparelhos eletrônicos protegidos de poeira.' },
      { titulo: 'Estruturação reforçada', texto: 'Chapas espessas e pontos de travamento calculados para TVs de 55 a 85 polegadas com total firmeza.' }
    ],
    n2Links: [
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Projetos completos de sala de estar e jantar' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno em Osasco', desc: 'Aproveitamento para salas compactas' },
      { slug: 'home-office-planejado-osasco', nome: 'Home office em Osasco', desc: 'Estações de trabalho e bancadas' }
    ],
    faq: [
      { q: 'O painel ripado junta muita poeira?', a: 'Nossos ripados recebem acabamento em laca ou melamina de alta densidade com ranhuras de fácil limpeza usando pano macio ou espanador eletrostático.' },
      { q: 'O rack precisa tocar o chão?', a: 'Não. Recomendamos racks suspensos a cerca de 15 a 20 cm do piso para facilitar a limpeza diária, inclusive para robôs aspiradores.' },
      { q: 'Como é fixado o suporte da TV?', a: 'O suporte metálico é ancorado diretamente na estrutura reforçada do painel ou na alvenaria atrás dele com buchas específicas.' }
    ]
  },

  // ==========================================
  // BANHEIROS
  // ==========================================
  {
    slug: 'banheiro-planejado-osasco',
    tipo: 'n1',
    pilarNacional: 'banheiros',
    pilarNacionalNome: 'Banheiros e lavabos',
    title: 'Banheiro Planejado em Osasco | Gabinetes e Armários',
    desc: 'Banheiros planejados em Osasco sob medida. Gabinetes sob a pia, espelheiras com LED, nichos embutidos e materiais resistentes à umidade.',
    h1: 'Banheiro planejado em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Organização, higiene e aproveitamento inteligente para banheiros e lavabos em Osasco. Marcenaria sob medida fabricada com materiais hidrófugos resistentes ao vapor.',
    contextoLocal: {
      titulo: 'Marcenaria sob medida para banheiros em Osasco',
      p1: 'Banheiros de apartamentos e sobrados em Osasco frequentemente enfrentam desafios de umidade constante, pouca ventilação natural e espaço exíguo entre a bacia sanitária, a pia e o box.',
      p2: 'Projetamos gabinetes suspensos que facilitam a lavagem do piso, com recortes técnicos milimétricos para sifões e registros, além de espelheiras com portas ocultas que multiplicam a capacidade de armazenar perfumes e cosméticos sem bagunça.'
    },
    especificidades: [
      { titulo: 'MDF naval e bordas seladas', texto: 'Matéria-prima tratada contra vapor d\'água constante e respingos diários da pia.' },
      { titulo: 'Espelheira com armário oculto', texto: 'Profundidade slim de 12 a 15 cm ideal para remédios, escovas e cremes.' },
      { titulo: 'Gabinetes suspensos', texto: 'Mantêm o piso livre para higienização e evitam contato com água parada.' }
    ],
    n2Links: [
      { slug: 'gabinete-de-banheiro-planejado-osasco', nome: 'Gabinete de banheiro em Osasco', desc: 'Móveis sob a bancada sob medida' },
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Soluções de marcenaria compacta' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno', desc: 'Marcenaria para imóveis enxutos' }
    ],
    faq: [
      { q: 'O móvel do banheiro estraga com o vapor do chuveiro?', a: 'Usamos MDF Ultra/Hidrófugo com fitas de borda coladas com tecnologia de alta aderência, conferindo proteção duradoura contra umidade.' },
      { q: 'Como é feito o recorte para o sifão da cuba?', a: 'Nossos montadores usinam a gaveta com recorte tipo "U" reforçado, mantendo as laterais 100% úteis para guardar objetos.' },
      { q: 'Vocês fazem armários para lavabo pequeno?', a: 'Sim, projetamos bancadas e nichos sob medida com profundidade reduzida ideais para lavabos sociais.' }
    ]
  },
  {
    slug: 'gabinete-de-banheiro-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'banheiros',
    pilarNacionalNome: 'Banheiros e lavabos',
    categoriaLocalSlug: 'banheiro-planejado-osasco',
    categoriaLocalNome: 'Banheiro planejado em Osasco',
    title: 'Gabinete de Banheiro Planejado em Osasco | Sob Medida',
    desc: 'Gabinete de banheiro sob medida em Osasco. Gavetões com recorte para sifão, puxadores em cava e acabamento naval resistente à umidade.',
    h1: 'Gabinete de banheiro planejado em Osasco',
    eyebrow: 'Banheiros sob medida · Osasco',
    lead: 'O gabinete ideal é aquele que encaixa perfeitamente sob a sua bancada de pedra sem frestas e guarda tudo o que você precisa no dia a dia em Osasco.',
    contextoLocal: {
      titulo: 'Gabinetes funcionais para banheiros e suítes em Osasco',
      p1: 'Em reformas nos bairros Campesina, Bela Vista e Vila Yara, trocar um gabinete antigo ou modular por um sob medida elimina vãos onde caem objetos e aproveita até o último centímetro sob a cuba.',
      p2: 'Criamos gavetas com divisórias organizadoras em acrílico ou madeira, portas basculantes com pistão e nichos toalheiros abertos para toalhas de rosto enroladas, trazendo ar de hotelaria para sua casa.'
    },
    especificidades: [
      { titulo: 'Gavetões com corrediça inox', texto: 'Ferragens que não enferrujam com o vapor e suportam peso de xampus e produtos de limpeza.' },
      { titulo: 'Gaveta superior em U', texto: 'Contorna a tubulação hidráulica sem desperdiçar o espaço frontal da cuba.' },
      { titulo: 'Puxadores em cava usinada', texto: 'Sem puxadores metálicos salientes que possam machucar a perna em espaços estreitos.' }
    ],
    n2Links: [
      { slug: 'banheiro-planejado-osasco', nome: 'Banheiro planejado em Osasco', desc: 'Guia completo de banheiros e lavabos' },
      { slug: 'lavanderia-planejada-osasco', nome: 'Lavanderia em Osasco', desc: 'Marcenaria para área molhada' },
      { slug: 'dormitorios-planejados-osasco', nome: 'Dormitórios em Osasco', desc: 'Integração de suíte e banheiro' }
    ],
    faq: [
      { q: 'Vocês instalam o gabinete com cuba de sobrepor ou embutida?', a: 'Fabricamos para ambos os modelos, respeitando a altura exata da pedra e da tubulação pré-existente.' },
      { q: 'Qual a altura recomendada para a bancada do banheiro?', a: 'Geralmente entre 85 e 90 cm do chão acabado até a borda superior da pia.' },
      { q: 'Vocês atendem somente o gabinete ou o banheiro completo?', a: 'Projetamos gabinetes isolados ou o conjunto completo com espelheira, nichos e armário para toalhas.' }
    ]
  },

  // ==========================================
  // VARANDAS E ÁREAS GOURMET
  // ==========================================
  {
    slug: 'varanda-gourmet-planejada-osasco',
    tipo: 'n1',
    pilarNacional: 'varanda-e-area-gourmet',
    pilarNacionalNome: 'Varandas e áreas gourmet',
    title: 'Varanda Gourmet Planejada em Osasco | Churrasqueira',
    desc: 'Varanda gourmet planejada em Osasco. Armários para churrasqueira, bancadas com pia, cervejeiras embutidas e integração sob medida.',
    h1: 'Varanda gourmet planejada em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'O ponto de encontro dos amigos e da família. Marcenaria sob medida para varandas e sacadas gourmet em Osasco, resistente ao sol e ao calor da churrasqueira.',
    contextoLocal: {
      titulo: 'Varandas e sacadas integradas nos lares de Osasco',
      p1: 'Quase todos os edifícios modernos entregues em Osasco contam com sacada gourmet envidraçada. Ao integrar a varanda com a sala, o ambiente se torna a principal área social do apartamento.',
      p2: 'Desenvolvemos armários sob a bancada da churrasqueira, nichos ventilados para cervejeiras e adegas climatizadas, e painéis decorativos que disfarçam a condensadora do ar-condicionado com elegância.'
    },
    especificidades: [
      { titulo: 'Isolamento térmico na churrasqueira', texto: 'Distanciamento técnico e proteção anti-chama para preservar a integridade do MDF.' },
      { titulo: 'Módulos para cervejeira e adega', texto: 'Respiros de ar calculados para garantir o bom funcionamento e a vida útil dos aparelhos.' },
      { titulo: 'Proteção contra incidência solar', texto: 'Fórmicas e acabamentos com filtro UV que não amarelam nem desbotam com o sol da manhã ou tarde.' }
    ],
    n2Links: [
      { slug: 'area-gourmet-planejada-osasco', nome: 'Área gourmet em Osasco', desc: 'Soluções para casas e coberturas' },
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Integração de sala com a sacada' },
      { slug: 'cozinha-planejada-osasco', nome: 'Cozinha planejada em Osasco', desc: 'Continuidade de móveis e bancadas' }
    ],
    faq: [
      { q: 'Pode molhar a marcenaria da varanda durante a lavagem?', a: 'Recomendamos limpeza com pano úmido. Usamos rodapés elevados ou pés de inox ocultos para proteger as bases em caso de respingos.' },
      { q: 'Vocês projetam armário para esconder o condensador de ar?', a: 'Sim, criamos ripados vazados que permitem a livre circulação de ar sem deixar os motores expostos.' },
      { q: 'É preciso autorização do condomínio para alterar a varanda?', a: 'Móveis internos sob a bancada não alteram fachada, mas sempre seguimos o regulamento interno do seu prédio em Osasco.' }
    ]
  },
  {
    slug: 'area-gourmet-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'varanda-e-area-gourmet',
    pilarNacionalNome: 'Varandas e áreas gourmet',
    categoriaLocalSlug: 'varanda-gourmet-planejada-osasco',
    categoriaLocalNome: 'Varanda gourmet planejada em Osasco',
    title: 'Área Gourmet Planejada em Osasco | Casas e Coberturas',
    desc: 'Área gourmet planejada sob medida em Osasco. Bancadas amplas, ilhas com churrasqueira, armários e prateleiras para confraternizações.',
    h1: 'Área gourmet planejada em Osasco',
    eyebrow: 'Espaços gourmet · Osasco',
    lead: 'Estruture o espaço de lazer dos seus sonhos. Marcenaria sob medida robusta, charmosa e feita para durar em casas, coberturas e quintais de Osasco.',
    contextoLocal: {
      titulo: 'Espaços gourmet nas casas e coberturas de Osasco',
      p1: 'Com 73,7% dos domicílios em casas em bairros como Parque dos Príncipes, Umuarama, City Bussocaba e Rochdale, o churrasco de fim de semana é tradição. Projetar uma área gourmet sob medida organiza grelhas, carvão, louças de churrasco e bebidas com praticidade.',
      p2: 'Combinamos estruturas em madeira maciça ou MDF naval com tampos de granito, prateleiras de ferro e iluminação aconchegante para criar um refúgio acolhedor dentro do seu quintal.'
    },
    especificidades: [
      { titulo: 'Gaveteiros térmicos e de carvão', texto: 'Gavetas vedadas para armazenar sacos de carvão sem sujar o piso e sem poeira.' },
      { titulo: 'Cristaleira e expositor de copos', texto: 'Portas de vidro e iluminação LED para valorizar taças e garrafas.' },
      { titulo: 'Bancadas de preparo e apoio', texto: 'Espaço generoso para cortar carnes e apoiar travessas com facilidade de limpeza.' }
    ],
    n2Links: [
      { slug: 'varanda-gourmet-planejada-osasco', nome: 'Varanda gourmet em Osasco', desc: 'Opções para sacadas de apartamento' },
      { slug: 'cozinha-com-ilha-planejada-osasco', nome: 'Cozinha com ilha em Osasco', desc: 'Conceito aberto e integração' },
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Áreas sociais e de lazer integradas' }
    ],
    faq: [
      { q: 'Qual o melhor material para área gourmet externa coberta?', a: 'Usamos MDF naval de alta densidade revestido em fórmica ou lâmina tratada contra umidade e intempéries.' },
      { q: 'Vocês fazem mesas e bancos sob medida para área gourmet?', a: 'Sim, mesas de pranchão e bancos reforçados combinando madeira e serralheria sob medida.' },
      { q: 'Como é feito o projeto de iluminação da área gourmet?', a: 'Integramos canaletas de LED e pontos de foco sobre a bancada no desenho executivo do 3D.' }
    ]
  },

  // ==========================================
  // LAVANDERIAS
  // ==========================================
  {
    slug: 'lavanderia-planejada-osasco',
    tipo: 'n1',
    pilarNacional: 'lavanderias',
    pilarNacionalNome: 'Lavanderias e áreas de serviço',
    title: 'Lavanderia Planejada em Osasco | Área de Serviço Sob Medida',
    desc: 'Lavanderia planejada em Osasco. Armários para tanque, nichos para máquina lava e seca, tulhas aramadas e organização sob medida.',
    h1: 'Lavanderia planejada em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Transforme o cômodo mais apertado da casa em um espaço prático, limpo e organizado. Marcenaria sob medida inteligente para áreas de serviço em Osasco.',
    contextoLocal: {
      titulo: 'Organização inteligente para lavanderias em Osasco',
      p1: 'Em sobrados e apartamentos de Osasco, a lavanderia costuma ser estreita, compartilhando espaço com a cozinha ou com o corredor lateral de entrada. Produtos de limpeza, vassouras, baldes e tábua de passar acabam ficando à mostra por falta de armários adequados.',
      p2: 'Criamos armários verticais do chão ao teto para vassouras e escadas, módulos sobrepostos para lavadoras e secadoras e bancadas de pedra com tanque esculpido e gabinete embutido.'
    },
    especificidades: [
      { titulo: 'Tulha aramada para roupas sujas', texto: 'Gaveta basculante com cesto aramado que esconde as roupas sujas da vista.' },
      { titulo: 'Armário vassoureiro vertical', texto: 'Vão alto e estreito sob medida para vassouras, rodos, tábua de passar e aspirador.' },
      { titulo: 'Bancada contínua com a cozinha', texto: 'Em plantas integradas, a mesma pedra e acabamento de armário une cozinha e serviço harmoniosamente.' }
    ],
    n2Links: [
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Soluções para cozinhas conjugadas' },
      { slug: 'banheiro-planejado-osasco', nome: 'Banheiro planejado em Osasco', desc: 'Marcenaria resistente à umidade' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno', desc: 'Aproveitamento de espaços integrados' }
    ],
    faq: [
      { q: 'Dá para embutir a máquina lava e seca sob a bancada?', a: 'Sim, deixamos o vão com folga de 2 a 3 cm nas laterais e no topo para evitar que a vibração da centrifugação atinja a marcenaria.' },
      { q: 'Como esconder o botijão de gás ou o aquecedor?', a: 'Projetamos armários ventilados com venezianas ou ripados que cumprem as exigências de segurança da Comgás e das normas técnicas.' },
      { q: 'Vocês utilizam material resistente à água na lavanderia?', a: 'Sim, a base sob o tanque é confeccionada com MDF hidrófugo resistente a respingos d\'água.' }
    ]
  },

  // ==========================================
  // HOME OFFICE & COMERCIAL
  // ==========================================
  {
    slug: 'home-office-planejado-osasco',
    tipo: 'n1',
    pilarNacional: 'escritorio-home-office',
    pilarNacionalNome: 'Home office e escritórios',
    title: 'Home Office Planejado em Osasco | Bancadas Sob Medida',
    desc: 'Home office planejado em Osasco. Bancadas ergonômicas, gaveteiros organizadores, estantes para livros e marcenaria sob medida para trabalho remoto produtivo.',
    h1: 'Home office planejado em Osasco',
    eyebrow: 'Ambientes planejados em Osasco',
    lead: 'Trabalhe com conforto, postura correta e concentração. Projetamos estações de trabalho e estudos sob medida para casas e apartamentos em Osasco.',
    contextoLocal: {
      titulo: 'Trabalho híbrido e produtividade em Osasco',
      p1: 'Com a presença de importantes polos de serviços, tecnologia e varejo em Osasco e a fácil conexão com os centros empresariais de Alphaville e da capital, milhares de moradores adotaram o trabalho remoto ou híbrido.',
      p2: 'Projetar um home office sob medida permite aproveitar um quarto exclusivo ou transformar um canto ocioso da sala ou do dormitório em um posto de trabalho ergonômico, com altura correta da bancada (74 a 76 cm) e tomadas acessíveis.'
    },
    especificidades: [
      { titulo: 'Ergonomia milimétrica', texto: 'Profundidade da bancada adequada para monitores duplos e espaço confortável para os braços e pernas.' },
      { titulo: 'Calhas e tomadas embutidas', texto: 'Passa-cabos e caixas de conectividade integradas no tampo para manter a mesa limpa e livre de fios.' },
      { titulo: 'Estantes e gavetas com chave', texto: 'Armazenamento seguro de contratos, livros e equipamentos eletrônicos com corrediças reforçadas.' }
    ],
    n2Links: [
      { slug: 'home-office-compacto-planejado-osasco', nome: 'Home office compacto em Osasco', desc: 'Soluções para espaços reduzidos' },
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Integração de escritório com sala' },
      { slug: 'marcenaria-comercial-osasco', nome: 'Marcenaria comercial em Osasco', desc: 'Escritórios corporativos e clínicas' }
    ],
    faq: [
      { q: 'Dá para montar um home office funcional dentro de um quarto de casal?', a: 'Sim. Criamos bancadas compactas que funcionam como mesa de trabalho de dia e penteadeira ou apoio à noite, sem conflito de espaço.' },
      { q: 'Qual a profundidade ideal de uma bancada para trabalhar com dois monitores?', a: 'Recomendamos entre 55 cm e 65 cm para manter distância visual saudável e espaço para teclado e mouse.' },
      { q: 'Vocês produzem estantes com iluminação embutida?', a: 'Sim, estantes e nichos aéreos podem receber perfis de LED direcionados para iluminar a mesa sem causar reflexo na tela.' }
    ]
  },
  {
    slug: 'home-office-compacto-planejado-osasco',
    tipo: 'n2',
    pilarNacional: 'escritorio-home-office',
    pilarNacionalNome: 'Home office e escritórios',
    categoriaLocalSlug: 'home-office-planejado-osasco',
    categoriaLocalNome: 'Home office planejado em Osasco',
    title: 'Home Office Compacto Planejado em Osasco | Bancadas',
    desc: 'Home office compacto sob medida em Osasco. Soluções para cantos de sala, quartos ou varandas. Mesas ergonômicas e prateleiras para trabalho remoto.',
    h1: 'Home office compacto planejado em Osasco',
    eyebrow: 'Escritórios compactos · Osasco',
    lead: 'Mesmo com pouco espaço, é possível trabalhar com dignidade, postura ergonômica e foco. Crie seu cantinho de trabalho sob medida em Osasco.',
    contextoLocal: {
      titulo: 'Trabalho eficiente em pequenos espaços em Osasco',
      p1: 'Em imóveis compactos nos bairros Centro, Vila Yara ou Vila Osasco, reservar um cômodo inteiro para escritório nem sempre é uma opção. A solução é transformar cantos subutilizados na sala de jantar, no quarto de hóspedes ou na varanda fechada em uma estação de trabalho produtiva.',
      p2: 'Projetamos bancadas com passa-fios, gaveteiros móveis que cabem sob a mesa e prateleiras aéreas para livros e impressora, integrando os acabamentos da marcenaria ao restante da decoração do ambiente.'
    },
    especificidades: [
      { titulo: 'Bancadas de 90 cm a 120 cm', texto: 'Dimensões compactas que acomodam notebook, monitor externo e luminária sem sufocar o cômodo.' },
      { titulo: 'Painel passa-cabos', texto: 'Esconde adaptadores, nobreaks e réguas de tomada atrás da marcenaria sob medida.' },
      { titulo: 'Módulos suspensos', texto: 'Prateleiras e nichos na parede que aproveitam a altura vertical livre acima da mesa.' }
    ],
    n2Links: [
      { slug: 'home-office-planejado-osasco', nome: 'Home office em Osasco', desc: 'Escritórios completos e executivos' },
      { slug: 'sala-planejada-osasco', nome: 'Sala planejada em Osasco', desc: 'Integração perfeita com o estar' },
      { slug: 'moveis-planejados-apartamento-pequeno-osasco', nome: 'Apartamento pequeno', desc: 'Soluções para studios e 1 dorm' }
    ],
    faq: [
      { q: 'Qual o espaço mínimo para ter um home office confortável?', a: 'Uma bancada de 90 cm de largura por 50 cm de profundidade já é suficiente para trabalhar com notebook e cadeira ergonômica.' },
      { q: 'Dá para integrar a escrivaninha ao painel de TV da sala?', a: 'Sim, essa continuidade visual é muito elegante e faz a sala parecer mais espaçosa.' },
      { q: 'Vocês atendem finais de semana para instalação?', a: 'Agendamos a instalação de acordo com a sua conveniência e as regras de condomínio vigentes no seu prédio em Osasco.' }
    ]
  },
  {
    slug: 'marcenaria-comercial-osasco',
    tipo: 'n1',
    pilarNacional: 'para-empresas',
    pilarNacionalNome: 'Espaços comerciais',
    title: 'Marcenaria Comercial em Osasco | Lojas e Escritórios',
    desc: 'Marcenaria comercial sob medida em Osasco. Balcões de atendimento, expositores para lojas, clínicas médicas e escritórios corporativos com alta durabilidade.',
    h1: 'Marcenaria comercial em Osasco',
    eyebrow: 'Espaços comerciais em Osasco',
    lead: 'Móveis corporativos e comerciais desenhados para o fluxo intenso e a identidade da sua marca. Atendemos comércios, clínicas, consultórios e escritórios em Osasco.',
    contextoLocal: {
      titulo: 'Força comercial e empresarial de Osasco',
      p1: 'Osasco sedia gigantes do comércio eletrônico, bancos, shopping centers de grande circulação (como União e SuperShopping) e um dos comércios de rua mais movimentados do estado, no calçadão da Rua Antônio Agú e Avenida dos Autonomistas.',
      p2: 'Nesse ambiente dinâmico, estabelecimentos precisam de balcões resistentes a impactos, vitrines com iluminação focada, painéis de boas-vindas com logotipo em destaque e marcenaria montada com pontualidade para não atrasar a inauguração.'
    },
    especificidades: [
      { titulo: 'Resistência para alto tráfego', texto: 'Bordas em PVC rígido de 2mm e tampos laminados de alta pressão (fórmica) resistentes a riscos e desinfetantes.' },
      { titulo: 'Identidade visual e logotipo', texto: 'Painéis fresados, retroiluminação LED e marcenaria sob medida alinhada ao manual de marca da sua empresa.' },
      { titulo: 'Montagem ágil e noturna', texto: 'Planejamento para montagem em horários especiais em shoppings e centros comerciais com regras estritas.' }
    ],
    n2Links: [
      { slug: 'loja-planejada-osasco', nome: 'Loja planejada em Osasco', desc: 'Expositores e balcões de atendimento' },
      { slug: 'home-office-planejado-osasco', nome: 'Home office em Osasco', desc: 'Escritórios residenciais e executivos' },
      { slug: 'sala-planejada-osasco', nome: 'Sala e recepção em Osasco', desc: 'Salas de espera e recepções elegantes' }
    ],
    faq: [
      { q: 'Vocês atendem lojas dentro dos shoppings de Osasco?', a: 'Sim. Temos equipe capacitada para seguir as normas de segurança, ART e horários noturnos exigidos pela administração dos shoppings.' },
      { q: 'Fazem balcão de recepção acessível para cadeirantes?', a: 'Sim, desenhamos balcões em conformidade com as normas de acessibilidade ABNT NBR 9050, com rebaixo adequado.' },
      { q: 'Qual a garantia dos móveis para uso comercial?', a: 'Os contratos especificam a garantia técnica contra defeitos de fabricação e montagem de ferragens industriais.' }
    ]
  },
  {
    slug: 'loja-planejada-osasco',
    tipo: 'n2',
    pilarNacional: 'para-empresas',
    pilarNacionalNome: 'Espaços comerciais',
    categoriaLocalSlug: 'marcenaria-comercial-osasco',
    categoriaLocalNome: 'Marcenaria comercial em Osasco',
    title: 'Loja Planejada em Osasco | Balcões e Expositores Sob Medida',
    desc: 'Marcenaria para lojas e comércios em Osasco. Balcões de atendimento, vitrines, painéis canaletados, provadores e expositores de produtos sob medida.',
    h1: 'Loja planejada em Osasco',
    eyebrow: 'Comércio sob medida · Osasco',
    lead: 'Ambientes comerciais desenhados para vender mais. Expositores que valorizam seus produtos, balcões de atendimento funcionais e provadores confortáveis em Osasco.',
    contextoLocal: {
      titulo: 'Marcenaria de alto impacto para o varejo de Osasco',
      p1: 'O comércio varejista de Osasco é um dos mais fortes de São Paulo, abrangendo shoppings de grande porte, galerias comerciais e lojas de rua nos principais eixos da cidade. Em um ponto comercial, a apresentação visual e a durabilidade da mobília definem a percepção de valor do cliente.',
      p2: 'Produzimos balcões com passa-cabos para terminais de pagamento, expositores modulares com iluminação de destaque e prateleiras ajustáveis que facilitam a mudança periódica de vitrines e promoções.'
    },
    especificidades: [
      { titulo: 'Laminados de alta resistência', texto: 'Revestimentos impermeáveis e duráveis que resistem ao atrito diário de sacolas, bolsas e produtos.' },
      { titulo: 'Gaveteiros com fechamento seguro', texto: 'Gavetas de caixa e estoque com fechaduras e corrediças industriais de alta ciclagem.' },
      { titulo: 'Vitrines com perfis de LED', texto: 'Luz neutra ou focada que não esquenta as mercadorias e realça as cores reais dos produtos.' }
    ],
    n2Links: [
      { slug: 'marcenaria-comercial-osasco', nome: 'Marcenaria comercial em Osasco', desc: 'Soluções para empresas e clínicas' },
      { slug: 'home-office-planejado-osasco', nome: 'Home office em Osasco', desc: 'Bancadas e escritórios executivos' },
      { slug: 'sala-planejada-osasco', nome: 'Recepções e salas em Osasco', desc: 'Salas de espera acolhedoras' }
    ],
    faq: [
      { q: 'Vocês cumprem os horários noturnos de montagem em shoppings de Osasco?', a: 'Sim, nossa equipe atua com toda a documentação, EPIs e respeitando rigorosamente a janela de trabalho dos shoppings e galerias.' },
      { q: 'Fazem balcão caixa com espaço para computador e impressora fiscal?', a: 'Sim, todos os nichos técnicos, passagens de fiação e gaveta com chave são desenhados para a rotina do operador de caixa.' },
      { q: 'Qual o prazo médio para fabricar os móveis de uma loja?', a: 'O prazo é acordado no cronograma inicial para coincidir perfeitamente com a data planejada para a inauguração.' }
    ]
  },

  // ==========================================
  // POR TIPO DE IMÓVEL
  // ==========================================
  {
    slug: 'moveis-planejados-apartamento-pequeno-osasco',
    tipo: 'n2',
    pilarNacional: 'para-seu-imovel',
    pilarNacionalNome: 'Por tipo de imóvel',
    categoriaLocalSlug: 'cozinha-planejada-osasco',
    categoriaLocalNome: 'Cozinha planejada em Osasco',
    title: 'Móveis para Apartamento Pequeno em Osasco | Sob Medida',
    desc: 'Móveis planejados para apartamentos pequenos em Osasco de 35m² a 60m². Ambientes integrados, marcenaria inteligente, armários multifuncionais.',
    h1: 'Móveis planejados para apartamento pequeno em Osasco',
    eyebrow: 'Apartamentos compactos · Osasco',
    lead: 'Apartamentos de 35m², 45m² e 55m² exigem soluções onde cada centímetro cumpre mais de uma função. Marcenaria sob medida que amplia e organiza seu apartamento em Osasco.',
    contextoLocal: {
      titulo: 'A nova onda de apartamentos compactos em Osasco',
      p1: 'Osasco viu um grande crescimento de torres residenciais compactas nos últimos anos, especialmente próximas à Linha 8-Diamante e Linha 9-Esmeralda. Nesses imóveis, a sala divide espaço com a cozinha americana, e o quarto precisa equilibrar cama e roupeiro.',
      p2: 'Com marcenaria sob medida integrada, usamos tons neutros com detalhes amadeirados que criam continuidade visual de ponta a ponta, além de peças de dupla função como bancadas que servem de mesa e área de preparo simultaneamente.'
    },
    especificidades: [
      { titulo: 'Móveis multifuncionais', texto: 'Bancadas de refeição com armários inferiores e portas de correr que economizam área de circulação.' },
      { titulo: 'Continuidade de acabamentos', texto: 'Mesma paleta de MDF na sala, cozinha e lavanderia para causar sensação visual de um espaço muito maior.' },
      { titulo: 'Portas de espelho', texto: 'Armários com portas espelhadas que duplicam a luminosidade natural que entra pelas sacadas.' }
    ],
    n2Links: [
      { slug: 'cozinha-pequena-planejada-osasco', nome: 'Cozinha pequena em Osasco', desc: 'Soluções para cozinhas de apartamento' },
      { slug: 'guarda-roupa-planejado-osasco', nome: 'Guarda-roupa planejado em Osasco', desc: 'Roupeiros até o teto para quartos compactos' },
      { slug: 'painel-de-tv-planejado-osasco', nome: 'Painel de TV em Osasco', desc: 'Painéis finos que não roubam espaço' }
    ],
    faq: [
      { q: 'Qual a vantagem do planejado sobre móveis comprados prontos para studio?', a: 'Móveis prontos criam buracos de 10 a 20 cm em cada canto, desperdiçando o espaço mais caro do seu imóvel. O planejado preenche cada milímetro.' },
      { q: 'Vocês fazem projeto para apartamento na planta em Osasco?', a: 'Sim, desenvolvemos todo o estudo 3D com base na planta da construtora para que a marcenaria seja fabricada assim que as chaves forem entregues.' },
      { q: 'Quanto tempo demora a montagem completa em um apartamento pequeno?', a: 'Geralmente entre 3 e 5 dias úteis, com equipe organizada para minimizar poeira e impacto no condomínio.' }
    ]
  }
];

// Função geradora de HTML para páginas de Osasco
function generateHtml(page) {
  const isN1 = page.tipo === 'n1';
  
  // Breadcrumb Schema
  const breadcrumbItems = [
    { position: 1, name: 'Início', item: 'https://SEU-DOMINIO/' },
    { position: 2, name: 'Osasco', item: 'https://SEU-DOMINIO/osasco/' }
  ];
  
  if (!isN1) {
    breadcrumbItems.push({
      position: 3,
      name: page.categoriaLocalNome,
      item: `https://SEU-DOMINIO/${page.categoriaLocalSlug}/`
    });
    breadcrumbItems.push({
      position: 4,
      name: page.h1,
      item: `https://SEU-DOMINIO/${page.slug}/`
    });
  } else {
    breadcrumbItems.push({
      position: 3,
      name: page.h1,
      item: `https://SEU-DOMINIO/${page.slug}/`
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': `${page.h1}`,
        'description': page.desc,
        'serviceType': 'Móveis Planejados',
        'provider': {
          '@id': 'https://SEU-DOMINIO/#organizacao'
        },
        'areaServed': {
          '@type': 'City',
          'name': 'Osasco',
          'containedInPlace': {
            '@type': 'State',
            'name': 'São Paulo',
            'addressRegion': 'SP'
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems.map(b => ({
          '@type': 'ListItem',
          'position': b.position,
          'name': b.name,
          'item': b.item
        }))
      },
      {
        '@type': 'FAQPage',
        'mainEntity': page.faq.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      }
    ]
  };

  // Breadcrumbs HTML
  let breadcrumbHtml = `
      <ol>
        <li><a href="../">Início</a></li>
        <li><a href="../osasco/">Osasco</a></li>`;
  if (!isN1) {
    breadcrumbHtml += `
        <li><a href="../${page.categoriaLocalSlug}/">${page.categoriaLocalNome}</a></li>
        <li><span aria-current="page">${page.h1}</span></li>`;
  } else {
    breadcrumbHtml += `
        <li><span aria-current="page">${page.h1}</span></li>`;
  }
  breadcrumbHtml += `
      </ol>`;

  // Especificidades HTML
  const especificidadesHtml = page.especificidades.map(esp => `
          <div class="lp-compare__col" style="background:var(--c-surface);padding:var(--sp-6);border-radius:var(--r-md)">
            <h3 style="font-size:var(--fs-4);margin-bottom:var(--sp-2);color:var(--c-brand)">${esp.titulo}</h3>
            <p style="color:var(--c-text-2);font-size:var(--fs-2);line-height:1.6">${esp.texto}</p>
          </div>
  `).join('');

  // Links irmãos em Osasco
  const n2LinksHtml = page.n2Links.map(link => `
          <li><a href="../${link.slug}/"><span><b>${link.nome}</b><span>${link.desc}</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
  `).join('');

  // FAQ HTML
  const faqHtml = page.faq.map(f => `
          <details class="faq__item">
            <summary><span class="faq__q">${f.q}</span><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-plus"/></svg></summary>
            <div class="faq__answer"><p>${f.a}</p></div>
          </details>
  `).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}">
  <!-- Regra da estratégia: sem projetos locais entregues ainda, manter em noindex para preparação técnica -->
  <meta name="robots" content="noindex, follow, max-image-preview:large">
  <meta name="theme-color" content="#0A2A31">
  <meta name="color-scheme" content="light">

  <link rel="canonical" href="https://SEU-DOMINIO/${page.slug}/">

  <!-- GTM: cole aqui o snippet do Google Tag Manager (head) -->
  <script>document.documentElement.classList.add("js");window.dataLayer=window.dataLayer||[];</script>

  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="MarcenariaSP">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.desc}">

  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="../assets/fonts/dm-serif-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/css/styles.css">
  <link rel="stylesheet" href="../assets/css/lp.css">
  <script src="../assets/js/nav.js" defer></script>
  <script src="../assets/js/lp.js" defer></script>

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>

<body>
  <!-- GTM: cole aqui o snippet noscript do Google Tag Manager (body) -->
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <svg class="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <symbol id="i-ruler" viewBox="0 0 24 24"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/> <path d="m14.5 12.5 2-2"/> <path d="m11.5 9.5 2-2"/> <path d="m8.5 6.5 2-2"/> <path d="m17.5 15.5 2-2"/></symbol>
    <symbol id="i-layout-grid" viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/> <rect width="7" height="7" x="14" y="3" rx="1"/> <rect width="7" height="7" x="14" y="14" rx="1"/> <rect width="7" height="7" x="3" y="14" rx="1"/></symbol>
    <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></symbol>
    <symbol id="i-sliders-horizontal" viewBox="0 0 24 24"><path d="M10 5H3"/> <path d="M12 19H3"/> <path d="M14 3v4"/> <path d="M16 17v4"/> <path d="M21 12h-9"/> <path d="M21 19h-5"/> <path d="M21 5h-7"/> <path d="M8 10v4"/> <path d="M8 12H3"/></symbol>
    <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14"/> <path d="m12 5 7 7-7 7"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 5h16"/> <path d="M4 12h16"/> <path d="M4 19h16"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"/> <path d="m6 6 12 12"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M5 12h14"/> <path d="M12 5v14"/></symbol>
    <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/> <circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
  </svg>

  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="../">
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
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../cozinhas/">Cozinhas planejadas</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../dormitorios-e-closets/">Dormitórios e closets</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../salas/">Salas e painéis</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../escritorio-home-office/">Home office e escritórios</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../lavanderias/">Lavanderias</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../banheiros/">Banheiros e lavabos</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../varanda-e-area-gourmet/">Varandas e áreas gourmet</a></li>
                  <li class="site-nav__branch"><a class="site-nav__sublink site-nav__branch-link" href="../para-empresas/">Espaços comerciais</a></li>
                </ul>
                <a class="site-nav__all" href="../ambientes/">Ver todos os ambientes <svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
              </div>
            </div>
          </li>
          <li><a class="site-nav__link" href="../onde-atendemos/">Onde atendemos</a></li>
          <li><a class="site-nav__link" href="../sobre/">Sobre</a></li>
          <li><a class="site-nav__link" href="../como-funciona/">Como funciona</a></li>
          <li><a class="site-nav__link" href="../contato/">Contato</a></li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--primary btn--sm" data-track="header" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20${encodeURIComponent(page.h1)}%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer">
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

    <!-- 1. Hero do serviço local -->
    <section class="section" id="inicio" aria-labelledby="capa-titulo" style="background:var(--c-tint)">
      <div class="container">
        <header class="section-head" data-reveal style="max-width:68ch">
          <p class="eyebrow">${page.eyebrow}</p>
          <h1 id="capa-titulo">${page.h1}</h1>
          <p style="margin-top:var(--sp-5);color:var(--c-text-2);font-size:var(--fs-5)">${page.lead}</p>
          <p style="margin-top:var(--sp-6)">
            <a class="btn btn--primary" href="#contato" data-track="capa">Solicitar projeto em Osasco<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </p>
        </header>
      </div>
    </section>

    <!-- 2. Contexto local único (Demografia + Desafios reais) -->
    <section class="section" id="contexto" aria-labelledby="contexto-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Realidade de Osasco</p>
            <h2 id="contexto-titulo">${page.contextoLocal.titulo}</h2>
          </div>
          <div class="section-head__aside">
            <p>Com 728 mil habitantes e 73,7% das moradias em casas (Censo IBGE 2022), projetar em Osasco exige soluções sob medida adaptadas a cada tipo de planta.</p>
          </div>
        </header>
        <div style="max-width:72ch;color:var(--c-text-2);font-size:var(--fs-4);line-height:1.7" data-reveal>
          <p style="margin-bottom:var(--sp-4)">${page.contextoLocal.p1}</p>
          <p>${page.contextoLocal.p2}</p>
        </div>
      </div>
    </section>

    <!-- 3. Especificidades técnicas do serviço -->
    <section class="section" id="solucoes" aria-labelledby="solucoes-titulo" style="background:var(--c-tint)">
      <div class="container">
        <header class="section-head" data-reveal>
          <p class="eyebrow">Diferenciais do projeto</p>
          <h2 id="solucoes-titulo">O que muda no projeto sob medida em Osasco</h2>
        </header>
        <div class="lp-compare" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--sp-6)" data-reveal>
          ${especificidadesHtml}
        </div>
      </div>
    </section>

    <!-- 4. Como funciona o processo (versão abreviada em 3 etapas) -->
    <section class="section" id="como-funciona" aria-labelledby="etapas-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Processo transparente</p>
            <h2 id="etapas-titulo">Como funciona do primeiro contato à montagem</h2>
          </div>
          <div class="section-head__aside">
            <p>Atendimento direto e sem burocracia para sua obra ou reforma em Osasco.</p>
          </div>
        </header>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:var(--sp-6)" data-reveal>
          <div style="background:var(--c-surface);padding:var(--sp-6);border-radius:var(--r-md)">
            <p style="font-weight:700;color:var(--c-brand);margin-bottom:var(--sp-2)">01 · Conversa e Estudo 3D</p>
            <p style="color:var(--c-text-2);font-size:var(--fs-2)">Você nos conta seu ambiente pelo WhatsApp com fotos ou planta preliminar. Criamos a primeira proposta sem custo.</p>
          </div>
          <div style="background:var(--c-surface);padding:var(--sp-6);border-radius:var(--r-md)">
            <p style="font-weight:700;color:var(--c-brand);margin-bottom:var(--sp-2)">02 · Medição Técnica</p>
            <p style="color:var(--c-text-2);font-size:var(--fs-2)">Visita presencial no seu imóvel em Osasco para checar esquadro, prumadas, pontos de água, gás e elétrica no milímetro.</p>
          </div>
          <div style="background:var(--c-surface);padding:var(--sp-6);border-radius:var(--r-md)">
            <p style="font-weight:700;color:var(--c-brand);margin-bottom:var(--sp-2)">03 · Fabricação e Montagem</p>
            <p style="color:var(--c-text-2);font-size:var(--fs-2)">Prazo em dias úteis fixado em contrato formal. Montadores experientes com limpeza e ajuste fino dos módulos.</p>
          </div>
        </div>
        <p style="margin-top:var(--sp-6);font-size:var(--fs-2);color:var(--c-text-muted)">Para entender o detalhamento das garantias e termos, consulte nosso <a href="../como-funciona/">guia completo de etapas</a> e a página pilar de <a href="../${page.pilarNacional}/">${page.pilarNacionalNome}</a>.</p>
      </div>
    </section>

    <!-- 5. Ambientes relacionados em Osasco (Links irmãos) -->
    <section class="section" id="relacionados" aria-labelledby="relacionados-titulo" style="background:var(--c-surface)">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Navegação local</p>
            <h2 id="relacionados-titulo">Soluções relacionadas em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Veja outras categorias e projetos desenhados para residências e comércios da cidade.</p>
          </div>
        </header>
        <ul class="lp-siblings" data-reveal>
          ${n2LinksHtml}
          <li><a href="../osasco/"><span><b>Página principal de Osasco</b><span>Perfil demográfico, logística e bairros atendidos</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>
      </div>
    </section>

    <!-- 6. FAQ específico -->
    <section class="section" id="faq" aria-labelledby="faq-titulo" style="background:var(--c-tint)">
      <div class="container faq__grid">
        <div class="faq__intro" data-reveal>
          <p class="eyebrow">Dúvidas comuns</p>
          <h2 id="faq-titulo">Perguntas sobre ${page.h1.toLowerCase()}</h2>
          <p>Se tiver alguma dúvida sobre acesso, materiais ou prazos no seu bairro, fale conosco pelo WhatsApp.</p>
          <a class="btn btn--secondary btn-wa" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20${encodeURIComponent(page.h1)}%20em%20Osasco." target="_blank" rel="noopener noreferrer" data-track="faq-whatsapp"><svg class="icon btn__wa" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>Falar no WhatsApp</a>
        </div>
        <div class="faq__list">
          ${faqHtml}
        </div>
      </div>
    </section>

    <!-- 7. Chamada final com formulário transacional -->
    <section class="lp-final" id="contato" aria-labelledby="final-titulo">
      <div class="container lp-final__grid">
        <div data-reveal>
          <p class="eyebrow eyebrow--inverse">Vamos planejar?</p>
          <h2 id="final-titulo">Solicite seu projeto sob medida em Osasco</h2>
          <p class="lp-final__lead">Conte o bairro, o tipo de imóvel e o que você precisa. Atendemos Osasco com projeto 3D, medição técnica, contrato formal e prazo por escrito antes de pagar.</p>
          <p class="lp-area">Atendemos Osasco e toda a Grande São Paulo com equipe própria de instalação.</p>
          <div class="lp-final__alt"><a class="btn btn--outline-light btn-wa" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20${encodeURIComponent(page.h1)}%20e%20quero%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer" data-track="final-whatsapp"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>Prefiro falar no WhatsApp</a></div>
        </div>

        <form class="lead-form lp-form" id="orcamento-osasco" data-lead="orcamento-osasco" data-hides-sticky data-page="${page.slug}" data-lead-type="projeto_3d" action="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL" method="get" target="_blank" rel="noopener noreferrer" data-msg-intro="Olá! Vim pela página de ${page.h1} e gostaria de solicitar um orçamento para meu imóvel em Osasco.">
          <input type="hidden" name="text" value="Olá! Vim pela página de ${page.h1} e gostaria de solicitar um orçamento para meu imóvel em Osasco.">
          <input type="hidden" name="utm_source" value="">
          <input type="hidden" name="utm_medium" value="">
          <input type="hidden" name="utm_campaign" value="">
          <input type="hidden" name="utm_term" value="">
          <input type="hidden" name="utm_content" value="">
          <input type="hidden" name="gclid" value="">
          <input type="hidden" name="gbraid" value="">
          <input type="hidden" name="wbraid" value="">
          <p class="lp-form__title">Receba seu orçamento em Osasco</p>
          <p class="lead-form__intro">Três campos rápidos e continuamos a conversa pelo WhatsApp.</p>
          <div class="lead-form__fields">
            <div class="field">
              <label for="lead-nome">Seu nome</label>
              <input id="lead-nome" type="text" autocomplete="name" required data-field data-msg-label="Nome">
              <p class="field__error" id="lead-nome-erro" hidden>Informe seu nome.</p>
            </div>
            <div class="field">
              <label for="lead-telefone">WhatsApp com DDD</label>
              <input id="lead-telefone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 99999-9999" minlength="10" pattern="[0-9\\s\\(\\)\\+\\-]{10,20}" required data-field data-msg-label="WhatsApp">
              <p class="field__error" id="lead-telefone-erro" hidden>Informe seu WhatsApp com DDD.</p>
            </div>
            <div class="field">
              <label for="lead-imovel">Qual é o seu imóvel?</label>
              <select id="lead-imovel" required data-field data-msg-label="Imóvel">
                <option value="" selected disabled>Selecione</option>
                <option value="Apartamento em Osasco">Apartamento em Osasco</option>
                <option value="Casa ou Sobrado em Osasco">Casa ou Sobrado em Osasco</option>
                <option value="Imóvel na planta / obra">Imóvel na planta / obra</option>
                <option value="Espaço comercial em Osasco">Espaço comercial em Osasco</option>
                <option value="Reforma de ambiente">Reforma de ambiente</option>
              </select>
              <p class="field__error" id="lead-imovel-erro" hidden>Escolha o tipo de imóvel.</p>
            </div>
          </div>
          <button class="btn btn--primary" type="submit" data-track="form-orcamento">
            Quero meu orçamento em Osasco
            <svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
          </button>
          <div role="status"><p class="lead-form__status" data-status hidden>Abrimos o WhatsApp em uma nova aba com a sua mensagem. Falta só confirmar o envio por lá.</p></div>
          <p class="lp-form__safe"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-lock"/></svg><span>Usamos seus dados só para falar do seu projeto. Sem spam. <a href="../politica-de-privacidade/">Como tratamos seus dados</a>.</span></p>
        </form>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <a class="brand" href="../">
            <svg class="brand__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="brand__mark-a" d="M0 0h16v8H8v8H0z"/><path class="brand__mark-b" d="M18 0h6v24H0v-6h10v-8h8z"/></svg>
            <span class="brand__name" translate="no">MarcenariaSP</span>
          </a>
          <p class="footer__about">Móveis planejados sob medida na capital, na Grande São Paulo e em Osasco. Intermediamos o contato entre você e marcenarias parceiras de alta qualidade técnica.</p>
        </div>

        <nav aria-labelledby="rodape-navegacao">
          <h2 class="footer__title" id="rodape-navegacao">Navegação</h2>
          <ul class="footer__list">
            <li><a href="../">Início</a></li>
            <li><a href="../osasco/">Página de Osasco</a></li>
            <li><a href="../ambientes/">Ambientes</a></li>
            <li><a href="../sobre/">Sobre a empresa</a></li>
            <li><a href="../como-funciona/">Como funciona</a></li>
            <li><a href="../contrato-e-garantia/">Contrato e garantia</a></li>
            <li><a href="../materiais-e-ferragens/">Materiais e ferragens</a></li>
            <li><a href="../onde-atendemos/">Onde atendemos</a></li>
            <li><a href="../contato/">Contato</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="rodape-ambientes">
          <h2 class="footer__title" id="rodape-ambientes">Ambientes em Osasco</h2>
          <ul class="footer__list">
            <li><a href="../cozinha-planejada-osasco/">Cozinhas em Osasco</a></li>
            <li><a href="../dormitorios-planejados-osasco/">Dormitórios em Osasco</a></li>
            <li><a href="../closet-planejado-osasco/">Closets em Osasco</a></li>
            <li><a href="../sala-planejada-osasco/">Salas em Osasco</a></li>
            <li><a href="../banheiro-planejado-osasco/">Banheiros em Osasco</a></li>
            <li><a href="../varanda-gourmet-planejada-osasco/">Varandas em Osasco</a></li>
            <li><a href="../lavanderia-planejada-osasco/">Lavanderias em Osasco</a></li>
            <li><a href="../home-office-planejado-osasco/">Home office em Osasco</a></li>
            <li><a href="../marcenaria-comercial-osasco/">Comercial em Osasco</a></li>
          </ul>
        </nav>

        <div>
          <h2 class="footer__title" id="rodape-contato">Contato</h2>
          <ul class="footer__list" aria-labelledby="rodape-contato">
            <li><a href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Acessei%20o%20site%20da%20MarcenariaSP%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto%20em%20Osasco." target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>Conversar pelo WhatsApp</a></li>
            <li><span class="footer__row"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Atendimento em Osasco e região</span></li>
          </ul>
        </div>
      </div>

      <p class="footer__legal" id="privacidade"><strong>Privacidade.</strong> Usamos seu nome, WhatsApp e tipo de imóvel apenas para responder sobre o seu projeto. Não vendemos nem compartilhamos seus dados. Para pedir a exclusão, é só nos avisar pelo WhatsApp. <a href="../politica-de-privacidade/">Ler a política de privacidade completa</a>.</p>
      <p class="footer__legal">© <span id="ano-atual">2026</span> <span translate="no">MarcenariaSP</span>. Todos os direitos reservados.</p>
    </div>
  </footer>

  <div class="lp-sticky" role="region" aria-label="Ações rápidas">
    <a class="btn btn--primary" href="#contato" data-track="sticky">Solicitar orçamento<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
    <a class="btn btn--wa" href="https://wa.me/WHATSAPP_NUMBER_INTERNATIONAL?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20${encodeURIComponent(page.h1)}%20e%20gostaria%20de%20conversar%20sobre%20o%20meu%20projeto." target="_blank" rel="noopener noreferrer" data-track="sticky-whatsapp" aria-label="Conversar pelo WhatsApp (abre em nova aba)"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg></a>
  </div>

</body>
</html>`;
}

// 1. Gerar todas as páginas
console.log(`Iniciando geração de ${pages.length} páginas para Osasco...`);

for (const p of pages) {
  const pageDir = path.join(ROOT, p.slug);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  const filePath = path.join(pageDir, 'index.html');
  const html = generateHtml(p);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Gerado: /${p.slug}/index.html`);
}

// 2. Atualizar /osasco/index.html com a seção de ambientes completa e categorizada
console.log('Atualizando /osasco/index.html com a seção de ambientes completa...');
const osascoPath = path.join(ROOT, 'osasco', 'index.html');
let osascoHtml = fs.readFileSync(osascoPath, 'utf8');

// Atualizar sumário se necessário
if (!osascoHtml.includes('#ambientes-osasco')) {
  osascoHtml = osascoHtml.replace(
    `<li><a href="#comecar"><span><b>Páginas que ajudam a decidir</b></span>`,
    `<li><a href="#ambientes-osasco"><span><b>Ambientes planejados em Osasco</b></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>\n          <li><a href="#comecar"><span><b>Páginas que ajudam a decidir</b></span>`
  );
}

// Seção completa de Ambientes Planejados em Osasco (agrupada por categorias com todos os links)
const novaSecaoAmbientes = `
    <!-- Seção Completa de Ambientes Planejados em Osasco (Estratégia Serviço x Localidade) -->
    <section class="section" id="ambientes-osasco" aria-labelledby="ambientes-osasco-titulo">
      <div class="container">
        <header class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">Soluções locais completas</p>
            <h2 id="ambientes-osasco-titulo">Ambientes planejados em Osasco</h2>
          </div>
          <div class="section-head__aside">
            <p>Conheça os projetos sob medida desenhados para cada cômodo do seu imóvel em Osasco — de casas e sobrados a apartamentos compactos e lojas.</p>
          </div>
        </header>

        <!-- Cozinhas -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Cozinhas planejadas</h3>
        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="../cozinha-planejada-osasco/"><span><b>Cozinhas planejadas em Osasco</b><span>Guia completo: armários até o teto, materiais e ergonomia</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../cozinha-pequena-planejada-osasco/"><span><b>Cozinha pequena em Osasco</b><span>Aproveitamento inteligente para cozinhas de 4 a 6 m²</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../cozinha-em-l-planejada-osasco/"><span><b>Cozinha em L em Osasco</b><span>Aproveitamento total do canto cego e bancadas contínuas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../cozinha-com-ilha-planejada-osasco/"><span><b>Cozinha com ilha em Osasco</b><span>Bancadas centrais integradas com cooktop e banquetas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../cozinha-americana-planejada-osasco/"><span><b>Cozinha americana em Osasco</b><span>Balcão funcional de integração entre cozinha e sala</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>

        <!-- Quartos & Guarda-Roupas -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Dormitórios, closets e armários</h3>
        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="../dormitorios-planejados-osasco/"><span><b>Dormitórios planejados em Osasco</b><span>Quartos completos sob medida para casal, solteiro e infantil</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../guarda-roupa-planejado-osasco/"><span><b>Guarda-roupa planejado em Osasco</b><span>Armários de piso a teto com portas de correr e gavetões</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../quarto-de-casal-planejado-osasco/"><span><b>Quarto de casal em Osasco</b><span>Cabeceiras com tomadas embutidas e criados suspensos</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../closet-planejado-osasco/"><span><b>Closet planejado em Osasco</b><span>Modelos abertos e fechados para suítes máster</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../closet-pequeno-planejado-osasco/"><span><b>Closet pequeno em Osasco</b><span>Otimização para quartos auxiliares e corredores</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>

        <!-- Salas & Painéis -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Salas e painéis de TV</h3>
        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="../sala-planejada-osasco/"><span><b>Salas planejadas em Osasco</b><span>Salas de estar e jantar com marcenaria integrada</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../painel-de-tv-planejado-osasco/"><span><b>Painel de TV planejado em Osasco</b><span>Painéis ripados com rack suspenso e fiação 100% oculta</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>

        <!-- Banheiros & Lavanderias -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Banheiros, lavabos e lavanderias</h3>
        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="../banheiro-planejado-osasco/"><span><b>Banheiros planejados em Osasco</b><span>Gabinetes e espelheiras em MDF resistente à umidade</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../gabinete-de-banheiro-planejado-osasco/"><span><b>Gabinete de banheiro em Osasco</b><span>Móveis sob medida com recorte para sifão e gavetões</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../lavanderia-planejada-osasco/"><span><b>Lavanderia planejada em Osasco</b><span>Módulos para lava e seca, tulhas e armários para vassouras</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>

        <!-- Varandas & Gourmet -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Varandas e áreas gourmet</h3>
        <ul class="lp-siblings" data-reveal style="margin-bottom:var(--sp-8)">
          <li><a href="../varanda-gourmet-planejada-osasco/"><span><b>Varanda gourmet planejada em Osasco</b><span>Bancadas sob churrasqueira com nichos para cervejeira</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../area-gourmet-planejada-osasco/"><span><b>Área gourmet em Osasco</b><span>Espaços completos de confraternização para casas e quintais</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>

        <!-- Home Office, Imóveis Compactos e Comercial -->
        <h3 style="font-size:var(--fs-4);color:var(--c-brand);margin:var(--sp-6) 0 var(--sp-3)">Home office, apartamentos pequenos e comércio</h3>
        <ul class="lp-siblings" data-reveal>
          <li><a href="../home-office-planejado-osasco/"><span><b>Home office planejado em Osasco</b><span>Bancadas ergonômicas para trabalho remoto produtivo</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../home-office-compacto-planejado-osasco/"><span><b>Home office compacto em Osasco</b><span>Cantinhos de trabalho para quartos ou salas integradas</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../moveis-planejados-apartamento-pequeno-osasco/"><span><b>Apartamento pequeno em Osasco</b><span>Soluções multifuncionais para plantas de 35 a 60 m²</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../marcenaria-comercial-osasco/"><span><b>Marcenaria comercial em Osasco</b><span>Balcões, escritórios corporativos e clínicas sob medida</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
          <li><a href="../loja-planejada-osasco/"><span><b>Loja planejada em Osasco</b><span>Vitrines com LED, expositores e balcões de caixa</span></span><svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>
        </ul>
      </div>
    </section>
`;

// Substituir a seção antiga pela nova seção enriquecida
if (osascoHtml.includes('id="ambientes-osasco"')) {
  // Regex para substituir a seção inteira existente
  osascoHtml = osascoHtml.replace(
    /<!-- Seção.*?Ambientes Planejados em Osasco.*?<\/section>/s,
    novaSecaoAmbientes.trim()
  );
} else {
  osascoHtml = osascoHtml.replace(
    `<section class="section" id="comecar"`,
    `${novaSecaoAmbientes}\n    <section class="section" id="comecar"`
  );
}

fs.writeFileSync(osascoPath, osascoHtml, 'utf8');
console.log('Seção de ambientes em /osasco/index.html atualizada com sucesso!');
