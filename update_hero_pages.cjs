const fs = require('fs');
const path = require('path');

// Image pool for random assignment
const IMAGES = [
    ["ambiente-cozinha.webp", "cozinha"],
    ["ambiente-sala.webp", "sala"],
    ["ambiente-home-office.webp", "escritório"],
    ["ambiente-closet.webp", "closet"],
    ["ambiente-banheiro.webp", "banheiro"],
    ["ambiente-lavanderia.webp", "lavanderia"],
    ["ambiente-varanda.webp", "varanda"],
    ["ambiente-comercial.webp", "comercial"],
];

// H1 templates by page type
const H1_TEMPLATES_DISTRITO = [
    "Móveis planejados em {local}",
    "Móveis sob medida em {local}",
    "Marcenaria sob medida em {local}",
    "Ambientes planejados em {local}",
    "Móveis personalizados em {local}",
    "Seu lar com móveis planejados em {local}",
    "Marcenaria personalizada em {local}",
    "Procurando móveis planejados em {local}?",
    "Projetos de móveis em {local}",
    "Soluções em móveis para {local}",
    "Conheça móveis planejados em {local}",
    "Descubra móveis sob medida em {local}",
];

const H1_TEMPLATES_BAIRRO = [
    "Móveis planejados em {local}",
    "Móveis sob medida em {local}",
    "Seu projeto de interiores em {local}",
    "Ambientes planejados em {local}",
    "Móveis sob medida para {local}",
    "Marcenaria personalizada para {local}",
    "Seu lar com móveis planejados em {local}",
    "Projetos sob medida em {local}",
    "Móveis planejados para {local}",
    "Conheça móveis planejados em {local}",
    "Procurando móveis planejados em {local}?",
];

function getPageType(content) {
    if (content.includes("Distrito de")) return "distrito";
    if (content.includes("Bairro de")) return "bairro";
    return "distrito";
}

