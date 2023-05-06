import { growth } from "./growth";

test("growth", () => {
  // Talon Health @ 12.22
  const base = 658;
  const perLevel = 109;
  expect(base + growth(1) * perLevel).toBeCloseTo(658);
  expect(base + growth(3) * perLevel).toBeCloseTo(818.78);
  expect(base + growth(13) * perLevel).toBeCloseTo(1851.55);
  expect(base + growth(18) * perLevel).toBeCloseTo(2511);
});
