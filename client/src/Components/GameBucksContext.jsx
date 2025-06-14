// src/Components/GameBucksContext.jsx
import React, { createContext, useContext, useState } from 'react';

const GameBucksContext = createContext();

export const GameBucksProvider = ({ children }) => {
  const [gameBucks, setGameBucks] = useState(50); // Starting amount, for example

  return (
    <GameBucksContext.Provider value={{ gameBucks, setGameBucks }}>
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
