// src/App.jsx
import React from "react";
import LevelsPage from "./Pages/LevelsPage"; // <-- notice "./Pages/LevelsPage"
import Level from "./Components/Level";
import Button from "@mui/material/Button";

function App() {
  return (
    <div>
      <LevelsPage></LevelsPage>
    </div>
  );
}

export default App;