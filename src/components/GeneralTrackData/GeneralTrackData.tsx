import {
  Title,
  SimpleGrid,
  Box,
  Text,
  Tabs,
  Card,
  ActionIcon,
  Flex,
  Menu,
} from "@mantine/core";
import { FC } from "react";
import IconInfo from "@assets/icons/info.svg?react";
import IconNotes from "@assets/icons/notes.svg?react";
import AddIcon from "@assets/icons/add.svg?react";

export const GeneralTrackData: FC = () => {
  return (
    <>
      <Tabs radius="xs" defaultValue="details">
        <Tabs.List>
          <Tabs.Tab
            value="details"
            leftSection={
              <IconInfo className="icon-stroke" width="18px" height="18px" />
            }
          >
            Track Details
          </Tabs.Tab>
          <Tabs.Tab
            value="notes"
            leftSection={
              <IconNotes className="icon-stroke" width="18px" height="18px" />
            }
          >
            Track Notes
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <>
            <Title order={1} p="lg" tt="uppercase">
              Autódromo Fernanda Pires da Silva
            </Title>
            <SimpleGrid
              cols={{ base: 2, sm: 2, md: 4, lg: 4 }}
              spacing="lg"
              p="lg"
            >
              <Box>
                <Text size="sm">Length</Text>
                <Text size="xl" fw={800}>
                  4.182 m
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
                  Grand Prix
                </Text>
              </Box>
              <Box>
                <Text size="sm">Location</Text>
                <Text size="xl" fw={800}>
                  Estoril, Portugal
                </Text>
              </Box>
              <Box>
                <Text size="sm">Airport</Text>
                <Text size="xl" fw={800}>
                  Lisboa (LIS)
                </Text>
              </Box>
              <Box>
                <Text size="sm">Right Turns</Text>
                <Text size="xl" fw={800}>
                  9
                </Text>
              </Box>
              <Box>
                <Text size="sm">Left Turns</Text>
                <Text size="xl" fw={800}>
                  4
                </Text>
              </Box>
            </SimpleGrid>
          </>
        </Tabs.Panel>

        <Tabs.Panel value="notes">
          <Flex align="center" p="lg">
            <Card padding="lg" radius="md" withBorder miw="20vw">
              <Menu
                transitionProps={{ transition: "pop-top-right" }}
                position="top-end"
                width={150}
                withinPortal
              >
                <Menu.Target>
                  <Flex align="center" justify="center" h="100%">
                    <ActionIcon variant="transparent" size="xl">
                      <AddIcon className="icon-stroke" />
                    </ActionIcon>
                  </Flex>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Photo</Menu.Item>
                  <Menu.Item>File</Menu.Item>
                  <Menu.Item>Audio</Menu.Item>
                  <Menu.Item>Notes</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Card>
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
