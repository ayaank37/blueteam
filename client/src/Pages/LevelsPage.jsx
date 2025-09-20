import bgImage from "../assets/blue background.jpeg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Box } from "@mui/material";
import level1 from "../assets/Level1.avif";
import level2 from "../assets/Level2.jpg";
import level3 from "../assets/Level3.jpg";
import level4 from "../assets/Level4.webp";
import level5 from "../assets/Level5.png";
import level6 from "../assets/Level6.gif";
import level7 from "../assets/Level7.jpg";
import level8 from "../assets/Level8.jpg";

const levels = [
  { label: "Level 1", bg: "#FCA5A5", image: level1 },
  { label: "Level 2", bg: "#FCD29A", image: level2 },
  { label: "Level 3", bg: "#FDE68A", image: level3 },
  { label: "Level 4", bg: "#BBF7D0", image: level4 },
  { label: "Level 5", bg: "#FCA5A5", image: level5 },
  { label: "Level 6", bg: "#FCD29A", image: level6 },
  { label: "Level 7", bg: "#FDE68A", image: level7 },
  { label: "Level 8", bg: "#BBF7D0", image: level8 },
];

const LevelsPage = () => {
  const navigate = useNavigate();
  const unlocked = Number(localStorage.getItem("unlockedLevels") || "1");

  const handleClick = (levelIndex) => {
    if (levelIndex + 1 <= unlocked) {
      navigate(`/game/${levelIndex + 1}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        padding: "40px 20px",
        margin: 0,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "2.5rem",
          color: "white",
          mb: 4,
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Levels
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",  // <-- Force wrapping
          width: "100%",
        }}
      >
        {levels.map((lvl, i) => {
          const isLocked = i + 1 > unlocked;
          return (
            <Grid
              item
              key={lvl.label}
              sx={{
                width: "calc(25% - 24px)",  // 4 items per row accounting for spacing
                margin: "12px",
                display: "flex",
              }}
              onClick={() => handleClick(i)}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: "180px",
                  backgroundImage: `url(${lvl.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 4,
                  opacity: isLocked ? 0.4 : 1,
                  cursor: isLocked ? "not-allowed" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  textShadow: "2px 2px 6px white",
                  border: `5px solid ${lvl.bg}`,
                  userSelect: "none",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                <Typography
                  sx={{
                    bgcolor: lvl.bg,
                    color: "black",
                    p: 1,
                    borderRadius: 1,
                    textAlign: "center",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  {lvl.label}
                </Typography>
                {isLocked && (
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      bgcolor: "#d9d9d9",
                      p: 0.5,
                      borderRadius: 1,
                      textAlign: "center",
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  >
                    Locked
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LevelsPage;
