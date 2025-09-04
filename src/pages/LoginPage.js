// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { Login, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redirige a /admin si el login es exitoso
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 10,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleLogin}>
        <TextField
          label="Correo"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color='#ffffff'
          fullWidth
          type="submit"
          sx={{
            mt: 2,
            backgroundColor: '#1d4ed8',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#163ca3',
              boxShadow: 5,
            }
          }}

          startIcon={<Login />}
        >
          Entrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBack}
          sx={{
            mt: 1,
            backgroundColor: '#ff2828',
            color: '#ffffff',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#d01212',
              boxShadow: 5,
            },
            '&:active': {
              backgroundColor: '#d01212',
            },
          }}
          startIcon={<ArrowBack />}
        >
          Volver
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
