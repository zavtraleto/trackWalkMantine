import { MantineColorsTuple, createTheme } from "@mantine/core";

const raceLime: MantineColorsTuple = [
  "#f6fce5",
  "#edf6d4",
  "#dbebae",
  "#c9e083",
  "#b8d65e",
  "#aed047",
  "#a8cd39",
  "#92b52a",
  "#81a121",
  "#6d8b12",
];

export const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  headings: { fontFamily: "Poppins, sans-serif" },
  primaryColor: "raceLime",
  colors: { raceLime },
});
