import { lerp } from "./lerp";
import { linear5 } from "./linear";

it("finds the correct values", () => {
	expect(lerp(80, 260, linear5(1))).toBe(80);
	expect(lerp(80, 260, linear5(2))).toBe(125);
	expect(lerp(80, 260, linear5(3))).toBe(170);
	expect(lerp(80, 260, linear5(4))).toBe(215);
	expect(lerp(80, 260, linear5(5))).toBe(260);
});
