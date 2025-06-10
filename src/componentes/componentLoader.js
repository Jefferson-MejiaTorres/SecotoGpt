/**
 * Cargador de componentes HTML reutilizables
 * Permite incluir header, footer y otros componentes en múltiples páginas
 */

// Función para cargar contenido HTML desde archivos externos
async function loadComponent(selector, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error al cargar ${filePath}: ${response.status}`);
    }
    const html = await response.text();    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = html;
      console.log(`✓ Componente cargado: ${filePath}`);
      
      // Debug específico para el header
      if (selector === '#header-placeholder') {
        setTimeout(() => {
          const logoImg = document.querySelector('.logo-img');
          if (logoImg) {
            console.log('✓ Logo encontrado en DOM:', logoImg.src);
            logoImg.addEventListener('load', () => console.log('✓ Logo cargado exitosamente'));
            logoImg.addEventListener('error', (e) => {
              console.error('✗ Error cargando logo:', e);
              console.log('Ruta intentada:', logoImg.src);
            });
          } else {
            console.error('✗ Logo no encontrado en DOM');
          }
        }, 100);
      }
    } else {
      console.error(`✗ Selector no encontrado: ${selector}`);
    }
  } catch (error) {
    console.error(`✗ Error cargando componente ${filePath}:`, error);
  }
}

// Función para cargar múltiples componentes
async function loadComponents() {
  const components = [
    { selector: '#header-placeholder', path: './src/partes/header.html' },
    { selector: '#footer-placeholder', path: './src/partes/footer.html' }
  ];

  // Cargar todos los componentes en paralelo
  const loadPromises = components.map(component => 
    loadComponent(component.selector, component.path)
  );

  try {
    await Promise.all(loadPromises);
    console.log('✓ Todos los componentes han sido cargados');
    
    // Inicializar funcionalidades después de cargar los componentes
    initializeComponents();
  } catch (error) {
    console.error('✗ Error cargando algunos componentes:', error);
  }
}

// Función para inicializar funcionalidades de los componentes cargados
function initializeComponents() {
  // Re-ejecutar scripts que dependen del DOM actualizado
  if (typeof initializeModoOscuro === 'function') {
    initializeModoOscuro();
  }
  
  // Inicializar el nuevo header manager
  if (typeof HeaderManager !== 'undefined') {
    if (!window.headerManager) {
      window.headerManager = new HeaderManager();
    }
  } else if (typeof initializeHeader === 'function') {
    initializeHeader();
  }
  
  if (typeof initializeFooter === 'function') {
    initializeFooter();
  }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadComponents);

// Exportar funciones para uso en otros archivos
window.ComponentLoader = {
  loadComponent,
  loadComponents,
  initializeComponents
};
