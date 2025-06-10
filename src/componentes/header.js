// Componente para el header y lógica de búsqueda
// Modularizado para reutilización
document.addEventListener('DOMContentLoaded', function() {
  
  // Funcionalidad de búsqueda
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const text = card.querySelector('.card-text').textContent.toLowerCase();
        
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
          document.querySelector('.row.g-4').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
      } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    });
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
      }
    });
  });

  // Actualizar navegación activa en scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
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
});
