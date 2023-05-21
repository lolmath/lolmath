"use client";

import { Checkbox as AriaCheckbox, CheckboxProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function ToggleButton({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      className={(values) => {
        const overrideClassname =
          typeof className === "undefined"
            ? ""
            : typeof className === "string"
            ? className
            : className(values);

        return twMerge(
          "",
          "",
          values.isSelected && "",
          values.isIndeterminate && "",
          values.isReadOnly && "",
          values.isRequired && "",
          values.isHovered && "",
          values.isPressed && "",
          values.isDisabled && "",
          values.isFocused && "",
          values.isFocusVisible && "",
          overrideClassname,
        );
      }}
      {...props}
    >
      {children}
    </AriaCheckbox>
  );
}
