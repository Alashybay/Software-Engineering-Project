import { hashString } from "@/src/utils/hashString";
import { TextInput, PasswordInput, Anchor, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: hashString(values.password),
    });

    if (res?.error) {
      notifications.show({
        title: "Error",
        message: res.error,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "You have successfully signed in",
        color: "green",
      });
      router.push("/posts");
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="xs">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          {...form.getInputProps("email")}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          required
        />
        <Button fullWidth type="submit">
          Sign in
        </Button>
        <Anchor
          component="button"
          size="sm"
          onClick={() => router.push("/forgotPassword")}
        >
          Forgot password?
        </Anchor>
      </Stack>
    </form>
  );
}
