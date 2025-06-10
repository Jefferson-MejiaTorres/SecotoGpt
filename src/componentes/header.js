// Componente para el header y lógica de búsqueda
// Modularizado para reutilización

function initializeHeader() {
  // Funcionalidad de búsqueda mejorada
  const searchInputs = document.querySelectorAll('input[type="search"]');
  
  if (searchInputs.length === 0) {
    // Si los campos de búsqueda no existen aún, intentar de nuevo
    setTimeout(initializeHeader, 100);
    return;
  }

  // Aplicar funcionalidad de búsqueda a todos los inputs
  searchInputs.forEach(searchInput => {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const text = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || text.includes(searchTerm)) {
          card.parentElement.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.parentElement.style.display = searchTerm === '' ? '' : 'none';
          card.style.opacity = searchTerm === '' ? '1' : '0.5';
          card.style.transform = searchTerm === '' ? 'scale(1)' : 'scale(0.95)';
        }
      });
      
      // Mostrar mensaje si no hay resultados
      const visibleCards = Array.from(cards).filter(card => 
        card.parentElement.style.display !== 'none'
      );
      
      let noResultsMsg = document.getElementById('no-results-message');
      if (visibleCards.length === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.id = 'no-results-message';
          noResultsMsg.className = 'col-12 text-center py-5';
          noResultsMsg.innerHTML = `
            <div class="text-muted">
              <i class="bi bi-search fs-1 d-block mb-3"></i>
              <h5>No se encontraron resultados</h5>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          `;
          const cardsContainer = document.querySelector('.row.g-4');
          if (cardsContainer) {
            cardsContainer.appendChild(noResultsMsg);
          }
        }
        noResultsMsg.style.display = 'block';
      } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    });

    // Efectos de focus en búsqueda
    searchInput.addEventListener('focus', function() {
      this.parentElement.classList.add('search-focused');
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.classList.remove('search-focused');
    });
  });
  // Funcionalidad del menú móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Actualizar atributos de accesibilidad
      this.setAttribute('aria-expanded', !isExpanded);
      this.setAttribute('aria-label', !isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      this.setAttribute('title', !isExpanded ? 'Cerrar menú' : 'Menú de navegación');
      
      mobileMenu.classList.toggle('show');
      
      // Cambiar icono del botón
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = mobileMenu.classList.contains('show') ? 'bi bi-x' : 'bi bi-list';
      }
      
      // Animación suave
      if (mobileMenu.classList.contains('show')) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        mobileMenu.setAttribute('aria-hidden', 'false');
      } else {
        mobileMenu.style.maxHeight = '0';
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Inicializar estado del menú móvil
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
  // Scroll suave para navegación
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Cerrar menú móvil después de navegar
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          mobileMenuBtn.click();
        }
      }
    });
  });

  // Header scroll effects
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Efecto de transparencia en scroll
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Auto-hide header en scroll hacia abajo (opcional)
    if (currentScroll > lastScrollTop && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    
    // Actualizar navegación activa en scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Efectos especiales para el logo SeCoToGpt
  const logoContainer = document.querySelector('.logo-container');
  const logoNombre = document.querySelector('.secotogpt-logo-nombre');
  
  if (logoContainer && logoNombre) {
    // Efecto de aparición letter por letter
    logoContainer.addEventListener('mouseenter', function() {
      const letters = logoNombre.querySelectorAll('span');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.transform = 'translateY(-2px) scale(1.05)';
          letter.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
        }, index * 100);
      });
    });
    
    logoContainer.addEventListener('mouseleave', function() {
      const letters = logoNombre.querySelectorAll('span');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.transform = 'translateY(0) scale(1)';
          letter.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))';
        }, index * 50);
      });
    });
    
    // Efecto de click en el logo
    logoContainer.addEventListener('click', function() {
      logoNombre.classList.add('logo-typing');
      setTimeout(() => {
        logoNombre.classList.remove('logo-typing');
      }, 2000);
    });
  }

  // Animaciones de entrada para las tarjetas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }, observerOptions);

  // Observar todas las tarjetas
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });

  // Búsqueda con sugerencias (funcionalidad básica)
  searchInputs.forEach(searchInput => {
    const suggestionsContainer = searchInput.parentElement.querySelector('.search-suggestions');
    
    if (suggestionsContainer) {
      const suggestions = ['Inicio', 'Historia', 'Contacto', 'Acerca de', 'Servicios'];
      
      searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        suggestionsContainer.innerHTML = '';
        
        if (value.length > 0) {
          const filtered = suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(value)
          );
          
          if (filtered.length > 0) {
            suggestionsContainer.classList.remove('d-none');
            filtered.forEach(suggestion => {
              const div = document.createElement('div');
              div.className = 'suggestion-item px-3 py-2';
              div.textContent = suggestion;
              div.addEventListener('click', () => {
                searchInput.value = suggestion;
                suggestionsContainer.classList.add('d-none');
              });
              suggestionsContainer.appendChild(div);
            });
          } else {
            suggestionsContainer.classList.add('d-none');
          }
        } else {
          suggestionsContainer.classList.add('d-none');
        }
      });
      
      // Cerrar sugerencias al hacer clic fuera
      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target)) {
          suggestionsContainer.classList.add('d-none');
        }
      });
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar clase de carga al header para activar animaciones
  const header = document.querySelector('header');
  if (header) {
    setTimeout(() => {
      header.classList.add('header-loaded');
    }, 100);
  }
  
  // Intentar inicializar inmediatamente
  initializeHeader();
});
