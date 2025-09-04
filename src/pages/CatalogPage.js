import React from 'react';
import { Box } from '@mui/material';

// Importar componentes
import Navbar from '../components/Navbar';
import ProductCatalog from '../components/ProductCatalog';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';

const CatalogPage = () => {
  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/images/backgrounds/camuflage_beige.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--military-camo)',
        opacity: 0.05,
        zIndex: 0,
      }
    }}>
      <Navbar />
      <ProductCatalog />
      <Footer />
      <FloatingActionButton />
    </Box>
  );
};

export default CatalogPage;
