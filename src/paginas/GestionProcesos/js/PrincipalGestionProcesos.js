/**
 * JavaScript específico para la página de Gestión de Procesos
 * Funcionalidades: simulación de procesos, estados y planificación
 */

class GestionProcesosManager {
  constructor() {
    this.initialized = false;
    this.processes = [];
    this.processStates = ['nuevo', 'listo', 'ejecutando', 'bloqueado', 'terminado'];
    this.currentProcessId = 1;
    this.init();
  }

  async init() {
    console.log('⚙️ Inicializando Gestión de Procesos Manager...');
    
    // Esperar a que los componentes se carguen
    await this.waitForComponents();
    
    // Inicializar funcionalidades
    this.initializeProcessAnimations();
    this.initializeProcessSimulation();
    this.initializeCardInteractions();
    this.initializeScrollEffects();
    this.removeLoadingClass();
    
    this.initialized = true;
    console.log('✅ Gestión de Procesos Manager inicializado');
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

  initializeProcessAnimations() {
    console.log('🎨 Inicializando animaciones de procesos...');
    
    // Animación especial para el hero
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
      heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.transform = 'scale(1.05) perspective(1000px) rotateY(5deg)';
        heroTitle.style.filter = 'drop-shadow(0 0 25px rgba(13, 110, 253, 0.6))';
      });
      
      heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'scale(1) perspective(1000px) rotateY(0deg)';
        heroTitle.style.filter = '';
      });
    }

    // Efectos de rotación en los iconos de procesos
    const processIcons = document.querySelectorAll('.concepts-section .bi');
    processIcons.forEach((icon, index) => {
      // Efecto de rotación continua para simular procesamiento
      icon.addEventListener('mouseenter', () => {
        icon.style.filter = 'drop-shadow(0 0 15px rgba(13, 110, 253, 0.8)) brightness(1.4)';
        icon.style.transform = 'scale(1.3) rotate(360deg)';
        icon.style.transition = 'all 0.6s ease';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.filter = '';
        icon.style.transform = '';
        icon.style.transition = 'all 0.3s ease';
      });

      // Animación de estado de proceso
      this.simulateProcessState(icon, index);
    });
  }

  simulateProcessState(icon, index) {
    const states = ['ready', 'running', 'waiting', 'terminated'];
    const colors = ['#17a2b8', '#28a745', '#ffc107', '#dc3545'];
    
    setInterval(() => {
      const stateIndex = Math.floor(Math.random() * states.length);
      const color = colors[stateIndex];
      
      icon.style.color = color;
      icon.style.filter = `drop-shadow(0 0 8px ${color})`;
      
      setTimeout(() => {
        icon.style.color = '';
        icon.style.filter = '';
      }, 1000);
    }, (index + 1) * 2000);
  }

  initializeProcessSimulation() {
    console.log('🔄 Inicializando simulación de procesos...');
    
    // Crear monitor de procesos en el hero
    const heroSection = document.querySelector('.hero-section .container');
    if (heroSection && !document.querySelector('.process-monitor')) {
      const processMonitor = document.createElement('div');
      processMonitor.className = 'process-monitor mt-4';
      processMonitor.innerHTML = `
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="process-dashboard p-3 rounded" style="background: rgba(255,255,255,0.1);">
              <h6 class="text-white mb-3">Monitor de Procesos del Sistema</h6>
              <div class="row text-center">
                <div class="col-3">
                  <div class="process-stat">
                    <div class="process-indicator nuevo"></div>
                    <span class="text-white-50">Nuevos</span>
                    <div class="process-count" id="nuevos-count">0</div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="process-stat">
                    <div class="process-indicator listo"></div>
                    <span class="text-white-50">Listos</span>
                    <div class="process-count" id="listos-count">0</div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="process-stat">
                    <div class="process-indicator ejecutando"></div>
                    <span class="text-white-50">Ejecutando</span>
                    <div class="process-count" id="ejecutando-count">0</div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="process-stat">
                    <div class="process-indicator terminado"></div>
                    <span class="text-white-50">Terminados</span>
                    <div class="process-count" id="terminados-count">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      heroSection.appendChild(processMonitor);
      
      // Iniciar simulación de procesos
      this.startProcessSimulation();
    }
  }

  startProcessSimulation() {
    console.log('🚀 Iniciando simulación de procesos...');
    
    // Generar procesos aleatorios
    setInterval(() => {
      this.createRandomProcess();
    }, 2000);

    // Actualizar estados de procesos
    setInterval(() => {
      this.updateProcessStates();
    }, 1500);

    // Limpiar procesos terminados
    setInterval(() => {
      this.cleanupTerminatedProcesses();
    }, 10000);
  }

  createRandomProcess() {
    const process = {
      id: this.currentProcessId++,
      name: `Proceso_${this.currentProcessId}`,
      state: 'nuevo',
      priority: Math.floor(Math.random() * 5) + 1,
      created: Date.now()
    };
    
    this.processes.push(process);
    this.updateProcessCounters();
    console.log(`➕ Proceso creado: ${process.name} (ID: ${process.id})`);
  }

  updateProcessStates() {
    this.processes.forEach(process => {
      if (process.state !== 'terminado') {
        const currentIndex = this.processStates.indexOf(process.state);
        if (currentIndex < this.processStates.length - 1 && Math.random() > 0.5) {
          process.state = this.processStates[currentIndex + 1];
        }
      }
    });
    
    this.updateProcessCounters();
  }

  updateProcessCounters() {
    const counts = {
      nuevo: 0,
      listo: 0,
      ejecutando: 0,
      bloqueado: 0,
      terminado: 0
    };

    this.processes.forEach(process => {
      counts[process.state]++;
    });

    // Actualizar contadores en la UI
    const updateCounter = (state, count) => {
      const element = document.getElementById(`${state}s-count`);
      if (element) {
        element.textContent = count;
        element.style.color = count > 0 ? '#fff' : '#ffffff80';
      }
    };

    updateCounter('nuevo', counts.nuevo);
    updateCounter('listo', counts.listo);
    updateCounter('ejecutando', counts.ejecutando);
    updateCounter('terminado', counts.terminado);
  }

  cleanupTerminatedProcesses() {
    const initialLength = this.processes.length;
    this.processes = this.processes.filter(process => {
      return process.state !== 'terminado' || (Date.now() - process.created) < 30000;
    });
    
    if (this.processes.length < initialLength) {
      console.log(`🧹 Limpieza: ${initialLength - this.processes.length} procesos eliminados`);
    }
  }

  initializeCardInteractions() {
    console.log('🎯 Configurando interacciones de tarjetas de procesos...');
    
    const cards = document.querySelectorAll('.concepts-section .card');
    cards.forEach((card, index) => {
      // Efecto de entrada con rotación
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) rotateX(0deg)';
      }, index * 100);

      // Efecto de click con simulación de ejecución de proceso
      card.addEventListener('click', () => {
        this.simulateProcessExecution(card);
        this.showProcessInfo(card);
      });

      // Efectos de hover con perspectiva 3D
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 12px 40px rgba(13, 110, 253, 0.4)';
        card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
        card.style.background = 'linear-gradient(135deg, rgba(13, 110, 253, 0.05), rgba(102, 16, 242, 0.05))';
      });

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.transform = '';
        card.style.background = '';
      });
    });
  }

  simulateProcessExecution(card) {
    console.log('⚡ Simulando ejecución de proceso...');
    
    // Crear efecto visual de ejecución
    const executionEffect = document.createElement('div');
    executionEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(13, 110, 253, 0.3), transparent);
      pointer-events: none;
      border-radius: 15px;
      animation: processExecution 2s ease-in-out;
    `;
    
    card.style.position = 'relative';
    card.appendChild(executionEffect);
    
    // Simular tiempo de ejecución variable
    const executionTime = Math.random() * 1500 + 500;
    setTimeout(() => {
      executionEffect.remove();
    }, executionTime);
  }

  showProcessInfo(card) {
    const title = card.querySelector('.card-title').textContent;
    console.log(`⚙️ Mostrando información de proceso: ${title}`);
    
    // Información específica de cada concepto
    const processInfo = {
      'Estados de Procesos': 'Nuevo → Listo → Ejecutando → Bloqueado/Terminado',
      'Planificación': 'Round Robin, SJF, Priority, FCFS algorithms',
      'Hilos (Threads)': 'Lightweight processes, shared memory space',
      'Cambio de Contexto': 'PCB save/restore, register switching',
      'Comunicación': 'Pipes, Signals, Shared Memory, Message Queues',
      'Sincronización': 'Semaphores, Mutexes, Monitors, Condition Variables'
    };
    
    const info = processInfo[title] || 'Información detallada próximamente';
    console.log(`📋 ${title}: ${info}`);
  }

  initializeScrollEffects() {
    console.log('📜 Configurando efectos de scroll para procesos...');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          
          // Alternar animaciones para crear efecto de "proceso en cola"
          if (index % 3 === 0) {
            entry.target.classList.add('animate__animated', 'animate__slideInLeft');
          } else if (index % 3 === 1) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          } else {
            entry.target.classList.add('animate__animated', 'animate__slideInRight');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    const animateElements = document.querySelectorAll('.concepts-section .card');
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  removeLoadingClass() {
    console.log('🎬 Removiendo clase de carga...');
    document.body.classList.remove('component-loading');
  }

  // Métodos adicionales para gestión de procesos
  getActiveProcesses() {
    return this.processes.filter(p => p.state !== 'terminado');
  }

  getProcessByState(state) {
    return this.processes.filter(p => p.state === state);
  }

  killProcess(processId) {
    const process = this.processes.find(p => p.id === processId);
    if (process) {
      process.state = 'terminado';
      console.log(`💀 Proceso terminado: ${process.name}`);
    }
  }
}

// CSS adicional para animaciones específicas de procesos
const processCSS = `
  @keyframes processExecution {
    0% { transform: translateX(-100%) scaleY(0.8); opacity: 0; }
    50% { transform: translateX(0%) scaleY(1); opacity: 1; }
    100% { transform: translateX(100%) scaleY(0.8); opacity: 0; }
  }
  
  .process-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 auto 8px;
    animation: processPulse 2s ease-in-out infinite;
  }
  
  .process-indicator.nuevo { background: #17a2b8; }
  .process-indicator.listo { background: #ffc107; }
  .process-indicator.ejecutando { background: #28a745; }
  .process-indicator.terminado { background: #dc3545; }
  
  .process-count {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
  }
  
  .process-stat {
    padding: 8px;
    border-radius: 8px;
    background: rgba(255,255,255,0.05);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = processCSS;
document.head.appendChild(styleSheet);

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM cargado - Inicializando Gestión de Procesos');
  
  if (!window.gestionProcesosManager) {
    window.gestionProcesosManager = new GestionProcesosManager();
  }
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GestionProcesosManager;
}
