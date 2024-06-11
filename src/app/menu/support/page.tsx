"use client";

import FaqSimple from "@/src/components/FaqSimple";
import { Layout } from "@/src/components/Layout";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Stack,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { YMaps } from "@pbe/react-yandex-maps";

export default function Page() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <Layout>
      <Stack gap="md">
        <FaqSimple />
        <Title
            order={2}
            size="h1"
            style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
            fw={900}
            ta="center"
          >
            Find us on the map
          </Title>
        <YMaps>
          <iframe
            src="https://yandex.ru/map-widget/v1/-/CCQ~uJyj"
            width="100%"
            height="400"
            title="map"
          />
        </YMaps>
        <Divider variant="dashed"/>
        <form onSubmit={form.onSubmit(() => {})}>
          <Title
            order={2}
            size="h1"
            style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
            fw={900}
            ta="center"
          >
            Have an extra question? Get in touch
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              label="Name"
              placeholder="Your name"
              name="name"
              variant="filled"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="email"
              variant="filled"
              {...form.getInputProps("email")}
            />
          </SimpleGrid>

          <TextInput
            label="Subject"
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps("subject")}
          />
          <Textarea
            mt="md"
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps("message")}
          />

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Send message
            </Button>
          </Group>
        </form>
      </Stack>
    </Layout>
  );
}
