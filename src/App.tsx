import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            {/* <Item> */}
            <Header />
            {/* </Item> */}
          </Grid>
          <Grid xs={12}>
            {/* <Item> */}
            <Content />
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
