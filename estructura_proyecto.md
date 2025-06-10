# Estructura del Proyecto SecotoGPT

Este documento describe la arquitectura y organización del proyecto SecotoGPT.

## 📁 Estructura de Directorios

```
SecotoGpt/
├── 📄 index.html                    # Página principal del sitio
├── 📦 package.json                  # Configuración de dependencias y scripts
├── ⚙️ postcss.config.js             # Configuración para PostCSS y Autoprefixer
├── 🎨 tailwind.config.js            # Configuración de TailwindCSS
├── 🚀 vercel.json                   # Configuración para despliegue en Vercel
├── 📜 README.md                     # Documentación principal del proyecto
├── ⚖️ LICENSE                       # Licencia del proyecto
├── 📋 estructura_proyecto.md        # Este archivo
├── 📁 public/                       # Recursos estáticos públicos
│   ├── 🖼️ logo_secotogpt.svg        # Logo principal del proyecto
│   └── 🎨 tailwind.css              # CSS compilado y optimizado
├── 📁 src/                          # Código fuente del proyecto
│   ├── 📁 componentes/              # Componentes JavaScript reutilizables
│   │   ├── 🧩 header.js             # Lógica del componente header
│   │   └── 🌙 modoOscuro.js         # Funcionalidad de modo oscuro/claro
│   ├── 📁 estilos/                  # Archivos de estilos CSS
│   │   ├── ✨ animaciones.css       # Animaciones personalizadas
│   │   ├── 🔧 bootstrap-fixes.css   # Correcciones de compatibilidad Bootstrap
│   │   └── 🎨 principal.css         # Estilos principales del proyecto
│   ├── 📁 paginas/                  # Páginas HTML del sitio
│   │   ├── 🖥️ sistemas_operativos.html     # Módulo: Introducción a SO
│   │   ├── ⚙️ gestion_procesos.html        # Módulo: Gestión de Procesos
│   │   ├── 🧠 gestion_memoria.html         # Módulo: Gestión de Memoria
│   │   └── 💾 gestion_almacenamiento.html  # Módulo: Gestión de Almacenamiento
│   └── 📁 utils/                    # Utilidades y funciones helper
│       └── 🛠️ utilidades.js         # Funciones de utilidad general
└── 📁 .vscode/                      # Configuración de Visual Studio Code
    ├── ⚙️ settings.json             # Configuración del editor
    ├── 🚀 launch.json               # Configuración de depuración
    └── 📋 SecotoGpt.code-workspace  # Workspace de VS Code
```

## 🏗️ Arquitectura del Proyecto

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y grid/flexbox
- **JavaScript ES6+**: Lógica interactiva y componentes modulares

### Frameworks y Librerías
- **TailwindCSS**: Framework CSS utility-first
- **Bootstrap 5**: Componentes y sistema de grid
- **Animate.css**: Biblioteca de animaciones CSS

### Herramientas de Desarrollo
- **PostCSS**: Procesamiento y optimización de CSS
- **Autoprefixer**: Prefijos automáticos para compatibilidad
- **Stylelint**: Linting y formateo de CSS
- **Live-server**: Servidor de desarrollo con hot-reload

### Despliegue
- **Vercel**: Plataforma de hosting con CI/CD automático
- **GitHub**: Control de versiones y colaboración

## 📋 Convenciones de Código

### HTML
- Uso de elementos semánticos (`<header>`, `<main>`, `<section>`)
- Atributos `alt` en todas las imágenes
- Estructura accesible con ARIA labels

### CSS
- Nomenclatura BEM para clases personalizadas
- Variables CSS para colores y espaciado
- Mobile-first responsive design

### JavaScript
- Módulos ES6 para organización
- Funciones arrow y const/let
- Comentarios descriptivos

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  --color-se: #a8edea;    /* Aqua suave */
  --color-co: #fed6e3;    /* Rosa pastel */
  --color-to: #d299c2;    /* Púrpura suave */
  --color-gpt: #ffd89b;   /* Amarillo cálido */
}
```

### Tipografía
- **Poppins**: Logo y títulos principales
- **System fonts**: Texto del cuerpo para mejor rendimiento

### Componentes
- Cards responsivas con hover effects
- Botones con estados interactivos
- Navegación sticky responsive
- Toggle de modo oscuro/claro

## 🔧 Scripts NPM

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Inicia servidor de desarrollo |
| `build` | `npm run build` | Construye CSS para producción |
| `build-css` | `npm run build-css` | Modo watch para desarrollo |
| `lint-css` | `npm run lint-css` | Lint y corrección de CSS |
| `start` | `npm start` | Alias para dev |

## 🚀 Proceso de Despliegue

1. **Desarrollo Local**: `npm run dev`
2. **Build de Producción**: `npm run build`
3. **Push a GitHub**: Git commit y push
4. **Despliegue Automático**: Vercel detecta cambios y despliega

## 📱 Responsividad

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Estrategia
- Mobile-first CSS
- Grid y Flexbox para layouts
- Imágenes responsive
- Tipografía escalable

## 🔍 SEO y Performance

### Meta Tags
- Título descriptivo por página
- Meta description relevante
- Open Graph para redes sociales
- Favicon optimizado

### Performance
- CSS minificado en producción
- Imágenes SVG optimizadas
- Lazy loading para contenido
- Prefetch de recursos críticos

## 🧪 Testing y Calidad

### Herramientas
- **Stylelint**: Calidad de CSS
- **HTML Validator**: Validación HTML
- **Lighthouse**: Performance y SEO
- **Cross-browser testing**: Compatibilidad

### Estándares
- Accesibilidad WCAG 2.1
- Progressive Enhancement
- Graceful Degradation
- Web Performance Budgets
