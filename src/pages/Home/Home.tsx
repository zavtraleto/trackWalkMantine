import { FC } from "react";
import { AppShell, Box, Burger, Center, Flex, Group } from "@mantine/core";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Home.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Logo from "@assets/icons/logo.svg?react";

export const Home: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Box pos="relative">
      <AppShell
        header={{ height: { base: 60, sm: 0 } }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        bg="dark"
      >
        <AppShell.Header hiddenFrom="sm">
          <Flex align="center" justify="space-between" p="sm">
            <Logo className="icon-stroke icon-fill" />
            <Burger opened={opened} onClick={toggle} />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Sidebar sidebarToggle={toggle} />
        </AppShell.Navbar>
        <AppShell.Main className={styles.content}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Box>
  );
};
