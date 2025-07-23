import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import AccountPage from './Pages/AccountPage';
import LoginPage from './Pages/LoginPage';
import LevelsPage from './Pages/LevelsPage';
import RewardsPage from './Pages/RewardsPage';
import GamePage from './Pages/GamePage';


import { GameBucksProvider } from './Components/GameBucksContext';

function App() {
  return (
    <Router>
      <GameBucksProvider>
        <nav
  style={{
    backgroundColor: '#1a1a1a',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '60px',
    boxSizing: 'border-box',
  }}
>
  {['/', '/levels', '/game', '/rewards', '/account'].map((path, i) => {
    const labels = ['Home', 'Levels', 'Game', 'Rewards', 'Account'];
    return (
      <Link
        key={path}
        to={path}
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '20px',
          fontWeight: '500',
        }}
      >
        {labels[i]}
      </Link>
    );
  })}
</nav>


        <div style={{ height: 'calc(100vh - 60px)', width: '100vw', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/levels" element={<LevelsPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </div>
      </GameBucksProvider>
    </Router>
  );
}

export default App;
