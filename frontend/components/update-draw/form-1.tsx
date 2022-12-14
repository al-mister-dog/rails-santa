import { Box, Text, TextInput, Button, ActionIcon, Title } from "@mantine/core";
import uuid from "react-uuid";
import { Trash } from "tabler-icons-react";
import { Participant } from "../types";


export default function FormOne({
  participants,
  setParticipants,
}: {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}) {

  function onAddParticipant() {
    setParticipants([
      ...participants,
      {
        id: uuid(),
        email: "",
        role: "Participant",
        exclusions: "",
        santa_for: "",
      },
    ]);
  }

  function onSetParticipant(email: string, id: string) {
    
    const participant = participants.find((p) => p.id === id);
    if (participant) {
      participant.email = email;
    }
    setParticipants([...participants]);
  }

  function onDeleteParticipant(email: string) {
    const newParticipants = participants.filter((p) => p.email !== email);
    setParticipants(newParticipants);
  }

  return (
    <Box style={{ width: "400px" }} m="auto">
      <Title order={2} color="teal" weight="bold" mt={25}>
        Enter emails
      </Title>
   
      <Box >
        <Text mb={-25} color="dimmed" weight="bold">
          Draw With
        </Text>

        {participants.map((participant, index) => {
          const { email, role, id } = participant;
          return (
            <Box
              key={id}
              mt={25}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{ flex: 1 }}
                placeholder={email ? email : `Enter Member ${index + 1}`}
                disabled={role === "Organizer"}
                onChange={(e) => onSetParticipant(e.target.value, id)}
              />
              {index > 0 && (
                <ActionIcon ml={5} onClick={() => onDeleteParticipant(email)}>
                  <Trash color="red" />
                </ActionIcon>
              )}
            </Box>
          );
        })}
      </Box>

      <Button mt={25} variant="outline" onClick={onAddParticipant}>
        Add another
      </Button>
    </Box>
  );
}
