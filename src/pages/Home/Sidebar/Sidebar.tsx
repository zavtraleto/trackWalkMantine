import { FC, useState } from "react";
import { Box, Group } from "@mantine/core";
import styles from "./Sidebar.module.css";
import OverviewIcon from "@assets/icons/overview.svg?react";
import TrackIcon from "@assets/icons/track.svg?react";
import CalendarIcon from "@assets/icons/calendar.svg?react";
import FolderIcon from "@assets/icons/folder.svg?react";
import SettingsIcon from "@assets/icons/settings.svg?react";
import LogoutIcon from "@assets/icons/logout.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import { ThemeToggle } from "@components/ThemeToggle/ThemeToggle";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const data = [
  { link: "/trackWalk", label: "Overview", icon: <OverviewIcon /> },
  { link: "/circuits", label: "Circuits", icon: <TrackIcon /> },
  { link: "", label: "Calendar", icon: <CalendarIcon /> },
  { link: "", label: "Library", icon: <FolderIcon /> },
  { link: "", label: "Settings", icon: <SettingsIcon /> },
];

type SidebarProps = {
  minimal?: boolean;
  handlers: ReturnType<typeof useDisclosure>;
};

const Sidebar: FC<SidebarProps> = ({ minimal, handlers }) => {
  const [active, setActive] = useState("Overview");

  const links = data.map((item) => (
    <Link
      className={styles.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <span className={styles.linkIcon}>{item.icon}</span>
      {!minimal && <span className={styles.linkLabel}>{item.label}</span>}
    </Link>
  ));

  return (
    <nav className={styles.navbar}>
      <Box
        className={styles.logo}
        mt="md"
        mb="md"
        onClick={() => handlers.toggle()}
      >
        <Logo />
      </Box>
      <div className={styles.navbarMain}>
        <Group className={styles.header} justify="space-between"></Group>
        {links}
      </div>

      <div className={styles.footer}>
        <Link to="/login" className={styles.link}>
          <LogoutIcon />
          {!minimal && <Box ml="md">Logout</Box>}
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
