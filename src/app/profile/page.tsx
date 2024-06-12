"use client";

import { Layout } from "@/src/components/Layout";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import {
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {

  const { data } = useSession();

  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      age: 0,
      phone: "",
    },
  });
  const { data: user } = useFetchUsers({ id: data?.user?.id });

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user[0].firstname,
        surname: user[0].surname,
        email: user[0].email,
        password: user[0].password,
        age: user[0].age,
        phone: user[0].phone || "",
      });
    }
  }, [user]);
  
  return (
    <Layout>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <Text size="xl">Profile</Text>
          <TextInput
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Surname"
            placeholder="Doe"
            {...form.getInputProps("surname")}
          />
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="********"
            {...form.getInputProps("password")}
          />
          <NumberInput
            label="Age"
            placeholder="25"
            hideControls
            {...form.getInputProps("age")}
          />
          <NumberInput
            label="Phone"
            placeholder="1234567890"
            hideControls
            {...form.getInputProps("phone")}
          />
          <Group justify="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Layout>
  );
}
