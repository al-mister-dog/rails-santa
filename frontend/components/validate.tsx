import { Text } from "@mantine/core";
import { validParticipants } from "../helpers/validateParticipants";
import { Participant } from "./types";

export default function Validate({
  participants,
  children,
}: {
  participants: any[];
  children: React.ReactNode;
}) {
  const { valid, message } = validParticipants(participants);
  return (
    <>
      {valid ? (
        children
      ) : (
        <Text color="dimmed" weight="bold" mt={25}>
          {message}
        </Text>
      )}
    </>
  );
}
