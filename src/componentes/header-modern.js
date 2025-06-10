/**
 * Header Component Mejorado - SeCoToGpt
 * Funcionalidades: Búsqueda avanzada, menú móvil animado, navegación inteligente
 * Autor: SeCoToGpt Team
 * Versión: 2.0.0
 */

class HeaderManager {
  constructor() {
    this.isInitialized = false;
    this.searchData = [];
    this.searchCache = new Map();
    this.debounceTimer = null;
    this.mobileMenuOpen = false;
    
    // Configuración
    this.config = {
      searchDebounceTime: 300,
      maxSuggestions: 6,
      animationDuration: 400
    };
    
    this.init();
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      await this.waitForDOM();
      this.initializeElements();
      this.initializeSearch();
      this.initializeMobileMenu();
      this.initializeNavigation();      this.initializeScrollEffects();
      this.initializeAccessibility();
      this.loadSearchData();
      
      this.isInitialized = true;
      console.log('✓ Header Manager inicializado correctamente');
    } catch (error) {
      console.error('✗ Error inicializando Header Manager:', error);
      setTimeout(() => this.init(), 100);
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  initializeElements() {
    // Elementos principales
    this.header = document.getElementById('mainHeader');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileMenu = document.getElementById('mobileMenu');
    
    // Elementos de búsqueda
    this.mainSearchInput = document.getElementById('mainSearchInput');
    this.mobileSearchInput = document.getElementById('mobileSearchInput');
    this.searchSuggestions = document.getElementById('searchSuggestions');
    
    // Validar elementos críticos
    if (!this.header || !this.mainSearchInput) {
      throw new Error('Elementos críticos del header no encontrados');
    }
  }
  /* ===== FUNCIONALIDAD DE BÚSQUEDA AVANZADA ===== */

  initializeSearch() {
    if (!this.mainSearchInput) return;

    // Configurar búsqueda principal
    this.setupSearchInput(this.mainSearchInput, 'desktop');
    
    // Configurar búsqueda móvil si existe
    if (this.mobileSearchInput) {
      this.setupSearchInput(this.mobileSearchInput, 'mobile');
    }
    
    // Configurar sugerencias
    this.setupSearchSuggestions();    // Cerrar sugerencias al hacer click fuera (con mejor control)
    document.addEventListener('click', (e) => {
      // Solo ocultar si no está haciendo clic en elementos relacionados con la búsqueda
      const isSearchElement = e.target.closest('.search-wrapper') || 
                             e.target.closest('.search-suggestions') ||
                             e.target.closest('.suggestion-item') ||
                             e.target.closest('.quick-suggestion-btn') ||
                             e.target.closest('.default-suggestions');
      
      if (!isSearchElement) {
        setTimeout(() => {
          this.hideSearchSuggestions();
        }, 100);
      }
    });
  }

  loadSearchData() {
    // Datos de búsqueda predefinidos con las 4 páginas principales
    this.searchData = [
      // Páginas principales
      {
        title: "Sistemas Operativos",
        description: "Descubre los fundamentos de los sistemas operativos modernos, desde kernels hasta interfaces de usuario.",
        url: "./src/paginas/sistemas_operativos.html",
        type: "page",
        tags: "os kernel windows linux unix macos sistema operativo"
      },
      {
        title: "Gestión de Procesos",
        description: "Aprende sobre planificación, sincronización y comunicación entre procesos en sistemas operativos.",
        url: "./src/paginas/gestion_procesos.html",
        type: "page",
        tags: "procesos threads scheduling planificador sincronizacion"
      },
      {
        title: "Gestión de Memoria",
        description: "Explora las técnicas de administración de memoria virtual, paginación y segmentación.",
        url: "./src/paginas/gestion_memoria.html",
        type: "page",
        tags: "memoria ram virtual paginacion segmentacion heap stack"
      },
      {
        title: "Gestión de Almacenamiento",
        description: "Comprende los sistemas de archivos, dispositivos de almacenamiento y técnicas de gestión de datos.",
        url: "./src/paginas/gestion_almacenamiento.html",
        type: "page",
        tags: "archivos storage filesystem disco ssd hdd"
      },
      // Secciones principales
      {
        title: "Historia de la Tecnología",
        description: "Un recorrido por los hitos más importantes que han transformado la computación moderna",
        url: "#historia",
        type: "section",
        tags: "historia evolucion mainframe pc"
      },
      {
        title: "Contacto",
        description: "¿Preguntas sobre plataformas tecnológicas? Nuestro equipo está aquí para ayudarte",
        url: "#contacto",
        type: "section",
        tags: "contacto email universidad ayuda"
      },
      // Conceptos técnicos
      {
        title: "Kernel del Sistema Operativo",
        description: "El núcleo que gestiona recursos del hardware y provee servicios a las aplicaciones",
        url: "./src/paginas/sistemas_operativos.html#kernel",
        type: "content",
        tags: "kernel nucleo hardware drivers"
      },
      {
        title: "Algoritmos de Planificación",
        description: "Técnicas para asignar tiempo de CPU a diferentes procesos de manera eficiente",
        url: "./src/paginas/gestion_procesos.html#planificacion",
        type: "content",
        tags: "algoritmos scheduling fifo sjf round robin"
      },
      {
        title: "Memoria Virtual",
        description: "Sistema que permite que los programas utilicen más memoria de la físicamente disponible",
        url: "./src/paginas/gestion_memoria.html#virtual",
        type: "content",
        tags: "virtual memory swap paging"
      },
      {
        title: "Sistemas de Archivos",
        description: "Estructuras para organizar y almacenar archivos en dispositivos de almacenamiento",
        url: "./src/paginas/gestion_almacenamiento.html#filesystem",
        type: "content",
        tags: "filesystem fat ntfs ext4 archivos"
      }    ];
  }

  showDefaultSuggestions() {
    if (!this.searchSuggestions) return;

    // Mostrar solo las 4 páginas principales
    const mainPages = this.searchData.filter(item => item.type === 'page');
    
    const suggestionsContent = this.searchSuggestions.querySelector('.search-suggestions-content');
    if (!suggestionsContent) return;

    if (mainPages.length === 0) {
      suggestionsContent.innerHTML = `
        <div class="default-suggestions">
          <div class="default-suggestions-header">
            <i class="bi bi-bookmark-star"></i>
            <h6>Explora nuestro contenido</h6>
          </div>
          <p class="text-muted">Escribe para buscar o selecciona una opción:</p>
        </div>
      `;
    } else {
      suggestionsContent.innerHTML = `
        <div class="default-suggestions">
          <div class="default-suggestions-header">
            <i class="bi bi-bookmark-star"></i>
            <h6>Páginas principales</h6>
          </div>
          ${mainPages.map(page => 
            this.createSuggestionHTML(page, '')
          ).join('')}
        </div>
      `;
    }

    this.showSearchSuggestions();
    this.attachSuggestionEvents();
  }

  setupSearchSuggestions() {
    if (!this.searchSuggestions) return;
    
    // Configurar atributos de accesibilidad
    this.searchSuggestions.setAttribute('role', 'listbox');
    this.searchSuggestions.setAttribute('aria-hidden', 'true');
    
    // Configurar contenedor de sugerencias
    const suggestionsContent = this.searchSuggestions.querySelector('.search-suggestions-content');
    if (suggestionsContent) {
      suggestionsContent.setAttribute('role', 'list');
    }
    
    // Inicializar como oculto
    this.hideSearchSuggestions();
  }

  setupSearchInput(input, type) {
    const wrapper = input.closest('.search-wrapper') || input.parentElement;
    const clearBtn = wrapper.querySelector('.search-clear-btn');
    const loadingIndicator = wrapper.querySelector('.search-loading');

    // Evento de entrada con debounce
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      // Mostrar/ocultar botón de limpiar
      if (clearBtn) {
        clearBtn.classList.toggle('d-none', !query);
      }

      // Búsqueda con debounce
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(query, type);
      }, this.config.searchDebounceTime);
    });    // Eventos de focus/blur
    input.addEventListener('focus', () => {
      wrapper.classList.add('search-focused');
      if (input.value.trim()) {
        this.showSearchSuggestions();
      } else {
        // Mostrar páginas principales cuando no hay texto
        this.showDefaultSuggestions();
      }
    });    input.addEventListener('blur', () => {
      // NO ocultar inmediatamente, solo remover el estilo de focused
      setTimeout(() => {
        wrapper.classList.remove('search-focused');
      }, 500); // Mayor delay para permitir clicks en sugerencias
    });

    // Navegación por teclado
    input.addEventListener('keydown', (e) => {
      this.handleSearchKeyNavigation(e);
    });

    // Botón de limpiar
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        clearBtn.classList.add('d-none');
        this.hideSearchSuggestions();
        this.clearSearchResults();
      });
    }    // Efectos visuales
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-1px)';
    });

    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
    });
  }
  async performSearch(query, type = 'desktop') {
    if (!query) {
      this.showDefaultSuggestions(); // Mostrar páginas principales cuando no hay búsqueda
      return;
    }

    // Mostrar indicador de carga
    this.showLoadingIndicator(true);

    try {
      // Buscar en caché primero
      const cacheKey = query.toLowerCase();
      if (this.searchCache.has(cacheKey)) {
        const results = this.searchCache.get(cacheKey);
        this.displaySearchResults(results, query);
        return;
      }

      // Realizar búsqueda
      const results = await this.searchContent(query);
      
      // Guardar en caché
      this.searchCache.set(cacheKey, results);
        // Mostrar resultados
      this.displaySearchResults(results, query);
      
      // Filtrar contenido visible
      this.filterContent(query);
      
    } catch (error) {
      console.error('Error en búsqueda:', error);
      this.showSearchError();
    } finally {
      this.showLoadingIndicator(false);
    }
  }

  async searchContent(query) {
    // Simular búsqueda en contenido real
    const searchTerms = query.toLowerCase().split(' ');
    const results = [];

    // Buscar en datos predefinidos
    this.searchData.forEach(item => {
      const score = this.calculateSearchScore(item, searchTerms);
      if (score > 0) {
        results.push({ ...item, score });
      }
    });

    // Buscar en el DOM (contenido visible)
    const domResults = this.searchInDOM(searchTerms);
    results.push(...domResults);

    // Ordenar por relevancia y limitar resultados
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, this.config.maxSuggestions);
  }

  calculateSearchScore(item, searchTerms) {
    let score = 0;
    const content = (item.title + ' ' + item.description + ' ' + (item.tags || '')).toLowerCase();

    searchTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) score += 10;
      if (item.description.toLowerCase().includes(term)) score += 5;
      if (content.includes(term)) score += 2;
    });

    return score;
  }

  searchInDOM(searchTerms) {
    const results = [];
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
      const title = card.querySelector('.card-title')?.textContent || '';
      const text = card.querySelector('.card-text')?.textContent || '';
      const content = (title + ' ' + text).toLowerCase();

      let score = 0;
      searchTerms.forEach(term => {
        if (content.includes(term)) {
          score += title.toLowerCase().includes(term) ? 8 : 3;
        }
      });

      if (score > 0) {
        results.push({
          title: title || `Elemento ${index + 1}`,
          description: text.substring(0, 100) + '...',
          element: card,
          score: score,
          type: 'content'
        });
      }
    });

    return results;
  }

  displaySearchResults(results, query) {
    if (!this.searchSuggestions) return;

    const suggestionsContent = this.searchSuggestions.querySelector('.search-suggestions-content');
    if (!suggestionsContent) return;

    if (results.length === 0) {
      suggestionsContent.innerHTML = this.createNoResultsHTML(query);
    } else {
      suggestionsContent.innerHTML = results.map(result => 
        this.createSuggestionHTML(result, query)
      ).join('');
    }    this.showSearchSuggestions();
    this.attachSuggestionEvents();
  }

  filterContent(query) {
    // Filtrar contenido visible en la página actual (opcional)
    if (!query) return;
    
    const cards = document.querySelectorAll('.card');
    const searchTerms = query.toLowerCase().split(' ');
    
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matches = searchTerms.some(term => text.includes(term));
      
      if (matches) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
      }
    });
  }

  createSuggestionHTML(result, query) {
    const highlightedTitle = this.highlightSearchTerms(result.title, query);
    const highlightedDesc = this.highlightSearchTerms(result.description, query);
    
    return `
      <div class="suggestion-item" data-type="${result.type}" data-url="${result.url || ''}" role="option">
        <div class="suggestion-icon">
          <i class="bi bi-${this.getSuggestionIcon(result.type)}"></i>
        </div>
        <div class="suggestion-content">
          <div class="suggestion-title">${highlightedTitle}</div>
          <div class="suggestion-description">${highlightedDesc}</div>
          <div class="suggestion-meta">
            <span class="suggestion-type">${this.getTypeLabel(result.type)}</span>
          </div>
        </div>
        <div class="suggestion-action">
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    `;
  }  createNoResultsHTML(query) {
    return `
      <div class="no-results-container">
        <div class="no-results-content">
          <div class="no-results-icon">
            <i class="bi bi-search"></i>
          </div>
          <div class="no-results-text">
            <p class="no-results-title">Sin resultados para "${query}"</p>
            <p class="no-results-subtitle">No encontramos contenido relacionado con tu búsqueda</p>
          </div>
        </div>
        <div class="search-suggestions-quick">
          <p class="quick-suggestions-title">Te sugerimos explorar:</p>
          <div class="quick-suggestions-list">
            <button class="quick-suggestion-btn" data-query="sistemas operativos" data-url="./src/paginas/sistemas_operativos.html">📱 Sistemas Operativos</button>
            <button class="quick-suggestion-btn" data-query="procesos" data-url="./src/paginas/gestion_procesos.html">⚙️ Gestión de Procesos</button>
            <button class="quick-suggestion-btn" data-query="memoria" data-url="./src/paginas/gestion_memoria.html">💾 Gestión de Memoria</button>
            <button class="quick-suggestion-btn" data-query="almacenamiento" data-url="./src/paginas/gestion_almacenamiento.html">💿 Gestión de Almacenamiento</button>
          </div>
        </div>
      </div>
    `;
  }

  highlightSearchTerms(text, query) {
    if (!query || !text) return text;
    
    const terms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    let highlightedText = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
  }
  getSuggestionIcon(type) {
    const icons = {
      'page': 'file-earmark-text',
      'section': 'bookmark-fill',
      'content': 'file-text',
      'default': 'search'
    };
    return icons[type] || icons.default;
  }

  getTypeLabel(type) {
    const labels = {
      'page': 'Página',
      'section': 'Sección',
      'content': 'Contenido'
    };
    return labels[type] || 'Resultado';
  }
  attachSuggestionEvents() {
    const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
      suggestions.forEach((suggestion, index) => {
      suggestion.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevenir que se propague el evento
        this.handleSuggestionClick(suggestion);
      });

      suggestion.addEventListener('mouseenter', () => {
        this.highlightSuggestion(index);
      });

      // Prevenir que las sugerencias se oculten al hacer hover
      suggestion.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevenir que el input pierda el focus
      });
    });    // Manejar sugerencias rápidas
    const quickSuggestions = this.searchSuggestions.querySelectorAll('.quick-suggestion-btn');
    quickSuggestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevenir propagación del evento
        const query = btn.dataset.query;
        const url = btn.dataset.url;
        
        if (url) {
          // Navegar directamente a la página
          window.location.href = url;
        } else {
          // Buscar el término si no hay URL
          if (this.mainSearchInput) {
            this.mainSearchInput.value = query;
            this.performSearch(query, 'desktop');
          }
          if (this.mobileSearchInput) {
            this.mobileSearchInput.value = query;
          }
        }
        
        this.hideSearchSuggestions();
      });

      // Prevenir que los botones hagan que se pierda el focus
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    });
  }
  handleSuggestionClick(suggestion) {
    const type = suggestion.dataset.type;
    const url = suggestion.dataset.url;
    const title = suggestion.querySelector('.suggestion-title').textContent;
    
    // Realizar acción según el tipo
    if (url) {
      if (url.startsWith('#')) {
        // Navegación a sección de la misma página
        this.navigateToSection(url);
      } else if (url.startsWith('./')) {
        // Navegación a otra página
        window.location.href = url;
      } else {
        // URL externa
        window.open(url, '_blank');
      }
    } else if (type === 'content') {
      this.scrollToContent(title);
    } else if (type === 'section') {
      this.navigateToSection(title);
    }
    
    this.hideSearchSuggestions();
    
    // Actualizar input con el término seleccionado
    if (this.mainSearchInput) {
      this.mainSearchInput.value = title;
    }
    
    // Anuncio para lectores de pantalla
    this.announceToScreenReader(`Navegando a: ${title}`);
  }

  /* ===== MENÚ MÓVIL ANIMADO ===== */

  initializeMobileMenu() {
    if (!this.mobileMenuBtn || !this.mobileMenu) return;

    this.mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    // Cerrar menú al hacer click en overlay
    const overlay = this.mobileMenu.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Animaciones en links del menú móvil
    this.initializeMobileMenuLinks();
  }

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenuOpen = true;
    
    // Actualizar atributos de accesibilidad
    this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    this.mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    
    // Agregar clases de animación
    this.mobileMenu.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    
    // Animar elementos del menú con delay
    setTimeout(() => {
      this.animateMobileMenuItems('in');
    }, 100);
    
    // Focus en primer elemento navegable
    setTimeout(() => {
      const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
      if (firstLink) firstLink.focus();
    }, this.config.animationDuration);
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    
    // Actualizar atributos de accesibilidad
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    this.mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Animar salida
    this.animateMobileMenuItems('out');
    
    setTimeout(() => {
      this.mobileMenu.classList.remove('show');
      document.body.style.overflow = '';
    }, this.config.animationDuration);
    
    // Retornar focus al botón
    this.mobileMenuBtn.focus();
  }

  animateMobileMenuItems(direction) {
    const items = this.mobileMenu.querySelectorAll('.mobile-nav-item');
    
    items.forEach((item, index) => {
      const delay = direction === 'in' ? index * 50 : (items.length - index) * 30;
      
      setTimeout(() => {
        if (direction === 'in') {
          item.style.transform = 'translateX(0)';
          item.style.opacity = '1';
        } else {
          item.style.transform = 'translateX(100px)';
          item.style.opacity = '0';
        }
      }, delay);
    });
  }

  initializeMobileMenuLinks() {
    const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-nav-link');
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Agregar efecto de ripple
        this.createRippleEffect(e.currentTarget, e);
        
        // Cerrar menú después de la navegación
        setTimeout(() => {
          this.closeMobileMenu();
        }, 200);
      });
      
      // Efecto hover mejorado
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px) scale(1.02)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
      });
    });
  }
  /* ===== NAVEGACIÓN Y SCROLL ===== */
  initializeNavigation() {
    // Links de navegación con scroll suave (solo mantenemos efectos visuales)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      
      // Solo aplicar funcionalidad de scroll a secciones que SÍ deben mantenerla
      // Excluir: inicio, historia, contacto (para futuras páginas propias)
      if (!['#inicio', '#historia', '#contacto'].includes(targetId)) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            this.smoothScrollTo(targetElement);
            this.updateActiveNavLink(targetId);
            this.addNavClickEffect(link);
          }
        });
      } else {
        // Para los botones que van a páginas propias, solo prevenimos comportamiento por ahora
        link.addEventListener('click', (e) => {
          e.preventDefault();
          // TODO: Aquí se añadirá navegación a páginas propias en el futuro
          console.log(`Navegación a ${targetId} deshabilitada temporalmente para futuras páginas propias`);
        });
      }
      
      // Efectos de hover mejorados (mantener para todos)
      link.addEventListener('mouseenter', () => {
        this.addNavHoverEffect(link);
      });
      
      link.addEventListener('mouseleave', () => {
        this.removeNavHoverEffect(link);
      });
    });
    
    // Navegación activa basada en scroll (mantener)
    this.initializeScrollSpy();
  }

  addNavClickEffect(link) {
    // Efecto de clic con ondas
    const ripple = document.createElement('div');
    ripple.className = 'nav-ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: navRipple 0.6s linear;
      pointer-events: none;
    `;
    
    const rect = link.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    link.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addNavHoverEffect(link) {
    const icon = link.querySelector('.nav-icon');
    const text = link.querySelector('.nav-text');
    
    if (icon) {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
    if (text) {
      text.style.transform = 'translateX(2px)';
    }
  }

  removeNavHoverEffect(link) {
    const icon = link.querySelector('.nav-icon');
    const text = link.querySelector('.nav-text');
    
    if (icon) {
      icon.style.transform = '';
    }
    if (text) {
      text.style.transform = '';
    }
  }

  smoothScrollTo(element) {
    const headerHeight = this.header.offsetHeight;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveNavLink(targetId) {
    // Remover clase active de todos los links modernos
    document.querySelectorAll('.nav-modern-link').forEach(link => {
      link.classList.remove('active');
      
      // Animación de salida suave
      const indicator = link.querySelector('.nav-indicator');
      if (indicator) {
        indicator.style.transform = 'translateX(-50%) scaleX(0)';
      }
    });
    
    // Agregar clase active al link correspondiente
    const activeLink = document.querySelector(`a[href="${targetId}"].nav-modern-link`);
    if (activeLink) {
      activeLink.classList.add('active');
      
      // Animación de entrada para el indicador
      const indicator = activeLink.querySelector('.nav-indicator');
      if (indicator) {
        setTimeout(() => {
          indicator.style.transform = 'translateX(-50%) scaleX(1)';
        }, 100);
      }
      
      // Efecto de pulso suave
      this.addActivePulseEffect(activeLink);
    }
  }

  addActivePulseEffect(link) {
    link.style.animation = 'none';
    setTimeout(() => {
      link.style.animation = 'activeGlow 3s ease-in-out infinite';
    }, 10);
  }
  initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-modern-link[href^="#"]');
    
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = `#${entry.target.id}`;
          this.updateActiveNavLink(targetId);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  }

  initializeScrollEffects() {
    let lastScrollTop = 0;
    let ticking = false;
    
    const updateHeader = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Efecto de backdrop blur en scroll
      if (currentScroll > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      // Auto-hide header en scroll rápido hacia abajo (opcional)
      if (currentScroll > lastScrollTop && currentScroll > 200) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };
      window.addEventListener('scroll', requestTick, { passive: true });
  }

  /* ===== ACCESIBILIDAD ===== */
  
  initializeAccessibility() {
    // Configurar anuncios para lectores de pantalla
    if (!document.getElementById('sr-announcer')) {
      const announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'visually-hidden';
      document.body.appendChild(announcer);
    }
  }
  
  announceToScreenReader(message) {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }

  /* ===== FUNCIONES DE NAVEGACIÓN MEJORADAS ===== */
    navigateToSection(sectionId) {
    // Limpiar el símbolo # si existe
    const cleanId = sectionId.replace('#', '');
    
    // Deshabilitar navegación interna para secciones que tendrán páginas propias
    if (['inicio', 'historia', 'contacto'].includes(cleanId)) {
      console.log(`Navegación a ${cleanId} deshabilitada para futuras páginas propias`);
      return;
    }
    
    const targetElement = document.getElementById(cleanId) || document.querySelector(`[data-section="${cleanId}"]`);
    
    if (targetElement) {
      // Scroll suave al elemento
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Agregar efecto de highlight temporal
      this.highlightElement(targetElement);
      
      // Actualizar URL sin recargar la página
      if (history.pushState) {
        history.pushState(null, null, `#${cleanId}`);
      }
    }
  }
  
  scrollToContent(searchTerm) {
    // Buscar contenido que coincida en la página actual
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .card-title, .section-title');
    let bestMatch = null;
    let bestScore = 0;
    
    searchableElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      const termLower = searchTerm.toLowerCase();
      
      if (text.includes(termLower)) {
        const score = text === termLower ? 100 : 50;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = element;
        }
      }
    });
    
    if (bestMatch) {
      // Scroll al elemento encontrado
      bestMatch.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Highlight del elemento
      this.highlightElement(bestMatch);
    } else {
      // Si no se encuentra, mostrar mensaje
      this.showSearchNotification(`No se encontró contenido específico para "${searchTerm}"`);
    }
  }
  
  highlightElement(element) {
    // Agregar clase de highlight temporal
    element.classList.add('search-highlight');
    
    // Remover el highlight después de 3 segundos
    setTimeout(() => {
      element.classList.remove('search-highlight');
    }, 3000);
  }
  
  showSearchNotification(message) {
    // Crear o actualizar notificación
    let notification = document.getElementById('search-notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'search-notification';
      notification.className = 'search-notification';
      document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
      <div class="search-notification-content">
        <i class="bi bi-info-circle"></i>
        <span>${message}</span>
        <button class="search-notification-close" onclick="this.parentElement.parentElement.remove()">
          <i class="bi bi-x"></i>
        </button>
      </div>
    `;
      // Auto-remover después de 8 segundos (más tiempo para leer)
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 8000);
  }
  
  /* ===== FUNCIONES DE UTILIDAD PARA BÚSQUEDA ===== */
  
  showLoadingIndicator(show) {
    const indicators = document.querySelectorAll('.search-loading');
    indicators.forEach(indicator => {
      indicator.classList.toggle('d-none', !show);
    });
  }
  
  showSearchError() {
    if (!this.searchSuggestions) return;
    
    const suggestionsContent = this.searchSuggestions.querySelector('.search-suggestions-content');
    if (suggestionsContent) {
      suggestionsContent.innerHTML = `
        <div class="search-error">
          <div class="search-error-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <div class="search-error-text">
            <p>Error en la búsqueda</p>
            <small>Inténtalo de nuevo en unos momentos</small>
          </div>
        </div>
      `;
      this.showSearchSuggestions();
    }
  }
  
  clearSearchResults() {
    // Limpiar filtros visuales
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '';
      card.style.transform = '';
    });
    
    // Remover mensajes de "sin resultados"
    const noResultsMsg = document.getElementById('no-results-message');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  highlightSuggestion(index) {
    // Remover highlight previo
    const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
    suggestions.forEach(item => item.classList.remove('highlighted'));
    
    // Agregar highlight al item actual
    if (suggestions[index]) {
      suggestions[index].classList.add('highlighted');
    }
  }
  
  handleSearchKeyNavigation(e) {
    if (!this.searchSuggestions || this.searchSuggestions.classList.contains('d-none')) {
      return;
    }
    
    const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
    const currentHighlighted = this.searchSuggestions.querySelector('.suggestion-item.highlighted');
    let currentIndex = -1;
    
    if (currentHighlighted) {
      currentIndex = Array.from(suggestions).indexOf(currentHighlighted);
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % suggestions.length;
        this.highlightSuggestion(nextIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1;
        this.highlightSuggestion(prevIndex);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (currentHighlighted) {
          this.handleSuggestionClick(currentHighlighted);
        }
        break;
        
      case 'Escape':
        this.hideSearchSuggestions();
        e.target.blur();
        break;
    }
  }
  
  showSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.remove('d-none');
      this.searchSuggestions.setAttribute('aria-hidden', 'false');
    }
  }
  
  hideSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.add('d-none');
      this.searchSuggestions.setAttribute('aria-hidden', 'true');
      
      // Limpiar highlights
      const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
      suggestions.forEach(item => item.classList.remove('highlighted'));
    }
  }
}

/* ===== FUNCIONES DE NAVEGACIÓN MEJORADAS ===== */
  
function navigateToSection(sectionId) {
  // Limpiar el símbolo # si existe
  const cleanId = sectionId.replace('#', '');
  
  // Deshabilitar navegación interna para secciones que tendrán páginas propias
  if (['inicio', 'historia', 'contacto'].includes(cleanId)) {
    console.log(`Navegación a ${cleanId} deshabilitada para futuras páginas propias`);
    return;
  }
  
  const targetElement = document.getElementById(cleanId) || document.querySelector(`[data-section="${cleanId}"]`);
  
  if (targetElement) {
    // Scroll suave al elemento
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Agregar efecto de highlight temporal
    highlightElement(targetElement);
    
    // Actualizar URL sin recargar la página
    if (history.pushState) {
      history.pushState(null, null, `#${cleanId}`);
    }
  }
}

