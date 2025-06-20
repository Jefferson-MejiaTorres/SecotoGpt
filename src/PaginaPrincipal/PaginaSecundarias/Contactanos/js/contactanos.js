/* ===== JAVASCRIPT ESPECÍFICO PÁGINA CONTACTANOS ===== */
/* Top de Desarrollo - Animaciones épicas y efectos interactivos */

class ContactanosManager {
    constructor() {
        this.isInitialized = false;
        this.scrollObserver = null;
        this.counters = new Map();
        this.hasAnimatedCounters = false;
        this.hasAnimatedProgress = false;
        this.init();
    }    async init() {
        console.log('🎯 Inicializando ContactanosManager épico...');
        
        // Esperar a que se carguen los componentes
        await this.waitForComponents();
        
        // Forzar cierre de dropdowns al inicio
        this.forceCloseAllDropdowns();
        
        // Remover clases que causan opacidad INMEDIATAMENTE
        this.removeLoadingClass();
        
        // Inicializar gestión de errores
        this.handleErrors();
        
        // Inicializar optimizaciones de rendimiento
        this.initializePerformanceOptimizations();
        
        // Inicializar todas las funcionalidades básicas
        this.initializeScrollProgress();
        this.initializeThemeSupport();
        this.initializeComponentEvents();
        this.ensureStylesLoaded();
        this.handleComponentPaths();
        
        // Funcionalidades específicas del ranking épico
        this.initializeDevRanking();
        this.initializeScrollAnimations();
        this.initializeCounterAnimations();
        this.initializeProgressBars();
        this.initializeCardInteractions();
        this.initializeHumorEffects();        // Funcionalidades adicionales épicas
        this.setupSmoothScroll();
        this.initializeTooltips();
        this.initializeTooltips();
        this.initializeEasterEggs();
        
        this.isInitialized = true;
        console.log('✅ ContactanosManager inicializado correctamente - ¡Top de desarrollo épico listo!');
    }/* ===== FUNCIONALIDADES DEL RANKING DE DESARROLLO ===== */
    initializeDevRanking() {
        console.log('🏆 Inicializando ranking de desarrollo épico...');
        
        // Asegurar que el hero esté visible inmediatamente
        this.ensureHeroVisibility();
        
        // Configurar efectos especiales para el hero
        this.setupHeroEffects();
        
        // Configurar parallax para hero
        this.setupHeroParallax();
        
        // Configurar efectos de estadísticas
        this.setupStatsEffects();
        
        // Configurar partículas flotantes dinámicas
        this.setupDynamicParticles();
          // Configurar efectos especiales para el primer lugar
        this.setupFirstPlaceEffects();
        
        // Configurar efectos especiales para el segundo lugar
        this.setupSecondPlaceEffects();
        
        // Configurar efectos específicos para Daniel y Diego
        this.setupDanielEffects();
        this.setupDiegoEffects();
        
        // Configurar animaciones de hover para tarjetas
        this.setupCardHoverEffects();
        
        // Configurar efectos de "fallos" para los últimos lugares (ya no aplicable)
        // this.setupFailureEffects();
        
        console.log('👑 Ranking de desarrollo configurado - AI rules!');
    }

