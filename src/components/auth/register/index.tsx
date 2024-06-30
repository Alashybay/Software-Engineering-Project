import { useForm } from "@mantine/form";
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  TextInput,
  PasswordInput,
  NumberInput,
  Checkbox,
  MultiSelect,
} from "@mantine/core";
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCreateNewUser } from "@/src/hooks/createUser";
import ReCAPTCHA from "react-google-recaptcha";
import { User } from "@/src/typings/user";
import { hashString } from "@/src/utils/hashString";
import { notifications } from "@mantine/notifications";

export function Register(props: PaperProps) {
  const router = useRouter();
  const createNewUser = useCreateNewUser();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm({
    initialValues: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      is_admin: 0,
      user_preference: {
        cuisines: [],
        ingredients: [],
        allergies: [],
        glutenFreeOnly: false,
      },
      age: 0,
      is_sub: 0,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.email.includes("@")) {
        errors.email = "Invalid email";
      }

      if (values.password.length < 6) {
        errors.password = "Password should include at least 6 characters";
      }

      return errors;
    },
  });

  const handleRecaptcha = async () => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please complete the recaptcha");
    } else {
      alert("Recaptcha completed successfully");
    }
  };

  const handleSignUp = useCallback(() => {
    router.push("/signIn");
  }, [router]);

  const handleSubmit = useCallback(() => {
    const newUser: User = {
      firstname: form.values.firstname,
      surname: form.values.surname,
      email: form.values.email,
      password: hashString(form.values.password),
      age: form.values.age,
      user_preference: form.values.user_preference,
      is_admin: 0,
      is_sub: 0,
    };
    console.log(newUser);

    createNewUser.mutate({ newUserInfo: newUser });
    router.push("/signIn");
  }, [form, createNewUser]);

  return (
    <Paper radius="md" p="sm" withBorder {...props} mt="xl">
      <Text size="lg" fw={500} ta="center">
        Welcome to Food Recipes
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            label="First Name"
            placeholder="Your first name"
            value={form.values.firstname}
            onChange={(event) =>
              form.setFieldValue("firstname", event.currentTarget.value)
            }
            radius="md"
          />
          <TextInput
            label="Surname"
            placeholder="Your surname"
            value={form.values.surname}
            onChange={(event) =>
              form.setFieldValue("surname", event.currentTarget.value)
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
          <Divider label="Help Us Personalize Your Experience" />
          <NumberInput
            label="What's your age?"
            description="Knowing your age helps us tailor our recommendations just for you!"
            placeholder="Enter your age"
            hideControls
            {...form.getInputProps("age")}
          />
          <MultiSelect
            checkIconPosition="right"
            data={[
              { value: "fast_food", label: "Fast Food" },
              { value: "italian", label: "Italian" },
            ]}
            searchable
            nothingFoundMessage="Nothing found..."
            label="Which cuisines do you prefer?"
            description="Tell us what you love so we can recommend recipes you'll enjoy!"
            placeholder="Select your favorite cuisines"
            {...form.getInputProps("user_preference.cuisines")}
          />
          <Checkbox
            label="Gluten Free only?"
            checked={form.values.user_preference.glutenFreeOnly}
            onChange={(event) =>
              form.setFieldValue(
                "user_preference.glutenFreeOnly",
                event.currentTarget.checked
              )
            }
          />
          <MultiSelect
            checkIconPosition="right"
            data={[
              { value: "tomato", label: "Tomato" },
              { value: "nuts", label: "Nuts" },
            ]}
            searchable
            nothingFoundMessage="Nothing found..."
            label="What are your favorite ingredients?"
            placeholder="Select your favorite ingredients"
            {...form.getInputProps("user_preference.ingredients")}
          />
          <MultiSelect
            checkIconPosition="right"
            data={[
              { value: "tomato", label: "Tomato" },
              { value: "nuts", label: "Nuts" },
            ]}
            searchable
            nothingFoundMessage="Nothing found..."
            label="Do you have any allergies?"
            description="If you don't have any allergies then no need to select"
            placeholder="Select ingredient allergy"
            {...form.getInputProps("user_preference.allergies")}
          />
          <Checkbox
            label="I accept terms and conditions"
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
          />
          <Group justify="center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={"6LecIu8pAAAAAA_PycEY_c4y8ZoWKVtyFkrmB6Z1"}
              onChange={handleRecaptcha}
            />
          </Group>
        </Stack>
        <Group justify="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            size="xs"
            onClick={handleSignUp}
          >
            Already have an account? Login
          </Anchor>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={!form.values.email || !form.values.password}
          >
            Save and Create Account
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
