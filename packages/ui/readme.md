# LoL Math UI

The League of Legends Math UI is React Component library made to look similar to
the League of Legends client. It is used in the [LoL Math website](https://lolmath.net)

## Installation

```bash
npm install @lolmath/ui
```

## CSS Files

Import the global CSS file and fonts into your project.

```ts
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";
```

## CSS Layer

All CSS modules have the `lol` layer. You can use `@layer` to control the
order of the CSS. This also means that the CSS is less specific than "normal",
global CSS. This is useful for overriding the default styles (e.g. with
tailwind).

```css
@layer someLayer, lol, someOtherLayer;
```

### Usage with tailwind

In tailwind 3, the @tailwind directives are compiled away in the final CSS. You
can use the `@layer` directive to control the order of the CSS. Here, we put the
tailwind `base` tailwind directive in a `tailwind-base` layer, ensuring that any
styles in the `lol` layer are more specific than the tailwind base styles. 

We do the same for the `components` layer. The `utilities` layer is left as is.
That way you can use tailwind utilities to style the components with
`classNames`.

```css	
@layer tailwind-base, tailwind-components, lol;

@layer tailwind-base {
	@tailwind base;
}

@layer tailwind-components {
	@tailwind components;
}

@tailwind utilities;
```

## TailwindCSS Plugin

Optionally, you can use the tailwind plugin to get League of Legends colors and
fonts.

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
