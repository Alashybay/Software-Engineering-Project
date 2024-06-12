"use client";

import {
  Container,
  Divider,
  Grid,
  List,
  Paper,
  rem,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Layout } from "../components/Layout";
import { BarChart, LineChart, PieChart, ScatterChart } from "@mantine/charts";
import { IconCircleCheck } from "@tabler/icons-react";
import {
  deviceUsageData,
  userData,
  userLocationData,
} from "../mocks/statistics.mock";
import { useFetchUsers } from "../hooks/useGetUsers";
import { useFetchPosts } from "../hooks/useGetPosts";

export default function Page() {
  const { data: fetchedUsers } = useFetchUsers();
  const { data: fetchedPosts } = useFetchPosts();


  console.log('users', fetchedUsers)
  console.log('posts', fetchedPosts)  

  const userData = fetchedUsers?.map((user) => {
    return {
      userId: user.id,
      age: user.age,
    };
  });

  const averageAge = fetchedUsers && fetchedUsers.length > 0
  ? (fetchedUsers.reduce((acc, user) => acc + user.age, 0) / fetchedUsers.length).toFixed(2)
  : '0.00';

  return (
    <Layout>
      <>
        <Title order={2} ta="center">
          Dashboard Overview
        </Title>
        <Text c="gray" ta="center">
          Analyze user contributions and gain valuable insights.
        </Text>

        <Divider my="md" />
        <Container my="md">
          <Stack>
            <Paper h="auto" radius="md" p="md" withBorder>
              <ScatterChart
                h={350}
                data={[
                  {
                    color: "violet.5",
                    name: `Average User age: ${averageAge} | Total Users: ${fetchedUsers?.length}`,
                    data: userData || [],
                  },
                ]}
                dataKey={{ x: "age", y: "userId" }}
                xAxisLabel="Age"
                yAxisLabel="User"
                withLegend
                legendProps={{ verticalAlign: 'bottom', height: 20 }}
              />
            </Paper>
            <Grid gutter="md">
              <Grid.Col>
                <Paper h="auto" radius="md" p="md" withBorder>
                  <BarChart
                    h={300}
                    data={deviceUsageData}
                    withLegend
                    dataKey="month"
                    series={[
                      { name: "Users", color: "violet.6" },
                      { name: "Posts", color: "blue.6" },
                      { name: "Comments", color: "teal.6" },
                    ]}
                    tickLine="y"
                  />
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper h="auto" radius="md" p="md" withBorder>
                  <PieChart
                    h={300}
                    withLabelsLine
                    labelsPosition="inside"
                    labelsType="percent"
                    withLabels
                    withTooltip
                    data={userLocationData}
                  />
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper h="auto" radius="md" p="md" withBorder>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>Collect data from sources</List.Item>
                    <List.Item>Clean and preprocess data</List.Item>
                    <List.Item>Analyze data patterns</List.Item>
                    <List.Item>Build statistical models</List.Item>
                    <List.Item>Create reports and dashboards</List.Item>
                    <List.Item>Implement data pipelines</List.Item>
                  </List>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </>
    </Layout>
  );
}
