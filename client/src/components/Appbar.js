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
import SearchBar from "./SearchBar";
export default function Appbar() {
  const [menu, setMenu] = useState(false);
  const [check, setCheck] = useState({
    BB: false,
    BCS: false,
  });
  const setCategory = (event) => {
    setCheck({
      ...check,
      [event.target.name]: event.target.checked,
    });
  };
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6">Categories</Typography>
        </ListItem>
        {["Breaking Bad", "Better Call Saul"].map((text, index) => (
          <Fragment>
            <ListItem button key={text}>
              {index === 0 ? (
                <Checkbox name="BB" checked={check.BB} onChange={setCategory} />
              ) : (
                <Checkbox
                  name="BCS"
                  checked={check.BCS}
                  onChange={setCategory}
                />
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
          <Box sx={{ flexGrow: 0.6, display: { xs: "none", sm: "block" } }} />
          <Drawer anchor="left" open={menu} onClose={() => setMenu(false)}>
            {list()}
          </Drawer>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 0.5, display: { xs: "none", sm: "block" } }}
          >
            Breaking Bad
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
