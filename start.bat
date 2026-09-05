@echo off
setlocal

rem Vérifier que Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js n'est pas installé. Installation en cours...
    powershell -Command "iwr https://nodejs.org/dist/latest/node-latest-x64.msi -OutFile nodejs.msi"
    start /wait nodejs.msi /quiet
    if errorlevel 1 (
        echo Échec de l'installation de Node.js.
        pause
        exit /b 1
    )
)

rem Vérifier que npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm n'est pas installé. Veuillez installer Node.js qui inclut npm.
    pause
    exit /b 1
)

rem Vérifier que les dépendances sont installées
if not exist "node_modules\express" (
    echo Installation des dépendances...
    npm install
    if errorlevel 1 (
        echo Échec de l'installation des dépendances.
        pause
        exit /b 1
    )
)

rem Démarrer le serveur
node server.js

endlocal