import {
  useMantineColorScheme,
  useComputedColorScheme,
  Switch,
} from "@mantine/core";
import { FC } from "react";

export const ThemeToggle: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Switch
      checked={computedColorScheme === "dark"}
      onChange={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      aria-label="Toggle color scheme"
      size="sm"
      color="raceLime"
    />
  );
};
