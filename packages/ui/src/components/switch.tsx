import { Switch as AriaSwitch } from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import {
  goldGradient,
  goldGradientHover,
  goldGradientPressed,
  disabledGradient,
} from "../utilities/gradient.js";
import { tv } from "../utilities/tv.js";

const switchTrackBorder = tv({
  base: [
    "h-6 w-14 shrink-0 cursor-default rounded-full bg-gradient-to-t p-0.5",
    goldGradient,
  ],
  variants: {
    isHovered: {
      true: goldGradientHover,
    },
    isPressed: {
      true: goldGradientPressed,
    },
    isDisabled: {
      true: disabledGradient,
    },
    isFocusVisible: {
      true: "outline outline-1 outline-offset-2 outline-yellow-50",
    },
  },
});

const switchTrack = tv({
  base: "bg-lol-grey-300 relative grid h-full w-full rounded-full transition-colors duration-200 ease-in-out",
  variants: {
    isPressed: {
      true: "",
    },
    isSelected: {
      true: "bg-green-900",
    },
    isFocused: {
      true: "outline-none",
    },
    isFocusVisible: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isPressed: true,
      isSelected: true,
      className: "bg-green-950",
    },
  ],
});

const switchKnobBorder = tv({
  base: [
    "absolute -left-2 -top-1.5 h-8 w-8 rounded-full bg-gradient-to-t p-0.5 shadow-md ring-0 transition-[left] duration-200 ease-in-out",
    goldGradient,
  ],
  variants: {
    isSelected: {
      true: "left-[calc(100%-1.5rem)]",
    },
    isHovered: {
      true: goldGradientHover,
    },
    isPressed: {
      true: goldGradientPressed,
    },
    isDisabled: {
      true: disabledGradient,
    },
  },
});

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
      {...props}
      className="group inline-flex items-center gap-2 p-1 px-1.5 text-sm font-semibold text-black"
    >
      {(values) => (
        <>
          <div className={switchTrackBorder(values)}>
            <div className={switchTrack(values)}>
              <span className={switchKnobBorder(values)}>
                <span className="bg-lol-grey-300 block h-full w-full rounded-full"></span>
              </span>
            </div>
          </div>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </AriaSwitch>
  );
}
