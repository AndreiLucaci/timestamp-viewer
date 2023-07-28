import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import Content from "./components/content/Content";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Header />
          </Grid>
          <Grid xs={12}>
            <Content />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
