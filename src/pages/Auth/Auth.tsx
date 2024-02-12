import {
  Container,
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Box,
  Center,
  Anchor,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { addChamp, getUserByEmail } from "../../service/api";
import { useMutation, useQuery } from "react-query";
import { notifications } from "@mantine/notifications";

export const Auth: FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Enter your password"),
    },
  });

  const { data: userFromServerData, refetch } = useQuery(
    "getUserByEmail",
    () => getUserByEmail(form.values.email),
    {
      enabled: false,
      onSuccess: () => {},
      onError: () => {
        notifications.show({
          title: "Authentication error",
          message: "User not found",
          color: "red",
        });
      },
    }
  );

  const signIn = (data) => {
    const { email, password } = data;
    refetch();
    // if (typeof email === "string" && typeof password === "string") {
    //   if (userFromServerData.password === password) {
    //     localStorage.setItem("user", JSON.stringify({ isAuthenticated: true }));
    //     navigate("/");
    //   }
    // }
  };

  return (
    <Center style={{ height: "100vh" }} className={styles.container}>
      <form onSubmit={form.onSubmit((data) => signIn(data))}>
        <Container size={520} my={40} miw={320}>
          <Paper withBorder shadow="md" p="xl" mt="xl" radius="md">
            <Box>
              <Title order={1} ta="center" tt="uppercase">
                Get Started
              </Title>
              <Title
                order={2}
                ta="center"
                mb="lg"
                tt="uppercase"
                className={styles.subtitle}
              >
                Sign In
              </Title>
            </Box>
            <TextInput
              label="Email"
              placeholder="your@email.pt"
              required
              mb="md"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mb="md"
              {...form.getInputProps("password")}
            />
            <Button radius="xl" fullWidth mt="xl" type="submit">
              Sign in
            </Button>

            <Text ta="center" mt="md">
              Don&apos;t have an account?{" "}
              <Anchor
                fw={700}
                underline="hover"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/register");
                }}
              >
                Register
              </Anchor>
            </Text>
          </Paper>
        </Container>
      </form>
    </Center>
  );
};
