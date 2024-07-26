import type { ThemeConfig } from "tailwindcss/types/config.js";

export const theme = {
	colors: {
		lol: {
			blue: {
				100: "#CDFAFA",
				200: "#0AC8B9",
				300: "#0397AB",
				400: "#005A82",
				500: "#0A323C",
				600: "#091428",
				700: "#0A1428",
			},
			grey: {
				100: "#A09B8C",
				150: "#5B5A56",
				200: "#3C3C41",
				300: "#1E2328",
				cool: "#1E282D",
				"hextech-black": "#010A13",
			},
			gold: {
				100: "#F0E6D2",
				200: "#C8AA6E",
				300: "#CDBE91",
				400: "#C89B3C",
				500: "#785A28",
				600: "#463714",
				700: "#32281E",
			},
		},
	},
	fontSize: {
		// Heading
		"lol-h5": [
			"1.1667rem",
			{ lineHeight: "1.5rem", letterSpacing: "0.075em", fontWeight: 700 },
		],
		"lol-h4": [
			"1.5rem",
			{ lineHeight: "1.8333rem", letterSpacing: "0.05em", fontWeight: 700 },
		],
		"lol-h3": [
			"1.9167rem",
			{ lineHeight: "2.3333rem", letterSpacing: "0.05em", fontWeight: 700 },
		],
		"lol-h2": [
			"2.3333rem",
			{ lineHeight: "2.6667rem", letterSpacing: "0.05em", fontWeight: 700 },
		],
		"lol-h1": [
			"3.3333rem",
			{ lineHeight: "3.5rem", letterSpacing: "0.05em", fontWeight: 700 },
		],

		// Text
		"lol-label": [
			"0.9167rem",
			{ lineHeight: "1.3333rem", letterSpacing: "0.05em", fontWeight: 700 },
		],
		"lol-stat": [
			"1.1667rem",
			{ lineHeight: "1.6667rem", letterSpacing: "0.05em", fontWeight: 700 },
		],
		"lol-large-number": [
			"4.75rem",
			{
				lineHeight: "5.1667rem",
				letterSpacing: "0.025em",
				fontWeight: 500,
			},
		],
		"lol-sm": [
			"0.875rem",
			{
				lineHeight: "1.1025rem",
				letterSpacing: "0.02em",
				fontWeight: 400,
			},
		],
		"lol-base": [
			"1rem",
			{
				lineHeight: "1.24rem",
				letterSpacing: "0.01em",
				fontWeight: 400,
			},
		],
		"lol-md": [
			"1.1667rem",
			{
				lineHeight: "1.6667rem",
				letterSpacing: "0.025em",
				fontWeight: 400,
			},
		],
		"lol-lg": [
			"1.5rem",
			{
				lineHeight: "1.875rem",
				letterSpacing: "0.025em",
				fontWeight: 400,
			},
		],
	},
	fontFamily: {
		beaufort: "beaufort",
		spiegel: "spiegel",
	},
} satisfies Partial<ThemeConfig>;
