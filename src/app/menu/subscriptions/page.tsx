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
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCashBanknote, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export default function Page() {
  const [is_subscribed, setIsSubscribed] = useState(false);
  const form = useForm({
    initialValues: {
      sub_type: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validate: {
      sub_type: (value) => !value && "Please choose a subscription plan",
      cardholderName: (value) => value.length < 3 && "Name is too short",
      cardNumber: (value) => value.length < 16 && "Card number is too short",
      expiryDate: (value) => value.length < 5 && "Invalid date",
      cvv: (value) => value.length < 3 && "Invalid CVV",
    },
  });

  const date = new Date();
  const nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));
  const month = nextMonthDate.toLocaleString("default", { month: "long" });

  const handleSubmit = () => {
    if (form.isValid()) {
      notifications.show({
        title: "Subscription successful!",
        message: `You have successfully subscribed to our service!`,
        color: "teal",
        icon: <IconCheck />,
      });
      notifications.show({
        title: "Next billing date",
        message: `${nextMonthDate.getFullYear()}-${month}-${nextMonthDate.getDate()}`,
        icon: <IconCashBanknote />,
        color: "orange",
      });
      setIsSubscribed(true);
    }
    else {
      notifications.show({
        title: "Subscription failed!",
        message: `Please fill out the form correctly.`,
        color: "red",
        icon: <IconCheck />,
      });
    }

  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title order={3} fw="normal">
            Please fill out your form for subscription!
          </Title>
          <Text c="gray">
            Choose a subscription plan to gain access to exclusive food recipes
            and culinary content. Each plan offers unique benefits to enhance
            your cooking experience.
          </Text>
          <Divider variant="dashed" />

          <Radio.Group
            label="Choose your plan:"
            description="Subscription can be cancelled at any time by emailing our support."
            withAsterisk
            {...form.getInputProps("sub_type")}
          >
            <Stack mt="md">
              <Radio
                value="gold"
                label="Gold - $2/month (get your verified chef badge)"
              />
              <Radio
                value="silver"
                label="Silver - $3/month (get your verified chef badge and access to dashboard)"
              />
              <Radio
                value="bronze"
                label="Bronze - $4/month (get your verified chef badge, access to dashboard and priority support)"
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
                {...form.getInputProps("cardholderName")}
              />
              <NumberInput
                label="Card Number"
                placeholder="Enter your card number"
                hideControls
                required
                {...form.getInputProps("cardNumber")}
              />
              <TextInput
                label="Expiry Date"
                placeholder="MM/YY"
                {...form.getInputProps("expiryDate")}
                required
              />
              <NumberInput
                label="CVV"
                placeholder="Enter your CVV"
                hideControls
                required
                {...form.getInputProps("cvv")}
              />
            </Stack>
          </Paper>
          <Group justify="right" mt="md">
            <Button onClick={handleSubmit}>Save and Subscribe</Button>
          </Group>
        </Stack>
      </form>
    </Layout>
  );
}
