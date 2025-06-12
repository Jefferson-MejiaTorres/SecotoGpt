/**
 * Development Cache Monitor
 * Detecta cambios en desarrollo y fuerza recarga de recursos
 */

class DevCacheMonitor {
  constructor() {
    this.isProduction = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1' &&
                      !window.location.hostname.includes('vercel.app');
    
    this.lastCheck = Date.now();
    this.checkInterval = 30000; // 30 segundos
    
    if (!this.isProduction) {
      console.log('🔧 Dev Cache Monitor activado');
      this.startMonitoring();
    }
  }

  startMonitoring() {
    // Verificar cambios periódicamente en desarrollo
    setInterval(() => {
      this.checkForChanges();
    }, this.checkInterval);

    // Listener para cuando la ventana obtiene foco
    window.addEventListener('focus', () => {
      this.checkForChanges();
    });

    // Listener para navegación
    window.addEventListener('beforeunload', () => {
      this.saveLastCheck();
    });
  }

  async checkForChanges() {
    try {
      // Verificar si hay archivos CSS/JS modificados
      const response = await fetch('./scripts/version.json?' + Date.now(), {
        cache: 'no-cache'
      });
      
      const versionInfo = await response.json();
      const storedVersion = localStorage.getItem('dev_version');
      
      if (storedVersion && storedVersion !== versionInfo.version) {
        this.showReloadPrompt();
      }
      
      localStorage.setItem('dev_version', versionInfo.version);
    } catch (error) {
      // Silenciar errores en desarrollo
      console.warn('⚠️ No se pudo verificar cambios:', error.message);
    }
  }

  showReloadPrompt() {
    const shouldReload = confirm(
      '🔄 Se detectaron cambios en el código.\n\n¿Deseas recargar la página para ver las actualizaciones?'
    );
    
    if (shouldReload) {
      this.forceReload();
    }
  }

  forceReload() {
    // Limpiar caché del navegador
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    // Limpiar localStorage relacionado con caché
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache_') || key.startsWith('version_')) {
        localStorage.removeItem(key);
      }
    });
    
    // Recargar con parámetro para evitar caché
    window.location.reload(true);
  }

  saveLastCheck() {
    localStorage.setItem('last_check', this.lastCheck.toString());
  }
}

// Inicializar solo en desarrollo
if (typeof window !== 'undefined') {
  window.devCacheMonitor = new DevCacheMonitor();
}

export default DevCacheMonitor;
