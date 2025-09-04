import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Avatar
} from '@mui/material';
import {
  WhatsApp,
  Email,
  Schedule,
  LocationOn,
  Verified,
  Star
} from '@mui/icons-material';

const ContactHero = () => {
  const quickStats = [
    {
      icon: <WhatsApp />,
      number: "3",
      label: "Líneas WhatsApp",
      color: "#25d366"
    },
    {
      icon: <Schedule />,
      number: "24h",
      label: "Tiempo de Respuesta",
      color: "#AFBD77"
    },
    {
      icon: <Star />,
      number: "100%",
      label: "Satisfacción",
      color: "#D4AF37"
    },
    // {
    //   icon: <LocationOn />,
    //   number: "5+",
    //   label: "Años de Experiencia",
    //   color: "#506C2C"
    // }
  ];

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
      color: 'white',
      py: 8,
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
        opacity: 0.2,
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1,
        animation: 'pulse 4s ease-in-out infinite',
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {/* Badge de verificación */}
          <Box className="animate-bounce-in" sx={{ mb: 3 }}>
          </Box>

          <Typography
            variant="h2"
            component="h1"
            className="animate-fade-in-up"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #cdcdcd 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              fontFamily: '"Poppins", sans-serif',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            ESTAMOS PARA AYUDARTE
          </Typography>

          <Typography
            variant="h5"
            className="animate-fade-in-up stagger-2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 300,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Tu proveedor confiable en replicas para airsoft. Contáctanos para cualquier consulta,
            pedido especial o información que necesites.
          </Typography>
        </Box>

        {/* Estadísticas rápidas */}
        <Grid container spacing={3} sx={{
          mt: 2, justifyContent: 'center',  // Alineación horizontal
          alignItems: 'center',      // Alineación vertical
        }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box
                className={`animate-fade-in-up stagger-${index + 3} glass-card`}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                  border: `1px solid ${stat.color}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-5px)',
                    borderColor: `${stat.color}60`,
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                    mx: 'auto',
                    mb: 2,
                    boxShadow: `0 4px 12px ${stat.color}40`,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" sx={{
                  fontWeight: 800,
                  color: stat.color,
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactHero;
