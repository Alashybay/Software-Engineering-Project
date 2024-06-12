"use client";

import { Layout } from "@/src/components/Layout";
import { useDeletePost } from "@/src/hooks/deletePost";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import classes from "../../../styles/ActionsGrid.module.css";

export default function Page() {
  const post = useParams();
  const deletePost = useDeletePost();
  const session = useSession();

  const { data, isLoading, isFetching } = useFetchPosts({
    id: Number(post.postId),
  });
  const currentPost = data?.[0];
  const { data: author } = useFetchUsers({ id: currentPost?.author_id });
  const handleDelete = useCallback(() => {
    deletePost.mutate(Number(post.postId));
  }, [deletePost, post.postId]);

  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(
    (index) => <Skeleton w="100%" height={100} key={index} />
  );

  const authorName = author?.[0]?.firstname + " " + author?.[0]?.surname;

  const [rating, setRating] = useState(0);
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
                  src="https://i.pinimg.com/564x/38/6b/de/386bde5f86885e4b0fd60727d4bc5c5c.jpg"
                  height={180}
                  fit="contain"
                />
              </Card.Section>
              <Divider variant="dashed" />
              <Group justify="right">
                <Text fw="bold">Category:</Text>
                <Badge size="md" className={classes.rating} color="lime">
                  {currentPost?.category}
                </Badge>
              </Group>

              <Group>
                <Text fw="bold">Title:</Text>
                <Text className={classes.title} fw={500} component="a">
                  {currentPost?.title}
                </Text>
              </Group>

              <Group>
                <Text fw="bold">Description:</Text>
                <Text fz="sm" lineClamp={4}>
                  {currentPost?.description}
                </Text>
              </Group>

              <Group justify="space-between" className={classes.footer}>
                <Center>
                  <Group>
                    <Text fw="bold">Author:</Text>
                    <Text fz="sm" inline>
                      {authorName}
                    </Text>
                  </Group>
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
