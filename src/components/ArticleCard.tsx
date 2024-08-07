import {
  IconBookmark,
  IconChefHat,
  IconHeart,
  IconHeartFilled,
  IconShare,
} from "@tabler/icons-react";
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
  Tooltip,
  rem,
} from "@mantine/core";
import classes from "../styles/ArticleCard.module.css";
import { useRouter } from "next/navigation";
import { useFetchUsers } from "../hooks/useGetUsers";
import { Post } from "../typings/post";
import { useCallback, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

const linkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

export default function ArticleCard(props: {
  post?: Post;
  clikcCount?: (id?: number) => void;
}) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Post[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const post = props?.post;

  const { data: userData } = useFetchUsers({ id: post?.author_id });

  useEffect(() => {
    const favoriteList = localStorage.getItem("favorites");
    const currentFavorites: Post[] = favoriteList
      ? JSON.parse(favoriteList)
      : [];
    setSelected(currentFavorites.some((fav: Post) => fav.id === post?.id));
    setFavorites(currentFavorites);
  }, [post?.id]);

  const handleCopyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard
      .writeText(window.location.origin + `/posts/${post?.id}`)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const toggleFavorites = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const updatedFavorites = selected
        ? favorites?.filter((fav: Post) => fav.id !== post?.id)
        : [post, ...favorites].filter((fav): fav is Post => fav !== undefined);

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setSelected(!selected);
      !selected &&
        notifications.show({
          message: "The post added to Favorites",
          color: "green",
        });
      selected &&
        notifications.show({
          message: "The post removed from Favorites",
          color: "red",
        });
    },
    [favorites, post, selected]
  );
  const handleClick = useCallback(() => {
    router.push(`/posts/${post?.id}`);
    if (props.clikcCount) props.clikcCount(post?.id);
  }, [post?.id, props, router]);

  return (
    <Card withBorder radius="md" className={classes.card} onClick={handleClick}>
      <Card.Section>
        <Image
          src="https://i.pinimg.com/564x/96/7e/56/967e5643272d8399272fbca413674762.jpg"
          height={180}
        />
      </Card.Section>

      <Badge className={classes.rating} color="green">
        {post?.recipe?.cuisine}
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {post?.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {post?.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src={
              userData?.[0].is_admin === 1
                ? "https://i.pinimg.com/474x/32/22/da/3222dab749294d6c13f969b4d0bed41c.jpg"
                : "https://i.pinimg.com/474x/38/6b/de/386bde5f86885e4b0fd60727d4bc5c5c.jpg"
            }
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            {userData?.[0].firstname} {userData?.[0].surname}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          {userData?.[0].is_sub && (
            <Tooltip label="Verified chef" withArrow position="bottom">
              <IconChefHat
                style={{ width: rem(18), height: rem(18) }}
                color="orange"
              />
            </Tooltip>
          )}
          <ActionIcon
            className={classes.action}
            variant="subtle"
            onClick={handleCopyClick}
          >
            <IconShare
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={toggleFavorites}>
            {selected ? (
              <IconHeartFilled
                style={{
                  width: rem(16),
                  height: rem(16),
                }}
                color={theme.colors.red[6]}
              />
            ) : (
              <IconHeart
                style={{
                  width: rem(16),
                  height: rem(16),
                }}
                color={theme.colors.red[6]}
              />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
