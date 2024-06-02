import {
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

export default function CreatePost() {
  return (
    <Paper shadow="md" radius="md" p="md" withBorder>
      <Stack>
        <Title order={4} ta="center">
          Share Your Delicious Recipe
        </Title>
        <TextInput label="Recipe Title" placeholder="I love Pizza" />
        <Textarea
          label="Recipe Description"
          description="Add some love and detail to make it irresistible!"
          placeholder="Describe your amazing recipe here..."
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
        />
        <Group justify="right">
          <Button>Save and Post</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
