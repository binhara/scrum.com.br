# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portal Scrum (www.scrum.com.br) é um portal de conteúdo focado na metodologia Scrum e na ferramenta TaskTracker. O site promove cursos de IA da OWorkshop e o congresso de Big Data do DSSBR através de banners promocionais.

## Commands

### Development Server
```bash
# Servidor Interativo com Controles (RECOMENDADO)
./start.sh           # ou ./start.sh 3000 para porta específica
# Controles: r=reiniciar, s=parar, o=abrir navegador, q=sair, Enter=reiniciar

# Servidor Python Avançado
python3 dev-server.py      # ou python3 dev-server.py 3000
# Controles: R=reiniciar, S=parar, O=abrir, H=ajuda, Q=sair

# Servidor Python Simples
python3 dev-simple.py      # Enter=reiniciar, Ctrl+C=sair

# Servidor Python Básico
python3 run.py            # Ctrl+C=sair

# Alternativas tradicionais
python -m http.server 8000
npx serve .
# Usar extensão Live Server no VS Code
```

### Testing
```bash
# Validar HTML
npx html-validate *.html pages/*.html

# Validar CSS
npx stylelint "assets/css/*.css"

# Verificar links
npx linkinator https://www.scrum.com.br --recurse
```

### SEO e Performance
```bash
# Lighthouse audit
lighthouse https://www.scrum.com.br --output html --output-path report.html

# Validar sitemap
curl -I https://www.scrum.com.br/sitemap.xml
```

## Architecture

### Structure Overview
```
PortalScrum/
├── index.html                 # Página inicial com banners dos parceiros
├── pages/                     # Páginas internas
│   ├── sobre-scrum.html      # Informações detalhadas sobre Scrum
│   ├── tasktracker.html      # Página dedicada à ferramenta TaskTracker
│   ├── blog.html             # Lista de artigos do blog
│   └── contato.html          # Formulário e informações de contato
├── assets/
│   ├── css/
│   │   ├── styles.css        # Estilos principais globais
│   │   └── pages.css         # Estilos específicos para páginas internas
│   ├── js/
│   │   ├── main.js           # JavaScript principal (idiomas, mobile menu, etc.)
│   │   ├── blog.js           # Funcionalidades específicas do blog
│   │   └── contact.js        # Funcionalidades do formulário de contato
│   └── images/               # Imagens, logos e banners (placeholders)
├── blog/                     # Diretório para artigos individuais (futuramente)
├── sitemap.xml              # Mapa do site para SEO
└── robots.txt               # Instruções para crawlers
```

### Key Features

#### Multi-language Support
- Alternância PT-BR/EN implementada via JavaScript
- Todos os textos usando data attributes (data-pt, data-en)
- Persistência da escolha via localStorage
- Meta descriptions dinâmicas por idioma

#### SEO Optimization
- Meta tags otimizadas para cada página
- Structured data ready
- Sitemap.xml configurado
- URLs amigáveis
- Alt texts em todas as imagens
- Schema.org markup ready

#### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Grid systems para layouts flexíveis
- Menu mobile com hambúrguer

#### Partner Integration
- Banners promocionais para OWorkshop (www.oworkshop.com.br)
- Banners promocionais para DSSBR (www.dssbr.com.br)
- Links externos com target="_blank" e rel="noopener"

### Component Architecture

#### Header/Navigation
- Logo + text combination
- Responsive navigation menu
- Language selector
- Mobile hamburger menu
- Sticky positioning

#### Content Sections
- Hero sections with CTAs
- Feature grids (3-4 columns)
- Partners showcase
- Blog preview grids
- Newsletter signup
- FAQ accordions

#### Footer
- Multi-column layout
- Partner links
- Social media links
- Copyright information

### JavaScript Modules

#### main.js
- Language switching functionality
- Mobile menu handling
- Newsletter form
- Scroll effects
- Search functionality base
- Notification system

#### blog.js
- Category filtering
- Search within articles
- Load more functionality
- Article sharing
- Reading time calculation

#### contact.js
- Form validation
- Submission handling
- FAQ toggles
- Real-time field validation

### CSS Structure

#### styles.css (Main)
- CSS Reset and base styles
- Typography system
- Button variants
- Header and navigation
- Hero sections
- Feature grids
- Partners section
- Footer
- Responsive breakpoints

#### pages.css (Internal pages)
- Page headers
- Content layouts
- Timeline components
- FAQ styles
- Form styles
- Blog-specific layouts

### TaskTracker Integration
O site destaca as seguintes funcionalidades da TaskTracker:
- Visualização Kanban com drag-and-drop
- Gráfico de Burndown dinâmico
- Gestão de Sprints (10 dias)
- Integração Google Sheets
- Modo demo interativo
- Tecnologias: React 18, Material-UI, Chart.js

### Content Strategy
O blog inclui artigos sobre:
- Fundamentos do Scrum
- Implementação de metodologias ágeis
- TaskTracker como ferramenta
- IA na gestão de projetos
- Big Data e business intelligence
- Casos de sucesso
- Comparativos entre metodologias

### Deployment Notes
- Static site - pode ser hospedado em Vercel, Netlify, GitHub Pages
- Configurar domínio www.scrum.com.br
- SSL obrigatório
- Configurar redirects se necessário
- Testar em múltiplos dispositivos e navegadores

### Future Enhancements
- Sistema de comentários no blog
- Newsletter integration com MailChimp/ConvertKit
- Analytics integration (Google Analytics)
- Schema.org structured data
- PWA capabilities
- Blog RSS feed
- Busca avançada no blog