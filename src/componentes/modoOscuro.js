// Lógica para alternar modo oscuro/claro con toggle switch animado
function initializeModoOscuro() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) {
    // Si el toggle no existe aún, intentar de nuevo en 100ms
    setTimeout(initializeModoOscuro, 100);
    return;
  }

  const body = document.body;
  const html = document.documentElement;
  const header = document.querySelector('header');

  function toggleDarkMode() {
    const isDark = toggle.checked;
    
    // Aplicar clases de modo oscuro
    body.classList.toggle('dark', isDark);
    html.classList.toggle('dark', isDark);
    if (header) {
      header.classList.toggle('dark', isDark);
    }
    
    // Agregar animación suave de transición
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Guardar preferencia
    localStorage.setItem('secotogpt-dark', isDark);
    
    // Aplicar variables CSS para modo oscuro
    if (isDark) {
      document.documentElement.style.setProperty('--color-bg', '#22223b');
      document.documentElement.style.setProperty('--color-text', '#ffffff');
      document.documentElement.style.setProperty('--color-primary', '#a8edea');
    } else {
      document.documentElement.style.setProperty('--color-bg', '#ffffff');
      document.documentElement.style.setProperty('--color-text', '#000000');
      document.documentElement.style.setProperty('--color-primary', '#007bff');
    }
  }

  // Event listener para el toggle
  toggle.addEventListener('change', toggleDarkMode);

  // Mantener preferencia al recargar
  const savedTheme = localStorage.getItem('secotogpt-dark');
  if (savedTheme === 'true') {
    toggle.checked = true;
    toggleDarkMode();
  } else if (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Detectar preferencia del sistema si no hay preferencia guardada
    toggle.checked = true;
    toggleDarkMode();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Intentar inicializar inmediatamente
  initializeModoOscuro();
});
