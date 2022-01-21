import { createTheme } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";
const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[800],
    },
    secondary: {
      main: pink["A400"],
    },
  },
});
export default Theme;
