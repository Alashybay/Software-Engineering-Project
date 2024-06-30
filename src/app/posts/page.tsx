"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { categories } from "@/src/constants/categories";
import { useFetchPosts } from "@/src/hooks/useGetPosts";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import { updateClickCount } from "@/src/services/api";
import { Post } from "@/src/typings/post";
import { getRecomm } from "@/src/utils/getRecomm";
import { updateTrendingRecipe } from "@/src/utils/mostViewed";
import {
  Button,
  Group,
  Indicator,
  Input,
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
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const { data: userData } = useSession();
  const { data, isLoading } = useFetchPosts();
  const { data: userInfo } = useFetchUsers({ id: userData?.user.id });
  const [content, setContent] = useState<ReactNode>();
  const [recommended, setRecommended] = useState<boolean>(true);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [posts, setPosts] = useState<Post[] | undefined>();
  const theme = useMantineTheme();

  const dayRecipe = useMemo(() => {
    return updateTrendingRecipe(data ?? []);
  }, [data]);

  const showRecomms = useCallback(() => {
    const filteredPosts = recommended
      ? getRecomm(data ?? [], userInfo?.[0]?.user_preference)
      : data;

    setPosts(filteredPosts);
    setRecommended(!recommended);
  }, [data, recommended, userInfo]);

  const searchPosts = useCallback(() => {
    if (searchKeyword.trim() === "") {
      setPosts(data);
    } else {
      const filteredPosts = data?.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  }, [data, searchKeyword]);

  const sortByRating = useCallback(() => {
    if (posts) {
      const sortedPosts = [...posts].sort((a, b) =>
        sortAscending
          ? (a.rating || 0) - (b.rating || 0)
          : (b.rating || 0) - (a.rating || 0)
      );
      setPosts(sortedPosts);
      setSortAscending(!sortAscending);
    }
  }, [posts, sortAscending]);

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      if (category) {
        const filteredPosts =
          category === "all"
            ? data
            : data?.filter((post) => post.recipe.cuisine === category);
        setPosts(filteredPosts);
      } else {
        setPosts(data);
      }
    },
    [data]
  );

  const handleUpdateClickCount = async (postId?: number) => {
    if (postId)
      try {
        await updateClickCount(postId); // Call the function to update click count
        // Optionally, update posts data after successful update
        const updatedPosts = posts?.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              clicks: post.clicks ? post.clicks + 1 : 1, // Increment click count locally
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        console.log("Click count updated successfully");
      } catch (error) {
        console.error("Error updating click count:");
      }
  };

  const cards = posts?.map((post) => (
    <ArticleCard
      key={post.id}
      post={post}
      clikcCount={handleUpdateClickCount}
    />
  ));
  const skeletons = useMemo(
    () =>
      [...Array(Math.floor(Math.random() * 5) + 1)].map((_, index) => (
        <Skeleton w="100%" height={100} key={index} />
      )),
    []
  );

  useEffect(() => {
    searchPosts();
  }, [searchKeyword, searchPosts]);

  useEffect(() => {
    if (!posts) {
      setPosts(data);
    }
  }, [data, posts]);
  useEffect(() => {
    if (isLoading) {
      setContent(skeletons);
    } else {
      setContent(cards);
    }
  }, [isLoading, recommended, posts]);

  return (
    <Layout>
      <Stack>
        <Group justify="space-between">
          <Group justify="left">
            <Button component="a" href="/posts/create" color="blue">
              Create new post
            </Button>

            <Button color={theme.colors.red[6]} onClick={sortByRating}>
              Sort by rating {sortAscending ? "↑" : "↓"}
            </Button>
            <Select
              placeholder="Pick category"
              data={categories}
              onChange={handleCategoryChange}
            />
          </Group>
          <Group justify="right">
            <Button color={theme.colors.red[6]} onClick={showRecomms}>
              {recommended ? "Recommended" : "All"}
            </Button>
          </Group>
        </Group>
        <Input
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
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
