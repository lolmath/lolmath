# LoL Math UI

The League of Legends Math UI is React Component library made to look similar to
the League of Legends client. It is used in the [LoL Math website](https://lolmath.net)

## Installation

```bash
npm install @lolmath/ui
```

## Usage

Import the global CSS file and fonts into your project.

```ts
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";
```

## TailwindCSS Plugin

Optionally, you can use the tailwind plugin to get League of Legends colors and fonts.

```ts tailwind.config.ts
import { lolmathui } from "@lolmath/ui/plugin";

/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {},
	},
	plugins: [lolmathui],
};

```

## Client-side Routing

See [react-aria-components](https://react-spectrum.adobe.com/react-aria/routing.html#app-router)

## Links

- [Documentation](https://docs.lolmath.net).
- [Storybook](https://ui.lolmath.net).
- [NPM Package](https://www.npmjs.com/package/@lolmath/ui).
- [Repository](https://gitlab.com/lol-math/lolmath/-/tree/main/packages/ui)
