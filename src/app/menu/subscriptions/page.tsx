"use client";

import { Layout } from "@/src/components/Layout";
import { useUpdateUser } from "@/src/hooks/useUpdateUser";
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
import { useSession } from "next-auth/react";

export default function Page() {
  const form = useForm({
    initialValues: {
      sub_type: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validate: {
      cardholderName: (value) => value.length < 3 && "Name is too short",
      cardNumber: (value) => value.length < 16 && "Card number is too short",
      expiryDate: (value) => value.length < 5 && "Invalid date",
      cvv: (value) => value.length < 3 && "Invalid CVV",
    },
  });

  const updateUserMutation = useUpdateUser();
  const { data: session } = useSession();

  const handleUpdate = async () => {
    if (session?.user?.id) {
      await updateUserMutation.mutateAsync({
        userId: Number(session.user?.id),
        updatedUserInfo: {
          is_sub: 1,
        },
      });
    } else {
      notifications.show({
        title: "Error",
        message: "Please login to subscribe",
        color: "red",
      });
    }
  };

  const date = new Date();
  const nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));
  const month = nextMonthDate.toLocaleString("default", { month: "long" });

  const handleSubmit = () => {
    if (form.isValid()) {
      handleUpdate();
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
    } else {
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
      <form>
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

          <Radio
            value="chef"
            label="Chef - $2/month (get your verified chef badge)"
            {...form.getInputProps("sub_type")}
          />
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
