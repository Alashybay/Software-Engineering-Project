"use client";

import { Layout } from "@/src/components/Layout";
import {
  Button,
  Divider,
  Group,
  NumberInput,
  Paper,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Page() {

  const handleSubmit = () => {
    const date = new Date();
    const nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));
    const month = nextMonthDate.toLocaleString("default", { month: "long" });

    notifications.show({
      title: "Subscription successful!",
      message: `You have successfully subscribed to our service. ${nextMonthDate.getFullYear()}-${month}-${nextMonthDate.getDate()} is your next billing date.`,
      color: "teal",
    })
  }

  return (
    <Layout>
      <Stack>
        <Title order={3} fw="normal">
          Please fill out your form for subscription!
        </Title>
        <Text c="gray">
          Choose a subscription plan to gain access to exclusive food recipes
          and culinary content. Each plan offers unique benefits to enhance your
          cooking experience.
        </Text>
        <Divider variant="dashed" />

        <Radio.Group
          label="Choose your plan:"
          description="Subscription can be cancelled at any time by emailing our support."
          withAsterisk
        >
          <Stack mt="md">
            <Radio
              value="gold"
              label="Gold - $29.99/month (Includes all recipes, premium content, and monthly exclusive cooking webinars)"
            />
            <Radio
              value="silver"
              label="Silver - $19.99/month (Access to all recipes, excluding premium content)"
            />
            <Radio
              value="bronze"
              label="Bronze - $9.99/month (Access to basic recipes only)"
            />
          </Stack>
        </Radio.Group>
        <Divider variant="dashed" />
        <Paper shadow="md" withBorder radius="md" p="lg">
          <Stack>
            <TextInput
              label="Cardholder Name"
              placeholder="Enter the name as it appears on your card"
              required
            />
            <NumberInput
              label="Card Number"
              placeholder="Enter your card number"
              hideControls
              required
            />
            <TextInput label="Expiry Date" placeholder="MM/YY" required />
            <NumberInput
              label="CVV"
              placeholder="Enter your CVV"
              hideControls
              required
            />
          </Stack>
        </Paper>
        <Group justify="right" mt="md">
          <Button type="submit" onClick={handleSubmit}>Save and Subscribe</Button>
        </Group>
      </Stack>
    </Layout>
  );
}
