import {
  Box,
  NumberInput,
  SegmentedControl,
  Text,
  SimpleGrid,
  Button,
  Flex,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import styles from "./TurnSettings.module.css";

type TurnSettingsProps = {
  turnNumber: number;
  turnSettings: Record<string, any>;
  setTurnSettings: (settings: Record<string, any>) => void;
};

export const TurnSettings: FC<TurnSettingsProps> = ({
  turnNumber,
  turnSettings,
  setTurnSettings,
}) => {
  const [localSettings, setLocalSettings] = useState(
    turnSettings[turnNumber] || {}
  );

  useEffect(() => {
    setLocalSettings(turnSettings[turnNumber] || {});
  }, [turnNumber, turnSettings]);

  const handleSettingChange = (settingName, value) => {
    setLocalSettings({ ...localSettings, [settingName]: value });
  };

  const saveSettings = () => {
    setTurnSettings({ ...turnSettings, [turnNumber]: localSettings });
  };

  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 1, lg: 3 }}
        spacing="xl"
        verticalSpacing="xl"
        className={styles.wrapper}
      >
        <Box className={styles.setting}>
          <span className={styles.settingName}>Gear Shift</span>
          <NumberInput
            size="lg"
            w={50}
            min={1}
            max={8}
            maxLength={1}
            hideControls
            radius="xl"
            className={styles.input}
            onChange={(value) => handleSettingChange("gearShiftBottom", value)}
            value={localSettings.gearShiftBottom || 1}
          />
          <span className={styles.settingUnit}>to</span>
          <NumberInput
            size="lg"
            w={50}
            min={1}
            max={8}
            maxLength={1}
            hideControls
            radius="xl"
            className={styles.input}
            onChange={(value) => handleSettingChange("gearShiftTop", value)}
            value={localSettings.gearShiftTop || 1}
          />
        </Box>
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
            onChange={(value) => handleSettingChange("minimumSpeed", value)}
            value={localSettings.minimumSpeed || 100}
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
            onChange={(value) => handleSettingChange("brakePressure", value)}
            value={localSettings.brakePressure || 100}
          />
          <span className={styles.settingUnit}>Bar</span>
        </Box>

        <Box className={styles.selector}>
          <Text className={styles.selectorName}>Apex</Text>
          <SegmentedControl
            className={styles.selectorControl}
            classNames={{
              root: styles.root,
              control: styles.control,
              label: styles.label,
              indicator: styles.indicator,
            }}
            color="raceLime"
            data={["Early", "Normal", "Later"]}
            size="lg"
            onChange={(value) => handleSettingChange("apex", value)}
            value={localSettings.apex || "Normal"}
          />
        </Box>
        <Box className={styles.selector}>
          <Text className={styles.selectorName}>Asphalt Grip Rate</Text>
          <SegmentedControl
            className={styles.selectorControl}
            classNames={{
              root: styles.root,
              control: styles.control,
              label: styles.label,
              indicator: styles.indicator,
            }}
            color="raceLime"
            data={["1", "2", "3", "4", "5"]}
            size="lg"
            onChange={(value) => handleSettingChange("asphaltGripRate", value)}
            value={localSettings.asphaltGripRate || "3"}
          />
        </Box>
        <Box className={styles.selector}>
          <Text className={styles.selectorName}>Strategy</Text>
          <SegmentedControl
            className={styles.selectorControl}
            classNames={{
              root: styles.root,
              control: styles.control,
              label: styles.label,
              indicator: styles.indicator,
            }}
            color="raceLime"
            data={["Overtaking", "Defensive"]}
            size="lg"
            onChange={(value) => handleSettingChange("strategy", value)}
            value={localSettings.strategy || "Overtaking"}
          />
        </Box>
      </SimpleGrid>
    </>
  );
};
