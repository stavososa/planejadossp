#!/usr/bin/env python3
"""
Script to update all district/bairro pages in sao-paulo/ to use the new lp-hero pattern
with background images and varied H1s following the specification.
"""

import os
import re

# Image pool for random assignment
IMAGES = [
    ("ambiente-cozinha.webp", "cozinha"),
    ("ambiente-sala.webp", "sala"),
    ("ambiente-home-office.webp", "escritório"),
    ("ambiente-closet.webp", "closet"),
    ("ambiente-banheiro.webp", "banheiro"),
    ("ambiente-lavanderia.webp", "lavanderia"),
    ("ambiente-varanda.webp", "varanda"),
    ("ambiente-comercial.webp", "comercial"),
]

# H1 templates by page type
H1_TEMPLATES_DISTRITO = [
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
]

H1_TEMPLATES_BAIRRO = [
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
]

# Page types - determine if district or bairro
DISTRITOS = {
    'aclimacao', 'agua-rasa', 'alto-da-lapa', 'alto-de-pinheiros', 'alto-de-santana',
    'anhanguera', 'aricanduva', 'artur-alvim', 'barra-funda', 'bela-alianca',
    'bela-vista', 'belem', 'bom-retiro', 'bras', 'brasilandia', 'butanta',
    'cachoeirinha', 'cambuci', 'campo-belo', 'campo-grande', 'campo-limpo',
    'cangaiba', 'capao-redondo', 'carrao', 'casa-verde', 'chacara-klabin',
    'cidade-ademar', 'cidade-dutra', 'cidade-lider', 'cidade-tiradentes',
    'consolacao', 'cursino', 'ermelino-matarazzo', 'freguesia-do-o', 'grajau',
    'guaianases', 'iguatemi', 'ipiranga', 'itaim-bibi', 'itaim-paulista',
    'itaquera', 'jabaquara', 'jacana', 'jaguara', 'jaguare', 'jaragua',
    'jardim-angela', 'jardim-helena', 'jardim-marajoara', 'jardim-paulista',
    'jardim-paulistano', 'jardim-sao-luis', 'jose-bonifacio', 'lajeado', 'lapa',
    'liberdade', 'limao', 'mandaqui', 'marsilac', 'moema', 'mooca', 'morumbi',
    'pacaembu', 'panamby', 'paraiso', 'parelheiros', 'pari', 'parque-do-carmo',
    'pedreira', 'penha', 'perdizes', 'perus', 'pinheiros', 'pirituba',
    'ponte-rasa', 'raposo-tavares', 'republica', 'rio-pequeno', 'sacoma',
    'santa-cecilia', 'santana', 'santo-amaro', 'sao-domingos', 'sao-lucas',
    'sao-mateus', 'sao-miguel', 'sao-rafael', 'sapopemba', 'saude', 'se',
    'socorro', 'sumare', 'tatuape', 'tremembe', 'tucuruvi', 'vila-andrade',
    'vila-clementino', 'vila-curuca', 'vila-formosa', 'vila-guilherme',
    'vila-jacui', 'vila-leopoldina', 'vila-maria', 'vila-mariana',
    'vila-matilde', 'vila-medeiros', 'vila-olimpia', 'vila-pompeia',
    'vila-prudente', 'vila-sonia'
}

BAIRROS = {
    'alto-da-lapa', 'alto-de-pinheiros', 'alto-de-santana', 'bela-alianca',
    'brooklin', 'chacara-klabin', 'higienopolis', 'jardim-america',
    'jardim-europa', 'jardim-marajoara', 'jardim-paulistano', 'panamby',
    'pacaembu', 'paraiso', 'vila-madalena', 'vila-nova-conceicao',
    'vila-olimpia', 'vila-pompeia'
}

# Actually some of these are both districts and bairros
# Let's use a different approach: check the content for "Distrito de" vs "Bairro de"

def get_page_type(content):
    """Determine if page is a district or bairro based on content"""
    if "Distrito de" in content:
        return "distrito"
    elif "Bairro de" in content:
        return "bairro"
    return "distrito"  # default

def get_display_name(folder_name):
    """Convert folder name to display name"""
    # Special cases
    special_cases = {
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
        'santa-cecilia': 'Santa Cecília',
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
        'jose-bonifacio': 'José Bonifácio',
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
    }
    return special_cases.get(folder_name, folder_name.replace('-', ' ').title())

