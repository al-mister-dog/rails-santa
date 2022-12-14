import { Box, Button, Stack, Center, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { ChristmasTree } from "tabler-icons-react";

export default function Home() {
  return (
    <Box style={{ height: "100vh", marginTop: 150 }}>
      <Box style={{ width: "500px", margin: "auto" }}>
        <Center>
          <Group>
            <ChristmasTree color="teal" size={50} />
            <Title order={1} color="teal" size={50}>
              Secret Santa
            </Title>
            <ChristmasTree color="teal" size={50} />
          </Group>
        </Center>
        <Center>
          <Text size="xl" color="dimmed" mt={25} align="center">
            Welcome to the Secret Santa website! Let&apos;s start the holiday
            season with some festive fun!
          </Text>
        </Center>
        <Stack mt={25} >
          <Link href="/draws/create">
            <Button style={{width: "100%"}}>Get Started</Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
