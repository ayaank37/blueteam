import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";



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
    height: "275px",
    width: "200px",
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
    <Container maxWidth="lg"  align="center">
      {/* Header Bar */}
      <Typography variant="h1" gutterBottom align={"center"}>
        Levels
      </Typography>

      <Grid
        container
        justifyContent="center" 
        sx={{ padding: '60px', marginTop: '20px' }}
      >
        {levels.map((level) => (
          <Grid item size={3} xs={4} key={level.label} display={"flex"} flexDirection={"column"}>
            
            <Typography>{level.label} </Typography>
            <Box
              sx={{
                ...boxBase,
                backgroundColor: level.bg,
                color: level.txt,
              }}
            >
              
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
