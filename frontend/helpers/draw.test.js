import { draw } from "./draw";
import { participants } from "./testFixtures";

describe("draw", () => {
  it("should return an array of participants", () => {
    const results = draw(participants);
    expect(Object.keys(results)).toEqual(Object.keys(participants));
  });

  it("should return an array of participants with santa_for", () => {
    const results = draw(participants);
    results.forEach((result) => expect(result.santa_for).not.toBe(""));
  });

  it("should return the same amount of particpants as passed in", () => {
    const results = draw(participants);
    expect(results.length).toBe(participants.length);
  });

  it("should return participants in the same order that they were passed in", () => {
    const results = draw(participants);
    results.forEach((result, index) =>
      expect(result.id).toBe(participants[index].id)
    );
  });

  it("should return participants with santa_for that are not themselves", () => {
    const results = draw(participants);
    results.forEach((result) =>
      expect(result.santa_for).not.toBe(result.email)
    );
  });
});
