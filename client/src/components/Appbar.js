import { useState, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useStateContext } from "../context/ContextProvider";
export default function Appbar() {
  const [menu, setMenu] = useState(false);
  const [{ BB, BCS }, dispatch] = useStateContext();
  const setCategory = (event) => {
    let value;
    if (event.target.name === "BB") {
      dispatch({
        type: "Set_BB",
        data: !BB,
      });
      dispatch({
        type: "Set_BCS",
        data: false,
      });
    } else {
      dispatch({
        type: "Set_BCS",
        data: !BCS,
      });
      dispatch({
        type: "Set_BB",
        data: false,
      });
    }
  };
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6">Categories</Typography>
        </ListItem>
        {["Breaking Bad", "Better Call Saul"].map((text, index) => (
          <Fragment>
            <ListItem key={text}>
              {index === 0 ? (
                <Checkbox name="BB" checked={BB} onChange={setCategory} />
              ) : (
                <Checkbox name="BCS" checked={BCS} onChange={setCategory} />
              )}
              <Typography variant="body1">{text}</Typography>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "primary.main", color: "black" }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setMenu(!menu)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0.46, display: { xs: "none", sm: "block" } }} />
          <Drawer anchor="left" open={menu} onClose={() => setMenu(false)}>
            {list()}
          </Drawer>
          <Typography variant="h6" color="inherit" component="div">
            Breaking Bad
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
