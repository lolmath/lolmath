import type { TooltipProps } from "react-aria-components";
import { Tooltip as AriaTooltip, OverlayArrow } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={(values) =>
        twMerge(
          `bg-black p-0.5 drop-shadow-lg`,
          borderGradient,
          "w-[280px]",
          values.isEntering &&
            "animate-in fade-in data-[placement=bottom]:slide-in-from-top-1 data-[placement=top]:slide-in-from-bottom-1 fill-mode-forwards duration-200 ease-out",
          values.isExiting &&
            "animate-out fade-out data-[placement=bottom]:slide-out-to-top-1 data-[placement=top]:slide-out-to-bottom-1 fill-mode-forwards duration-150 ease-in",
          values.placement === "bottom" && "mt-2",
          values.placement === "top" && "mb-2",
          resolveClassname(props.className, values),
        )
      }
    >
      {(values) => (
        <>
          <OverlayArrow className="translate-y-1 transform">
            {(values) => (
              <>
                <svg
                  viewBox="0 0 12 12"
                  className={twMerge(
                    "fill-lol-gold-600 absolute block h-5 w-5",
                    values.placement === "top" &&
                      "-left-0.5 -translate-y-[1px] ",
                    values.placement === "bottom" &&
                      "fill-lol-gold-400 -left-0.5 -translate-y-[3px] rotate-180",
                    values.placement === "left" &&
                      "fill-lol-gold-500 -top-0.5 -translate-x-px -rotate-90",
                    values.placement === "right" &&
                      "fill-lol-gold-500 -top-0.5 -translate-x-[3px] rotate-90",
                  )}
                >
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
                <svg
                  viewBox="0 0 12 12"
                  className={twMerge(
                    "fill-lol-grey-900 block h-4 w-4",
                    values.placement === "top" && "-translate-y-0.5",
                    values.placement === "bottom" &&
                      "translate-y-0.5 rotate-180",
                    values.placement === "left" &&
                      "-translate-x-0.5 -rotate-90",
                    values.placement === "right" && "translate-x-0.5 rotate-90",
                  )}
                >
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
              </>
            )}
          </OverlayArrow>
          <div className="bg-lol-grey-900">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </AriaTooltip>
  );
}

export { TooltipTrigger } from "react-aria-components";
