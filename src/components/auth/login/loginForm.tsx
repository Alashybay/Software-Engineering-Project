import { hashString } from "@/src/utils/hashString";
import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Anchor,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleClick = useCallback(() => {
    router.push("/forgotPassword");
    console.log("redirected to forgotPassword page");
  }, [router]);

  const onSubmit = async (values: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: hashString(values.password),
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/posts"); 
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" onClick={handleClick}>
            Forgot password?
          </Anchor>
        </Group>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
}
