import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Button
      variant="contained"
      style={{
        background: '#333',
        padding: '12px 40px',
        fontSize: '1.1rem',
        borderRadius: '6px',
        color: 'white',
      }}
      onClick={handleClick}
    >
      Log in
    </Button>
  );
};

export default LoginButton;
