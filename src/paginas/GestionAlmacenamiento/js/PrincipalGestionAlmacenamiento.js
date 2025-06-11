/**
 * JavaScript específico para la página de Gestión de Almacenamiento
 * Funcionalidades: animaciones, interacciones y efectos específicos
 */

class GestionAlmacenamientoManager {
  constructor() {
    this.initialized = false;
    this.init();
  }

  async init() {
    console.log('🗄️ Inicializando Gestión de Almacenamiento Manager...');
    
    // Esperar a que los componentes se carguen
    await this.waitForComponents();
    
    // Inicializar funcionalidades
    this.initializeStorageAnimations();
    this.initializeCardInteractions();
    this.initializeScrollEffects();
    this.removeLoadingClass();
    
    this.initialized = true;
    console.log('✅ Gestión de Almacenamiento Manager inicializado');
  }

  async waitForComponents() {
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      const header = document.querySelector('#header-placeholder .modern-header');
      const footer = document.querySelector('#footer-placeholder .footer-modern');
      
      if (header && footer) {
        console.log('✅ Componentes cargados correctamente');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    console.warn('⚠️ Componentes tardaron en cargar, continuando...');
  }

  initializeStorageAnimations() {
    console.log('🎨 Inicializando animaciones de almacenamiento...');
    
    // Animación especial para el hero
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
      heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.transform = 'scale(1.05) rotateY(5deg)';
        heroTitle.style.textShadow = '4px 4px 8px rgba(0, 0, 0, 0.5)';
      });
      
      heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'scale(1) rotateY(0deg)';
        heroTitle.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
      });
    }

    // Efectos de brillo en los iconos
    const storageIcons = document.querySelectorAll('.concepts-section .bi');
    storageIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.filter = 'drop-shadow(0 0 15px rgba(255, 193, 7, 0.6)) brightness(1.2)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.filter = '';
      });
    });
  }

  initializeCardInteractions() {
    console.log('🎯 Configurando interacciones de tarjetas...');
    
    const cards = document.querySelectorAll('.concepts-section .card');
    cards.forEach((card, index) => {
      // Efecto de entrada escalonado
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200);

      // Efecto de click
      card.addEventListener('click', () => {
        this.createRippleEffect(card);
        this.showStorageInfo(card);
      });

      // Efectos de hover mejorados
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 30px rgba(255, 193, 7, 0.3)';
        card.style.borderColor = 'var(--storage-primary)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.borderColor = 'transparent';
      });
    });
  }

  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 193, 7, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  showStorageInfo(card) {
    const title = card.querySelector('.card-title').textContent;
    console.log(`📋 Mostrando información de: ${title}`);
    
    // Aquí puedes agregar lógica para mostrar información detallada
    // Por ejemplo, un modal o expandir la tarjeta
  }

  initializeScrollEffects() {
    console.log('📜 Configurando efectos de scroll...');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.concepts-section .card');
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  removeLoadingClass() {
    console.log('🎬 Removiendo clase de carga...');
    document.body.classList.remove('component-loading');
  }

  // Método para agregar nuevo contenido dinámicamente
  addStorageContent(content) {
    console.log('➕ Agregando contenido de almacenamiento...');
    // Implementar según necesidades futuras
  }

  // Método para filtrar contenido
  filterContent(category) {
    console.log(`🔍 Filtrando contenido por categoría: ${category}`);
    // Implementar filtrado según necesidades
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM cargado - Inicializando Gestión de Almacenamiento');
  
  if (!window.gestionAlmacenamientoManager) {
    window.gestionAlmacenamientoManager = new GestionAlmacenamientoManager();
  }
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GestionAlmacenamientoManager;
}
