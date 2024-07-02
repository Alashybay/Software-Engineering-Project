"use client";

import { Layout } from "@/src/components/Layout";
import { UserRoleModal } from "@/src/components/modals/role";
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
  Tooltip,
  Skeleton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { closeAllModals, modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useCallback, useState } from "react";

const roleColors: Record<string, string> = {
  guest: "blue",
  admin: "purple",
};

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: users, isLoading, error } = useFetchUsers();
  const deleteUserMutation = useDeleteUser();

  const handleOpen = useCallback(
    (user?: User) => {
      open();
      setSelectedUser(user);
    },
    [open]
  );

  const handleDelete = (user: Partial<User>) => {
    modals.openConfirmModal({
      title: "Delete user",
      children: `Are you sure you want to delete ${user.firstname}?`,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => closeAllModals(),
      onConfirm: () => deleteUserMutation.mutate(user.id),
    });
  };

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
            src={
              item.is_admin === 1
                ? "https://i.pinimg.com/474x/32/22/da/3222dab749294d6c13f969b4d0bed41c.jpg"
                : "https://i.pinimg.com/474x/38/6b/de/386bde5f86885e4b0fd60727d4bc5c5c.jpg"
            }
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" fw={500}>
            {item?.firstname}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          variant="filled"
          color={roleColors[item?.is_admin === 1 ? "admin" : "guest"]}
        >
          {item?.is_admin === 1 ? "admin" : "guest"}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">
          {item?.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={item?.is_sub ? "green" : "red"}>
          {item?.is_sub ? "Subscribed" : "Not subscribed"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Tooltip label="Change role" position="left" withArrow>
            <ActionIcon variant="subtle" color="gray">
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                onClick={() => handleOpen(item)}
              />
            </ActionIcon>
          </Tooltip>

          {!item.is_admin && (
            <Tooltip label="Delete user" position="bottom" withArrow>
              <ActionIcon variant="subtle" color="red">
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  onClick={() => handleDelete(item)}
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
      <>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Subscription</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <UserRoleModal opened={opened} onClose={close} user={selectedUser} />
      </>
    </Layout>
  );
}
