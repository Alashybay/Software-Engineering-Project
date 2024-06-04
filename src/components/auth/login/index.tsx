import {
  Anchor,
  Paper,
  Title,
  Text,
  Container
} from "@mantine/core";
import classes from "../../../styles/Login.module.css";
import { LoginForm } from "./loginForm";

export function Login() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Food Recepies
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" href="/signUp">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
}
