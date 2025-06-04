import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import AccountPage from './Pages/AccountPage';
import LoginPage from './Pages/LoginPage';
import LevelsPage from './Pages/LevelsPage';  // import the new page

function App() {
  return (
    <Router>
      <nav style={{
  backgroundColor: '#333',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  height: '60px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
}}>
  {/* Left - Home */}
  <div style={{ flex: 1 }}>
    <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
      Home
    </Link>
  </div>

  {/* Center - Levels */}
  <div style={{ flex: 1, textAlign: 'center' }}>
    <Link to="/levels" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
      Levels
    </Link>
  </div>

  {/* Right - Account */}
  <div style={{ flex: 1, textAlign: 'right' }}>
    <Link to="/account" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
      Account
    </Link>
  </div>
</nav>


      <div style={{
        height: 'calc(100vh - 60px)',
        width: '100vw',
        overflowY: 'auto',
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/levels" element={<LevelsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
