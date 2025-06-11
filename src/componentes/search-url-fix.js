/**
 * Correcciones de URL para el buscador en SeCoToGpt
 * Este script corrige problemas con las URLs relativas en el buscador
 */

// Esperar a que HeaderManager esté disponible
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    fixSearchUrls();
  }, 1000); // Dar tiempo para que HeaderManager se inicialice
});

/**
 * Función principal para corregir las URLs en los datos de búsqueda
 */
function fixSearchUrls() {
  // Asegurarse de que HeaderManager esté disponible
  if (!window.HeaderManager) {
    console.error('HeaderManager no está disponible');
    return;
  }
  
  // Obtener todas las instancias del buscador y aplicar correcciones
  const headerInstance = document.querySelector('.modern-header');
  if (!headerInstance) {
    console.error('No se encontró el header moderno');
    return;
  }
  
  // Aplicar parche al sistema de búsqueda
  const searchLinks = document.querySelectorAll('.suggestion-item');
  
  searchLinks.forEach(link => {
    const url = link.dataset.url;
    
    if (url && (url.startsWith('./') || !url.startsWith('/'))) {
      // Convertir URL relativa a absoluta
      const absoluteUrl = convertToAbsoluteUrl(url);
      link.dataset.url = absoluteUrl;
      console.log(`URL corregida: ${url} -> ${absoluteUrl}`);
    }
  });
  
  // Parche para el click handler
  applyClickHandlerPatch();
  
  console.log('✅ Correcciones de URL aplicadas al buscador');
}

/**
 * Convierte una URL relativa a absoluta basada en la raíz del sitio
 */
function convertToAbsoluteUrl(url) {
  if (url.startsWith('./')) {
    // Quitar el punto inicial
    return url.replace('./', '/');
  } else if (!url.startsWith('/') && !url.startsWith('http') && !url.startsWith('#')) {
    // Agregar barra al inicio si no la tiene
    return '/' + url;
  }
  return url;
}

/**
 * Aplica un parche al manejador de clics para asegurar que las URLs se procesen correctamente
 */
function applyClickHandlerPatch() {
  // Verificar si existe un método handleSuggestionClick en el prototipo de HeaderManager
  if (!window.HeaderManager.prototype.handleSuggestionClick) {
    console.error('No se encontró el método handleSuggestionClick');
    return;
  }
  
  // Guardar referencia al método original
  const originalMethod = window.HeaderManager.prototype.handleSuggestionClick;
  
  // Reemplazar con nuestra versión mejorada
  window.HeaderManager.prototype.handleSuggestionClick = function(suggestion) {
    const url = suggestion.dataset.url;
    
    // Corregir la URL si es necesario antes de llamar al método original
    if (url && (url.startsWith('./') || !url.startsWith('/'))) {
      suggestion.dataset.url = convertToAbsoluteUrl(url);
      console.log(`URL corregida en tiempo real: ${url} -> ${suggestion.dataset.url}`);
    }
    
    // Llamar al método original con los datos corregidos
    return originalMethod.call(this, suggestion);
  };
  
  console.log('✅ Parche aplicado al manejador de clics');
}

// Detectar cambios en la página (SPA)
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(fixSearchUrls, 500);
  }
}).observe(document, {subtree: true, childList: true});
