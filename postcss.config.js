module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Configuración para solucionar problemas de compatibilidad
      overrideBrowserslist: [
        'Chrome >= 54',
        'Firefox >= 50', 
        'Safari >= 15.4',
        'Edge >= 79',
        'Samsung >= 6.0',
        'iOS >= 15.4'
      ],
      // Agregar propiedades estándar junto con prefijos
      add: true,
      // Remover prefijos obsoletos para limpiar el CSS
      remove: true,
      // Soportar flexbox
      flexbox: 'no-2009',
      // Soportar grid
      grid: 'autoplace',
      // Ignorar archivos de node_modules
      ignoreUnknownVersions: true
    }
  }
}
