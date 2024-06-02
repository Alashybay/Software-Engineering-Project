"use client";

import { Layout } from "@/src/components/Layout";
import { useDeleteUser } from "@/src/hooks/useDeleteUser";
import { useFetchUsers } from "@/src/hooks/useGetUsers";
import { User } from "@/src/typings/user";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Select,
  Tooltip,
  Skeleton,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const rolesData = ["Guest", "Admin"];

const handleRoleChange = (role: string) => {
  return (
    <Select
      data={rolesData}
      defaultValue={role}
      onChange={(value) => console.log(value)}
    />
  );
};

const roleColors: Record<string, string> = {
  guest: "blue",
  admin: "green",
};

export default function Page() {
  const { data: users, isLoading, error } = useFetchUsers();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = useCallback(
    (userId: number) => {
      deleteUserMutation.mutate(userId);
      console.log("deleted");
    },
    [deleteUserMutation]
  );

  if (isLoading) {
    return (
      <Layout>
        <Skeleton height={500} width="100%" />
      </Layout>
    );
  }

  const rows = users?.map((item) => (
    <Table.Tr key={item?.firstname}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={30}
            src={
              item?.avatar ??
              "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1"
            }
            radius={30}
          />
          <Text fz="sm" fw={500}>
            {item?.firstname}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={roleColors[item?.role ?? "user"]} variant="light">
          {item?.role}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">
          {item?.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item?.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Tooltip label="Change role" position="left" withArrow>
            <ActionIcon variant="subtle" color="gray">
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                onClick={() => handleRoleChange(item?.role ?? "user")}
              />
            </ActionIcon>
          </Tooltip>

          {!item.is_admin && (
            <Tooltip label="Delete user" position="bottom" withArrow>
              <ActionIcon variant="subtle" color="red">
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  onClick={() => handleDelete(item.id)}
                />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Layout>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Layout>
  );
}
