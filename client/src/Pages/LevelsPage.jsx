import bgImage from "../assets/blue background.jpeg";
import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import level1 from"../assets/Level1.avif"
import level2 from "../assets/Level2.jpg"
import level3 from "../assets/Level3.jpg"
import level4 from "../assets/Level4.webp"
import level5 from "../assets/Level5.png"
import level6 from "../assets/Level6.gif"
import level7 from "../assets/Level7.jpg"
import level8 from "../assets/Level8.jpg"



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function LevelsPage({ columns = 4 }) {
  const pageStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px 0",
    fontFamily: "Arial, sans-serif",
   
  };

  const headerStyle = {
    backgroundColor: "#d1d5db", 
    padding: "20px 0",
    textAlign: "center",
    borderRadius: "4px",
    height: "100px",
    width: "2060px"
  };

  const headerText = {
    margin: 0,
    fontSize: "2.5rem",
    color: "#ffffff",
  };

  const boxBase = {
    height: "400px",
    width: "450px",
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
    { label: "Level 1", bg: "#FCA5A5", bgImage:level1 },
    { label: "Level 2", bg: "#FCD29A", bgImage:level2},
    { label: "Level 3", bg: "#FDE68A", bgImage:level3},
    { label: "Level 4", bg: "#BBF7D0", bgImage:level4 },
    { label: "Level 5", bg: "#FCA5A5", bgImage:level5},
    { label: "Level 6", bg: "#FCD29A", bgImage:level6},
    { label: "Level 7", bg: "#FDE68A", bgImage:level7},
    { label: "Level 8", bg: "#BBF7D0", bgImage:level8},
  ];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        m: 0,
        p: 0
      }}
    >
      {/* Header Bar */}
      <Typography variant="h1" gutterBottom align={"center"} color="white">
        Levels
      </Typography>

      <Grid
        container
        justifyContent="center" 
        sx={{ padding: '60px', marginTop: '20px' }}
      >
        {levels.map((level) => (
          <Grid item size={3} xs={4} key={level.label} display={"flex"} flexDirection={"column"} paddingBottom={2} paddingTop={2}>
            
            <Typography color="whitesmoke" textAlign={"center"} fontSize={36}>{level.label} </Typography>
            <Box
              sx={{
                backgroundImage: `url(${level.bgImage})`,
                ...boxBase,
                backgroundColor: level.bg,
              }}
            >
              
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
