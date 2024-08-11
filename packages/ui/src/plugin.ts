import plugin from "tailwindcss/plugin";

export const lolmathui = plugin(({}) => {}, {
	theme: {
		extend: {
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
					hextech: {
						black: "#010A13",
					},
				},
			},
			fontSize: {
				// Heading
				"lol-h5": [
					"var(--lol-font-size-h5)",
					{
						lineHeight: "var(--lol-line-height-h5)",
						letterSpacing: "var(--lol-letter-spacing-h5)",
						fontWeight: "var(--lol-font-weight-h5)",
					},
				],
				"lol-h4": [
					"var(--lol-font-size-h4)",
					{
						lineHeight: "var(--lol-line-height-h4)",
						letterSpacing: "var(--lol-letter-spacing-h4)",
						fontWeight: "var(--lol-font-weight-h4)",
					},
				],
				"lol-h3": [
					"var(--lol-font-size-h3)",
					{
						lineHeight: "var(--lol-line-height-h3)",
						letterSpacing: "var(--lol-letter-spacing-h3)",
						fontWeight: "var(--lol-font-weight-h3)",
					},
				],
				"lol-h2": [
					"var(--lol-font-size-h2)",
					{
						lineHeight: "var(--lol-line-height-h2)",
						letterSpacing: "var(--lol-letter-spacing-h2)",
						fontWeight: "var(--lol-font-weight-h2)",
					},
				],
				"lol-h1": [
					"var(--lol-font-size-h1)",
					{
						lineHeight: "var(--lol-line-height-h1)",
						letterSpacing: "var(--lol-letter-spacing-h1)",
						fontWeight: "var(--lol-font-weight-h1)",
					},
				],

				// Text
				"lol-label": [
					"var(--lol-font-size-label)",
					{
						lineHeight: "var(--lol-line-height-label)",
						letterSpacing: "var(--lol-letter-spacing-label)",
						fontWeight: "var(--lol-font-weight-label)",
					},
				],
				"lol-stat": [
					"var(--lol-font-size-stat)",
					{
						lineHeight: "var(--lol-line-height-stat)",
						letterSpacing: "var(--lol-letter-spacing-stat)",
						fontWeight: "var(--lol-font-weight-stat)",
					},
				],
				"lol-large-number": [
					"var(--lol-font-size-large-number)",
					{
						lineHeight: "var(--lol-line-height-large-number)",
						letterSpacing: "var(--lol-letter-spacing-large-number)",
						fontWeight: "var(--lol-font-weight-large-number)",
					},
				],
				"lol-sm": [
					"var(--lol-font-size-sm)",
					{
						lineHeight: "var(--lol-line-height-sm)",
						letterSpacing: "var(--lol-letter-spacing-sm)",
						fontWeight: "var(--lol-font-weight-sm)",
					},
				],
				"lol-base": [
					"var(--lol-font-size-base)",
					{
						lineHeight: "var(--lol-line-height-base)",
						letterSpacing: "var(--lol-letter-spacing-base)",
						fontWeight: "var(--lol-font-weight-base)",
					},
				],
				"lol-md": [
					"var(--lol-font-size-md)",
					{
						lineHeight: "var(--lol-line-height-md)",
						letterSpacing: "var(--lol-letter-spacing-md)",
						fontWeight: "var(--lol-font-weight-md)",
					},
				],
				"lol-lg": [
					"var(--lol-font-size-lg)",
					{
						lineHeight: "var(--lol-line-height-lg)",
						letterSpacing: "var(--lol-letter-spacing-lg)",
						fontWeight: "var(--lol-font-weight-lg)",
					},
				],
			},
			fontFamily: {
				beaufort: "var(--lol-font-family-beaufort)",
				spiegel: "var(--lol-font-family-spiegel)",
			},
		},
	},
});
