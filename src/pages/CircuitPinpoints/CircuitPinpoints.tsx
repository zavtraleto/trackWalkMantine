import { Button, Drawer, ScrollArea, Stack, Tabs } from "@mantine/core";
import { FC, useCallback, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { TurnApp } from "../../components/TurnApp/TurnApp";
import { TurnSettings } from "../../components/TurnSettings/TurnSettings";
import curva1 from "@assets/img/curva_1_2.png";
import curva2 from "@assets/img/curva_2.png";
import ChevronUpIcon from "@assets/icons/chevron_up.svg?react";
import { TurnPinpoints } from "../../components/TurnPinpoints/TurnPinpoints";
import TurnAppKonva from "../../components/TurnApp/TurnAppKonva";

type CircuitPinpointsProps = {
  turnNumber: number;
};

export const CircuitPinpoints: FC<CircuitPinpointsProps> = ({ turnNumber }) => {
  const [turnSettings, setTurnSettings] = useState({});
  const [turnPinpoints, setTurnPinpoints] = useState({});
  const [opened, { open, close }] = useDisclosure(false);

  const currentTurnImage = useCallback(
    (turn) => {
      if (turn == 1) {
        return curva1;
      } else if (turn == 2) {
        return curva2;
      } else return curva1;
    },
    [turnNumber]
  );

  return (
    <Stack justify="space-between" h="100%" gap="0">
      <TurnApp
        src={currentTurnImage(turnNumber)}
        turnNumber={turnNumber}
        turnPinpoints={turnPinpoints}
        setTurnPinpoints={setTurnPinpoints}
      />

      <Tabs defaultValue="settings">
        <Tabs.List>
          <Tabs.Tab value="settings">Turn {turnNumber} Settings</Tabs.Tab>
          <Tabs.Tab value="pinpoints">Turn Notes</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="settings" pt="md" pb="md">
          <TurnSettings
            turnNumber={turnNumber}
            turnSettings={turnSettings}
            setTurnSettings={setTurnSettings}
          />
        </Tabs.Panel>
        <Tabs.Panel value="pinpoints" pt="md" pb="md">
          <TurnPinpoints
            turnNumber={turnNumber}
            turnPinpoints={turnPinpoints}
            setTurnPinpoints={setTurnPinpoints}
          />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
