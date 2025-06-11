/**
 * Script de depuración para el menú móvil
 * Este script ayuda a solucionar problemas con el menú móvil
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Función para comprobar el estado del menú móvil
  function checkMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuItems = document.querySelectorAll('.mobile-nav-item');
    
    console.log('=== ESTADO DEL MENÚ MÓVIL ===');
    console.log('Menú móvil encontrado:', !!mobileMenu);
    
    if (mobileMenu) {
      console.log('Clase "show":', mobileMenu.classList.contains('show'));
      console.log('Display:', window.getComputedStyle(mobileMenu).display);
      console.log('Visibility:', window.getComputedStyle(mobileMenu).visibility);
      console.log('Transform:', window.getComputedStyle(mobileMenu).transform);
      console.log('Z-index:', window.getComputedStyle(mobileMenu).zIndex);
      console.log('Elementos del menú:', menuItems.length);
      
      // Verificar cada elemento del menú
      menuItems.forEach((item, index) => {
        console.log(`Elemento ${index+1}:`, {
          display: window.getComputedStyle(item).display,
          opacity: window.getComputedStyle(item).opacity,
          transform: window.getComputedStyle(item).transform
        });
      });
    }
  }
  
  // Comprueba si hay problemas con las rutas de CSS
  function checkCSSLinks() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('=== COMPROBACIÓN DE HOJAS DE ESTILO ===');
    
    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      console.log(`${index+1}. ${href}`, {loaded: link.sheet !== null});
      
      // Intentar detectar hojas de estilo que puedan estar causando problemas
      if (href.includes('menu-mobile-fix.css')) {
        console.log('   ✓ Encontrada hoja de corrección del menú móvil');
      }
    });
  }
  
  // Verificar el botón del menú móvil
  function checkMenuButton() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    console.log('=== BOTÓN DEL MENÚ MÓVIL ===');
    console.log('Botón encontrado:', !!menuBtn);
    
    if (menuBtn) {
      console.log('aria-expanded:', menuBtn.getAttribute('aria-expanded'));
      
      // Agregar un listener de clic para verificar cuando se hace clic
      menuBtn.addEventListener('click', function() {
        console.log('Clic en botón del menú móvil detectado');
        
        // Verificar el estado después de un breve retraso
        setTimeout(checkMobileMenu, 100);
        setTimeout(checkMobileMenu, 500); // Verificar de nuevo después de las animaciones
      });
    }
  }
  
  // Verificar que HeaderManager esté inicializado correctamente
  function checkHeaderManager() {
    console.log('=== HEADER MANAGER ===');
    console.log('HeaderManager global:', !!window.HeaderManager);
    
    if (window.HeaderManager) {
      // Verificar si existe una instancia activa
      const headerInstance = document.querySelector('.modern-header');
      console.log('Instancia del header encontrada:', !!headerInstance);
    }
  }
  
  // Ejecutar comprobaciones iniciales
  setTimeout(() => {
    console.log('Iniciando diagnóstico del menú móvil...');
    checkCSSLinks();
    checkHeaderManager();
    checkMenuButton();
    checkMobileMenu();
    
    console.log('Diagnóstico completado. Verificar la consola para detalles.');
  }, 1000);
});

// Aplicar correcciones adicionales en tiempo de ejecución
setTimeout(() => {
  // Asegurarse de que los elementos del menú móvil sean visibles
  const menuItems = document.querySelectorAll('.mobile-nav-item');
  menuItems.forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'translateX(0)';
    item.style.display = 'block';
  });
  
  // Corregir posible problema con el botón del menú
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir comportamiento por defecto
      
      // Forzar la apertura manual del menú si es necesario
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        const isOpen = mobileMenu.classList.contains('show');
        
        if (!isOpen) {
          // Abrir el menú manualmente
          mobileMenu.style.display = 'block';
          mobileMenu.style.visibility = 'visible';
          mobileMenu.style.transform = 'translateY(0)';
          mobileMenu.classList.add('show');
          
          // Mostrar elementos del menú
          menuItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          });
          
          menuBtn.setAttribute('aria-expanded', 'true');
          console.log('Menú abierto manualmente');
        } else {
          // Cerrar el menú manualmente
          mobileMenu.classList.remove('show');
          setTimeout(() => {
            mobileMenu.style.display = 'none';
            mobileMenu.style.visibility = 'hidden';
          }, 300);
          
          menuBtn.setAttribute('aria-expanded', 'false');
          console.log('Menú cerrado manualmente');
        }
      }
    }, true); // Usar captura para interceptar el evento antes
  }
}, 2000);
