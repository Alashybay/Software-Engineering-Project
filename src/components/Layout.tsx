import {
  AppShell,
  Burger,
  Container,
  Group,
  NavLink,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import {
  IconBooks,
  IconDoorExit,
  IconHome,
  IconMenu2,
  IconUsersGroup,
} from "@tabler/icons-react";

import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import useUsers from "../hooks/useUsers";

interface AppLayoutProps {
  children: JSX.Element;
}

const routes = [
  { title: "Dashboard", icon: <IconHome />, path: "/" },
  { title: "Posts", icon: <IconBooks />, path: "/posts" },
  { title: "Menu", icon: <IconMenu2 />, path: "/menu" },
  { title: "Users", icon: <IconUsersGroup />, path: "/users" },
];

export function Layout({ children }: AppLayoutProps): JSX.Element {
  const [opened, { toggle }] = useDisclosure();

  const { users, loading, error } = useUsers();

  console.log(users);

  const router = useRouter();
  const navigation = usePathname();

  const handleLogout = () => {
    alert("Logout, you sure about that?");
    nextAuthSignOut();
  };

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 100, md: 200, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Logo</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            label={route.title}
            leftSection={route.icon}
            onClick={() => router.push(route.path)}
            active={navigation === route.path}
          />
        ))}
        <NavLink
          label="Logout"
          leftSection={<IconDoorExit />}
          onClick={handleLogout}
          color="red"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
