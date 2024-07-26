import { dmgx } from "./dmgx";

test("dmgx", () => {
	expect(dmgx(25)).toBeCloseTo(0.8);
	expect(dmgx(100)).toBeCloseTo(0.5);
	expect(dmgx(200)).toBeCloseTo(0.33);
	expect(dmgx(300)).toBeCloseTo(0.25);
	expect(dmgx(-100)).toBeCloseTo(1.5);
});
