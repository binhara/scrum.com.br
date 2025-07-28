# Portal Scrum - Servidor de Desenvolvimento

## Scripts Disponíveis

### 🚀 start.sh (RECOMENDADO)
Script Bash interativo com controles completos:
```bash
./start.sh          # Porta 8000 (padrão)
./start.sh 3000     # Porta específica
```

**Controles:**
- `r` + Enter = Reiniciar servidor
- `s` + Enter = Parar servidor  
- `o` + Enter = Abrir no navegador
- `q` + Enter = Sair
- `Ctrl+C` = Sair
- `Enter` (vazio) = Reiniciar

### 🐍 dev-server.py
Script Python avançado com interface completa:
```bash
python3 dev-server.py      # Porta 8000
python3 dev-server.py 3000 # Porta específica
```

**Controles:**
- `R` ou `r` = Reiniciar servidor
- `S` ou `s` = Parar servidor
- `O` ou `o` = Abrir no navegador
- `H` ou `h` = Mostrar ajuda
- `Q` ou `q` = Sair
- `Ctrl+C` = Sair

### 🔧 dev-simple.py
Script Python minimalista:
```bash
python3 dev-simple.py      # Porta 8000
python3 dev-simple.py 3000 # Porta específica
```

**Controles:**
- `Enter` = Reiniciar servidor
- `Ctrl+C` = Sair

### ⚡ run.py (Original)
Script básico sem controles:
```bash
python3 run.py      # Porta 8000
python3 run.py 3000 # Porta específica
```

**Controles:**
- `Ctrl+C` = Sair

## Recursos dos Scripts

### ✅ Funcionalidades Comuns
- Auto-detecção de porta ocupada
- Abertura automática do navegador
- Mudança automática para diretório correto
- Timestamps nos logs
- Tratamento de erros

### 🎯 Funcionalidades Avançadas (start.sh e dev-server.py)
- Reiniciar servidor sem fechar terminal
- Parar/iniciar servidor independentemente
- Múltiplas formas de controle
- Interface colorida (start.sh)
- Status em tempo real

## Uso Recomendado

Para desenvolvimento ativo: **`./start.sh`**
- Controles mais intuitivos
- Interface visual clara
- Restart rápido com Enter

Para debugging: **`python3 dev-server.py`** 
- Mais opções de controle
- Logs detalhados
- Cross-platform

Para simplicidade: **`python3 dev-simple.py`**
- Mínimo de recursos
- Restart com Enter

## Exemplos

```bash
# Desenvolvimento normal
./start.sh

# Porta específica
./start.sh 3000

# Com Python se Bash não disponível
python3 dev-server.py

# Simples e rápido
python3 dev-simple.py
```