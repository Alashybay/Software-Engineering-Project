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
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useRef } from "react";

export default function Page() {
  const mapRef = useRef(null);
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

  const handleSubmit = () => {
    if (form.isValid()) {
      notifications.show({
        title: "Message sent",
        message: "We will get back to you as soon as possible",
        color: "teal",
      });
      console.log(form.values);
    } else {
      notifications.show({
        title: "Form is invalid",
        message: "Please fill all fields correctly",
        color: "red",
      });
    }
  };

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
            src="https://yandex.ru/map-widget/v1/"
            width="100%"
            height="400"
            title="map"
          />
        </YMaps>
        <Divider variant="dashed" />
        <form>
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
            <Button size="md" onClick={handleSubmit}>Send message</Button>
          </Group>
        </form>
      </Stack>
    </Layout>
  );
}
