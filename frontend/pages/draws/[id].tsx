import { Box, Card, Group, Title, Text } from "@mantine/core";
import Link from "next/link";
import { ChristmasTree } from "tabler-icons-react";

export default function ParticipantPage({ data }: { data: any }) {
  return (
    <Box style={{ width: "400px", margin: "auto", marginTop: 100 }}>
      <Title color="teal">Draw {data.draw.id}</Title>
      <Box>
        {data.participants.map((participant: any) => (
          <Link key={participant.id} href={`/participants/${participant.id}`}>
            <Card shadow="xs" mt={25}>
              <Group>
                <ChristmasTree color="teal" />
                <Text>{participant.email}</Text>
              </Group>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const response = await fetch(`http://localhost:3000/draws/${id}`);
  const data = await response.json();
  console.log(data)
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
