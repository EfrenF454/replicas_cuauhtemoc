import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button
} from '@mui/material';

const CTASection = () => {
  return (
    <Box sx={{
      mt: 4,
      py: 8,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.9) 0%, rgba(27, 42, 28, 0.8) 100%)',
      borderRadius: 3,
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
      mx: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/images/gallery/embalaje.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'float 4s ease-in-out infinite',
      }
    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          className="animate-fade-in-up"
          sx={{
            color: '#FFFFFF',
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #D4AF37 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontSize: { xs: '2rem', md: '2.8rem' },
            letterSpacing: '-0.02em',
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          LISTOS PARA LA BATALLA
        </Typography>
        
        <Typography 
          variant="h5" 
          component="p" 
          className="animate-fade-in-up"
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            fontWeight: 300,
            letterSpacing: '0.5px',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.5,
            animationDelay: '0.2s',
          }}
        >
          Prepárate para la acción con productos de la mejor calidad y envíos seguros.
          <br />
          Equipamiento táctico profesional para todos los niveles.
        </Typography>

        {/* Características destacadas */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 3,
          mt: 5,
        }}>
          {[
            { title: 'Calidad Premium', desc: 'Productos de alta gama' },
            { title: 'Envío Seguro', desc: 'Embalaje especializado' },
            { title: 'Atención Rápida', desc: 'Respuesta en menos de 24hrs' },
          ].map((feature, index) => (
            <Box 
              key={index}
              className="animate-fade-in-up glass-card"
              sx={{
                p: 3,
                textAlign: 'center',
                animationDelay: `${0.4 + index * 0.2}s`,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  background: 'rgba(175, 189, 119, 0.2)',
                }
              }}
            >
              <Typography variant="h6" sx={{ 
                color: '#AFBD77', 
                fontWeight: 600, 
                mb: 1 
              }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)' 
              }}>
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
