import {
  Container,
  Title,
  Paper,
  TextInput,
  Button,
  Box,
  Center,
  FileInput,
  Autocomplete,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useMutation } from "react-query";
import { signUpUser } from "../../service/api";
import { notifications } from "@mantine/notifications";

export const Register: FC = () => {
  const navigate = useNavigate();

  const { mutate: signUpHandler } = useMutation(signUpUser, {
    onSuccess: (data) => {
      navigate("/");
      localStorage.setItem("user", JSON.stringify({ isAuthenticated: true }));
      notifications.show({
        title: "User created",
        message: "User created successfully",
        color: "green",
      });
    },
    onError: (error) => {},
  });

  const signUp = (data) => {
    const { email, password } = data;
    if (typeof password === "string" && typeof email === "string") {
      signUpHandler(data);
    }
  };

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

  return (
    <Center style={{ height: "100vh" }} className={styles.container}>
      <form onSubmit={form.onSubmit((data) => signUp(data))}>
        <Container size={520} my={40} miw={320}>
          <Paper withBorder shadow="md" p="xl" radius="md">
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
                Register
              </Title>
            </Box>

            <TextInput
              mb="md"
              label="Email"
              placeholder="your@email.pt"
              required
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />
            <Button
              radius="xl"
              color="raceLime"
              fullWidth
              mt="xl"
              type="submit"
            >
              Register
            </Button>
            <Text ta="center" mt="md">
              Already have account?{" "}
              <Anchor
                c="raceLime"
                fw={700}
                underline="hover"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login");
                }}
              >
                Sign In
              </Anchor>
            </Text>
          </Paper>
        </Container>
      </form>
    </Center>
  );
};
