#!/usr/bin/env python3
"""
Portal Scrum - Servidor Simples
Script minimalista para rodar o servidor local rapidamente
"""

import http.server
import socketserver
import webbrowser
import os
import sys

def main():
    # Porta padrão ou da linha de comando
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Mudar para diretório do script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("🚀 Portal Scrum - Servidor Local")
    print(f"📍 http://localhost:{port}")
    print("⏹️  Ctrl+C para parar\n")
    
    try:
        with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
            # Abrir navegador
            webbrowser.open(f"http://localhost:{port}")
            
            # Servir
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Servidor parado!")
    except OSError:
        print(f"❌ Porta {port} ocupada! Tente: python run.py {port+1}")

if __name__ == "__main__":
    main()