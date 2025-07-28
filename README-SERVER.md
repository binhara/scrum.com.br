# 🚀 Portal Scrum - Servidor Local

Scripts Python para rodar o Portal Scrum localmente durante desenvolvimento e testes.

## 📋 Pré-requisitos

- Python 3.6+ instalado
- Estar no diretório raiz do projeto PortalScrum

## 🛠️ Como Usar

### Opção 1: Servidor Completo (Recomendado)

```bash
# Porta padrão (8000)
python server.py

# Porta customizada
python server.py 3000

# Ver ajuda
python server.py --help
```

**Funcionalidades do servidor completo:**
- ✅ Mock APIs para formulários (contato, newsletter)
- ✅ Headers CORS para desenvolvimento
- ✅ Log detalhado de requisições
- ✅ Health check endpoint (`/health`)
- ✅ Abertura automática do navegador
- ✅ Validação da estrutura do projeto
- ✅ Criação automática de imagens placeholder

### Opção 2: Servidor Simples

```bash
# Porta padrão (8000)
python run.py

# Porta customizada
python run.py 3000
```

**Servidor minimalista para testes rápidos.**

## 🌐 URLs Disponíveis

Após iniciar o servidor, as seguintes URLs estarão disponíveis:

- **🏠 Página Inicial:** `http://localhost:8000/`
- **📚 Sobre Scrum:** `http://localhost:8000/pages/sobre-scrum.html`
- **🛠️ TaskTracker:** `http://localhost:8000/pages/tasktracker.html`
- **📝 Blog:** `http://localhost:8000/pages/blog.html`
- **📞 Contato:** `http://localhost:8000/pages/contato.html`
- **🔧 Health Check:** `http://localhost:8000/health` *(apenas servidor completo)*

## 🔧 APIs de Desenvolvimento

O servidor completo inclui endpoints mock para desenvolvimento:

### POST `/api/contact`
Mock para formulário de contato
- Loga dados recebidos no console
- Retorna resposta JSON de sucesso

### POST `/api/newsletter` 
Mock para cadastro newsletter
- Loga dados recebidos no console
- Retorna resposta JSON de sucesso

### GET `/api/stats`
Estatísticas mock do site

### GET `/health`
Health check do servidor

## 🐛 Troubleshooting

### Porta já está em uso
```bash
# Se a porta 8000 estiver ocupada, use outra:
python server.py 3000
```

### Arquivo não encontrado
Certifique-se de estar no diretório correto:
```bash
# Deve conter estes arquivos:
ls -la
# index.html, pages/, assets/, server.py
```

### Permissões no Linux/Mac
```bash
chmod +x server.py run.py
```

## 📱 Testando Responsividade

1. Abra as **DevTools** do navegador (F12)
2. Clique no ícone de **device toggle** (📱)
3. Teste diferentes dispositivos:
   - iPhone/Android
   - Tablet
   - Desktop

## 🔍 Funcionalidades para Testar

### ✅ Navegação
- [ ] Menu principal funciona
- [ ] Menu mobile (hambúrguer)
- [ ] Links internos
- [ ] Links para parceiros (OWorkshop, DSSBR)

### ✅ Idiomas
- [ ] Alternância PT-BR ↔ EN
- [ ] Persistência da escolha
- [ ] Tradução de todos os elementos

### ✅ Formulários
- [ ] Formulário de contato
- [ ] Newsletter signup
- [ ] Validação de campos
- [ ] Mensagens de sucesso/erro

### ✅ Blog
- [ ] Filtros por categoria
- [ ] Sistema de busca
- [ ] Botão "Carregar mais"

### ✅ Design Responsivo
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

## 🚀 Deploy para Produção

Este é um site estático, pode ser hospedado em:

- **Vercel:** `vercel deploy`
- **Netlify:** Arraste a pasta para netlify.app
- **GitHub Pages:** Push para repositório GitHub
- **AWS S3:** Upload para bucket S3

## ⚡ Performance

Para otimizar performance em produção:

```bash
# Minificar CSS/JS (opcional)
npm install -g clean-css-cli uglify-js
cleancss -o assets/css/styles.min.css assets/css/styles.css
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

## 📞 Suporte

Para dúvidas sobre o Portal Scrum:
- 📧 Email: contato@scrum.com.br
- 🌐 Site: www.scrum.com.br

---
*Portal Scrum v1.0 - Desenvolvido com ❤️ para a comunidade Scrum*