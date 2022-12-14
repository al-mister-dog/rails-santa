import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormOne from "./form-1";
import { Participant } from "../types";
import uuid from "react-uuid";

const participants: Participant[] = [
  {
    id: uuid(),
    email: "",
    role: "Organizer",
    exclusions: "",
    santa_for: "",
  },
];
function setParticipants(participants: Participant[]) {}

describe("FormOne", () => {
  it("should render", () => {
    render(
      <FormOne participants={participants} setParticipants={setParticipants} />
    );

    expect(screen.getByText("Enter emails")).toBeInTheDocument();
    expect(screen.getByText("Your email")).toBeInTheDocument();
    expect(screen.getByText("Draw With")).toBeInTheDocument();
  });
  it("should render an input for the organizer's email", () => {
    render(
      <FormOne participants={participants} setParticipants={setParticipants} />
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });
  // it("should render new inputs on add participant click", () => {
  //   render(
  //     <FormOne participants={participants} setParticipants={setParticipants} />
  //   );

  //   expect(screen.getAllByRole("textbox")).toHaveLength(2);
  //   screen.getByText("Add another").click();
  //   expect(screen.getAllByRole("textbox")).toHaveLength(3);
  // });
});
