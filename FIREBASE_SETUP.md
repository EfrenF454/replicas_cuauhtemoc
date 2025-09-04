# 🔥 Configuración de Firebase para Warshop

## ✅ **Paso 1: Configurar Firebase Console**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Tu proyecto ya está configurado: **warshop-82b78**

## ✅ **Paso 2: Configurar Firestore Database**

1. En Firebase Console, ve a **"Firestore Database"**
2. Si no está creado, haz clic en **"Create database"**
3. Selecciona **"Start in test mode"**
4. Elige ubicación: **us-central1** (o tu región preferida)

## ✅ **Paso 3: Configurar Reglas de Firestore**

1. En **Firestore Database**, ve a la pestaña **"Rules"**
2. Reemplaza las reglas existentes con este contenido:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Permitir lectura y escritura en la colección 'products'
    match /products/{productId} {
      allow read, write: if true; // Solo para desarrollo
    }
    
    // Permitir lectura y escritura en la colección 'test' (para pruebas)
    match /test/{testId} {
      allow read, write: if true; // Solo para desarrollo
    }
    
    // Denegar acceso a todas las demás colecciones
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Haz clic en **"Publish"**

## ✅ **Paso 4: Probar la Conexión**

1. Ve a `http://localhost:3000/admin`
2. Verás un panel de prueba de Firebase en la parte superior
3. Haz clic en **"Probar Conexión"**
4. Si todo está bien, verás ✅ "¡Conexión exitosa!"

## 🚀 **Funcionalidades Disponibles**

### **Administrador de Productos**
- ✅ **CRUD completo** con Firebase Firestore
- ✅ **Importar desde JSON** (migra tu `products.json` actual)
- ✅ **Exportar a JSON** (backup de productos)
- ✅ **Tiempo real** - Los cambios se sincronizan automáticamente

### **Estructura de Datos**
```javascript
// Estructura de un producto en Firestore
{
  id: 1,                    // ID secuencial
  name: "Producto",         // Nombre del producto
  price: 1000,             // Precio actual
  originalPrice: 1200,     // Precio original (opcional)
  image: "/images/...",    // URL de la imagen
  category: "Categoría",   // Categoría del producto
  rating: 4.5,             // Calificación (0-5)
  reviews: 25,             // Número de reseñas
  inStock: true,           // Si está en stock
  isNew: false,            // Si es producto nuevo
  discount: 15,            // % de descuento
  description: "...",      // Descripción
  createdAt: Date,         // Fecha de creación (automático)
  updatedAt: Date          // Fecha de actualización (automático)
}
```

## 🔧 **Configuración del Proyecto**

Tu configuración actual:
```javascript
// src/firebase/config.js
const firebaseConfig = {
  apiKey: "AIzaSyDfE6WOYdJvlewVXEqQT9_UxHMBhew4qio",
  authDomain: "warshop-82b78.firebaseapp.com",
  projectId: "warshop-82b78",
  storageBucket: "warshop-82b78.firebasestorage.app",
  messagingSenderId: "1058243105483",
  appId: "1:1058243105483:web:5bece1b852688bad1e814e"
};
```

## 📦 **Migración de Datos**

Para migrar tus productos actuales desde `products.json`:

1. Ve a `/admin`
2. Haz clic en **"Importar JSON"**
3. Los productos se importarán automáticamente a Firebase
4. ¡Listo! Ya tienes persistencia en la nube

## 🛡️ **Seguridad (Para Producción)**

**⚠️ IMPORTANTE**: Las reglas actuales permiten acceso completo para desarrollo.

Para producción, cambia las reglas a:
```javascript
match /products/{productId} {
  allow read: if true; // Lectura pública
  allow write: if request.auth != null; // Solo usuarios autenticados
}
```

## 🐛 **Solución de Problemas**

### Error de conexión
- Verifica que las reglas de Firestore estén publicadas
- Revisa la consola del navegador para errores específicos

### Error de permisos
- Asegúrate de que las reglas permitan acceso a las colecciones `products` y `test`

### Error de configuración
- Verifica que la configuración en `config.js` coincida con tu proyecto Firebase

## 📊 **Monitoreo**

En Firebase Console puedes:
- Ver los datos en **Firestore Database > Data**
- Monitorear uso en **Usage**
- Ver logs en **Functions** (si los implementas)

¡Tu aplicación ahora está conectada a Firebase! 🎉
