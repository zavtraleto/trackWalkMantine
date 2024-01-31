import { FC, useCallback, useEffect, useMemo, useState } from "react";

import {
  Button,
  Flex,
  Paper,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Box,
  ActionIcon,
} from "@mantine/core";
import styles from "./TrackWalk.module.css";
//TODO: Fix paths aliases
import { CircutLayout } from "../../../components/CircuitLayout/CircuitLayout";
import { TurnApp } from "../../../components/TurnApp/TurnApp";
import { TurnSettings } from "../../../components/TurnSettings/TurnSettings";

import RightIcon from "@assets/icons/chevron_right.svg?react";
import LeftIcon from "@assets/icons/chevron_left.svg?react";
import { Notes } from "../../../components/Notes/Notes";
import NotesPreview from "../../../components/NotesPreview/NotesPreview";
import { GeneralTrackData } from "../../../components/GeneralTrackData/GeneralTrackData";
import { CircuitData } from "../../CircuitData/CircuitData";
import { CircuitPinpoints } from "../../CircuitPinpoints/CircuitPinpoints";

type CircutState = "overall" | "pinpoints" | "notes";

export const TrackWalk: FC = () => {
  const [controlState, setControlState] = useState<CircutState>("overall");
  const [turnNumber, setTurnNumber] = useState(1);

  const NUM_OF_TURNS = 13;

  const turnHandler = useCallback(
    (type: "prev" | "next") => {
      if (type === "next" && turnNumber < NUM_OF_TURNS) {
        setTurnNumber(turnNumber + 1);
      } else if (type === "prev" && turnNumber > 1) {
        setTurnNumber(turnNumber - 1);
      }
    },
    [turnNumber]
  );

  useEffect(() => {
    if (controlState !== "pinpoints") {
      setControlState("pinpoints");
    }
  }, [turnNumber]);

  return (
    <Stack h="100%" justify="space-between" gap="0">
      <Paper style={{ width: "100%" }} p="md">
        <Flex justify="start" align="center">
          <Flex align="center" mr="auto">
            <ActionIcon
              variant="light"
              aria-label="Previous Turn"
              onClick={() => turnHandler("prev")}
              size="xs"
            >
              <LeftIcon className="icon-stroke" />
            </ActionIcon>
            <Title
              order={5}
              ta="center"
              tt="uppercase"
              className={styles.turnSelectorTitle}
              mr="5px"
              ml="5px"
            >
              Turn {turnNumber < 10 ? `0${turnNumber}` : turnNumber}
            </Title>
            <ActionIcon
              variant="light"
              aria-label="Next Turn"
              onClick={() => turnHandler("next")}
              size="xs"
            >
              <RightIcon className="icon-stroke" />
            </ActionIcon>
          </Flex>
          <Button.Group>
            <Button
              variant={controlState == "overall" ? "filled" : "light"}
              onClick={() => setControlState("overall")}
              size="xs"
            >
              Track
            </Button>
            <Button
              variant={controlState == "pinpoints" ? "filled" : "light"}
              onClick={() => setControlState("pinpoints")}
              size="xs"
            >
              Pinpoints
            </Button>
            <Button
              variant={controlState == "notes" ? "filled" : "light"}
              onClick={() => setControlState("notes")}
              size="xs"
            >
              Notes
            </Button>
          </Button.Group>
        </Flex>
      </Paper>
      <Paper style={{ width: "100%", height: "100%" }}>
        {controlState === "overall" && (
          <CircuitData turnNumber={turnNumber} setTurnNumber={setTurnNumber} />
        )}
        {controlState === "pinpoints" && (
          <CircuitPinpoints turnNumber={turnNumber} />
        )}
        {controlState === "notes" && (
          <>
            <NotesPreview />
            <Notes turnNumber={turnNumber} />
          </>
        )}
      </Paper>
    </Stack>
  );
};
