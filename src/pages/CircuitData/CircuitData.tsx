import { FC } from "react";
import { CircutLayout } from "../../components/CircuitLayout/CircuitLayout";
import { GeneralTrackData } from "../../components/GeneralTrackData/GeneralTrackData";
import { Stack } from "@mantine/core";

type CircutLayoutProps = {
  turnNumber: number;
  setTurnNumber: (turnNumber: number) => void;
};

export const CircuitData: FC<CircutLayoutProps> = ({
  turnNumber,
  setTurnNumber,
}) => {
  return (
    <Stack justify="space-between" h="100%" gap="0">
      <CircutLayout turnNumber={turnNumber} setTurnNumber={setTurnNumber} />
      <GeneralTrackData />
    </Stack>
  );
};
