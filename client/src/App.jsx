import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/AccountPage";
import LoginPage from "./Pages/LoginPage";
import LevelsPage from "./Pages/LevelsPage";
import RewardsPage from "./Pages/RewardsPage";
import GamePage from "./Pages/GamePage";
import CreateAccountPage from "./Pages/CreateAccountPage";

import { GameBucksProvider } from "./Components/GameBucksContext";

function App() {
  return (
    <Router>
      <GameBucksProvider>
        <div
          style={{
            backgroundColor: "#000000",
            minHeight: "100vh",
            height: "100%",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <nav
            style={{
              backgroundColor: "#1a1a1a",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "60px",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
            >
              {["/", "/levels", "/rewards", "/account", "/login"].map((path, i) => {
                const currentUser = localStorage.getItem("currentUser");
                const loggedIn = currentUser && localStorage.getItem(`${currentUser}_loginSuccess`) === "true";

                const labels = ["Home", "Levels", "Rewards", "Account", loggedIn ? "Logout" : "Login"];
                const isLogout = labels[i] === "Logout";

                if (isLogout) {
                // Use <a> for logout to allow full page reload
                return (
                  <a
                    key={path}
                    href="#"
                    style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentUser) {
                      localStorage.removeItem(`${currentUser}_loginSuccess`);
                      localStorage.removeItem("currentUser"); // optional
                      window.location.href = "/login"; // full reload
                    }
                  }}
                >
                  {labels[i]}
                </a>
              );
            } else {
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  {labels[i]}
                </Link>
              );
            }
          })}
        </nav>
          <div
            style={{
              flex: 1,
              width: "100%",
              overflowY: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/levels" element={<LevelsPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/game/:levelId" element={<GamePage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
            </Routes>
          </div>
        </div>
      </GameBucksProvider>
    </Router>
  );
}

export default App;
