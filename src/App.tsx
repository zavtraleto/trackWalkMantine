import "@mantine/core/styles.css";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import "./App.css";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { TrackWalk } from "./pages/Home/TrackWalk/TrackWalk";
import { CircuitSelector } from "./pages/Home/CircuitSelector/CircuitSelector";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/trackWalk" element={<TrackWalk />} />
            <Route path="/circuits" element={<CircuitSelector />} />
          </Route>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
