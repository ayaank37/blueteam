import React from 'react';
import LoginButton from '../Components/LoginButton';

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#000',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Welcome to Python Quest 🐍
      </h1>
      <p style={{ fontSize: '1.3rem', maxWidth: '600px', marginBottom: '40px' }}>
        Ready to level up your Python skills? Choose a level and start your journey!
      </p>

      <LoginButton />
    </div>
  );
};

export default HomePage;
