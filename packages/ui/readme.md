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

You can use the `@layer` directive to control the order of the CSS. For more
information on using `@layer` with tailwind, see
https://tailwindcss.com/docs/preflight

```css
@layer theme, base, components, lol, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

## TailwindCSS Theme

Optionally, you can use the tailwind theme to get League of Legends colors and
fonts.

```css tailwind.css
@layer theme, base, components, lol, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);

/* Import the theme */
@import "@lolmath/ui/tailwind";
```

## Client-side Routing

See [react-aria-components](https://react-spectrum.adobe.com/react-aria/routing.html#app-router)

## Links

- [Storybook](https://ui.lolmath.net).
- [NPM Package](https://www.npmjs.com/package/@lolmath/ui).
- [Repository](https://gitlab.com/lol-math/lolmath/-/tree/main/packages/ui)
