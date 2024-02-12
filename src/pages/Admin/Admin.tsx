import {
  Button,
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
  Text,
} from "@mantine/core";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { addChamp } from "../../service/api";
import { notifications } from "@mantine/notifications";

export const Admin: FC = (props) => {
  const [championship, setChampionship] = useState<{
    carCategoryId: number | string;
    championshipName: string;
  }>({
    carCategoryId: 1,
    championshipName: "",
  });

  const { mutate: createChamp } = useMutation(addChamp, {
    onSuccess: (data) => {
      notifications.show({
        title: "Championship created",
        message: "Championship created successfully",
        color: "green",
      });
    },
    onError: (error) => {},
  });

  const createChampHandle = () => {
    createChamp({ carCategoryId: 1, name: "Test" });
  };

  return (
    <SimpleGrid cols={3} p="md">
      <Card>
        <Text>Create Championship</Text>
        <NumberInput
          label="Car Category ID"
          value={championship.carCategoryId}
          onChange={(event) =>
            setChampionship({
              ...championship,
              carCategoryId: event,
            })
          }
        />
        <TextInput
          label="Name"
          value={championship.championshipName}
          onChange={(event) =>
            setChampionship({
              ...championship,
              championshipName: event.currentTarget.value,
            })
          }
        />
        <Button onClick={createChampHandle}>Create Champ</Button>
      </Card>
    </SimpleGrid>
  );
};
