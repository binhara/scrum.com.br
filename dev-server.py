#!/usr/bin/env python3
"""
Portal Scrum - Servidor de Desenvolvimento Interativo
Script com controles para parar/reiniciar o servidor usando teclas
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time
import signal
from datetime import datetime

class InteractiveServer:
    def __init__(self, port=8000):
        self.port = port
        self.server = None
        self.server_thread = None
        self.running = False
        
        # Mudar para diretório do script
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    def start_server(self):
        """Inicia o servidor HTTP"""
        try:
            self.server = socketserver.TCPServer(("", self.port), http.server.SimpleHTTPRequestHandler)
            self.server.timeout = 1.0  # Timeout para permitir interrupção
            
            # Thread para rodar o servidor
            self.server_thread = threading.Thread(target=self._serve_forever, daemon=True)
            self.server_thread.start()
            
            self.running = True
            
            timestamp = datetime.now().strftime("%H:%M:%S")
            print(f"✅ [{timestamp}] Servidor iniciado em http://localhost:{self.port}")
            
            # Abrir navegador na primeira vez
            if not hasattr(self, '_browser_opened'):
                webbrowser.open(f"http://localhost:{self.port}")
                self._browser_opened = True
                
        except OSError as e:
            if "Address already in use" in str(e):
                print(f"❌ Porta {self.port} já está em uso!")
                self.port += 1
                print(f"🔄 Tentando porta {self.port}...")
                self.start_server()
            else:
                print(f"❌ Erro ao iniciar servidor: {e}")
    
    def _serve_forever(self):
        """Executa o servidor em loop"""
        while self.running:
            try:
                self.server.handle_request()
            except:
                if self.running:  # Se ainda deveria estar rodando
                    time.sleep(0.1)
    
    def stop_server(self):
        """Para o servidor HTTP"""
        if self.server and self.running:
            self.running = False
            self.server.server_close()
            
            if self.server_thread:
                self.server_thread.join(timeout=1)
            
            timestamp = datetime.now().strftime("%H:%M:%S")
            print(f"⏹️  [{timestamp}] Servidor parado")
    
    def restart_server(self):
        """Reinicia o servidor"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"🔄 [{timestamp}] Reiniciando servidor...")
        self.stop_server()
        time.sleep(0.5)  # Pequena pausa
        self.start_server()

def print_header():
    """Imprime o cabeçalho do servidor"""
    print("=" * 60)
    print("🚀 PORTAL SCRUM - Servidor de Desenvolvimento Interativo")
    print("=" * 60)
    print()

def print_controls():
    """Imprime os controles disponíveis"""
    print("📋 CONTROLES DISPONÍVEIS:")
    print("   [R] ou [r] - Reiniciar servidor")
    print("   [S] ou [s] - Parar servidor")
    print("   [O] ou [o] - Abrir no navegador")
    print("   [H] ou [h] - Mostrar esta ajuda")
    print("   [Q] ou [q] - Sair")
    print("   Ctrl+C     - Sair")
    print()

def get_user_input(server):
    """Thread para capturar input do usuário"""
    while True:
        try:
            user_input = input().strip().lower()
            
            if user_input in ['q', 'quit', 'exit']:
                print("\n👋 Encerrando servidor...")
                server.stop_server()
                os._exit(0)
                
            elif user_input in ['r', 'restart']:
                server.restart_server()
                
            elif user_input in ['s', 'stop']:
                if server.running:
                    server.stop_server()
                else:
                    print("ℹ️  Servidor já está parado. Use 'r' para reiniciar.")
                    
            elif user_input in ['o', 'open']:
                webbrowser.open(f"http://localhost:{server.port}")
                print(f"🌐 Abrindo http://localhost:{server.port} no navegador")
                
            elif user_input in ['h', 'help']:
                print_controls()
                
            elif user_input == '':
                continue  # Ignora enter vazio
                
            else:
                print("❓ Comando não reconhecido. Use 'h' para ver a ajuda.")
                
        except (EOFError, KeyboardInterrupt):
            print("\n👋 Encerrando servidor...")
            server.stop_server()
            break

def signal_handler(signum, frame):
    """Handler para Ctrl+C"""
    print("\n👋 Encerrando servidor...")
    sys.exit(0)

def main():
    # Registrar handler para Ctrl+C
    signal.signal(signal.SIGINT, signal_handler)
    
    # Porta padrão ou da linha de comando
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Imprimir header
    print_header()
    
    # Criar e iniciar servidor
    server = InteractiveServer(port)
    server.start_server()
    
    # Mostrar controles
    print_controls()
    print("💡 Digite um comando e pressione Enter:")
    
    # Thread para capturar input do usuário
    input_thread = threading.Thread(target=get_user_input, args=(server,), daemon=True)
    input_thread.start()
    
    try:
        # Manter o programa rodando
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Encerrando servidor...")
        server.stop_server()

if __name__ == "__main__":
    main()