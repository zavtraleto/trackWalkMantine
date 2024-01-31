import {
  ActionIcon,
  Button,
  Card,
  Center,
  Flex,
  Menu,
  Text,
  Image,
  ScrollArea,
} from "@mantine/core";
import React from "react";
import styles from "./Notes.module.css";
import AddIcon from "@assets/icons/add.svg?react";
import MicrophoneIcon from "@assets/icons/microphone.svg?react";
import NoteIcon from "@assets/icons/note.svg?react";

interface NotesProps {
  turnNumber?: number;
}

export const Notes: React.FC<NotesProps> = ({}) => {
  return (
    <ScrollArea w="100%">
      <Flex align="stretch" gap="md" className={styles.row}>
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
        <Card padding="lg" radius="md" withBorder miw="20vw">
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1560692830-04adc2f31119?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              h={160}
            />
          </Card.Section>
        </Card>
        <Card padding="lg" radius="md" withBorder miw="20vw">
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1560692830-0a8209e6f526?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              h={160}
            />
          </Card.Section>
        </Card>
        <Card padding="lg" radius="md" withBorder miw="20vw">
          <Flex align="center" justify="center" h="100%">
            <ActionIcon variant="transparent" size="xl">
              <NoteIcon className="icon-stroke" />
            </ActionIcon>
          </Flex>
        </Card>
        <Card padding="lg" radius="md" withBorder miw="20vw">
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1638820371262-862f2a0bde6b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              h={160}
            />
          </Card.Section>
        </Card>
        <Card padding="lg" radius="md" withBorder miw="20vw">
          <Flex align="center" justify="center" h="100%">
            <ActionIcon variant="transparent" size="xl">
              <MicrophoneIcon className="icon-stroke" />
            </ActionIcon>
          </Flex>
        </Card>
      </Flex>
    </ScrollArea>
  );
};
