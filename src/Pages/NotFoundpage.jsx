import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
        bgcolor: '#f9fafb',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: '6rem', md: '10rem' }, fontWeight: 700, color: '#1976d2' }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: '400px' }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go To Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
