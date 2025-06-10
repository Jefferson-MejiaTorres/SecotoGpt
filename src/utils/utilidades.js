/* Utilidades JS reutilizables para el proyecto SeCoToGpt */
// Aquí puedes agregar funciones que se usen en varias páginas o componentes

// Ejemplo: función para filtrar tarjetas por búsqueda
export function filtrarTarjetasPorTexto(texto, selectorTarjetas) {
  const tarjetas = document.querySelectorAll(selectorTarjetas);
  tarjetas.forEach(tarjeta => {
    const contenido = tarjeta.textContent.toLowerCase();
    tarjeta.style.display = contenido.includes(texto.toLowerCase()) ? '' : 'none';
  });
}
