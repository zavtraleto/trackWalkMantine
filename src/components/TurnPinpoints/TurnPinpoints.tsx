import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { FC } from "react";
import IconEdit from "@assets/icons/edit.svg?react";
import IconDelete from "@assets/icons/delete.svg?react";

type TurnPinpointsProps = {
  turnNumber: number;
  turnPinpoints: {};
  setTurnPinpoints: React.Dispatch<React.SetStateAction<any[]>>;
};

export const TurnPinpoints: FC<TurnPinpointsProps> = ({
  turnNumber,
  turnPinpoints,
  setTurnPinpoints,
}) => {
  const handleDeletePinpoint = (idx: number) => {
    let updatedPinpoints = { ...turnPinpoints };
    updatedPinpoints[turnNumber] = updatedPinpoints[turnNumber].filter(
      (pinpoint: any, index: number) => index !== idx
    );
    setTurnPinpoints(updatedPinpoints);
  };

  return (
    <ScrollArea h={180}>
      <Stack bg="var(--mantine-color-body)">
        {turnPinpoints[turnNumber]?.map((pinpoint, idx) => {
          return (
            <>
              <Flex justify="space-between" align="center" key={pinpoint.x}>
                <Text tt="uppercase" fw={800}>
                  {pinpoint.type}
                </Text>
                <Group ml="auto">
                  <ActionIcon
                    size="lg"
                    variant="default"
                    aria-label="Edit turn pinpoints"
                    p="8"
                    radius="xl"
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    size="lg"
                    variant="default"
                    aria-label="Delete turn pinpoints"
                    p="8"
                    radius="xl"
                    onClick={() => handleDeletePinpoint(idx)}
                  >
                    <IconDelete />
                  </ActionIcon>
                </Group>
              </Flex>
              <Divider />
            </>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};
