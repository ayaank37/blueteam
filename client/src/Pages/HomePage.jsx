import React from 'react';
import LoginButton from '../Components/LoginButton';

const HomePage = () => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      backgroundColor: '#1a1a1a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Welcome to the Home Page
      </h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '40px' }}>
        Click "Account" in the navbar to view your account.
      </p>

      <LoginButton />
    </div>
  );
};

export default HomePage;
