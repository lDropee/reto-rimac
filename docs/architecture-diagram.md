# Diagrama de Arquitectura - RIMAC Microfrontends

## 🏗️ Arquitectura General

```mermaid
graph TB
    subgraph "Browser - Port 3000"
        Shell[mf-shell<br/>Host Application<br/>React Router]
    end
    
    subgraph "Microfrontends"
        Home[mf-home<br/>User Data Capture<br/>Port 3001]
        Planes[mf-planes<br/>Plan Selection<br/>Port 3002]
        Resumen[mf-resumen<br/>Summary & Confirmation<br/>Port 3003]
    end
    
    subgraph "Shared Library"
        Types[TypeScript Types<br/>User, Plan, FormData]
        Services[API Services<br/>User & Plans APIs]
        Utils[Utilities<br/>Validation, Calculations]
    end
    
    subgraph "External APIs"
        UserAPI[RIMAC User API<br/>user.json]
        PlansAPI[RIMAC Plans API<br/>plans.json]
    end
    
    Shell -->|Loads| Home
    Shell -->|Loads| Planes
    Shell -->|Loads| Resumen
    
    Home -->|Imports| Types
    Home -->|Imports| Services
    Home -->|Imports| Utils
    
    Planes -->|Imports| Types
    Planes -->|Imports| Services
    Planes -->|Imports| Utils
    
    Resumen -->|Imports| Types
    Resumen -->|Imports| Services
    Resumen -->|Imports| Utils
    
    Services -->|Fetches| UserAPI
    Services -->|Fetches| PlansAPI
    
    Home -.->|Custom Events| Shell
    Planes -.->|Custom Events| Shell
    Resumen -.->|Custom Events| Shell
```

## 🔄 Flujo de Usuario

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as mf-shell
    participant H as mf-home
    participant P as mf-planes
    participant R as mf-resumen
    participant API as APIs

    U->>S: Accede a la aplicación
    S->>H: Carga mf-home
    H->>API: Obtiene datos del usuario
    API-->>H: Retorna user.json
    U->>H: Completa formulario
    H->>S: Envía evento USER_DATA_UPDATED
    S->>P: Navega a mf-planes
    P->>API: Obtiene planes
    API-->>P: Retorna plans.json
    P->>P: Filtra planes por edad
    U->>P: Selecciona plan
    P->>S: Envía evento PLAN_SELECTED
    S->>R: Navega a mf-resumen
    R->>R: Muestra resumen completo
    U->>R: Confirma compra
```

## 🏛️ Estructura de Componentes

```mermaid
graph TD
    subgraph "mf-shell Components"
        ShellApp[App.tsx]
        Header[Header.tsx]
        LoadingSpinner[LoadingSpinner.tsx]
    end
    
    subgraph "mf-home Components"
        HomeApp[App.tsx]
        UserForm[UserForm.tsx]
        FormField[FormField.tsx]
        CheckboxField[CheckboxField.tsx]
    end
    
    subgraph "mf-planes Components"
        PlanesApp[App.tsx]
        PlanSelection[PlanSelection.tsx]
        PlanCard[PlanCard.tsx]
        PlanSlider[PlanSlider.tsx]
    end
    
    subgraph "mf-resumen Components"
        ResumenApp[App.tsx]
        SummaryCard[SummaryCard.tsx]
        UserInfoCard[UserInfoCard.tsx]
        PlanInfoCard[PlanInfoCard.tsx]
        ActionButtons[ActionButtons.tsx]
    end
    
    subgraph "Shared Components"
        Types[Types & Interfaces]
        Services[API Services]
        Utils[Validation & Utils]
    end
    
    ShellApp --> Header
    ShellApp --> LoadingSpinner
    
    HomeApp --> UserForm
    UserForm --> FormField
    UserForm --> CheckboxField
    
    PlanesApp --> PlanSelection
    PlanSelection --> PlanCard
    PlanSelection --> PlanSlider
    
    ResumenApp --> SummaryCard
    ResumenApp --> UserInfoCard
    ResumenApp --> PlanInfoCard
    ResumenApp --> ActionButtons
    
    HomeApp --> Types
    HomeApp --> Services
    HomeApp --> Utils
    
    PlanesApp --> Types
    PlanesApp --> Services
    PlanesApp --> Utils
    
    ResumenApp --> Types
    ResumenApp --> Services
    ResumenApp --> Utils
