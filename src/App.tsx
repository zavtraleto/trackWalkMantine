import "@mantine/core/styles.css";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import "./App.css";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Box style={{ position: "absolute", right: "20px", bottom: "20px" }}>
        <ThemeToggle />
      </Box>
    </MantineProvider>
  );
}
