/**
 * Cache Buster Utility
 * Genera versiones automáticas para evitar problemas de caché
 */

class CacheBuster {
  constructor() {
    this.version = this.generateVersion();
    this.init();
  }

  generateVersion() {
    // Generar version basada en timestamp y build
    const timestamp = Date.now();
    const buildId = Math.random().toString(36).substring(2, 8);
    return `v${timestamp}.${buildId}`;
  }
  init() {
    console.log(`🔄 Cache Buster inicializado - Versión: ${this.version}`);
    
    // Registrar Service Worker si está disponible
    this.registerServiceWorker();
    
    // Agregar versión a los parámetros de query para CSS y JS
    this.bustCache();
    
    // Configurar headers para prevenir caché
    this.setNoCacheHeaders();
    
    // Verificar si hay una nueva versión disponible
    this.checkForUpdates();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registrado:', registration);
        
        // Listener para actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
        // Verificar si hay un SW esperando
        if (registration.waiting) {
          this.showUpdateNotification();
        }
        
      } catch (error) {
        console.warn('⚠️ No se pudo registrar Service Worker:', error);
      }
    }
  }

  bustCache() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll('script[src]');
    
    // Agregar versión a CSS
    links.forEach(link => {
      if (link.href && !link.href.includes('cdn.') && !link.href.includes('?v=')) {
        const separator = link.href.includes('?') ? '&' : '?';
        link.href += `${separator}v=${this.version}`;
      }
    });
    
    // Agregar versión a JS (solo a archivos locales)
    scripts.forEach(script => {
      if (script.src && 
          !script.src.includes('cdn.') && 
          !script.src.includes('bootstrap') &&
          !script.src.includes('?v=') &&
          script.src.includes(window.location.origin)) {
        const separator = script.src.includes('?') ? '&' : '?';
        script.src += `${separator}v=${this.version}`;
      }
    });
  }

  setNoCacheHeaders() {
    // Configurar meta tags para prevenir caché de HTML
    const existingMeta = document.querySelector('meta[http-equiv="Cache-Control"]');
    if (!existingMeta) {
      const metaCache = document.createElement('meta');
      metaCache.setAttribute('http-equiv', 'Cache-Control');
      metaCache.setAttribute('content', 'no-cache, no-store, must-revalidate');
      document.head.appendChild(metaCache);

      const metaPragma = document.createElement('meta');
      metaPragma.setAttribute('http-equiv', 'Pragma');
      metaPragma.setAttribute('content', 'no-cache');
      document.head.appendChild(metaPragma);

      const metaExpires = document.createElement('meta');
      metaExpires.setAttribute('http-equiv', 'Expires');
      metaExpires.setAttribute('content', '0');
      document.head.appendChild(metaExpires);
    }
  }

  checkForUpdates() {
    // Verificar actualizaciones cada 5 minutos
    setInterval(() => {
      this.pingForUpdates();
    }, 5 * 60 * 1000);
  }

  async pingForUpdates() {
    try {
      // Hacer una petición al archivo principal para verificar cambios
      const response = await fetch(window.location.href, {
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      // Si hay cambios, notificar al usuario
      const lastModified = response.headers.get('Last-Modified');
      const currentModified = sessionStorage.getItem('lastModified');
      
      if (currentModified && lastModified !== currentModified) {
        this.showUpdateNotification();
      }
      
      sessionStorage.setItem('lastModified', lastModified);
    } catch (error) {
      console.warn('⚠️ No se pudo verificar actualizaciones:', error);
    }
  }

  showUpdateNotification() {
    // Crear notificación de actualización disponible
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.innerHTML = `
      <div class="update-notification-content">
        <div class="update-icon">🔄</div>
        <div class="update-text">
          <strong>Nueva versión disponible</strong>
          <p>Hay actualizaciones del sitio web</p>
        </div>
        <button class="update-btn" onclick="window.cacheBuster.forceReload()">
          Actualizar
        </button>
        <button class="dismiss-btn" onclick="window.cacheBuster.dismissNotification()">
          ✕
        </button>
      </div>
    `;
    
    // Agregar estilos para la notificación
    if (!document.getElementById('update-notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'update-notification-styles';
      styles.textContent = `
        #update-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: slideInRight 0.5s ease;
          max-width: 350px;
        }
        
        .update-notification-content {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }
        
        .update-icon {
          font-size: 24px;
          animation: spin 2s linear infinite;
        }
        
        .update-text strong {
          display: block;
          margin-bottom: 4px;
        }
        
        .update-text p {
          margin: 0;
          opacity: 0.8;
          font-size: 14px;
        }
        
        .update-btn {
          background: white;
          color: #667eea;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .update-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .dismiss-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          opacity: 0.7;
        }
        
        .dismiss-btn:hover {
          opacity: 1;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-dismiss después de 10 segundos
    setTimeout(() => {
      this.dismissNotification();
    }, 10000);
  }
  forceReload() {
    // Limpiar caché del service worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        if (event.data.success) {
          console.log('🗑️ Cache del Service Worker limpiado');
        }
      };
      
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE'
      }, [channel.port2]);
    }
    
    // Limpiar caché del navegador
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Activar nuevo service worker si está esperando
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    
    // Recargar sin caché
    window.location.reload(true);
  }

  dismissNotification() {
    const notification = document.getElementById('update-notification');
    if (notification) {
      notification.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }

  // Método estático para usar en otras partes del código
  static addVersionToUrl(url) {
    const version = window.cacheBuster ? window.cacheBuster.version : Date.now();
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${version}`;
  }
}

// Inicializar automáticamente si estamos en el navegador
if (typeof window !== 'undefined') {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.cacheBuster = new CacheBuster();
    });
  } else {
    window.cacheBuster = new CacheBuster();
  }
}

// Export para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CacheBuster;
}
