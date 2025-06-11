/**
 * JavaScript específico para la página de Gestión de Memoria
 * Funcionalidades: animaciones, simulaciones de memoria y efectos específicos
 */

class GestionMemoriaManager {
  constructor() {
    this.initialized = false;
    this.memoryUsage = 75; // Simulación de uso de memoria
    this.init();
  }

  async init() {
    console.log('🧠 Inicializando Gestión de Memoria Manager...');
    
    // Esperar a que los componentes se carguen
    await this.waitForComponents();
    
    // Inicializar funcionalidades
    this.initializeMemoryAnimations();
    this.initializeMemorySimulation();
    this.initializeCardInteractions();
    this.initializeScrollEffects();
    this.removeLoadingClass();
    
    this.initialized = true;
    console.log('✅ Gestión de Memoria Manager inicializado');
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

  initializeMemoryAnimations() {
    console.log('🎨 Inicializando animaciones de memoria...');
    
    // Animación especial para el hero
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
      heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.transform = 'scale(1.05)';
        heroTitle.style.filter = 'drop-shadow(0 0 20px rgba(25, 135, 84, 0.5))';
      });
      
      heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'scale(1)';
        heroTitle.style.filter = '';
      });
    }

    // Efectos de memoria en los iconos
    const memoryIcons = document.querySelectorAll('.concepts-section .bi');
    memoryIcons.forEach((icon, index) => {
      // Efecto de "carga de memoria"
      icon.addEventListener('mouseenter', () => {
        icon.style.filter = 'drop-shadow(0 0 15px rgba(25, 135, 84, 0.6)) brightness(1.3)';
        icon.style.transform = 'scale(1.2) rotateY(180deg)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.filter = '';
        icon.style.transform = '';
      });

      // Animación de pulso escalonada
      setTimeout(() => {
        icon.style.animation = 'memoryPulse 3s ease-in-out infinite';
      }, index * 500);
    });
  }

  initializeMemorySimulation() {
    console.log('🔄 Inicializando simulación de memoria...');
    
    // Crear barra de memoria en el hero si no existe
    const heroSection = document.querySelector('.hero-section .container');
    if (heroSection && !document.querySelector('.memory-usage-bar')) {
      const memoryBar = document.createElement('div');
      memoryBar.className = 'memory-usage-bar mt-4';
      memoryBar.innerHTML = `
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="memory-display p-3 rounded" style="background: rgba(255,255,255,0.1);">
              <h6 class="text-white mb-2">Uso de Memoria del Sistema</h6>
              <div class="memory-bar mb-2" style="height: 20px; background: rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden;">
                <div class="memory-fill" style="height: 100%; width: ${this.memoryUsage}%; background: linear-gradient(90deg, #20c997, #198754); transition: width 1s ease;"></div>
              </div>
              <small class="text-white-50">RAM: <span class="memory-percentage">${this.memoryUsage}</span>% utilizada</small>
            </div>
          </div>
        </div>
      `;
      heroSection.appendChild(memoryBar);
      
      // Simular cambios en el uso de memoria
      this.startMemorySimulation();
    }
  }

  startMemorySimulation() {
    setInterval(() => {
      // Fluctuar el uso de memoria entre 60% y 90%
      this.memoryUsage = Math.floor(Math.random() * 30) + 60;
      
      const memoryFill = document.querySelector('.memory-fill');
      const memoryPercentage = document.querySelector('.memory-percentage');
      
      if (memoryFill && memoryPercentage) {
        memoryFill.style.width = `${this.memoryUsage}%`;
        memoryPercentage.textContent = this.memoryUsage;
        
        // Cambiar color según el uso
        if (this.memoryUsage > 85) {
          memoryFill.style.background = 'linear-gradient(90deg, #dc3545, #fd7e14)';
        } else if (this.memoryUsage > 75) {
          memoryFill.style.background = 'linear-gradient(90deg, #ffc107, #fd7e14)';
        } else {
          memoryFill.style.background = 'linear-gradient(90deg, #20c997, #198754)';
        }
      }
    }, 3000);
  }

  initializeCardInteractions() {
    console.log('🎯 Configurando interacciones de tarjetas de memoria...');
    
    const cards = document.querySelectorAll('.concepts-section .card');
    cards.forEach((card, index) => {
      // Efecto de entrada escalonado
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);

      // Efecto de click con simulación de asignación de memoria
      card.addEventListener('click', () => {
        this.simulateMemoryAllocation(card);
        this.showMemoryInfo(card);
      });

      // Efectos de hover con gradiente de memoria
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 30px rgba(25, 135, 84, 0.3)';
        card.style.background = 'linear-gradient(135deg, rgba(25, 135, 84, 0.05), rgba(32, 201, 151, 0.05))';
      });

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.background = '';
      });
    });
  }

  simulateMemoryAllocation(card) {
    console.log('💾 Simulando asignación de memoria...');
    
    // Crear efecto visual de asignación de memoria
    const allocationEffect = document.createElement('div');
    allocationEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(25, 135, 84, 0.2), transparent);
      pointer-events: none;
      border-radius: 15px;
      animation: memoryAllocation 1s ease-out;
    `;
    
    card.style.position = 'relative';
    card.appendChild(allocationEffect);
    
    setTimeout(() => {
      allocationEffect.remove();
    }, 1000);
  }

  showMemoryInfo(card) {
    const title = card.querySelector('.card-title').textContent;
    console.log(`🧠 Mostrando información de memoria: ${title}`);
    
    // Simular información específica de memoria
    const memoryInfo = {
      'Memoria Física': '8GB DDR4 - 2400MHz',
      'Memoria Virtual': '16GB Virtual Memory',
      'Paginación': '4KB pages - LRU Algorithm',
      'Segmentación': 'Code, Data, Stack segments',
      'Recolección de Basura': 'Mark & Sweep GC',
      'Optimización': 'Memory pooling enabled'
    };
    
    const info = memoryInfo[title] || 'Información detallada disponible próximamente';
    console.log(`📋 ${title}: ${info}`);
  }

  initializeScrollEffects() {
    console.log('📜 Configurando efectos de scroll para memoria...');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
          
          // Efecto especial para tarjetas pares
          if (Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 1) {
            entry.target.classList.remove('animate__fadeInLeft');
            entry.target.classList.add('animate__fadeInRight');
          }
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

  // Método para obtener estadísticas de memoria
  getMemoryStats() {
    return {
      usage: this.memoryUsage,
      total: '8GB',
      available: `${Math.round((100 - this.memoryUsage) / 100 * 8 * 100) / 100}GB`,
      type: 'DDR4'
    };
  }

  // Método para simular diferentes tipos de memoria
  simulateMemoryType(type) {
    console.log(`🔄 Simulando tipo de memoria: ${type}`);
    // Implementar según necesidades futuras
  }
}

// CSS adicional para animaciones específicas de memoria
const memoryCSS = `
  @keyframes memoryAllocation {
    0% { transform: translateX(-100%) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%) rotate(360deg); opacity: 0; }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = memoryCSS;
document.head.appendChild(styleSheet);

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM cargado - Inicializando Gestión de Memoria');
  
  if (!window.gestionMemoriaManager) {
    window.gestionMemoriaManager = new GestionMemoriaManager();
  }
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GestionMemoriaManager;
}
