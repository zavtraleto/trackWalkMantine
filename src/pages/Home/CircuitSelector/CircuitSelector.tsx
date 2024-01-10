import { FC, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Grid,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Estoril from "@assets/img/circuits/estoril.svg?react";
import Monza from "@assets/img/circuits/monza.svg?react";
import Barcelona from "@assets/img/circuits/barcelona.svg?react";
import Spa from "@assets/img/circuits/spa.svg?react";
import Suzuka from "@assets/img/circuits/suzuka.svg?react";

const TRACK_MOCK = [
  { name: "Estoril", id: 1, img: <Estoril width="100%" height="100%" /> },
  { name: "Monza", id: 2, img: <Monza width="100%" height="100%" /> },
  { name: "Barcelona", id: 3, img: <Barcelona width="100%" height="100%" /> },
  { name: "Spa-Francorchamps", id: 4, img: <Spa width="100%" height="100%" /> },
  { name: "Suzuka", id: 5, img: <Suzuka width="100%" height="100%" /> },
];

export const CircuitSelector: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const filteredTracks = TRACK_MOCK.filter((track) =>
    track.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Stack h="100%" justify="flex-start" gap="md">
      <Paper style={{ width: "100%" }} p="md">
        <Flex justify="space-between" align="center">
          <Title order={2}>Circuits</Title>
          <TextInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            placeholder="Circuit Search"
          />
        </Flex>
      </Paper>
      <Paper style={{ width: "100%" }} p="md">
        <Grid justify="flex-start" align="stretch">
          {filteredTracks.map((track) => (
            <Grid.Col span={4} key={track.id}>
              <Card padding="lg" radius="md" withBorder key={track.id} h="100%">
                <Card.Section
                  style={{ maxHeight: "200px" }}
                  h={200}
                  p="md"
                  mb="md"
                >
                  {track.img}
                </Card.Section>
                <Button variant="outline" fw={500}>
                  {track.name}
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
    </Stack>
  );
};
