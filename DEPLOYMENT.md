# 🚀 Guía de Deployment

Este proyecto puede deployarse tanto en **Vercel** como en **Firebase Hosting**.

---

## 📦 Vercel (Recomendado para Next.js)

### Configuración Actual
El proyecto está configurado para Vercel por defecto.

### Deploy Automático
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. Configuración automática:
   - Framework: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next` (automático)
   - Install Command: `yarn install`

### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de Entorno en Vercel
Agregar en el dashboard de Vercel:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDfE6WOYdJvlewVXEqQT9_UxHMBhew4qio
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=warshop-82b78.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=warshop-82b78
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=warshop-82b78.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1058243105483
NEXT_PUBLIC_FIREBASE_APP_ID=1:1058243105483:web:5bece1b852688bad1e814e
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-C3J1GP8GSS
```

---

## 🔥 Firebase Hosting

### Preparación para Firebase
1. **Cambiar la configuración de Next.js:**
   ```bash
   # Renombrar archivos
   mv next.config.ts next.config.vercel.ts
   mv next.config.firebase.ts next.config.ts
   ```

2. **Rebuilding:**
   ```bash
   yarn build
   # Esto generará el directorio /out
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

### Configuración Firebase
El archivo `firebase.json` ya está configurado:
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

### Volver a Vercel
```bash
# Restaurar configuración
mv next.config.ts next.config.firebase.ts
mv next.config.vercel.ts next.config.ts
```

---

## 🔄 Diferencias Clave

| Característica | Vercel | Firebase Hosting |
|---------------|--------|------------------|
| **Next.js SSR** | ✅ Completo | ❌ Solo estático |
| **API Routes** | ✅ Soportado | ❌ No soportado |
| **Image Optimization** | ✅ Automático | ❌ Requiere unoptimized |
| **Output Directory** | `.next` | `out` |
| **Build Command** | `next build` | `next build` (con export) |
| **Velocidad** | Muy rápida | Rápida |
| **Costo** | Gratis (hobby) | Gratis (Spark) |

---

## ⚡ Recomendación

### Usar **Vercel** si:
- ✅ Quieres aprovechar SSR de Next.js
- ✅ Necesitas API Routes
- ✅ Quieres optimización automática de imágenes
- ✅ Deploy automático desde GitHub

### Usar **Firebase Hosting** si:
- ✅ Ya tienes todo en Firebase
- ✅ Solo necesitas sitio estático
- ✅ Prefieres la integración con otros servicios de Firebase

---

## 🛠️ Scripts Útiles

```bash
# Vercel
yarn build              # Build para Vercel
yarn start              # Preview local

# Firebase
yarn build              # Con next.config.firebase.ts
firebase serve          # Preview local
firebase deploy         # Deploy a producción
```

---

## 🐛 Troubleshooting

### Error: "No Output Directory named 'build'"
➡️ **Solución**: Estás usando `output: 'export'` en Vercel. Usa la configuración sin export.

### Error: "Image optimization error"
➡️ **Solución**: En Firebase usa `unoptimized: true`, en Vercel quítalo.

### Error: "API Routes not working"
➡️ **Solución**: Firebase no soporta API routes. Usa Vercel o Firebase Functions.

---

## 📝 Notas

- El proyecto actualmente usa `next.config.ts` para Vercel
- Para Firebase, usa `next.config.firebase.ts`
- Las credenciales de Firebase están en el código (considera usar variables de entorno en producción)
