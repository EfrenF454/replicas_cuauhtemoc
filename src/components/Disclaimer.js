import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Disclaimer = () => {
    return (
        <Box sx={{
            mt: 4,
            mb: 4,
            py: 6,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
            borderRadius: 3,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            mx: 2,
            border: '1px solid rgba(175, 189, 119, 0.3)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--military-camo)',
                opacity: 0.3,
                zIndex: 0,
            }
        }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Título principal */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography 
                        variant="h3" 
                        component="h2" 
                        className="animate-fade-in-up"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #cacdbf 0%, #AFBD77 50%, #cacdbf 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            letterSpacing: '-0.01em',
                        }}
                    >
                        AVISO LEGAL / DISCLAIMER
                    </Typography>
                </Box>

                {/* Contenido principal */}
                <Box className="glass-card" sx={{ p: 4, mb: 3 }}>
                    <Typography 
                        variant="body1" 
                        className="animate-fade-in-up"
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: 1,
                            lineHeight: 1.7,
                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                            animationDelay: '0.2s',
                        }}
                    >
                        En <strong style={{ color: '#AFBD77' }}>Réplicas Cuauhtémoc</strong>, comercializamos réplicas de airsoft que utilizan bolas de plástico de 6 mm de diámetro (BBs) como munición, <strong style={{ color: '#D4AF37' }}>no son armas de fuego</strong>.
                        Nuestras réplicas están diseñadas exclusivamente para fines recreativos, entrenamiento táctico simulado o coleccionismo.
                    </Typography>

                    <Typography 
                        variant="body1" 
                        className="animate-fade-in-up"
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: 3,
                            lineHeight: 1.7,
                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                            animationDelay: '0.4s',
                        }}
                    >
                        <strong style={{ color: '#FFD700' }}>No nos hacemos responsables del uso indebido</strong> de estos productos. Es responsabilidad del comprador y del usuario
                        utilizarlos de forma segura, legal y ética.
                    </Typography>

                    <Typography 
                        variant="body1" 
                        className="animate-fade-in-up"
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            animationDelay: '0.6s',
                        }}
                    >
                        Gracias por utilizar nuestros productos de manera responsable.
                    </Typography>
                </Box>

                {/* Badge de verificación */}
                <Box 
                    className="animate-bounce-in"
                    sx={{                        
                        display: 'flex',
                        justifyContent: 'center',
                        animationDelay: '0.8s',
                    }}
                >
                    <Box sx={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                        color: '#2C3E2D',
                        px: 3,
                        py: 1.5,
                        borderRadius: '25px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                    }}>
                        ✓ Réplicas punto rojo
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Disclaimer;
