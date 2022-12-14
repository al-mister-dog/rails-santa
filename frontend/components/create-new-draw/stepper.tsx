import { Box, Card, Group, Stepper, Title } from "@mantine/core";
import { useState } from "react";
import uuid from "react-uuid";
import Draw from "./draw";
import FormOne from "./form-1";
import FormTwo from "./form-2";
import { Participant } from "../types";
import { setBody } from "../../helpers/setRequest";
import Link from "next/link";
import { ChristmasTree } from "tabler-icons-react";

export default function Form() {
  const [active, setActive] = useState(0);
  const [budget, setBudget] = useState(40);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: uuid(), email: "", role: "Organizer", exclusions: "", santa_for: "" },
  ]);
  const [error, setError] = useState("");
  const [drawId, setDrawId] = useState("");

  async function onConfirmSecretSanta() {
    const bodyParams = setBody(participants, budget);

    const response = await fetch("http://localhost:3000/draws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    });
    if (!response.ok) {
      setError(`An error has occured: ${JSON.stringify(response)}`);
      return;
    }
    const data = await response.json();
    setDrawId(data.draw.id);
    setActive(3);
  }
  if (drawId) {
    return (
      <>
        <Box style={{ width: "400px", margin: "auto" }}>
          <Link href={`/draws/${drawId}`} style={{ textDecoration: "none" }}>
            <Card shadow="xs">
              <Group>
                <ChristmasTree color="teal" size={50}/>
                <Title color="teal">All set. Click here to see your draw</Title>
              </Group>
            </Card>
          </Link>
        </Box>
      </>
    );
  }
  return (
    <>
      <Stepper
        color="teal"
        active={active}
        onStepClick={setActive}
        size="xs"
        style={{ maxWidth: 500, margin: "auto" }}
      >
        <Stepper.Step label="Step 1" description="Enter emails">
          <FormOne
            participants={participants}
            setParticipants={setParticipants}
          />
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Set Rules">
          <FormTwo
            participants={participants}
            setParticipants={setParticipants}
            budget={budget}
            setBudget={setBudget}
          />
        </Stepper.Step>
        <Stepper.Step label="Step 3" description="Draw">
          <Draw
            participants={participants}
            setParticipants={setParticipants}
            onConfirmSecretSanta={onConfirmSecretSanta}
          />
        </Stepper.Step>
      </Stepper>
    </>
  );
}
