"use client";

import { Layout } from "@/src/components/Layout";
import { Button, Group, NumberInput, Stack, Text, TextInput } from "@mantine/core";

export default function Page() {
  return (
    <Layout>
      <Stack>
        <Text size="xl">Profile</Text>
        <TextInput label="Name" placeholder="John Doe" />
        <TextInput label="Surname" placeholder="Doe" />
        <TextInput label="Email" placeholder="user@gmail.com" />
        <TextInput label="Password" type="password" placeholder="********" />
        <NumberInput label="Age" placeholder="25" hideControls />
        <NumberInput label="Phone" placeholder="1234567890" hideControls />
        <Group justify="right">
          <Button>Save</Button>
        </Group>
      </Stack>
    </Layout>
  );
}
