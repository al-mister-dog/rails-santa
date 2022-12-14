import { Box, Tabs, Title } from "@mantine/core";
import { JewishStar, Gift } from "tabler-icons-react";
import SecretSanta from "../../../components/participant-profile/receiver-wishlist";
import MyWishListIndex from "../../../components/participant-profile/giver-wishlist";

export default function ParticipantPage({ data }: { data: any }) {
  
  return (
    <Box>
      <Title color="teal">{data.participant.email}</Title>
      <Tabs defaultValue="gallery" mt={50}>
        <Tabs.List>
          <Tabs.Tab
            value="gallery"
            icon={<JewishStar color="teal" size={14} />}
          >
            My Wishlist
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<Gift color="teal" size={14} />}>
            Secret Santa
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <MyWishListIndex participant={data.participant} />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <SecretSanta receiver={data.receiver}/>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const response = await fetch(`http://localhost:3000/participants/${id}`);
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
