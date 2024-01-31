import { FC, useState } from "react";
import {
  Anchor,
  Box,
  Flex,
  Group,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import styles from "./Sidebar.module.css";
import OverviewIcon from "@assets/icons/overview.svg?react";
import TrackIcon from "@assets/icons/track.svg?react";
import CalendarIcon from "@assets/icons/calendar.svg?react";
import FolderIcon from "@assets/icons/folder.svg?react";
import SettingsIcon from "@assets/icons/settings.svg?react";
import LogoutIcon from "@assets/icons/logout.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../../components/ThemeToggle/ThemeToggle";

const data = [
  {
    link: "/trackWalk",
    label: "Overview",
    icon: <OverviewIcon stroke="gray" fill="none" />,
  },
  { link: "/circuits", label: "Circuits", icon: <TrackIcon stroke="gray" /> },
  { link: "", label: "Calendar", icon: <CalendarIcon fill="gray" /> },
  { link: "", label: "Library", icon: <FolderIcon fill="gray" /> },
  { link: "", label: "Settings", icon: <SettingsIcon stroke="gray" /> },
];

type SidebarProps = {
  minimal?: boolean;
  handlers?: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };

  sidebarToggle?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ sidebarToggle }) => {
  const [active, setActive] = useState("Overview");

  const links = data.map((item) => (
    <Link
      className={styles.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(_) => {
        setActive(item.label);
        sidebarToggle();
      }}
    >
      <Flex m="sm">{item.icon}</Flex>
      <Text pt="md" pb="md">
        {item.label}
      </Text>
    </Link>
  ));

  return (
    <nav className={styles.navbar}>
      <Box className={styles.logo} mt="md" mb="md" visibleFrom="sm">
        <Logo className="icon-stroke icon-fill" />
      </Box>
      <div className={styles.navbarMain}>
        {links}
        <Link to="/login" className={styles.link}>
          <Flex m="sm">
            <LogoutIcon stroke="gray" />
          </Flex>
          <Text pt="md" pb="md">
            Logout
          </Text>
        </Link>
      </div>

      <Flex className={styles.footer} justify="center">
        <ThemeToggle />
      </Flex>
    </nav>
  );
};

export default Sidebar;
