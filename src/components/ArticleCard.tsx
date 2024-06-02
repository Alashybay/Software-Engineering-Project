import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core";
import classes from "../styles/ArticleCard.module.css";
import { useRouter } from "next/navigation";
import { useFetchUsers } from "../hooks/useGetUsers";

const linkProps = {
  href: "https://mantine.dev",
  target: "_blank",
  rel: "noopener noreferrer",
};

export default function ArticleCard(props: { post: Post }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const post = props.post;

  const { data: userData } = useFetchUsers({ id: post.author_id });

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
        </a>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        outstanding
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {post.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {post?.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            {userData?.[0].firstname} {userData?.[0].surname}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action} variant="subtle" color="red">
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
            />
          </ActionIcon>
          <ActionIcon
            className={classes.action}
            variant="subtle"
            color="yellow"
          >
            <IconBookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action} variant="subtle">
            <IconShare
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
