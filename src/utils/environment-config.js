/**
 * Environment Detection & Cache Configuration
 * Detecta el entorno y configura el cacheo apropiadamente
 */

class EnvironmentConfig {
  constructor() {
    this.environment = this.detectEnvironment();
    this.config = this.getConfigForEnvironment();
    this.init();
  }

  detectEnvironment() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1' || port === '3000') {
      return 'development';
    } else if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
      return 'production';
    } else if (hostname.includes('staging') || hostname.includes('preview')) {
      return 'staging';
    } else {
      return 'production';
    }
  }

  getConfigForEnvironment() {
    const configs = {
      development: {
        cacheTTL: 0,
        enableServiceWorker: false,
        enableAutoReload: true,
        enableVersionCheck: true,
        checkInterval: 5000, // 5 segundos
        enableDebugLogs: true
      },
      staging: {
        cacheTTL: 300, // 5 minutos
        enableServiceWorker: true,
        enableAutoReload: false,
        enableVersionCheck: true,
        checkInterval: 30000, // 30 segundos
        enableDebugLogs: true
      },
      production: {
        cacheTTL: 3600, // 1 hora
        enableServiceWorker: true,
        enableAutoReload: false,
        enableVersionCheck: true,
        checkInterval: 300000, // 5 minutos
        enableDebugLogs: false
      }
    };

    return configs[this.environment];
  }

  init() {
    if (this.config.enableDebugLogs) {
      console.log(`🌍 Environment: ${this.environment}`);
      console.log(`⚙️ Config:`, this.config);
    }

    // Configurar headers de caché basado en el entorno
    this.setCacheHeaders();
    
    // Configurar reload automático si está habilitado
    if (this.config.enableAutoReload) {
      this.setupAutoReload();
    }
    
    // Configurar verificación de versiones
    if (this.config.enableVersionCheck) {
      this.setupVersionCheck();
    }
  }

  setCacheHeaders() {
    const metaElements = [
      { name: 'Cache-Control', content: this.getCacheControlValue() },
      { name: 'Pragma', content: this.environment === 'development' ? 'no-cache' : 'cache' },
      { name: 'Expires', content: this.environment === 'development' ? '0' : '3600' }
    ];

    metaElements.forEach(meta => {
      let element = document.querySelector(`meta[http-equiv="${meta.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('http-equiv', meta.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', meta.content);
    });
  }

  getCacheControlValue() {
    switch (this.environment) {
      case 'development':
        return 'no-cache, no-store, must-revalidate';
      case 'staging':
        return 'public, max-age=300, must-revalidate';
      case 'production':
        return 'public, max-age=3600, stale-while-revalidate=86400';
      default:
        return 'public, max-age=3600';
    }
  }

  setupAutoReload() {
    // Escuchar cambios en archivos (solo desarrollo)
    if (this.environment === 'development') {
      let lastModified = null;
      
      const checkForChanges = async () => {
        try {
          const response = await fetch(window.location.href, { 
            method: 'HEAD',
            cache: 'no-cache'
          });
          
          const currentModified = response.headers.get('Last-Modified');
          
          if (lastModified && currentModified !== lastModified) {
            if (this.config.enableDebugLogs) {
              console.log('🔄 Cambios detectados, recargando...');
            }
            window.location.reload(true);
          }
          
          lastModified = currentModified;
        } catch (error) {
          if (this.config.enableDebugLogs) {
            console.warn('⚠️ Error checking for changes:', error);
          }
        }
      };

      setInterval(checkForChanges, this.config.checkInterval);
    }
  }

  setupVersionCheck() {
    const checkVersion = async () => {
      try {
        const response = await fetch('./scripts/version.json?' + Date.now(), {
          cache: 'no-cache'
        });
        
        if (response.ok) {
          const versionInfo = await response.json();
          const storedVersion = sessionStorage.getItem('app_version');
          
          if (storedVersion && storedVersion !== versionInfo.version) {
            this.notifyVersionChange(versionInfo);
          }
          
          sessionStorage.setItem('app_version', versionInfo.version);
        }
      } catch (error) {
        if (this.config.enableDebugLogs) {
          console.warn('⚠️ Error checking version:', error);
        }
      }
    };

    // Verificar inmediatamente
    setTimeout(checkVersion, 1000);
    
    // Verificar periódicamente
    setInterval(checkVersion, this.config.checkInterval);
  }

  notifyVersionChange(versionInfo) {
    if (this.environment === 'development') {
      // En desarrollo, recargar automáticamente
      window.location.reload(true);
    } else {
      // En staging/producción, mostrar notificación
      this.showUpdateNotification(versionInfo);
    }
  }

  showUpdateNotification(versionInfo) {
    // Crear notificación elegante
    const notification = document.createElement('div');
    notification.id = 'env-update-notification';
    notification.innerHTML = `
      <div class="env-notification-content">
        <div class="env-notification-icon">✨</div>
        <div class="env-notification-text">
          <strong>Nueva versión disponible</strong>
          <p>Versión ${versionInfo.version}</p>
          <small>Construida: ${new Date(versionInfo.buildTime).toLocaleString()}</small>
        </div>
        <button class="env-update-btn" onclick="window.environmentConfig.forceUpdate()">
          Actualizar
        </button>
        <button class="env-dismiss-btn" onclick="window.environmentConfig.dismissNotification()">
          ✕
        </button>
      </div>
    `;

    // Agregar estilos si no existen
    this.addNotificationStyles();
    
    document.body.appendChild(notification);
    
    // Auto-dismiss después de 15 segundos
    setTimeout(() => {
      this.dismissNotification();
    }, 15000);
  }

  addNotificationStyles() {
    if (document.getElementById('env-notification-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'env-notification-styles';
    styles.textContent = `
      #env-update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10001;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideInFromRight 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        max-width: 380px;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .env-notification-content {
        display: flex;
        align-items: flex-start;
        padding: 20px;
        gap: 15px;
      }
      
      .env-notification-icon {
        font-size: 28px;
        animation: pulse 2s infinite;
        flex-shrink: 0;
      }
      
      .env-notification-text {
        flex: 1;
      }
      
      .env-notification-text strong {
        display: block;
        font-size: 16px;
        margin-bottom: 4px;
      }
      
      .env-notification-text p {
        margin: 0 0 4px 0;
        font-size: 14px;
        opacity: 0.9;
      }
      
      .env-notification-text small {
        font-size: 12px;
        opacity: 0.7;
      }
      
      .env-update-btn {
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 8px;
        backdrop-filter: blur(10px);
      }
      
      .env-update-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-1px);
      }
      
      .env-dismiss-btn {
        background: transparent;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 8px;
        opacity: 0.7;
        border-radius: 6px;
        transition: all 0.3s ease;
      }
      
      .env-dismiss-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
      }
      
      @keyframes slideInFromRight {
        from {
          transform: translateX(100%) scale(0.9);
          opacity: 0;
        }
        to {
          transform: translateX(0) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  forceUpdate() {
    // Limpiar todos los caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    // Limpiar storage
    sessionStorage.clear();
    localStorage.removeItem('app_version');
    
    // Recargar
    window.location.reload(true);
  }

  dismissNotification() {
    const notification = document.getElementById('env-update-notification');
    if (notification) {
      notification.style.animation = 'slideInFromRight 0.4s cubic-bezier(0.23, 1, 0.32, 1) reverse';
      setTimeout(() => {
        notification.remove();
      }, 400);
    }
  }

  // Método público para obtener configuración
  getConfig() {
    return { environment: this.environment, ...this.config };
  }
}

// Inicializar automáticamente
if (typeof window !== 'undefined') {
  window.environmentConfig = new EnvironmentConfig();
}

export default EnvironmentConfig;
