/* ===== JAVASCRIPT MODERNO PÁGINA HISTORIA ===== */
/* Animaciones fluidas, contadores animados y UX avanzado */

class HistoriaManager {
    constructor() {
        this.scrollObserver = null;
        this.isInitialized = false;
        this.counters = new Map();
        this.hasAnimatedCounters = false;
        this.throttledUpdate = null;
    }

    async init() {
        console.log('🚀 Inicializando HistoriaManager moderno...');
        
        try {
            await this.waitForComponents();
            
            this.addLoadingClass();
            
            // Inicializar todos los módulos
            this.initializeScrollAnimations();
            this.initializeCounterAnimations();
            this.initializeScrollProgress();
            this.initializeParticleEffects();
            this.initializeCardInteractions();
            this.initializeThemeSupport();
            this.initializeComponentEvents();
            
            // Asegurar compatibilidad
            this.ensureComponentCompatibility();
            
            this.removeLoadingClass();
            this.isInitialized = true;
            
            console.log('✅ HistoriaManager inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando HistoriaManager:', error);
        }
    }

    /* ===== ANIMACIONES DE SCROLL AVANZADAS ===== */
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                    const delayMs = parseFloat(delay) * 1000;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Activar contadores cuando sean visibles
                        if (entry.target.closest('.hero-stats') && !this.hasAnimatedCounters) {
                            this.animateCounters();
                            this.hasAnimatedCounters = true;
                        }
                    }, delayMs);
                    
                    this.scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.querySelectorAll('.scroll-animate').forEach(el => {
            this.scrollObserver.observe(el);
        });

        console.log('🎭 Animaciones de scroll avanzadas inicializadas');
    }

    /* ===== CONTADORES ANIMADOS ===== */
    initializeCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-count]');
        
        counterElements.forEach(element => {
            const targetCount = parseInt(element.getAttribute('data-count'));
            this.counters.set(element, targetCount);
        });
        
        console.log('📊 Contadores inicializados:', this.counters.size);
    }

    animateCounters() {
        this.counters.forEach((targetCount, element) => {
            this.animateCounter(element, targetCount);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 segundos
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
        }, stepTime);
    }

    /* ===== EFECTOS DE PARTÍCULAS ===== */
    initializeParticleEffects() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        // Crear partículas adicionales
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${50 + Math.random() * 100}px;
                height: ${50 + Math.random() * 100}px;
                background: rgba(255, 255, 255, ${0.05 + Math.random() * 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${4 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            heroParticles.appendChild(particle);
        }

        console.log('✨ Efectos de partículas inicializados');
    }

    /* ===== INTERACCIONES DE TARJETAS ===== */
    initializeCardInteractions() {
        const cards = document.querySelectorAll('.historia-card, .impact-card');
        
        cards.forEach(card => {
            // Efecto de inclinación con mouse
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
            
            // Efectos de sonido visual
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });

        console.log('🎮 Interacciones de tarjetas inicializadas');
    }

    /* ===== PROGRESO DE SCROLL MEJORADO ===== */
    initializeScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            
            // Cambiar color según progreso
            if (scrollPercent < 25) {
                progressBar.style.background = 'var(--era-1940)';
            } else if (scrollPercent < 50) {
                progressBar.style.background = 'var(--era-1980)';
            } else if (scrollPercent < 75) {
                progressBar.style.background = 'var(--era-1990)';
            } else {
                progressBar.style.background = 'var(--era-actual)';
            }
        };

        let ticking = false;
        this.throttledUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', this.throttledUpdate, { passive: true });
        window.addEventListener('resize', this.throttledUpdate, { passive: true });
        
        updateProgress();
        console.log('📊 Progreso de scroll mejorado inicializado');
    }

    /* ===== SOPORTE PARA TEMA MEJORADO ===== */
    initializeThemeSupport() {
        const savedTheme = localStorage.getItem('secotogpt-dark');
        const isDark = savedTheme === 'true';
        
        if (isDark) {
            document.body.classList.add('dark');
            this.updateThemeVariables(true);
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDark = document.body.classList.contains('dark');
                    this.updateThemeVariables(isDark);
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        console.log('🎨 Soporte de tema mejorado inicializado');
    }

    updateThemeVariables(isDark) {
        const root = document.documentElement;
        
        if (isDark) {
            // Variables específicas para modo oscuro
            root.style.setProperty('--text-primary', '#f7fafc');
            root.style.setProperty('--text-secondary', '#a0aec0');
            root.style.setProperty('--bg-primary', '#1a202c');
            root.style.setProperty('--bg-secondary', '#2d3748');
            root.style.setProperty('--bg-accent', '#4a5568');
            root.style.setProperty('--border-color', '#4a5568');
        } else {
            // Variables para modo claro
            root.style.setProperty('--text-primary', '#2d3748');
            root.style.setProperty('--text-secondary', '#718096');
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f7fafc');
            root.style.setProperty('--bg-accent', '#edf2f7');
            root.style.setProperty('--border-color', '#e2e8f0');
        }
    }

    /* ===== EVENTOS DE COMPONENTES ===== */
    initializeComponentEvents() {
        this.reinitializeHeaderEvents();
        this.reinitializeFooterEvents();
        
        // Eventos personalizados
        document.addEventListener('themeChanged', () => {
            this.handleThemeChange();
        });
        
        console.log('🔄 Eventos de componentes inicializados');
    }

    reinitializeHeaderEvents() {
        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle && !themeToggle.hasAttribute('data-initialized')) {
            themeToggle.addEventListener('change', () => {
                setTimeout(() => this.updateThemeVariables(themeToggle.checked), 100);
            });
            themeToggle.setAttribute('data-initialized', 'true');
        }
    }

    reinitializeFooterEvents() {
        const footerIconItems = document.querySelectorAll('.footer-icon-item');
        footerIconItems.forEach(item => {
            if (!item.hasAttribute('data-initialized')) {
                this.setupFooterDropdown(item);
                item.setAttribute('data-initialized', 'true');
            }
        });
    }

    setupFooterDropdown(item) {
        const section = item.getAttribute('data-section');
        const content = document.querySelector(`#${section}-content`);
        
        if (content) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                this.forceCloseAllDropdowns();
                
                setTimeout(() => {
                    content.classList.toggle('show');
                }, 50);
            });
        }
    }

    /* ===== UTILIDADES ===== */
    forceCloseAllDropdowns() {
        const dropdowns = document.querySelectorAll('[id$="-content"]');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    async waitForComponents() {
        return new Promise((resolve) => {
            const checkComponents = () => {
                const header = document.querySelector('#header-placeholder > *');
                const footer = document.querySelector('#footer-placeholder > *');
                
                if (header && footer) {
                    resolve();
                } else {
                    setTimeout(checkComponents, 100);
                }
            };
            checkComponents();
        });
    }

    ensureComponentCompatibility() {
        const footer = document.querySelector('footer');
        if (footer) {
            this.ensureFooterVisibility(footer);
        }
        
        this.handleComponentPaths();
        console.log('🔧 Compatibilidad de componentes asegurada');
    }

    ensureFooterVisibility(footer) {
        if (footer.style.display === 'none') {
            footer.style.display = 'block';
        }
        
        if (footer.style.visibility === 'hidden') {
            footer.style.visibility = 'visible';
        }
    }

    handleComponentPaths() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('./') && !href.includes('Historia')) {
                link.setAttribute('href', href.replace('./', '../'));
            }
        });
    }

    addLoadingClass() {
        document.body.classList.add('component-loading');
    }

    removeLoadingClass() {
        document.body.classList.remove('component-loading');
        document.body.classList.add('component-loaded');
    }

    handleThemeChange() {
        const isDark = document.body.classList.contains('dark');
        this.updateThemeVariables(isDark);
        
        // Reanimacar elementos si es necesario
        if (this.isInitialized) {
            this.updateCardColors(isDark);
        }
    }

    updateCardColors(isDark) {
        const cards = document.querySelectorAll('.historia-card, .impact-card');
        cards.forEach(card => {
            if (isDark) {
                card.style.backgroundColor = 'var(--bg-secondary)';
                card.style.borderColor = 'var(--border-color)';
            } else {
                card.style.backgroundColor = 'var(--bg-primary)';
                card.style.borderColor = 'var(--border-color)';
            }
        });
    }

    /* ===== DESTRUCTOR ===== */
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        
        // Limpiar event listeners
        if (this.throttledUpdate) {
            window.removeEventListener('scroll', this.throttledUpdate);
            window.removeEventListener('resize', this.throttledUpdate);
        }
        
        // Limpiar contadores
        this.counters.clear();
        
        console.log('🧹 HistoriaManager destruido');
    }
}

/* ===== FUNCIONES GLOBALES ===== */

function reinitializeComponents() {
    if (window.HeaderManager) {
        window.HeaderManager.init();
    }
    
    if (window.FooterManager) {
        window.FooterManager.init();
    }
    
    if (typeof initializeModoOscuro === 'function') {
        initializeModoOscuro();
    }
}

function debugComponents() {
    console.log('🔍 Estado de componentes:', {
        header: !!document.querySelector('#header-placeholder > *'),
        footer: !!document.querySelector('#footer-placeholder > *'),
        headerManager: !!window.HeaderManager,
        footerManager: !!window.FooterManager,
        darkMode: document.body.classList.contains('dark'),
        historiaManager: !!window.historiaManager
    });
}

function forceCloseDropdowns() {
    if (window.historiaManager) {
        window.historiaManager.forceCloseAllDropdowns();
    }
}

window.forceCloseDropdowns = forceCloseDropdowns;

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando página Historia moderna...');
    
    const historiaManager = new HistoriaManager();
    window.historiaManager = historiaManager;
    
    historiaManager.init();
    
    // Cleanup al salir de la página
    window.addEventListener('beforeunload', () => {
        historiaManager.destroy();
    });
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HistoriaManager;
}
