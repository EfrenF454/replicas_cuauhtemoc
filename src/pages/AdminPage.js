import React from 'react';
import { Container, Box, Button } from '@mui/material';
import ProductAdmin from '../components/ProductAdmin';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase/config';

import FirebaseSimpleTest from '../components/FirebaseSimpleTest';


const AdminPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={{ py: 4 }}>
          {/* <FirebaseSimpleTest /> */}
          <ProductAdmin />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
