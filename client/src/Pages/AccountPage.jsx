import React from 'react';
import LoginButton from '../Components/LoginButton';

const AccountPage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#1a1a1a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box',
      gap: '40px',
    }}>
      <div style={{
        backgroundColor: '#ccc',
        width: '90%',
        textAlign: 'center',
        padding: '25px 15px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#111',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        Account Page
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '90%',
        maxWidth: '700px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#f3eded',
            width: 80,
            height: 80,
            borderRadius: '50%',
            marginBottom: '30px'
          }} />

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{
              background: '#dc3545',
              width: 60,
              height: 60,
              borderRadius: '50%',
            }} />
            <div style={{
              background: '#007bff',
              width: 60,
              height: 60,
              borderRadius: '50%',
            }} />
          </div>

          <p style={{
            marginTop: '25px',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#ccc'
          }}>
            Achievements
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '30px', fontSize: '3rem' }}>Level: 3</h1>
          <h1 style={{ fontSize: '3rem' }}>GameBucks: 25</h1>
        </div>
      </div>

      <LoginButton />
    </div>
  );
};

export default AccountPage;
