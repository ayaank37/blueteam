import React, { useState } from 'react';
import { useGameBucks } from '../Components/GameBucksContext';

const rewards = [
  { name: 'Skin', price: 5, color: '#ff9999' },
  { name: 'Wand', price: 3, color: '#99ccff' },
  { name: 'Badge', price: 8, color: '#ffeb3b' },
  { name: 'Power Up', price: 8, color: '#2e7d32' },
];

const RewardsPage = () => {
  const { gameBucks, setGameBucks } = useGameBucks();
  const [lastPurchase, setLastPurchase] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBuy = (reward) => {
    if (gameBucks >= reward.price) {
      setGameBucks((prev) => prev - reward.price);
      setLastPurchase(reward);
      setErrorMessage('');
    } else {
      setLastPurchase(null);
      setErrorMessage(`Not enough GameBucks to buy ${reward.name}.`);
    }
  };

  return (
    <div
      style={{
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
        position: 'relative',
      }}
    >
      {/* GameBucks Display */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 30,
          fontSize: '1.2rem',
          backgroundColor: '#333',
          padding: '10px 20px',
          borderRadius: '12px',
          color: '#4caf50',
          fontWeight: 'bold',
        }}
      >
        GameBucks: {gameBucks}
      </div>

      {/* Header */}
      <div
        style={{
          backgroundColor: '#ccc',
          width: '90%',
          textAlign: 'center',
          padding: '25px 15px',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111',
          borderRadius: '8px',
          marginBottom: '40px',
        }}
      >
        Reward Page
      </div>

      {/* Rewards Grid */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '60px',
          width: '90%',
          maxWidth: '1200px',
        }}
      >
        {rewards.map((reward, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                backgroundColor: reward.color,
                borderRadius: '25px',
              }}
            />

            <p style={{ fontSize: '1.3rem', fontWeight: '600', color: '#ddd' }}>
              {reward.name} ${reward.price}
            </p>

            <button
              onClick={() => handleBuy(reward)}
              style={{
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                fontWeight: 'bold',
                backgroundColor: reward.color,
                color: reward.color === '#ffeb3b' ? '#111' : 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {/* Purchase Message */}
      {lastPurchase && (
        <p
          style={{
            marginTop: '30px',
            fontSize: '1.2rem',
            color: lastPurchase.color,
            fontWeight: 'bold',
          }}
        >
          You bought <strong>{lastPurchase.name}</strong> for ${lastPurchase.price}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#ff5252' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default RewardsPage;
