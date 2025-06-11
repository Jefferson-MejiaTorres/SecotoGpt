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
    this.activeSearchInput = null; // Nuevo: para trackear cuál input está activo
    
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
      this.initializeNavigation();
      this.initializeScrollEffects();
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
    
    // Crear sugerencias móviles si no existe
    this.mobileSearchSuggestions = document.getElementById('mobileSearchSuggestions');
    if (!this.mobileSearchSuggestions && this.mobileSearchInput) {
      this.createMobileSearchSuggestions();
    }
    
    // Validar elementos críticos
    if (!this.header || !this.mainSearchInput) {
      throw new Error('Elementos críticos del header no encontrados');
    }
  }

  /* ===== FUNCIONALIDAD DE BÚSQUEDA UNIFICADA ===== */

  initializeSearch() {
    if (!this.mainSearchInput) return;

    // Configurar búsqueda principal
    this.setupSearchInput(this.mainSearchInput, 'desktop');
    
    // Configurar búsqueda móvil si existe
    if (this.mobileSearchInput) {
      this.setupSearchInput(this.mobileSearchInput, 'mobile');
    }
    
    // Configurar sugerencias
    this.setupSearchSuggestions();
    
    // Cerrar sugerencias al hacer click fuera (con mejor control)
    document.addEventListener('click', (e) => {
      const isSearchElement = e.target.closest('.search-wrapper') || 
                             e.target.closest('.search-suggestions') ||
                             e.target.closest('.mobile-search-suggestions') ||
                             e.target.closest('.suggestion-item') ||
                             e.target.closest('.quick-suggestion-btn') ||
                             e.target.closest('.default-suggestions');
      
      if (!isSearchElement) {
        setTimeout(() => {
          this.hideAllSearchSuggestions();
        }, 100);
      }
    });
  }

  createMobileSearchSuggestions() {
    // Crear contenedor de sugerencias para móvil
    const mobileSearchWrapper = this.mobileSearchInput.closest('.search-wrapper') || this.mobileSearchInput.parentElement;
    
    const mobileSuggestions = document.createElement('div');
    mobileSuggestions.id = 'mobileSearchSuggestions';
    mobileSuggestions.className = 'search-suggestions mobile-search-suggestions d-none';
    mobileSuggestions.innerHTML = `
      <div class="search-suggestions-content"></div>
    `;
    
    // Insertar después del wrapper de búsqueda móvil
    mobileSearchWrapper.parentNode.insertBefore(mobileSuggestions, mobileSearchWrapper.nextSibling);
    this.mobileSearchSuggestions = mobileSuggestions;
  }

  setupSearchInput(input, type) {
    const wrapper = input.closest('.search-wrapper') || input.parentElement;
    const clearBtn = wrapper.querySelector('.search-clear-btn');
    const loadingIndicator = wrapper.querySelector('.search-loading');

    // Evento de entrada con debounce
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      // Establecer el input activo
      this.activeSearchInput = input;
      
      // Mostrar/ocultar botón de limpiar
      if (clearBtn) {
        clearBtn.classList.toggle('d-none', !query);
      }

      // Sincronizar con el otro input
      this.syncSearchInputs(input, query);

      // Búsqueda con debounce
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(query, type);
      }, this.config.searchDebounceTime);
    });

    // Eventos de focus/blur
    input.addEventListener('focus', () => {
      this.activeSearchInput = input;
      wrapper.classList.add('search-focused');
      
      if (input.value.trim()) {
        this.showSearchSuggestions(type);
      } else {
        this.showDefaultSuggestions(type);
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        wrapper.classList.remove('search-focused');
      }, 500);
    });

    // Navegación por teclado
    input.addEventListener('keydown', (e) => {
      this.handleSearchKeyNavigation(e, type);
    });

    // Botón de limpiar
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearSearch(input, type);
      });
    }

    // Efectos visuales
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-1px)';
    });

    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
    });
  }

  syncSearchInputs(sourceInput, query) {
    // Sincronizar el valor entre los inputs de búsqueda
    if (sourceInput === this.mainSearchInput && this.mobileSearchInput) {
      this.mobileSearchInput.value = query;
    } else if (sourceInput === this.mobileSearchInput && this.mainSearchInput) {
      this.mainSearchInput.value = query;
    }
  }

  clearSearch(input, type) {
    // Limpiar ambos inputs
    if (this.mainSearchInput) this.mainSearchInput.value = '';
    if (this.mobileSearchInput) this.mobileSearchInput.value = '';
    
    // Enfocar el input actual
    input.focus();
    
    // Ocultar botones de limpiar
    const clearBtns = document.querySelectorAll('.search-clear-btn');
    clearBtns.forEach(btn => btn.classList.add('d-none'));
    
    this.hideAllSearchSuggestions();
    this.clearSearchResults();
  }

  loadSearchData() {
    // Datos de búsqueda predefinidos con las 4 páginas principales
    this.searchData = [
      // Páginas principales
      {
        title: "Sistemas Operativos",
        description: "Descubre los fundamentos de los sistemas operativos modernos, desde kernels hasta interfaces de usuario.",
        url: "/src/paginas/sistemas_operativos.html",
        type: "page",
        tags: "os kernel windows linux unix macos sistema operativo"
      },
      {
        title: "Gestión de Procesos",
        description: "Aprende sobre planificación, sincronización y comunicación entre procesos en sistemas operativos.",
        url: "/src/paginas/gestion_procesos.html",
        type: "page",
        tags: "procesos threads scheduling planificador sincronizacion"
      },
      {
        title: "Gestión de Memoria",
        description: "Explora las técnicas de administración de memoria virtual, paginación y segmentación.",
        url: "/src/paginas/gestion_memoria.html",
        type: "page",
        tags: "memoria ram virtual paginacion segmentacion heap stack"
      },
      {
        title: "Gestión de Almacenamiento",
        description: "Comprende los sistemas de archivos, dispositivos de almacenamiento y técnicas de gestión de datos.",
        url: "/src/paginas/gestion_almacenamiento.html",
        type: "page",
        tags: "archivos storage filesystem disco ssd hdd"
      },
      // Secciones principales
      {
        title: "Historia de la Tecnología",
        description: "Un recorrido por los hitos más importantes que han transformado la computación moderna",
        url: "/src/PaginaPrincipal/PaginaSecundarias/Historia/PrincipalHistoria.html",
        type: "section",
        tags: "historia evolucion mainframe pc"
      },
      {
        title: "Contáctanos",
        description: "¿Preguntas sobre plataformas tecnológicas? Nuestro equipo está aquí para ayudarte",
        url: "/src/PaginaPrincipal/PaginaSecundarias/Contactanos/PrincipalContactano.html",
        type: "section",
        tags: "contacto email universidad ayuda"
      },
      // Conceptos técnicos
      {
        title: "Kernel del Sistema Operativo",
        description: "El núcleo que gestiona recursos del hardware y provee servicios a las aplicaciones",
        url: "/src/paginas/sistemas_operativos.html#kernel",
        type: "content",
        tags: "kernel nucleo hardware drivers"
      },
      {
        title: "Algoritmos de Planificación",
        description: "Técnicas para asignar tiempo de CPU a diferentes procesos de manera eficiente",
        url: "/src/paginas/gestion_procesos.html#planificacion",
        type: "content",
        tags: "algoritmos scheduling fifo sjf round robin"
      },
      {
        title: "Memoria Virtual",
        description: "Sistema que permite que los programas utilicen más memoria de la físicamente disponible",
        url: "/src/paginas/gestion_memoria.html#virtual",
        type: "content",
        tags: "virtual memory swap paging"
      },
      {
        title: "Sistemas de Archivos",
        description: "Estructuras para organizar y almacenar archivos en dispositivos de almacenamiento",
        url: "/src/paginas/gestion_almacenamiento.html#filesystem",
        type: "content",
        tags: "filesystem fat ntfs ext4 archivos"
      }
    ];
  }

  showDefaultSuggestions(type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer) return;

    const mainPages = this.searchData.filter(item => item.type === 'page');
    const suggestionsContent = suggestionsContainer.querySelector('.search-suggestions-content');
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

    this.showSearchSuggestions(type);
    this.attachSuggestionEvents(type);
  }

  getSuggestionsContainer(type) {
    return type === 'mobile' ? this.mobileSearchSuggestions : this.searchSuggestions;
  }

  setupSearchSuggestions() {
    // Configurar sugerencias para desktop
    if (this.searchSuggestions) {
      this.configureSearchSuggestionsContainer(this.searchSuggestions);
    }
    
    // Configurar sugerencias para móvil
    if (this.mobileSearchSuggestions) {
      this.configureSearchSuggestionsContainer(this.mobileSearchSuggestions);
    }
  }

  configureSearchSuggestionsContainer(container) {
    container.setAttribute('role', 'listbox');
    container.setAttribute('aria-hidden', 'true');
    
    const suggestionsContent = container.querySelector('.search-suggestions-content');
    if (suggestionsContent) {
      suggestionsContent.setAttribute('role', 'list');
    }
    
    // Inicializar como oculto
    container.classList.add('d-none');
  }

  async performSearch(query, type = 'desktop') {
    if (!query) {
      this.showDefaultSuggestions(type);
      return;
    }

    this.showLoadingIndicator(true, type);

    try {
      const cacheKey = query.toLowerCase();
      if (this.searchCache.has(cacheKey)) {
        const results = this.searchCache.get(cacheKey);
        this.displaySearchResults(results, query, type);
        return;
      }

      const results = await this.searchContent(query);
      this.searchCache.set(cacheKey, results);
      this.displaySearchResults(results, query, type);
      this.filterContent(query);
      
    } catch (error) {
      console.error('Error en búsqueda:', error);
      this.showSearchError(type);
    } finally {
      this.showLoadingIndicator(false, type);
    }
  }

  async searchContent(query) {
    const searchTerms = query.toLowerCase().split(' ');
    const results = [];

    this.searchData.forEach(item => {
      const score = this.calculateSearchScore(item, searchTerms);
      if (score > 0) {
        results.push({ ...item, score });
      }
    });

    const domResults = this.searchInDOM(searchTerms);
    results.push(...domResults);

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

  displaySearchResults(results, query, type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer) return;

    const suggestionsContent = suggestionsContainer.querySelector('.search-suggestions-content');
    if (!suggestionsContent) return;

    if (results.length === 0) {
      suggestionsContent.innerHTML = this.createNoResultsHTML(query);
    } else {
      suggestionsContent.innerHTML = results.map(result => 
        this.createSuggestionHTML(result, query)
      ).join('');
    }

    this.showSearchSuggestions(type);
    this.attachSuggestionEvents(type);
  }

  filterContent(query) {
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
  }

  createNoResultsHTML(query) {
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

  attachSuggestionEvents(type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer) return;

    const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
    
    suggestions.forEach((suggestion, index) => {
      suggestion.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleSuggestionClick(suggestion, type);
      });

      suggestion.addEventListener('mouseenter', () => {
        this.highlightSuggestion(index, type);
      });

      suggestion.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    });

    const quickSuggestions = suggestionsContainer.querySelectorAll('.quick-suggestion-btn');
    quickSuggestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleQuickSuggestionClick(btn, type);
      });

      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    });
  }

  handleQuickSuggestionClick(btn, type) {
    const query = btn.dataset.query;
    const url = btn.dataset.url;
    
    if (url) {
      window.location.href = url;
    } else {
      // Actualizar ambos inputs
      if (this.mainSearchInput) {
        this.mainSearchInput.value = query;
        this.performSearch(query, 'desktop');
      }
      if (this.mobileSearchInput) {
        this.mobileSearchInput.value = query;
      }
    }
    
    this.hideAllSearchSuggestions();
    
    // Si es búsqueda móvil, cerrar el menú
    if (type === 'mobile') {
      setTimeout(() => {
        this.closeMobileMenu();
      }, 300);
    }
  }

  handleSuggestionClick(suggestion, type) {
    const suggestionType = suggestion.dataset.type;
    const url = suggestion.dataset.url;
    const title = suggestion.querySelector('.suggestion-title').textContent;
    
    if (url) {
      if (url.startsWith('#')) {
        this.navigateToSection(url);
      } else if (url.startsWith('./') || url.startsWith('/')) {
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    } else if (suggestionType === 'content') {
      this.scrollToContent(title);
    } else if (suggestionType === 'section') {
      this.navigateToSection(title);
    }
    
    this.hideAllSearchSuggestions();
    
    // Actualizar ambos inputs con el término seleccionado
    if (this.mainSearchInput) {
      this.mainSearchInput.value = title;
    }
    if (this.mobileSearchInput) {
      this.mobileSearchInput.value = title;
    }
    
    // Si es búsqueda móvil, cerrar el menú
    if (type === 'mobile') {
      setTimeout(() => {
        this.closeMobileMenu();
      }, 300);
    }
    
    this.announceToScreenReader(`Navegando a: ${title}`);
  }

  /* ===== MENÚ MÓVIL ANIMADO ===== */

  initializeMobileMenu() {
    if (!this.mobileMenuBtn || !this.mobileMenu) return;

    this.mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    const overlay = this.mobileMenu.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    this.initializeMobileMenuLinks();
  }

  toggleMobileMenu() {
    console.log('Intentando abrir/cerrar menú móvil. Estado actual:', this.mobileMenuOpen);
    
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenuOpen = true;
    
    this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    this.mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    
    this.mobileMenu.style.display = 'block';
    this.mobileMenu.style.visibility = 'visible';
    
    setTimeout(() => {
      this.mobileMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        this.animateMobileMenuItems('in');
      }, 100);
      
      console.log('Menú móvil abierto');
    }, 10);
  }

  closeMobileMenu() {
    if (!this.mobileMenuOpen) return;
    
    this.mobileMenuOpen = false;
    
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    this.mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Ocultar sugerencias móviles al cerrar el menú
    this.hideSearchSuggestions('mobile');
    
    this.animateMobileMenuItems('out');
    
    setTimeout(() => {
      this.mobileMenu.classList.remove('show');
      
      setTimeout(() => {
        if (!this.mobileMenuOpen) {
          this.mobileMenu.style.display = 'none';
          this.mobileMenu.style.visibility = 'hidden';
          document.body.style.overflow = '';
          
          console.log('Menú móvil cerrado');
        }
      }, 300);
    }, 150);
    
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.focus();
    }
  }

  animateMobileMenuItems(direction) {
    const items = this.mobileMenu.querySelectorAll('.mobile-nav-item');
    
    items.forEach(item => {
      item.classList.remove('animated');
      item.style.display = 'block';
    });
    
    if (direction === 'in') {
      items.forEach(item => {
        item.style.transform = 'translateX(50px)';
        item.style.opacity = '0';
      });
      
      items.forEach((item, index) => {
        const delay = index * 100;
        
        setTimeout(() => {
          item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
          item.style.transform = 'translateX(0)';
          item.style.opacity = '1';
          
          console.log(`Animando item ${index} hacia adentro`);
        }, delay);
      });
    } else {
      [...items].reverse().forEach((item, index) => {
        const delay = index * 50;
        
        setTimeout(() => {
          item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
          item.style.transform = 'translateX(50px)';
          item.style.opacity = '0';
          
          console.log(`Animando item ${items.length - 1 - index} hacia afuera`);
        }, delay);
      });
    }
  }

  initializeMobileMenuLinks() {
    const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-nav-link');
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(() => {
            this.closeMobileMenu();
          }, 200);
        } else if (href && href.startsWith('#')) {
          this.closeMobileMenu();
        }
      });
      
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
    const navLinks = document.querySelectorAll('.nav-modern-link, .mobile-nav-link');
    const currentPage = this.getCurrentPageName();

    navLinks.forEach(link => {
      const linkPage = link.dataset.page;

      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }

      link.addEventListener('click', (e) => {
        if (linkPage === currentPage && link.getAttribute('href').includes('#')) {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            this.smoothScrollTo(targetElement);
          }
        }
        
        this.addNavClickEffect(link);
        if (link.classList.contains('mobile-nav-link')) {
          setTimeout(() => {
            this.closeMobileMenu();
          }, 200);
        }
      });

      link.addEventListener('mouseenter', () => {
        this.addNavHoverEffect(link);
      });
      
      link.addEventListener('mouseleave', () => {
        this.removeNavHoverEffect(link);
      });
    });
  }

  getCurrentPageName() {
    const path = window.location.pathname;
    const pathSegments = path.replace(/^\/|\/$/g, '').split('/');
    const pageNameWithExtension = pathSegments.pop();
    const pageName = pageNameWithExtension.split('.')[0];

    if (pageName === 'PrincipalContactano') {
      return 'contactanos';
    } else if (pageName === 'PrincipalHistoria') {
      return 'historia';
    } else if (pageName === 'secotogpt' || pageName === '' || pageName === 'index') {
      return 'inicio';
    }
    return pageName;
  }

  addNavClickEffect(link) {
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

  updateActiveNavLink(targetIdOrPage) {
    const isPageNavigation = !targetIdOrPage.startsWith('#');
    const currentPage = this.getCurrentPageName();

    document.querySelectorAll('.nav-modern-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      const indicator = link.querySelector('.nav-indicator');
      if (indicator) {
        indicator.style.transform = 'translateX(-50%) scaleX(0)';
      }

      const linkPage = link.dataset.page;
      if (isPageNavigation) {
        if (linkPage === targetIdOrPage) {
          link.classList.add('active');
          if (indicator) {
            setTimeout(() => {
              indicator.style.transform = 'translateX(-50%) scaleX(1)';
            }, 100);
          }
          this.addActivePulseEffect(link);
        }
      } else {
        if (link.getAttribute('href') === targetIdOrPage && linkPage === currentPage) {
            link.classList.add('active');
            if (indicator) {
                setTimeout(() => {
                    indicator.style.transform = 'translateX(-50%) scaleX(1)';
                }, 100);
            }
            this.addActivePulseEffect(link);
        }
      }
    });
  }

  initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const currentPage = this.getCurrentPageName();

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = `#${entry.target.id}`;
          const activeLinkForSection = document.querySelector(`.nav-modern-link[href="${targetId}"][data-page="${currentPage}"], .mobile-nav-link[href="${targetId}"][data-page="${currentPage}"]`);
          if (activeLinkForSection) {
             this.updateActiveNavLink(targetId);
          }
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
      
      if (currentScroll > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
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
    const cleanId = sectionId.replace('#', '');
    
    if (['inicio', 'historia', 'contacto'].includes(cleanId)) {
      console.log(`Navegación a ${cleanId} deshabilitada para futuras páginas propias`);
      return;
    }
    
    const targetElement = document.getElementById(cleanId) || document.querySelector(`[data-section="${cleanId}"]`);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      this.highlightElement(targetElement);
      
      if (history.pushState) {
        history.pushState(null, null, `#${cleanId}`);
      }
    }
  }
  
  scrollToContent(searchTerm) {
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
      bestMatch.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      this.highlightElement(bestMatch);
    } else {
      this.showSearchNotification(`No se encontró contenido específico para "${searchTerm}"`);
    }
  }
  
  highlightElement(element) {
    element.classList.add('search-highlight');
    
    setTimeout(() => {
      element.classList.remove('search-highlight');
    }, 3000);
  }
  
  showSearchNotification(message) {
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
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 8000);
  }
  
  /* ===== FUNCIONES DE UTILIDAD PARA BÚSQUEDA UNIFICADAS ===== */
  
  showLoadingIndicator(show, type = 'both') {
    if (type === 'both' || type === 'desktop') {
      const desktopIndicators = document.querySelectorAll('.search-wrapper:not(.mobile-search-wrapper) .search-loading');
      desktopIndicators.forEach(indicator => {
        indicator.classList.toggle('d-none', !show);
      });
    }
    
    if (type === 'both' || type === 'mobile') {
      const mobileIndicators = document.querySelectorAll('.mobile-search-wrapper .search-loading');
      mobileIndicators.forEach(indicator => {
        indicator.classList.toggle('d-none', !show);
      });
    }
  }
  
  showSearchError(type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer) return;
    
    const suggestionsContent = suggestionsContainer.querySelector('.search-suggestions-content');
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
      this.showSearchSuggestions(type);
    }
  }
  
  clearSearchResults() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '';
      card.style.transform = '';
    });
    
    const noResultsMsg = document.getElementById('no-results-message');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  highlightSuggestion(index, type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer) return;
    
    const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
    suggestions.forEach(item => item.classList.remove('highlighted'));
    
    if (suggestions[index]) {
      suggestions[index].classList.add('highlighted');
    }
  }
  
  handleSearchKeyNavigation(e, type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (!suggestionsContainer || suggestionsContainer.classList.contains('d-none')) {
      return;
    }
    
    const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
    const currentHighlighted = suggestionsContainer.querySelector('.suggestion-item.highlighted');
    let currentIndex = -1;
    
    if (currentHighlighted) {
      currentIndex = Array.from(suggestions).indexOf(currentHighlighted);
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % suggestions.length;
        this.highlightSuggestion(nextIndex, type);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1;
        this.highlightSuggestion(prevIndex, type);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (currentHighlighted) {
          this.handleSuggestionClick(currentHighlighted, type);
        }
        break;
        
      case 'Escape':
        this.hideSearchSuggestions(type);
        e.target.blur();
        break;
    }
  }
  
  showSearchSuggestions(type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (suggestionsContainer) {
      suggestionsContainer.classList.remove('d-none');
      suggestionsContainer.setAttribute('aria-hidden', 'false');
    }
  }
  
  hideSearchSuggestions(type = 'desktop') {
    const suggestionsContainer = this.getSuggestionsContainer(type);
    if (suggestionsContainer) {
      suggestionsContainer.classList.add('d-none');
      suggestionsContainer.setAttribute('aria-hidden', 'true');
      
      const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
      suggestions.forEach(item => item.classList.remove('highlighted'));
    }
  }
  
  hideAllSearchSuggestions() {
    this.hideSearchSuggestions('desktop');
    this.hideSearchSuggestions('mobile');
  }
}

