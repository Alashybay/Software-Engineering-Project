"use client";
import {
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCreditCard,
  IconReport,
  IconCoin,
  Icon24Hours,
  IconSettings,
  IconIdBadge,
} from "@tabler/icons-react";
import classes from "../../styles/ActionsGrid.module.css";
import { Layout } from "@/src/components/Layout";
import { useRouter } from "next/navigation";

const mockdata = [
  { title: "FAQ", icon: IconCreditCard, color: "violet", link: "menu/faq" },
  {
    title: "Support",
    icon: Icon24Hours,
    color: "indigo",
    link: "menu/support",
  },
  {
    title: "Subscriptions",
    icon: IconCoin,
    color: "green",
    link: "menu/subscriptions",
  },
  {
    title: "Settings",
    icon: IconSettings,
    color: "cyan",
    link: "/settings",
  },
  {
    title: "Posts",
    icon: IconReport,
    color: "pink",
    link: "/posts",
  },
  {
    title: "Profile",
    icon: IconIdBadge,
    color: "yellow",
    link: "/profile",
  },
];

export default function Page() {
  const theme = useMantineTheme();
  const router = useRouter();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => router.push(item.link)}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Layout>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Layout>
  );
}
