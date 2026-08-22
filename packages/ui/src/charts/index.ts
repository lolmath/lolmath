/*
 * `@lolmath/ui/charts` — TanStack Charts drawn in the Hextech language.
 *
 * A separate entry from `@lolmath/ui` on purpose: `@tanstack/charts` is an
 * optional peer, so only the consumers who import this pay for it. The tokens
 * these components read live in `@lolmath/ui/css` with the rest of the design
 * system, so there is no second stylesheet to remember.
 */
import "../style.css";

export type {
	ChartDefinition,
	ChartPoint,
	ChartTheme,
	ChartValue,
	DomChartDefinition,
} from "@tanstack/charts";
// The grammar itself, re-exported so a chart of your own needs no second
// import path — and cannot end up on a different copy of the library.
export {
	areaY,
	barX,
	barY,
	crosshair,
	d3Curve,
	defineChart,
	dot,
	group,
	lineX,
	lineY,
	rect,
	ruleX,
	ruleY,
	stack,
	text,
	tickX,
	tickY,
} from "@tanstack/charts";
export { scaleBand } from "@tanstack/charts/scales/band";
export { scaleLinear } from "@tanstack/charts/scales/linear";
export { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
export { scalePoint } from "@tanstack/charts/scales/point";
export { tooltip } from "@tanstack/charts/tooltip";

export * from "./components/area-chart/area-chart";
export * from "./components/bar-chart/bar-chart";
export type {
	CartesianChartProps,
	ChartSeries,
	ChartXValue,
} from "./components/chart-common";
export * from "./components/chart-frame/chart-frame";
export * from "./components/chart-legend/chart-legend";
export * from "./components/hextech-chart/hextech-chart";
export * from "./components/line-chart/line-chart";
export * from "./components/ranking-chart/ranking-chart";
export {
	type ChartCurveName,
	linearCurve,
	smoothCurve,
	stepCurve,
} from "./curves";
export * from "./theme/theme";
