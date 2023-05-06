import { linear, linear18, linear3, linear5 } from "./linear";

test("linear", () => {
  expect(linear(8, 8)).toBe(1);
  expect(linear(8, 1)).toBe(0);
});
test("linear3", () => {
  // Talon R Damage @ 12.22
  expect(90 + linear3(1) * 90).toBeCloseTo(90);
  expect(90 + linear3(2) * 90).toBeCloseTo(135);
  expect(90 + linear3(3) * 90).toBeCloseTo(180);
});
test("linear5", () => {
  // Talon Q Damage @ 12.22
  expect(65 + linear5(1) * 80).toBeCloseTo(65);
  expect(65 + linear5(2) * 80).toBeCloseTo(85);
  expect(65 + linear5(3) * 80).toBeCloseTo(105);
  expect(65 + linear5(4) * 80).toBeCloseTo(125);
  expect(65 + linear5(5) * 80).toBeCloseTo(145);
});
test("linear18", () => {
  // Talon Q Heal @ 12.22
  expect(9 + linear18(1) * 46).toBeCloseTo(9);
  expect(9 + linear18(8) * 46).toBeCloseTo(27.94);
  expect(9 + linear18(11) * 46).toBeCloseTo(36.06);
  expect(9 + linear18(18) * 46).toBeCloseTo(55);
});
