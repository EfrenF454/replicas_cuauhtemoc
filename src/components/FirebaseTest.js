import React, { useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { checkFirebaseConfig } from '../firebase/checkConfig';

const FirebaseTest = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setStatus('');

    try {
      console.log('🔥 Probando conexión a Firebase...');
      console.log('📋 Configuración:', {
        projectId: 'warshop-82b78',
        authDomain: 'warshop-82b78.firebaseapp.com'
      });
      
      // Test 1: Verificar inicialización básica
      console.log('🔍 Verificando inicialización de Firebase...');
      
      // Test 2: Escribir un documento de prueba
      console.log('📝 Intentando escribir documento de prueba...');
      const testDoc = {
        test: true,
        message: 'Conexión exitosa',
        timestamp: new Date(),
        from: 'warshop-admin',
        userAgent: navigator.userAgent
      };

      const docRef = await addDoc(collection(db, 'test'), testDoc);
      console.log('✅ Documento escrito con ID:', docRef.id);

      // Test 3: Leer documentos de prueba
      console.log('📖 Intentando leer documentos...');
      const querySnapshot = await getDocs(collection(db, 'test'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      console.log('✅ Documentos leídos:', docs.length);
      setStatus('success');
      
    } catch (error) {
      console.error('❌ Error completo de Firebase:', {
        message: error.message,
        code: error.code,
        details: error.details,
        stack: error.stack
      });
      
      // Determinar tipo específico de error
      if (error.code === 'permission-denied') {
        setStatus('permission-error');
      } else if (error.code === 'unavailable') {
        setStatus('network-error');
      } else if (error.code === 'invalid-argument') {
        setStatus('config-error');
      } else {
        setStatus('error');
      }
    } finally {
      setLoading(false);
    }
  };

  const testProductsCollection = async () => {
    setLoading(true);
    setStatus('');

    try {
      // Verificar si existe la colección products
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      console.log('📦 Productos encontrados:', products.length);
      setStatus('products-success');
    } catch (error) {
      console.error('❌ Error accediendo a productos:', error);
      setStatus('products-error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px dashed #ccc', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        🔥 Prueba de Conexión Firebase
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          onClick={() => {
            const result = checkFirebaseConfig();
            console.log('Resultado de verificación:', result);
          }}
          size="small"
        >
          Verificar Config
        </Button>
        
        <Button 
          variant="contained" 
          onClick={testFirebaseConnection}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Probar Conexión'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testProductsCollection}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Verificar Productos'}
        </Button>
      </Box>

      {status === 'success' && (
        <Alert severity="success">
          ✅ ¡Conexión exitosa! Firebase está funcionando correctamente.
        </Alert>
      )}

      {status === 'error' && (
        <Alert severity="error">
          ❌ Error de conexión. Verifica la configuración de Firebase y las reglas de Firestore.
        </Alert>
      )}

      {status === 'products-success' && (
        <Alert severity="info">
          📦 Conexión a productos exitosa. La colección está lista.
        </Alert>
      )}

      {status === 'products-error' && (
        <Alert severity="warning">
          ⚠️ No se pudo acceder a la colección products. Verifica las reglas de Firestore.
        </Alert>
      )}

      {status === 'permission-error' && (
        <Alert severity="error">
          🚫 <strong>Error de permisos:</strong> Las reglas de Firestore no permiten acceso. 
          <br />Necesitas configurar las reglas en Firebase Console.
        </Alert>
      )}

      {status === 'network-error' && (
        <Alert severity="error">
          🌐 <strong>Error de red:</strong> No se puede conectar a Firebase. 
          <br />Verifica tu conexión a internet.
        </Alert>
      )}

      {status === 'config-error' && (
        <Alert severity="error">
          ⚙️ <strong>Error de configuración:</strong> Hay un problema con la configuración de Firebase. 
          <br />Verifica las credenciales en config.js
        </Alert>
      )}
    </Box>
  );
};

export default FirebaseTest;