function scrollToContent(searchTerm) {
  // Buscar contenido que coincida en la página actual
  const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .card-title, .section-title');
  let bestMatch = null;
  let bestScore = 0;
  
  searchableElements.forEach(element => {
    const text = element.textContent.toLowerCase();
    const termLower = searchTerm.toLowerCase();
    
    if (text.includes(termLower)) {
      const score = text === termLower ? 100 : 50;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = element;
      }
    }
  });
  
  if (bestMatch) {
    // Scroll al elemento encontrado
    bestMatch.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Highlight del elemento
    highlightElement(bestMatch);
  } else {
    // Si no se encuentra, mostrar mensaje
    showSearchNotification(`No se encontró contenido específico para "${searchTerm}"`);
  }
}

function highlightElement(element) {
  // Agregar clase de highlight temporal
  element.classList.add('search-highlight');
  
  // Remover el highlight después de 3 segundos
  setTimeout(() => {
    element.classList.remove('search-highlight');
  }, 3000);
}

function showSearchNotification(message) {
  // Delegar a la instancia de HeaderManager si existe
  if (window.headerManager && typeof window.headerManager.showSearchNotification === 'function') {
    window.headerManager.showSearchNotification(message);
    return;
  }
  
  // Fallback básico sin botón de cerrar duplicado
  let notification = document.getElementById('search-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'search-notification';
    notification.className = 'search-notification';
    document.body.appendChild(notification);
  }
  
  notification.innerHTML = `
    <div class="search-notification-content">
      <i class="bi bi-info-circle"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Auto-remover después de 8 segundos (más tiempo para leer)
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 8000);
}

/* ===== FUNCIONES LEGACY ===== */

// Función legacy para compatibilidad
function initializeHeader() {
  if (!window.headerManager) {
    window.headerManager = new HeaderManager();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar clase de carga al header
  const header = document.querySelector('header');
  if (header) {
    setTimeout(() => {
      header.classList.add('header-loaded');
    }, 100);
  }
  
  // Inicializar header manager
  window.headerManager = new HeaderManager();
});

// CSS adicional para animaciones (se inyecta dinámicamente)
const additionalCSS = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .suggestion-item.highlighted {
    background: rgba(168, 237, 234, 0.15);
    transform: translateX(4px);
  }
  
  .mobile-nav-item {
    transform: translateX(100px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  mark {
    background: rgba(168, 237, 234, 0.3);
    color: inherit;
    padding: 1px 3px;
    border-radius: 3px;
  }
  
  .suggestion-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .suggestion-item:hover {
    background: rgba(168, 237, 234, 0.1);
    transform: translateX(4px);
  }
  
  .suggestion-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(168, 237, 234, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a8edea;
  }
  
  .suggestion-content {
    flex: 1;
  }
  
  .suggestion-title {
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .suggestion-description {
    font-size: 12px;
    opacity: 0.7;
  }
  
  .suggestion-action {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .suggestion-item:hover .suggestion-action {
    opacity: 1;
  }
`;

// Inyectar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Exportar para uso en otros módulos
window.HeaderManager = HeaderManager;
