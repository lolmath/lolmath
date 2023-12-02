"use client";

import { Ref, forwardRef } from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  borderGradient,
  borderGradientDisabled,
  borderGradientHover,
  borderGradientPressed,
} from "../utilities/border";
import { resolveClassName as resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "../utilities/tv";

interface ButtonProps extends AriaButtonProps {
  priority?: "primary" | "secondary" | "tertiary";
  isRounded?: boolean;
  isSquared?: boolean;
}

const buttonBorder = tv({
  base: "outline-none transition-colors duration-200",
  variants: {
    priority: {
      primary: "",
      secondary: "",
      tertiary: "",
    },
    isRounded: {
      true: "aspect-square rounded-full",
    },
    isSquared: {
      true: "aspect-square",
    },
    isHovered: {
      true: "",
    },
    isPressed: {
      true: "",
    },
    isDisabled: {
      true: "",
    },
    isFocused: {
      true: "",
    },
    isFocusVisible: {
      true: "",
    },
  },
  compoundVariants: [
    {
      priority: ["primary", "secondary"],
      class: `bg-gradient-to-t ${borderGradient}`,
    },
    {
      priority: ["primary", "secondary"],
      isHovered: true,
      class: borderGradientHover,
    },
    {
      priority: ["primary", "secondary"],
      isPressed: true,
      class: borderGradientPressed,
    },
    {
      priority: ["primary", "secondary"],
      isDisabled: true,
      class: borderGradientDisabled,
    },
    {
      priority: ["primary", "secondary"],
      isFocusVisible: true,
      class: "outline outline-offset-2 outline-yellow-50",
    },
  ],
});

function _Button(
  {
    children,
    className,
    priority = "secondary",
    isRounded = false,
    isSquared = false,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <AriaButton
      ref={ref}
      {...props}
      className={(values) => {
        return buttonBorder({
          className: resolveClassName(className, values),
          priority,
          isRounded,
          isSquared,
        });
      }}
    >
      {(values) => {
        return (
          <span
            className={twMerge(
              "text-lol-gold-300 font-beaufort block font-black uppercase tracking-wide transition-colors duration-200",
              (priority === "primary" || priority === "secondary") && [
                "bg-lol-grey-950 m-0.5 px-4 py-2",
              ],
              priority === "primary" &&
                "from-lol-gold-700 via-lol-gold-800 to-lol-gold-900 bg-gradient-to-b",

              priority === "tertiary" &&
                !isRounded &&
                'relative after:absolute after:-bottom-2 after:-left-2 after:-right-2 after:-top-2 after:content-[""]',

              (isSquared || isRounded) && "aspect-square p-1.5",
              isRounded && "rounded-full",

              values.isHovered && [
                "text-lol-gold-100",
                priority === "primary" &&
                  "from-lol-gold-700 via-lol-gold-600 to-lol-gold-600",
                priority === "tertiary" &&
                  (isRounded || isSquared) &&
                  "bg-lol-grey-900",
              ],
              values.isPressed && [
                "text-lol-grey-500",
                priority === "primary" &&
                  "text-lol-gold-600 from-lol-gold-900 via-lol-gold-900 to-lol-gold-900",
              ],
              values.isDisabled && "text-lol-grey-500",
              values.isFocused && "",
              values.isFocusVisible && "",
            )}
          >
            {typeof children === "function" ? children(values) : children}
          </span>
        );
      }}
    </AriaButton>
  );
}

export const Button = forwardRef(_Button);
