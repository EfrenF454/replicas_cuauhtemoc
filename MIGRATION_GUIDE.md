# 🚀 Guía de Migración: Create React App → Next.js 15 + Tailwind CSS

## ✅ Cambios Completados

### 1. Estructura del Proyecto
- ✅ Migrado de Create React App a Next.js 15 (App Router)
- ✅ Convertido de Material-UI a Tailwind CSS
- ✅ Actualizado a React 19 y TypeScript
- ✅ Configurado con optimizaciones móviles y desktop

### 2. Configuración
- ✅ **Tailwind CSS**: Configuración completa con paleta militar preservada
- ✅ **Next.js**: Configurado para export estático (Firebase Hosting)
- ✅ **Firebase**: Adaptado para Next.js con App Router
- ✅ **TypeScript**: Tipado completo en servicios y componentes

### 3. Componentes Migrados
- ✅ **Navbar**: Drawer animado con Framer Motion
- ✅ **Footer**: Layout responsive con gradientes militares
- ✅ **HeroSection**: Slider con react-slick optimizado
- ✅ **ProductCatalog**: Filtros, búsqueda, paginación
- ✅ **ProductDialog**: Modal con detalles de producto
- ✅ **ContactForm**: Formulario con validación
- ✅ **FloatingActionButton**: Botón de WhatsApp flotante

### 4. Páginas Creadas
- ✅ `/` - Home (Hero + Features + CTA)
- ✅ `/catalogo` - Catálogo de productos
- ✅ `/contacto` - Formulario de contacto

## 📦 Instalación

### Paso 1: Backup del Proyecto Actual
```bash
# Crear backup del proyecto actual
cp -r /home/avsolem/sites/replicas_cuauhtemoc /home/avsolem/sites/replicas_cuauhtemoc_backup
```

### Paso 2: Reemplazar package.json
```bash
mv package.json package.json.old
mv package.json.next package.json
```

### Paso 3: Instalar Dependencias
```bash
npm install
```

### Paso 4: Copiar Assets
Los archivos en `public/` deben mantenerse en su ubicación actual (Next.js usa la misma carpeta `public/`).

## 🎨 Paleta de Colores Preservada

La configuración de Tailwind CSS mantiene exactamente la misma paleta militar:

```javascript
// Colores principales (equivalentes al theme.js original)
primary: '#2C3E2D'      // Verde militar oscuro
primary-light: '#506C2C' // Verde militar
primary-dark: '#1B2A1C'  // Verde muy oscuro

secondary: '#AFBD77'     // Verde militar claro
secondary-light: '#C8D591'
secondary-dark: '#8FA055'

accent-gold: '#D4AF37'   // Dorado militar
accent-bronze: '#CD7F32'
accent-beige: '#D2B48C'
```

## 🔥 Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Inicia servidor en http://localhost:3000

# Producción
npm run build        # Genera build estático en /out
npm run start        # Preview del build

# Linting
npm run lint         # Verifica código
```

## 🚢 Deploy a Firebase Hosting

### 1. Generar Build
```bash
npm run build
```

### 2. Actualizar firebase.json
El archivo `firebase.json` ya está configurado para Next.js:

```json
{
  "hosting": {
    "public": "out",  // Cambiado de "build" a "out"
    "ignore": [...],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 3. Deploy
```bash
firebase deploy --only hosting
```

## 🎯 Optimizaciones Implementadas

### Mobile
- ✅ Menu hamburguesa con animaciones fluidas
- ✅ Imágenes optimizadas con `next/image`
- ✅ Grid responsive en catálogo (2 columnas mobile, 4 desktop)
- ✅ Touch gestures optimizados
- ✅ Font sizes responsive

### Desktop
- ✅ Hover effects con transform GPU-accelerated
- ✅ Lazy loading de componentes pesados
- ✅ Debounce en búsqueda de productos
- ✅ Paginación optimizada
- ✅ Code splitting automático (Next.js)

### Performance
- ✅ React 19 con Server Components
- ✅ Suspense boundaries
- ✅ Image optimization
- ✅ Font optimization (Google Fonts)
- ✅ CSS-in-JS → Tailwind (menor bundle size)

## 📝 Tareas Pendientes

### 1. Páginas Faltantes
- ⏳ `/guia` - Guía de pedidos
- ⏳ `/login` - Login page
- ⏳ `/admin` - Admin panel (ProductAdmin component)

### 2. Funcionalidad
- ⏳ API Route para formulario de contacto (`/app/api/contact/route.ts`)
- ⏳ Middleware de autenticación para rutas protegidas
- ⏳ ProductAdmin migrado con Firebase CRUD

### 3. Testing
- ⏳ Pruebas de responsive en diferentes dispositivos
- ⏳ Verificar funcionalidad de Firebase en producción
- ⏳ Test de velocidad (Lighthouse)

## 🔍 Diferencias Clave

### Antes (CRA + Material-UI)
```jsx
import { Button } from '@mui/material';

<Button variant="contained" sx={{ ... }}>
  Click me
</Button>
```

### Ahora (Next.js + Tailwind)
```jsx
'use client';  // Directiva de Next.js para componentes interactivos

<button className="btn-military">
  Click me
</button>
```

### Routing
```jsx
// Antes
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/catalogo');

// Ahora
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/catalogo');
```

### Images
```jsx
// Antes
<img src="/images/hero.jpg" alt="Hero" />

// Ahora
import Image from 'next/image';
<Image src="/images/hero.jpg" alt="Hero" fill className="object-cover" />
```

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error en build de Next.js
```bash
rm -rf .next
npm run build
```

### Imágenes no se ven
Verifica que estén en `public/` y que uses rutas absolutas (`/images/...`)

## 📞 Soporte

Si encuentras problemas durante la migración, revisa:
1. Logs de consola del navegador
2. Terminal donde corre `npm run dev`
3. Documentación de Next.js: https://nextjs.org/docs

---

**Última actualización**: 2025-01-04
**Versión**: Next.js 15.1.4 | React 19.0 | Tailwind CSS 3.4.17
