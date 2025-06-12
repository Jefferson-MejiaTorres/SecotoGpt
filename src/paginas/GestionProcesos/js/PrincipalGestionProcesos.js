/**
 * JavaScript específico para la página de Gestión de Procesos
 * Funcionalidades: simulación de procesos, estados y planificación
 */

class GestionProcesosManager {
  constructor() {
    this.initialized = false;
    this.init();
  }

  async init() {
    console.log('⚙️ Inicializando Gestión de Procesos Manager...');
    
    // Esperar a que los componentes se carguen
    await this.waitForComponents();
    
    // Inicializar funcionalidades específicas para página en desarrollo
    this.initializeDevelopmentPage();
    this.initializeDevelopmentAnimations();
    this.initializeButtonInteractions();
    this.removeLoadingClass();
    
    this.initialized = true;
    console.log('✅ Gestión de Procesos Manager inicializado - Página en Desarrollo');
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
  initializeDevelopmentPage() {
    console.log('🔧 Inicializando página de desarrollo...');
    
    // Verificar que existe la sección de desarrollo
    const developmentSection = document.querySelector('.development-section');
    if (developmentSection) {
      console.log('✅ Sección de desarrollo encontrada');
      
      // Hacer visible la sección inmediatamente
      developmentSection.style.opacity = '1';
      developmentSection.style.transform = 'translateY(0)';
      
      // Agregar efecto de entrada
      setTimeout(() => {
        developmentSection.classList.add('animate__animated', 'animate__fadeInUp');
      }, 300);
    } else {
      console.warn('⚠️ Sección de desarrollo no encontrada');
    }
  }

  initializeDevelopmentAnimations() {
    console.log('🎨 Inicializando animaciones de desarrollo...');
    
    // Animar el icono principal
    const developmentIcon = document.querySelector('.development-icon');
    if (developmentIcon) {
      // Agregar efecto hover adicional
      developmentIcon.addEventListener('mouseenter', () => {
        developmentIcon.style.transform = 'scale(1.1) rotate(10deg)';
        developmentIcon.style.filter = 'drop-shadow(0 0 20px rgba(13, 110, 253, 0.8))';
      });
      
      developmentIcon.addEventListener('mouseleave', () => {
        developmentIcon.style.transform = '';
        developmentIcon.style.filter = '';
      });
    }

    // Animar la tarjeta de desarrollo
    const developmentCard = document.querySelector('.development-card');
    if (developmentCard) {
      // Efecto de entrada retrasado
      setTimeout(() => {
        developmentCard.style.transform = 'translateY(0)';
        developmentCard.style.opacity = '1';
      }, 500);

      // Efecto parallax sutil al hacer scroll
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;
        developmentCard.style.transform = `translateY(${parallax}px)`;
      });
    }

    // Animar elementos de progreso
    const progressFill = document.querySelector('.development-progress-fill');
    if (progressFill) {
      setTimeout(() => {
        progressFill.style.width = '65%';
      }, 1000);
    }
  }

  initializeButtonInteractions() {
    console.log('🎯 Configurando interacciones de botones...');
    
    // Botón de volver atrás
    const backButtons = document.querySelectorAll('[onclick*="history.back"]');
    backButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔙 Navegando hacia atrás');
        
        // Efecto visual antes de navegar
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          window.history.back();
        }, 150);
      });
    });

    // Botón de ir al inicio
    const homeButtons = document.querySelectorAll('[onclick*="secotogpt.html"]');
    homeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🏠 Navegando al inicio');
        
        // Efecto visual antes de navegar
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          window.location.href = '../../../secotogpt.html';
        }, 150);
      });
    });

    // Agregar efectos hover a todos los botones de desarrollo
    const developmentButtons = document.querySelectorAll('.btn-development');
    developmentButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }
  removeLoadingClass() {
    console.log('🎬 Removiendo clase de carga...');
    
    // Remover clase de loading del body
    document.body.classList.remove('component-loading');
    
    // Asegurar que el contenido sea visible
    const developmentSection = document.querySelector('.development-section');
    if (developmentSection) {
      developmentSection.style.opacity = '1';
      developmentSection.style.transform = 'translateY(0)';
      developmentSection.style.transition = 'all 0.8s ease';
    }
    
    // Mostrar mensaje en consola
    console.log('✅ Página de desarrollo visible y cargada correctamente');
  }
  // Método para debugging - verificar estado de elementos
  debugPageState() {
    console.log('🔍 Estado de la página:');
    console.log('- Body classes:', document.body.classList.toString());
    console.log('- Development section:', document.querySelector('.development-section') ? 'Existe' : 'No existe');
    console.log('- Development card:', document.querySelector('.development-card') ? 'Existe' : 'No existe');
    console.log('- Manager initialized:', this.initialized);
  }
}

// CSS adicional para animaciones específicas de desarrollo
const developmentCSS = `
  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translateY(50px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes iconFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    50% {
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  
  .development-section {
    transition: all 0.8s ease;
  }
  
  .component-loading .development-section {
    opacity: 0;
    transform: translateY(30px);
  }
  
  body:not(.component-loading) .development-section {
    opacity: 1;
    transform: translateY(0);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = developmentCSS;
document.head.appendChild(styleSheet);

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM cargado - Inicializando Gestión de Procesos (Desarrollo)');
  
  if (!window.gestionProcesosManager) {
    window.gestionProcesosManager = new GestionProcesosManager();
  }
});

// Backup para asegurar inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.gestionProcesosManager) {
      console.log('🔄 Inicialización de respaldo');
      window.gestionProcesosManager = new GestionProcesosManager();
    }
  });
} else {
  // DOM ya está cargado
  console.log('🚀 DOM ya cargado - Inicializando inmediatamente');
  if (!window.gestionProcesosManager) {
    window.gestionProcesosManager = new GestionProcesosManager();
  }
}

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GestionProcesosManager;
}
