import { createElement } from "react";
import { tv } from "../utilities/tv";
import {
  type LabelProps as AriaLabelProps,
  Label as AriaLabel,
} from "react-aria-components";

export type TextColor = "grey-100" | "grey-150" | "gold-100";
export type TextElement = "p" | "span" | "div";
export type TextPreset =
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "large-number"
  | "stat";

const presetElements: Record<TextPreset, TextElement> = {
  sm: "p",
  base: "p",
  md: "p",
  lg: "p",
  "large-number": "span",
  stat: "span",
};

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

interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  preset?: TextPreset;
  color?: TextColor;
  as?: TextElement;
}
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

interface LabelProps extends AriaLabelProps {
  preset?: TextPreset | 'label';
  color?: TextColor;
  as?: TextElement;
}
export function Label({
  preset = "sm",
  color = "grey-100",
  className,
  ...rest
}: LabelProps): JSX.Element {
  return createElement(AriaLabel, {
    ...rest,
    className: text({ preset, color, className }),
  });
}
