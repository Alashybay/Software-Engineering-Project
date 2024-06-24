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
  Divider
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { YMaps } from "@pbe/react-yandex-maps";
import { useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';

export default function Page() {
  const mapRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    initialValues: {
      user_name: "",
      user_email: "",
      subject: "",
      message: "",
    },
    validate: {
      user_name: (value) => value.trim().length < 2,
      user_email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm('service_1e59q6n', 'template_z4cqbcp', formRef.current, 'LEl0jBvr0JFitA2EJ')
        .then(
          () => {
            notifications.show({
              title: "Message sent",
              message: "We will get back to you as soon as possible",
              color: "teal",
            });
          },
          (error) => {
            notifications.show({
              title: "Failed to send",
              message: "There was an issue sending your message. Please try again later.",
              color: "red",
            });
          }
        );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.isValid()) {
      sendEmail(e);
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
        <form ref={formRef} onSubmit={handleSubmit}>
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
              name="user_name"
              variant="filled"
              {...form.getInputProps("user_name")}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="user_email"
              variant="filled"
              {...form.getInputProps("user_email")}
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
            <Button size="md" type="submit">Send message</Button>
          </Group>
        </form>
      </Stack>
    </Layout>
  );
}
