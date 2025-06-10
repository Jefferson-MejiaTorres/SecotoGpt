/* ===== JAVASCRIPT ESPECÍFICO PÁGINA CONTACTANOS ===== */
/* Asegurar que header y footer funcionen exactamente igual que en la página principal */

class ContactanosManager {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    async init() {
        console.log('🎯 Inicializando ContactanosManager...');
        
        // Esperar a que se carguen los componentes
        await this.waitForComponents();
        
        // Inicializar todas las funcionalidades
        this.initializeScrollProgress();
        this.initializeThemeSupport();
        this.initializeComponentEvents();
        this.ensureStylesLoaded();
        this.handleComponentPaths();
          this.isInitialized = true;
        console.log('✅ ContactanosManager inicializado correctamente');
        
        // Paso adicional: asegurar que dropdowns estén cerrados después de todo
        setTimeout(() => {
            this.forceCloseAllDropdowns();
        }, 500);
    }

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
    }/* ===== ESPERAR COMPONENTES ===== */
    async waitForComponents() {
        const maxAttempts = 100; // Aumentar intentos
        let attempts = 0;
        
        return new Promise((resolve) => {
            const checkComponents = () => {
                const header = document.querySelector('#header-placeholder .modern-header');
                const footer = document.querySelector('#footer-placeholder .footer-modern');
                
                console.log(`Intento ${attempts}: Header=${!!header}, Footer=${!!footer}`);
                
                if ((header && footer) || attempts >= maxAttempts) {
                    console.log('📦 Componentes cargados:', { header: !!header, footer: !!footer });
                    
                    // Verificar que el footer tenga todo el contenido
                    if (footer) {
                        const footerSections = footer.querySelector('.footer-sections');
                        const footerIcons = footer.querySelector('.footer-icons-row');
                        console.log('Footer completo:', { sections: !!footerSections, icons: !!footerIcons });
                        
                        // Forzar la visibilidad de todas las secciones
                        this.ensureFooterVisibility(footer);
                    }
                    
                    resolve();
                } else {
                    attempts++;
                    setTimeout(checkComponents, 50); // Reducir delay
                }
            };
            checkComponents();
        });
    }    /* ===== ASEGURAR VISIBILIDAD DEL FOOTER ===== */
    ensureFooterVisibility(footer) {
        // Asegurar que todas las secciones principales sean visibles
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
            } else {
                console.warn(`❌ Elemento no encontrado en footer: ${selector}`);
            }
        });

        // IMPORTANTE: Asegurar que los dropdowns estén CERRADOS por defecto
        const dropdownSections = footer.querySelectorAll('.footer-dropdown-section');
        dropdownSections.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
        });

        // También remover clase activa de los iconos
        const iconItems = footer.querySelectorAll('.footer-icon-item');
        iconItems.forEach(icon => {
            icon.classList.remove('active');
        });

        console.log('✅ Visibilidad del footer asegurada - dropdowns cerrados por defecto');
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

        // Throttle para mejor rendimiento
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
        
        // Inicializar
        updateProgress();
        console.log('📊 Progreso de scroll inicializado');
    }

    /* ===== SOPORTE PARA TEMA ===== */
    initializeThemeSupport() {
        // Asegurar que el tema se aplique correctamente
        const savedTheme = localStorage.getItem('secotogpt-dark');
        const isDark = savedTheme === 'true';
        
        if (isDark) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        }

        // Escuchar cambios de tema
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
        // Reinicializar eventos del header cuando se carga
        this.reinitializeHeaderEvents();
        
        // Reinicializar eventos del footer cuando se carga
        this.reinitializeFooterEvents();
        
        console.log('🔄 Eventos de componentes inicializados');
    }

    reinitializeHeaderEvents() {
        // Asegurar que el search funcione
        const searchInput = document.querySelector('#mainSearchInput');
        if (searchInput) {
            // Reinicializar búsqueda si es necesario
            if (window.HeaderManager) {
                new window.HeaderManager();
            }
        }

        // Asegurar que el toggle de tema funcione
        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle && !themeToggle.hasAttribute('data-initialized')) {
            themeToggle.setAttribute('data-initialized', 'true');
            // El script modoOscuro.js se encarga de esto
        }
    }

    reinitializeFooterEvents() {
        // Asegurar que los dropdowns del footer funcionen
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
                
                // Cerrar otros dropdowns
                document.querySelectorAll('.footer-dropdown-section.active').forEach(el => {
                    el.classList.remove('active');
                });
                document.querySelectorAll('.footer-icon-item.active').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Toggle el actual
                if (!isActive) {
                    content.classList.add('active');
                    item.classList.add('active');
                }
            });
        }
    }

    /* ===== ASEGURAR ESTILOS ===== */
    ensureStylesLoaded() {
        // Verificar que todos los estilos críticos están cargados
        const criticalStyles = [
            'bootstrap',
            'footer-modern',
            'header-modern'
        ];

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
        // Asegurar que las rutas de imágenes sean correctas
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

// Función para reinicializar todos los componentes
function reinitializeComponents() {
    if (window.HeaderManager) {
        new window.HeaderManager();
    }
    
    if (window.FooterManager) {
        new window.FooterManager();
    }
    
    // Reinicializar modo oscuro
    if (typeof initializeModoOscuro === 'function') {
        initializeModoOscuro();
    }
}

// Función para debug
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

// Función para debug - temporalmente global
function debugFooterContent() {
    const footer = document.querySelector('#footer-placeholder');
    const footerContent = footer?.innerHTML;
    
    // Debug básico
    const basicInfo = {
        placeholder: !!footer,
        hasContent: !!footerContent,
        contentLength: footerContent?.length || 0,
        firstSection: !!footer?.querySelector('.footer-copyright-top'),
        sectionsDiv: !!footer?.querySelector('.footer-sections'),
        iconsRow: !!footer?.querySelector('.footer-icons-row'),
        bottomSection: !!footer?.querySelector('.footer-bottom')
    };
    
    // Debug específico de dropdowns
    const dropdownSections = footer?.querySelectorAll('.footer-dropdown-section') || [];
    const iconItems = footer?.querySelectorAll('.footer-icon-item') || [];
    
    const dropdownInfo = {
        totalDropdowns: dropdownSections.length,
        activeDropdowns: footer?.querySelectorAll('.footer-dropdown-section.active').length || 0,
        activeIcons: footer?.querySelectorAll('.footer-icon-item.active').length || 0,
        dropdownStates: Array.from(dropdownSections).map((section, index) => ({
            id: section.id,
            active: section.classList.contains('active'),
            visible: section.style.display !== 'none',
            opacity: section.style.opacity
        }))
    };
    
    console.log('🔍 DEBUG Footer:', basicInfo);
    console.log('🎛️ DEBUG Dropdowns:', dropdownInfo);
    
    if (footerContent && footerContent.length < 1000) {
        console.warn('⚠️ Footer content seems incomplete:', footerContent.substring(0, 200));
    }
    
    if (dropdownInfo.activeDropdowns > 0) {
        console.warn('⚠️ Hay dropdowns activos que deberían estar cerrados!');
    }
}

// Hacer disponible globalmente para debug
window.debugFooterContent = debugFooterContent;

// Función para forzar cierre de dropdowns (utilidad global)
function forceCloseDropdowns() {
    if (window.contactanosManager) {
        window.contactanosManager.forceCloseAllDropdowns();
    }
}
window.forceCloseDropdowns = forceCloseDropdowns;

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando página Contactanos...');
    
    // Crear el manager principal
    const contactanosManager = new ContactanosManager();
    
    // Hacer disponible globalmente
    window.contactanosManager = contactanosManager;
    window.debugFooterContent = debugFooterContent;
    
    // Reinicializar componentes después de un delay para asegurar carga
    setTimeout(() => {
        console.log('🔄 Reinicializando componentes...');
        reinitializeComponents();
        contactanosManager.removeLoadingClass();
        
        // Debug después de 2 segundos
        setTimeout(() => {
            debugFooterContent();
        }, 2000);
    }, 1000); // Aumentar delay
});

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactanosManager;
}
