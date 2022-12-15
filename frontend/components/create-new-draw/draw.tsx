import { Box, Button, Title, Text } from "@mantine/core";
import { useState } from "react";
import { draw } from "../../helpers/draw";
import { validParticipants } from "../../helpers/validateParticipants";
import { Participant } from "../types";
import Validate from "../validate";

export default function Draw({
  participants,
  setParticipants,
  onConfirmSecretSanta,
}: {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  onConfirmSecretSanta: () => void;
}) {
  const [drawn, setDrawn] = useState(false);

  function onDraw() {
    const result: Participant[] = draw(participants);
    setParticipants(result);
    setDrawn(true);
  }

  return (
    <Box>
      <Title order={2} color="teal" weight="bold">
        Draw
      </Title>
      <Validate participants={participants}>
        <Box
          mt={25}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text color="dimmed" weight="bold">
            Find out who is Santa for who. . .
          </Text>
          <Button variant="outline" onClick={onDraw}>
            {drawn ? "Redraw" : "Draw"} Secret Santas
          </Button>
        </Box>

        <Box>
          {participants.length > 1 &&
            participants.map((participant) => {
              const santaFor = (p: { email: string }) =>
                p.email === participant.santa_for;

              const recipientName = participants.find(santaFor)?.email;

              return (
                <Box
                  key={participant.email}
                  mt={10}
                  style={{
                    border: "1px solid grey",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text size="xl">
                    {participant.email} is Santa for{" "}
                    {recipientName ? recipientName : "?🎅?"}
                  </Text>
                </Box>
              );
            })}
        </Box>
      </Validate>
      {drawn && (
        <Box mt={25}>
          <Button style={{ width: "100%" }} onClick={onConfirmSecretSanta}>
            Confirm Secret Santa
          </Button>
        </Box>
      )}
    </Box>
  );
}
