import { FC } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "./Sidebar/Sidebar";
import { Content } from "./Content/Content";
import styles from "./Home.module.css";
import { useDisclosure } from "@mantine/hooks";

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
      </AppShell.Navbar>
      <AppShell.Main className={styles.content}>
        <Content />
      </AppShell.Main>
    </AppShell>
  );
};
