// src/Components/GameBucksContext.jsx
import React, { createContext, useContext, useState } from 'react';

const GameBucksContext = createContext();

export const GameBucksProvider = ({ children }) => {
  const [gameBucks, setGameBucks] = useState(50); // Starting amount
  const [extraHearts, setExtraHearts] = useState(0); // Extra lives bought

  const buyLife = (cost = 10) => {
    if (gameBucks >= cost) {
      setGameBucks(prev => prev - cost);
      setExtraHearts(prev => prev + 1);
      return true; // Purchase successful
    }
    return false; // Not enough GameBucks
  };

  return (
    <GameBucksContext.Provider value={{ gameBucks, setGameBucks, extraHearts, setExtraHearts, buyLife }}>
      {children}
    </GameBucksContext.Provider>
  );
};

export const useGameBucks = () => {
  const context = useContext(GameBucksContext);
  if (!context) {
    throw new Error('useGameBucks must be used within a GameBucksProvider');
  }
  return context;
};
