import { createElement } from "react";
import { tv } from "../utilities/tv";

export type TextColor = "grey-100" | "grey-150" | "gold-100";
export type TextElement = "p" | "span" | "div" | "label";
export type TextPreset =
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "label"
  | "large-number"
  | "stat";

const presetElements: Record<TextPreset, TextElement> = {
  sm: "p",
  base: "p",
  md: "p",
  lg: "p",
  label: "label",
  "large-number": "span",
  stat: "span",
};

interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  preset?: TextPreset;
  color?: TextColor;
  as?: TextElement;
}

const text = tv({
  base: "font-spiegel",
  variants: {
    color: {
      "grey-100": "text-lol-grey-100",
      "grey-150": "text-lol-grey-150",
      "gold-100": "text-lol-gold-100",
    },
    preset: {
      sm: "text-lol-sm",
      base: "text-lol-base",
      md: "text-lol-md",
      lg: "text-lol-lg",
      label: "text-lol-label",
      "large-number": "text-lol-large-number font-beaufort italic",
      stat: "text-lol-stat font-beaufort",
    },
  },
});

export function Text({
  as = "p",
  preset = "base",
  color = "grey-100",
  className,
  ...rest
}: TextProps): JSX.Element {
  const elementType = as ?? presetElements[preset];
  return createElement(elementType, {
    ...rest,
    className: text({ preset, color, className }),
  });
}
