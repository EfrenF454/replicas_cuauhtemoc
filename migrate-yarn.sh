#!/bin/bash

# Script de Migración a Next.js 15 + Tailwind CSS (YARN)
# Réplicas Cuauhtémoc

echo "🚀 Iniciando migración a Next.js 15 + Tailwind CSS (usando Yarn)..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que yarn esté instalado
if ! command -v yarn &> /dev/null
then
    echo -e "${YELLOW}⚠️  Yarn no está instalado. Instalando yarn...${NC}"
    npm install -g yarn
fi

# Paso 1: Backup
echo -e "${BLUE}📦 Paso 1/5: Creando backup...${NC}"
if [ ! -d "../replicas_cuauhtemoc_backup" ]; then
    cp -r . ../replicas_cuauhtemoc_backup
    echo -e "${GREEN}✅ Backup creado en ../replicas_cuauhtemoc_backup${NC}"
else
    echo -e "${YELLOW}⚠️  Backup ya existe, saltando...${NC}"
fi
echo ""

# Paso 2: Reemplazar archivos de configuración
echo -e "${BLUE}🔧 Paso 2/5: Activando configuración Next.js...${NC}"

if [ -f "package.json" ]; then
    mv package.json package.json.old
    echo -e "${GREEN}✅ package.json respaldado${NC}"
fi

if [ -f "package.json.next" ]; then
    mv package.json.next package.json
    echo -e "${GREEN}✅ package.json Next.js activado${NC}"
fi

if [ -f "firebase.json" ]; then
    mv firebase.json firebase.json.old
    echo -e "${GREEN}✅ firebase.json respaldado${NC}"
fi

if [ -f "firebase.json.next" ]; then
    mv firebase.json.next firebase.json
    echo -e "${GREEN}✅ firebase.json Next.js activado${NC}"
fi

if [ -f ".gitignore" ]; then
    mv .gitignore .gitignore.old
    echo -e "${GREEN}✅ .gitignore respaldado${NC}"
fi

if [ -f ".gitignore.next" ]; then
    mv .gitignore.next .gitignore
    echo -e "${GREEN}✅ .gitignore Next.js activado${NC}"
fi
echo ""

# Paso 3: Limpiar instalación anterior
echo -e "${BLUE}🧹 Paso 3/5: Limpiando instalación anterior...${NC}"
rm -rf node_modules yarn.lock package-lock.json .next
echo -e "${GREEN}✅ Archivos antiguos eliminados${NC}"
echo ""

# Paso 4: Instalar dependencias
echo -e "${BLUE}📥 Paso 4/5: Instalando dependencias con Yarn...${NC}"
echo -e "${YELLOW}Esto puede tardar unos minutos...${NC}"
yarn install
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

# Paso 5: Verificación
echo -e "${BLUE}✅ Paso 5/5: Verificación final...${NC}"

if [ -d "app" ]; then
    echo -e "${GREEN}✅ Directorio app/ encontrado${NC}"
fi

if [ -d "components" ]; then
    echo -e "${GREEN}✅ Directorio components/ encontrado${NC}"
fi

if [ -d "lib" ]; then
    echo -e "${GREEN}✅ Directorio lib/ encontrado${NC}"
fi

if [ -f "tailwind.config.ts" ]; then
    echo -e "${GREEN}✅ Tailwind configurado${NC}"
fi

if [ -f "next.config.ts" ]; then
    echo -e "${GREEN}✅ Next.js configurado${NC}"
fi

echo ""
echo -e "${GREEN}🎉 ¡Migración completada!${NC}"
echo ""
echo -e "${BLUE}📝 Próximos pasos:${NC}"
echo ""
echo "  1. Iniciar servidor de desarrollo:"
echo -e "     ${YELLOW}yarn dev${NC}"
echo ""
echo "  2. Abrir en navegador:"
echo -e "     ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "  3. Hacer build de producción:"
echo -e "     ${YELLOW}yarn build${NC}"
echo ""
echo "  4. Deploy a Firebase:"
echo -e "     ${YELLOW}firebase deploy --only hosting${NC}"
echo ""
echo -e "${BLUE}📚 Documentación:${NC}"
echo "  - README_NEXT.md          (Guía completa)"
echo "  - MIGRATION_GUIDE.md      (Guía técnica)"
echo "  - RESUMEN_MIGRACION.md    (Resumen ejecutivo)"
echo ""
echo -e "${GREEN}✨ ¡Éxito! Tu proyecto ahora usa Next.js 15 + Tailwind CSS con Yarn${NC}"
