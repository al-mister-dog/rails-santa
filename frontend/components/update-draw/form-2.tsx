import { Box, Text, Title, NumberInput, Radio, Select } from "@mantine/core";
import { useState } from "react";
import { CurrencyPound } from "tabler-icons-react";
import { validParticipants } from "../../helpers/validateParticipants";
import { Participant } from "../types";

export default function FormTwo({
  participants,
  setParticipants,
  budget,
  setBudget,
}: {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  budget: number;
  setBudget: (budget: number) => void;
}) {
  
  const [exclusions, setExclusions] = useState<string[]>([]);
  const {valid, message} = validParticipants(participants);
  return (
    <Box style={{ width: "400px" }} m="auto">
      <Title order={2} color="teal" weight="bold" mt={25}>
        Set Rules
      </Title>
      {valid ? (
        <>
          <Box>
            <SetBudgetForm budget={budget} setBudget={setBudget} />
          </Box>
          <Box>
            <SetExclusionsForm participants={participants} />
          </Box>
        </>
      ) : (
        <Text color="dimmed" weight="bold" mt={25}>
          {message}
        </Text>
      )}
    </Box>
  );
}

function SetBudgetForm({
  budget,
  setBudget,
}: {
  budget: number;
  setBudget: (budget: number) => void;
}) {
  function checkErrorsBudget(budget: number) {
    if (budget > 79) {
      return "Budget cannot be more than 79";
    } else if (budget < 1) {
      return "Budget cannot be less than 1";
    } else if (isNaN(budget)) {
      return "Budget must be a number";
    }
    return "";
  }

  function onSetBudget(budget: number | undefined) {
    if (budget === undefined) {
      budget = 0;
    }
    setBudget(budget);
  }
  return (
    <>
      <Text color="dimmed" weight="bold" mt={25}>
        Max Budget
      </Text>

      <NumberInput
        icon={<CurrencyPound />}
        placeholder="Enter Max Budget"
        error={checkErrorsBudget(budget)}
        defaultValue={budget}
        min={1}
        max={79}
        onChange={(val) => {
          onSetBudget(val);
        }}
      />
    </>
  );
}

function SetExclusionsForm({ participants }: { participants: Participant[] }) {
  const [value, setValue] = useState("no");

  // const participantsToExclude = (id: string) =>
  //   participants
  //     .filter((p) => p.email !== id)
  //     .map((p) => ({ value: p.email, label: p.name }));

  return (
    <>
      <Text color="dimmed" weight="bold" mt={25}>
        Set Exclusions
      </Text>

      <Radio.Group
        value={value}
        onChange={setValue}
        label="An exclusion indictates which name someone may not draw."
      >
        <Radio value="no" label="Do not use exclusions" />
        <Radio value="yes" label="Set exclusions" />
      </Radio.Group>
      {/* {value === "yes" && (
        <Box>
          {participants.map((participant, index) => {
            const { id, name } = participant;
            return (
              <Box key={id}>
                <Text color="dimmed" weight="bold" mt={25}>
                  {name}
                </Text>
                <Select
                  data={participantsToExclude(id)}
                  onChange={(val) => console.log(val)}
                />
              </Box>
            );
          })}
        </Box>
      )} */}
    </>
  );
}
