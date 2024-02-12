import "@mantine/core/styles.css";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import "./App.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { TrackWalk } from "./pages/Home/TrackWalk/TrackWalk";
import { CircuitSelector } from "./pages/Home/CircuitSelector/CircuitSelector";
import { QueryClient, QueryClientProvider } from "react-query";
import { Notifications } from "@mantine/notifications";
import { Admin } from "./pages/Admin/Admin";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/trackWalk" element={<TrackWalk />} />
              <Route path="/circuits" element={<CircuitSelector />} />
            </Route>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
        <Notifications position="top-right" />
      </QueryClientProvider>
    </MantineProvider>
  );
}
