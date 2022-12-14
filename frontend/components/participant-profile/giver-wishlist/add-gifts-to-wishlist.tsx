import { Box, Button, Card, Group, Text, Title } from "@mantine/core";
import Image from "next/image";
import { giftsData } from "../../../data/gifts";

export default function AddGiftsToWishList({
  participant,
  setList,
}: {
  participant: any;
  setList: any;
}) {
  async function onAddGift(gift: {
    name: string;
    price: number;
    purchased: boolean;
  }) {
    const response = await fetch("http://localhost:3000/gifts", {
      method: "POST",
      body: JSON.stringify({
        name: gift.name,
        price: gift.price,
        purchased: gift.purchased,
        participant_id: participant.id,
      }),
    });
    const data = await response.json();
    setList(data.wishlist);
  }
  return (
    <Box>
      <Gifts onAddGift={onAddGift} />
    </Box>
  );
}

function Gifts({
  onAddGift,
}: {
  onAddGift: (gift: {
    name: string;
    price: number;
    purchased: boolean;
  }) => void;
}) {
  return (
    <Box style={{maxHeight: "600px", overflow: "auto"}}>
      <Group position="apart">
        {giftsData.map((gift) => {
          const { image, price, title } = gift;
          return (
            <Card key={title} withBorder radius="md" p="md">
              <Card.Section>
                <Image src={image} alt={title} height={180} width={250} />
              </Card.Section>

              <Card.Section mt="md" p={10}>
                <Group position="center">
                  <Text size="lg" weight={500}>
                    {title}
                  </Text>
                </Group>
              </Card.Section>

              <Group mt="xs" p={10}>
                <Text size="xl" color="dimmed" weight="bold">
                  £{price}
                </Text>
                <Button
                  radius="md"
                  style={{ flex: 1 }}
                  onClick={() =>
                    onAddGift({ name: title, price, purchased: false })
                  }
                >
                  Add Gift
                </Button>
              </Group>
            </Card>
          );
        })}
      </Group>
    </Box>
  );
}
