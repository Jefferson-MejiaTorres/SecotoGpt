/**
 * JavaScript avanzado para Gestión de Almacenamiento - SeCoToGpt
 * Funcionalidades completas:
 * - Animaciones typing personalizadas
 * - IntersectionObserver para elementos específicos
 * - Indicador de progreso de scroll
 * - Efectos interactivos para jerarquía de almacenamiento
 * - Animaciones para tabla de arquitecturas
 * - Efectos especiales para cards y técnicas modernas
 * - Optimizaciones de rendimiento y accesibilidad
 * - Casos de éxito animados
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🗄️ Inicializando Gestión de Almacenamiento - Sistema Avanzado...');

  // Quitar clase de loading después de carga inicial
  setTimeout(() => {
    document.body.classList.remove('component-loading');
    console.log('✅ Página de Gestión de Almacenamiento cargada completamente');
  }, 100);

  // ===== ANIMACIÓN TYPING MEJORADA PARA SUBTÍTULO HERO =====
  function typingAnimation(element, speed = 40) {
    const originalText = element.textContent.trim();
    element.textContent = '';
    element.style.width = 'auto';
    element.style.minHeight = '1.5em';
    element.style.borderRight = '3px solid var(--storage-primary)';
    element.style.display = 'inline-block';
    element.style.verticalAlign = 'top';
    element.style.whiteSpace = 'normal';
    element.style.maxWidth = '100%';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < originalText.length) {
        element.textContent += originalText[i];
        i++;
      } else {
        clearInterval(interval);
        element.style.borderRight = '';
        element.classList.add('typing-complete');
      }
    }, speed);
  }

  // Inicializar typing en el hero subtitle
  const subtitle = document.querySelector('.hero-subtitle.typing-animate');
  if (subtitle) {
    setTimeout(() => typingAnimation(subtitle), 1500);
  }

  // ===== INTERSECTION OBSERVER AVANZADO PARA ANIMACIONES =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animaciones específicas según el tipo de elemento
        if (entry.target.classList.contains('content-grid')) {
          animateGridChildren(entry.target, 150);
        } else if (entry.target.classList.contains('technologies-grid')) {
          animateGridChildren(entry.target, 120);
        } else if (entry.target.classList.contains('trends-grid')) {
          animateGridChildren(entry.target, 100);
        } else if (entry.target.classList.contains('success-cases')) {
          animateGridChildren(entry.target, 200);
        } else if (entry.target.classList.contains('management-grid')) {
          animateGridChildren(entry.target, 180);
        } else if (entry.target.classList.contains('security-grid')) {
          animateGridChildren(entry.target, 160);
        } else if (entry.target.classList.contains('storage-hierarchy')) {
          animateHierarchyLevels(entry.target);
        } else if (entry.target.classList.contains('architectures-table')) {
          animateTableRows(entry.target);
        } else if (entry.target.classList.contains('hero-stats')) {
          animateStatsItems(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  };

  // Función para animar hijos de grids con delay escalonado
  function animateGridChildren(gridElement, baseDelay = 100) {
    Array.from(gridElement.children).forEach((child, index) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px) scale(0.95)';
      child.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0) scale(1)';
        child.classList.add('visible');
      }, index * baseDelay);
    });
  }

  // Función específica para animar niveles de jerarquía de almacenamiento
  function animateHierarchyLevels(hierarchyElement) {
    const levels = hierarchyElement.querySelectorAll('.hierarchy-level');
    const arrows = hierarchyElement.querySelectorAll('.hierarchy-arrow');
    
    levels.forEach((level, index) => {
      level.style.opacity = '0';
      level.style.transform = 'translateX(-50px) scale(0.9)';
      level.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        level.style.opacity = '1';
        level.style.transform = 'translateX(0) scale(1)';
        level.classList.add('visible');
        
        // Animar estadísticas internas
        setTimeout(() => {
          const stats = level.querySelectorAll('.level-stats span');
          stats.forEach((stat, statIndex) => {
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0.8)';
            setTimeout(() => {
              stat.style.opacity = '1';
              stat.style.transform = 'scale(1)';
              stat.style.transition = 'all 0.4s ease';
            }, statIndex * 100);
          });
        }, 300);
      }, index * 250);
    });
    
    // Animar flechas después de los niveles
    setTimeout(() => {
      arrows.forEach((arrow, index) => {
        arrow.style.opacity = '0';
        setTimeout(() => {
          arrow.style.opacity = '1';
          arrow.style.transition = 'opacity 0.5s ease';
        }, index * 200);
      });
    }, levels.length * 250);
  }

  // Función para animar estadísticas del hero
  function animateStatsItems(statsElement) {
    const items = statsElement.querySelectorAll('.stat-item');
    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px) scale(0.9)';
      item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
        
        // Animar números con efecto contador
        const numberElement = item.querySelector('.stat-number');
        if (numberElement) {
          animateCounter(numberElement, 800);
        }
      }, index * 150);
    });
  }

  // Función para animar filas de tabla
  function animateTableRows(tableElement) {
    const rows = tableElement.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-30px)';
      row.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, index * 80);
    });
  }

  // Función para animar contadores numéricos
  function animateCounter(element, duration = 1000) {
    const text = element.textContent;
    const number = text.match(/\d+/);
    if (!number) return;
    
    const finalNumber = parseInt(number[0]);
    const suffix = text.replace(number[0], '');
    const increment = finalNumber / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalNumber) {
        element.textContent = finalNumber + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 50);
  }

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  // Observar elementos específicos para animaciones
  const elementsToObserve = [
    // Secciones principales
    ...document.querySelectorAll('.content-section'),
    // Grids específicos
    ...document.querySelectorAll('.content-grid'),
    ...document.querySelectorAll('.technologies-grid'),
    ...document.querySelectorAll('.trends-grid'),
    ...document.querySelectorAll('.success-cases'),
    ...document.querySelectorAll('.management-grid'),
    ...document.querySelectorAll('.security-grid'),
    // Elementos únicos
    ...document.querySelectorAll('.storage-hierarchy'),
    ...document.querySelectorAll('.architectures-table'),
    ...document.querySelectorAll('.hero-stats')
  ];

  elementsToObserve.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ===== INDICADOR DE PROGRESO DE SCROLL MEJORADO =====
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    let ticking = false;
    
    function updateScrollProgress() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.min((winScroll / height) * 100, 100);
      
      scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== EFECTOS INTERACTIVOS PARA JERARQUÍA DE ALMACENAMIENTO =====
  const hierarchyLevels = document.querySelectorAll('.hierarchy-level');
  hierarchyLevels.forEach((level, index) => {
    level.setAttribute('tabindex', '0');
    level.setAttribute('role', 'button');
    level.setAttribute('aria-label', `Nivel de almacenamiento ${index + 1}`);
    
    // Efecto hover mejorado
    level.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = 'var(--storage-shadow-hover)';
      this.style.zIndex = '10';
      
      // Pulso en el icono
      const icon = this.querySelector('.level-icon i');
      if (icon) {
        icon.style.animation = 'pulse 0.6s ease-in-out';
      }
    });
    
    level.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      this.style.zIndex = '';
      
      const icon = this.querySelector('.level-icon i');
      if (icon) {
        icon.style.animation = '';
      }
    });
    
    // Efecto click para mostrar detalles adicionales
    level.addEventListener('click', function() {
      this.style.animation = 'bounce 0.6s ease';
      
      // Resaltar estadísticas temporalmente
      const stats = this.querySelectorAll('.level-stats span');
      stats.forEach((stat, statIndex) => {
        setTimeout(() => {
          stat.style.background = 'var(--storage-primary)';
          stat.style.color = 'white';
          stat.style.transform = 'scale(1.1)';
          
          setTimeout(() => {
            stat.style.background = '';
            stat.style.color = '';
            stat.style.transform = '';
          }, 800);
        }, statIndex * 100);
      });
    });
    
    // Accesibilidad con teclado
    level.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // ===== EFECTOS INTERACTIVOS PARA CARDS =====
  const interactiveCards = document.querySelectorAll(
    '.info-card, .technology-card, .trend-card, .management-card, .security-card, .case-card'
  );
  
  interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    // Efecto hover con transformación suave
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = 'var(--storage-shadow-hover)';
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Efecto especial para iconos
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
    
    // Efecto focus para accesibilidad
    card.addEventListener('focus', function() {
      this.style.outline = '3px solid var(--storage-primary)';
      this.style.outlineOffset = '2px';
    });
    
    card.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });

  // ===== EFECTOS ESPECIALES PARA TABLA DE ARQUITECTURAS =====
  const tableRows = document.querySelectorAll('.architectures-table tbody tr');
  tableRows.forEach((row, index) => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
      this.style.transform = 'scale(1.01)';
      this.style.boxShadow = '0 4px 8px rgba(139, 92, 246, 0.1)';
      this.style.transition = 'all 0.3s ease';
      
      // Resaltar tipo de arquitectura
      const archType = this.querySelector('td strong');
      if (archType) {
        archType.style.color = 'var(--storage-primary)';
        archType.style.fontWeight = '700';
      }
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.transform = '';
      this.style.boxShadow = '';
      
      const archType = this.querySelector('td strong');
      if (archType) {
        archType.style.color = '';
        archType.style.fontWeight = '';
      }
    });
  });

  // ===== EFECTOS PARA TÉCNICAS MODERNAS =====
  const trendCards = document.querySelectorAll('.trend-card');
  trendCards.forEach(card => {
    const icon = card.querySelector('.trend-icon');
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.03)';
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      
      if (icon) {
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease';
      }
      
      // Efecto de brillo en el código
      const codeElement = this.querySelector('code');
      if (codeElement) {
        codeElement.style.background = 'var(--storage-gradient)';
        codeElement.style.color = 'white';
        codeElement.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      
      if (icon) {
        icon.style.transform = '';
      }
      
      const codeElement = this.querySelector('code');
      if (codeElement) {
        codeElement.style.background = '';
        codeElement.style.color = '';
        codeElement.style.transform = '';
      }
    });
  });

  // ===== EFECTOS ESPECIALES PARA CASOS DE ÉXITO =====
  const caseCards = document.querySelectorAll('.case-card');
  caseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Animar el porcentaje
      const percentage = this.querySelector('.result-percentage');
      if (percentage) {
        percentage.style.animation = 'bounce 0.6s ease';
        percentage.style.color = 'var(--storage-primary)';
      }
      
      // Efecto de glow en el icono
      const icon = this.querySelector('.case-header i');
      if (icon) {
        icon.style.filter = 'drop-shadow(0 0 10px var(--storage-primary))';
        icon.style.color = 'var(--storage-primary)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const percentage = this.querySelector('.result-percentage');
      if (percentage) {
        percentage.style.animation = '';
        percentage.style.color = '';
      }
      
      const icon = this.querySelector('.case-header i');
      if (icon) {
        icon.style.filter = '';
        icon.style.color = '';
      }
    });
  });

  // ===== EFECTOS PARA TECNOLOGÍAS =====
  const technologyCards = document.querySelectorAll('.technology-card');
  technologyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Efecto específico según el tipo de tecnología
      const techType = this.getAttribute('data-tech');
      
      if (techType === 'magnetic') {
        this.style.borderTopColor = '#6b7280';
      } else if (techType === 'ssd') {
        this.style.borderTopColor = 'var(--storage-primary)';
      } else if (techType === 'quantum') {
        this.style.borderTopColor = '#f59e0b';
      }
      
      // Animar especificaciones
      const specs = this.querySelectorAll('.spec-item');
      specs.forEach((spec, index) => {
        setTimeout(() => {
          spec.style.transform = 'translateX(5px)';
          spec.style.background = 'rgba(139, 92, 246, 0.1)';
        }, index * 100);
      });
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderTopColor = '';
      
      const specs = this.querySelectorAll('.spec-item');
      specs.forEach(spec => {
        spec.style.transform = '';
        spec.style.background = '';
      });
    });
  });

  // ===== SCROLL SUAVE PARA ANCLAS INTERNAS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        
        const headerHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Efecto de destaque en el elemento destino
        setTimeout(() => {
          target.style.animation = 'highlight 2s ease';
        }, 500);
      }
    });
  });

  // ===== FUNCIONALIDADES AVANZADAS =====
  
  // Detector de velocidad de scroll para optimizar animaciones
  let lastScrollTime = 0;
  let scrollVelocity = 0;
  
  function calculateScrollVelocity() {
    const currentTime = Date.now();
    const currentScroll = window.scrollY;
    const timeDiff = currentTime - lastScrollTime;
    
    if (timeDiff > 0) {
      scrollVelocity = Math.abs((currentScroll - (window.lastScrollY || 0)) / timeDiff);
    }
    
    window.lastScrollY = currentScroll;
    lastScrollTime = currentTime;
  }
  
  window.addEventListener('scroll', calculateScrollVelocity, { passive: true });

  // Sistema de navegación por teclado mejorado
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          break;
      }
    }
  });

  // ===== RESPONSIVE HELPERS Y OPTIMIZACIONES =====
  function handleMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 992 && window.innerWidth > 768;
    
    // Ajustes específicos para móvil
    if (isMobile) {
      // Reducir intensidad de animaciones en móvil
      document.documentElement.style.setProperty('--animation-scale', '0.8');
      
      // Simplificar efectos hover en móvil (solo touch)
      interactiveCards.forEach(card => {
        card.style.transition = 'all 0.2s ease';
      });
      
      // Ajustar tabla para móvil
      const table = document.querySelector('.architectures-table');
      if (table) {
        table.style.fontSize = '0.8rem';
      }
    } else {
      document.documentElement.style.setProperty('--animation-scale', '1');
    }
    
    // Ajustes específicos para tablet
    if (isTablet) {
      const grids = document.querySelectorAll('.technologies-grid, .trends-grid');
      grids.forEach(grid => {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      });
    }
  }

  // Ejecutar optimizaciones iniciales
  handleMobileOptimizations();
  
  // Re-optimizar en resize con throttle
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleMobileOptimizations, 250);
  });

  // ===== SISTEMA DE TOOLTIP DINÁMICO =====
  function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--storage-gradient);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });
    
    return tooltip;
  }
  
  // Agregar tooltips a elementos específicos
  hierarchyLevels.forEach((level, index) => {
    const levelNames = ['Primario', 'Secundario', 'Terciario'];
    level.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) { // Solo en desktop
        this.tooltip = createTooltip(this, `${levelNames[index]}: Haz clic para destacar estadísticas`);
      }
    });
    
    level.addEventListener('mouseleave', function() {
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
        setTimeout(() => {
          if (this.tooltip && this.tooltip.parentNode) {
            this.tooltip.parentNode.removeChild(this.tooltip);
          }
        }, 300);
      }
    });
  });

  // ===== EASTER EGG Y FUNCIONALIDADES DIVERTIDAS =====
  let clickCount = 0;
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 5) {
        // Efecto especial después de 5 clicks
        document.body.style.animation = 'rainbow 2s ease';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 2000);
        
        console.log('🎉 ¡Efecto especial activado! Has descubierto el Easter Egg de Gestión de Almacenamiento');
        clickCount = 0;
      }
    });
  }

  // ===== MONITOREO DE RENDIMIENTO =====
  function monitorPerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log(`⚡ Tiempo de carga: ${loadTime.toFixed(2)}ms`);
      
      // Si la carga es lenta, reducir animaciones
      if (loadTime > 3000) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        console.log('🔧 Optimizando animaciones por carga lenta');
      }
    }
  }

  // Ejecutar monitoreo después de que todo esté cargado
  window.addEventListener('load', monitorPerformance);

  // ===== ESTILOS DINÁMICOS PARA ANIMACIONES AVANZADAS =====
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
    /* Animaciones base mejoradas */
    .fade-in { 
      opacity: 0; 
      transform: translateY(40px); 
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .fade-in.visible { 
      opacity: 1; 
      transform: translateY(0); 
    }
    
    /* Animaciones específicas para grids */
    .content-grid > *, 
    .technologies-grid > *, 
    .trends-grid > *, 
    .success-cases > *,
    .management-grid > *,
    .security-grid > * { 
      opacity: 0; 
      transform: translateY(30px) scale(0.98); 
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    
    .content-grid > .visible, 
    .technologies-grid > .visible, 
    .trends-grid > .visible, 
    .success-cases > .visible,
    .management-grid > .visible,
    .security-grid > .visible { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
    
    /* Animaciones para jerarquía de almacenamiento */
    .storage-hierarchy .hierarchy-level { 
      opacity: 0; 
      transform: translateX(-50px) scale(0.9); 
      transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .storage-hierarchy .hierarchy-level.visible { 
      opacity: 1; 
      transform: translateX(0) scale(1); 
    }
    
    /* Animaciones para elementos de estadísticas */
    .level-stats span {
      transition: all 0.4s ease;
    }
    
    /* Indicador de progreso de scroll */
    .scroll-progress { 
      position: fixed; 
      left: 0; 
      top: 0; 
      height: 4px; 
      width: 100vw; 
      background: var(--storage-gradient); 
      transform: scaleX(0); 
      transform-origin: left; 
      z-index: 9999; 
      transition: transform 0.2s; 
    }
    
    /* Animación typing mejorada */
    .typing-animate { 
      min-height: 1.5em; 
      display: inline-block; 
      vertical-align: top;
      max-width: 100%;
      overflow-wrap: break-word;
    }
    
    .typing-animate.typing-complete {
      border-right: none;
    }
    
    /* Efectos especiales */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes highlight {
      0% { background-color: transparent; }
      50% { background-color: rgba(139, 92, 246, 0.1); }
      100% { background-color: transparent; }
    }
    
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      25% { filter: hue-rotate(90deg); }
      50% { filter: hue-rotate(180deg); }
      75% { filter: hue-rotate(270deg); }
      100% { filter: hue-rotate(360deg); }
    }
    
    /* Tooltips dinámicos */
    .custom-tooltip {
      font-family: 'Poppins', sans-serif;
    }
    
    /* Optimizaciones de rendimiento */
    .hierarchy-level,
    .info-card,
    .technology-card,
    .trend-card,
    .management-card,
    .security-card,
    .case-card {
      will-change: transform;
    }
    
    /* Responsive para animaciones */
    @media (max-width: 768px) {
      .fade-in { 
        transition: all 0.4s ease; 
      }
      .typing-animate {
        white-space: normal;
        border-right: none;
      }
    }
    
    /* Preferencias de movimiento reducido */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      
      .typing-animate {
        animation: none;
        border-right: none;
      }
    }
  `;
  document.head.appendChild(dynamicStyles);

  console.log('🚀 Sistema avanzado de Gestión de Almacenamiento inicializado correctamente');
  console.log('💡 Funcionalidades activas:');
  console.log('   - Animaciones escalonadas para grids');
  console.log('   - Efectos interactivos para jerarquía de almacenamiento');
  console.log('   - Tabla de arquitecturas animada');
  console.log('   - Casos de éxito con efectos especiales');
  console.log('   - Tecnologías con animaciones específicas');
  console.log('   - Tooltips dinámicos');
  console.log('   - Optimizaciones responsive');
  console.log('   - Sistema de scroll inteligente');
});
