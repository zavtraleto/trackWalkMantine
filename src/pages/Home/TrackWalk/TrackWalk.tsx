import { FC, useState } from "react";
import curva from "@assets/img/curva.png";
import {
  Button,
  Flex,
  Paper,
  Stack,
  Title,
  Text,
  Popover,
  SimpleGrid,
  Box,
} from "@mantine/core";
import styles from "./TrackWalk.module.css";
//TODO: Fix paths aliases
import { CircutLayout } from "../../../components/CircuitLayout/CircuitLayout";
import { TurnApp } from "../../../components/TurnApp/TurnApp";
import { TurnSettings } from "../../../components/TurnSettings/TurnSettings";

type CircutState = "overall" | "pinpoints" | "notes";

export const TrackWalk: FC = () => {
  const [controlState, setControlState] = useState<CircutState>("overall");
  const [turnNumber, setTurnNumber] = useState(1);
  const [turnSettings, setTurnSettings] = useState({});
  const NUM_OF_TURNS = 13;
  const turnsAsArray = Array.from(Array(NUM_OF_TURNS).keys()).map(
    (turn) => turn + 1
  );
  return (
    <Stack h="100%" justify="space-between" gap="md">
      <Paper style={{ width: "100%" }} p="md">
        <Flex justify="start" align="center">
          <Button.Group>
            <Button
              variant={controlState == "overall" ? "filled" : "light"}
              onClick={() => setControlState("overall")}
            >
              Overall
            </Button>
            <Button
              variant={controlState == "pinpoints" ? "filled" : "light"}
              onClick={() => setControlState("pinpoints")}
            >
              Pinpoints
            </Button>
            <Button
              variant={controlState == "notes" ? "filled" : "light"}
              onClick={() => setControlState("notes")}
            >
              Notes
            </Button>
          </Button.Group>
          <Box ml="xl">
            <Popover width={320} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Title
                  order={2}
                  ta="center"
                  tt="uppercase"
                  w={120}
                  className={styles.turnSelectorTitle}
                >
                  Turn {turnNumber}
                </Title>
              </Popover.Target>
              <Popover.Dropdown>
                <SimpleGrid cols={4} spacing="sm" p="sm">
                  {turnsAsArray.map((turn) => (
                    <Button
                      variant={turnNumber == turn ? "outline" : "light"}
                      onClick={() => setTurnNumber(turn)}
                      key={turn}
                    >
                      {turn}
                    </Button>
                  ))}
                </SimpleGrid>
              </Popover.Dropdown>
            </Popover>
          </Box>
          <Box ml="auto">
            <Popover width={400} position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <Button variant="outline">Track Info</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Title order={1} ta="center" tt="uppercase">
                  Estoril
                </Title>
                <SimpleGrid cols={2} spacing="md" p="md">
                  <Box>
                    <Text size="sm">Length</Text>
                    <Text size="xl" fw={800}>
                      4.182 km
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm">Direction</Text>
                    <Text size="xl" fw={800}>
                      Clockwise
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm">Turns</Text>
                    <Text size="xl" fw={800}>
                      13
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm">Version</Text>
                    <Text size="xl" fw={800}>
                      XXX
                    </Text>
                  </Box>
                </SimpleGrid>
              </Popover.Dropdown>
            </Popover>
          </Box>
        </Flex>
      </Paper>
      <Paper style={{ width: "100%", height: "100%" }}>
        {controlState === "overall" && (
          <CircutLayout setTurnNumber={setTurnNumber} turnNumber={turnNumber} />
        )}
        {controlState === "pinpoints" && <TurnApp src={curva} />}
      </Paper>
      <Paper style={{ width: "100%" }} p="xl">
        {controlState === "overall" && (
          <TurnSettings
            turnNumber={turnNumber}
            turnSettings={turnSettings}
            setTurnSettings={setTurnSettings}
          />
        )}
      </Paper>
    </Stack>
  );
};
