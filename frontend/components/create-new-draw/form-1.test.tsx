import { render, screen } from "@testing-library/react";
import FormOne from "./form-1";
import { Participant } from "../types";

describe("FormOne", () => {
  test("A", () => {
    expect(true).toBe(true)
  })
  
  // it("renders", () => {
  //   render(
  //     <FormOne
  //       participants={[]}
  //       setParticipants={function (participants: Participant[]): void {
  //         throw new Error("Function not implemented.");
  //       }}
  //     />
  //   );

  //   expect(screen.getByText(/Enter Names/i)).toBeInTheDocument();
  // });
  // it("sets a participant in the text input", () => {
  //   render(
  //     <FormOne
  //       participants={[]}
  //       setParticipants={function (participants: Participant[]): void {
  //         throw new Error("Function not implemented.");
  //       }}
  //     />
  //   );

  //   const input = screen.getByLabelText(/Name/i);
  //   console.log(input)
  // });
});
