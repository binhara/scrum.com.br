#!/usr/bin/env python3
"""
Portal Scrum - Servidor Web Local para Desenvolvimento e Testes
Autor: Claude Code
Versão: 1.0

Este script cria um servidor web local para testar o Portal Scrum (www.scrum.com.br)
com todas as funcionalidades necessárias para desenvolvimento.

Uso:
    python server.py [porta]
    
Exemplos:
    python server.py          # Porta padrão 8000
    python server.py 3000     # Porta personalizada
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import threading
import time
from urllib.parse import urlparse, parse_qs
import json
import datetime

class PortalScrumHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler personalizado para o Portal Scrum com funcionalidades extras"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        """Adiciona headers customizados para desenvolvimento"""
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        """Handle GET requests with custom routing"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Roteamento customizado
        if path == '/':
            self.serve_file('index.html')
        elif path == '/health':
            self.serve_health_check()
        elif path == '/api/newsletter':
            self.serve_newsletter_api(parsed_path.query)
        elif path.startswith('/api/'):
            self.serve_api_endpoint(path)
        else:
            # Servir arquivos estáticos normalmente
            super().do_GET()
    
    def do_POST(self):
        """Handle POST requests (formulários)"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/api/contact':
            self.handle_contact_form()
        elif path == '/api/newsletter':
            self.handle_newsletter_signup()
        else:
            self.send_error(404, "API endpoint not found")
    
    def serve_file(self, filename):
        """Serve um arquivo específico"""
        try:
            if os.path.exists(filename):
                with open(filename, 'rb') as f:
                    content = f.read()
                
                # Determinar content type
                if filename.endswith('.html'):
                    content_type = 'text/html; charset=utf-8'
                elif filename.endswith('.css'):
                    content_type = 'text/css; charset=utf-8'
                elif filename.endswith('.js'):
                    content_type = 'application/javascript; charset=utf-8'
                elif filename.endswith('.json'):
                    content_type = 'application/json; charset=utf-8'
                else:
                    content_type = 'application/octet-stream'
                
                self.send_response(200)
                self.send_header('Content-type', content_type)
                self.send_header('Content-length', len(content))
                self.end_headers()
                self.wfile.write(content)
            else:
                self.send_error(404, f"File {filename} not found")
        except Exception as e:
            self.send_error(500, f"Error serving file: {str(e)}")
    
    def serve_health_check(self):
        """Endpoint de health check"""
        health_data = {
            "status": "ok",
            "service": "Portal Scrum Local Server",
            "timestamp": datetime.datetime.now().isoformat(),
            "version": "1.0",
            "uptime": time.time() - start_time
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(health_data, indent=2).encode())
    
    def serve_newsletter_api(self, query_params):
        """API mock para newsletter"""
        response = {
            "success": True,
            "message": "Newsletter signup simulated successfully!",
            "timestamp": datetime.datetime.now().isoformat()
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
    
    def serve_api_endpoint(self, path):
        """Serve endpoints de API mock"""
        # Mock APIs para desenvolvimento
        mock_responses = {
            '/api/blog/search': {
                "results": [
                    {"title": "O que é Scrum?", "url": "blog/o-que-e-scrum.html"},
                    {"title": "TaskTracker Features", "url": "blog/tasktracker-ferramenta-scrum.html"}
                ]
            },
            '/api/stats': {
                "visitors": 1234,
                "articles": 10,
                "languages": ["pt-BR", "en"]
            }
        }
        
        if path in mock_responses:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(mock_responses[path]).encode())
        else:
            self.send_error(404, f"API endpoint {path} not found")
    
    def handle_contact_form(self):
        """Handle formulário de contato"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Log do formulário (em produção, salvaria no banco)
            print(f"\n📧 FORMULÁRIO DE CONTATO RECEBIDO:")
            print(f"Timestamp: {datetime.datetime.now()}")
            print(f"Data: {post_data.decode('utf-8')}")
            print("-" * 50)
            
            response = {
                "success": True,
                "message": "Mensagem enviada com sucesso! (simulado)",
                "timestamp": datetime.datetime.now().isoformat()
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, f"Error processing contact form: {str(e)}")
    
    def handle_newsletter_signup(self):
        """Handle cadastro newsletter"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            print(f"\n📬 NEWSLETTER SIGNUP:")
            print(f"Timestamp: {datetime.datetime.now()}")
            print(f"Data: {post_data.decode('utf-8')}")
            print("-" * 50)
            
            response = {
                "success": True,
                "message": "Inscrição na newsletter realizada! (simulado)"
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, f"Error processing newsletter signup: {str(e)}")
    
    def log_message(self, format, *args):
        """Log personalizado com timestamp"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {format % args}")

def check_project_structure():
    """Verifica se estamos no diretório correto do projeto"""
    required_files = ['index.html', 'pages', 'assets']
    missing_files = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ ERRO: Arquivos/diretórios não encontrados:")
        for file in missing_files:
            print(f"   - {file}")
        print("\n💡 Certifique-se de estar no diretório raiz do projeto PortalScrum")
        return False
    
    return True

