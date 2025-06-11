/* ===== JAVASCRIPT ESPECÍFICO PÁGINA HISTORIA ===== */
/* Asegurar que header y footer funcionen exactamente igual que en la página principal */

class HistoriaManager {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    async init() {
        console.log('🎯 Inicializando HistoriaManager...');
        
        // Cargar contenido de historia
        await this.loadHistoriaContent();
        
        // Esperar a que se carguen los componentes
        await this.waitForComponents();
        
        // Forzar cierre de dropdowns al inicio
        this.forceCloseAllDropdowns();
        
        // Inicializar todas las funcionalidades
        this.initializeScrollProgress();
        this.initializeThemeSupport();
        this.initializeComponentEvents();
        this.ensureStylesLoaded();
        this.handleComponentPaths();
        this.initializeHistoriaFeatures();
        
        this.isInitialized = true;
        console.log('✅ HistoriaManager inicializado correctamente');
    }

    /* ===== CARGAR CONTENIDO DE HISTORIA ===== */
    async loadHistoriaContent() {
        try {
            const response = await fetch('./contenido/historia.html');
            if (response.ok) {
                const content = await response.text();
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.innerHTML = content;
                    console.log('📖 Contenido de historia cargado correctamente');
                }
            }
        } catch (error) {
            console.error('❌ Error cargando contenido de historia:', error);
        }
    }

    /* ===== FUNCIONALIDADES ESPECÍFICAS DE HISTORIA ===== */
    initializeHistoriaFeatures() {
        // Inicializar animaciones de scroll para elementos de historia
        this.initializeScrollAnimations();
        
        // Configurar navegación por secciones
        this.setupSectionNavigation();
        
        // Configurar efectos hover en tarjetas
        this.setupCardEffects();
        
        // Configurar timeline interactivo
        this.setupTimelineEffects();
        
        // Configurar efectos de parallax sutil
        this.setupParallaxEffects();
        
        console.log('🎭 Funcionalidades de historia inicializadas');
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animación específica para iconos de período
                    const periodIcon = entry.target.querySelector('.period-icon');
                    if (periodIcon) {
                        setTimeout(() => {
                            periodIcon.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                periodIcon.style.transform = 'scale(1)';
                            }, 200);
                        }, 300);
                    }
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    setupSectionNavigation() {
        // Agregar navegación suave entre secciones
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Agregar indicador de sección activa
        this.setupActiveSection();
    }

    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('a[href^="#"]');

        const updateActiveSection = () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                if (href === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveSection, { passive: true });
    }

    setupCardEffects() {
        // Efectos hover para tarjetas de historia
        const cards = document.querySelectorAll('.historia-card, .concept-card, .impact-card, .future-card, .connectivity-card, .modern-tech-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.transition = 'all 0.3s ease';
                
                // Efecto en el icono si existe
                const icon = card.querySelector('.historia-card-icon, .concept-icon, .impact-icon, .future-icon, .connectivity-icon, .modern-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                
                const icon = card.querySelector('.historia-card-icon, .concept-icon, .impact-icon, .future-icon, .connectivity-icon, .modern-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    setupTimelineEffects() {
        // Efectos para la timeline de evolución
        const timelineItems = document.querySelectorAll('.evolution-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Efecto de aparición del año
                    const year = entry.target.querySelector('.evolution-year');
                    if (year) {
                        setTimeout(() => {
                            year.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                year.style.transform = 'scale(1)';
                            }, 200);
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            timelineObserver.observe(item);
        });
    }

    setupParallaxEffects() {
        // Efecto parallax sutil para elementos de fondo
        const parallaxElements = document.querySelectorAll('.period-header');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * 0.05 * (index + 1);
                element.style.transform = `translateY(${rate}px)`;
            });
        }, { passive: true });
    }

    /* ===== FUNCIONES HEREDADAS DE CONTACTANOS ===== */
    
    /* ===== FORZAR CIERRE DE DROPDOWNS ===== */
    forceCloseAllDropdowns() {
        const footer = document.querySelector('#footer-placeholder .footer-modern');
        if (!footer) return;

        // Cerrar todos los dropdowns
        const dropdownSections = footer.querySelectorAll('.footer-dropdown-section');
        const iconItems = footer.querySelectorAll('.footer-icon-item');

        dropdownSections.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
        });

        iconItems.forEach(icon => {
            icon.classList.remove('active');
        });

        console.log('🔒 Todos los dropdowns forzados a cerrar');
    }

    /* ===== ESPERAR COMPONENTES ===== */
    async waitForComponents() {
        const maxAttempts = 100;
        let attempts = 0;
        
        return new Promise((resolve) => {
            const checkComponents = () => {
                const header = document.querySelector('#header-placeholder .modern-header');
                const footer = document.querySelector('#footer-placeholder .footer-modern');
                
                console.log(`Intento ${attempts}: Header=${!!header}, Footer=${!!footer}`);
                
                if ((header && footer) || attempts >= maxAttempts) {
                    console.log('📦 Componentes cargados:', { header: !!header, footer: !!footer });
                    
                    if (footer) {
                        this.ensureFooterVisibility(footer);
                    }
                    
                    resolve();
                } else {
                    attempts++;
                    setTimeout(checkComponents, 50);
                }
            };
            checkComponents();
        });
    }

    /* ===== ASEGURAR VISIBILIDAD DEL FOOTER ===== */
    ensureFooterVisibility(footer) {
        const visibleElements = [
            '.footer-content',
            '.footer-copyright-top', 
            '.footer-sections',
            '.footer-icons-row',
            '.footer-collapsible-content',
            '.footer-bottom'
        ];

        visibleElements.forEach(selector => {
            const element = footer.querySelector(selector);
            if (element) {
                element.style.display = '';
                element.style.opacity = '1';
                element.style.visibility = 'visible';
            }
        });

        const dropdownSections = footer.querySelectorAll('.footer-dropdown-section');
        dropdownSections.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
        });

        const iconItems = footer.querySelectorAll('.footer-icon-item');
        iconItems.forEach(icon => {
            icon.classList.remove('active');
        });

        console.log('✅ Visibilidad del footer asegurada');
    }

    /* ===== PROGRESO DE SCROLL ===== */
    initializeScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        };

        let ticking = false;
        const throttledUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledUpdate, { passive: true });
        window.addEventListener('resize', throttledUpdate, { passive: true });
        
        updateProgress();
        console.log('📊 Progreso de scroll inicializado');
    }

    /* ===== SOPORTE PARA TEMA ===== */
    initializeThemeSupport() {
        const savedTheme = localStorage.getItem('secotogpt-dark');
        const isDark = savedTheme === 'true';
        
        if (isDark) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.handleThemeChange();
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        console.log('🎨 Soporte de tema inicializado');
    }

    handleThemeChange() {
        const isDark = document.body.classList.contains('dark');
        const root = document.documentElement;
        
        if (isDark) {
            root.style.setProperty('--color-bg', '#22223b');
            root.style.setProperty('--color-text', '#ffffff');
            root.style.setProperty('--color-primary', '#a8edea');
        } else {
            root.style.setProperty('--color-bg', '#ffffff');
            root.style.setProperty('--color-text', '#000000');
            root.style.setProperty('--color-primary', '#007bff');
        }
    }

    /* ===== EVENTOS DE COMPONENTES ===== */
    initializeComponentEvents() {
        this.reinitializeHeaderEvents();
        this.reinitializeFooterEvents();
        console.log('🔄 Eventos de componentes inicializados');
    }

    reinitializeHeaderEvents() {
        const searchInput = document.querySelector('#mainSearchInput');
        if (searchInput && window.HeaderManager) {
            new window.HeaderManager();
        }

        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle && !themeToggle.hasAttribute('data-initialized')) {
            themeToggle.setAttribute('data-initialized', 'true');
        }
    }

    reinitializeFooterEvents() {
        const footerIconItems = document.querySelectorAll('.footer-icon-item');
        footerIconItems.forEach(item => {
            if (!item.hasAttribute('data-initialized')) {
                item.setAttribute('data-initialized', 'true');
                this.setupFooterDropdown(item);
            }
        });
    }

    setupFooterDropdown(item) {
        const section = item.getAttribute('data-section');
        const content = document.querySelector(`#${section}-content`);
        
        if (content) {
            item.addEventListener('click', () => {
                const isActive = content.classList.contains('active');
                
                document.querySelectorAll('.footer-dropdown-section.active').forEach(el => {
                    el.classList.remove('active');
                });
                document.querySelectorAll('.footer-icon-item.active').forEach(el => {
                    el.classList.remove('active');
                });
                
                if (!isActive) {
                    content.classList.add('active');
                    item.classList.add('active');
                }
            });
        }
    }

    /* ===== ASEGURAR ESTILOS ===== */
    ensureStylesLoaded() {
        const criticalStyles = ['bootstrap', 'footer-modern', 'header-modern', 'historia'];

        criticalStyles.forEach(style => {
            this.checkStyleLoaded(style);
        });
    }

    checkStyleLoaded(styleName) {
        const styleSheets = Array.from(document.styleSheets);
        const isLoaded = styleSheets.some(sheet => {
            try {
                return sheet.href && sheet.href.includes(styleName);
            } catch (e) {
                return false;
            }
        });

        if (!isLoaded) {
            console.warn(`⚠️ Estilo ${styleName} podría no estar cargado correctamente`);
        }
    }

    /* ===== MANEJAR RUTAS DE COMPONENTES ===== */
    handleComponentPaths() {
        const footerLogo = document.querySelector('.footer-logo-image');
        if (footerLogo && footerLogo.src.includes('./imagenes/')) {
            footerLogo.src = '../../../../imagenes/logo_secotogpt.svg';
        }

        const headerLogo = document.querySelector('.logo-img');
        if (headerLogo && headerLogo.src.includes('./imagenes/')) {
            headerLogo.src = '../../../../imagenes/logo_secotogpt.svg';
        }

        console.log('🔗 Rutas de componentes verificadas');
    }

    /* ===== UTILIDADES ===== */
    addLoadingClass() {
        document.body.classList.add('component-loading');
    }

    removeLoadingClass() {
        document.body.classList.remove('component-loading');
        document.body.classList.add('component-loaded');
    }
}

/* ===== FUNCIONES GLOBALES DE COMPATIBILIDAD ===== */

function reinitializeComponents() {
    if (window.HeaderManager) {
        new window.HeaderManager();
    }
    
    if (window.FooterManager) {
        new window.FooterManager();
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
        componentLoader: !!window.componentLoader
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
    console.log('🚀 Inicializando página Historia...');
    
    const historiaManager = new HistoriaManager();
    
    window.historiaManager = historiaManager;
    
    setTimeout(() => {
        console.log('🔄 Reinicializando componentes...');
        reinitializeComponents();
        historiaManager.removeLoadingClass();
    }, 1000);
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HistoriaManager;
}
