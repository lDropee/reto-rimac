#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando proyecto RIMAC - Microfrontends...\n');

// Función para ejecutar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📦 Ejecutando: ${command}`);
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    console.log('✅ Completado\n');
  } catch (error) {
    console.error(`❌ Error ejecutando: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Función para verificar si existe un directorio
function directoryExists(dirPath) {
  return fs.existsSync(dirPath);
}

// Función para crear directorio si no existe
function ensureDirectoryExists(dirPath) {
  if (!directoryExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Directorio creado: ${dirPath}`);
  }
}

// Verificar Node.js
console.log('🔍 Verificando Node.js...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Se requiere Node.js 18 o superior');
  console.error(`   Versión actual: ${nodeVersion}`);
  process.exit(1);
}
console.log(`✅ Node.js ${nodeVersion} detectado\n`);

// Instalar dependencias del workspace principal
console.log('📦 Instalando dependencias del workspace principal...');
runCommand('npm install');

// Instalar dependencias de cada microfrontend
const microfrontends = ['mf-shell', 'mf-home', 'mf-planes', 'mf-resumen', 'shared'];

microfrontends.forEach(mf => {
  if (directoryExists(mf)) {
    console.log(`📦 Instalando dependencias de ${mf}...`);
    runCommand('npm install', path.join(process.cwd(), mf));
  } else {
    console.log(`⚠️  Directorio ${mf} no encontrado, saltando...`);
  }
});

// Crear archivo de configuración de desarrollo
console.log('⚙️  Creando configuración de desarrollo...');
const devConfig = `# Configuración de desarrollo para RIMAC Microfrontends

## Puertos utilizados:
# mf-shell: http://localhost:3000
# mf-home: http://localhost:3001  
# mf-planes: http://localhost:3002
# mf-resumen: http://localhost:3003

## Comandos disponibles:
# npm run dev - Ejecutar todos los microfrontends
# npm run dev:shell - Solo el shell
# npm run dev:home - Solo mf-home
# npm run dev:planes - Solo mf-planes
# npm run dev:resumen - Solo mf-resumen

## APIs:
# User: https://rimac-front-end-challenge.netlify.app/api/user.json
# Plans: https://rimac-front-end-challenge.netlify.app/api/plans.json
`;

fs.writeFileSync('.env.development', devConfig);
console.log('✅ Archivo .env.development creado');

// Verificar que todos los archivos necesarios existen
console.log('🔍 Verificando estructura del proyecto...');
const requiredFiles = [
  'package.json',
  'mf-shell/package.json',
  'mf-home/package.json', 
  'mf-planes/package.json',
  'mf-resumen/package.json',
  'shared/package.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Faltan archivos críticos. Por favor, verifica la estructura del proyecto.');
  process.exit(1);
}

console.log('\n🎉 ¡Configuración completada exitosamente!');
console.log('\n📋 Próximos pasos:');
console.log('1. Ejecuta: npm run dev');
console.log('2. Abre http://localhost:3000 en tu navegador');
console.log('3. ¡Comienza a desarrollar! 🚀\n');

console.log('📚 Documentación disponible en README.md');
console.log('🔧 Configuración de desarrollo en .env.development\n');
