/**
 * JavaScript mejorado para animar la página Gestión de Procesos
 * Funcionalidades:
 * - IntersectionObserver para animaciones al hacer scroll
 * - Animación typing para párrafos introductorios
 * - Animaciones escalonadas para tablas y listas
 * - Scroll suave para anclas internas
 */

document.addEventListener('DOMContentLoaded', () => {

  // Animación typing para elementos con clase .typing-animate
  function typingAnimation(element, speed = 50) {
    const text = element.textContent;
    element.textContent = '';
    let index = 0;

    const interval = setInterval(() => {
      element.textContent += text.charAt(index);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);
  }

  // Inicializar typing en párrafos intro si existen
  const typingElements = document.querySelectorAll('.typing-animate');
  typingElements.forEach(el => typingAnimation(el, 40));

  // IntersectionObserver para revelar elementos al hacer scroll con delay
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Para tablas, revelar filas con delay escalonado
        if(el.tagName.toLowerCase() === 'table') {
          const rows = el.querySelectorAll('tbody tr');
          rows.forEach((row, i) => {
            setTimeout(() => {
              row.classList.add('visible');
            }, i * 150);
          });
        } 
        // Para listas, revelar items con delay escalonado
        else if(el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
          const items = el.querySelectorAll('li');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, i * 120);
          });
        }
        // Para otros elementos: añadir visible directo
        else {
          el.classList.add('visible');
        }

        // Cuando ya se reveló, dejar de observar
        observer.unobserve(el);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  // Seleccionar todos los elementos a observar (listas, tablas, párrafos, headings)
  const elementsToReveal = [
    ...document.querySelectorAll('section, h2, h3, p, ul, ol, table')
  ];
  elementsToReveal.forEach(el => {
    // Añadir clase inicial de oculto para animación
    if(el.tagName.toLowerCase() === 'table' || el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol'){
      // Añadimos clases 'fade-in' a hijo o a el mismo
      if(el.tagName.toLowerCase() === 'table') {
        el.querySelectorAll('tbody tr').forEach(row =>{
          row.classList.add('fade-in');
        });
      } else {
        el.querySelectorAll('li').forEach(li => li.classList.add('fade-in'));
      }
    } else {
      el.classList.add('fade-in');
    }
    observer.observe(el);
  });

  // Smooth scroll para links internos (anclas)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if(target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

