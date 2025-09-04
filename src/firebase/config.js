import { initializeApp, getApps, getApp, } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // 👈 importa storage
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfE6WOYdJvlewVXEqQT9_UxHMBhew4qio",
  authDomain: "warshop-82b78.firebaseapp.com",
  projectId: "warshop-82b78",
  storageBucket: "warshop-82b78.firebasestorage.app",
  //storageBucket: "warshop-82b78.appspot.com",
  messagingSenderId: "1058243105483",
  appId: "1:1058243105483:web:5bece1b852688bad1e814e",
  measurementId: "G-C3J1GP8GSS"
};


// Verificar si ya existe una app inicializada para evitar errores
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.log('✅ Firebase app inicializada:', app.name);
} catch (error) {
  console.error('❌ Error inicializando Firebase:', error);
  throw error;
}

// Inicializar Firestore con manejo de errores
let db;
try {
  db = getFirestore(app);
  console.log('✅ Firestore inicializado');
} catch (error) {
  console.error('❌ Error inicializando Firestore:', error);
  throw error;
}

// ✅ Inicializar Auth
let auth;
try {
  auth = getAuth(app);
  console.log('✅ Auth inicializado');
} catch (error) {
  console.error('❌ Error inicializando Auth:', error);
  throw error;
}

let storage;
try {
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app); // 👈 inicializa storage
  console.log('✅ Firestore y Auth inicializados');
} catch (error) {
  console.error('❌ Error inicializando servicios:', error);
  throw error;
}
export { db, auth, storage };
export default app;