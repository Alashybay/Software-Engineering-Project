"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import { Post } from "@/src/typings/post";
import {
  Button,
  Group,
  Indicator,
  rem,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useMemo, useState } from "react";

export default function Page() {
  const { data: userData } = useSession();
  const { data, isLoading } = useFetchPosts();
  const { data: userInfo } = useFetchUsers({ id: userData?.user.id });
  const [content, setContent] = useState<ReactNode>();
  const [recommended, setRecommended] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[] | undefined>();
  const theme = useMantineTheme();

  const dayRecipe = useMemo(() => {
    if (data) return data[Math.floor(Math.random() * data?.length)];
  }, [data]);

  const cards = data?.map((post) => <ArticleCard key={post.id} post={post} />);
  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(
    (index) => <Skeleton w="100%" height={100} key={index} />
  );

  const list: Post[] | undefined = useMemo(() => {
    return getRecomPosts(data, userInfo?.[0].preferences);
  }, [data, userInfo]);

  useEffect(() => {
    if (isLoading) return setContent(skeletons);
    if (recommended) {
      return setContent(
        list?.map((post) => <ArticleCard key={post.id} post={post} /> ?? [])
      );
    }
    return setContent(cards);
  }, [isLoading, recommended, list]);

  return (
    <Layout>
      <Stack>
        <Group justify="space-between" mb={15}>
          <Group justify="left" mb={15}>
            <Button component="a" href="/posts/create" color="blue">
              Create new post
            </Button>

            <Button
              color={theme.colors.red[6]}
              onClick={() => console.log("sorted")}
            >
              Sort
            </Button>
            <Select
              placeholder="Pick category"
              data={["Italian", "Mexican", "Kyrgyz", "Russian"]}
            />
          </Group>
          <Group justify="right" mb={15}>
            <Button
              color={theme.colors.red[6]}
              onClick={() => setRecommended(!recommended)}
            >
              {recommended ? "Recommended" : "All"}
            </Button>
          </Group>
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

function getRecomPosts(data?: Post[], preferences?: string) {
  return data?.filter((post) => post.category === preferences);
}
