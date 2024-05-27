import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { RegisterForm } from "./registerForm";
import { useCallback } from "react";
// import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';

export function Register(props: PaperProps) {
  const form = useForm();
  const handleSubmit = useCallback(() => {
    console.log(form.getDirty());
  }, [form]);
  return (
    <Paper radius="md" p="sm" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine
      </Text>

      {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <RegisterForm />
        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" size="xs">
            {"Already have an account? Login"}
          </Anchor>
          <Button type="submit" radius="xl" onClick={handleSubmit}>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
