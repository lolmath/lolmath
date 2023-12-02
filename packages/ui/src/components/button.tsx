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
import { resolveClassname } from "../utilities/resolve-classname";

interface ButtonProps extends AriaButtonProps {
  priority?: "primary" | "secondary" | "tertiary";
  isRounded?: boolean;
  isSquared?: boolean;
}

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
        return twMerge(
          "outline-none transition-colors duration-200",
          (priority === "primary" || priority === "secondary") && [
            "bg-gradient-to-t",
            borderGradient,
            values.isHovered && borderGradientHover,
            values.isPressed && borderGradientPressed,
            values.isDisabled && borderGradientDisabled,
            values.isFocused && "",
            values.isFocusVisible &&
              "outline outline-offset-2 outline-yellow-50",
          ],
          isRounded && "aspect-square rounded-full",
          isSquared && "aspect-square",
          resolveClassname(className, values),
        );
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
