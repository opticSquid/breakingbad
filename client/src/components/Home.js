import { Fragment } from "react";
import Appbar from "./Appbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
function Home(props) {
  return (
    <Fragment>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
              
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Home;
