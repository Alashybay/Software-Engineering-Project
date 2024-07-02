"use client";

import { Layout } from "@/src/components/Layout";
import { useDeletePost } from "@/src/hooks/deletePost";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Rating,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import classes from "../../../styles/ActionsGrid.module.css";
import { notifications } from "@mantine/notifications";
import { IngredientTable } from "@/src/components/ingredientTable";

export default function Page() {
  const route = useRouter();
  const post = useParams();
  const deletePost = useDeletePost();
  const session = useSession();

  const { data, isLoading, isFetching } = useFetchPosts({
    id: Number(post.postId),
  });
  const currentPost = data?.[0];
  const { data: author } = useFetchUsers({ id: currentPost?.author_id });
  const [currentSize, setCurrentSize] = useState<number>(1);
  const [currentRecipe, setCurrentRecipe] = useState(
    currentPost?.recipe.ingredients
  );

  useEffect(() => {
    setCurrentRecipe(currentPost?.recipe.ingredients);
  }, [currentPost]);
  
  const handleDelete = useCallback(() => {
    deletePost.mutate(Number(post.postId));
    route.push("/posts");
    notifications.show({
      title: "Post deleted",
      message: "Post has been successfully deleted",
      color: "green",
    });
  }, [deletePost, post.postId]);

  const skeletons = [
    ...Array(Math.floor(Math.random() * 5) + 1),
  ].map((index) => <Skeleton w="100%" height={100} key={index} />);

  const authorName = author?.[0]?.firstname + " " + author?.[0]?.surname;

  const adjustRecipe = useCallback(
    (newSize: number) => {
      const ratio = newSize / currentSize;
      const adjustedIngredients = currentRecipe?.map((ingredient) => ({
        ...ingredient,
        weight: (Number(ingredient.weight) * ratio).toString(),
      }));

      setCurrentRecipe(adjustedIngredients);
      setCurrentSize(newSize);
    },
    [currentRecipe, currentSize]
  );

  return (
    <Layout>
      {isLoading || isFetching ? (
        <>{skeletons}</>
      ) : (
        <Container size="xl">
          <Card withBorder radius="md" className={classes.card} p="xl">
            <Stack>
              <Card.Section>
                <Image
                  src="https://i.pinimg.com/564x/96/7e/56/967e5643272d8399272fbca413674762.jpg"
                  height={180}
                  fit="contain"
                />
              </Card.Section>
              <Divider variant="dashed" />
              <Group>
                <Text fw="bold">Title:</Text>
                <Text className={classes.title}>{currentPost?.title}</Text>
              </Group>

              <Group justify="space-between">
                <Group>
                  <Text fw="bold">Rating:</Text>
                  <Rating size="md" value={currentPost?.rating} readOnly />
                </Group>
                <Group>
                  <Text fw="bold">Cuisine:</Text>
                  <Badge size="md" className={classes.rating} color="green">
                    {currentPost?.recipe.cuisine}
                  </Badge>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text fw="bold">
                  Description:
                  <Text fz="sm" span lineClamp={4} maw={800}>
                    {currentPost?.description}
                  </Text>
                </Text>
                <Group>
                  <Text fw="bold">Gluten Free:</Text>
                  <Badge size="md" className={classes.rating} color="blue">
                    {currentPost?.recipe.isGlutenFree ? "Yes" : "No"}
                  </Badge>
                </Group>
              </Group>
              <Divider variant="dashed" />
              <Group justify="space-between">
                <Text fw="bold">Ingredients:</Text>
                <Text fw="bold">Serving:</Text>
              </Group>
              <Group justify="space-between" align="flex-start">
                <Group style={{ width: "50%" }}>
                  <Paper withBorder p="md">
                    <IngredientTable ingredients={currentRecipe ?? []} />
                  </Paper>
                </Group>
                <Group
                  justify="right"
                  style={{
                    width: "40%",
                  }}
                >
                  <Button
                    onClick={() => adjustRecipe(1)}
                    color="green"
                    style={{ width: "50%" }}
                  >
                    1 serving
                  </Button>
                  <Button
                    onClick={() => adjustRecipe(2)}
                    color="green"
                    style={{ width: "50%" }}
                  >
                    2 servings
                  </Button>
                  <Button
                    onClick={() => adjustRecipe(3)}
                    color="orange"
                    style={{ width: "50%" }}
                  >
                    3 servings
                  </Button>
                  <Button
                    onClick={() => adjustRecipe(5)}
                    color="orange"
                    style={{ width: "50%" }}
                  >
                    4-5 servings
                  </Button>
                </Group>
              </Group>
              <Divider variant="dashed" />
              <Group justify="space-between" className={classes.footer}>
                <Center>
                  <Group>
                    <Text fw="bold">Author:</Text>
                    <Text fz="sm" inline></Text>
                  </Group>
                  <Avatar
                    src={
                      author?.[0].is_admin === 1
                        ? "https://i.pinimg.com/474x/32/22/da/3222dab749294d6c13f969b4d0bed41c.jpg"
                        : "https://i.pinimg.com/474x/38/6b/de/386bde5f86885e4b0fd60727d4bc5c5c.jpg"
                    }
                    size={24}
                    radius="xl"
                    mr="xs"
                  />
                  <Text fz="sm" inline>
                    {authorName}
                  </Text>
                </Center>

                <Group justify="right">
                  <Button>Share</Button>
                  {session.data?.user?.id === currentPost?.author_id && (
                    <Button onClick={handleDelete} color="red">
                      Delete
                    </Button>
                  )}
                </Group>
              </Group>
            </Stack>
          </Card>
        </Container>
      )}
    </Layout>
  );
}
