import { Box, Tabs, Title } from "@mantine/core";
import { JewishStar, Gift } from "tabler-icons-react";
import SecretSanta from "../../components/participant-profile/receiver-wishlist";
import MyWishListIndex from "../../components/participant-profile/giver-wishlist";
import MyDraws from "../../components/participant-profile/my-draws";



export default function ParticipantPage({ data }: { data: any }) {
  
  return (
    <Box>
      <Title ml={25}color="teal" order={2}>{data.participant.email}</Title>
      <Tabs defaultValue="wishlist" mt={25}>
        <Tabs.List>
          <Tabs.Tab
            value="wishlist"
            icon={<JewishStar color="teal" size={14} />}
          >
            My Wishlist
          </Tabs.Tab>
          <Tabs.Tab value="secretsanta" icon={<Gift color="teal" size={14} />}>
            Secret Santa
          </Tabs.Tab>
          <Tabs.Tab value="draws" icon={<Gift color="teal" size={14} />}>
            My Draws
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="wishlist" pt="xs">
          <MyWishListIndex participant={data.participant} />
        </Tabs.Panel>

        <Tabs.Panel value="secretsanta" pt="xs">
          <SecretSanta receiver={data.receiver}/>
        </Tabs.Panel>

        <Tabs.Panel value="draws" pt="xs">
          <MyDraws participant={data.participant} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  // const response = await fetch(`http://localhost:3000/participants/${id}`);
  const response = await fetch(`http://localhost:3000/participant-and-santa/${id}`)
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
