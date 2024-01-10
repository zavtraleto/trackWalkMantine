import {
  useMantineColorScheme,
  useComputedColorScheme,
  Switch,
  ActionIcon,
  Group,
} from "@mantine/core";
import IconSun from "@assets/icons/sun.svg?react";
import IconMoon from "@assets/icons/moon.svg?react";
import { FC } from "react";

export const ThemeToggle: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      p={5}
    >
      {computedColorScheme === "light" ? (
        <IconMoon fill="black" />
      ) : (
        <IconSun fill="white" />
      )}
    </ActionIcon>
  );
};
