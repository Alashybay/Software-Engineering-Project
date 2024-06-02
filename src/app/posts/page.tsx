"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";

export default function Page() {
  const { data, isLoading } = useFetchPosts();
  if (isLoading) {
    return (
      <Layout>
        <Flex direction="column" gap={10}>
          {[...Array(3)].map((_, rowIndex) => (
            <Flex key={rowIndex} gap={10}>
              {[...Array(3)].map((_, colIndex) => (
                <Skeleton
                  key={`${rowIndex}-${colIndex}`}
                  height={200}
                  width="100%"
                />
              ))}
            </Flex>
          ))}
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout>
      <SimpleGrid cols={{ md: 3, sm: 2 }} spacing="lg">
        {data?.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}