function getDisplayName(folderName) {
    const specialCases = {
        'itaim-bibi': 'Itaim Bibi',
        'alto-de-pinheiros': 'Alto de Pinheiros',
        'alto-da-lapa': 'Alto da Lapa',
        'alto-de-santana': 'Alto de Santana',
        'campo-belo': 'Campo Belo',
        'campo-grande': 'Campo Grande',
        'campo-limpo': 'Campo Limpo',
        'capao-redondo': 'Capão Redondo',
        'casa-verde': 'Casa Verde',
        'chacara-klabin': 'Chácara Klabin',
        'cidade-ademar': 'Cidade Ademar',
        'cidade-dutra': 'Cidade Dutra',
        'cidade-lider': 'Cidade Líder',
        'cidade-tiradentes': 'Cidade Tiradentes',
        'freguesia-do-o': 'Freguesia do Ó',
        'jabaquara': 'Jabaquara',
        'jardim-america': 'Jardim América',
        'jardim-analia-franco': 'Jardim Anália Franco',
        'jardim-angela': 'Jardim Ângela',
        'jardim-europa': 'Jardim Europa',
        'jardim-helena': 'Jardim Helena',
        'jardim-marajoara': 'Jardim Marajoara',
        'jardim-paulista': 'Jardim Paulista',
        'jardim-paulistano': 'Jardim Paulistano',
        'jardim-sao-luis': 'Jardim São Luís',
        'jose-bonifacio': 'José Bonifácio',
        'moema': 'Moema',
        'morumbi': 'Morumbi',
        'pacaembu': 'Pacaembu',
        'panamby': 'Panamby',
        'penha': 'Penha',
        'perus': 'Perus',
        'pirituba': 'Pirituba',
        'raposo-tavares': 'Raposo Tavares',
        'rio-pequeno': 'Rio Pequeno',
        'sao-domingos': 'São Domingos',
        'sao-lucas': 'São Lucas',
        'sao-mateus': 'São Mateus',
        'sao-miguel': 'São Miguel',
        'sao-rafael': 'São Rafael',
        'sapopemba': 'Sapopemba',
        'santa-cecilia': 'Santa Cecília',
        'santo-amaro': 'Santo Amaro',
        'socorro': 'Socorro',
        'tatuape': 'Tatuapé',
        'tremembe': 'Tremembé',
        'tucuruvi': 'Tucuruvi',
        'vila-andrade': 'Vila Andrade',
        'vila-clementino': 'Vila Clementino',
        'vila-curuca': 'Vila Curuçá',
        'vila-formosa': 'Vila Formosa',
        'vila-guilherme': 'Vila Guilherme',
        'vila-jacui': 'Vila Jacuí',
        'vila-leopoldina': 'Vila Leopoldina',
        'vila-madalena': 'Vila Madalena',
        'vila-maria': 'Vila Maria',
        'vila-mariana': 'Vila Mariana',
        'vila-matilde': 'Vila Matilde',
        'vila-medeiros': 'Vila Medeiros',
        'vila-nova-conceicao': 'Vila Nova Conceição',
        'vila-olimpia': 'Vila Olímpia',
        'vila-pompeia': 'Vila Pompeia',
        'vila-prudente': 'Vila Prudente',
        'vila-sonia': 'Vila Sônia',
        'paraiso': 'Paraíso',
        'parelheiros': 'Parelheiros',
        'parque-do-carmo': 'Parque do Carmo',
        'barra-funda': 'Barra Funda',
        'belem': 'Belém',
        'bom-retiro': 'Bom Retiro',
        'cachoeirinha': 'Cachoeirinha',
        'cangaiba': 'Cangaíba',
        'carrao': 'Carrão',
        'cursino': 'Cursino',
        'ermelino-matarazzo': 'Ermelino Matarazzo',
        'guaianases': 'Guaianases',
        'higienopolis': 'Higienópolis',
        'iguatemi': 'Itaim Paulista',
        'ipiranga': 'Ipiranga',
        'itaim-paulista': 'Itaim Paulista',
        'itaquera': 'Itaquera',
        'jacana': 'Jacaná',
        'jaguara': 'Jaguara',
        'jaguare': 'Jaguara',
        'jaragua': 'Jaraguá',
        'lajeado': 'Lajeado',
        'liberdade': 'Liberdade',
        'mandaqui': 'Mandaqui',
        'marsilac': 'Marsilac',
        'mooca': 'Mooca',
        'perdizes': 'Perdizes',
        'pinheiros': 'Pinheiros',
        'ponte-rasa': 'Ponte Rasa',
        'republica': 'República',
        'saude': 'Saúde',
        'se': 'Sé',
        'sumare': 'Sumaré',
    };
    return specialCases[folderName] || folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function generateH1(local, pageType) {
    const templates = pageType === "bairro" ? H1_TEMPLATES_BAIRRO : H1_TEMPLATES_DISTRITO;
    const idx = hashString(local) % templates.length;
    return templates[idx].replace('{local}', local);
}

function getImageForPage(local) {
    const idx = hashString(local) % IMAGES.length;
    return IMAGES[idx];
}

function updatePage(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const folder = path.basename(path.dirname(filepath));
    const local = getDisplayName(folder);
    const pageType = getPageType(content);

    const newH1 = generateH1(local, pageType);
    const [imageFile, imageAltSuffix] = getImageForPage(local);

    const eyebrow = pageType === "bairro" ? "Bairro de São Paulo" : "Distrito de São Paulo";
    const altText = `Móveis planejados em ${local} para sua casa`;

    const leadText = pageType === "bairro"
        ? `${local} é um bairro de São Paulo. O projeto muda conforme o imóvel, o prédio e o acesso à obra.`
        : `${local} é um distrito de São Paulo. O projeto muda conforme o prédio, o acesso e o tipo de imóvel.`;

    // Old pattern - use string replacement instead of regex
    const oldStart = '<!-- Cabeçalho de texto. Sem foto: não há imagem honesta para estes assuntos. -->';
    const oldSectionStart = '<section class="section" id="inicio" aria-labelledby="capa-titulo" style="background:var(--c-tint)">';

    // Find the start and end positions
    const startIdx = content.indexOf(oldStart);
    if (startIdx === -1) {
        return false;
    }

    const sectionStartIdx = content.indexOf(oldSectionStart, startIdx);
    if (sectionStartIdx === -1) {
        return false;
    }

    // Find the closing </section> for this hero section
    let depth = 0;
    let endIdx = -1;
    for (let i = sectionStartIdx; i < content.length; i++) {
        if (content.startsWith('<section', i)) {
            depth++;
            i += 7;
        } else if (content.startsWith('</section>', i)) {
            depth--;
            if (depth === 0) {
                endIdx = i + 10; // include </section>
                break;
            }
            i += 9;
        }
    }

    if (endIdx === -1) {
        return false;
    }

    const newHero = `<!-- Cabeçalho com imagem de fundo aleatorizada -->
    <section class="lp-hero" id="inicio" aria-labelledby="capa-titulo">
      <img class="lp-hero__media" src="../../assets/img/${imageFile}" width="1672" height="941" alt="${altText}" fetchpriority="high" decoding="async">
      <div class="lp-hero__blur" aria-hidden="true"></div>
      <div class="lp-hero__scrim" aria-hidden="true"></div>
      <div class="container lp-hero__grid">
        <div class="lp-hero__text">
          <p class="eyebrow eyebrow--inverse">${eyebrow}</p>
          <h1 id="capa-titulo">${newH1}</h1>
          <p class="lp-hero__lead">${leadText}</p>
          <p style="margin-top:var(--sp-6)"><a class="btn btn--primary" href="#contato" data-track="capa">Quero meus móveis planejados em ${local}<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></p>
        </div>
      </div>
    </section>`;

    // Replace the section
    const newContent = content.substring(0, startIdx) + newHero + content.substring(endIdx);

    if (newContent === content) {
        console.log(`  ⚠️  Pattern not found in ${folder}`);
        return false;
    }

    fs.writeFileSync(filepath, newContent, 'utf-8');
    console.log(`  ✅ Updated ${folder}: H1='${newH1}' (${newH1.length} chars), Image=${imageFile}`);
    return true;
}

function main() {
    const baseDir = path.join(__dirname, 'sao-paulo');
    let updated = 0;
    let failed = 0;

    const folders = fs.readdirSync(baseDir).sort();

    for (const folder of folders) {
        const filepath = path.join(baseDir, folder, 'index.html');
        if (fs.existsSync(filepath)) {
            try {
                if (updatePage(filepath)) {
                    updated++;
                } else {
                    failed++;
                }
            } catch (e) {
                console.log(`  ❌ Error updating ${folder}: ${e.message}`);
                failed++;
            }
        }
    }

    console.log(`\nDone: ${updated} updated, ${failed} failed`);
}

main();