def create_mock_images():
    """Cria imagens placeholder se não existirem"""
    images_dir = "assets/images"
    
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
        print(f"📁 Diretório {images_dir} criado")
    
    # Lista de imagens placeholder necessárias
    placeholder_images = [
        "logo_scrum.png",
        "oworkshop_logo.png",
        "oworkshop_banner.png", 
        "dssbr_logo.png",
        "dssbr_banner.png",
        "scrum-kanban-board.png",
        "tasktracker-kanban-preview.png"
    ]
    
    created_images = []
    for img in placeholder_images:
        img_path = os.path.join(images_dir, img)
        if not os.path.exists(img_path):
            # Criar arquivo placeholder vazio
            with open(img_path, 'w') as f:
                f.write("# Placeholder image")
            created_images.append(img)
    
    if created_images:
        print(f"🖼️  Criadas {len(created_images)} imagens placeholder")

def open_browser(url, delay=2):
    """Abre o navegador após um delay"""
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print(f"🌐 Navegador aberto: {url}")
    except Exception as e:
        print(f"❌ Não foi possível abrir o navegador: {e}")
        print(f"   Abra manualmente: {url}")

def print_banner():
    """Exibe banner do Portal Scrum"""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║                     🏗️  PORTAL SCRUM 🏗️                      ║
║                  Servidor Local de Desenvolvimento            ║
╠══════════════════════════════════════════════════════════════╣
║  📊 Metodologia Scrum  │  🛠️ TaskTracker  │  🤖 IA & Big Data ║
╚══════════════════════════════════════════════════════════════╝
"""
    print(banner)

def print_help():
    """Exibe ajuda do script"""
    help_text = """
🔧 PORTAL SCRUM - SERVIDOR LOCAL

Uso:
    python server.py [porta]

Opções:
    porta           Porta do servidor (padrão: 8000)
    --help, -h      Exibe esta ajuda

Exemplos:
    python server.py          # Porta 8000
    python server.py 3000     # Porta 3000
    python server.py --help   # Ajuda

Endpoints disponíveis:
    GET  /                    # Página inicial
    GET  /health             # Health check
    GET  /api/stats          # Estatísticas mock
    POST /api/contact        # Formulário contato
    POST /api/newsletter     # Newsletter signup

Funcionalidades:
    ✅ Servidor HTTP com hot-reload
    ✅ Mock APIs para formulários
    ✅ Headers CORS para desenvolvimento
    ✅ Log de requisições detalhado
    ✅ Abertura automática do navegador
    ✅ Validação da estrutura do projeto
"""
    print(help_text)

def main():
    """Função principal"""
    global start_time
    start_time = time.time()
    
    # Verificar argumentos
    if len(sys.argv) > 1 and sys.argv[1] in ['--help', '-h']:
        print_help()
        return
    
    # Determinar porta
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if not (1024 <= port <= 65535):
                raise ValueError("Porta deve estar entre 1024 e 65535")
        except ValueError as e:
            print(f"❌ Erro na porta: {e}")
            print("💡 Usando porta padrão 8000")
            port = 8000
    
    print_banner()
    
    # Verificar estrutura do projeto
    print("🔍 Verificando estrutura do projeto...")
    if not check_project_structure():
        return
    
    print("✅ Estrutura do projeto verificada")
    
    # Criar imagens placeholder se necessário
    create_mock_images()
    
    # Configurar servidor
    handler = PortalScrumHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            server_url = f"http://localhost:{port}"
            
            print(f"\n🚀 SERVIDOR INICIADO COM SUCESSO!")
            print(f"📍 URL: {server_url}")
            print(f"📂 Diretório: {os.getcwd()}")
            print(f"🕐 Iniciado em: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("\n📋 Páginas disponíveis:")
            print(f"   🏠 Início: {server_url}/")
            print(f"   📚 Sobre Scrum: {server_url}/pages/sobre-scrum.html")
            print(f"   🛠️ TaskTracker: {server_url}/pages/tasktracker.html")
            print(f"   📝 Blog: {server_url}/pages/blog.html")
            print(f"   📞 Contato: {server_url}/pages/contato.html")
            print(f"   🔧 Health Check: {server_url}/health")
            
            print(f"\n⏹️  Para parar o servidor: Ctrl+C")
            print("=" * 60)
            
            # Abrir navegador em thread separada
            browser_thread = threading.Thread(target=open_browser, args=(server_url,))
            browser_thread.daemon = True
            browser_thread.start()
            
            # Iniciar servidor
            httpd.serve_forever()
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ ERRO: Porta {port} já está em uso!")
            print(f"💡 Tente uma porta diferente: python server.py {port + 1}")
        else:
            print(f"❌ ERRO ao iniciar servidor: {e}")
    except KeyboardInterrupt:
        print(f"\n\n⏹️  Servidor interrompido pelo usuário")
        print("👋 Obrigado por usar o Portal Scrum!")
    except Exception as e:
        print(f"❌ ERRO inesperado: {e}")

if __name__ == "__main__":
    main()