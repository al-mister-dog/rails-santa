import { ActionIcon, Table } from "@mantine/core";
import { Check, ShoppingCart, ShoppingCartOff, X } from "tabler-icons-react";

export default function WishlistTable({
  list,
  setList,
  receiver_id,
}: {
  list: { id: string; price: number; name: string; purchased: boolean }[];
  setList: (arg: any) => void;
  receiver_id: string;
}) {
  async function onPurchaseItem(id: any) {
    const response = await fetch(`http://localhost:3000/gifts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purchased: true, receiver_id: receiver_id }),
    });

    const data = await response.json();

    setList(data.wishlist);
  }
  const ths = (
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Purchased</th>
      <th>Buy This Item</th>
    </tr>
  );

  const rows = list.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>£{item.price}</td>
      <td>{item.purchased ? <Check color="green" /> : <X color="gray" />}</td>
      <td>
        {item.purchased ? (
          <>
            <ActionIcon disabled>
              <ShoppingCart color="gray" />
            </ActionIcon>
          </>
        ) : (
          <>
            <ActionIcon onClick={() => onPurchaseItem(item.id)}>
              <ShoppingCart color="violet" />
            </ActionIcon>
          </>
        )}
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
