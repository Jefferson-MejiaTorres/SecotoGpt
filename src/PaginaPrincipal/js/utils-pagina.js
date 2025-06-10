/* ===== UTILIDADES PÁGINA PRINCIPAL ===== */
/* Funcionalidades específicas como progreso de scroll, lazy loading y optimizaciones */

class UtilsPaginaPrincipal {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        this.addScrollToTopButton();
    }

    /* ===== INDICADOR DE PROGRESO DE SCROLL ===== */
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const updateScrollProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        };

        // Throttle para mejor rendimiento
        const throttledUpdate = this.throttle(updateScrollProgress, 10);
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        
        // Inicializar
        updateScrollProgress();
    }

    /* ===== LAZY LOADING PARA IMÁGENES ===== */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /* ===== OBSERVER PARA ANIMACIONES ===== */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Añadir delay para animaciones escalonadas
                    const children = entry.target.querySelectorAll('.stagger-animation');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observar elementos con clase scroll-animate
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    /* ===== OPTIMIZACIONES DE RENDIMIENTO ===== */
    setupPerformanceOptimizations() {
        // Precargar páginas importantes
        this.preloadCriticalPages();
        
        // Optimizar animaciones
        this.optimizeAnimations();
        
        // Reducir repaints
        this.optimizeScrollHandlers();
    }

    preloadCriticalPages() {
        const criticalPages = [
            './src/paginas/sistemas_operativos.html',
            './src/paginas/gestion_procesos.html'
        ];

        criticalPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }

    optimizeAnimations() {
        // Deshabilitar animaciones si el usuario prefiere movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-speed', '0.01s');
        }

        // Pausar animaciones cuando la pestaña no está visible
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[class*="animate"]');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }

    optimizeScrollHandlers() {
        let isScrolling = false;

        const scrollHandler = () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    updateScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Parallax sutil para elementos específicos
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Actualizar navbar según scroll
        this.updateNavbarOnScroll(scrollY);
    }

    updateNavbarOnScroll(scrollY) {
        const header = document.querySelector('header');
        if (!header) return;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* ===== BOTÓN SCROLL TO TOP ===== */
    addScrollToTopButton() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top-btn';
        scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
        
        // Estilos inline para el botón
        Object.assign(scrollToTopBtn.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-se), var(--color-co))',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: '1000',
            boxShadow: '0 4px 20px rgba(168, 237, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });

        document.body.appendChild(scrollToTopBtn);

        // Mostrar/ocultar botón según scroll
        const toggleScrollToTop = () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        };

        window.addEventListener('scroll', this.throttle(toggleScrollToTop, 100), { passive: true });

        // Funcionalidad del botón
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Efecto hover
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'scale(1.1)';
            scrollToTopBtn.style.boxShadow = '0 6px 24px rgba(168, 237, 234, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'scale(1)';
            scrollToTopBtn.style.boxShadow = '0 4px 20px rgba(168, 237, 234, 0.3)';
        });
    }

    /* ===== UTILIDADES GENERALES ===== */
    
    // Función throttle mejorada
    throttle(func, delay) {
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

    // Función debounce
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Detectar soporte para scroll suave
    supportssmoothScroll() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    // Polyfill para scroll suave si no es compatible
    smoothScrollTo(target, duration = 800) {
        if (this.supportssmoothScroll()) {
            target.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation.bind(this));
    }

    // Función de easing para animaciones suaves
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    /* ===== MANEJO DE ERRORES Y LOGS ===== */
    
    logPerformance() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Performance Metrics:', {
                'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`,
                'Load Complete': `${perfData.loadEventEnd - perfData.navigationStart}ms`,
                'DNS Lookup': `${perfData.domainLookupEnd - perfData.domainLookupStart}ms`
            });
        }
    }

    handleErrors() {
        window.addEventListener('error', (event) => {
            console.error('❌ Error capturado:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ Promise rejection:', event.reason);
        });
    }
}

/* ===== FUNCIONES ESPECÍFICAS DEL DOM ===== */

// Función para actualizar el tema
const updateThemeColors = (isDark) => {
    const root = document.documentElement;
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    if (isDark) {
        root.style.setProperty('--shadow-light', '0 4px 20px rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--shadow-medium', '0 8px 32px rgba(0, 0, 0, 0.4)');
        if (scrollProgressBar) {
            scrollProgressBar.style.opacity = '0.8';
        }
    } else {
        root.style.setProperty('--shadow-light', '0 4px 20px rgba(168, 237, 234, 0.15)');
        root.style.setProperty('--shadow-medium', '0 8px 32px rgba(168, 237, 234, 0.2)');
        if (scrollProgressBar) {
            scrollProgressBar.style.opacity = '1';
        }
    }
};

// Función para inicializar tooltips (si se usan)
const initializeTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            Object.assign(tooltip.style, {
                position: 'absolute',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                zIndex: '1001',
                pointerEvents: 'none'
            });
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
};

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar utilidades
    new UtilsPaginaPrincipal();
    
    // Inicializar tooltips
    initializeTooltips();
    
    // Manejar cambios de tema
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDark = document.body.classList.contains('dark');
                updateThemeColors(isDark);
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    console.log('🔧 Utilidades de Página Principal inicializadas');
});

/* ===== EXPORT ===== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UtilsPaginaPrincipal;
}
