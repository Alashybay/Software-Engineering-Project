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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { Post } from "../../typings/post";
import { useCreateNewPost } from "@/src/hooks/createPost";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export function PostForm() {
  const { data } = useSession();
  const createPost = useCreateNewPost();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      category: "",
      rating: 0,
      author_id: 0,
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
      category: values.category,
      author_id: Number(data?.user?.id),
    };

    createPost.mutate({ newPostInfo: post });
    router.push("/posts");
    notifications.show({
      title: "Congrants!",
      message: "You have successfully created recipe",
      color: "teal",
    });
  }, [form, data]);

  return (
    <form>
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
          <Group>
            <Text fw="normal">Add your rating: </Text>
            <Rating
              value={form.values.rating}
              onChange={(value) => form.setFieldValue("rating", value)}
              size="lg"
            />
          </Group>
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
