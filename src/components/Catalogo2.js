import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Pistola SSP18 Negra',
    description: 'Pistola para airsoft con acabado negro mate.',
    price: 89.99,
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    name: 'Rifle M4A1',
    description: 'Rifle eléctrico de alto rendimiento con muchas funciones tácticas avanzadas.',
    price: 299.99,
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    name: 'Kit de Mantenimiento',
    description: 'Kit completo para limpieza de armas. Incluye aceite, cepillos, y más.',
    price: 39.99,
    image: 'https://via.placeholder.com/300x200'
  }
];

const CardItem = ({ product }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <CardMedia
      component="img"
      image={product.image}
      alt={product.name}
      sx={{ height: 160, objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.description}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
        ${product.price}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" fullWidth>
        Agregar
      </Button>
    </CardActions>
  </Card>
);

export default function CatalogTest() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id} sx={{ display: 'flex' }}>
            <CardItem product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
