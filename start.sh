#!/bin/bash

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "Node.js n'est pas installé. Installation en cours..."
    # Installer Node.js via nvm (Node Version Manager)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    if [ $? -ne 0 ]; then
        echo "Échec de l'installation de Node.js."
        exit 1
    fi
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "npm n'est pas installé. Veuillez installer Node.js qui inclut npm."
    exit 1
fi

# Vérifier que les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Échec de l'installation des dépendances."
        exit 1
    fi
fi

# Démarrer le serveur
node server.js