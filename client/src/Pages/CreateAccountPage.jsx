// src/pages/CreateAccountPage.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccountPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users', {
        username,
        password,
      });
      alert('Account created! You can now log in.');
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('Username already exists. Please choose another.');
      } else {
        alert('Failed to create account. Please try again later.');
        console.error(error);
      }
    }
  };

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <form onSubmit={handleCreateAccount} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: '#333',
        padding: '40px',
        borderRadius: '8px',
        width: '320px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Create Account</h2>

        <input
          type="text"
          placeholder="Choose a Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
          placeholder="Choose a Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            outline: 'none',
          }}
        />

        <Button type="submit" variant="contained" style={{ backgroundColor: '#28a745' }}>
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
