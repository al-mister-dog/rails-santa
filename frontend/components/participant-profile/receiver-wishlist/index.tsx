import { Card, Center, Flex, Group, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import WishlistTable from "./wishlist-table";
import Link from "next/link";

export default function ReceiverWishListIndex({ receiver }: { receiver: any }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      const response = await fetch(
        `http://localhost:3000/gifts-wishlist/${receiver.id}`
      );
      const data = await response.json();

      setList(data);
    }
    fetchWishlist();
  }, []);

  return (
    <Box mt={50}>
      <Center>
        <Group>
          <Title order={2}>Secret Santa For: </Title>
          <a
            href={`/participants/${receiver.id}`}
            style={{ textDecoration: "none" }}
          >
            <Title order={2} color="teal">
              {receiver.email}
            </Title>
          </a>
        </Group>
      </Center>

      <Flex
        direction={{ base: "column", sm: "row" }}
        justify={{ sm: "space-around" }}
        gap={{ base: "sm", sm: "xl" }}
      >
        <Box mt={50}>
          <Center>
            <Title order={3} color="dimmed">
              {receiver.email}&apos;s Wishlist
            </Title>
          </Center>

          <Card mt={25} shadow="xs" style={{ width: "500px", minHeight: "200px" }}>
            <WishlistTable
              list={list}
              setList={setList}
              receiver_id={receiver.id}
            />
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
