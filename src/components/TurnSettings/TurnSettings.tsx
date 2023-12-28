import {
  Box,
  Button,
  Flex,
  Group,
  NumberInput,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import { FC } from "react";
import styles from "./TurnSettings.module.css";

export const TurnSettings: FC = () => {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Title order={1} ta="center" tt="uppercase">
          Turn 01
        </Title>
        <Group>
          <Button radius="xl" size="lg" variant="light" color="raceLime">
            Overall
          </Button>
          <Button radius="xl" size="lg" variant="filled" color="raceLime">
            Pinpoints
          </Button>
          <Button radius="xl" size="lg" variant="light" color="raceLime">
            Notes
          </Button>
        </Group>
      </Flex>
      <Flex justify="start" align="center" mt="lg">
        <Box className={styles.setting}>
          <span className={styles.settingName}>Minimum Speed</span>
          <NumberInput
            size="lg"
            w={70}
            min={100}
            max={300}
            maxLength={3}
            hideControls
            radius="md"
            className={styles.input}
          />
          <span className={styles.settingUnit}>km/h</span>
        </Box>
        <Box className={styles.setting}>
          <span className={styles.settingName}>Brake Pressure</span>
          <NumberInput
            size="lg"
            w={70}
            min={80}
            max={175}
            maxLength={3}
            hideControls
            radius="md"
            className={styles.input}
          />
          <span className={styles.settingUnit}>Bar</span>
        </Box>
      </Flex>
      <Flex justify="start" align="center" mt="lg">
        <Box className={styles.selector}>
          <div className={styles.selectorName}>Apex</div>
          <SegmentedControl
            className={styles.selectorControl}
            color="lime"
            data={["Early", "Normal", "Later"]}
            size="lg"
          />
        </Box>
        <Box className={styles.selector}>
          <div className={styles.selectorName}>Asphalt Grip Rate</div>
          <SegmentedControl
            className={styles.selectorControl}
            color="lime"
            data={["1", "2", "3", "4", "5"]}
            size="lg"
          />
        </Box>
      </Flex>
    </>
  );
};
