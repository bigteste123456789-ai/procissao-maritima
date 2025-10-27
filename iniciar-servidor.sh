#!/bin/bash

# Script para iniciar o servidor local no Mac/Linux

echo ""
echo "============================================================"
echo "Procissao Maritima de Angra dos Reis - Servidor Local"
echo "============================================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não está instalado!"
    echo "Baixe em: https://nodejs.org"
    echo ""
    exit 1
fi

# Verificar se package.json existe
if [ ! -f package.json ]; then
    echo "ERRO: package.json não encontrado!"
    echo "Certifique-se de estar na pasta correta."
    echo ""
    exit 1
fi

# Instalar dependências se necessário
if [ ! -d node_modules ]; then
    echo "Instalando dependências..."
    npm install
    echo ""
fi

# Iniciar servidor
echo "Iniciando servidor..."
echo ""
node servidor-local.js

