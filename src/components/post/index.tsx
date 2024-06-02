import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { PostForm } from "./postForm";

export default function Post() {
  return (
    <Paper shadow="md" radius="md" p="md" withBorder>
      <Stack>
        <Title order={4} ta="center">
          Share Your Delicious Recipe
        </Title>
        <PostForm />
        <Group justify="right">
          <Button>Save and Post</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
