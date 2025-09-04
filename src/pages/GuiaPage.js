import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Divider,
  Avatar,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ShoppingCart,
  WhatsApp,
  Payment,
  LocalShipping,
  CheckCircle,
  Phone,
  Email,
  Security,
  Speed,
  Support,
  ExpandMore,
  PlayArrow,
  Star,
  Verified,
  Timeline,
  Schedule
} from '@mui/icons-material';

const GuiaPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(false);

  const steps = [
    {
      icon: <ShoppingCart />,
      title: "Explora Nuestro Catálogo",
      description: "Navega por nuestra selección de productos y encuentra el equipo perfecto para ti.",
      details: "Utiliza los filtros para encontrar exactamente lo que buscas.",
      color: "#AFBD77"
    },
    {
      icon: <WhatsApp />,
      title: "Contacta a Nuestro Equipo",
      description: "Comunícate directamente con nosotros por WhatsApp para hacer tu pedido.",
      details: "Nuestro equipo te ayudará con todas tus dudas y te guiará en el proceso de compra.",
      color: "#25d366"
    },
    {
      icon: <Payment />,
      title: "Información y Pago",
      description: "Proporciona tus datos de envío y realiza el pago de forma segura con nuestros métodos disponibles.",
      details: "Aceptamos múltiples formas de pago. Te proporcionaremos toda la información necesaria para completar tu compra.",
      color: "#D4AF37"
    },
    {
      icon: <LocalShipping />,
      title: "Preparación y Envío",
      description: "Preparamos cuidadosamente tu pedido y lo enviamos a tu dirección.",
      details: "Todos los productos se embalan con materiales de protección para garantizar que lleguen en perfecto estado.",
      color: "#506C2C"
    },
    {
      icon: <CheckCircle />,
      title: "Recibe y Disfruta",
      description: "Recibe tu pedido y comienza a disfrutar de tu nuevo equipamiento de airsoft.",
      details: "Incluimos garantía en todos nuestros productos y soporte postventa para tu total satisfacción.",
      color: "#2C3E2D"
    }
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda el envío?",
      answer: "Los envíos nacionales tardan entre 3-7 días hábiles, dependiendo de tu ubicación. Los envíos a zonas metropolitanas suelen ser más rápidos."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos transferencias bancarias, depósitos y pagos en efectivo. Te proporcionaremos los detalles específicos al momento de tu pedido."
    },
    {
      question: "¿Los productos incluyen garantía?",
      answer: "Sí, todos nuestros productos incluyen garantía contra defectos de fabricación. Las condiciones específicas varían según el tipo de producto."
    },
    // {
    //   question: "¿Puedo cancelar mi pedido?",
    //   answer: "Puedes cancelar tu pedido sin costo antes de que sea enviado. Una vez enviado, aplicarán políticas de devolución estándar."
    // }
  ];

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
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
        backgroundPosition: 'center',
        opacity: 0.08,
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
        opacity: 0.03,
        zIndex: 0,
      }
    }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{
        pt: 12,
        pb: 6,
        background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
        color: 'white',
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
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Chip
            icon={<Verified />}
            label="Proceso Verificado y Seguro"
            className="animate-bounce-in"
            sx={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
              color: '#2C3E2D',
              fontWeight: 600,
              mb: 3,
              px: 2,
              py: 1,
              fontSize: '0.9rem'
            }}
          />
          
          <Typography
            variant="h1"
            component="h1"
            className="animate-fade-in-up"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #D4AF37 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            GUÍA DE PEDIDOS
          </Typography>
          
          <Typography
            variant="h5"
            className="animate-fade-in-up stagger-2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 300,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Proceso simple y seguro para obtener tu equipamiento táctico
          </Typography>
        </Container>
      </Box>

      {/* Pasos del Proceso */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                className={`premium-card hover-lift animate-fade-in-up stagger-${index + 1}`}
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${step.color}30`,
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: `${step.color}80`,
                    '& .step-number': {
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                      transform: 'scale(1.1)',
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Box
                    className="step-number"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${step.color}90 0%, ${step.color}60 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: `0 8px 24px ${step.color}40`,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&::before': {
                        content: `"${index + 1}"`,
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#D4AF37',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    }}
                  >
                    <Box sx={{ color: 'white', fontSize: '2rem' }}>
                      {step.icon}
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" sx={{
                    color: '#2C3E2D',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: '1.3rem'
                  }}>
                    {step.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{
                    color: '#555',
                    mb: 2,
                    lineHeight: 1.6
                  }}>
                    {step.description}
                  </Typography>
                  
                  <Typography variant="body2" sx={{
                    color: '#777',
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    {step.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Contacto Rápido */}
      <Box sx={{
        py: 6,
        background: 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(27, 42, 28, 0.9) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            className="animate-fade-in-up"
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #AFBD77 50%, #D4AF37 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ¿Listo para hacer tu pedido?
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { phone: "625-158-0453", title: "Ventas Generales", icon: <WhatsApp />, link: "https://wa.me/+526251580453" },
              { phone: "625-115-0546", title: "Ventas Línea 2", icon: <WhatsApp />, link: "https://wa.me/+526251150546" },
              { phone: "623-121-3002", title: "Ventas Línea 3", icon: <WhatsApp />, link: "https://wa.me/+526251213002" }
            ].map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className={`premium-card hover-lift animate-fade-in-up stagger-${index + 2}`}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onClick={() => window.open(contact.link, '_blank')}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar sx={{
                      width: 60,
                      height: 60,
                      background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                      mx: 'auto',
                      mb: 2
                    }}>
                      {contact.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#2C3E2D', fontWeight: 600, mb: 1 }}>
                      {contact.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#25d366', fontWeight: 700 }}>
                      {contact.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          className="animate-fade-in-up"
          sx={{
            color: '#2C3E2D',
            fontWeight: 700,
            mb: 4,
            textAlign: 'center'
          }}
        >
          Preguntas Frecuentes
        </Typography>
        
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            className={`animate-fade-in-up stagger-${index + 1}`}
            sx={{
              mb: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(175, 189, 119, 0.3)',
              borderRadius: '12px !important',
              '&:before': { display: 'none' },
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: '#506C2C' }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  margin: '16px 0'
                }
              }}
            >
              <Typography variant="h6" sx={{
                color: '#2C3E2D',
                fontWeight: 600
              }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{
                color: '#555',
                lineHeight: 1.6
              }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <FloatingActionButton />
      <Footer />
    </Box>
  );
};

export default GuiaPage;
