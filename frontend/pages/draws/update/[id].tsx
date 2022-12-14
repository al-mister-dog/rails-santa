import { Box, Title } from "@mantine/core";
import SecretSantaStepper from "../../../components/update-draw/stepper";

export default function Draw({ data }: { data: { id: string } }) {
  
  return (
    <Box mt={150}>
      <Title color="teal">Update Draw #</Title>
      <SecretSantaStepper data={data} />
    </Box>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const response = await fetch(
    `http://localhost:3000/draws/${context.query.id}`
  );
  const data = await response.json();

  return {
    props: { data },
  };
}
