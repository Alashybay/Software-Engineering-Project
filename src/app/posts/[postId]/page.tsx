"use client";

import { Layout } from "@/src/components/Layout";
import { Badge, Button, Group, Image, Stack, Text, TextInput, Title } from "@mantine/core";


export default function Page() {

    return (
        <Layout>
            <Stack>
                <Title order={4}>Title</Title>
                <Image src="https://i.imgur.com/Cij5vdL.png" height={100} />
                <Text>Description</Text>
                <Badge variant="gradient" gradient={{ from: "yellow", to: "red" }}>Category</Badge>
                <Text>Author: </Text>
                <Group>
                    <Button>Share</Button>
                </Group>
            </Stack>
        </Layout>
    )
}