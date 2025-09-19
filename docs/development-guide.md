# Guía de Desarrollo - RIMAC Microfrontends

## 🚀 Inicio Rápido

### 1. Configuración Inicial
```bash
# Clonar el repositorio
git clone <repository-url>
cd reto-tecnico-rimac

# Configurar el proyecto (instala dependencias y verifica estructura)
npm run setup

# Iniciar desarrollo
npm run dev
```

### 2. Acceso a la Aplicación
- **Aplicación Principal**: http://localhost:3000
- **mf-home**: http://localhost:3001
- **mf-planes**: http://localhost:3002
- **mf-resumen**: http://localhost:3003

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
# Ejecutar todos los microfrontends
npm run dev

# Ejecutar microfrontends individualmente
npm run dev:shell    # Solo el shell (host)
npm run dev:home     # Solo mf-home
npm run dev:planes   # Solo mf-planes
npm run dev:resumen  # Solo mf-resumen
```

### Build
```bash
# Construir todos los microfrontends
npm run build

# Construir individualmente
npm run build:shared
npm run build:home
npm run build:planes
npm run build:resumen
npm run build:shell
```

### Limpieza
```bash
# Limpiar node_modules
npm run clean

# Limpiar builds
npm run clean:build
```

## 📁 Estructura de Desarrollo

### mf-shell (Host Application)
```
mf-shell/
├── src/
│   ├── components/          # Componentes del shell
│   │   ├── Header.tsx      # Header con navegación
│   │   └── LoadingSpinner.tsx
│   ├── styles/             # Estilos globales
│   │   └── globals.scss
│   ├── App.tsx             # Aplicación principal
│   └── index.tsx           # Punto de entrada
├── public/
│   └── index.html
├── webpack.config.js       # Configuración Webpack
├── tailwind.config.js      # Configuración Tailwind
└── package.json
```

### mf-home (User Data)
```
mf-home/
├── src/
│   ├── components/         # Componentes del formulario
│   │   ├── UserForm.tsx   # Formulario principal
│   │   ├── FormField.tsx  # Campo de formulario
│   │   ├── CheckboxField.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── styles/
│   │   └── globals.scss
│   ├── App.tsx
│   └── index.tsx
└── webpack.config.js
```

### mf-planes (Plan Selection)
```
mf-planes/
├── src/
│   ├── components/         # Componentes de planes
│   │   ├── PlanSelection.tsx  # Selección principal
│   │   ├── PlanCard.tsx       # Card de plan
│   │   ├── PlanSlider.tsx     # Slider móvil
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── styles/
│   │   └── globals.scss
│   ├── App.tsx
│   └── index.tsx
└── webpack.config.js
```

### mf-resumen (Summary)
```
mf-resumen/
├── src/
│   ├── components/         # Componentes de resumen
│   │   ├── SummaryCard.tsx    # Resumen principal
│   │   ├── UserInfoCard.tsx   # Info del usuario
│   │   ├── PlanInfoCard.tsx   # Info del plan
│   │   └── ActionButtons.tsx  # Botones de acción
│   ├── styles/
│   │   └── globals.scss
│   ├── App.tsx
│   └── index.tsx
└── webpack.config.js
```

### shared (Shared Library)
```
shared/
├── src/
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts
│   ├── services/           # Servicios de API
│   │   └── api.ts
│   ├── utils/              # Utilidades
│   │   └── validation.ts
│   └── index.ts            # Exportaciones principales
├── tsconfig.json
└── package.json
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno
Crear archivo `.env.local` en la raíz del proyecto:
```bash
# APIs
REACT_APP_API_BASE_URL=https://rimac-front-end-challenge.netlify.app/api

# Puertos (opcional, por defecto)
REACT_APP_SHELL_PORT=3000
REACT_APP_HOME_PORT=3001
REACT_APP_PLANES_PORT=3002
REACT_APP_RESUMEN_PORT=3003
```

### Configuración de TypeScript
Cada microfrontend tiene su propio `tsconfig.json` que extiende la configuración base:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### Configuración de Tailwind
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'rimac-blue': '#1B365D',
        'rimac-red': '#EF3340',
        'rimac-gray': '#6F7C87',
        'rimac-light-gray': '#F7F8FA',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
