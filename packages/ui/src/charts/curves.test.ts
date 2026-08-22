import { d3Curve } from "@tanstack/charts";
import { curveLinear, curveMonotoneX, curveStepAfter } from "d3-shape";
import { describe, expect, it } from "vitest";
import { linearCurve, smoothCurve, stepCurve } from "./curves";

/*
 * `curves.ts` writes out three d3 curves by hand so the published package does
 * not need d3-shape. This pins them to the originals: d3-shape is a dev-only
 * dependency, and every case below is drawn twice — once by us, once by d3 —
 * and compared coordinate by coordinate.
 */

type Point = [number, number];

const CASES: Record<string, Point[]> = {
	"a rising line": [
		[0, 100],
		[25, 80],
		[50, 40],
		[75, 45],
		[100, 10],
	],
	"a turning point": [
		[0, 50],
		[20, 10],
		[40, 90],
		[60, 20],
		[80, 70],
	],
	"a flat run": [
		[0, 40],
		[20, 40],
		[40, 40],
		[60, 20],
	],
	"two points": [
		[0, 10],
		[50, 90],
	],
	"three points": [
		[0, 10],
		[50, 90],
		[100, 30],
	],
	"one point": [[10, 20]],
	"coincident points": [
		[0, 10],
		[0, 10],
		[50, 90],
		[100, 30],
	],
	"uneven spacing": [
		[0, 10],
		[5, 60],
		[70, 20],
		[72, 65],
		[100, 30],
	],
};

/** Path data as a command letter followed by its numbers, ready to compare. */
function parse(path: string): (string | number)[] {
	const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
	return tokens.map((token) =>
		/[A-Za-z]/.test(token) ? token : Number(token),
	);
}

function expectSamePath(ours: string, theirs: string): void {
	const left = parse(ours);
	const right = parse(theirs);
	expect(left.length).toBe(right.length);
	for (const [index, value] of left.entries()) {
		const other = right[index];
		if (typeof value === "number" && typeof other === "number") {
			// d3-path rounds its own output, so agree on geometry, not on digits.
			expect(value).toBeCloseTo(other, 3);
		} else {
			expect(value).toBe(other);
		}
	}
}

const PAIRS = [
	["linear", linearCurve, d3Curve(curveLinear)],
	["smooth", smoothCurve, d3Curve(curveMonotoneX)],
	["step", stepCurve, d3Curve(curveStepAfter)],
] as const;

describe.each(PAIRS)("%s curve", (_name, ours, theirs) => {
	it.each(Object.keys(CASES))("draws %s like d3", (label) => {
		const points = CASES[label];
		expectSamePath(ours.line(points), theirs.line(points));
	});

	it.each(Object.keys(CASES))("fills %s like d3", (label) => {
		const top = CASES[label];
		const bottom: Point[] = top.map(([x]) => [x, 120]);
		expectSamePath(ours.area(top, bottom), theirs.area(top, bottom));
	});
});
