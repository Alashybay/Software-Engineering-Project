"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import {
  Button, Group,
  SimpleGrid,
  Skeleton,
  Stack
} from "@mantine/core";

export default function Page() {
  const { data, isLoading } = useFetchPosts();

  const cards = data?.map((post) => <ArticleCard key={post.id} post={post} />);
  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(() => (
    <Skeleton w="100%" height={100} />
  ));

  return (
    <Layout>
      <Stack>
        <Group justify="right">
          <Button component="a" href="/posts/create" color="blue">
            Create new post
          </Button>
        </Group>
        <SimpleGrid cols={{ md: 3, sm: 2 }} spacing="lg">
          {isLoading ? skeletons : cards}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}