def generate_h1(local, page_type):
    """Generate a varied H1 based on page type"""
    import random
    if page_type == "bairro":
        templates = H1_TEMPLATES_BAIRRO
    else:
        templates = H1_TEMPLATES_DISTRITO

    # Use hash of local for deterministic but varied selection
    idx = hash(local) % len(templates)
    return templates[idx].format(local=local)

def get_image_for_page(local):
    """Get an image for the page (deterministic based on local name)"""
    idx = hash(local) % len(IMAGES)
    return IMAGES[idx]

def update_page(filepath):
    """Update a single page"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get folder name
    folder = os.path.basename(os.path.dirname(filepath))
    local = get_display_name(folder)
    page_type = get_page_type(content)

    # Generate new H1
    new_h1 = generate_h1(local, page_type)

    # Get image
    image_file, image_alt_suffix = get_image_for_page(local)

    # Determine eyebrow text
    if page_type == "bairro":
        eyebrow = "Bairro de São Paulo"
    else:
        eyebrow = "Distrito de São Paulo"

    # Generate alt text for image
    alt_text = f"Móveis planejados em {local} para sua casa"

    # Generate lead text
    if page_type == "bairro":
        lead_text = f"{local} é um bairro de São Paulo. O projeto muda conforme o imóvel, o prédio e o acesso à obra."
    else:
        lead_text = f"{local} é um distrito de São Paulo. O projeto muda conforme o prédio, o acesso e o tipo de imóvel."

    # Old pattern to replace
    old_pattern = r'<!-- Cabeçalho de texto\. Sem foto: não há imagem honesta para estes assuntos\. -->\s*<section class="section" id="inicio" aria-labelledby="capa-titulo" style="background:var\(--c-tint\)">\s*<div class="container">\s*<header class="section-head" data-reveal style="max-width:58ch">\s*<p class="eyebrow">[^<]+</p>\s*<h1 id="capa-titulo">[^<]+</h1>\s*<p style="margin-top:var\(--sp-5\);color:var\(--c-text-2\);font-size:var\(--fs-5\)">[^<]+</p>\s*<p style="margin-top:var\(--sp-6\)"><a class="btn btn--primary" href="#contato" data-track="capa">[^<]+<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></p>\s*</header>\s*</div>\s*</section>'

    # New hero section
    new_hero = f'''<!-- Cabeçalho com imagem de fundo aleatorizada -->
    <section class="lp-hero" id="inicio" aria-labelledby="capa-titulo">
      <img class="lp-hero__media" src="../../assets/img/{image_file}" width="1672" height="941" alt="{alt_text}" fetchpriority="high" decoding="async">
      <div class="lp-hero__blur" aria-hidden="true"></div>
      <div class="lp-hero__scrim" aria-hidden="true"></div>
      <div class="container lp-hero__grid">
        <div class="lp-hero__text">
          <p class="eyebrow eyebrow--inverse">{eyebrow}</p>
          <h1 id="capa-titulo">{new_h1}</h1>
          <p class="lp-hero__lead">{lead_text}</p>
          <p style="margin-top:var(--sp-6)"><a class="btn btn--primary" href="#contato" data-track="capa">Quero meus móveis planejados em {local}<svg class="icon icon--arrow" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></p>
        </div>
      </div>
    </section>'''

    # Replace
    new_content = re.sub(old_pattern, new_hero, content, flags=re.DOTALL)

    if new_content == content:
        print(f"  ⚠️  Pattern not found in {filepath}")
        return False

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  ✅ Updated {folder}: H1='{new_h1}' ({len(new_h1)} chars), Image={image_file}")
    return True

def main():
    base_dir = r"C:\Users\Gustavo\orca\workspaces\planejadossp-repo\opaleye\sao-paulo"
    updated = 0
    failed = 0

    for folder in sorted(os.listdir(base_dir)):
        filepath = os.path.join(base_dir, folder, 'index.html')
        if os.path.isfile(filepath):
            try:
                if update_page(filepath):
                    updated += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"  ❌ Error updating {folder}: {e}")
                failed += 1

    print(f"\nDone: {updated} updated, {failed} failed")

if __name__ == "__main__":
    main()