```

## 🎨 Guía de Estilos

### Colores RIMAC
```scss
:root {
  --rimac-blue: #1B365D;      // Color principal
  --rimac-red: #EF3340;       // Color de acento
  --rimac-gray: #6F7C87;      // Color secundario
  --rimac-light-gray: #F7F8FA; // Color de fondo
}
```

### Clases de Utilidad
```scss
// Botones
.btn-primary    // Botón principal (rojo)
.btn-secondary  // Botón secundario (gris)
.btn-outline    // Botón con borde (azul)

// Formularios
.rimac-input    // Input con estilos RIMAC
.form-group     // Contenedor de campo
.form-label     // Label de campo
.form-error     // Mensaje de error

// Cards
.rimac-card     // Card con estilos RIMAC
```

### Metodología BEM
```scss
// Bloque
.user-form {
  // Elemento
  &__section {
    // Modificador
    &--highlighted {
    }
  }
}
```

## 🔄 Flujo de Desarrollo

### 1. Desarrollo de un Nuevo Microfrontend
```bash
# 1. Crear directorio
mkdir mf-nuevo

# 2. Copiar estructura base de otro microfrontend
cp -r mf-home/* mf-nuevo/

# 3. Actualizar package.json con nuevo nombre
# 4. Actualizar webpack.config.js con nuevo puerto
# 5. Actualizar mf-shell para incluir el nuevo microfrontend
```

### 2. Agregar Nuevo Componente Compartido
```bash
# 1. Crear componente en shared/src/components/
# 2. Exportar en shared/src/index.ts
# 3. Importar en el microfrontend que lo necesite
```

### 3. Modificar API o Tipos
```bash
# 1. Actualizar tipos en shared/src/types/
# 2. Actualizar servicios en shared/src/services/
# 3. Rebuild shared: npm run build:shared
# 4. Los microfrontends detectarán los cambios automáticamente
```

## 🧪 Testing

### Configuración de Testing
```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Crear archivo jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@rimac/shared$': '<rootDir>/../shared/src'
  }
};
```

### Ejecutar Tests
```bash
# Tests de un microfrontend específico
cd mf-home && npm test

# Tests de todos los microfrontends
npm run test:all
```

## 🐛 Debugging

### Herramientas de Debug
1. **React DevTools**: Para inspeccionar componentes
2. **Webpack DevTools**: Para analizar bundles
3. **Network Tab**: Para verificar carga de microfrontends
4. **Console**: Para logs y errores

### Debugging de Module Federation
```javascript
// En webpack.config.js, agregar:
devtool: 'source-map',

// Para debugging de microfrontends
console.log('Microfrontend cargado:', __webpack_require__.cache);
```

### Errores Comunes
1. **Puerto ocupado**: Cambiar puerto en webpack.config.js
2. **Módulo no encontrado**: Verificar configuración de Module Federation
3. **CORS errors**: Verificar headers en webpack dev server
4. **TypeScript errors**: Verificar configuración de paths

## 📦 Build y Deploy

### Build para Producción
```bash
# 1. Construir todos los microfrontends
npm run build

# 2. Los archivos se generan en:
# - mf-shell/dist/
# - mf-home/dist/
# - mf-planes/dist/
# - mf-resumen/dist/
# - shared/dist/
```

### Configuración de Deploy
```bash
# 1. Actualizar URLs en webpack.config.js para producción
# 2. Configurar servidor web para servir archivos estáticos
# 3. Configurar CORS para microfrontends
# 4. Configurar CDN para assets estáticos
```

## 🔒 Seguridad

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;">
```

### Validación de Datos
- Validación en cliente con TypeScript
- Validación en servidor (cuando se implemente)
- Sanitización de inputs
- Escape de HTML

## 📊 Performance

### Optimizaciones Implementadas
1. **Lazy Loading**: Microfrontends se cargan bajo demanda
2. **Code Splitting**: Cada microfrontend es un chunk separado
3. **Tree Shaking**: Eliminación de código no utilizado
4. **Minificación**: Código minificado en producción
5. **Caching**: Headers de cache para assets estáticos

### Métricas a Monitorear
- Tiempo de carga inicial
- Tiempo de navegación entre microfrontends
- Tamaño de bundles
- Tiempo de respuesta de APIs
