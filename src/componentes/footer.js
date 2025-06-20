/**
 * Componente JavaScript para el Footer Moderno Unificado
 * Carga y maneja todas las funcionalidades del footer
 */

class FooterManager {
    constructor() {
        this.isInitialized = false;
        this.init();
    }    init() {
        // No cargar HTML - ComponentLoader ya lo hace
        // Solo esperar y inicializar funcionalidades
        this.waitForFooterLoad();
    }

    // Esperar a que ComponentLoader cargue el footer
    waitForFooterLoad() {
        const checkFooter = () => {
            const footerContent = document.querySelector('#footer-placeholder .footer-modern');
            if (footerContent) {
                console.log('✅ Footer detectado, inicializando funcionalidades...');
                setTimeout(() => {
                    this.initializeAllFeatures();
                    this.addDynamicStyles();
                }, 100);
            } else {
                // Reintentar después de un delay
                setTimeout(checkFooter, 50);
            }
        };
        checkFooter();
    }// Inicializar todas las funcionalidades del footer
    initializeAllFeatures() {
        if (this.isInitialized) return;
        
        this.setupScrollEffects();
        this.setupHoverEffects();
        this.setupSocialLinks();
        this.setupCopyrightAnimation();
        this.updateCopyrightYear();
        this.handleExternalLinks();
        this.addScrollToTopFunctionality();
        this.addDynamicContent();
        this.setupObservers();
        this.setupThemeToggleFooter();
        this.setupTooltips();
        this.addVisitCounter();
        this.addPageStatus();
        this.addBrowserInfo();
        this.setupDropdownSections(); // Nueva funcionalidad
        
        this.isInitialized = true;
        console.log('🦶 Footer Moderno SeCoToGpt inicializado con éxito');
    }

    /* ===== EFECTOS DE SCROLL ===== */
    setupScrollEffects() {
        const footer = document.querySelector('.footer-modern');
        if (!footer) return;

        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    this.animateFooterEntry();
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(footer);
    }

