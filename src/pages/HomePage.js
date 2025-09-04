import React from 'react';
import { Box } from '@mui/material';

// Importar componentes
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Catalogue from '../components/Catalogue';
import Footer from '../components/Footer';
import Disclaimer from '../components/Disclaimer';
import FloatingActionButton from '../components/FloatingActionButton';

const HomePage = () => {
  return (
    <Box
      sx={{
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
          filter: 'blur(8px)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: -1,
        }
      }}
    >
      <Navbar />
      <HeroSection />
      <CTASection />
      <Disclaimer />
      {/* <Catalogue/> */}
      <Footer />
      <FloatingActionButton />
    </Box>

  );
};

export default HomePage;
