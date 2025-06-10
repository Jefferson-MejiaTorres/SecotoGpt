// Lógica para alternar modo oscuro/claro
function initializeModoOscuro() {
  const btn = document.getElementById('modoOscuroBtn');
  if (!btn) {
    // Si el botón no existe aún, intentar de nuevo en 100ms
    setTimeout(initializeModoOscuro, 100);
    return;
  }

  const body = document.body;
  const html = document.documentElement;
  const icon = btn.querySelector('span');

  function toggleDarkMode() {
    body.classList.toggle('dark');
    html.classList.toggle('dark');
    
    // Cambiar el icono
    if (body.classList.contains('dark')) {
      icon.className = 'bi bi-sun';
      btn.title = 'Modo claro';
    } else {
      icon.className = 'bi bi-moon';
      btn.title = 'Modo oscuro';
    }
    
    // Guardar preferencia
    localStorage.setItem('secotogpt-dark', body.classList.contains('dark'));
    
    // Agregar animación al botón
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }

  // Remover listener existente si ya existe
  btn.removeEventListener('click', toggleDarkMode);
  btn.addEventListener('click', toggleDarkMode);

  // Mantener preferencia al recargar
  if (localStorage.getItem('secotogpt-dark') === 'true') {
    body.classList.add('dark');
    html.classList.add('dark');
    icon.className = 'bi bi-sun';
    btn.title = 'Modo claro';
  }

  // Detectar preferencia del sistema
  if (!localStorage.getItem('secotogpt-dark') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark');
    html.classList.add('dark');
    icon.className = 'bi bi-sun';
    btn.title = 'Modo claro';
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Intentar inicializar inmediatamente
  initializeModoOscuro();
});
