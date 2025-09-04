# 🛠️ Solución de Problemas Firebase

## ❌ Error: "Error de conexión. Verifica la configuración de Firebase y las reglas de Firestore"

### 🔍 **Diagnóstico Paso a Paso**

1. **Ve a `/admin` y haz clic en "Verificar Config"**
   - Abre la consola del navegador (F12)
   - Ve a la pestaña "Console"
   - Busca mensajes de verificación

2. **Haz clic en "Probar Conexión"**
   - Observa los errores específicos en la consola

---

## 🎯 **Soluciones Comunes**

### **Problema 1: Firestore Database no creado**

**Síntomas:**
- Error code: `failed-precondition`
- Mensaje: "The Cloud Firestore API is not available"

**Solución:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `warshop-82b78`
3. En el menú lateral, haz clic en **"Firestore Database"**
4. Si ves "Get started", haz clic ahí
5. Selecciona **"Start in test mode"**
6. Elige ubicación: **us-central1** (recomendado)
7. Haz clic en **"Done"**

### **Problema 2: Reglas de Firestore restrictivas**

**Síntomas:**
- Error code: `permission-denied`
- Mensaje: "Missing or insufficient permissions"

**Solución:**
1. En **Firestore Database**, ve a la pestaña **"Rules"**
2. Reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso completo para desarrollo
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en **"Publish"**

### **Problema 3: Configuración incorrecta**

**Síntomas:**
- Error code: `invalid-argument`
- Mensaje sobre API key o project ID

**Solución:**
1. Ve a **Project Settings** (ícono de engranaje) → **General**
2. Baja hasta **"Your apps"**
3. Haz clic en tu app web
4. Copia la configuración completa
5. Reemplaza en `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "warshop-82b78.firebaseapp.com",
  projectId: "warshop-82b78",
  storageBucket: "warshop-82b78.firebasestorage.app",
  messagingSenderId: "1058243105483",
  appId: "1:1058243105483:web:5bece1b852688bad1e814e"
};
```

### **Problema 4: Error de red**

**Síntomas:**
- Error code: `unavailable`
- Mensajes sobre conexión de red

**Solución:**
1. Verifica tu conexión a internet
2. Desactiva VPN o proxy temporalmente
3. Verifica que tu firewall no bloque Firebase
4. Prueba en una red diferente

---

## 🧪 **Pruebas de Verificación**

### **Orden de pruebas recomendado:**

1. **Verificar Config** - Verifica que Firebase esté inicializado
2. **Probar Conexión** - Intenta escribir un documento de prueba
3. **Verificar Productos** - Verifica acceso a la colección products

### **Códigos de error más comunes:**

| Código | Significado | Solución |
|--------|-------------|----------|
| `failed-precondition` | Firestore no está habilitado | Crear database en Firebase Console |
| `permission-denied` | Reglas restrictivas | Actualizar reglas de Firestore |
| `invalid-argument` | Configuración incorrecta | Verificar credenciales |
| `unavailable` | Problemas de red | Verificar conexión |

---

## 🎯 **Verificación Final**

Después de aplicar las soluciones:

1. Refresca la página `/admin`
2. Haz clic en **"Probar Conexión"**
3. Deberías ver: ✅ "¡Conexión exitosa!"
4. Haz clic en **"Importar JSON"** para migrar tus productos

---

## 📞 **¿Necesitas ayuda adicional?**

Si sigues teniendo problemas:

1. **Copia el error completo** de la consola del navegador
2. **Verifica** que hayas seguido todos los pasos
3. **Intenta** crear el proyecto desde cero en Firebase Console

### **Comandos útiles para diagnóstico:**

```javascript
// En la consola del navegador:
import { getApps } from 'firebase/app';
console.log('Apps:', getApps());
```

---

## ✅ **Checklist de Configuración**

- [ ] Proyecto creado en Firebase Console
- [ ] Firestore Database habilitado
- [ ] Reglas de Firestore configuradas
- [ ] Configuración copiada a config.js
- [ ] Sin errores en la consola del navegador
- [ ] Prueba de conexión exitosa
