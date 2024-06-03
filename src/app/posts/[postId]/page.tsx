"use client";

import { Layout } from "@/src/components/Layout";
import { useDeletePost } from "@/src/hooks/deletePost";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import {
    Badge,
    Button,
    Group,
    Image,
    Paper,
    Skeleton,
    Stack,
    Text, Title
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback } from "react";

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
  }, []);

  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(() => (
    <Skeleton w="100%" height={100} />
  ));

  const authorName = author?.[0]?.firstname || "Unknown";


  return (
    <Layout>
      {isLoading || isFetching ? (
        <>{skeletons}</>
      ) : (
        <Paper shadow="md" p="lg" radius="md" withBorder>
          <Stack>
            <Title order={4} ta="center">
              {currentPost?.title}
            </Title>
            <Image
              src="https://i.pinimg.com/564x/38/6b/de/386bde5f86885e4b0fd60727d4bc5c5c.jpg"
              h={100}
            />
            <Group justify="right">
              <Text>Category: </Text>
              <Badge variant="gradient">{currentPost?.category}</Badge>
            </Group>
            <Text>Description: {currentPost?.description}</Text>
            <Text>Author: {authorName} </Text>
            <Group justify="right">
              <Button>Share</Button>
              {  session.data?.user?.id === currentPost?.author_id && (
                <Button onClick={handleDelete} color="red">
                  Delete
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>
      )}
    </Layout>
  );
}
