import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDfE6WOYdJvlewVXEqQT9_UxHMBhew4qio",
  authDomain: "warshop-82b78.firebaseapp.com",
  projectId: "warshop-82b78",
  storageBucket: "warshop-82b78.firebasestorage.app",
  messagingSenderId: "1058243105483",
  appId: "1:1058243105483:web:5bece1b852688bad1e814e",
  measurementId: "G-C3J1GP8GSS"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
