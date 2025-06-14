// src/App.jsx
import React from "react";
import LevelsPage from "./Pages/LevelsPage"; // <-- notice "./Pages/LevelsPage"
import Level from "./Components/Level";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  return (
    <>
      <LevelsPage></LevelsPage>
    </>
  );
}

export default App;