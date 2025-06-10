/* ===== JAVASCRIPT PÁGINA PRINCIPAL SECOTOGPT ===== */
/* Manejo de animaciones, scroll suave y interacciones mejoradas */

class PaginaPrincipal {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCardHoverEffects();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.observeElementsInView();
    }

    /* ===== ANIMACIONES DE SCROLL ===== */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones de scroll
        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => observer.observe(el));
    }

    /* ===== EFECTOS DE HOVER EN TARJETAS ===== */
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.topic-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });
    }

    handleCardHover(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.card-icon');
        
        // Añadir clase de hover
        card.classList.add('card-hovered');
        
        // Efecto de partículas sutil (opcional)
        this.createHoverEffect(card);
    }

    handleCardLeave(e) {
        const card = e.currentTarget;
        card.classList.remove('card-hovered');
    }

    createHoverEffect(card) {
        // Crear un efecto sutil de brillo en el hover
        const rect = card.getBoundingClientRect();
        const existingEffect = card.querySelector('.hover-effect');
        
        if (existingEffect) {
            existingEffect.remove();
        }

        const effect = document.createElement('div');
        effect.className = 'hover-effect';
        effect.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            pointer-events: none;
            transform: translateX(-100%);
            transition: transform 0.6s ease;
            z-index: 1;
        `;
        
        card.style.position = 'relative';
        card.appendChild(effect);
        
        // Trigger animation
        setTimeout(() => {
            effect.style.transform = 'translateX(100%)';
        }, 50);
        
        // Remove effect after animation
        setTimeout(() => {
            if (effect.parentNode) {
                effect.remove();
            }
        }, 650);
    }    /* ===== SCROLL SUAVE ===== */
    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                
                // Deshabilitar scroll para botones que irán a páginas propias
                if (['#inicio', '#historia', '#contacto'].includes(targetId)) {
                    e.preventDefault();
                    console.log(`Navegación a ${targetId} deshabilitada para futuras páginas propias`);
                    return;
                }
                
                e.preventDefault();
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /* ===== EFECTOS PARALLAX SUTILES ===== */
    setupParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            // Aplicar parallax sutil a la sección de bienvenida
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                welcomeSection.style.transform = `translateY(${rate}px)`;
            }

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Solo aplicar parallax en pantallas grandes
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestParallaxUpdate);
        }
    }

    /* ===== OBSERVADOR DE ELEMENTOS EN VISTA ===== */
    observeElementsInView() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observar tarjetas principales
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Observar secciones de contenido
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => observer.observe(section));
    }

    animateElement(element) {
        element.classList.add('animate-in');
    }

    /* ===== MANEJO DEL TEMA OSCURO ===== */
    handleThemeChange() {
        const isDark = document.body.classList.contains('dark');
        
        // Actualizar colores de las tarjetas según el tema
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            if (isDark) {
                card.style.setProperty('--card-bg', 'rgba(30, 41, 59, 0.9)');
            } else {
                card.style.setProperty('--card-bg', '#ffffff');
            }
        });
    }

    /* ===== UTILIDADES ===== */
    
    // Función para crear animación de escritura de texto
    typewriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    // Función para animar números (contadores)
    animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    /* ===== EFECTOS INTERACTIVOS ===== */
    
    // Efecto de onda en botones
    createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /* ===== PERFORMANCE Y OPTIMIZACIÓN ===== */
    
    // Throttle function para eventos de scroll
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

    // Debounce function para eventos de resize
    debounce(func, delay) {
        let timeoutId;
        
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

/* ===== CSS DINÁMICO PARA ANIMACIONES ===== */
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card-hovered {
            transform: translateY(-8px) !important;
            box-shadow: 0 12px 48px rgba(168, 237, 234, 0.25) !important;
        }
        
        .dark .card-hovered {
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
};

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos dinámicos
    addDynamicStyles();
    
    // Inicializar la página principal
    new PaginaPrincipal();
    
    // Escuchar cambios de tema
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const paginaPrincipal = new PaginaPrincipal();
                paginaPrincipal.handleThemeChange();
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Añadir efectos de ripple a botones
    document.querySelectorAll('.btn-modern').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', function(e) {
            const paginaPrincipal = new PaginaPrincipal();
            paginaPrincipal.createRippleEffect(e);
        });
    });
    
    console.log('🎨 Página Principal SeCoToGpt inicializada con éxito');
});

/* ===== EXPORT PARA REUTILIZACIÓN ===== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaginaPrincipal;
}
