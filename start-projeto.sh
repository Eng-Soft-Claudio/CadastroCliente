#!/bin/bash

echo "🔧 Iniciando Projeto de Cadastro..."

# Caminho base
BASE_DIR="/media/claudioh4x5w6l7/Desenvolvimento/ProjetoCadastro"

# Iniciar backend
echo "🚀 Iniciando BackEnd..."
gnome-terminal --tab --title="BackEnd" -- bash -c "cd $BASE_DIR/BackEnd && npm start; exec bash"

# Iniciar frontend
echo "🌐 Iniciando FrontEnd..."
gnome-terminal --tab --title="FrontEnd" -- bash -c "cd $BASE_DIR/FrontEnd && npm start; exec bash"

echo "✅ Tudo rodando!"

