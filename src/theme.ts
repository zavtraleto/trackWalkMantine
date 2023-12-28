import { MantineColorsTuple, createTheme } from "@mantine/core";

const raceLime: MantineColorsTuple = [
  "#f9ffe1",
  "#f3fecc",
  "#e9fc9c",
  "#ddfa67",
  "#d2f93c",
  "#ccf81f",
  "#c8f709",
  "#b0dc00",
  "#9bc300",
  "#84a900",
];

export const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  headings: { fontFamily: "Poppins, sans-serif" },
  colors: { raceLime },
});
