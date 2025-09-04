import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';

const FirebaseSimpleTest = () => {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    testFirebaseImport();
  }, []);

  const testFirebaseImport = async () => {
    try {
      console.log('🔍 Verificando importación de Firebase...');
      
      // Test 1: Verificar que el módulo firebase/app se puede importar
      const { getApps } = await import('firebase/app');
      console.log('✅ firebase/app importado correctamente');
      
      // Test 2: Verificar que el módulo firebase/firestore se puede importar
      const { getFirestore } = await import('firebase/firestore');
      console.log('✅ firebase/firestore importado correctamente');
      
      // Test 3: Verificar que nuestra configuración se puede importar
      const configModule = await import('../firebase/config');
      console.log('✅ config.js importado correctamente');
      
      if (configModule.db) {
        console.log('✅ Database instance disponible');
        setStatus('success');
      } else {
        console.error('❌ Database instance no disponible');
        setStatus('error');
        setError('Database instance no disponible');
      }
      
    } catch (error) {
      console.error('❌ Error en importación:', error);
      setStatus('error');
      setError(error.message);
    }
  };

  const testBasicConnection = async () => {
    setStatus('testing');
    
    try {
      // Importar dinámicamente para evitar errores de inicialización
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase/config');
      
      console.log('🔥 Intentando conexión básica...');
      
      const testDoc = {
        test: true,
        timestamp: new Date(),
        message: 'Prueba de conexión simple'
      };

      const docRef = await addDoc(collection(db, 'test'), testDoc);
      console.log('✅ Documento creado con ID:', docRef.id);
      
      setStatus('connected');
      
    } catch (error) {
      console.error('❌ Error en conexión:', error);
      setStatus('connection-error');
      setError(error.message);
    }
  };

  return (
    <Box sx={{ p: 3, border: '2px solid #1976d2', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        🧪 Prueba Simple de Firebase
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {status === 'loading' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            <Typography>Verificando importaciones...</Typography>
          </Box>
        )}
        
        {status === 'success' && (
          <Alert severity="success">
            ✅ Firebase importado correctamente. Listo para probar conexión.
          </Alert>
        )}
        
        {status === 'testing' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            <Typography>Probando conexión...</Typography>
          </Box>
        )}
        
        {status === 'connected' && (
          <Alert severity="success">
            🎉 ¡Conexión exitosa! Firebase está funcionando perfectamente.
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert severity="error">
            ❌ Error de importación: {error}
          </Alert>
        )}
        
        {status === 'connection-error' && (
          <Alert severity="error">
            🔌 Error de conexión: {error}
          </Alert>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          onClick={testFirebaseImport}
          size="small"
        >
          Verificar Importación
        </Button>
        
        <Button 
          variant="contained" 
          onClick={testBasicConnection}
          disabled={status !== 'success' && status !== 'connected'}
        >
          Probar Conexión
        </Button>
      </Box>
      
      <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
        Esta prueba verifica la carga e inicialización de Firebase paso a paso.
      </Typography>
    </Box>
  );
};

export default FirebaseSimpleTest;
