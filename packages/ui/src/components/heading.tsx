import { createElement } from "react";
import { tv } from "../utilities/tv";

export type HeadingColor = "gold-100" | "gold-200" | "gold-400" | "grey-100";
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5";

interface HeadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  preset?: HeadingElement;
  color?: HeadingColor;
  as?: HeadingElement | "span";
}

const heading = tv({
  base: "font-beaufort scroll-m-20 uppercase",
  variants: {
    color: {
      "gold-100": "text-lol-gold-100",
      "gold-200": "text-lol-gold-200",
      "gold-400": "text-lol-gold-400",
      "grey-100": "text-lol-grey-100",
    },
    preset: {
      h1: "text-lol-h1",
      h2: "text-lol-h2",
      h3: "text-lol-h3",
      h4: "text-lol-h4",
      h5: "text-lol-h5",
    },
  },
});

export function Heading({
  as,
  preset = "h1",
  color = "gold-100",
  className,
  ...rest
}: HeadingProps): JSX.Element {
  const resultAs = as ?? preset;

  return createElement(resultAs, {
    ...rest,
    className: heading({ preset, color, className }),
  });
}
