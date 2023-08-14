"use client";

import { Ref, forwardRef } from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  borderClassName,
  borderDisabledClassName,
  borderHoverClassName,
  borderPressedClassName,
} from "../utilities/border";

interface ButtonProps extends AriaButtonProps {
  priority?: "primary" | "secondary";
}

function _Button(
  { children, className, priority = "secondary", ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <AriaButton
      ref={ref}
      className={(values) => {
        const overrideClassname =
          typeof className === "undefined"
            ? ""
            : typeof className === "string"
            ? className
            : className(values);

        // #5a401f 0%, #47341B #332717 100% primary background gradient.

        return twMerge(
          "font-[beaufort] font-black uppercase transition-colors duration-200 outline-none bg-gradient-to-t",
          borderClassName,
          values.isHovered && borderHoverClassName,
          values.isPressed && borderPressedClassName,
          values.isDisabled && borderDisabledClassName,
          values.isFocused && "",
          values.isFocusVisible && "outline outline-yellow-50 outline-offset-2",
          overrideClassname,
        );
      }}
      {...props}
    >
      {(values) => {
        return (
          <span
            className={twMerge(
              "block m-0.5 px-4 py-2 bg-[#1e2328] transition-colors duration-200",
              priority === "primary" && "bg-gradient-to-b",
              "text-[#cdbe91] tracking-wide",
              values.isHovered && "text-[#f0e6d2]",
              values.isPressed && "text-[#5c5b57]",
              values.isDisabled && "text-[#5c5b57]",
              values.isFocused && "",
              values.isFocusVisible && "",

              priority === "primary" &&
                "from-[#5a401f] via-[#47341B] to-[#332717]",
              priority === "primary" &&
                values.isHovered &&
                "from-[#604522] via-[#846745] to-[#725634]",
              priority === "primary" &&
                values.isPressed &&
                "from-[#261b0d] via-[#261b0d] to-[#261b0d]  text-[#67604c]",
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
