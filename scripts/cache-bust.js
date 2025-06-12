#!/usr/bin/env node

/**
 * Script de Cache Busting Automático
 * Actualiza automáticamente las versiones de archivos CSS/JS en HTML
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class CacheBustBuilder {
  constructor() {
    this.version = this.generateVersion();
    this.files = [];
    console.log(`🔧 Iniciando Cache Busting - Versión: ${this.version}`);
  }

  generateVersion() {
    const timestamp = Date.now();
    const buildId = Math.random().toString(36).substring(2, 8);
    return `${timestamp}.${buildId}`;
  }

  async run() {
    try {
      // Buscar todos los archivos HTML
      await this.findHtmlFiles('./');
      
      // Procesar cada archivo HTML
      for (const file of this.files) {
        await this.processHtmlFile(file);
      }
      
      // Actualizar archivo de versión
      await this.updateVersionFile();
      
      console.log(`✅ Cache Busting completado para ${this.files.length} archivos`);
      console.log(`📦 Versión generada: ${this.version}`);
      
    } catch (error) {
      console.error('❌ Error en Cache Busting:', error);
      process.exit(1);
    }
  }

  async findHtmlFiles(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Saltar directorios que no necesitamos
        if (!['node_modules', '.git', '.vercel', 'dist', 'build'].includes(item)) {
          await this.findHtmlFiles(fullPath);
        }
      } else if (item.endsWith('.html')) {
        this.files.push(fullPath);
      }
    }
  }

  async processHtmlFile(filePath) {
    console.log(`🔄 Procesando: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Actualizar enlaces CSS locales
    content = content.replace(
      /<link[^>]+href="([^"]*\.css)(?:\?v=[^"]*)?"/g,
      (match, href) => {
        if (!href.includes('cdn.') && !href.includes('http')) {
          modified = true;
          return match.replace(href, `${href}?v=${this.version}`);
        }
        return match;
      }
    );
    
    // Actualizar scripts JS locales
    content = content.replace(
      /<script[^>]+src="([^"]*\.js)(?:\?v=[^"]*)?"/g,
      (match, src) => {
        if (!src.includes('cdn.') && !src.includes('http') && !src.includes('bootstrap')) {
          modified = true;
          return match.replace(src, `${src}?v=${this.version}`);
        }
        return match;
      }
    );
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Actualizado: ${filePath}`);
    }
  }

  async updateVersionFile() {
    const versionInfo = {
      version: this.version,
      buildTime: new Date().toISOString(),
      files: this.files.length
    };
    
    // Crear directorio scripts si no existe
    if (!fs.existsSync('./scripts')) {
      fs.mkdirSync('./scripts');
    }
    
    fs.writeFileSync(
      './scripts/version.json',
      JSON.stringify(versionInfo, null, 2),
      'utf8'
    );
    
    console.log(`📝 Archivo de versión actualizado: ./scripts/version.json`);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const builder = new CacheBustBuilder();
  builder.run();
}

module.exports = CacheBustBuilder;
