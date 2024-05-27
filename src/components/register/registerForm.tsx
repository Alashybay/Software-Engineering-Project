import { Stack, TextInput, PasswordInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";

export function RegisterForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Stack>
      <TextInput
        label="Name"
        placeholder="Your name"
        value={form.values.name}
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        radius="md"
      />

      <TextInput
        required
        label="Email"
        placeholder="your@email.com"
        value={form.values.email}
        key={form.key("email")}
        {...form.getInputProps("email")}
        error={form.errors.email && "Invalid email"}
        radius="md"
      />

      <PasswordInput
        required
        label="Password"
        placeholder="Your password"
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue("password", event.currentTarget.value)
        }
        error={
          form.errors.password &&
          "Password should include at least 6 characters"
        }
        radius="md"
      />

      <Checkbox
        label="I accept terms and conditions"
        checked={form.values.terms}
        onChange={(event) =>
          form.setFieldValue("terms", event.currentTarget.checked)
        }
      />
    </Stack>
  );
}
