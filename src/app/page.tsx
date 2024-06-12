"use client";

import {
  Container,
  Divider,
  Grid,
  List,
  Paper,
  rem,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Layout } from "../components/Layout";
import { BarChart, LineChart, PieChart } from "@mantine/charts";
import { IconCircleCheck } from "@tabler/icons-react";
import {
  deviceUsageData,
  userData,
  userLocationData,
} from "../mocks/statistics.mock";



export default function Page() {
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
            <Paper h="auto" radius="md" p="md" withBorder>
              <LineChart
                h={300}
                data={userData}
                withLegend
                dataKey="month"
                series={[{ name: "Users", color: "green" }]}
                tickLine="y"
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

        </Container>
      </>
    </Layout>
  );
}
