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
          "transition-colors duration-200 outline-none",
          (priority === "primary" || priority === "secondary") && [
            "bg-gradient-to-t",
            borderGradient,
            values.isHovered && borderGradientHover,
            values.isPressed && borderGradientPressed,
            values.isDisabled && borderGradientDisabled,
            values.isFocused && "",
            values.isFocusVisible &&
              "outline outline-yellow-50 outline-offset-2",
          ],
          isRounded && "rounded-full aspect-square",
          isSquared && "aspect-square",
          resolveClassname(className, values),
        );
      }}
    >
      {(values) => {
        return (
          <span
            className={twMerge(
              "block transition-colors duration-200 text-lol-gold-300 tracking-wide font-beaufort font-black uppercase",
              (priority === "primary" || priority === "secondary") && [
                "m-0.5 px-4 py-2 bg-lol-gray-950",
              ],
              priority === "primary" &&
                "from-lol-gold-700 via-lol-gold-800 to-lol-gold-900 bg-gradient-to-b",

              priority === "tertiary" &&
                !isRounded &&
                'relative after:content-[""] after:absolute after:-top-2 after:-bottom-2 after:-left-2 after:-right-2',

              (isSquared || isRounded) && "aspect-square p-1.5",
              isRounded && "rounded-full",

              values.isHovered && [
                "text-lol-gold-100",
                priority === "primary" &&
                  "from-lol-gold-700 via-lol-gold-600 to-lol-gold-600",
                priority === "tertiary" &&
                  (isRounded || isSquared) &&
                  "bg-lol-gray-900",
              ],
              values.isPressed && [
                "text-lol-gray-500",
                priority === "primary" &&
                  "text-lol-gold-600 from-lol-gold-900 via-lol-gold-900 to-lol-gold-900",
              ],
              values.isDisabled && "text-lol-gray-500",
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
