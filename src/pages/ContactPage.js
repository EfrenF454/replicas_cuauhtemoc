import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';
import ContactHero from '../components/ContactHero';
import emailjs from 'emailjs-com';

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  WhatsApp,
  Email,
  Phone,
  LocationOn,
  Schedule,
  Send,
  CheckCircle
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (puedes descomentar el código de EmailJS cuando esté configurado)
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
      setIsSubmitting(false);
    }, 2000);

    // const serviceID = 'service_ututoic';
    // const templateID = 'template_r17s8ju';
    // const userID = 'Na4UY3308fQl5q-xj';

    // emailjs.send(serviceID, templateID, formData, userID)
    //   .then(() => {
    //     setShowSuccess(true);
    //     setFormData({ nombre: '', email: '', mensaje: '' });
    //     setIsSubmitting(false);
    //   })
    //   .catch((err) => {
    //     console.error('❌ Error al enviar el mensaje:', err);
    //     alert('❌ Ocurrió un error al enviar el mensaje.');
    //     setIsSubmitting(false);
    //   });
  };

  const contactInfo = [
    {
      icon: <WhatsApp />,
      title: "WhatsApp Principal",
      detail: "625-158-0453",
      action: "tel:+526251580453",
      color: "#25d366",
      description: "Respuesta inmediata"
    },
    {
      icon: <Phone />,
      title: "Teléfonos Adicionales",
      detail: "625-115-0546 | 623-121-3002",
      action: "https://wa.me/+526251150546",
      color: "#2b00d7",
      description: "Llamadas directas"
    },
    {
      icon: <Email />,
      title: "Correo Electrónico",
      detail: "ventas@replicascuauhtemoc.com",
      action: "mailto:ventas@replicascuauhtemoc.com",
      color: "#D4AF37",
      description: "Consultas detalladas"
    },
  ];

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

      {/* Hero Section mejorado */}
      <Box sx={{ pt: 8 }}>
        <ContactHero />
      </Box>

      {/* Contenido Principal */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Grid container spacing={4}>
          {/* Información de Contacto */}
          <Grid item xs={12} md={6} mt={3}>
            <Box className="animate-fade-in-left">
              <Typography
                variant="h3"
                sx={{
                  color: '#2C3E2D',
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}
              >
                Información de Contacto
              </Typography>

              <Grid container spacing={3}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} sm={6} md={12} key={index}>
                    <Card
                      className={`premium-card hover-lift animate-fade-in-up stagger-${index + 1}`}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${info.color}20`,
                        cursor: info.action ? 'pointer' : 'default',
                        '&:hover': {
                          borderColor: `${info.color}60`,
                          background: 'rgba(255, 255, 255, 0.95)',
                        }
                      }}
                      onClick={() => info.action && window.open(info.action, '_blank')}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}10 100%)`,
                              color: info.color,
                              mr: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {info.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{
                              color: '#2C3E2D',
                              fontWeight: 600,
                              fontSize: '1.1rem'
                            }}>
                              {info.title}
                            </Typography>
                            <Typography variant="caption" sx={{
                              color: '#666',
                              fontSize: '0.8rem'
                            }}>
                              {info.description}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{
                          color: '#555',
                          fontWeight: 500,
                          wordBreak: 'break-word'
                        }}>
                          {info.detail}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Tarjetas de Contacto Rápido */}
          <Grid item xs={12} md={6}>
            <Box className="animate-fade-in-right">

              {/* Información adicional */}
              <Card className="glass-card animate-fade-in-up stagger-2" sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(175, 189, 119, 0.3)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule sx={{ color: '#506C2C', mr: 2 }} />
                    <Typography variant="h6" sx={{
                      color: '#2C3E2D',
                      fontWeight: 600
                    }}>
                      Horarios de Atención
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                    <strong>Lunes a Viernes:</strong> 9:00 AM - 7:00 PM
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                    <strong>Sábados:</strong> 9:00 AM - 5:00 PM
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#555' }}>
                    <strong>Domingos:</strong> 10:00 AM - 3:00 PM
                  </Typography>

                  <Divider sx={{ my: 2, background: 'rgba(175, 189, 119, 0.3)' }} />

                  <Box sx={{ textAlign: 'center' }}>
                    <Chip
                      label="Zona Horaria: GMT-6 (México)"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #AFBD77 0%, #8FA055 100%)',
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Sección de WhatsApp Adicionales */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            className="animate-fade-in-up"
            sx={{
              color: '#2C3E2D',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.6rem', md: '2rem' }
            }}
          >
            Múltiples Canales de Comunicación
          </Typography>

          <Grid container spacing={1} mr={1}>
            {[
              {
                phone: "625-158-0453",
                link: "https://wa.me/+526251580453",
                title: "Ventas Generales",
                description: "Consultas sobre productos y disponibilidad"
              },
              {
                phone: "625-115-0546",
                link: "https://wa.me/+526251150546",
                title: "Ventas Línea 2 ",
                description: "Ayuda con productos y especificaciones"
              },
              {
                phone: "623-121-3002",
                link: "https://wa.me/+526251213002",
                title: "Ventas Línea 3",
                description: "Pedidos especiales y atención personalizada"
              }
            ].map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className={`premium-card hover-lift animate-fade-in-up stagger-${index + 2}`}
                  sx={{
                    height: '100%',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(37, 211, 102, 0.2)',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'rgba(37, 211, 102, 0.5)',
                      background: 'rgba(255, 255, 255, 0.95)',
                    }
                  }}
                  onClick={() => window.open(contact.link, '_blank')}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                        }
                      }}
                    >
                      <WhatsApp sx={{ color: 'white', fontSize: '1.8rem' }} />
                    </Box>

                    <Typography variant="h6" sx={{
                      color: '#2C3E2D',
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '1.1rem'
                    }}>
                      {contact.title}
                    </Typography>

                    <Typography variant="h6" sx={{
                      color: '#25d366',
                      fontWeight: 700,
                      mb: 2,
                      fontSize: '1.2rem'
                    }}>
                      {contact.phone}
                    </Typography>

                    <Typography variant="body2" sx={{
                      color: '#666',
                      fontSize: '0.9rem',
                      lineHeight: 1.4
                    }}>
                      {contact.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sección de Beneficios de Contactar */}
        {/* <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}> */}
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h3"
            className="animate-fade-in-up"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              mb: 4,
              mt: 4,
              background: '#2c3e2d',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              letterSpacing: '-0.01em',
            }}
          >
            ¿Por qué elegirnos?
          </Typography>

          <Grid container spacing={3} alignItems="stretch"
            sx={{
              justifyContent: 'center',  // Alineación horizontal
              alignItems: 'center',      // Alineación vertical
            }}
          >
            {[
              {
                title: "Respuesta Rápida",
                description: "Respondemos en menos de 24 horas",
                icon: "⚡"
              },
              {
                title: "Atención Personalizada",
                description: "Cada cliente es único para nosotros",
                icon: "👥"
              },
              {
                title: "Compra tranquilo",
                description: "Resolvemos todas tus dudas",
                icon: "🏆"
              }
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
                <Box
                  // className={`glass-card animate-fade-in-up stagger-${index + 2}`}
                  className={`premium-card hover-lift animate-fade-in-up stagger-${index + 1}`}

                  sx={{
                    height: "100%",
                    flex: 1,
                    p: 3,
                    ml: 1,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '15px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2, fontSize: '2.5rem' }}>
                    {benefit.icon}
                  </Typography>
                  <Typography variant="h6" sx={{
                    color: '#2c3e2d',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: '1.1rem'
                  }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: 'rgba(44, 62, 45, 0.8)',
                    fontSize: '0.9rem'
                  }}>
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* CTA Final */}
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              className="animate-fade-in-up stagger-5"
              sx={{
                color: 'rgba(44, 62, 45, 0.9)',
                mb: 3,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 300,
                fontStyle: 'italic'
              }}
            >
              "Tu satisfacción es nuestra misión."
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsApp />}
              className="animate-bounce-in stagger-6"
              onClick={() => window.open('https://wa.me/+526251580453', '_blank')}
              sx={{
                px: 3,
                py: 1,
                fontSize: '1.2rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                borderRadius: '30px',
                textTransform: 'none',
                color: '#FFFFFF',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.5)',
                }
              }}
            >
              Contáctanos Ahora
            </Button>
          </Box>
        </Container>
      </Container>

      {/* Notificación de éxito */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            color: 'white',
            fontWeight: 600,
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </Alert>
      </Snackbar>

      <FloatingActionButton />
      <Footer />
    </Box>
  );
};

export default ContactPage;
