/**
 * Componente JavaScript para el Footer
 * Maneja funcionalidades dinámicas del pie de página
 */

function initializeFooter() {
  // Actualizar año automáticamente
  updateCopyrightYear();
  
  // Agregar enlaces dinámicos
  addDynamicLinks();
  
  // Agregar información del sistema
  addSystemInfo();
  
  // Agregar eventos para enlaces externos
  handleExternalLinks();
}

// Actualizar el año del copyright automáticamente
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll('#footer-placeholder small');
  
  copyrightElements.forEach(element => {
    if (element.textContent.includes('2025')) {
      element.textContent = element.textContent.replace('2025', currentYear);
    }
  });
}

// Agregar enlaces dinámicos al footer
function addDynamicLinks() {
  const githubLink = document.querySelector('#footer-placeholder a[href*="github"]');
  if (githubLink) {
    githubLink.addEventListener('click', function(e) {
      // Agregar analytics o tracking si es necesario
      console.log('🔗 Click en enlace de GitHub desde footer');
    });
  }
}

// Agregar información del sistema
function addSystemInfo() {
  const footerContainer = document.querySelector('#footer-placeholder .container');
  if (!footerContainer) return;

  // Agregar información de la última actualización
  const lastUpdate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const systemInfoRow = document.createElement('div');
  systemInfoRow.className = 'row mt-2';
  systemInfoRow.innerHTML = `
    <div class="col-12">
      <small class="text-muted">
        <i class="bi bi-clock me-1"></i>
        Última actualización: ${lastUpdate}
      </small>
    </div>
  `;
  
  footerContainer.appendChild(systemInfoRow);
}

// Manejar clicks en enlaces externos
function handleExternalLinks() {
  const externalLinks = document.querySelectorAll('#footer-placeholder a[href^="http"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Abrir enlaces externos en nueva pestaña
      this.target = '_blank';
      this.rel = 'noopener noreferrer';
      
      console.log(`🌐 Abriendo enlace externo: ${this.href}`);
    });
  });
}

// Función para agregar estadísticas dinámicas
function addFooterStats() {
  const footerContainer = document.querySelector('#footer-placeholder .container');
  if (!footerContainer) return;

  const statsRow = document.createElement('div');
  statsRow.className = 'row mt-3 py-3 border-top';
  statsRow.innerHTML = `
    <div class="col-md-3 text-center">
      <small class="text-muted">
        <i class="bi bi-file-earmark-text me-1"></i>
        <span id="page-count">4</span> Páginas
      </small>
    </div>
    <div class="col-md-3 text-center">
      <small class="text-muted">
        <i class="bi bi-code-slash me-1"></i>
        HTML5 + CSS3 + JS
      </small>
    </div>
    <div class="col-md-3 text-center">
      <small class="text-muted">
        <i class="bi bi-palette me-1"></i>
        Bootstrap + Tailwind
      </small>
    </div>
    <div class="col-md-3 text-center">
      <small class="text-muted">
        <i class="bi bi-heart-fill text-danger me-1"></i>
        Hecho con amor
      </small>
    </div>
  `;
  
  footerContainer.appendChild(statsRow);
}

// Función para agregar modo oscuro al footer
function applyFooterTheme() {
  const footer = document.querySelector('#footer-placeholder footer');
  if (!footer) return;

  // Detectar si el modo oscuro está activo
  const isDarkMode = document.body.classList.contains('dark');
  
  if (isDarkMode) {
    footer.classList.add('bg-dark', 'text-light');
    footer.classList.remove('bg-light');
  } else {
    footer.classList.add('bg-light');
    footer.classList.remove('bg-dark', 'text-light');
  }
}

// Escuchar cambios en el modo oscuro
function observeThemeChanges() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        applyFooterTheme();
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Función para agregar enlaces de navegación rápida
function addQuickNavigation() {
  const footerContainer = document.querySelector('#footer-placeholder .container');
  if (!footerContainer) return;

  const quickNavRow = document.createElement('div');
  quickNavRow.className = 'row mt-3 py-2 border-top';
  quickNavRow.innerHTML = `
    <div class="col-12 text-center">
      <small class="text-muted">
        <strong>Navegación rápida:</strong>
        <a href="#inicio" class="text-decoration-none ms-2 me-2">Inicio</a> |
        <a href="#historia" class="text-decoration-none ms-2 me-2">Historia</a> |
        <a href="#contacto" class="text-decoration-none ms-2 me-2">Contacto</a>
      </small>
    </div>
  `;
  
  footerContainer.appendChild(quickNavRow);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que el footer se cargue antes de inicializar
  setTimeout(function() {
    const footerExists = document.querySelector('#footer-placeholder footer');
    if (footerExists) {
      initializeFooter();
      addFooterStats();
      addQuickNavigation();
      observeThemeChanges();
      applyFooterTheme();
      console.log('✓ Footer inicializado correctamente');
    } else {
      // Intentar de nuevo si el footer no está cargado
      setTimeout(arguments.callee, 100);
    }
  }, 200);
});

// Exportar funciones para uso en otros archivos
window.FooterComponent = {
  initializeFooter,
  updateCopyrightYear,
  addFooterStats,
  applyFooterTheme
};
