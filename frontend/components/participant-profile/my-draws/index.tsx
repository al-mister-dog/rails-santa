import { Box, Button, Group, Table, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "tabler-icons-react";

export default function MyDraws({ participant }: { participant: any }) {
  const [draws, setDraws] = useState([]);
  useEffect(() => {
    async function fetchDraws() {
      const response = await fetch(
        `http://localhost:3000/draws-by-participant/${participant.id}`
      );
      const data = await response.json();
      
      setDraws(data);
    }
    fetchDraws();
  }, []);

  const ths = (
    <tr>
      <th>Draw No.</th>
      <th>Budget</th>
      <th>Organizer</th>
    </tr>
  );

  const rows = draws.map(
    (item: { id: string; budget: number; organizer_id: any }) => (
      <tr key={item.id}>
        <td>
          <Link href={`/draws/${item.id}`}>{item.id}</Link>
        </td>

        <td>{item.budget}</td>
        <td>
          {item.organizer_id}
          {item.organizer_id === participant.email ? (
            <Link href={`/draws/update/${item.id}`}>
              <Button ml={10} variant="outline">
                Update
              </Button>
            </Link>
          ) : (
            ""
          )}
        </td>
      </tr>
    )
  );

  return (
    <Box>
      <Title color="teal">My Draws</Title>
      <Box>
        <Table>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </Box>
  );
}
