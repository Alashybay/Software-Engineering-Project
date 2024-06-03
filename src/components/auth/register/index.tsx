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
  Title,
  MultiSelect,
  NumberInput,
} from "@mantine/core";
import { RegisterForm } from "./registerForm";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import { useCreateNewUser } from "@/src/hooks/createUser";

export function Register(props: PaperProps) {
  const form = useForm();
  const router = useRouter();
  const createNewUser = useCreateNewUser();

  const handleSubmit = useCallback(() => {
    console.log(form.getDirty());
    handleModal();
  }, [form]);

  const handleSignUp = useCallback(() => {
    router.push("/signIn");
  }, [router]);

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   createNewUser.mutate({ newUserInfo: { name, email } });
  // };

  const handleModal = () => {
    modals.open({
      withCloseButton: false,
      centered: true,
      size: "lg",
      children: (
        <Stack>
          <Title order={4} fw="normal" ta="center">
            Help Us Personalize Your Experience
          </Title>
          <NumberInput
            label="What's your age?"
            description="Knowing your age helps us tailor our recommendations just for you!"
            placeholder="Enter your age"
            hideControls
          />
          <MultiSelect
            label="Choose Your Favorite Food Categories"
            description="Tell us what you love so we can recommend recipes you'll enjoy!"
            placeholder="Select your favorite categories"
            searchable
            data={[
              { value: "fast_food", label: "Fast Food" },
              { value: "italian", label: "Italian" },
              { value: "mexican", label: "Mexican" },
              { value: "indian", label: "Indian" },
              { value: "chinese", label: "Chinese" },
              { value: "vegetarian", label: "Vegetarian" },
              { value: "vegan", label: "Vegan" },
              { value: "desserts", label: "Desserts" },
              { value: "seafood", label: "Seafood" },
              { value: "gluten_free", label: "Gluten Free" },
              { value: "pizza", label: "Pizza" },
            ]}
          />
          <Group justify="right">
            <Button onClick={handleSubmit}>Save and Create Account</Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Paper radius="md" p="sm" withBorder {...props}>
      <Text size="lg" fw={500} ta="center">
        Welcome to Food Recipes
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <RegisterForm />
        <Group justify="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            size="xs"
            onClick={handleSignUp}
          >
            Already have an account? Login
          </Anchor>
          <Button type="submit" radius="xl" onClick={handleSubmit}>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
