import { additive } from "./additive";

test("additive", () => {
	expect(additive(0.1, 0.1)).toBeCloseTo(0.2);
});
