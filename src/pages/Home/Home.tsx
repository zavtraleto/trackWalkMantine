import { FC } from "react";
import { AppShell, Box } from "@mantine/core";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Home.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";

export const Home: FC = () => {
  const [minimal, handlers] = useDisclosure(false);

  return (
    <AppShell
      navbar={{
        width: minimal ? "68px" : "20vw",
        breakpoint: "xs",
      }}
      padding={minimal ? "xs" : "md"}
      bg="dark"
    >
      <AppShell.Navbar p={minimal ? "xs" : "md"}>
        <Sidebar minimal={minimal} handlers={handlers} />
        <Box
          style={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
          }}
        >
          <ThemeToggle />
        </Box>
      </AppShell.Navbar>
      <AppShell.Main className={styles.content}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
