import { FC, useState } from "react";
import { TurnApp } from "@components/TurnApp/TurnApp";
import curva from "@assets/img/curva.png";
import {
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  Popover,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { TurnSettings } from "@components/TurnSettings/TurnSettings";
import { TurnSelector } from "@components/TurnSelector/TurnSelector";

type CircutState = "overall" | "pinpoints" | "notes";

export const TrackWalk: FC = () => {
  const [controlState, setControlState] = useState<CircutState>("overall");
  const [turnNumber, setTurnNumber] = useState(1);
  const [turnSettings, setTurnSettings] = useState({});

  return (
    <Stack h="100%" justify="space-between" gap="md">
      <Paper style={{ width: "100%" }} p="md">
        <Flex justify="space-between" align="center">
          <Text size="xl" fw={800}>
            Estoril Circuit (Portugal)
          </Text>
          <Popover width={400} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <Button color="raceLime" variant="light">
                Track Info
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
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
        </Flex>
      </Paper>
      <Paper style={{ width: "100%" }}>
        {controlState === "overall" && (
          <TurnSelector setTurnNumber={setTurnNumber} />
        )}
        {controlState === "pinpoints" && <TurnApp src={curva} />}
      </Paper>
      <Paper style={{ width: "100%" }} p="xl">
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={1} ta="center" tt="uppercase">
            Turn {turnNumber}
          </Title>
          <Group>
            <Button
              radius="xl"
              size="lg"
              variant={controlState == "overall" ? "filled" : "light"}
              color="raceLime"
              onClick={() => setControlState("overall")}
            >
              Overall
            </Button>
            <Button
              radius="xl"
              size="lg"
              variant={controlState == "pinpoints" ? "filled" : "light"}
              color="raceLime"
              onClick={() => setControlState("pinpoints")}
            >
              Pinpoints
            </Button>
            <Button
              radius="xl"
              size="lg"
              variant={controlState == "notes" ? "filled" : "light"}
              color="raceLime"
              onClick={() => setControlState("notes")}
            >
              Notes
            </Button>
          </Group>
        </Flex>
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