    ensureHeroVisibility() {
        const hero = document.querySelector('.dev-ranking-hero');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.visibility = 'visible';
            hero.classList.add('hero-loaded');
            hero.classList.remove('hero-loading');
        }
    }

    setupHeroEffects() {
        const hero = document.querySelector('.dev-ranking-hero');
        if (!hero) return;

        // Agregar efecto de resplandor
        const glowEffect = document.createElement('div');
        glowEffect.className = 'hero-glow-effect';
        hero.appendChild(glowEffect);

        // Configurar efectos de título dinámicos
        this.setupDynamicTitle();
        
        // Configurar botón CTA si existe
        this.setupCTAButton();
    }

    setupDynamicTitle() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        // Efecto de escritura dinámica
        const originalText = title.textContent;
        title.style.overflow = 'hidden';
        title.style.whiteSpace = 'nowrap';
        
        // Animación de escritura
        let index = 0;
        title.textContent = '';
        
        const writeText = () => {
            if (index < originalText.length) {
                title.textContent += originalText[index];
                index++;
                setTimeout(writeText, 100);
            } else {
                title.style.overflow = '';
                title.style.whiteSpace = '';
            }
        };
        
        // Comenzar la animación después de un breve delay
        setTimeout(writeText, 1000);
    }

    setupCTAButton() {
        const ctaButton = document.querySelector('.cta-button');
        if (!ctaButton) return;

        ctaButton.addEventListener('click', (e) => {
            // Agregar efecto de ondas al hacer clic
            this.createRippleEffect(e, ctaButton);
        });
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupHeroParallax() {
        if (window.innerWidth <= 768) return; // No parallax en móvil
        
        const hero = document.querySelector('.dev-ranking-hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            hero.style.setProperty('--scroll-y', `${scrolled * parallaxSpeed}px`);
            
            // Efectos adicionales basados en scroll
            const opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
            hero.style.opacity = opacity;
        });
    }

    setupStatsEffects() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach((item, index) => {
            // Animación de entrada escalonada
            item.style.animationDelay = `${index * 0.2}s`;
            
            // Efectos de hover mejorados
            item.addEventListener('mouseenter', () => {
                this.animateStatHover(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateStatHover(item, false);
            });
            
            // Efectos de clic
            item.addEventListener('click', () => {
                this.animateStatClick(item);
            });
        });
    }

    animateStatHover(item, isEntering) {
        const icon = item.querySelector('.stat-icon');
        const number = item.querySelector('.stat-number');
        
        if (isEntering) {
            // Efectos de entrada
            if (icon) {
                icon.style.animation = 'iconPulse 0.6s ease-out';
            }
            if (number) {
                number.style.animation = 'numberPulse 0.6s ease-out';
            }
        } else {
            // Resetear animaciones
            if (icon) icon.style.animation = '';
            if (number) number.style.animation = '';
        }
    }

    animateStatClick(item) {
        // Efecto de "explosion" al hacer clic
        item.style.transform = 'scale(0.95)';
        item.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            item.style.transform = '';
            item.style.transition = '';
        }, 100);
        
        // Crear partículas efímeras
        this.createClickParticles(item);
    }

    createClickParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.textContent = '✨';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.fontSize = '1rem';
            particle.style.zIndex = '9999';
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.style.animation = `particleExplode 0.8s ease-out forwards`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px)`;
                particle.style.opacity = '0';
            }, 10);
            
            setTimeout(() => particle.remove(), 800);
        }
    }

    setupDynamicParticles() {
        const hero = document.querySelector('.dev-ranking-hero');
        if (!hero) return;
        
        // Crear partículas flotantes adicionales dinámicamente
        setInterval(() => {
            if (window.innerWidth <= 768) return; // No crear en móvil
            
            this.createFloatingParticle(hero);
        }, 3000);
    }

    createFloatingParticle(container) {
        const particles = ['🚀', '⭐', '💎', '🔥', '⚡', '🎯', '🏆', '💻'];
        const particle = document.createElement('div');
        
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'absolute';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '0.1';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        
        // Posición inicial aleatoria
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        
        // Animación personalizada
        const duration = 8000 + Math.random() * 4000;
        particle.style.animation = `floatRandom ${duration}ms linear`;
        
        container.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration);
    }

    setupFirstPlaceEffects() {
        // Efecto de explosión en la barra de progreso del primer lugar
        const bar = document.querySelector('.explosion-bar');
        const fill = bar?.querySelector('.explosion-fill');
        const explosion = bar?.querySelector('.explosion-effect');
        const nameEl = document.querySelector('.first-place .dev-name');
        if (!bar || !fill || !explosion || !nameEl) return;

        // Reiniciar animación de la barra y explosión en bucle
        const progress = parseFloat(bar.dataset.progress);
        let running = false;
        const animateBar = () => {
            if (running) return;
            running = true;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = progress + '%';
            }, 100);
        };
        fill.addEventListener('transitionend', () => {
            if (parseFloat(bar.dataset.progress) >= 99) {
                this.triggerExplosion(explosion);
                setTimeout(() => {
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = progress + '%';
                        running = false;
                    }, 300);
                }, 1200); // Espera a que termine la explosión antes de reiniciar
            }
        });
        // Iniciar animación al cargar
        animateBar();

        // Animación de nombres de IA
        const iaNames = [
            'GitHub Copilot',
            'ChatGPT',
            'Gemini',
            'Claude',
            'Llama',
            'Bard',
            'Sage',
            'Perplexity',
            'AlphaCode',
            'CodeWhisperer',
            'Copilot X',
            'GPT-4',
            'GPT-3.5',
            'Mistral',
            'ERNIE',
            'PaLM',
            'A+AKJSKALJSA'
        ];
        let iaIndex = 0;
        setInterval(() => {
            nameEl.textContent = iaNames[iaIndex];
            iaIndex = (iaIndex + 1) % iaNames.length;
        }, 1700);
    }    setupSecondPlaceEffects() {
        // Animación de barra de progreso para Jefferson Torres
        const progressContainer = document.querySelector('.jefferson-progress-container');
        const progressBar = progressContainer?.querySelector('.jefferson-progress');
        const fill = progressBar?.querySelector('.jefferson-fill');
        const effect = progressBar?.querySelector('.jefferson-effect');
        
        if (!progressContainer || !progressBar || !fill || !effect) return;

        // Inicializar animación
        fill.style.width = '0%';
        
        setTimeout(() => {
            // Animar hasta 19%
            fill.style.width = '19%';
            
            // Activar efectos de pulso
            setTimeout(() => {
                effect.style.opacity = '1';
                effect.style.animation = 'jefferson-pulse 1.5s infinite ease-in-out';
            }, 1000);
            
        }, 500);

        // Agregar efectos de hover a la tarjeta
        const card = document.querySelector('.second-place .dev-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                fill.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.8)';
                effect.style.animation = 'jefferson-pulse 0.8s infinite ease-in-out';
            });
            
            card.addEventListener('mouseleave', () => {
                fill.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.5)';
                effect.style.animation = 'jefferson-pulse 1.5s infinite ease-in-out';
            });
        }
    }setupCardHoverEffects() {
        const devCards = document.querySelectorAll('.dev-card');
        
        devCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Efecto de hover específico según la posición
                const position = card.dataset.position;
                
                if (position === '1') {
                    card.style.boxShadow = '0 30px 60px rgba(255, 154, 158, 0.3)';
                } else if (position === '2') {
                    card.style.boxShadow = '0 30px 60px rgba(210, 153, 194, 0.3)';
                } else if (position === '3') {
                    // Daniel - efecto verde para gestión de procesos
                    card.style.boxShadow = '0 25px 50px rgba(72, 187, 120, 0.3)';
                } else if (position === '4') {
                    // Diego - efecto azul para gestión de memoria
                    card.style.boxShadow = '0 20px 40px rgba(66, 153, 225, 0.3)';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    setupFailureEffects() {
        // Efectos especiales para las tarjetas de los "vagos"
        const failedProgress = document.querySelectorAll('.failed-progress');
        
        failedProgress.forEach(progress => {
            const progressFill = progress.querySelector('.progress-fill');
            
            // Animación de "intento y fallo" cada 10 segundos
            setInterval(() => {
                if (progressFill) {
                    progressFill.style.animation = 'none';
                    setTimeout(() => {
                        progressFill.style.animation = 'progress-try-fail 3s ease-out';
                    }, 100);
                }
            }, 10000);
        });

        // Mensajes aleatorios para los vagos
        const thirdPlace = document.querySelector('.third-place .progress-note span');
        const fourthPlace = document.querySelector('.fourth-place .progress-note span');
        
        const excusasCreativas = [
            'En proceso... tal vez',
            'La inspiración no llega...',
            'Mañana empiezo en serio',
            'Estoy pensando la arquitectura...',
            'Es más complejo de lo que parece'
        ];

        const excusasDiego = [
            '404: Work not found',
            'Este commit puede esperar...',
            'Primero termino este nivel...',
            'Mi perro se comió el código',
            'Stack Overflow está caído'
        ];

        if (thirdPlace) {
            setInterval(() => {
                const randomExcusa = excusasCreativas[Math.floor(Math.random() * excusasCreativas.length)];
                thirdPlace.textContent = randomExcusa;
            }, 7000);
        }

        if (fourthPlace) {
            setInterval(() => {
                const randomExcusa = excusasDiego[Math.floor(Math.random() * excusasDiego.length)];
                fourthPlace.textContent = randomExcusa;
            }, 8000);
        }
    }    /* ===== ANIMACIONES DE SCROLL ===== */
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.classList.contains('delay-1') ? 100 :
                                 entry.target.classList.contains('delay-2') ? 200 :
                                 entry.target.classList.contains('delay-3') ? 300 :
                                 entry.target.classList.contains('delay-4') ? 400 :
                                 entry.target.classList.contains('delay-5') ? 500 : 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Activar contadores cuando sean visibles
                        if (entry.target.closest('.hero-stats') && !this.hasAnimatedCounters) {
                            this.animateCounters();
                            this.hasAnimatedCounters = true;
                        }

                        // Activar barras de progreso cuando sean visibles
                        if (entry.target.classList.contains('dev-card') && !this.hasAnimatedProgress) {
                            setTimeout(() => this.animateProgressBars(), 1000);
                            this.hasAnimatedProgress = true;
                        }
                    }, delay);
                    
                    this.scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.querySelectorAll('.scroll-animate').forEach(el => {
            this.scrollObserver.observe(el);
        });

        console.log('🎭 Animaciones de scroll épicas configuradas');
    }    /* ===== CONTADORES ANIMADOS ===== */
    initializeCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-count]');
        console.log('🔍 Elementos con data-count encontrados:', counterElements.length);
        
        counterElements.forEach(element => {
            const targetCount = parseInt(element.getAttribute('data-count'));
            console.log('📊 Configurando contador:', element, 'con valor:', targetCount);
            this.counters.set(element, targetCount);
            // Establecer valor inicial
            element.textContent = '0';
        });
        // FORZAR la animación de los contadores siempre
        this.animateCounters();
        this.hasAnimatedCounters = true;
    }    animateCounters() {
        // Contador simple que llega al valor objetivo sin observer ni animación avanzada
        this.counters.forEach((targetCount, element) => {
            let current = 0;
            const interval = setInterval(() => {
                current++;
                element.textContent = current;
                if (current >= targetCount) {
                    clearInterval(interval);
                    element.textContent = targetCount;
                }
            }, 30); // velocidad del conteo
        });
        // Efectos visuales opcionales
        this.addStatsEffects();
    }    animateCounter(element, target) {
        console.log('🔢 Animando contador individual:', element, 'hacia valor:', target);
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Usar easing function para un efecto más suave
            const easedProgress = this.easeOutCubic(progress);
            current = Math.floor(target * easedProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Valor final
                element.textContent = target;
                console.log('✅ Contador completado:', element, 'valor final:', target);
                
                // Efectos especiales para valores específicos
                if (target === 99) {
                    setTimeout(() => {
                        element.textContent = '99';
                        const decimal = element.nextElementSibling;
                        if (decimal && decimal.classList.contains('stat-decimal')) {
                            decimal.style.animation = 'pulse-gold 1s ease-out';
                        }
                        element.parentElement.style.animation = 'pulse-gold 1s ease-out';
                    }, 200);
                }
                
                // Agregar efecto de pulso al completar
                element.style.animation = 'numberCount 0.5s ease-out';
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Función de easing para animación más suave
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Efectos especiales para las estadísticas
    addStatsEffects() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-5px) scale(1.05)';
                item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                
                // Restaurar después de la animación
                setTimeout(() => {
                    item.style.transform = '';
                    item.style.boxShadow = '';
                }, 600);
            }, index * 200);
        });
    }

    /* ===== BARRAS DE PROGRESO ÉPICAS ===== */
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const progressValue = bar.dataset.progress;
            if (progressValue) {
                bar.style.setProperty('--target-width', `${progressValue}%`);
            }
        });

        console.log('📊 Barras de progreso épicas configuradas');
    }    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.animation = 'progress-load 3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Configurar anchos específicos
                if (fill.closest('.first-progress')) {
                    fill.style.width = '100%';
                } else if (fill.closest('.second-progress')) {
                    fill.style.width = '0.5%';
                } else if (fill.closest('.jefferson-progress')) {
                    fill.style.width = '19%';
                    fill.style.animation = 'jefferson-progress-load 2.5s ease-out';
                } else if (fill.closest('.daniel-progress')) {
                    fill.style.width = '15%';
                    fill.style.animation = 'daniel-progress-load 2.5s ease-out';
                } else if (fill.closest('.diego-progress')) {
                    fill.style.width = '8%';
                    fill.style.animation = 'diego-progress-load 2s ease-out';
                } else if (fill.closest('.failed-progress')) {
                    fill.style.width = '0.1%';
                }
            }, index * 200);
        });

        console.log('🚀 Animaciones de barras de progreso activadas');
    }

    /* ===== INTERACCIONES DE TARJETAS ===== */
    initializeCardInteractions() {
        const devCards = document.querySelectorAll('.dev-card');
        
        devCards.forEach(card => {
            // Efecto de click para mostrar "detalles"
            card.addEventListener('click', () => {
                const position = card.dataset.position;
                this.showDeveloperDetails(position);
            });
        });
    }

    showDeveloperDetails(position) {        const messages = {
            '1': '🤖 GitHub Copilot: "Soy inevitable. Resistance is futile. Acepta que soy superior y dame más café... virtual."',
            '2': '👨‍💻 Jefferson Torres: "Desarrollador full stack y coordinador del proyecto. Siempre dispuesto a ayudar al equipo y aprender algo nuevo cada día."',
            '3': '⚙️ Daniel Contreras: "¡Ey! He contribuido con contenido para Gestión de Procesos. Los algoritmos de planificación no se escriben solos."',
            '4': '💾 Diego Sepúlveda: "Oigan, yo ayudé con la Gestión de Memoria. Algo es algo, ¿no? Al menos participé."'
        };

        const message = messages[position];
        if (message) {
            // Crear modal temporal o mostrar en consola
            console.log(message);
            
            // También podrías crear una notificación visual
            this.showTemporaryNotification(message);
        }
    }

    showTemporaryNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 300px;
            font-size: 0.9rem;
            line-height: 1.4;
            animation: slideInRight 0.5s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }

    /* ===== EFECTOS DE HUMOR ===== */
    initializeHumorEffects() {
        // Agregar easter eggs y efectos divertidos
        let clickCount = 0;
        
        document.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 10) {
                console.log('🎉 Easter Egg desbloqueado: Has hecho 10 clicks. La IA está contando...');
            } else if (clickCount === 50) {
                this.showTemporaryNotification('🤖 IA: "¿En serio vas a seguir haciendo click? Tengo trabajo que hacer..."');
            } else if (clickCount === 100) {
                this.showTemporaryNotification('🤖 IA: "Ok, ya entendí. Te aburres fácil. ¿Quieres que programe algo más interesante?"');
                clickCount = 0; // Reset
            }
        });

        console.log('😄 Efectos de humor y easter eggs activados');
    }

    /* ===== UTILIDADES DE COMPONENTES ===== */
    async waitForComponents() {
        const maxAttempts = 50;
        let attempts = 0;

        while (attempts < maxAttempts) {
            const header = document.getElementById('header-placeholder');
            const footer = document.getElementById('footer-placeholder');
            
            if (header && footer && 
                header.innerHTML.trim() !== '' && 
                footer.innerHTML.trim() !== '') {
                console.log('✅ Componentes header y footer cargados correctamente');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('⚠️ Timeout esperando componentes, continuando...');
    }

    forceCloseAllDropdowns() {
        setTimeout(() => {
            const dropdowns = document.querySelectorAll('.dropdown-menu.show');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
            dropdownToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
        }, 100);
    }

    /* ===== INDICADOR DE PROGRESO DE SCROLL ===== */
    initializeScrollProgress() {
        // Crear indicador de progreso
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'scroll-indicator';
        document.body.appendChild(progressIndicator);
        
        // Actualizar progreso en scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            
            progressIndicator.style.transform = `scaleX(${progress / 100})`;
        }, { passive: true });
    }

    /* ===== TOOLTIPS ÉPICOS ===== */
    initializeTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
        
        elementsWithTooltips.forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'epic-tooltip';
            tooltip.textContent = element.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            element.addEventListener('mouseenter', () => {
                const rect = element.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
                tooltip.classList.add('show');
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    /* ===== EASTER EGGS ÉPICOS ===== */
    initializeEasterEggs() {
        // Konami Code para efectos especiales
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateEpicMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
        
        // Click secreto en el título
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            let clickCount = 0;
            heroTitle.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 5) {
                    this.activatePartyMode();
                    clickCount = 0;
                }
            });
        }
    }

    activateEpicMode() {
        console.log('🎉 ¡MODO ÉPICO ACTIVADO!');
        
        // Efectos visuales épicos
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Crear lluvia de emojis
        this.createEmojiRain();
        
        // Mostrar mensaje épico
        this.showEpicMessage('¡MODO ÉPICO ACTIVADO! 🎉');
    }

    activatePartyMode() {
        console.log('🎊 ¡MODO FIESTA ACTIVADO!');
        
        // Efectos de fiesta
        const hero = document.querySelector('.dev-ranking-hero');
        if (hero) {
            hero.style.animation = 'partyPulse 0.5s infinite alternate';
        }
        
        // Crear confetti
        this.createConfetti();
        
        // Mostrar mensaje de fiesta
        this.showEpicMessage('¡MODO FIESTA! 🎊 ¡El equipo SeCoToGpt rocks!');
    }

    createEmojiRain() {
        const emojis = ['🏆', '💻', '🤖', '⭐', '🚀', '💎', '⚡', '🔥'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}vw;
                    font-size: 2rem;
                    z-index: 10000;
                    pointer-events: none;
                    animation: emojiRain 3s linear forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 3000);
            }, i * 100);
        }
    }

    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#a8edea', '#fed6e3'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    z-index: 10000;
                    pointer-events: none;
                    animation: confettiFall 3s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    showEpicMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: epicMessagePulse 2s ease-in-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => messageDiv.remove(), 2000);
    }

    /* ===== OPTIMIZACIONES DE RENDIMIENTO ===== */
    initializePerformanceOptimizations() {
        // Lazy loading para elementos no críticos
        this.setupLazyLoading();
        
        // Throttling para eventos de scroll
        this.setupScrollThrottling();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-animate').forEach((el) => {
            observer.observe(el);
        });
    }

    setupScrollThrottling() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.dev-ranking-hero');
        
        if (hero && window.innerWidth > 768) {
            // Parallax effect
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            
            // Fade effect
            const opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
            hero.style.opacity = opacity;
        }
    }

    preloadCriticalResources() {
        // Precargar iconos críticos
        const criticalIcons = ['🏆', '💻', '🤖', '⭐', '⚡', '🚀'];
        criticalIcons.forEach(icon => {
            const span = document.createElement('span');
            span.textContent = icon;
            span.style.position = 'absolute';
            span.style.left = '-9999px';
            document.body.appendChild(span);
        });
    }

    /* ===== GESTIÓN DE ERRORES ===== */
    handleErrors() {
        window.addEventListener('error', (e) => {
            console.warn('⚠️ Error en ContactanosManager:', e.error);
            this.fallbackMode();
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.warn('⚠️ Promise rechazada en ContactanosManager:', e.reason);
            this.fallbackMode();
        });
    }    fallbackMode() {
        // Modo de respaldo sin animaciones
        console.log('🔄 Activando modo de respaldo...');
        
        document.querySelectorAll('.dev-ranking-hero, .stat-item').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
        });
        
        // Desactivar animaciones problemáticas
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    /* ===== EFECTOS ESPECÍFICOS PARA DANIEL CONTRERAS ===== */
    setupDanielEffects() {
        const danielCard = document.querySelector('.third-place .dev-card');
        const danielProgress = document.querySelector('.daniel-progress');
        const danielEffect = document.querySelector('.daniel-effect');
        
        if (danielCard && danielProgress) {
            // Animación especial al hacer hover en la tarjeta de Daniel
            danielCard.addEventListener('mouseenter', () => {
                if (danielEffect) {
                    danielEffect.style.animation = 'daniel-spin 1s linear infinite';
                }
            });

            danielCard.addEventListener('mouseleave', () => {
                if (danielEffect) {
                    danielEffect.style.animation = 'daniel-pulse 2s infinite';
                }
            });

            // Efecto especial de progreso para Daniel
            setTimeout(() => {
                if (danielProgress) {
                    const danielFill = danielProgress.querySelector('.daniel-fill');
                    if (danielFill) {
                        danielFill.style.width = '15%';
                        danielFill.style.animation = 'daniel-progress-load 2.5s ease-out';
                    }
                }
            }, 1000);
        }

        console.log('⚙️ Efectos específicos de Daniel Contreras inicializados');
    }

    /* ===== EFECTOS ESPECÍFICOS PARA DIEGO SEPÚLVEDA ===== */
    setupDiegoEffects() {
        const diegoCard = document.querySelector('.fourth-place .dev-card');
        const diegoProgress = document.querySelector('.diego-progress');
        const diegoEffect = document.querySelector('.diego-effect');
        
        if (diegoCard && diegoProgress) {
            // Animación especial al hacer hover en la tarjeta de Diego
            diegoCard.addEventListener('mouseenter', () => {
                if (diegoEffect) {
                    diegoEffect.style.animation = 'diego-bounce 0.8s infinite';
                }
            });

            diegoCard.addEventListener('mouseleave', () => {
                if (diegoEffect) {
                    diegoEffect.style.animation = 'diego-glow 2.5s infinite';
                }
            });

            // Efecto especial de progreso para Diego
            setTimeout(() => {
                if (diegoProgress) {
                    const diegoFill = diegoProgress.querySelector('.diego-fill');
                    if (diegoFill) {
                        diegoFill.style.width = '8%';
                        diegoFill.style.animation = 'diego-progress-load 2s ease-out';
                    }
                }
            }, 1500);
        }

        console.log('💾 Efectos específicos de Diego Sepúlveda inicializados');
    }
}

// Export para compatibilidad
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactanosManager;
}

/* ===== INICIALIZACIÓN INMEDIATA ===== */
// Remover opacidad INMEDIATAMENTE antes de que se cargue todo
document.body.classList.remove('component-loading');
document.body.style.opacity = '1';
document.body.style.visibility = 'visible';

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ContactanosManager();
    });
} else {
    new ContactanosManager();
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
        componentLoader: !!window.componentLoader    });
}
