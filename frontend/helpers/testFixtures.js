import uuid from "react-uuid";
export const participants = [
  {
    id: uuid(),
    email: "bart@test.com",
    exclusions: "",
    santa_for: "",
  },
  {
    id: uuid(),
    email: "lisa@test.com",
    exclusions: "",
    santa_for: "",
  },
  {
    id: uuid(),
    email: "maggie@test.com",
    exclusions: "",
    santa_for: "",
  },
  {
    id: uuid(),
    email: "homer@test.com",
    exclusions: "",
    santa_for: "",
  },
];

export const participantsAndBudget = {
  participants: [
    {
      id: uuid(),
      email: "bart@test.com",
      exclusions: "",
      santa_for: "homer@test.com",
    },
    {
      id: uuid(),
      email: "lisa@test.com",
      exclusions: "",
      santa_for: "bart@test.com",
    },
    {
      id: uuid(),
      email: "maggie@test.com",
      exclusions: "",
      santa_for: "lisa@test.com",
    },
    {
      id: uuid(),
      email: "homer@test.com",
      exclusions: "",
      santa_for: "maggie@test.com",
    },
  ],
  budget: 50,
};

export const expectedBody = {
  participants: [
    { email: "bart@test.com" },
    { email: "lisa@test.com" },
    { email: "maggie@test.com" },
    { email: "homer@test.com" },
  ],
  santas: [
    { giver_id: "bart@test.com", receiver_id: "homer@test.com" },
    { giver_id: "lisa@test.com", receiver_id: "bart@test.com" },
    { giver_id: "maggie@test.com", receiver_id: "lisa@test.com" },
    { giver_id: "homer@test.com", receiver_id: "maggie@test.com" },
  ],
  budget: 50,
};
