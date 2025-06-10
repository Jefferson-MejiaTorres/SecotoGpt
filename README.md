# 🚀 SecotoGPT - Plataformas Tecnológicas

<div align="center">

![SecotoGPT Logo](./public/logo_secotogpt.svg)

**Una plataforma educativa interactiva para el aprendizaje de Sistemas Operativos y Plataformas Tecnológicas**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://secoto-gpt.vercel.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

## 📖 Descripción

SecotoGPT es una plataforma web educativa diseñada para estudiantes universitarios que cursan materias relacionadas con **Plataformas Tecnológicas** y **Sistemas Operativos**. El proyecto presenta de manera interactiva y visual los conceptos fundamentales de:

- 🖥️ **Sistemas Operativos**: Historia, tipos y funciones principales
- ⚙️ **Gestión de Procesos**: Planificación, estados y control de procesos
- 🧠 **Gestión de Memoria**: Asignación y optimización de memoria RAM
- 💾 **Gestión de Almacenamiento**: Sistemas de archivos y gestión de discos

## ✨ Características

### 🎨 **Diseño Moderno**
- Interfaz responsiva y elegante
- Modo oscuro/claro integrado
- Animaciones suaves con CSS y Animate.css
- Paleta de colores pasteles personalizada

### 🔧 **Tecnologías Avanzadas**
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Frameworks CSS**: TailwindCSS + Bootstrap 5
- **Herramientas**: PostCSS, Autoprefixer, Stylelint
- **Despliegue**: Vercel con CI/CD automático

### 📱 **Experiencia de Usuario**
- Navegación intuitiva y accesible
- Búsqueda integrada
- Contenido organizado por módulos
- Optimizado para dispositivos móviles

## 🚀 Demo en Vivo

🔗 **[Ver SecotoGPT en Vercel](https://secoto-gpt.vercel.app)**

## 📸 Capturas de Pantalla

<div align="center">

### 🌅 Modo Claro
![Modo Claro](./docs/screenshots/light-mode.png)

### 🌙 Modo Oscuro
![Modo Oscuro](./docs/screenshots/dark-mode.png)

### 📱 Versión Móvil
![Versión Móvil](./docs/screenshots/mobile-view.png)

</div>

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** v18+ 
- **npm** v8+
- **Git**

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/Jefferson-MejiaTorres/SecotoGpt.git
cd SecotoGpt
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar el Entorno de Desarrollo
```bash
# Construir CSS optimizado
npm run build

# Iniciar servidor de desarrollo
npm run dev
```

### 4️⃣ Abrir en el Navegador
```
http://localhost:3000
```

## 📋 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | 🔧 Inicia servidor de desarrollo |
| `npm run build` | 🏗️ Construye CSS para producción |
| `npm run build-css` | 👀 Modo watch para desarrollo CSS |
| `npm run lint-css` | 🧹 Limpia y corrige CSS |
| `npm start` | 🚀 Alias para `npm run dev` |

## 📁 Estructura del Proyecto

```
SecotoGpt/
├── 📄 index.html              # Página principal
├── 📦 package.json            # Configuración del proyecto
├── ⚙️ postcss.config.js       # Configuración PostCSS
├── 🎨 tailwind.config.js      # Configuración TailwindCSS
├── 🚀 vercel.json             # Configuración de despliegue
├── 📁 public/                 # Recursos estáticos
│   ├── 🖼️ logo_secotogpt.svg  # Logo del proyecto
│   └── 🎨 tailwind.css        # CSS compilado
├── 📁 src/                    # Código fuente
│   ├── 📁 componentes/        # Componentes JavaScript
│   │   ├── 🧩 header.js       # Lógica del header
│   │   └── 🌙 modoOscuro.js   # Modo oscuro/claro
│   ├── 📁 estilos/            # Archivos CSS
│   │   ├── ✨ animaciones.css # Animaciones personalizadas
│   │   ├── 🔧 bootstrap-fixes.css # Correcciones Bootstrap
│   │   └── 🎨 principal.css   # Estilos principales
│   ├── 📁 paginas/            # Páginas del sitio
│   │   ├── 🖥️ sistemas_operativos.html
│   │   ├── ⚙️ gestion_procesos.html
│   │   ├── 🧠 gestion_memoria.html
│   │   └── 💾 gestion_almacenamiento.html
│   └── 📁 utils/              # Utilidades
│       └── 🛠️ utilidades.js   # Funciones helper
└── 📁 .vscode/                # Configuración VS Code
    ├── ⚙️ settings.json       # Configuración del editor
    └── 🚀 launch.json         # Configuración de depuración
```

## 🎯 Módulos Educativos

### 1. 🖥️ Sistemas Operativos
**Conceptos cubiertos:**
- Historia y evolución de los SO
- Tipos de sistemas operativos
- Funciones principales
- Arquitectura del sistema

### 2. ⚙️ Gestión de Procesos
**Conceptos cubiertos:**
- Estados de los procesos
- Planificación de CPU
- Algoritmos de scheduling
- Sincronización de procesos

### 3. 🧠 Gestión de Memoria
**Conceptos cubiertos:**
- Administración de memoria
- Memoria virtual
- Paginación y segmentación
- Algoritmos de reemplazo

### 4. 💾 Gestión de Almacenamiento
**Conceptos cubiertos:**
- Sistemas de archivos
- Estructura de directorios
- Métodos de acceso
- Gestión de espacio libre

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub con Vercel
2. La configuración en `vercel.json` se aplicará automáticamente
3. Cada push despliega automáticamente

### Alternativas
- **Netlify**: Drag & drop de la carpeta del proyecto
- **GitHub Pages**: Habilitar en la configuración del repositorio
- **Surge.sh**: `npm install -g surge && surge`

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 📝 Guías de Contribución
- Sigue las convenciones de código existentes
- Añade comentarios descriptivos
- Actualiza la documentación si es necesario
- Prueba tus cambios antes de enviar

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Jefferson Mejía Torres**
- 🐙 GitHub: [@Jefferson-MejiaTorres](https://github.com/Jefferson-MejiaTorres)
- 📧 Email: secotogpt@universidad.edu
- 🎓 Universidad: Facultad de Ingeniería

## 🙏 Agradecimientos

- 🎨 **TailwindCSS** por el framework CSS utility-first
- 🅱️ **Bootstrap** por los componentes base
- ⚡ **Vercel** por el hosting gratuito
- 🎭 **Animate.css** por las animaciones
- 🔧 **PostCSS** por las herramientas de procesamiento

## 📈 Estadísticas del Proyecto

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/Jefferson-MejiaTorres/SecotoGpt?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Jefferson-MejiaTorres/SecotoGpt?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Jefferson-MejiaTorres/SecotoGpt)
![GitHub Last Commit](https://img.shields.io/github/last-commit/Jefferson-MejiaTorres/SecotoGpt)

</div>

## 🔮 Roadmap

- [ ] 🌐 Soporte multiidioma (Inglés/Español)
- [ ] 📊 Integración de gráficos interactivos
- [ ] 🧪 Tests automatizados
- [ ] 📱 PWA (Progressive Web App)
- [ ] 🔍 Búsqueda avanzada con filtros
- [ ] 📚 Sistema de evaluaciones online
- [ ] 🎮 Simuladores interactivos de SO

---

<div align="center">

**⭐ Si este proyecto te ayudó, considera darle una estrella ⭐**

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=Jefferson-MejiaTorres.SecotoGpt)

**Hecho con ❤️ por estudiantes, para estudiantes**

</div>
