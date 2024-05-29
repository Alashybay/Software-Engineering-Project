import { useForm } from "@mantine/form";
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
} from "@mantine/core";
import { RegisterForm } from "./registerForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function Register(props: PaperProps) {
  const form = useForm();
  const router = useRouter();
  const handleSubmit = useCallback(() => {
    console.log(form.getDirty());
  }, [form]);

  const handleSignUp = useCallback(() => {
    router.push("/signIn");
  }, [router]);

  return (
    <Paper radius="md" p="sm" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Food Recipes
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <RegisterForm />
        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            size="xs"
            onClick={handleSignUp}
          >
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
