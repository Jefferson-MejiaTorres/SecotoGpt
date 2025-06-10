/**
 * Cargador de componentes HTML reutilizables
 * Permite incluir header, footer y otros componentes en múltiples páginas
 * Versión 2.0 - Con detección automática de rutas
 */

class ComponentLoader {
  constructor() {
    console.log('🎯 Inicializando ComponentLoader...');
    this.basePath = this.detectBasePath();
    console.log('📍 BasePath establecido:', this.basePath);
    this.init();
  }// Detecta la ruta base según la ubicación actual
  detectBasePath() {
    const currentPath = window.location.pathname;
    console.log('🔍 Detectando ruta base para:', currentPath);
    
    // Si estamos en una página secundaria (contiene "PaginaSecundarias")
    if (currentPath.includes('PaginaSecundarias')) {
      console.log('📂 Detectado: PaginaSecundarias - usando ruta ../../../../');
      return '../../../../'; // Desde PaginaPrincipal/PaginaSecundarias/[Area]/
    }
    // Si estamos en src/paginas/
    else if (currentPath.includes('src/paginas/')) {
      console.log('📂 Detectado: src/paginas/ - usando ruta ../../');
      return '../../'; // Desde src/paginas/
    }
    // Si estamos en la raíz del proyecto
    else {
      console.log('📂 Detectado: raíz - usando ruta ./');
      return './'; // Desde la raíz
    }
  }

  async init() {
    await this.loadAllComponents();
  }
  // Función para cargar contenido HTML desde archivos externos
  async loadComponent(selector, filePath) {
    console.log(`🔄 Intentando cargar: ${selector} desde ${filePath}`);
    
    try {
      const response = await fetch(filePath);
      console.log(`📡 Respuesta fetch para ${filePath}:`, response.status, response.ok);
      
      if (!response.ok) {
        throw new Error(`Error al cargar ${filePath}: ${response.status}`);
      }
      const html = await response.text();
      console.log(`📄 HTML recibido para ${selector}: ${html.length} caracteres`);
      
      const element = document.querySelector(selector);
      console.log(`🎯 Elemento encontrado para ${selector}:`, !!element);
      
      if (element) {
        element.innerHTML = html;
        console.log(`✅ Componente cargado: ${filePath}`);
        
        // Post-procesamiento específico por componente
        await this.postProcessComponent(selector, element);
      } else {
        console.error(`❌ Selector no encontrado: ${selector}`);
      }
    } catch (error) {
      console.error(`❌ Error cargando componente ${filePath}:`, error);
      this.showFallbackComponent(selector);
    }
  }
  // Post-procesamiento después de cargar componentes
  async postProcessComponent(selector, element) {
    if (selector === '#header-placeholder') {
      this.setupHeaderPaths(element);
    } else if (selector === '#footer-placeholder') {
      this.setupFooterPaths(element);
    }
  }

  // Ajusta las rutas del header según la ubicación actual
  setupHeaderPaths(headerElement) {    // Ajustar rutas de imágenes
    const logoImg = headerElement.querySelector('.logo-img, img[src*="logo_secotogpt.svg"]');
    if (logoImg) {
      logoImg.src = this.basePath + 'imagenes/logo_secotogpt.svg';
    }

    // Ajustar enlaces de navegación
    const homeLink = headerElement.querySelector('a[href*="secotogpt.html"]');
    if (homeLink) {
      homeLink.href = this.basePath + 'secotogpt.html';
    }    const systemsLink = headerElement.querySelector('a[href*="sistemas_operativos.html"]');
    if (systemsLink) {
      systemsLink.href = this.basePath + 'src/paginas/sistemas_operativos.html';
    }
  }
  // Ajusta las rutas del footer según la ubicación actual
  setupFooterPaths(footerElement) {
    // Ajustar rutas de imágenes del footer
    const footerLogoImg = footerElement.querySelector('.footer-logo-image, img[src*="logo_secotogpt.svg"]');
    if (footerLogoImg) {
      footerLogoImg.src = this.basePath + 'imagenes/logo_secotogpt.svg';
    }

    // Ajustar enlaces de navegación del footer
    const footerLinks = footerElement.querySelectorAll('a[href]');
    footerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('./')) {
        link.href = this.basePath + href.substring(2);
      }
    });
  }
  // Función para cargar múltiples componentes
  async loadAllComponents() {
    console.log('🚀 Iniciando carga de componentes con basePath:', this.basePath);
    
    const components = [
      { 
        selector: '#header-placeholder', 
        path: this.basePath + 'src/partes/header.html' 
      },
      { 
        selector: '#footer-placeholder', 
        path: this.basePath + 'src/partes/footer.html' 
      }
    ];

    console.log('📋 Componentes a cargar:', components);

    // Cargar todos los componentes en paralelo
    const loadPromises = components.map(component => 
      this.loadComponent(component.selector, component.path)
    );

    try {
      await Promise.all(loadPromises);
      console.log('✓ Todos los componentes han sido cargados');
      
      // Inicializar funcionalidades después de cargar los componentes
      this.initializeComponents();
    } catch (error) {
      console.error('✗ Error cargando algunos componentes:', error);
    }
  }

  // Función para inicializar funcionalidades de los componentes cargados
  initializeComponents() {
    // Re-ejecutar scripts que dependen del DOM actualizado
    if (typeof initializeModoOscuro === 'function') {
      initializeModoOscuro();
    }
    
    // Inicializar el nuevo header manager
    if (typeof HeaderManager !== 'undefined') {
      if (!window.headerManager) {
        window.headerManager = new HeaderManager();
      }
    }
    
    if (typeof initializeFooter === 'function') {
      initializeFooter();
    }
  }

  // Componente de fallback en caso de error
  showFallbackComponent(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    if (selector === '#header-placeholder') {
      element.innerHTML = `
        <header class="bg-white shadow-sm">
          <nav class="container d-flex align-items-center justify-content-between py-3">
            <a href="${this.basePath}secotogpt.html" class="text-decoration-none">
              <h1 class="mb-0 fw-bold">SeCoToGpt</h1>
            </a>
            <div class="d-flex align-items-center gap-3">
              <a href="${this.basePath}secotogpt.html" class="nav-link">Inicio</a>
            </div>
          </nav>
        </header>
      `;
    } else if (selector === '#footer-placeholder') {
      element.innerHTML = `
        <footer class="text-center py-4 mt-5 bg-light">
          <div class="container">
            <p class="mb-0 text-muted">&copy; 2025 SeCoToGpt</p>
          </div>
        </footer>
      `;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 DOM Content Loaded - Inicializando ComponentLoader');
  if (!window.componentLoader) {
    console.log('🏗️ Creando nueva instancia de ComponentLoader');
    window.componentLoader = new ComponentLoader();
  } else {
    console.log('♻️ ComponentLoader ya existe');
  }
});

// Exportar para uso en otros archivos
window.ComponentLoader = ComponentLoader;
