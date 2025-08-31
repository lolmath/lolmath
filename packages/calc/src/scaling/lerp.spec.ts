import { lerp } from "./lerp";

describe("lerp", () => {
	it("should return the minimum value when ratio is 0", () => {
		expect(lerp(10, 20, 0)).toBe(10);
	});

	it("should return the maximum value when ratio is 1", () => {
		expect(lerp(10, 20, 1)).toBe(20);
	});

	it("should return the midpoint value when ratio is 0.5", () => {
		expect(lerp(10, 20, 0.5)).toBe(15);
	});

	it("should return a value closer to the minimum when ratio is less than 0.5", () => {
		expect(lerp(10, 20, 0.25)).toBe(12.5);
	});

	it("should return a value closer to the maximum when ratio is greater than 0.5", () => {
		expect(lerp(10, 20, 0.75)).toBe(17.5);
	});

	it("should handle negative values correctly", () => {
		expect(lerp(-10, 10, 0.5)).toBe(0);
		expect(lerp(-10, -20, 0.5)).toBe(-15);
	});

	it("should handle ratio values outside the range of 0 to 1", () => {
		expect(lerp(10, 20, -0.5)).toBe(5);
		expect(lerp(10, 20, 1.5)).toBe(25);
	});
});
