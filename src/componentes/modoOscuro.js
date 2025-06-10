// Lógica para alternar modo oscuro/claro
const btn = document.getElementById('modoOscuroBtn');
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle('dark');
  localStorage.setItem('secotogpt-dark', body.classList.contains('dark'));
}

btn.addEventListener('click', toggleDarkMode);

// Mantener preferencia al recargar
if (localStorage.getItem('secotogpt-dark') === 'true') {
  body.classList.add('dark');
}
