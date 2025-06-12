# 🔄 Sistema de Cache Busting - SecotoGPT

## 📋 Descripción

Este sistema resuelve los problemas de caché del navegador que requerían usar pestañas incógnito para ver los cambios en producción. Ahora los usuarios verán automáticamente las actualizaciones sin necesidad de limpiar caché manualmente.

## 🎯 Características Implementadas

### 1. **Configuración de Headers Inteligente**
- **HTML**: No se cachea (`max-age=0, must-revalidate`)
- **CSS/JS**: Cache corto con revalidación (`max-age=3600, stale-while-revalidate=86400`)
- **Imágenes**: Cache largo para recursos estáticos (`max-age=31536000, immutable`)

### 2. **Cache Busting Automático**
- Genera versiones únicas para archivos CSS/JS locales
- Script automático que agrega parámetros `?v=timestamp.buildId`
- Integrado en el proceso de build

### 3. **Service Worker Inteligente**
- Controla el cacheo de forma granular
- Estrategias diferentes por tipo de archivo:
  - **Network First**: Para HTML y scripts críticos
  - **Cache First**: Para imágenes y recursos estáticos
  - **Stale While Revalidate**: Para CSS/JS locales

### 4. **Detección de Entorno**
- **Desarrollo**: Sin caché, auto-reload
- **Staging**: Cache corto, notificaciones de actualización
- **Producción**: Cache optimizado, notificaciones elegantes

### 5. **Notificaciones de Actualización**
- Detecta automáticamente nuevas versiones
- Interfaz elegante para notificar actualizaciones
- Opción de actualizar o postponer

## 🚀 Uso

### Build para Producción
```bash
npm run build
```
Este comando:
1. Compila el CSS con Tailwind/PostCSS
2. Ejecuta el cache busting automático
3. Genera versiones únicas para todos los archivos

### Desarrollo Local
```bash
npm run dev
```
En desarrollo:
- Auto-detección de cambios
- Recarga automática
- Sin caché para desarrollo ágil

### Solo Cache Busting
```bash
npm run cache-bust
```
Ejecuta únicamente el sistema de versionado automático.

## 📁 Archivos del Sistema

```
scripts/
├── cache-bust.js          # Script principal de cache busting
└── version.json           # Información de la versión actual

src/utils/
├── cache-buster.js        # Cliente de cache busting
├── environment-config.js  # Configuración por entorno
└── dev-cache-monitor.js   # Monitor de desarrollo

sw.js                      # Service Worker
vercel.json                # Configuración de headers
```

## ⚙️ Configuración por Entorno

### Desarrollo (`localhost`)
```javascript
{
  cacheTTL: 0,
  enableServiceWorker: false,
  enableAutoReload: true,
  checkInterval: 5000
}
```

### Staging (`preview.vercel.app`)
```javascript
{
  cacheTTL: 300,
  enableServiceWorker: true,
  enableAutoReload: false,
  checkInterval: 30000
}
```

### Producción (`secoto-gpt.vercel.app`)
```javascript
{
  cacheTTL: 3600,
  enableServiceWorker: true,
  enableAutoReload: false,
  checkInterval: 300000
}
```

## 🔧 Headers de Cache en Vercel

### HTML
```
Cache-Control: public, max-age=0, must-revalidate
```

### CSS/JS
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

### Imágenes/Assets
```
Cache-Control: public, max-age=31536000, immutable
```

## 🎨 Notificaciones de Usuario

El sistema muestra notificaciones elegantes cuando hay actualizaciones:

- **Diseño moderno** con gradientes y animaciones
- **Auto-dismiss** después de 10-15 segundos
- **Botones de acción** para actualizar o postponer
- **Información de versión** y fecha de build

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome 54+, Firefox 50+, Safari 15.4+)
- ✅ **Service Workers** (soporte opcional)
- ✅ **Dispositivos móviles**
- ✅ **Modo offline** (cache inteligente)

## 🔍 Debugging

### Ver información del entorno:
```javascript
console.log(window.environmentConfig.getConfig());
```

### Forzar actualización de cache:
```javascript
window.cacheBuster.forceReload();
```

### Verificar versión actual:
```javascript
console.log(window.cacheBuster.version);
```

## 🚀 Deployment

### Vercel (Automático)
1. Push a la rama principal
2. Vercel ejecuta automáticamente `npm run build`
3. Los headers se aplican según `vercel.json`
4. El cache busting se ejecuta automáticamente

### Manual
1. `npm run build`
2. Subir archivos al servidor
3. Asegurar que los headers estén configurados

## ✅ Verificación

Para verificar que el sistema funciona:

1. **Headers**: Usar DevTools → Network → Ver headers de respuesta
2. **Versiones**: Ver parámetros `?v=` en archivos CSS/JS
3. **Service Worker**: DevTools → Application → Service Workers
4. **Cache**: DevTools → Application → Storage

## 📈 Beneficios

- ✅ **No más pestañas incógnito** necesarias
- ✅ **Actualizaciones automáticas** para usuarios
- ✅ **Performance optimizada** con cache inteligente
- ✅ **Experiencia de usuario mejorada**
- ✅ **SEO friendly** (no afecta indexación)
- ✅ **Compatible con CDN** y edge caching

## 🆘 Resolución de Problemas

### Si los cambios no se ven:
1. Verificar que `npm run build` se ejecutó
2. Comprobar versiones en archivos CSS/JS
3. Limpiar cache del navegador manualmente (temporal)
4. Verificar headers en Network tab

### En desarrollo:
1. Usar `npm run dev` para auto-reload
2. Verificar que localhost está detectado correctamente
3. Comprobar consola para logs de debug

---
