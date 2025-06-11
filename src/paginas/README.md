# Páginas de Sistemas Operativos - SeCoToGpt

## Estructura de las Páginas

Cada página de sistema operativo sigue una estructura consistente y moderna:

```
src/paginas/
├── SistemasOperativos/
│   ├── PrincipalSistemasOperativos.html
│   ├── estilos/
│   │   └── PrincipalSistemasOperativos.css
│   └── js/
│       └── PrincipalSistemasOperativos.js
├── GestionAlmacenamiento/
│   ├── PrincipalGestionAlmacenamiento.html
│   ├── estilos/
│   │   └── PrincipalGestionAlmacenamiento.css
│   └── js/
│       └── PrincipalGestionAlmacenamiento.js
├── GestionMemoria/
│   ├── PrincipalGestionMemoria.html
│   ├── estilos/
│   │   └── PrincipalGestionMemoria.css
│   └── js/
│       └── PrincipalGestionMemoria.js
└── GestionProcesos/
    ├── PrincipalGestionProcesos.html
    ├── estilos/
    │   └── PrincipalGestionProcesos.css
    └── js/
        └── PrincipalGestionProcesos.js
```

## Características de cada página

### 🔧 Sistemas Operativos
- **URL**: `src/paginas/SistemasOperativos/PrincipalSistemasOperativos.html`
- **Tema**: Azul tecnológico
- **Contenido**: Introducción general a sistemas operativos

### 🗄️ Gestión de Almacenamiento
- **URL**: `src/paginas/GestionAlmacenamiento/PrincipalGestionAlmacenamiento.html`
- **Tema**: Naranja/Amarillo (almacenamiento)
- **Contenido**: Sistemas de archivos, discos, particiones
- **Características especiales**:
  - Animaciones de flotación para simular datos
  - Efectos de brillo dorado
  - Iconos temáticos de almacenamiento

### 🧠 Gestión de Memoria
- **URL**: `src/paginas/GestionMemoria/PrincipalGestionMemoria.html`
- **Tema**: Verde (memoria)
- **Contenido**: RAM, memoria virtual, paginación
- **Características especiales**:
  - Barra de uso de memoria simulada
  - Animaciones de pulso y memoria
  - Monitor en tiempo real del uso de memoria

### ⚙️ Gestión de Procesos
- **URL**: `src/paginas/GestionProcesos/PrincipalGestionProcesos.html`
- **Tema**: Azul/Morado (procesos)
- **Contenido**: Estados, planificación, hilos
- **Características especiales**:
  - Simulador de estados de procesos
  - Monitor de procesos en tiempo real
  - Animaciones 3D y efectos de rotación

## Funcionalidades comunes

### ✨ Características técnicas:
- **Responsive Design**: Adaptable a todos los dispositivos
- **Modo Oscuro**: Soporte completo para tema oscuro
- **Animaciones**: Efectos fluidos y modernos
- **Componentes Reutilizables**: Header y Footer dinámicos
- **Performance**: Carga optimizada y lazy loading

### 🎨 Efectos visuales:
- Gradientes específicos por tema
- Animaciones de entrada escalonadas
- Efectos hover interactivos
- Transiciones suaves
- Partículas y efectos especiales

### 📱 Compatibilidad:
- Bootstrap 5.3.3
- Animate.css
- Bootstrap Icons
- Tailwind CSS
- Google Fonts (Poppins)

## Cómo agregar una nueva página

1. **Crear la estructura de carpetas**:
```bash
mkdir src/paginas/NuevaPagina
mkdir src/paginas/NuevaPagina/estilos
mkdir src/paginas/NuevaPagina/js
```

2. **Copiar y adaptar archivos base**:
   - Usar `PrincipalSistemasOperativos.html` como plantilla
   - Crear CSS específico en `estilos/`
   - Crear JavaScript en `js/`

3. **Personalizar**:
   - Cambiar colores en las variables CSS
   - Adaptar el contenido HTML
   - Configurar animaciones específicas
   - Actualizar el JavaScript manager

4. **Integrar**:
   - Agregar enlaces en el header/footer
   - Actualizar el buscador
   - Probar en diferentes dispositivos

## Mantenimiento

### 🔧 ComponentLoader
El `ComponentLoader` maneja automáticamente las rutas para páginas en subcarpetas. No necesita configuración adicional.

### 🎯 Debugging
Cada página incluye logs en consola para facilitar el debugging:
- `🎯 Inicializando [Página] Manager...`
- `✅ Componentes cargados correctamente`
- `🎨 Inicializando animaciones...`

### 📈 Performance
- Las animaciones se cargan de forma lazy
- Los componentes se inicializan después del DOM
- Se incluye limpieza automática de eventos

## URLs de acceso

- **Sistemas Operativos**: `/src/paginas/SistemasOperativos/PrincipalSistemasOperativos.html`
- **Gestión de Almacenamiento**: `/src/paginas/GestionAlmacenamiento/PrincipalGestionAlmacenamiento.html`
- **Gestión de Memoria**: `/src/paginas/GestionMemoria/PrincipalGestionMemoria.html`
- **Gestión de Procesos**: `/src/paginas/GestionProcesos/PrincipalGestionProcesos.html`

---

**Nota**: Todas las páginas están listas para desarrollo y pueden servir como base para expandir el contenido educativo del proyecto SeCoToGpt.
