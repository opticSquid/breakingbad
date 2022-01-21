import { useState, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function SubAppbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "primary.main", color: "black" }}
      >
        <Toolbar variant="dense">
          <Box component="div" sx={{ flexGrow: 0.5, display: "block" }} />

          <Typography variant="h6" color="inherit" component="div">
            Breaking Bad
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
