// Verificador de configuración de Firebase
import { getApps } from 'firebase/app';

export const checkFirebaseConfig = () => {
  const apps = getApps();
  
  console.log('🔍 Verificando configuración de Firebase...');
  console.log('📱 Apps inicializadas:', apps.length);
  
  if (apps.length === 0) {
    console.error('❌ No hay apps de Firebase inicializadas');
    return {
      isValid: false,
      error: 'No Firebase apps initialized'
    };
  }
  
  const app = apps[0];
  console.log('📋 Configuración de la app:', {
    name: app.name,
    projectId: app.options.projectId,
    authDomain: app.options.authDomain,
    storageBucket: app.options.storageBucket
  });
  
  // Verificar campos requeridos
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => !app.options[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Campos faltantes en la configuración:', missingFields);
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  console.log('✅ Configuración de Firebase válida');
  return {
    isValid: true,
    app: app,
    config: app.options
  };
};
