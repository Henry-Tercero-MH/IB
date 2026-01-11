# 📱 Guía de PWA - Impostor Bíblico

## ✨ Características PWA Implementadas

Tu aplicación **Impostor Bíblico** ahora es una Progressive Web App completa con las siguientes características:

### 🚀 Funcionalidades

1. **Instalable** - Los usuarios pueden instalar la app en sus dispositivos
2. **Funciona Offline** - Service Worker cachea todos los recursos necesarios
3. **Icono en Pantalla de Inicio** - Acceso rápido como app nativa
4. **Splash Screen** - Pantalla de carga profesional
5. **Standalone Mode** - Se abre sin barra de navegador
6. **Auto-actualización** - Se actualiza automáticamente cuando hay nuevas versiones

### 📦 Archivos Generados

- ✅ `manifest.webmanifest` - Configuración de la PWA
- ✅ `sw.js` - Service Worker para caché offline
- ✅ `pwa-64x64.png` - Favicon
- ✅ `pwa-192x192.png` - Icono Android
- ✅ `pwa-512x512.png` - Icono principal
- ✅ `maskable-icon-512x512.png` - Icono adaptativo Android
- ✅ `apple-touch-icon-180x180.png` - Icono iOS
- ✅ `favicon.ico` - Favicon navegadores

## 🔧 Comandos Disponibles

```bash
# Desarrollo (con PWA habilitada)
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Generar iconos PWA (si cambias el icono)
npm run generate-pwa-assets
```

## 📱 Cómo Instalar la App

### En Android (Chrome/Edge)

1. Abre la app en Chrome o Edge
2. Aparecerá un banner automático diciendo "Instalar App"
3. Toca "Instalar"
4. La app se agregará a tu pantalla de inicio

**Alternativa manual:**
- Toca el menú (⋮) → "Agregar a pantalla de inicio"

### En iOS (Safari)

1. Abre la app en Safari
2. Toca el botón de Compartir (cuadrado con flecha ↑)
3. Desplázate y toca "Agregar a pantalla de inicio"
4. Toca "Agregar"

**Nota:** La app incluye instrucciones automáticas para iOS

### En Desktop (Chrome/Edge)

1. Busca el icono de instalación (+) en la barra de direcciones
2. Click en "Instalar"
3. La app se agregará como aplicación de escritorio

## 🎨 Personalizar la PWA

### Cambiar Colores del Theme

Edita `vite.config.js`:

```javascript
theme_color: '#6b21a8',        // Color de la barra de estado
background_color: '#1e1b4b',   // Color de fondo del splash
```

### Cambiar Nombre de la App

Edita `vite.config.js`:

```javascript
name: 'Impostor Bíblico',      // Nombre completo
short_name: 'ImpostorB',       // Nombre corto (max 12 chars)
```

### Cambiar Icono

1. Reemplaza `public/icon.svg` con tu nuevo icono
2. Ejecuta: `npm run generate-pwa-assets`
3. Reconstruye: `npm run build`

## 🌐 Deployment

### Para que la PWA funcione correctamente en producción:

1. **HTTPS es OBLIGATORIO** - Los Service Workers solo funcionan con HTTPS
2. Subir la carpeta `dist/` completa a tu servidor
3. Verificar que todos los archivos sean accesibles

### Plataformas recomendadas:

- **Vercel** - Deploy automático (recomendado)
  ```bash
  npm install -g vercel
  vercel
  ```

- **Netlify** - Deploy con drag & drop
  - Arrastra la carpeta `dist/` a netlify.com/drop

- **GitHub Pages** - Gratis con tu repositorio
  ```bash
  npm run build
  # Subir carpeta dist/ a la rama gh-pages
  ```

## 🔍 Verificar PWA

### Chrome DevTools

1. F12 → Tab "Application"
2. Verificar:
   - ✅ Manifest presente
   - ✅ Service Worker activo
   - ✅ Cache Storage con archivos
   - ✅ Installability: "installable"

### Lighthouse Audit

1. F12 → Tab "Lighthouse"
2. Seleccionar "Progressive Web App"
3. Click "Generate report"
4. Verificar score 100% 🎯

## 📊 Estadísticas de Caché

La PWA cachea automáticamente:
- ✅ HTML, CSS, JavaScript
- ✅ Iconos e imágenes
- ✅ Fuentes web
- ✅ Archivos estáticos

**Tamaño total de caché:** ~333 KB (muy ligero)

## 🐛 Troubleshooting

### La app no se instala
- Verifica que estés en HTTPS (no http://)
- Limpia caché del navegador
- Prueba en modo incógnito

### El Service Worker no se actualiza
- Cierra todas las pestañas de la app
- Abre de nuevo
- O desregistra el SW en DevTools

### Cambios no se reflejan
```bash
# Limpiar y reconstruir
rm -rf dist
npm run build
```

## 📈 Métricas de Rendimiento

- **Primera carga:** < 2s
- **Cargas subsecuentes:** < 0.5s (desde caché)
- **Funciona offline:** ✅ 100%
- **Tamaño instalación:** ~333 KB

## 🎉 Características Implementadas

- [x] Manifest.json configurado
- [x] Service Worker con Workbox
- [x] Iconos para todos los dispositivos
- [x] Meta tags optimizados
- [x] Prompt de instalación inteligente
- [x] Soporte iOS completo
- [x] Auto-actualización
- [x] Caché offline
- [x] Modo standalone

## 🚀 Próximos Pasos

Para mejorar aún más la PWA:

1. **Push Notifications** - Notificar nuevas partidas
2. **Background Sync** - Sincronizar datos offline
3. **Compartir API** - Compartir resultados
4. **Shortcuts** - Accesos rápidos en icono

---

**Desarrollado con ❤️ usando Vite + React + vite-plugin-pwa**
