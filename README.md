# RIMAC - Reto Técnico Frontend

Este proyecto implementa una solución de microfrontends para el reto técnico de RIMAC, utilizando Webpack Module Federation y las tecnologías solicitadas.

## 🏗️ Arquitectura

El proyecto está estructurado como una aplicación de microfrontends con los siguientes módulos:

- **mf-shell**: Aplicación host que orquesta todos los microfrontends
- **mf-home**: Microfrontend para captura de datos del usuario
- **mf-planes**: Microfrontend para selección de planes
- **mf-resumen**: Microfrontend para mostrar el resumen final
- **shared**: Librería compartida con tipos, servicios y utilidades

## 🚀 Tecnologías Utilizadas

- **React.js 18.2.0** con TypeScript
- **Webpack Module Federation** para microfrontends
- **Tailwind CSS** con Sass para estilos
- **React Router** para navegación
- **PostCSS** con Autoprefixer

## 📋 Requerimientos Cumplidos

### Funcionalidades
- ✅ Validación de formularios con campos obligatorios
- ✅ Consumo de APIs (user.json y plans.json)
- ✅ Filtrado de planes por edad del usuario
- ✅ Aplicación de descuento del 5% para "Para alguien más"
- ✅ Navegación automática entre microfrontends
- ✅ Resumen completo con todos los datos

### Criterios de Evaluación
- ✅ **React**: Componentes funcionales con hooks
- ✅ **TypeScript**: Tipado fuerte en toda la aplicación
- ✅ **Clean Code**: Código limpio y escalable
- ✅ **Performance**: Lazy loading y optimizaciones
- ✅ **Diseño Responsive**: Adaptable a diferentes pantallas
- ✅ **Manejo de Estados**: Estado compartido entre microfrontends
- ✅ **Estructura de Carpetas**: Organización clara y escalable
- ✅ **HTML Semántico**: Uso correcto de elementos semánticos

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm 9+

### Instalación
```bash
# Instalar dependencias de todos los microfrontends
npm run install:all
```

### Desarrollo
```bash
# Ejecutar todos los microfrontends en modo desarrollo
npm run dev
```

Esto iniciará:
- mf-shell en http://localhost:3000
- mf-home en http://localhost:3001
- mf-planes en http://localhost:3002
- mf-resumen en http://localhost:3003

### Desarrollo Individual
```bash
# Solo el shell (aplicación host)
npm run dev:shell

# Solo mf-home
npm run dev:home

# Solo mf-planes
npm run dev:planes

# Solo mf-resumen
npm run dev:resumen
```

### Build para Producción
```bash
# Construir todos los microfrontends
npm run build
```

## 📁 Estructura del Proyecto

```
reto-tecnico-rimac/
├── mf-shell/                 # Aplicación host
│   ├── src/
│   │   ├── components/       # Componentes del shell
│   │   ├── styles/          # Estilos globales
│   │   └── App.tsx          # Aplicación principal
│   └── webpack.config.js    # Configuración Webpack
├── mf-home/                 # Microfrontend de datos del usuario
│   ├── src/
│   │   ├── components/      # Formularios y validaciones
│   │   └── App.tsx
│   └── webpack.config.js
├── mf-planes/               # Microfrontend de selección de planes
│   ├── src/
│   │   ├── components/      # Cards de planes y filtros
│   │   └── App.tsx
│   └── webpack.config.js
├── mf-resumen/              # Microfrontend de resumen
│   ├── src/
│   │   ├── components/      # Resumen y confirmación
│   │   └── App.tsx
│   └── webpack.config.js
├── shared/                  # Librería compartida
│   ├── src/
│   │   ├── types/          # Tipos TypeScript
│   │   ├── services/       # Servicios de API
│   │   └── utils/          # Utilidades
│   └── package.json
└── package.json            # Configuración del workspace
```

## 🔄 Flujo de la Aplicación

1. **mf-home**: El usuario completa sus datos personales
2. **mf-planes**: Se muestran los planes filtrados por edad, con opción de descuento
3. **mf-resumen**: Se presenta un resumen completo antes de la confirmación

## 🎨 Diseño y UX

- **Colores RIMAC**: Azul (#1B365D) y Rojo (#EF3340)
- **Tipografía**: Inter (Google Fonts)
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Accesibilidad**: Labels, ARIA attributes y navegación por teclado

## 🧪 Testing

Para implementar pruebas unitarias (requerimiento del reto):

```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Ejecutar tests
npm test
```

## 🚀 Despliegue

### Variables de Entorno
```bash
# Para producción, actualizar las URLs en webpack.config.js
REACT_APP_API_BASE_URL=https://rimac-front-end-challenge.netlify.app/api
```

### Build y Deploy
```bash
# Construir para producción
npm run build

# Los archivos estáticos se generan en:
# - mf-shell/dist/
# - mf-home/dist/
# - mf-planes/dist/
# - mf-resumen/dist/
```

## 🔧 Configuración de Webpack Module Federation

Cada microfrontend está configurado para:
- **Exponer** sus componentes principales
- **Consumir** la librería shared
- **Compartir** React, React-DOM y React Router
- **Comunicarse** via eventos personalizados

## 📱 APIs Consumidas

- **User API**: `https://rimac-front-end-challenge.netlify.app/api/user.json`
- **Plans API**: `https://rimac-front-end-challenge.netlify.app/api/plans.json`

## 🎯 Características Destacadas

- **Escalabilidad**: Fácil agregar nuevos microfrontends
- **Mantenibilidad**: Código modular y bien estructurado
- **Reutilización**: Componentes y utilidades compartidas
- **Performance**: Lazy loading y optimizaciones de bundle
- **Developer Experience**: Hot reload y TypeScript

## 📞 Contacto

Desarrollado para el reto técnico de RIMAC - Frontend Challenge 2025
