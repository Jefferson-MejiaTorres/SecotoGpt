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
    this.setupSearchSuggestions();
    
    // Cerrar sugerencias al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        this.hideSearchSuggestions();
      }
    });
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
    });

    // Eventos de focus/blur
    input.addEventListener('focus', () => {
      wrapper.classList.add('search-focused');
      if (input.value.trim()) {
        this.showSearchSuggestions();
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        wrapper.classList.remove('search-focused');
      }, 150);
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
    }

    // Efectos visuales
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-1px)';
    });

    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
    });
  }

  async performSearch(query, type = 'desktop') {
    if (!query) {
      this.hideSearchSuggestions();
      this.clearSearchResults();
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
    }

    this.showSearchSuggestions();
    this.attachSuggestionEvents();
  }

  createSuggestionHTML(result, query) {
    const highlightedTitle = this.highlightSearchTerms(result.title, query);
    const highlightedDesc = this.highlightSearchTerms(result.description, query);
    
    return `
      <div class="suggestion-item" data-type="${result.type}" role="option">
        <div class="suggestion-icon">
          <i class="bi bi-${this.getSuggestionIcon(result.type)}"></i>
        </div>
        <div class="suggestion-content">
          <div class="suggestion-title">${highlightedTitle}</div>
          <div class="suggestion-description">${highlightedDesc}</div>
        </div>
        <div class="suggestion-action">
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    `;
  }

  createNoResultsHTML(query) {
    return `
      <div class="no-results-container text-center py-4">
        <i class="bi bi-search text-muted mb-2" style="font-size: 2rem;"></i>
        <p class="text-muted mb-2">No se encontraron resultados para "<strong>${query}</strong>"</p>
        <small class="text-muted">Intenta con términos diferentes o más generales</small>
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
      'content': 'file-text',
      'section': 'bookmark',
      'page': 'file-earmark',
      'default': 'search'
    };
    return icons[type] || icons.default;
  }

  attachSuggestionEvents() {
    const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
    
    suggestions.forEach((suggestion, index) => {
      suggestion.addEventListener('click', () => {
        this.handleSuggestionClick(suggestion);
      });

      suggestion.addEventListener('mouseenter', () => {
        this.highlightSuggestion(index);
      });
    });
  }

  handleSuggestionClick(suggestion) {
    const type = suggestion.dataset.type;
    const title = suggestion.querySelector('.suggestion-title').textContent;
    
    // Realizar acción según el tipo
    if (type === 'content') {
      this.scrollToContent(title);
    } else if (type === 'section') {
      this.navigateToSection(title);
    }
    
    this.hideSearchSuggestions();
    
    // Actualizar input con el término seleccionado
    if (this.mainSearchInput) {
      this.mainSearchInput.value = title;
    }
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
    // Links de navegación con scroll suave
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
          this.updateActiveNavLink(targetId);
          this.addNavClickEffect(link);
        }
      });
      
      // Efectos de hover mejorados
      link.addEventListener('mouseenter', () => {
        this.addNavHoverEffect(link);
      });
      
      link.addEventListener('mouseleave', () => {
        this.removeNavHoverEffect(link);
      });
    });
    
    // Navegación activa basada en scroll
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

  /* ===== UTILIDADES Y EFECTOS ===== */

  initializeAccessibility() {
    // Navegación por teclado mejorada
    this.initializeKeyboardNavigation();
    
    // Anuncios para lectores de pantalla
    this.initializeScreenReaderAnnouncements();
    
    // Configuración de ARIA
    this.setupARIAAttributes();
  }

  initializeKeyboardNavigation() {
    // Navegación por teclado en sugerencias
    if (this.mainSearchInput) {
      this.mainSearchInput.addEventListener('keydown', (e) => {
        this.handleSearchKeyNavigation(e);
      });
    }
    
    // Acceso rápido por teclado
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K para enfocar búsqueda
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (this.mainSearchInput) {
          this.mainSearchInput.focus();
          this.mainSearchInput.select();
        }
      }
      
      // Escape para cerrar elementos
      if (e.key === 'Escape') {
        this.hideSearchSuggestions();
        if (this.mobileMenuOpen) {
          this.closeMobileMenu();
        }
      }
    });
  }

  handleSearchKeyNavigation(e) {
    const suggestions = this.searchSuggestions?.querySelectorAll('.suggestion-item');
    if (!suggestions || suggestions.length === 0) return;
    
    const currentHighlight = this.searchSuggestions.querySelector('.suggestion-item.highlighted');
    let currentIndex = currentHighlight ? Array.from(suggestions).indexOf(currentHighlight) : -1;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = (currentIndex + 1) % suggestions.length;
        this.highlightSuggestion(currentIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        currentIndex = currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1;
        this.highlightSuggestion(currentIndex);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (currentHighlight) {
          this.handleSuggestionClick(currentHighlight);
        }
        break;
        
      case 'Escape':
        this.hideSearchSuggestions();
        break;
    }
  }

  highlightSuggestion(index) {
    const suggestions = this.searchSuggestions?.querySelectorAll('.suggestion-item');
    if (!suggestions) return;
    
    // Remover highlight anterior
    suggestions.forEach(s => s.classList.remove('highlighted'));
    
    // Agregar nuevo highlight
    if (suggestions[index]) {
      suggestions[index].classList.add('highlighted');
      suggestions[index].scrollIntoView({ block: 'nearest' });
    }
  }

  createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(168, 237, 234, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  showSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.remove('d-none');
    }
  }

  hideSearchSuggestions() {
    if (this.searchSuggestions) {
      this.searchSuggestions.classList.add('d-none');
    }
  }

  showLoadingIndicator(show) {
    const loadingIndicators = document.querySelectorAll('.search-loading');
    loadingIndicators.forEach(indicator => {
      indicator.classList.toggle('d-none', !show);
    });
  }

  clearSearchResults() {
    // Limpiar resultados de búsqueda en el DOM
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.parentElement.style.display = '';
    });
    
    // Remover mensaje de "no resultados"
    const noResultsMsg = document.getElementById('no-results-message');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  async loadSearchData() {
    // Datos de búsqueda predefinidos para SeCoToGpt
    this.searchData = [
      {
        title: 'Sistemas Operativos',
        description: 'Información general sobre sistemas operativos, tipos y características',
        tags: 'SO, operating system, windows, linux, mac',
        type: 'section'
      },
      {
        title: 'Gestión de Procesos',
        description: 'Administración y control de procesos en sistemas operativos',
        tags: 'procesos, threads, multitasking, scheduling',
        type: 'content'
      },
      {
        title: 'Gestión de Memoria',
        description: 'Manejo de memoria RAM, virtual y técnicas de optimización',
        tags: 'memoria, RAM, virtual, paginación, segmentación',
        type: 'content'
      },
      {
        title: 'Gestión de Almacenamiento',
        description: 'Sistemas de archivos, discos duros y almacenamiento',
        tags: 'almacenamiento, filesystem, HDD, SSD, particiones',
        type: 'content'
      },
      {
        title: 'Historia de los SO',
        description: 'Evolución histórica de los sistemas operativos',
        tags: 'historia, evolución, cronología, desarrollo',
        type: 'section'
      }
    ];
  }

  setupARIAAttributes() {
    // Configurar atributos ARIA para accesibilidad
    if (this.mainSearchInput) {
      this.mainSearchInput.setAttribute('role', 'searchbox');
      this.mainSearchInput.setAttribute('aria-autocomplete', 'list');
    }
    
    if (this.searchSuggestions) {
      this.searchSuggestions.setAttribute('role', 'listbox');
    }
    
    if (this.mobileMenu) {
      this.mobileMenu.setAttribute('role', 'navigation');
    }
  }

  initializeScreenReaderAnnouncements() {
    // Crear región de anuncios para lectores de pantalla
    if (!document.getElementById('sr-announcements')) {
      const announceRegion = document.createElement('div');
      announceRegion.id = 'sr-announcements';
      announceRegion.setAttribute('aria-live', 'polite');
      announceRegion.setAttribute('aria-atomic', 'true');
      announceRegion.className = 'visually-hidden';
      document.body.appendChild(announceRegion);
    }
  }

  announceToScreenReader(message) {
    const announceRegion = document.getElementById('sr-announcements');
    if (announceRegion) {
      announceRegion.textContent = message;
      setTimeout(() => {
        announceRegion.textContent = '';
      }, 1000);
    }
  }

  // Método público para filtrar contenido
  filterContent(searchTerm) {
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent?.toLowerCase() || '';
      const text = card.querySelector('.card-text')?.textContent?.toLowerCase() || '';
      const content = title + ' ' + text;
      
      const isVisible = !searchTerm || content.includes(searchTerm.toLowerCase());
      card.parentElement.style.display = isVisible ? '' : 'none';
      
      if (isVisible) visibleCount++;
      
      // Efectos de animación
      if (isVisible) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
      }
    });
    
    this.updateNoResultsMessage(searchTerm, visibleCount);
  }

  updateNoResultsMessage(searchTerm, visibleCount) {
    const existingMsg = document.getElementById('no-results-message');
    if (existingMsg) existingMsg.remove();
    
    if (searchTerm && visibleCount === 0) {
      const noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'col-12 text-center py-5';
      noResultsMsg.innerHTML = `
        <div class="alert alert-info">
          <i class="bi bi-search mb-3" style="font-size: 3rem; opacity: 0.5;"></i>
          <h4>No se encontraron resultados</h4>
          <p>No hay contenido que coincida con "<strong>${searchTerm}</strong>"</p>
          <small class="text-muted">Intenta con términos diferentes o más generales</small>
        </div>
      `;
      
      const container = document.querySelector('.row');
      if (container) container.appendChild(noResultsMsg);
    }
  }
}

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
