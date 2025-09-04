import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles/utilities.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import {
  CssBaseline,
  ThemeProvider
} from '@mui/material';

// Importar tema
import theme from './theme';

import ProtectedRoute from './routes/ProtectedRoute';

// Importar páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GuiaPage = lazy(() => import('./pages/GuiaPage'));


// 🔄 Loader mientras se carga la ruta con efectos modernos
const Loader = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'var(--military-camo)',
      opacity: 0.1,
      zIndex: 0,
    }
  }}>
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <CircularProgress 
        size={60}
        sx={{
          color: '#AFBD77',
          mb: 2,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      <Typography 
        variant="h6" 
        sx={{
          color: '#2C3E2D',
          fontWeight: 600,
          letterSpacing: '1px',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      >
        Cargando...
      </Typography>
    </Box>
  </Box>
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/guia" element={<GuiaPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
