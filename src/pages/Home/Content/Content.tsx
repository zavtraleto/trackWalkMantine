import { FC } from "react";
import { TurnApp } from "@components/TurnApp/TurnApp";
import curva from "@assets/img/curva.png";
import { Box, Button, Flex, Group, Paper, Stack, Title } from "@mantine/core";
import { TurnSettings } from "@components/TurnSettings/TurnSettings";

export const Content: FC = () => {
  return (
    <Stack h="100%" justify="space-between" gap="md">
      <Paper style={{ height: "60vh", width: "100%" }}>
        <TurnApp src={curva} />
      </Paper>
      <Paper style={{ height: "30vh", width: "100%" }} p="xl">
        <TurnSettings />
      </Paper>
    </Stack>
  );
};
