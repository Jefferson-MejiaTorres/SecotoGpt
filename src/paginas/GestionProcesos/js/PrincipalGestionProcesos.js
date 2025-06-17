/**
 * JavaScript mejorado para animar la página Gestión de Procesos
 * Funcionalidades:
 * - IntersectionObserver para animaciones al hacer scroll
 * - Animación typing para párrafos introductorios
 * - Animaciones escalonadas para tablas y listas
 * - Scroll suave para anclas internas
 * - Indicador de progreso de scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Inicializando página de Gestión de Procesos...');

  // Quitar clase de loading después de que todo esté cargado
  setTimeout(() => {
    document.body.classList.remove('component-loading');
    console.log('✅ Página de Gestión de Procesos cargada completamente');
  }, 100);

  // ===== ANIMACIÓN TYPING PARA ELEMENTOS CON CLASE .typing-animate =====
  function typingAnimation(element, speed = 50) {
    const text = element.textContent.trim();
    const originalWidth = element.offsetWidth;
    
    // Configurar estilos iniciales
    element.textContent = '';
    element.style.width = 'auto';
    element.style.minHeight = '1.5em';
    element.style.borderRight = '3px solid var(--process-primary)';
    element.style.display = 'inline-block';
    element.style.verticalAlign = 'top';
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        // Efecto de cursor parpadeante por 1 segundo, luego remover
        setTimeout(() => {
          element.style.borderRight = 'none';
          element.style.width = 'auto';
          element.style.display = '';
          element.style.verticalAlign = '';
          element.style.minHeight = '';
        }, 1000);
      }
    }, speed);
  }

  // Inicializar typing en elementos específicos
  const typingElements = document.querySelectorAll('.typing-animate');
  if (typingElements.length > 0) {
    // Esperar un poco antes de iniciar la animación para asegurar que todo esté cargado
    setTimeout(() => {
      typingElements.forEach(el => {
        // Solo aplicar si el elemento es visible
        if (el.offsetParent !== null) {
          typingAnimation(el, 60); // Velocidad un poco más lenta para mejor legibilidad
        }
      });
    }, 1500); // Aumentar el delay inicial
  }

  // ===== INTERSECTION OBSERVER PARA ANIMACIONES DE SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Para tablas, revelar filas con delay escalonado
        if (el.tagName.toLowerCase() === 'table') {
          const rows = el.querySelectorAll('tbody tr');
          rows.forEach((row, i) => {
            setTimeout(() => {
              row.classList.add('visible');
            }, i * 100);
          });
        }
        // Para listas, revelar items con delay escalonado
        else if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
          const items = el.querySelectorAll('li');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, i * 80);
          });
        }
        // Para grids de cards, animación escalonada
        else if (el.classList.contains('content-grid') || 
                 el.classList.contains('types-grid') || 
                 el.classList.contains('trends-grid') ||
                 el.classList.contains('sync-grid') ||
                 el.classList.contains('threads-grid')) {
          const cards = el.children;
          Array.from(cards).forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, i * 150);
          });
        }
        // Para componentes del PCB
        else if (el.classList.contains('pcb-components')) {
          const items = el.querySelectorAll('.pcb-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, i * 120);
          });
        }
        // Para flow steps
        else if (el.classList.contains('process-flow')) {
          const steps = el.querySelectorAll('.flow-step, .flow-arrow');
          steps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('visible');
            }, i * 200);
          });
        }
        // Para otros elementos: añadir visible directo
        else {
          el.classList.add('visible');
        }

        // Una vez revelado, dejar de observar
        observer.unobserve(el);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  // Seleccionar elementos para animar
  const elementsToReveal = [
    ...document.querySelectorAll('.content-section'),
    ...document.querySelectorAll('.hero-stats'),
    ...document.querySelectorAll('.content-grid'),
    ...document.querySelectorAll('.types-grid'),
    ...document.querySelectorAll('.sync-grid'),
    ...document.querySelectorAll('.threads-grid'),
    ...document.querySelectorAll('.trends-grid'),
    ...document.querySelectorAll('.process-flow'),
    ...document.querySelectorAll('.pcb-components'),
    ...document.querySelectorAll('.algorithms-table'),
    ...document.querySelectorAll('ul:not(.sync-list)'),
    ...document.querySelectorAll('ol')
  ];

  elementsToReveal.forEach(el => {
    // Añadir clase inicial de oculto para animación
    if (el.classList.contains('content-grid') || 
        el.classList.contains('types-grid') || 
        el.classList.contains('trends-grid') ||
        el.classList.contains('sync-grid') ||
        el.classList.contains('threads-grid')) {
      // Para grids, ocultar los hijos
      Array.from(el.children).forEach(child => {
        child.classList.add('fade-in');
      });
    } else if (el.classList.contains('pcb-components')) {
      el.querySelectorAll('.pcb-item').forEach(item => {
        item.classList.add('fade-in');
      });
    } else if (el.classList.contains('process-flow')) {
      el.querySelectorAll('.flow-step, .flow-arrow').forEach(item => {
        item.classList.add('fade-in');
      });
    } else if (el.tagName.toLowerCase() === 'table') {
      el.querySelectorAll('tbody tr').forEach(row => {
        row.classList.add('fade-in');
      });
    } else if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
      el.querySelectorAll('li').forEach(li => {
        li.classList.add('fade-in');
      });
    } else {
      el.classList.add('fade-in');
    }
    observer.observe(el);
  });

  // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  });

  // ===== INDICADOR DE PROGRESO DE SCROLL =====
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });
  }

  // ===== MEJORAS DE INTERACTIVIDAD =====
  
  // Efecto hover mejorado para cards
  const interactiveCards = document.querySelectorAll('.info-card, .type-card, .sync-card, .deadlock-card, .thread-card, .trend-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Efecto especial para la tabla de algoritmos
  const tableRows = document.querySelectorAll('.algorithms-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(13, 110, 253, 0.08)';
      this.style.transform = 'scale(1.01)';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.transform = 'scale(1)';
    });
  });

  // ===== EFECTOS ESPECIALES PARA PCB ITEMS =====
  const pcbItems = document.querySelectorAll('.pcb-item');
  pcbItems.forEach(item => {
    item.addEventListener('click', function() {
      // Efecto de pulse al hacer click
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'pulse 0.6s ease-in-out';
      }, 10);
    });
  });

  // ===== ACCESIBILIDAD MEJORADA =====
  
  // Focus visible para elementos interactivos
  const focusableElements = document.querySelectorAll('.info-card, .type-card, .sync-card, .deadlock-card, .thread-card, .trend-card, .flow-step');
  focusableElements.forEach(el => {
    el.setAttribute('tabindex', '0');
    
    el.addEventListener('focus', function() {
      this.style.outline = '3px solid var(--process-primary)';
      this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });

  // ===== EASTER EGG PARA DESARROLLADORES =====
  let clickCount = 0;
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 5) {
        console.log('🎉 ¡Has encontrado el easter egg de Gestión de Procesos!');
        console.log('💻 Los procesos son como pensamientos: siempre en movimiento, a veces en conflicto, pero trabajando juntos para crear algo increíble.');
        
        // Efecto visual especial
        heroTitle.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
        heroTitle.style.backgroundSize = '400% 400%';
        heroTitle.style.animation = 'gradient 3s ease infinite';
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.webkitTextFillColor = 'transparent';
        
        setTimeout(() => {
          heroTitle.style.background = '';
          heroTitle.style.animation = '';
          heroTitle.style.webkitBackgroundClip = '';
          heroTitle.style.webkitTextFillColor = '';
          clickCount = 0;
        }, 3000);
      }
    });
  }

  // ===== OPTIMIZACIÓN DE RENDIMIENTO =====
  
  // Throttle para eventos de scroll
  function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Aplicar throttle al scroll del indicador de progreso
  if (scrollProgress) {
    const throttledScroll = throttle(() => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    }, 16); // ~60fps

    window.removeEventListener('scroll', () => {}); // Remover listener anterior
    window.addEventListener('scroll', throttledScroll);
  }

  // ===== RESPONSIVE HELPERS =====
  
  // Ajustes específicos para móvil
  function handleMobileOptimizations() {
    if (window.innerWidth <= 768) {
      // Reducir animaciones en móvil para mejor rendimiento
      const reducedMotionElements = document.querySelectorAll('.fade-in');
      reducedMotionElements.forEach(el => {
        el.style.transition = 'all 0.4s ease';
      });
      
      // Optimizar tabla para móvil
      const table = document.querySelector('.algorithms-table');
      if (table) {
        table.style.fontSize = '0.85rem';
      }
    }
  }

  // Ejecutar optimizaciones iniciales
  handleMobileOptimizations();
  
  // Re-optimizar en resize
  window.addEventListener('resize', throttle(handleMobileOptimizations, 250));

  console.log('🚀 Gestión de Procesos JavaScript inicializado correctamente');
});

// ===== ESTILOS DINÁMICOS PARA ANIMACIONES ESPECIALES =====
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style);
