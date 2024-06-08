"use client";

import { Layout } from "@/src/components/Layout";
import { Stack, Title } from "@mantine/core";


export default function Page() {
    return (
        <Layout>
            <Stack>
                <Title order={3}>Favorites</Title>
            </Stack>
        </Layout>
    );
}