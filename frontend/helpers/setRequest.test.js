import { setBody } from "./setRequest";
import { expectedBody, participantsAndBudget } from "./testFixtures";
describe("setRequest", () => {
  it("should return a valid request object", () => {
    const { participants, budget } = participantsAndBudget;
    const result = setBody(participants, budget);
    expect(result).toEqual(expectedBody)
  });
});
