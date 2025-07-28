#!/bin/bash

# Portal Scrum - Script de Desenvolvimento com Controles
# Uso: ./start.sh [porta]

PORT=${1:-8000}
PID_FILE="/tmp/portal_scrum_server.pid"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir com cores
print_status() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Função para parar servidor
stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            kill $PID
            rm -f "$PID_FILE"
            print_status "Servidor parado"
        else
            rm -f "$PID_FILE"
        fi
    fi
}

# Função para iniciar servidor
start_server() {
    cd "$(dirname "$0")"
    
    # Verificar se a porta está livre
    if netstat -tuln | grep -q ":$PORT "; then
        print_error "Porta $PORT já está em uso!"
        PORT=$((PORT + 1))
        print_info "Tentando porta $PORT..."
    fi
    
    # Iniciar servidor em background
    python3 -m http.server $PORT > /dev/null 2>&1 &
    SERVER_PID=$!
    echo $SERVER_PID > "$PID_FILE"
    
    print_status "Servidor iniciado em http://localhost:$PORT"
    
    # Abrir navegador
    if command -v xdg-open > /dev/null; then
        xdg-open "http://localhost:$PORT" > /dev/null 2>&1
    elif command -v open > /dev/null; then
        open "http://localhost:$PORT" > /dev/null 2>&1
    fi
}

# Função de cleanup ao sair
cleanup() {
    echo
    print_status "Encerrando..."
    stop_server
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT TERM

# Header
echo "=================================="
echo "🚀 Portal Scrum - Dev Server"
echo "=================================="
echo

# Iniciar servidor
start_server

echo
echo "📋 CONTROLES:"
echo "   r + Enter  = Reiniciar servidor"
echo "   s + Enter  = Parar servidor"
echo "   o + Enter  = Abrir navegador"
echo "   q + Enter  = Sair"
echo "   Ctrl+C     = Sair"
echo
echo "💡 Digite um comando:"

# Loop principal
while true; do
    read -r input
    case "${input,,}" in  # Convert to lowercase
        r|restart)
            print_info "Reiniciando servidor..."
            stop_server
            sleep 1
            start_server
            ;;
        s|stop)
            stop_server
            ;;
        o|open)
            if command -v xdg-open > /dev/null; then
                xdg-open "http://localhost:$PORT" > /dev/null 2>&1
            elif command -v open > /dev/null; then
                open "http://localhost:$PORT" > /dev/null 2>&1
            fi
            print_info "Abrindo http://localhost:$PORT no navegador"
            ;;
        q|quit|exit)
            cleanup
            ;;
        h|help)
            echo
            echo "📋 CONTROLES:"
            echo "   r + Enter  = Reiniciar servidor"
            echo "   s + Enter  = Parar servidor"
            echo "   o + Enter  = Abrir navegador"
            echo "   q + Enter  = Sair"
            echo "   Ctrl+C     = Sair"
            echo
            ;;
        "")
            # Enter vazio - reiniciar
            print_info "Reiniciando servidor..."
            stop_server
            sleep 1
            start_server
            ;;
        *)
            print_warning "Comando não reconhecido: '$input'. Use 'h' para ajuda."
            ;;
    esac
done