/* ===== FUNCIONES DE NAVEGACIÓN GLOBALES ===== */
  
function navigateToSection(sectionId) {
  const cleanId = sectionId.replace('#', '');
  
  if (['inicio', 'historia', 'contacto'].includes(cleanId)) {
    console.log(`Navegación a ${cleanId} deshabilitada para futuras páginas propias`);
    return;
  }
  
  const targetElement = document.getElementById(cleanId) || document.querySelector(`[data-section="${cleanId}"]`);
  
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    highlightElement(targetElement);
    
    if (history.pushState) {
      history.pushState(null, null, `#${cleanId}`);
    }
  }
}

function scrollToContent(searchTerm) {
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
    bestMatch.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    highlightElement(bestMatch);
  } else {
    showSearchNotification(`No se encontró contenido específico para "${searchTerm}"`);
  }
}

function highlightElement(element) {
  element.classList.add('search-highlight');
  
  setTimeout(() => {
    element.classList.remove('search-highlight');
  }, 3000);
}

function showSearchNotification(message) {
  if (window.headerManager && typeof window.headerManager.showSearchNotification === 'function') {
    window.headerManager.showSearchNotification(message);
    return;
  }
  
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
  
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 8000);
}

/* ===== FUNCIONES LEGACY ===== */

function initializeHeader() {
  if (!window.headerManager) {
    window.headerManager = new HeaderManager();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  if (header) {
    setTimeout(() => {
      header.classList.add('header-loaded');
    }, 100);
  }
  
  window.headerManager = new HeaderManager();
});

// CSS adicional para animaciones
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

  .mobile-search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
    margin-top: 8px;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

window.HeaderManager = HeaderManager;
