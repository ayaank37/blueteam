
import React from "react";

export default function LevelsPage() {
  // Base styles
  const pageStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#d1d5db", // light gray
    padding: "20px 0",
    textAlign: "center",
    borderRadius: "4px",
    height: "50px",
    width: "2000px"
  };

  const headerText = {
    margin: 0,
    fontSize: "2.5rem",
    color: "#ffffff",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "100px",
    margin: "60px",

  };

  const boxBase = {
    height: "275px",
    width: "400px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#000000",
  };

  // Color definitions for each level
  const levels = [
    { label: "Level 1", bg: "#FCA5A5", txt: "#58151C" },
    { label: "Level 2", bg: "#FCD29A", txt: "#603C1D" },
    { label: "Level 3", bg: "#FDE68A", txt: "#4A351B" },
    { label: "Level 4", bg: "#BBF7D0", txt: "#14532D" },
    { label: "Level 5", bg: "#FCA5A5", txt: "#58151C" },
    { label: "Level 6", bg: "#FCD29A", txt: "#603C1D" },
    { label: "Level 7", bg: "#FDE68A", txt: "#4A351B" },
    { label: "Level 8", bg: "#BBF7D0", txt: "#14532D" },
  ];

  return (
    <div style={pageStyle}>
      {/* Header Bar */}
      <div style={headerStyle}>
        <h1 style={headerText}>Levels</h1>
      </div>

      {/* 4×2 Grid of Level Boxes */}
      <div style={gridStyle}>
        {levels.map((level) => (
          <div
            key={level.label}
            style={{
              ...boxBase,
              backgroundColor: level.bg,
              color: level.txt,
            }}
          >
            {level.label}
          </div>
        ))}
      </div>
    </div>
  );
}