import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = async () => {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          username,
          password,
        });

        console.log('Login successful:', response.data);

        // Store token if returned (optional)
        // localStorage.setItem('token', response.data.token);

        alert(`Logged in as ${username}`);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Login failed. Please check your credentials.');
      }
    };

    loginUser();
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#333',
          padding: '40px',
          borderRadius: '8px',
          width: '320px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Log In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            outline: 'none',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            outline: 'none',
          }}
        />

        <Button type="submit" variant="contained" style={{ backgroundColor: '#007bff' }}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
