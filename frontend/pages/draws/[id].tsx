import { Box, Card, Group, Title, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { ChristmasTree } from "tabler-icons-react";

export default function DrawPage({ data }: { data: any }) {
  const theme = useMantineTheme()
  return (
    <Box style={{ width: "500px", margin: "auto", marginTop: 100 }}>
      <Title color="teal">Draw {data.draw.id}</Title>
      <Box>
        {data.show_santas.map((participant: any, index: number) => (
          <Card key={index} shadow="xs" mt={25}>
            <Group>
              <ChristmasTree color="teal" />
              <Group position="apart" style={{flex: 1}}>
                <Box>
                  <Link
                    key={index}
                    href={`/participants/${participant.giver.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Title color="teal" order={4}>{participant.giver.email}</Title>
                    <Text>Giver</Text>
                  </Link>
                </Box>
                <Box>
                  <Link
                    key={index}
                    href={`/participants/${participant.receiver.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Title color="teal" align="right" order={4}>{participant.receiver.email}</Title>
                    <Text align="right">Receiver</Text>
                  </Link>
                </Box>
              </Group>
            </Group>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const response = await fetch(`http://localhost:3000/draws/${id}`);
  const data = await response.json();

  const { draw, participants, santas } = data;
  const santaz = santas.map((santa: { giver_id: any; receiver_id: any }) => {
    const giver = participants.find(
      (p: { id: any }) => p.id === santa.giver_id
    );
    const receiver = participants.find(
      (p: { id: any }) => p.id === santa.receiver_id
    );
    return { giver, receiver };
  });
  data["show_santas"] = santaz;

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