```

## 🔧 Configuración de Webpack Module Federation

```mermaid
graph LR
    subgraph "mf-shell (Host)"
        ShellConfig[ModuleFederationPlugin<br/>name: 'shell'<br/>remotes: mfHome, mfPlanes, mfResumen]
    end
    
    subgraph "mf-home (Remote)"
        HomeConfig[ModuleFederationPlugin<br/>name: 'mfHome'<br/>exposes: './App']
    end
    
    subgraph "mf-planes (Remote)"
        PlanesConfig[ModuleFederationPlugin<br/>name: 'mfPlanes'<br/>exposes: './App']
    end
    
    subgraph "mf-resumen (Remote)"
        ResumenConfig[ModuleFederationPlugin<br/>name: 'mfResumen'<br/>exposes: './App']
    end
    
    subgraph "shared (Library)"
        SharedConfig[Package<br/>@rimac/shared<br/>Types, Services, Utils]
    end
    
    ShellConfig -->|Consumes| HomeConfig
    ShellConfig -->|Consumes| PlanesConfig
    ShellConfig -->|Consumes| ResumenConfig
    
    HomeConfig -->|Imports| SharedConfig
    PlanesConfig -->|Imports| SharedConfig
    ResumenConfig -->|Imports| SharedConfig
```

## 📊 Estados y Comunicación

```mermaid
stateDiagram-v2
    [*] --> Home: Usuario accede
    
    state Home {
        [*] --> LoadingUser: Cargando datos
        LoadingUser --> FormReady: Datos cargados
        FormReady --> Validating: Usuario completa formulario
        Validating --> FormValid: Validación exitosa
        FormValid --> SendingData: Enviando datos
        SendingData --> [*]: Datos enviados
    }
    
    Home --> Planes: USER_DATA_UPDATED
    
    state Planes {
        [*] --> LoadingPlans: Cargando planes
        LoadingPlans --> PlansReady: Planes cargados
        PlansReady --> Filtering: Filtrando por edad
        Filtering --> ShowingPlans: Mostrando planes
        ShowingPlans --> SelectingPlan: Usuario selecciona
        SelectingPlan --> PlanSelected: Plan seleccionado
        PlanSelected --> [*]: Navegando a resumen
    }
    
    Planes --> Resumen: PLAN_SELECTED
    
    state Resumen {
        [*] --> LoadingData: Cargando datos
        LoadingData --> ShowingSummary: Mostrando resumen
        ShowingSummary --> Confirming: Usuario confirma
        Confirming --> Completed: Compra completada
        Completed --> [*]: Proceso finalizado
    }
    
    Resumen --> Home: Editar datos
    Resumen --> Planes: Cambiar plan
```

## 🎯 Tecnologías y Dependencias

```mermaid
graph TB
    subgraph "Frontend Technologies"
        React[React 18.2.0]
        TypeScript[TypeScript 5.3.3]
        Tailwind[Tailwind CSS 3.3.6]
        Sass[Sass 1.69.5]
    end
    
    subgraph "Build Tools"
        Webpack[Webpack 5.89.0]
        ModuleFed[Module Federation]
        Babel[Babel Loader]
        PostCSS[PostCSS + Autoprefixer]
    end
    
    subgraph "Development Tools"
        DevServer[Webpack Dev Server]
        HMR[Hot Module Replacement]
        Concurrently[Concurrently 8.2.2]
    end
    
    subgraph "External Dependencies"
        ReactRouter[React Router DOM 6.20.1]
        TailwindForms[Tailwind Forms 0.5.7]
    end
    
    React --> Webpack
    TypeScript --> Webpack
    Tailwind --> PostCSS
    Sass --> Webpack
    Webpack --> ModuleFed
    Webpack --> Babel
    PostCSS --> Webpack
    Webpack --> DevServer
    DevServer --> HMR
    Concurrently --> DevServer
    React --> ReactRouter
    Tailwind --> TailwindForms
```

## 🔒 Seguridad y Validación

```mermaid
graph TD
    subgraph "Client-Side Security"
        InputValidation[Input Validation<br/>TypeScript + Custom Rules]
        XSSProtection[XSS Protection<br/>React's Built-in Escaping]
        CSRFProtection[CSRF Protection<br/>Same-Origin Policy]
    end
    
    subgraph "Data Flow Security"
        TypeSafety[Type Safety<br/>TypeScript Interfaces]
        DataSanitization[Data Sanitization<br/>Input Cleaning]
        EventValidation[Event Validation<br/>Custom Event Types]
    end
    
    subgraph "API Security"
        CORSConfig[CORS Configuration<br/>Allowed Origins]
        HTTPSOnly[HTTPS Only<br/>Secure Transport]
        APIValidation[API Response Validation<br/>Type Checking]
    end
    
    InputValidation --> TypeSafety
    XSSProtection --> DataSanitization
    CSRFProtection --> EventValidation
    TypeSafety --> CORSConfig
    DataSanitization --> HTTPSOnly
    EventValidation --> APIValidation
```

Este diagrama muestra la arquitectura completa del sistema de microfrontends de RIMAC, incluyendo la comunicación entre módulos, el flujo de datos, y las tecnologías utilizadas.