    animateFooterEntry() {
        const elements = document.querySelectorAll('.footer-section, .footer-logo, .footer-copyright-top');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
            }, index * 100);
        });
    }

    /* ===== EFECTOS DE HOVER ===== */
    setupHoverEffects() {
        const footerLinks = document.querySelectorAll('.footer-link');
        
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.createHoverEffect(e.target);
            });
            
            link.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });
    }

    createHoverEffect(element) {
        element.style.transform = 'translateX(6px)';
        const icon = element.querySelector('.footer-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15)';
        }
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateX(0)';
        const icon = element.querySelector('.footer-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    }

    /* ===== ENLACES SOCIALES ===== */
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.createSuccessParticles(e.target);
            });
        });
    }

    createSuccessParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--color-se);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i * 60) * (Math.PI / 180);
            const distance = 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }
    }

    /* ===== ANIMACIÓN COPYRIGHT ===== */
    setupCopyrightAnimation() {
        const copyrightText = document.querySelector('.footer-year');
        if (!copyrightText) return;
        
        setInterval(() => {
            copyrightText.style.animation = 'none';
            setTimeout(() => {
                copyrightText.style.animation = 'pulse 2s ease-in-out';
            }, 10);
        }, 10000);
    }

    /* ===== ACTUALIZAR AÑO COPYRIGHT ===== */
    updateCopyrightYear() {
        const yearElement = document.querySelector('.footer-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /* ===== MANEJAR ENLACES EXTERNOS ===== */
    handleExternalLinks() {
        const externalLinks = document.querySelectorAll('.footer-link-external');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Navegando a enlace externo:', link.href);
            });
        });
    }

    /* ===== SCROLL TO TOP ===== */
    addScrollToTopFunctionality() {
        const footerLogo = document.querySelector('.footer-logo');
        if (!footerLogo) return;
        
        footerLogo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        footerLogo.style.cursor = 'pointer';
        footerLogo.title = 'Volver al inicio';
    }

    /* ===== OBSERVADORES Y EFECTOS DINÁMICOS ===== */
    setupObservers() {
        // Observer para animaciones de scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        // Observar elementos del footer
        const animatedElements = document.querySelectorAll('.footer-section, .social-links');
        animatedElements.forEach(el => observer.observe(el));
    }

    /* ===== CONTENIDO DINÁMICO ===== */
    addDynamicContent() {
        this.updateLoadTime();
        this.updateVersion();
        this.addPerformanceInfo();
    }    updateLoadTime() {
        const loadTimeElement = document.querySelector('.info-item:nth-child(2) span');
        if (loadTimeElement && window.performance) {
            const loadTime = Math.round(window.performance.now());
            loadTimeElement.textContent = `Carga: ${loadTime}ms`;
        }
    }

    updateVersion() {
        const versionElement = document.querySelector('.info-item:first-child span');
        if (versionElement) {
            versionElement.textContent = 'v2.0.0';
        }
    }

    addPerformanceInfo() {
        if (!('performance' in window)) return;

        const loadTime = Math.round(performance.now());
        
        // Actualizar el elemento de tiempo de carga
        const loadTimeElement = document.querySelector('.info-item:nth-child(2) span');
        if (loadTimeElement && loadTime > 0) {
            loadTimeElement.textContent = `Carga: ${loadTime}ms`;
        }
        
        // Actualizar fecha actual
        const updateElement = document.querySelector('.info-item:nth-child(3) span');
        if (updateElement) {
            const now = new Date();
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            updateElement.textContent = `Actualizado: ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
        }
    }

    setupThemeToggleFooter() {
        // Escuchar cambios de tema para actualizar estilos del footer
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.handleThemeChange();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    handleThemeChange() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const footer = document.querySelector('.footer-modern');
        
        if (footer) {
            if (isDark) {
                footer.style.setProperty('--footer-glow-intensity', '0.6');
            } else {
                footer.style.setProperty('--footer-glow-intensity', '0.8');
            }
        }
    }

    /* ===== FUNCIONALIDADES ADICIONALES ===== */
    
    // Agregar tooltips dinámicos
    setupTooltips() {
        const footerLinks = document.querySelectorAll('.footer-link[href]');
        
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                if (e.target.href) {
                    e.target.title = `Ir a: ${e.target.textContent.trim()}`;
                }
            });
        });
        
        // Tooltips para badges
        const badges = document.querySelectorAll('.footer-badges .badge');
        badges.forEach(badge => {
            const text = badge.textContent.trim();
            if (text.includes('Estable')) {
                badge.title = 'Sistema funcionando correctamente';
            } else if (text.includes('Educativo')) {
                badge.title = 'Proyecto con fines académicos';
            } else if (text.includes('Open Source')) {
                badge.title = 'Código fuente disponible públicamente';
            }
        });
    }
      // Agregar contador de visitas
    addVisitCounter() {
        const existingCounter = localStorage.getItem('secotogpt-visits');
        const visits = existingCounter ? parseInt(existingCounter) + 1 : 1;
        localStorage.setItem('secotogpt-visits', visits.toString());
        
        // No agregar elemento adicional, solo actualizar si existe un placeholder
        const counterElement = document.querySelector('.info-item:nth-child(3) span');
        if (counterElement && visits > 5) { // Solo mostrar si hay más de 5 visitas
            counterElement.textContent = `Visitas: ${visits}`;
        }
    }
    
    // Detectar estado de la página (evitar duplicados)
    addPageStatus() {
        const statusElement = document.querySelector('.badges-group');
        if (!statusElement) return;
        
        // Verificar si ya existe badge de conexión
        const existingConnectionBadge = statusElement.querySelector('.connection-status');
        if (existingConnectionBadge) return;
        
        // Detectar conexión
        const isOnline = navigator.onLine;
        const connectionBadge = document.createElement('span');
        connectionBadge.className = `badge ${isOnline ? 'bg-success' : 'bg-warning'} connection-status`;
        connectionBadge.innerHTML = `
            <i class="bi bi-${isOnline ? 'wifi' : 'wifi-off'}"></i> 
            ${isOnline ? 'En Línea' : 'Sin Conexión'}
        `;
        statusElement.appendChild(connectionBadge);
        
        // Escuchar cambios de conexión
        window.addEventListener('online', () => {
            connectionBadge.className = 'badge bg-success connection-status';
            connectionBadge.innerHTML = '<i class="bi bi-wifi"></i> En Línea';
        });
        
        window.addEventListener('offline', () => {
            connectionBadge.className = 'badge bg-warning connection-status';
            connectionBadge.innerHTML = '<i class="bi bi-wifi-off"></i> Sin Conexión';
        });
    }
    
    // Agregar información del navegador (evitar duplicados)
    addBrowserInfo() {
        const infoContainer = document.querySelector('.info-group');
        if (!infoContainer) return;
        
        // Verificar si ya existe info del navegador
        const existingBrowserInfo = infoContainer.querySelector('.browser-info');
        if (existingBrowserInfo) return;
        
        const browserInfo = this.getBrowserInfo();
        const browserItem = document.createElement('div');
        browserItem.className = 'info-item browser-info';
        browserItem.innerHTML = `
            <i class="bi bi-browser-chrome info-icon"></i>
            <span>${browserInfo}</span>
        `;
        infoContainer.appendChild(browserItem);
    }
    
    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = 'Desconocido';
        
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
            browser = 'Chrome';
        } else if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari';
        } else if (userAgent.includes('Edg')) {
            browser = 'Edge';
        }
          return browser;
    }

    /* ===== FUNCIONALIDAD DE SECCIONES DESPLEGABLES ===== */
    setupDropdownSections() {
        const iconItems = document.querySelectorAll('.footer-icon-item');
        const dropdownSections = document.querySelectorAll('.footer-dropdown-section');
        
        // Cerrar todas las secciones inicialmente
        dropdownSections.forEach(section => {
            section.classList.remove('active');
        });
        
        iconItems.forEach(iconItem => {
            iconItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const sectionName = iconItem.getAttribute('data-section');
                const targetSection = document.getElementById(`${sectionName}-content`);
                const isCurrentlyActive = iconItem.classList.contains('active');
                
                // Cerrar todas las secciones y remover estados activos
                iconItems.forEach(item => item.classList.remove('active'));
                dropdownSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Si no estaba activo, abrir la sección seleccionada
                if (!isCurrentlyActive && targetSection) {
                    iconItem.classList.add('active');
                    
                    // Pequeño delay para la animación
                    setTimeout(() => {
                        targetSection.classList.add('active');
                        
                        // Scroll suave hacia la sección si está fuera de la vista
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 50);
                    
                    // Agregar efecto de partículas al hacer clic
                    this.createClickParticles(iconItem);
                }
            });
            
            // Agregar efecto hover adicional
            iconItem.addEventListener('mouseenter', () => {
                const mainIcon = iconItem.querySelector('.footer-main-icon');
                if (mainIcon && !iconItem.classList.contains('active')) {
                    mainIcon.style.transform = 'scale(1.05)';
                }
            });
            
            iconItem.addEventListener('mouseleave', () => {
                const mainIcon = iconItem.querySelector('.footer-main-icon');
                if (mainIcon && !iconItem.classList.contains('active')) {
                    mainIcon.style.transform = 'scale(1)';
                }
            });
        });
        
        // Cerrar secciones al hacer clic fuera
        document.addEventListener('click', (e) => {
            const isFooterClick = e.target.closest('.footer-sections');
            if (!isFooterClick) {
                iconItems.forEach(item => item.classList.remove('active'));
                dropdownSections.forEach(section => {
                    section.classList.remove('active');
                });
            }
        });
        
        // Manejar teclas de escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                iconItems.forEach(item => item.classList.remove('active'));
                dropdownSections.forEach(section => {
                    section.classList.remove('active');
                });
            }
        });
    }
    
    // Crear efecto de partículas al hacer clic en los iconos
    createClickParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, var(--color-se), var(--color-co));
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i * 45) * (Math.PI / 180);
            const distance = 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }
    }

    /* ===== AÑADIR ESTILOS DINÁMICOS ===== */    addDynamicStyles() {
        if (document.getElementById('footer-dynamic-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'footer-dynamic-styles';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
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
            
            /* Animaciones específicas para dropdowns */
            @keyframes dropdownSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-15px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .footer-dropdown-section.active {
                animation: dropdownSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            /* Pulse effect para iconos activos */
            .footer-icon-item.active .footer-main-icon {
                animation: iconPulse 2s ease-in-out infinite;
            }
            
            @keyframes iconPulse {
                0%, 100% {
                    box-shadow: 0 4px 15px rgba(168, 237, 234, 0.3);
                }
                50% {
                    box-shadow: 0 6px 25px rgba(168, 237, 234, 0.6);
                }
            }
            
            /* Mejora para accesibilidad */
            @media (prefers-reduced-motion: reduce) {
                .footer-dropdown-section.active {
                    animation: none;
                }
                
                .footer-icon-item.active .footer-main-icon {
                    animation: none;
                }
                
                .footer-icon-item,
                .footer-dropdown-link {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /* ===== FALLBACK FOOTER ===== */
    showFallbackFooter(container) {
        container.innerHTML = `
            <footer class="footer-modern">
                <div class="container-fluid px-lg-5">
                    <div class="text-center py-4">
                        <p>&copy; ${new Date().getFullYear()} SeCoToGpt - Plataformas Tecnológicas</p>
                        <p><small>Desarrollado con 💚 para el aprendizaje colaborativo</small></p>
                        <div class="mt-3">
                            <span class="badge bg-primary me-2">
                                <i class="bi bi-code-slash"></i> Open Source
                            </span>
                            <span class="badge bg-success me-2">
                                <i class="bi bi-check-circle"></i> Estable
                            </span>
                            <span class="badge bg-info">
                                <i class="bi bi-book"></i> Educativo
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Función global para mantener compatibilidad
function initializeFooter() {
    new FooterManager();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFooter);
} else {
    initializeFooter();
}

// Export para compatibilidad con módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FooterManager,
        initializeFooter
    };
}


