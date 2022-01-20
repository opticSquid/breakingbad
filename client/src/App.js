import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/theme";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
