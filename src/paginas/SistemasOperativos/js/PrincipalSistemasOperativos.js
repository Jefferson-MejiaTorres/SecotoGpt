/**
 * JavaScript específico para la página de Sistemas Operativos
 * Historia y Evolución - Funcionalidades interactivas y animaciones
 */

class SistemasOperativosManager {
  constructor() {
    this.initialized = false;
    this.scrollObserver = null;
    this.timelineItems = [];
    this.init();
  }

  async init() {
    console.log('💻 Inicializando Sistemas Operativos Manager...');
    
    // Esperar a que los componentes se carguen
    await this.waitForComponents();
      // Inicializar funcionalidades
    this.initializeScrollAnimations();
    this.initializeTimelineAnimations();
    this.initializeInteractiveElements();
    this.initializeComponentCards();
    this.initializeOSCards();
    this.initializeTableInteractions();
    this.initializeScrollProgress();
    this.removeLoadingClass();
    
    this.initialized = true;
    console.log('✅ Sistemas Operativos Manager inicializado');
  }

  async waitForComponents() {
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      const header = document.getElementById('header-placeholder');
      const footer = document.getElementById('footer-placeholder');
      
      if (header && footer && 
          header.children.length > 0 && 
          footer.children.length > 0) {
        console.log('✅ Componentes cargados');
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }

  /* ===== ANIMACIONES DE SCROLL ===== */
  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animaciones especiales para elementos específicos
          if (entry.target.classList.contains('stat-item')) {
            this.animateStatItem(entry.target);
          }
          
          if (entry.target.classList.contains('timeline-item')) {
            this.animateTimelineItem(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observar todos los elementos con animación
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => {
      this.scrollObserver.observe(el);
    });
  }

  /* ===== ANIMACIONES DEL TIMELINE ===== */
  initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Añadir delay escalonado
      item.style.transitionDelay = `${index * 0.2}s`;
      
      // Agregar efectos de hover mejorados
      const eraCard = item.querySelector('.era-card');
      if (eraCard) {
        this.addCardHoverEffects(eraCard);
      }
    });
  }

  animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    if (marker) {
      // Animación del marcador
      setTimeout(() => {
        marker.style.transform = 'translateX(-50%) scale(1.2)';
        marker.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
          marker.style.transform = 'translateX(-50%) scale(1)';
        }, 300);
      }, 200);
    }

    // Animación de contenido con efecto de escritura
    const content = item.querySelector('.era-card');
    if (content) {
      this.typewriterEffect(content);
    }
  }

  /* ===== TARJETAS DE SISTEMAS OPERATIVOS ===== */
  initializeOSCards() {
    const osCards = document.querySelectorAll('.os-card');
    
    osCards.forEach(card => {
      card.addEventListener('click', () => {
        this.showOSInfo(card);
      });

      card.addEventListener('mouseenter', () => {
        this.animateOSCard(card, true);
      });

      card.addEventListener('mouseleave', () => {
        this.animateOSCard(card, false);
      });
    });
  }

  animateOSCard(card, isEntering) {
    const icon = card.querySelector('.os-icon');
    if (icon) {
      if (isEntering) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        this.createSparkles(card);
      } else {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    }
  }

  showOSInfo(card) {
    const osType = card.getAttribute('data-os');
    const osName = card.querySelector('h5').textContent;
    
    // Crear notificación con información adicional
    this.showNotification(`
      <strong>${osName}</strong><br>
      ${this.getOSDescription(osType)}
    `, 'info');

    // Animación de click
    this.createRippleEffect(card);
  }

  getOSDescription(osType) {
    const descriptions = {
      'msdos': 'Sistema operativo basado en línea de comandos que dominó los PCs en los años 80.',
      'macos': 'Primer SO con interfaz gráfica exitosa, revolucionó la usabilidad con ventanas e iconos.',
      'windows': 'Respuesta de Microsoft que popularizó las GUI en ordenadores personales.',
      'linux': 'SO de código abierto que se convirtió en la base de muchos sistemas modernos.'
    };
    return descriptions[osType] || 'Sistema operativo histórico importante.';
  }

  /* ===== INTERACCIONES DE TABLA ===== */
  initializeTableInteractions() {
    const tableRows = document.querySelectorAll('.components-table tbody tr');
    
    tableRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        this.highlightTableRow(row, true);
      });

      row.addEventListener('mouseleave', () => {
        this.highlightTableRow(row, false);
      });

      row.addEventListener('click', () => {
        this.showComponentDetails(row);
      });
    });
  }

  highlightTableRow(row, isHighlighted) {
    const icon = row.querySelector('.component-name i');
    if (icon) {
      if (isHighlighted) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.color = 'var(--so-primary)';
      } else {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.color = '';
      }
    }
  }

  showComponentDetails(row) {
    const componentName = row.querySelector('.component-name strong').textContent;
    const componentFunction = row.cells[1].textContent;
    
    this.showNotification(`
      <strong>${componentName}</strong><br>
      <small>${componentFunction}</small>
    `, 'success');
    
    this.createRippleEffect(row);
  }

  /* ===== ELEMENTOS INTERACTIVOS ===== */
  initializeInteractiveElements() {
    // Tarjetas de tipo con efectos hover mejorados
    const typeCards = document.querySelectorAll('.type-card');
    typeCards.forEach(card => {
      this.addCardHoverEffects(card);
    });

    // Tarjetas de impacto y futuro
    const impactCards = document.querySelectorAll('.impact-card, .future-card');
    impactCards.forEach(card => {
      this.addCardHoverEffects(card);
    });

    // Módulos relacionados con efectos especiales
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
      this.addModuleEffects(card);
    });

    // Elementos de la lista con animaciones
    const listItems = document.querySelectorAll('.impact-list li, .future-list li');
    listItems.forEach(item => {
      this.addListItemEffects(item);
    });
  }

  addCardHoverEffects(card) {
    card.addEventListener('mouseenter', () => {
      this.createFloatingElements(card);
    });

    card.addEventListener('click', () => {
      this.createRippleEffect(card);
    });
  }

  addModuleEffects(card) {
    const link = card.closest('.module-link');
    if (link) {
      card.addEventListener('mouseenter', () => {
        this.previewModuleContent(card);
      });
    }
  }

  addListItemEffects(item) {
    item.addEventListener('mouseenter', () => {
      this.highlightRelatedContent(item);
    });
  }  // Inicializar componentes interactivos
  initializeComponentCards() {
    console.log('🎯 Inicializando tarjetas de componentes...');
    
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach((card, index) => {
      // Solo usar eventos de mouse para todos los dispositivos
      // Manejo para dispositivos con mouse (aplicado a todos)
      this.setupMouseEvents(card);
      
      // Agregar animación de entrada con delay
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
      
      // Analytics de interacción (evento único)
      card.addEventListener('click', (e) => {
        // Prevenir eventos duplicados
        e.stopPropagation();
        
        const componentType = card.dataset.component;
        console.log(`📊 Componente explorado: ${componentType}`);
        this.showComponentNotification(componentType);
      }, { once: false });
    });
      // Inicializar animaciones del diagrama de flujo
    this.initializeFlowDiagram();
  }

  // Configurar eventos para dispositivos táctiles
  setupTouchEvents(card) {
    let touchStartTime = 0;
    let touchMoved = false;
    
    // Marcar como clickeable visualmente
    card.setAttribute('data-touch-enabled', 'true');
    
    // Eventos táctiles mejorados
    card.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchMoved = false;
      
      // Efecto visual inmediato de feedback
      card.style.transform = 'scale(0.98)';
      card.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('touchmove', () => {
      touchMoved = true;
      // Restaurar escala si el usuario se mueve (scroll)
      card.style.transform = 'scale(1)';
    });
    
    card.addEventListener('touchend', (e) => {
      e.preventDefault(); // Prevenir click fantasma
      
      const touchDuration = Date.now() - touchStartTime;
      
      // Solo activar flip si fue un tap rápido y sin movimiento
      if (!touchMoved && touchDuration < 300) {
        this.toggleCardFlip(card);
        
        // Feedback háptico si está disponible
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
      
      // Restaurar transformación
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 100);
    });
    
    // Prevenir context menu en touch
    card.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  
  // Configurar eventos para dispositivos con mouse
  setupMouseEvents(card) {
    // Efecto sparkles al hover
    card.addEventListener('mouseenter', (e) => {
      this.createSparkles(e.currentTarget);
    });
    
    // Click para flip
    card.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleCardFlip(card);
    });
  }
  
  // Función centralizada para manejar el flip
  toggleCardFlip(card) {
    const isFlipped = card.classList.contains('flipped');
    
    if (isFlipped) {
      card.classList.remove('flipped');
      card.setAttribute('aria-expanded', 'false');
    } else {
      card.classList.add('flipped');
      card.setAttribute('aria-expanded', 'true');
      
      // Crear efecto sparkles al voltear
      this.createSparkles(card);
    }
    
    // Log para debug
    console.log(`🔄 Tarjeta ${card.dataset.component} ${isFlipped ? 'volteada' : 'normal'}`);
  }

  // Crear efecto sparkles
  createSparkles(element) {
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--so-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;
      
      const rect = element.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      
      document.body.appendChild(sparkle);
      
      // Animar sparkle
      sparkle.animate([
        { 
          transform: 'scale(0) translateY(0)',
          opacity: 1
        },
        { 
          transform: 'scale(1) translateY(-20px)',
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => sparkle.remove();
    }
  }

  // Inicializar diagrama de flujo
  initializeFlowDiagram() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach((step, index) => {
      step.addEventListener('mouseenter', () => {
        // Highlight del step actual
        step.style.transform = 'translateY(-10px) scale(1.05)';
        step.style.boxShadow = 'var(--so-glow)';
        
        // Efecto ripple
        this.createRippleEffect(step);
      });
      
      step.addEventListener('mouseleave', () => {
        step.style.transform = 'translateY(0) scale(1)';
        step.style.boxShadow = '';
      });
      
      // Animación de entrada secuencial
      setTimeout(() => {
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  // Mostrar notificación de componente
  showComponentNotification(componentType) {
    const notifications = {
      kernel: '🔥 El Kernel es el corazón del SO - ¡Explora más!',
      interface: '🖥️ Las interfaces han evolucionado desde CLI hasta touch',
      filesystem: '📁 Los sistemas de archivos organizan toda la información',
      memory: '🧠 La gestión de memoria es crítica para el rendimiento',
      process: '⚡ Los procesos son la base de la multitarea',
      drivers: '🔌 Los drivers conectan el software con el hardware'
    };
    
    const message = notifications[componentType] || '💡 ¡Componente interesante!';
    this.showNotification(message);
  }

  /* ===== PROGRESO DE SCROLL ===== */
  initializeScrollProgress() {
    let scrollProgress = document.querySelector('.scroll-progress-bar');
    
    if (!scrollProgress) {
      const progressContainer = document.querySelector('.scroll-progress');
      if (progressContainer) {
        scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress-bar';
        progressContainer.appendChild(scrollProgress);
      }
    }

    if (scrollProgress) {
      window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
      });
    }
  }

  /* ===== EFECTOS VISUALES ===== */
  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      width: ${size}px;
      height: ${size}px;
      left: 50%;
      top: 50%;
      transform-origin: center;
      pointer-events: none;
      z-index: 1000;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Añadir keyframes si no existen
    if (!document.querySelector('#ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  createSparkles(element) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
          position: absolute;
          font-size: 1rem;
          animation: sparkle 1s ease-out forwards;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;

        element.style.position = 'relative';
        element.appendChild(sparkle);

        // Añadir keyframes para sparkles
        if (!document.querySelector('#sparkle-keyframes')) {
          const style = document.createElement('style');
          style.id = 'sparkle-keyframes';
          style.textContent = `
            @keyframes sparkle {
              0% { transform: translateY(0) scale(0); opacity: 1; }
              50% { transform: translateY(-20px) scale(1); opacity: 1; }
              100% { transform: translateY(-40px) scale(0); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 1000);
      }, i * 100);
    }
  }

  createFloatingElements(card) {
    const floaters = ['💾', '🖥️', '⚡', '🔧', '🚀'];
    
    floaters.forEach((emoji, index) => {
      setTimeout(() => {
        const floater = document.createElement('div');
        floater.innerHTML = emoji;
        floater.style.cssText = `
          position: absolute;
          font-size: 1.2rem;
          animation: float 2s ease-in-out forwards;
          pointer-events: none;
          z-index: 999;
          left: ${20 + (index * 15)}%;
          top: 20%;
        `;

        card.style.position = 'relative';
        card.appendChild(floater);

        if (!document.querySelector('#float-keyframes')) {
          const style = document.createElement('style');
          style.id = 'float-keyframes';
          style.textContent = `
            @keyframes float {
              0% { transform: translateY(0) scale(0); opacity: 1; }
              50% { transform: translateY(-30px) scale(1); opacity: 0.8; }
              100% { transform: translateY(-60px) scale(0); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }

        setTimeout(() => {
          if (floater.parentNode) {
            floater.parentNode.removeChild(floater);
          }
        }, 2000);
      }, index * 200);
    });
  }

  /* ===== EFECTOS DE TEXTO ===== */
  typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--so-primary)';

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 500);
      }
    }, 20);
  }

  /* ===== NOTIFICACIONES ===== */
  showNotification(message, type = 'info') {
    // Crear contenedor de notificaciones si no existe
    let container = document.querySelector('.notifications-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notifications-container';
      container.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 350px;
      `;
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    const colors = {
      info: '#2563eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };

    notification.style.cssText = `
      background: ${colors[type] || colors.info};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-size: 0.9rem;
      line-height: 1.4;
    `;

    container.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  /* ===== EFECTOS ADICIONALES ===== */
  animateStatItem(item) {
    const number = item.querySelector('.stat-number');
    if (number) {
      const finalNumber = number.textContent;
      if (finalNumber !== '∞') {
        let current = 0;
        const target = parseInt(finalNumber);
        const increment = target / 50;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            number.textContent = finalNumber;
            clearInterval(counter);
          } else {
            number.textContent = Math.floor(current);
          }
        }, 50);
      }
    }
  }

  previewModuleContent(card) {
    const title = card.querySelector('h5').textContent;
    this.showNotification(`🔍 Vista previa: ${title}`, 'info');
  }

  highlightRelatedContent(item) {
    // Efecto de resaltado sutil
    item.style.background = 'var(--color-bg-alt)';
    item.style.borderLeft = '3px solid var(--so-primary)';
    item.style.paddingLeft = '1rem';
  }  removeLoadingClass() {
    console.log('🔄 Iniciando remoción de loading class...');
    
    // Remover clase loading inmediatamente
    document.body.classList.remove('component-loading');
    console.log('⚡ Loading class removida inmediatamente');
    
    // Asegurar que el contenido sea visible
    const sections = document.querySelectorAll('.hero-section, .intro-section, .timeline-section, .components-section, .types-section, .impact-section, .conclusion-section, .modules-section');
    sections.forEach(section => {
      if (section) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.visibility = 'visible';
      }
    });
    
    setTimeout(() => {
      document.body.classList.remove('component-loading');
      console.log('🎨 Clases de carga removidas con timeout');
      
      // Forzar redibujado si es necesario
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
      }
      
      // Verificar si el contenido es visible
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const styles = window.getComputedStyle(heroSection);
        console.log('🔍 Hero section opacity:', styles.opacity);
        console.log('🔍 Hero section visibility:', styles.visibility);
      }
    }, 100);
  }

  // Método para limpiar recursos
  destroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}

// CSS adicional para efectos y animaciones
const additionalCSS = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(37, 99, 235, 0.1);
    z-index: 9999;
  }
  
  .scroll-progress-bar {
    height: 100%;
    background: var(--so-gradient);
    width: 0%;
    transition: width 0.3s ease;
  }
  
  .notifications-container {
    pointer-events: none;
  }
  
  .notification {
    pointer-events: auto;
    cursor: pointer;
  }
  
  .notification:hover {
    transform: translateX(-5px) !important;
  }
  
  .ripple-effect {
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
  }
  
  @media (max-width: 768px) {
    .notifications-container {
      right: 10px;
      max-width: 300px;
    }
    
    .notification {
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
    }
  }
`;

// Añadir estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM cargado - Inicializando Sistemas Operativos');
  
  if (!window.sistemasOperativosManager) {
    window.sistemasOperativosManager = new SistemasOperativosManager();
  }
});

// Fallback para asegurar que el contenido sea visible
setTimeout(() => {
  console.log('🔧 Fallback - Asegurando visibilidad del contenido');
  document.body.classList.remove('component-loading');
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';
  }
  
  // Mostrar todas las secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  });
}, 2000);

/* ===== FUNCIONES GLOBALES DE COMPATIBILIDAD ===== */
function reinitializeComponents() {
  if (window.sistemasOperativosManager) {
    window.sistemasOperativosManager.destroy();
  }
  window.sistemasOperativosManager = new SistemasOperativosManager();
}

function debugComponents() {
  console.log('🔍 Debug - Sistemas Operativos Manager:', {
    initialized: window.sistemasOperativosManager?.initialized,
    timelineItems: document.querySelectorAll('.timeline-item').length,
    osCards: document.querySelectorAll('.os-card').length,
    animatedElements: document.querySelectorAll('.scroll-animate').length
  });
}

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SistemasOperativosManager;
}