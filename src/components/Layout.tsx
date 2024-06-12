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
  IconHeart,
  IconHome,
  IconMenu2,
  IconUsersGroup,
} from "@tabler/icons-react";

import { signOut as nextAuthSignOut, useSession } from "next-auth/react";

interface AppLayoutProps {
  children: JSX.Element;
}

const routes = [
  { title: "Dashboard", icon: <IconHome />, path: "/", show: false },
  { title: "Posts", icon: <IconBooks />, path: "/posts", show: true },
  { title: "Favorites", icon: <IconHeart />, path: "/favorites", show: true },
  { title: "Menu", icon: <IconMenu2 />, path: "/menu", show: true },
  { title: "Users", icon: <IconUsersGroup />, path: "/users", show: false },
];

export function Layout({ children }: AppLayoutProps): JSX.Element {
  const [opened, { toggle }] = useDisclosure();
  const { data } = useSession();

  const router = useRouter();
  const navigation = usePathname();

  const handleLogout = () => {
    nextAuthSignOut({
      callbackUrl: "/",
    });
  };

  const is_admin = data?.user.is_admin;

  const filteredRoutes = routes.filter(
    (route) => route.show === true || (route.show === false && is_admin)
  );

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
          <Title
            order={3}
            onClick={() => router.push("/posts")}
            style={{ cursor: "pointer" }}
          >
            FoodHub
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {filteredRoutes.map((route, index) => (
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
