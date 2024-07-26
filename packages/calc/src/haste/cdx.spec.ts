import { cdx } from "./cdx";

test("dmgx", () => {
	expect(cdx(0.1)).toBeCloseTo(0.91);
	expect(cdx(0.2)).toBeCloseTo(0.83);
	expect(cdx(1)).toBeCloseTo(0.5);
});
