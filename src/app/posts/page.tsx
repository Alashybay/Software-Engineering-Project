"use client";

import ArticleCard from "@/src/components/ArticleCard";
import { Layout } from "@/src/components/Layout";
import { SimpleGrid } from "@mantine/core";

export default function Page() {
  return (
    <Layout>
      <SimpleGrid cols={{ md: 3, sm: 2 }} spacing="lg">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </SimpleGrid>
    </Layout>
  );
}
