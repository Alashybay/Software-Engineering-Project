"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import {
  Button,
  Group,
  Indicator,
  rem,
  SimpleGrid,
  Skeleton,
  Stack,
  Tooltip,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { ReactNode, useEffect, useMemo, useState } from "react";

export default function Page() {
  const { data, isLoading } = useFetchPosts();
  const [content, setContent] = useState<ReactNode>();

  const dayRecipe = useMemo(() => {
    if (data) return data[Math.floor(Math.random() * data?.length)];
  }, [data]);

  const cards = data?.map((post) => <ArticleCard key={post.id} post={post} />);
  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(
    (index) => <Skeleton w="100%" height={100} key={index} />
  );

  useEffect(() => {
    if (isLoading) return setContent(skeletons);
    return setContent(cards);
  }, [isLoading]);

  return (
    <Layout>
      <Stack>
        <Group justify="right">
          <Button component="a" href="/posts/create" color="blue">
            Create new post
          </Button>
        </Group>
        <SimpleGrid cols={{ md: 3, sm: 2 }} spacing="lg">
          <>
            <Tooltip label="Recipe of the day!" withArrow>
              <Indicator
                inline
                size={30}
                withBorder
                color="orange"
                processing
                label={
                  <IconAlertCircle
                    style={{ width: rem(15), height: rem(15) }}
                  />
                }
              >
                <ArticleCard post={dayRecipe} />
              </Indicator>
            </Tooltip>
          </>
          {content}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}
