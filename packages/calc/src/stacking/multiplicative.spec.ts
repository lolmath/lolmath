import { multiplicative } from "./multiplicative";

test("multiplicative", () => {
  expect(multiplicative(0.1, 0.1)).toBeCloseTo(0.19);
});
