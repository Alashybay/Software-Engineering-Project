import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "../../styles/Login.module.css";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    // router.push("/forgotPassword");
    console.log("redirected to forgotPassword page");
  }, [router]);

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Food Recepies
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" onClick={handleClick}>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
