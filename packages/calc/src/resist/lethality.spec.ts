import { lethalityx } from "./lethality";

test("lethalityx", () => {
  expect(lethalityx(1)).toBeCloseTo(0.6222);
  expect(lethalityx(2)).toBeCloseTo(0.6444);
  expect(lethalityx(3)).toBeCloseTo(0.6666);
  expect(lethalityx(13)).toBeCloseTo(0.8888);
  expect(lethalityx(18)).toBeCloseTo(1);
});
