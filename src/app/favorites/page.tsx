"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { Post } from "@/src/typings/post";
import { SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

export default function Page() {
  const [favorites, setFavorites] = useState<Post[] | undefined>(undefined);
  const [content, setContent] = useState<ReactNode>();

  const cards = favorites?.map((post) => (
    <ArticleCard key={post.id} post={post} />
  ));
  const skeletons = [...Array(Math.floor(Math.random() * 5) + 1)].map(
    (index) => <Skeleton w="100%" height={100} key={index} />
  );

  useEffect(() => {
    const favoriteList = localStorage.getItem("favorites");
    const currentFavorites: Post[] = favoriteList
      ? JSON.parse(favoriteList)
      : [];
    setFavorites(currentFavorites);
  }, []);
  console.log(favorites);

  useEffect(() => {
    if (!favorites) return setContent(skeletons);
    return setContent(cards);
  }, [favorites]);

  return (
    <Layout>
      <Stack>
        <Title order={3}>Favorites</Title>
        <SimpleGrid cols={{ md: 3, sm: 2 }} spacing="lg">
          {content}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}
