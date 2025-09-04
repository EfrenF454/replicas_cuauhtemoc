import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Star as StarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon
} from '@mui/icons-material';

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
        ¿Por qué elegirnos?
      </Typography>
      <Typography
        variant="h6"
        component="p"
        textAlign="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Ofrecemos las mejores características para tu negocio
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Seguridad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Máxima protección de datos con encriptación de última generación.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <SpeedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Velocidad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rendimiento optimizado para una experiencia ultrarrápida.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <SupportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Soporte 24/7
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Atención al cliente disponible las 24 horas del día.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <StarIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Calidad Premium
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Servicios de la más alta calidad respaldados por expertos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
