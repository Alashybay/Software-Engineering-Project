import { useUpdateUser } from "@/src/hooks/useUpdateUser";
import { User } from "@/src/typings/user";
import { Button, Flex, Modal, Select } from "@mantine/core";
import { useCallback, useState } from "react";

export function UserRoleModal(props: {
  user?: User;
  opened: boolean;
  onClose: () => void;
}) {
  const [role, setRole] = useState<string | undefined>();
  const handleRoleChange = useCallback((selectedRole: string | null) => {
    if (selectedRole) {
      setRole(selectedRole);
    }
  }, []);
  const updateUserMutation = useUpdateUser();
  console.log(role);

  const handleUpdateUser = async () => {
    if (props.user?.id)
      try {
        await updateUserMutation.mutateAsync({
          userId: props.user?.id,
          updatedUserInfo: {
            role,
            is_admin: role === "admin" ? 1 : 0,
          },
        });
        props.onClose();
      } catch (error) {
        console.error("Mutation error:", error);
      }
  };

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={props.onClose}
        title="Change User Role"
        centered
      >
        <Select
          label={`Select role for ${props.user?.firstname} ${props.user?.surname}`}
          placeholder="Pick role"
          data={["admin", "manager", "client"]}
          value={role ?? props.user?.role}
          searchable
          onChange={handleRoleChange}
        />
        <Flex justify="center" gap="md" align="center" py={10}>
          <Button variant="outline" size="sm" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="filled" size="sm" onClick={handleUpdateUser}>
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
