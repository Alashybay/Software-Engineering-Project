import {
  TextInput,
  Textarea,
  Select,
  Stack,
  Title,
  Paper,
  Button,
  Group,
  Rating,
  Text,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { Ingredient, Post } from "../../typings/post";
import { useCreateNewPost } from "@/src/hooks/createPost";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export function PostForm() {
  const { data } = useSession();
  const createPost = useCreateNewPost();
  const router = useRouter();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", weight: "" },
  ]);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      cuisine: "",
      rating: 0,
      author_id: 0,
      glutenFree: false,
    },
  });

  const handleSubmit = useCallback(() => {
    const values = form.getValues();
    if (!data) {
      return null;
    }
    const post: Post = {
      title: values.title,
      description: values.description,
      rating: values.rating,
      author_id: Number(data?.user?.id),
      recipe: {
        ingredients: ingredients.map((ingredient) => ({
          name: ingredient.name,
          weight: ingredient.weight,
        })),
        cuisine: values.cuisine,
        isGlutenFree: values.glutenFree,
      },
      clicks: 0,
    };

    createPost.mutate({ newPostInfo: post });
    router.push("/posts");
    notifications.show({
      title: "Congrats!",
      message: "You have successfully created a recipe",
      color: "teal",
    });
  }, [form, data, ingredients]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", weight: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = ingredients.slice();
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  return (
    <form>
      <Paper p="lg" shadow="md" radius="md" withBorder>
        <Stack>
          <Title order={4} ta="center">
            Create a new recipe for 300gr.
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
            label="Cuisine"
            placeholder="Select cuisine"
            searchable
            clearable
            data={[
              { value: "italian", label: "Italian" },
              { value: "mexican", label: "Mexican" },
              { value: "indian", label: "Indian" },
              { value: "chinese", label: "Chinese" },
            ]}
            {...form.getInputProps("cuisine")}
          />
          <Group>
            <Text fw="normal">Add your rating: </Text>
            <Rating
              value={form.values.rating}
              onChange={(value) => form.setFieldValue("rating", value)}
              size="lg"
            />
          </Group>
          <Checkbox
            label="Gluten Free"
            {...form.getInputProps("glutenFree", { type: "checkbox" })}
          />
          <Title order={5}>Ingredients</Title>
          {ingredients.map((ingredient, index) => (
            <Group key={index}>
              <TextInput
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(event) =>
                  updateIngredient(index, "name", event.currentTarget.value)
                }
              />
              <TextInput
                placeholder="Weight"
                value={ingredient.weight}
                onChange={(event) =>
                  updateIngredient(index, "weight", event.currentTarget.value)
                }
              />
              <Button color="red" onClick={() => removeIngredient(index)}>
                Remove
              </Button>
            </Group>
          ))}
          <Button onClick={addIngredient} variant="outline">
            Add Ingredient
          </Button>
          <Group justify="right">
            <Button color="blue" variant="gradient" onClick={handleSubmit}>
              Create Recipe
            </Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
}
