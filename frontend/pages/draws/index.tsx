import { Box, Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { ChristmasTree } from "tabler-icons-react";

export default function DrawsIndexPage({ data }: { data: any }) {
  return (
    <Box  style={{ width: "400px", margin: "auto", marginTop: 100 }} >
      <Title order={1} color="teal">
        Draws
      </Title>

      <Box>
        {data.map((draw: any) => (
          <Link key={draw.id} href={`draws/${draw.id}`}>
            <Card shadow="xs" mt={25}>
              <Group>
                <ChristmasTree color="teal" />
                <Text>Draw {draw.id}</Text>
              </Group>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/draws");
  const data = await response.json();
  if (data) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
}
