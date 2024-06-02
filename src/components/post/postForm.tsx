import {
  TextInput,
  Textarea,
  Select,
  Stack,
  Title,
  Paper,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export function PostForm() {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Paper p="lg" shadow="md" radius="md" withBorder>
        <Stack>
          <Title order={4} ta="center">
            Create a new recipe
          </Title>
          <TextInput
            label="Recipe Title"
            placeholder="I love Pizza"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Recipe Description"
            description="Add some love and detail to make it irresistible!"
            placeholder="Describe your amazing recipe here..."
            {...form.getInputProps("description")}
          />
          <Select
            label="Food Category"
            placeholder="Select your favorite category"
            searchable
            clearable
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
            {...form.getInputProps("category")}
          />
          <Group justify="right">
            <Button color="blue" variant="gradient" type="submit">
              Create Recipe
            </Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
}
