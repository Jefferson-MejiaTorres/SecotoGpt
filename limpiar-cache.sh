#!/bin/bash
# Script para limpiar caché y forzar recarga de la página de Gestión de Procesos

echo "🧹 Limpiando caché de archivos de Gestión de Procesos..."

# Crear timestamp para versionado
TIMESTAMP=$(date +%s)

# Actualizar referencias CSS con nuevo timestamp
sed -i "s/PrincipalGestionProcesos\.css?v=[0-9.]*/PrincipalGestionProcesos.css?v=$TIMESTAMP/g" src/paginas/GestionProcesos/PrincipalGestionProcesos.html

# Actualizar referencias JS con nuevo timestamp  
sed -i "s/PrincipalGestionProcesos\.js?v=[0-9.]*/PrincipalGestionProcesos.js?v=$TIMESTAMP/g" src/paginas/GestionProcesos/PrincipalGestionProcesos.html

echo "✅ Archivos actualizados con timestamp: $TIMESTAMP"
echo "📖 Instrucciones para el usuario:"
echo "   1. Presiona Ctrl+F5 en el navegador para forzar recarga"
echo "   2. O abre el navegador en modo incógnito"
echo "   3. O limpia el caché del navegador manualmente"

echo ""
echo "🌐 URL directa para probar:"
echo "   file:///c:/Users/ASUS/Proyectos/secotogpt/SecotoGpt/src/paginas/GestionProcesos/PrincipalGestionProcesos.html"
