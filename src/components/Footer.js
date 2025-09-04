import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2C3E2D 0%, #1B2A1C 100%)',
        color: 'white',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(175, 189, 119, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Sección principal del footer */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
          gap: 4,
          mb: 4,
        }}>
          {/* Logo y descripción */}
          <Box className="animate-fade-in-left"
          sx={{
                            textAlign:{xs: 'center', md: 'left'},
                alignItems:{xs: 'center', md: 'flex-start'},
          }}
          >
            <Box
              component="img"
              src="/Footer-512x512.png"
              alt="RÉPLICAS CUAUHTÉMOC"
              sx={{

                height: 60,
                width: 'auto',
                mb: 2,
                filter: 'brightness(1.1) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  filter: 'brightness(1.2) drop-shadow(4px 4px 8px rgba(0,0,0,0.4))',
                }
              }}
            />
            <Typography variant="body1" sx={{
              mb: 2,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.8)',
            }}>
              Tu aliado confiable en equipamiento y réplicas para airsoft de alta calidad.
            </Typography>
            <Typography variant="body2" sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontStyle: 'italic'
            }}>
              Ciudad Cuauhtémoc, Chihuahua, México
            </Typography>
          </Box>

          {/* Contacto rápido */}
          <Box className="animate-fade-in-up">
            <Typography variant="h6" sx={{
              mb: 3,
              fontWeight: 600,
              color: '#AFBD77',
              fontSize: '1.1rem'
            }}>
              Contacto Directo
            </Typography>
            <Stack spacing={2}>
              <Box
                component="a"
                href="https://wa.me/+52621580453"
                target="_blank"
                sx={{
                  width: "65%",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                  border: '1px solid rgba(175, 189, 119, 0.2)',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
                  }
                }}>
                <WhatsApp sx={{ color: '#ffffff' }} />
                <Typography variant="body2">
                  625-158-0453
                </Typography>
              </Box>
              <Box
                component="a"
                href="https://wa.me/+526251150546"
                target="_blank"
                sx={{
                  width: "65%",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                  border: '1px solid rgba(175, 189, 119, 0.2)',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
                  }
                }}>
                <WhatsApp sx={{ color: '#ffffff' }} />
                <Typography variant="body2">
                  625-115-0546
                </Typography>
              </Box>
              <Box
                component="a"
                href="https://wa.me/+526231213002"
                target="_blank"
                sx={{
                  width: "65%",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                  border: '1px solid rgba(175, 189, 119, 0.2)',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
                  }
                }}>
                <WhatsApp sx={{ color: '#ffffff' }} />
                <Typography variant="body2">
                  623-121-3002
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Enlaces rápidos */}
          <Box className="animate-fade-in-right">
            <Typography variant="h6" sx={{
              mb: 3,
              fontWeight: 600,
              color: '#AFBD77',
              fontSize: '1.1rem'
            }}>
              Enlaces Rápidos
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Catálogo', href: '/catalogo' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Guía de Pedidos', href: '/guia' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'block',
                    '&:hover': {
                      color: '#AFBD77',
                      transform: 'translateX(5px)',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Línea divisoria con efecto */}
        <Box sx={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(175, 189, 119, 0.5) 50%, transparent 100%)',
          my: 4
        }} />

        {/* Footer bottom */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Typography variant="body2" sx={{
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: { xs: 'center', md: 'center' }
          }}>
            © 2025 RÉPLICAS CUAUHTÉMOC. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
