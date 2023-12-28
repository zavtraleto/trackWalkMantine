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

export const Register: FC = () => {
  const navigate = useNavigate();

  const signUp = (data) => {
    const { name, email, nationality, residenceCity } = data;
    if (
      typeof name === "string" &&
      typeof email === "string" &&
      typeof nationality === "string" &&
      typeof residenceCity === "string"
    ) {
      navigate("/");
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      nationality: "",
      residenceCity: "",
    },

    validate: {
      name: isNotEmpty("Enter your name"),
      email: isEmail("Invalid email"),
      nationality: isNotEmpty("Select your nationality"),
      residenceCity: isNotEmpty("Select your residence city"),
    },
  });

  return (
    <Center style={{ height: "100vh" }}>
      <form onSubmit={form.onSubmit((data) => signUp(data))}>
        <Container size={520} my={40} miw={450}>
          <Paper withBorder shadow="md" p={50} mt={50} radius="md">
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
            <FileInput
              mb="md"
              clearable
              label="Upload files"
              placeholder="Upload files"
            />
            <TextInput
              mb="md"
              label="Name"
              placeholder="Your name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              mb="md"
              label="Email"
              placeholder="your@email.pt"
              required
              {...form.getInputProps("email")}
            />
            <Autocomplete
              mb="md"
              label="Nationality"
              placeholder="Pick value or enter anything"
              data={["Portugal", "Spain", "Netherlands", "United Kingdom"]}
              {...form.getInputProps("nationality")}
            />
            <Autocomplete
              mb="md"
              label="City"
              placeholder="Pick value or enter anything"
              data={["Portugal", "Madrid", "Amsterdam", "London"]}
              {...form.getInputProps("residenceCity")}
            />
            <Button
              radius="xl"
              color="lime"
              fullWidth
              mt="xl"
              size="lg"
              type="submit"
            >
              Register
            </Button>
            <Text ta="center" mt="md">
              Don&apos;t have an account?{" "}
              <Anchor
                c="lime"
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
