import type { ChartCurve } from "@tanstack/charts";

/** How a line or an area gets from one point to the next. */
export type ChartCurveName = "linear" | "smooth" | "step";

type Point = readonly [number, number];

/*
 * A `ChartCurve` is only two functions from points to path data, so the three
 * shapes the charts offer are written out here rather than pulled in from
 * `d3-shape`. That keeps `@lolmath/ui/charts` down to a single optional peer —
 * TanStack Charts itself — instead of asking for a d3 package alongside it.
 *
 * `curves.test.ts` draws every case twice, once here and once with d3-shape
 * (dev-only), and compares them coordinate by coordinate — so "written out
 * here" never quietly becomes "drifted from the reference".
 */

/** Path commands after the first point; the caller has written the move. */
type Segments = (points: readonly Point[]) => string;

interface CurveKernel {
	segments: Segments;
	/**
	 * The returning edge of an area, when it is not drawn the same way as the
	 * outgoing one.
	 */
	back?: Segments;
	/** Whether coincident points are dropped before drawing. */
	dedupe?: boolean;
}

/** Straight segments, like d3's `curveLinear`. */
export const linearCurve = makeCurve({ segments: linearSegments });

/**
 * Monotone cubic interpolation over x — d3's `curveMonotoneX`, by way of
 * Steffen's method. Smooth, but it never overshoots a reading, so a rounded
 * corner cannot invent a value the data never had.
 */
export const smoothCurve = makeCurve({
	segments: monotoneSegments,
	// Coincident points carry no shape and would divide by zero in the tangents.
	dedupe: true,
});

/** Holds each value until the next one, like d3's `curveStepAfter`. */
export const stepCurve = makeCurve({
	segments: stepAfterSegments,
	// An area's two edges have to enclose the same region, so the step flips
	// direction on the way back — as d3's own step curve does.
	back: stepBeforeSegments,
});

const CURVES: Record<ChartCurveName, ChartCurve> = {
	linear: linearCurve,
	smooth: smoothCurve,
	step: stepCurve,
};

export function resolveCurve(name: ChartCurveName): ChartCurve {
	return CURVES[name];
}

function makeCurve(kernel: CurveKernel): ChartCurve {
	const back = kernel.back ?? kernel.segments;
	const prepare = (points: readonly Point[]) =>
		kernel.dedupe ? dedupe(points) : points;

	return {
		line: (points) => {
			const run = prepare(points);
			if (run.length === 0) return "";
			// A lone point has no segments to draw, and d3 closes its path.
			const tail = run.length === 1 ? "Z" : kernel.segments(run);
			return `M${pair(run[0])}${tail}`;
		},

		/*
		 * An area is its top edge, then its bottom edge walked back to the
		 * start. Both are drawn with the same interpolation, so the fill never
		 * parts company with the line on top of it.
		 */
		area: (top, bottom) => {
			const upper = prepare(top);
			const lower = prepare([...bottom].reverse());
			if (upper.length === 0 || lower.length === 0) return "";
			return (
				`M${pair(upper[0])}${upper.length === 1 ? "" : kernel.segments(upper)}` +
				`L${pair(lower[0])}${lower.length === 1 ? "" : back(lower)}Z`
			);
		},
	};
}

function dedupe(points: readonly Point[]): Point[] {
	const run: Point[] = [];
	for (const point of points) {
		const last = run[run.length - 1];
		if (last && last[0] === point[0] && last[1] === point[1]) continue;
		run.push(point);
	}
	return run;
}

function linearSegments(points: readonly Point[]): string {
	let path = "";
	for (let index = 1; index < points.length; index += 1) {
		path += `L${pair(points[index])}`;
	}
	return path;
}

/** Across at the height being held, then up to the new one. */
function stepAfterSegments(points: readonly Point[]): string {
	let path = "";
	for (let index = 1; index < points.length; index += 1) {
		const [x, y] = points[index];
		path += `L${number(x)},${number(points[index - 1][1])}L${number(x)},${number(y)}`;
	}
	return path;
}

/** Up to the new height first, then across — the mirror of the above. */
function stepBeforeSegments(points: readonly Point[]): string {
	let path = "";
	for (let index = 1; index < points.length; index += 1) {
		const [x, y] = points[index];
		path += `L${number(points[index - 1][0])},${number(y)}L${number(x)},${number(y)}`;
	}
	return path;
}

function monotoneSegments(points: readonly Point[]): string {
	// Two points have no interior tangent to constrain: d3 joins them straight.
	if (points.length < 3) return linearSegments(points);

	const tangents = monotoneTangents(points);
	let path = "";
	for (let index = 1; index < points.length; index += 1) {
		const [x0, y0] = points[index - 1];
		const [x1, y1] = points[index];
		// A cubic Hermite span written as a Bézier: the control points sit a
		// third of the way along, offset by the tangent at each end.
		const third = (x1 - x0) / 3;
		path +=
			`C${number(x0 + third)},${number(y0 + third * tangents[index - 1])}` +
			`,${number(x1 - third)},${number(y1 - third * tangents[index])}` +
			`,${number(x1)},${number(y1)}`;
	}
	return path;
}

/**
 * The tangent at every point. Interior tangents come from Steffen's rule,
 * which clamps each one to the smaller neighbouring slope and zeroes it at a
 * turning point — that clamp is what keeps the curve monotone. The two ends
 * take d3's one-sided estimate off their single neighbour.
 */
function monotoneTangents(points: readonly Point[]): number[] {
	const count = points.length;
	const tangents = new Array<number>(count);

	for (let index = 1; index < count - 1; index += 1) {
		tangents[index] = steffen(
			points[index - 1],
			points[index],
			points[index + 1],
		);
	}
	tangents[0] = oneSided(points[0], points[1], tangents[1]);
	tangents[count - 1] = oneSided(
		points[count - 2],
		points[count - 1],
		tangents[count - 2],
	);
	return tangents;
}

function steffen(before: Point, at: Point, after: Point): number {
	const runBefore = at[0] - before[0];
	const runAfter = after[0] - at[0];
	// The zero-run fallbacks are d3's: a span of no width still has to produce
	// a signed infinity, so the sign test below stays meaningful.
	const slopeBefore =
		(at[1] - before[1]) / (runBefore || (runAfter < 0 ? -0 : 0));
	const slopeAfter =
		(after[1] - at[1]) / (runAfter || (runBefore < 0 ? -0 : 0));
	const parabolic =
		(slopeBefore * runAfter + slopeAfter * runBefore) / (runBefore + runAfter);
	return (
		(sign(slopeBefore) + sign(slopeAfter)) *
			Math.min(
				Math.abs(slopeBefore),
				Math.abs(slopeAfter),
				0.5 * Math.abs(parabolic),
			) || 0
	);
}

function oneSided(from: Point, to: Point, neighbour: number): number {
	const run = to[0] - from[0];
	return run ? (3 * ((to[1] - from[1]) / run) - neighbour) / 2 : neighbour;
}

function sign(value: number): number {
	return value < 0 ? -1 : 1;
}

function pair(point: Point): string {
	return `${number(point[0])},${number(point[1])}`;
}

/** Trims float noise, so an unchanged scene serialises to an unchanged path. */
function number(value: number): string {
	return Number.isFinite(value) ? String(Math.round(value * 1e6) / 1e6) : "0";
}
