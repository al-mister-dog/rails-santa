import { ActionIcon, Table } from "@mantine/core";
import { Check, Trash, X } from "tabler-icons-react";

export default function WishlistTable({
  list,
  setList,
}: {
  list: { id: string; price: number; name: string; purchased: boolean }[];
  setList: (arg: any) => void;
}) {
  async function onDeleteItem(id: any) {
    const response = await fetch(`http://localhost:3000/gifts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setList(data);
  }
  const ths = (
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Purchased</th>
      <th>Remove</th>
    </tr>
  );

  const rows = list.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>£{item.price}</td>
      <td>{item.purchased ? <Check color="green" /> : <X color="gray" />}</td>
      <td>
        <ActionIcon
          style={{ margin: 0, padding: 0 }}
          onClick={() => onDeleteItem(item.id)}
        >
          <Trash color="red" />
        </ActionIcon>
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
