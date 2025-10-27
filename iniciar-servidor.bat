@echo off
REM Script para iniciar o servidor local no Windows

echo.
echo ============================================================
echo Procissao Maritima de Angra dos Reis - Servidor Local
echo ============================================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    echo Baixe em: https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Verificar se package.json existe
if not exist package.json (
    echo ERRO: package.json nao encontrado!
    echo Certifique-se de estar na pasta correta.
    echo.
    pause
    exit /b 1
)

REM Instalar dependências se necessário
if not exist node_modules (
    echo Instalando dependencias...
    call npm install
    echo.
)

REM Iniciar servidor
echo Iniciando servidor...
echo.
node servidor-local.js

pause

