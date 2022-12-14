import { Card, Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Box } from "@mantine/core";

import AddGifts from "./add-gifts-to-wishlist";
import WishlistTable from "./wishlist-table";

export default function MyWishListIndex({ participant }: { participant: any }) {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    async function fetchWishlist() {
      const response = await fetch(
        `http://localhost:3000/gifts-wishlist/${participant.id}`
      );
      const data = await response.json();
      setList(data);
    }
    fetchWishlist();
  }, []);

  return (
    <Box mt={50} >
      

      <Flex
        direction={{ base: "column", sm: "row" }}
        justify={{ sm: "space-around" }}
        gap={{ base: "sm", sm: "xl" }}
      >
        <Box>
          <Title mb={25} order={2} color="dimmed">{participant.email}s Wishlist</Title>
          <Card shadow="xs" style={{ width: "500px", minHeight: "110px" }}>
            <WishlistTable list={list} setList={setList} />
          </Card>
        </Box>
        <Box style={{ width: "800px" }}>
          <Title mb={25} order={2} color="dimmed">Add a Gift</Title>
          <AddGifts participant={participant} setList={setList} />
        </Box>
      </Flex>
    </Box>
  );
}
