import { Switch as AriaSwitch } from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  borderClassName,
  borderHoverClassName,
  borderPressedClassName,
  borderDisabledClassName,
} from "../utilities/border";
export function Switch({
  className,
  placeholder,
  children,
  ...props
}: AriaSwitchProps & {
  placeholder?: string;
}) {
  return (
    <AriaSwitch
      className="group inline-flex items-center gap-2 p-1 text-sm font-semibold text-black"
      {...props}
    >
      {(values) => (
        <>
          <div
            className={twMerge(
              "h-6 w-14 shrink-0 cursor-default rounded-full p-0.5",
              borderClassName,
              values.isHovered && borderHoverClassName,
              values.isPressed && borderPressedClassName,
              values.isDisabled && borderDisabledClassName,
              values.isFocused && "",
              values.isFocusVisible &&
                "outline outline-1 outline-offset-2 outline-yellow-50",
            )}
          >
            <div
              className={twMerge(
                "relative grid h-full w-full rounded-full bg-lol-gray-950 transition-colors duration-200 ease-in-out",
                values.isPressed && "",
                values.isSelected && "bg-green-800",
                values.isSelected && values.isPressed && "bg-green-900",
                values.isFocused && "outline-none",
                values.isFocusVisible && "",
              )}
            >
              <span
                className={twMerge(
                  "absolute -left-2 -top-1.5 h-8 w-8 rounded-full p-0.5 shadow-md ring-0 transition-[left] duration-200 ease-in-out",
                  values.isSelected && "left-[calc(100%-1.75rem)]",
                  borderClassName,
                  values.isHovered && borderHoverClassName,
                  values.isPressed && borderPressedClassName,
                  values.isDisabled && borderDisabledClassName,
                )}
              >
                <span className="block h-full w-full rounded-full bg-lol-gray-950"></span>
              </span>
            </div>
          </div>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </AriaSwitch>
  );
}
