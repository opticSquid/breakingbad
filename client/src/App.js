import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
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
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
