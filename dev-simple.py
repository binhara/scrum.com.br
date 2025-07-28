#!/usr/bin/env python3
"""
Portal Scrum - Servidor Simples com Controles
Versão simplificada com controles básicos
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

def run_server(port=8000):
    # Mudar para diretório do script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("🚀 Portal Scrum - Servidor Local")
    print(f"📍 http://localhost:{port}")
    print()
    print("CONTROLES:")
    print("  Pressione ENTER para reiniciar")
    print("  Ctrl+C para sair")
    print("=" * 40)
    
    while True:
        try:
            # Iniciar servidor
            with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
                print(f"✅ Servidor rodando na porta {port}")
                
                # Abrir navegador
                webbrowser.open(f"http://localhost:{port}")
                
                # Thread para capturar input
                def wait_for_input():
                    try:
                        input()  # Espera o usuário pressionar Enter
                        print("🔄 Reiniciando servidor...")
                        httpd.shutdown()
                    except:
                        pass
                
                input_thread = threading.Thread(target=wait_for_input, daemon=True)
                input_thread.start()
                
                # Servir até ser interrompido
                httpd.serve_forever()
                
        except KeyboardInterrupt:
            print("\n👋 Servidor parado!")
            break
        except OSError:
            port += 1
            print(f"🔄 Tentando porta {port}...")
            continue
        except:
            print("🔄 Reiniciando...")
            time.sleep(1)
            continue

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)