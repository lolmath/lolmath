import { msCap } from "./ms-cap";

test("msCap", () => {
	expect(msCap(0)).toBeCloseTo(110);
	expect(msCap(180)).toBeCloseTo(200);
	expect(msCap(450)).toBeCloseTo(443);
	expect(msCap(500)).toBeCloseTo(480);
	expect(msCap(600)).toBeCloseTo(530);
	expect(msCap(700)).toBeCloseTo(580);
	expect(msCap(676.603125)).toBeCloseTo(568.3015625);
});
