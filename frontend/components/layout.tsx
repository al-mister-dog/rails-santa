import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { ChristmasTree } from "tabler-icons-react";
import Link from "next/link";

export default function Layout(props: any) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group>
              <ChristmasTree color="teal" size={40} />
              <Link href="/draws/create" style={{ textDecoration: "none" }}>
                <Title order={2} color="teal">
                  Secret Santa
                </Title>
              </Link>
            </Group>
            <Group ml={100}>
              <Link
                href="/draws/create"
                style={{ textDecoration: "none", color: "#404d47" }}
              >
                <Text>Create New Draw</Text>
              </Link>
              <Link
                href="/draws"
                style={{ textDecoration: "none", color: "#404d47" }}
              >
                <Text>See All Draws</Text>
              </Link>
            </Group>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}


